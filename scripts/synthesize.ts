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
- Include at least 5 concrete inspiration links (images or galleries) relevant to the prompt

# Next Actions
- A short checklist of concrete steps the user can take next (5-8 items)

# Materials (if relevant)
- List required materials/tools succinctly

# Risks & Mitigations (optional)
- Up to 3 bullets

# References (optional)
- Up to 5 short, high-signal references, if present in research

Rules:
- Do NOT describe repo structure.
- Prefer links to image search results, Pinterest/Behance collections, museum pages, or artist portfolios.
- If the prompt references an artist, include a short note on style cues to emulate.

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

    const styleMatch = /Art style:\s*([^,]+(?:,\s*[^,]+)*)/i.exec(this.input);
    const style = styleMatch ? styleMatch[1].trim() : 'paper, colored pencils, freehand';
    const promptMatch = /Prompt:\s*([^\n]+)/i.exec(this.input);
    const promptText = promptMatch ? promptMatch[1].trim() : 'abstract drawing with vibrant colors';
    const q = encodeURIComponent(`${style} ${promptText}`);

    return `# Direct Answers
- Use a saturated palette (cerise, turquoise, canary, violet) with one dark anchoring tone.
- Build layers: light base > mid-tones > selective burnish with white for glow.
- Use dynamic, imperfect linework and asymmetry to convey energy.
- Keep 3–4 color families; reserve black sparingly for emphasis.
- Inspiration links: 
  - Google Images: https://www.google.com/search?q=${q}
  - Pinterest: https://www.pinterest.com/search/pins/?q=${q}
  - Behance projects: https://www.behance.net/search/projects?search=${q}
  - Color palettes: https://color.adobe.com/explore
  - Composition ideas: https://www.pinterest.com/search/pins/?q=${encodeURIComponent('abstract composition thumbnails')}

# Next Actions
- Sketch 3 thumbnails (radial, diagonal, grid-breaker) in 5 minutes each.
- Choose 3–4 core colors; create a 2x3 swatch grid and test blends.
- Lightly block shapes; reserve highlights; avoid heavy outlines early.
- Layer mid-tones; deepen contrast; add 5–7 energetic lines to imply motion.
- Burnish selective highlights; add one accent color (≤5% area) for focal pop.
- Compare against references; tweak palette and contrast.

# Materials (if relevant)
- Smooth paper (Bristol or mixed media), colored pencils (incl. white), kneaded eraser, sharpener, ruler.

# Risks & Mitigations
- Overworking paper → Use light pressure; burnish only at end.
- Muddy blends → Keep color families limited; test on scraps first.
- Flat composition → Push contrast; add directional lines and focal accent.

# References
- Google Images query above
- Pinterest board query above
- Behance projects query above`;
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
