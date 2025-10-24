# Contributing Guide

Welcome! This repo is a personal assistant workspace that integrates:
- Perplexity (web-grounded research)
- OpenAI (synthesis, code, tests)
- Cursor (IDE guidance via .cursor/rules)
- GitHub Actions (automation)

## Getting Started
1. Clone the repo and install tooling:
   - Node 20+ and pnpm/npm/yarn
   - Python 3.10+
   - MATLAB (if using school templates)

2. Install dependencies:
   ```bash
   cd packages/ts && npm i
   cd ../../packages/py && pip install -r requirements.txt
   ```

## 📋 Development Workflow

### 1. Fork and Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/yourusername/ai-research-repo.git
cd ai-research-repo

# Add upstream remote
git remote add upstream https://github.com/original/ai-research-repo.git
```

### 2. Create Feature Branch
```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-description
```

### 3. Make Changes
- Follow the coding style guidelines in `.cursor/rules/00-style.md`
- Write tests for new functionality
- Update documentation as needed
- Ensure all quality checks pass

### 4. Quality Checks
```bash
# Run all quality checks
npm run quality

# Individual checks
npm run lint:check    # Linting
npm run typecheck     # Type checking
npm test             # Tests
npm run test:coverage # Coverage
```

### 5. Commit Changes
```bash
# Use conventional commits
git add .
git commit -m "feat: add new research feature"
git commit -m "fix: resolve API timeout issue"
git commit -m "docs: update README with setup instructions"
```

### 6. Push and Create PR
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request
gh pr create --title "Your PR Title" --body "Description of changes"
```

## 🧪 Testing Guidelines

### TypeScript Testing
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- research.spec.ts

# Watch mode
npm run test:watch
```

### Python Testing
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run tests
pytest

# Run with coverage
pytest --cov=src
```

### MATLAB Testing
```bash
# Run MATLAB tests
matlab -batch "runtests('test_calculations')"
```

## 📝 Code Style

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Include JSDoc for public APIs

### Python
- Follow PEP 8 conventions
- Use NumPy-style docstrings
- Include type hints where possible

### MATLAB
- Use header blocks with purpose, inputs, outputs
- Follow naming conventions (UpperCamelCase for functions)
- Include examples in documentation

## 🔒 Security Guidelines

### API Keys and Secrets
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Add `.env` to `.gitignore`
- Create `.env.example` for required variables

### Data Protection
- Redact PII beyond first names
- Anonymize dataset IDs
- Use pseudonyms for health data
- Follow privacy guidelines in `.cursor/rules/80-data-secrets.md`

## 📚 Documentation

### Required Documentation
- Update README.md for significant changes
- Add JSDoc/docstrings for new functions
- Update API documentation
- Include examples for complex features

### School Projects
- Include problem statement and approach
- Document derivation steps
- Add proper references (Chicago style if required)
- Include ethics statements where applicable

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Ensure you're using the latest version
3. Verify the issue with minimal reproduction

### Bug Report Template
```markdown
## Bug Description
[Clear description of the bug]

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
- Python: [version] (if applicable)

## Additional Context
[Any other relevant information]
```

## 💡 Feature Requests

### Before Requesting
1. Check existing feature requests
2. Consider if it aligns with project goals
3. Think about implementation complexity

### Feature Request Template
```markdown
## Feature Description
[Clear description of the feature]

## Use Case
[Why is this feature needed?]

## Proposed Solution
[How should this be implemented?]

## Alternatives Considered
[Other approaches you've considered]

## Additional Context
[Any other relevant information]
```

## 🔄 Pull Request Process

### PR Requirements
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] Self-review completed
- [ ] Comments added for complex logic

### PR Template
```markdown
## Changes
[Description of changes made]

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] No breaking changes

## Quality Checks
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Code coverage maintained
- [ ] Documentation updated

## Issues
Fixes #<issue_number>

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No hardcoded secrets
```

## 🏷️ Issue Labels

### Type Labels
- `type:bug` - Bug reports
- `type:feature` - Feature requests
- `type:enhancement` - Improvements
- `type:documentation` - Documentation updates
- `type:question` - Questions or help

### Priority Labels
- `priority:high` - High priority
- `priority:medium` - Medium priority
- `priority:low` - Low priority

### Area Labels
- `area:research` - Research functionality
- `area:api` - API integrations
- `area:testing` - Testing improvements
- `area:documentation` - Documentation
- `area:ci` - CI/CD improvements

## 📞 Getting Help

### Community
- GitHub Discussions for questions
- GitHub Issues for bugs and features
- Pull requests for code contributions

### Resources
- [Cursor Rules Documentation](.cursor/rules/)
- [API Documentation](docs/api/)
- [Usage Guide](docs/USAGE.md)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to the AI research repository! 🎉
