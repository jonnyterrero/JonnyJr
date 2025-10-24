# Usage Guide

Welcome to the AI Research Repository! This guide will help you get started with automated AI research, synthesis, and reporting.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Git
- GitHub CLI (for PR management)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd ai-research-repo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

### API Keys Setup
```bash
# Required API keys
PPLX_API_KEY=your_perplexity_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GITHUB_TOKEN=your_github_token_here
```

## 🔬 Research Workflows

### Manual Research
```bash
# Research a specific topic
npm run research "AI safety in autonomous vehicles"

# Research with custom parameters
npx ts-node scripts/research.ts "Machine learning in healthcare" --constraints "2023-2024" --domains "academic,industry"
```

### Automated Research
```bash
# Run synthesis on research
npm run synthesize

# Synthesize specific file
npx ts-node scripts/synthesize.ts RESEARCH.md > SYNTHESIS.md

# Create pull request
npm run open-pr
```

### GitHub Actions
1. Go to Actions tab in your repository
2. Select "AI Research & PR" workflow
3. Click "Run workflow"
4. Enter your research topic
5. Optionally customize branch name
6. Click "Run workflow"

## 📊 Generated Reports

### Research Reports
- **RESEARCH.md**: Current research findings
- **SYNTHESIS.md**: Synthesized analysis and recommendations
- **docs/nightly/**: Archived research reports by date

### Report Structure
```markdown
# Research Report - 2024-01-15

## Research Topic
[Your research topic]

## Key Findings
- Finding 1
- Finding 2
- Finding 3

## Sources
1. [Author, Year] - [Title] - [URL]
2. [Author, Year] - [Title] - [URL]

## Next Steps
- [ ] Action item 1
- [ ] Action item 2
```

## 🏫 School Projects

### Project Structure
```
school/
├── MAP2302/                    # Differential Equations
│   ├── assignment-1/
│   │   ├── README.md          # Problem statement, approach
│   │   ├── solution.m          # MATLAB solution
│   │   └── results/           # Generated results
│   └── assignment-2/
├── Biomaterials/               # Biomaterials course
│   ├── project-1/
│   │   ├── README.md
│   │   ├── analysis.py        # Python analysis
│   │   └── results/
│   └── project-2/
└── CS101/                      # Computer Science
    ├── project-1/
    └── project-2/
```

### Creating School Projects
```bash
# Generate school project structure
npm run docs:school "MAP2302" "Assignment 3"

# Create MATLAB project
mkdir -p school/MAP2302/assignment-3
cd school/MAP2302/assignment-3
# Add your MATLAB files
```

### MATLAB Projects
```matlab
% solution.m
function solution()
    % Set random seed for reproducibility
    rng(42);
    
    % Problem parameters
    % [Define your problem here]
    
    % Solution implementation
    % [Implement your solution]
    
    % Results
    % [Display results]
end
```

### Python Projects
```python
# analysis.py
#!/usr/bin/env python3
"""
Project analysis script
"""

import numpy as np
import matplotlib.pyplot as plt

def main():
    # Set random seed for reproducibility
    np.random.seed(42)
    
    # Your analysis code here
    pass

if __name__ == "__main__":
    main()
```

## 🤖 AI Research Features

### Perplexity Integration
- Web-grounded research with sources
- Real-time information gathering
- Diverse domain coverage
- Source validation

### OpenAI Synthesis
- Intelligent analysis of research
- Structured output generation
- Task list creation
- PR body generation

### Automated Workflows
- Daily research scheduling
- Nightly synthesis
- Automatic PR creation
- Historical archiving

## 📝 Documentation

### Briefs
```bash
# Generate research brief
npm run docs:brief "AI Safety Research"

# Output: docs/briefs/ai-safety-research.md
```

### Plans
```bash
# Generate project plan
npm run docs:plan "Implement ML Pipeline"

# Output: docs/plans/implement-ml-pipeline.md
```

### Changelog
```bash
# Generate changelog
npm run docs:changelog

# Output: CHANGELOG.md
```

## 🔧 Development

### Quality Checks
```bash
# Run all quality checks
npm run quality

# Individual checks
npm run lint:check    # Linting
npm run typecheck     # Type checking
npm test             # Tests
npm run test:coverage # Coverage
```

### Testing
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Code Style
- Follow TypeScript best practices
- Use meaningful variable names
- Include comprehensive error handling
- Write tests for all public APIs

## 🔒 Security

### Environment Variables
```bash
# Never commit .env files
echo ".env" >> .gitignore

# Use .env.example for required variables
cp .env.example .env
# Edit .env with your actual values
```

### Data Protection
- Redact PII beyond first names
- Anonymize dataset IDs
- Use pseudonyms for health data
- Follow privacy guidelines

## 📅 Scheduling

### Reminders
```bash
# Create reminder issue
gh issue create --title "[Reminder] Submit lab report — 2025-10-28 14:00" --label "type:reminder" --body "What: Submit lab report
When: 2025-10-28T14:00:00-04:00
Auto-cron suggestion: 0 14 * * 1-5"
```

### Automated Scheduling
- GitHub Actions for daily research
- Cron expressions for custom timing
- Notification paths for reminders
- BuildShip integration for complex workflows

## 🐛 Troubleshooting

### Common Issues

#### API Key Errors
```bash
# Check environment variables
echo $PPLX_API_KEY
echo $OPENAI_API_KEY

# Verify .env file
cat .env
```

#### Permission Errors
```bash
# Check GitHub token permissions
gh auth status

# Verify repository access
gh repo view
```

#### Node.js Issues
```bash
# Check Node.js version
node --version

# Update npm
npm install -g npm@latest

# Clear npm cache
npm cache clean --force
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run research

# Verbose output
npm run research -- --verbose
```

## 📚 Resources

### Documentation
- [Cursor Rules](.cursor/rules/) - Development guidelines
- [API Documentation](docs/api/) - API reference
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

### External Resources
- [Perplexity API](https://perplexity.ai/) - Research API
- [OpenAI API](https://platform.openai.com/) - Synthesis API
- [GitHub CLI](https://cli.github.com/) - GitHub integration

### Examples
- [Research Examples](examples/research/) - Sample research workflows
- [School Projects](examples/school/) - Academic project templates
- [Automation Examples](examples/automation/) - Workflow examples

## 🆘 Support

### Getting Help
1. Check this documentation
2. Search existing issues
3. Create a new issue with detailed description
4. Join GitHub Discussions

### Issue Template
```markdown
## Problem Description
[Clear description of the problem]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: [e.g., Windows 10, macOS 13, Ubuntu 22.04]
- Node.js: [version]
- npm: [version]

## Additional Context
[Any other relevant information]
```

## 🎯 Best Practices

### Research
- Use specific, focused topics
- Include constraints and domains
- Verify sources and citations
- Document methodology

### Development
- Write tests for new features
- Follow coding style guidelines
- Update documentation
- Use conventional commits

### School Projects
- Include problem statements
- Document derivation steps
- Add proper references
- Ensure reproducibility

## 🚀 Advanced Usage

### Custom Workflows
```yaml
# .github/workflows/custom-research.yml
name: Custom Research
on:
  workflow_dispatch:
    inputs:
      topic:
        description: "Research topic"
        required: true
      domains:
        description: "Research domains"
        required: false
        default: "academic,industry"

jobs:
  research:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Custom Research
        run: |
          npx ts-node scripts/research.ts "${{ github.event.inputs.topic }}" \
            --domains "${{ github.event.inputs.domains }}"
```

### Integration Examples
```typescript
// Custom research integration
import { PerplexityClient } from './assistant/api-clients/perplexity';
import { OpenAIClient } from './assistant/api-clients/openai';

async function customResearch(topic: string) {
  const perplexity = new PerplexityClient(process.env.PPLX_API_KEY!);
  const openai = new OpenAIClient(process.env.OPENAI_API_KEY!);
  
  const research = await perplexity.research(topic);
  const synthesis = await openai.synthesize(research);
  
  return { research, synthesis };
}
```

---

*This usage guide covers the essential features of the AI Research Repository. For more detailed information, refer to the specific documentation files and examples.*
