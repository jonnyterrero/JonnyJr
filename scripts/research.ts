#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import fetch from "node-fetch";

interface ResearchTopic {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
}

interface ResearchFindings {
  date: string;
  topics: ResearchTopic[];
  insights: string[];
  nextSteps: string[];
  perplexityResults: string;
  category: string;
}

interface CategoryMapping {
  keywords: string[];
  category: string;
}

interface PerplexityResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

class AIResearch {
  private findings: ResearchFindings;
  private topic: string;
  private apiKey: string;
  private categoryMappings: CategoryMapping[];

  constructor(topic: string = "repo roadmap") {
    this.topic = topic;
    this.apiKey = process.env.PPLX_API_KEY || '';
    this.categoryMappings = [
      {
        keywords: ['project', 'build', 'create', 'develop', 'app', 'website', 'software', 'tool'],
        category: 'Personal Projects'
      },
      {
        keywords: ['think', 'reflect', 'philosophy', 'meaning', 'purpose', 'life', 'personal', 'growth'],
        category: 'Reflections & Questions'
      },
      {
        keywords: ['math', 'mathematics', 'algorithm', 'code', 'programming', 'function', 'equation', 'calculate'],
        category: 'Math & Coding'
      },
      {
        keywords: ['science', 'physics', 'chemistry', 'biology', 'research', 'experiment', 'theory', 'hypothesis'],
        category: 'Sciences'
      }
    ];
    this.findings = {
      date: new Date().toISOString().split('T')[0],
      topics: [],
      insights: [],
      nextSteps: [],
      perplexityResults: '',
      category: this.categorizeTopic(topic)
    };
  }

  private categorizeTopic(topic: string): string {
    const lowerTopic = topic.toLowerCase();
    
    for (const mapping of this.categoryMappings) {
      if (mapping.keywords.some(keyword => lowerTopic.includes(keyword))) {
        return mapping.category;
      }
    }
    
    return 'General Research';
  }

  async conductResearch(): Promise<void> {
    console.log('🔬 Starting AI research...');
    console.log(`📝 Research topic: ${this.topic}`);
    console.log(`📂 Category: ${this.findings.category}`);
    console.log(`🔑 API Key present: ${this.apiKey ? 'Yes' : 'No'}`);
    
    if (!this.apiKey) {
      console.warn('⚠️  PPLX_API_KEY not found. Using simulated research data.');
      console.warn('💡 To use real Perplexity research, set PPLX_API_KEY environment variable.');
      await this.simulateResearch();
      return;
    }

    console.log('🚀 Attempting real Perplexity API research...');
    try {
      await this.perplexityResearch();
    } catch (error) {
      console.error('❌ Perplexity API failed, falling back to simulation:', error);
      console.error('🔍 Error details:', error.message);
      await this.simulateResearch();
    }
  }

  async perplexityResearch(): Promise<void> {
    console.log('🤖 Querying Perplexity API...');
    console.log(`🔑 Using API key: ${this.apiKey.substring(0, 8)}...`);
    
    const researchPrompt = `You are a research assistant. Please provide a comprehensive research brief on the following topic:

Topic: ${this.topic}

Please provide:
1. Key findings and insights (3-5 bullet points)
2. Important sources and references (3-5 reputable sources)
3. Research gaps and opportunities
4. Practical applications or implications
5. Next steps for further research

Format your response as a structured research brief with clear sections.`;

    const body = {
      model: "pplx-7b-chat",
      messages: [{ role: "user", content: researchPrompt }],
      search_domain_filter: ["web"],
    };

    console.log('📤 Sending request to Perplexity API...');
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${this.apiKey}` 
      },
      body: JSON.stringify(body)
    });

    console.log(`📥 API Response Status: ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API request failed: ${res.status} ${res.statusText} - ${errorText}`);
    }

    const json = await res.json() as PerplexityResponse;
    console.log('📋 API Response received, processing...');
    
    const text = json?.choices?.[0]?.message?.content ?? "No result";
    console.log(`📝 Response length: ${text.length} characters`);
    
    if (text === "No result" || text.trim().length < 50) {
      console.error('❌ Insufficient response from API');
      throw new Error("Perplexity API returned insufficient results");
    }
    
    this.findings.perplexityResults = text;
    console.log('✅ Perplexity research completed successfully');
    
    // Process the results into structured data
    this.processPerplexityResults(text);
  }

  private processPerplexityResults(text: string): void {
    // Extract insights from Perplexity response
    const lines = text.split('\n').filter(line => line.trim());
    
    // Create research topics based on the response
    this.findings.topics = [
      {
        title: this.topic,
        description: `Research findings from Perplexity AI for: ${this.topic}`,
        priority: 'high' as const,
        status: 'completed' as const
      }
    ];

    // Extract key insights with better parsing
    const insights = [];
    let inInsightsSection = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Look for section headers
      if (trimmedLine.toLowerCase().includes('key findings') || 
          trimmedLine.toLowerCase().includes('insights') ||
          trimmedLine.toLowerCase().includes('findings')) {
        inInsightsSection = true;
        continue;
      }
      
      // Stop at next major section
      if (inInsightsSection && (trimmedLine.toLowerCase().includes('sources') ||
          trimmedLine.toLowerCase().includes('references') ||
          trimmedLine.toLowerCase().includes('next steps') ||
          trimmedLine.toLowerCase().includes('applications'))) {
        break;
      }
      
      // Extract bullet points and numbered items
      if (inInsightsSection && (trimmedLine.startsWith('•') || 
          trimmedLine.startsWith('-') || 
          trimmedLine.startsWith('*') ||
          trimmedLine.match(/^\d+\./))) {
        const insight = trimmedLine.replace(/^[•\-\*\d+\.]\s*/, '').trim();
        if (insight.length > 10) { // Only include substantial insights
          insights.push(insight);
        }
      }
    }
    
    // Fallback to simple bullet point extraction if section parsing failed
    if (insights.length === 0) {
      this.findings.insights = lines
        .filter(line => line.includes('•') || line.includes('-') || line.includes('*'))
        .slice(0, 5)
        .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
        .filter(insight => insight.length > 10);
    } else {
      this.findings.insights = insights.slice(0, 5);
    }

    // Generate next steps based on the research
    this.findings.nextSteps = [
      'Review and validate research findings',
      'Implement recommendations from the research',
      'Schedule follow-up research if needed',
      'Document key insights for future reference'
    ];
  }

  async simulateResearch(): Promise<void> {
    console.log('🔄 Using simulated research data...');
    
    // Create meaningful research topics based on the input
    const topicLower = this.topic.toLowerCase();
    
    // Generate relevant research topics based on keywords
    const researchTopics: ResearchTopic[] = [];
    
    if (topicLower.includes('biomaterial') || topicLower.includes('material')) {
      researchTopics.push(
        {
          title: 'Biomaterials for Medical Applications',
          description: 'Research into biocompatible materials for implants and medical devices',
          priority: 'high' as const,
          status: 'in_progress' as const
        },
        {
          title: 'Tissue Engineering Materials',
          description: 'Advanced materials for regenerative medicine and tissue scaffolds',
          priority: 'high' as const,
          status: 'pending' as const
        },
        {
          title: 'PRISMA Protocol Development',
          description: 'Systematic review methodology for biomaterials research',
          priority: 'medium' as const,
          status: 'pending' as const
        }
      );
    } else if (topicLower.includes('math') || topicLower.includes('laplace') || topicLower.includes('equation')) {
      researchTopics.push(
        {
          title: 'Mathematical Analysis Techniques',
          description: 'Advanced methods for solving differential equations and transforms',
          priority: 'high' as const,
          status: 'in_progress' as const
        },
        {
          title: 'Numerical Methods',
          description: 'Computational approaches for mathematical problem solving',
          priority: 'high' as const,
          status: 'pending' as const
        }
      );
    } else if (topicLower.includes('project') || topicLower.includes('build') || topicLower.includes('develop')) {
      researchTopics.push(
        {
          title: 'Project Planning and Management',
          description: 'Best practices for project development and execution',
          priority: 'high' as const,
          status: 'in_progress' as const
        },
        {
          title: 'Technology Stack Selection',
          description: 'Choosing appropriate tools and frameworks for development',
          priority: 'medium' as const,
          status: 'pending' as const
        }
      );
    } else {
      // Default research topics
      researchTopics.push(
        {
          title: this.topic,
          description: `Research analysis for: ${this.topic}`,
          priority: 'high' as const,
          status: 'in_progress' as const
        },
        {
          title: 'Related Research Areas',
          description: 'Exploring connected topics and methodologies',
          priority: 'medium' as const,
          status: 'pending' as const
        }
      );
    }

    this.findings.topics = researchTopics;

    // Generate contextual insights based on the topic
    let insights = [];
    
    if (topicLower.includes('biomaterial')) {
      insights = [
        'Recent advances in biocompatible materials show promise for medical applications',
        'PRISMA guidelines provide systematic framework for evidence synthesis',
        'Tissue engineering requires careful material selection and biocompatibility testing',
        'Systematic reviews help identify gaps in current research',
        'Material properties must balance mechanical strength with biological compatibility'
      ];
    } else if (topicLower.includes('math') || topicLower.includes('laplace')) {
      insights = [
        'Laplace transforms provide powerful tools for solving differential equations',
        'Numerical methods offer computational alternatives to analytical solutions',
        'MATLAB and Python provide robust platforms for mathematical computation',
        'Understanding mathematical foundations is crucial for engineering applications',
        'Systematic approaches help organize complex mathematical problems'
      ];
    } else {
      insights = [
        `Key research focus: ${this.topic}`,
        'Systematic approaches improve research quality and reproducibility',
        'Evidence-based methods provide reliable foundations for decision making',
        'Documentation and methodology are crucial for research success',
        'Collaborative approaches enhance research outcomes'
      ];
    }

    this.findings.insights = insights;

    // Generate relevant next steps
    let nextSteps = [];
    
    if (topicLower.includes('biomaterial')) {
      nextSteps = [
        'Conduct systematic literature review using PRISMA guidelines',
        'Identify key material properties and biocompatibility requirements',
        'Analyze current research gaps and opportunities',
        'Develop research protocol and methodology',
        'Plan experimental validation approaches'
      ];
    } else if (topicLower.includes('math') || topicLower.includes('laplace')) {
      nextSteps = [
        'Review mathematical foundations and theory',
        'Implement computational solutions using appropriate software',
        'Validate results through analytical and numerical methods',
        'Document solution methodology and assumptions',
        'Prepare comprehensive analysis and conclusions'
      ];
    } else {
      nextSteps = [
        `Develop comprehensive research plan for ${this.topic}`,
        'Identify key resources and methodologies',
        'Create systematic approach to information gathering',
        'Plan implementation and validation steps',
        'Document findings and recommendations'
      ];
    }

    this.findings.nextSteps = nextSteps;

    console.log('✅ Simulated research completed');
  }

  generateReport(): string {
    const report = `# AI Research Report - ${this.findings.date}

## Research Topic
**${this.topic}**

## Category
**${this.findings.category}**

## Research Topics

${this.findings.topics.map(topic => 
  `### ${topic.title}
- **Priority**: ${topic.priority}
- **Status**: ${topic.status}
- **Description**: ${topic.description}
`).join('\n')}

## Key Insights

${this.findings.insights.map(insight => `- ${insight}`).join('\n')}

## Next Steps

${this.findings.nextSteps.map(step => `- ${step}`).join('\n')}

${this.findings.perplexityResults ? `
## Perplexity AI Research Results

${this.findings.perplexityResults}
` : ''}

---
*Generated by AI Research System on ${new Date().toISOString()}*
`;

    return report;
  }

  async saveReport(): Promise<void> {
    const report = this.generateReport();
    writeFileSync('RESEARCH.md', report);
    console.log('📄 Research report saved to RESEARCH.md');
  }
}

// Main execution
async function main() {
  try {
    const topic = process.argv.slice(2).join(" ") || "repo roadmap";
    console.log(`🚀 Starting research for topic: "${topic}"`);
    
    const research = new AIResearch(topic);
    await research.conductResearch();
    await research.saveReport();
    console.log('🎉 Research workflow completed successfully!');
  } catch (error) {
    console.error('❌ Research failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { AIResearch };
