#!/usr/bin/env node

import fs from "fs";
import fetch from "node-fetch";

interface SynthesisResult {
  brief: string;
  issues: string[];
  prDescription: string;
  testPlan: string;
}

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

class ResearchSynthesizer {
  private inputFile: string;
  private apiKey: string;
  private input: string;

  constructor(inputFile: string = "RESEARCH.md") {
    this.inputFile = inputFile;
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.input = '';
  }

  async loadInput(): Promise<void> {
    console.log(`📚 Loading input from: ${this.inputFile}`);
    
    if (!fs.existsSync(this.inputFile)) {
      throw new Error(`Input file not found: ${this.inputFile}`);
    }
    
    this.input = fs.readFileSync(this.inputFile, 'utf8');
    console.log(`📊 Loaded ${this.input.length} characters from input file`);
  }

  async synthesizeWithOpenAI(): Promise<string> {
    if (!this.apiKey) {
      console.warn('⚠️  OPENAI_API_KEY not found. Using simulated synthesis.');
      return this.generateSimulatedSynthesis();
    }

    console.log('🤖 Querying OpenAI API...');
    
    const body = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `You are a pragmatic assistant. Read the research below and output ONLY the following sections, in this exact order and concise style:

# Direct Answers
- Answer the user's question(s) in plain language (3-7 bullets max)

# Next Actions
- A short checklist of concrete steps the user can take next (5-8 items)

# Materials (if relevant)
- List required materials/tools succinctly

# Risks & Mitigations (optional)
- Up to 3 bullets

# References (optional)
- Up to 5 short, high-signal references, if present in research

Do NOT describe the repo structure or general capabilities. Focus on answering the user's prompt directly.

---\n${this.input}`
        }
      ]
    };

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${this.apiKey}` 
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(`OpenAI API request failed: ${res.status} ${res.statusText}`);
      }

      const json = await res.json() as OpenAIResponse;
      const text = json?.choices?.[0]?.message?.content ?? JSON.stringify(json, null, 2);
      
      console.log('✅ OpenAI synthesis completed');
      return text;
    } catch (error) {
      console.error('❌ OpenAI API failed, falling back to simulation:', error);
      return this.generateSimulatedSynthesis();
    }
  }

  private generateSimulatedSynthesis(): string {
    console.log('🔄 Using simulated synthesis...');
    
    return `# Direct Answers
- This is a simulated synthesis. Provide specific, actionable guidance based on the research input.
- Summarize the most relevant points to answer the user's prompt directly.

# Next Actions
- List 5–8 concrete, short steps the user can take.

# Materials (if relevant)
- List only what’s needed to proceed.

# Risks & Mitigations
- Up to 3 bullets with succinct mitigations.

# References
- Include up to 5 high-signal references if present in research.`
  }

  async saveSynthesis(output: string): Promise<void> {
    const outputFile = 'SYNTHESIS.md';
    fs.writeFileSync(outputFile, output);
    console.log(`📄 Synthesis report saved to ${outputFile}`);
  }
}

// Main execution
async function main() {
  try {
    const inputFile = process.argv[2] || "RESEARCH.md";
    console.log(`🚀 Starting synthesis for input: "${inputFile}"`);
    
    const synthesizer = new ResearchSynthesizer(inputFile);
    await synthesizer.loadInput();
    
    const synthesisResult = await synthesizer.synthesizeWithOpenAI();
    
    // Write to stdout for piping, or save to file
    if (process.argv.includes('>')) {
      process.stdout.write(synthesisResult);
    } else {
      await synthesizer.saveSynthesis(synthesisResult);
    }
    
    console.log('🎉 Synthesis workflow completed successfully!');
  } catch (error) {
    console.error('❌ Synthesis failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { ResearchSynthesizer };
