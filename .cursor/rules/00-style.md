# Code Style Rules

## TypeScript/JavaScript Style Guidelines

### General Principles
- Use TypeScript for all new code
- Prefer explicit types over `any`
- Use meaningful variable and function names
- Follow camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use UPPER_SNAKE_CASE for constants

### Code Formatting
- Use 2 spaces for indentation
- Use semicolons consistently
- Use single quotes for strings
- Use trailing commas in objects and arrays
- Use const/let instead of var
- Prefer arrow functions for callbacks

### Type Definitions
```typescript
// Good
interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Avoid
const user: any = { ... };
```

### Function Guidelines
- Keep functions small and focused
- Use descriptive parameter names
- Prefer pure functions when possible
- Use async/await over promises
- Handle errors explicitly

### File Organization
- One main export per file
- Use named exports over default exports
- Group imports: external libraries, internal modules, relative imports
- Keep files under 200 lines when possible

### Documentation
- Use JSDoc for public APIs
- Include examples for complex functions
- Document async operations and error conditions
- Keep comments up-to-date with code changes

## AI Research Specific Guidelines

### Research Code
- Make research scripts reproducible
- Include clear logging and progress indicators
- Use configuration files for parameters
- Version control all research data
- Document methodology and assumptions

### Data Handling
- Use consistent data structures
- Validate input data
- Handle missing data gracefully
- Use appropriate data types for research metrics
- Include data provenance information

### Error Handling
- Use try-catch blocks for async operations
- Log errors with context
- Provide meaningful error messages
- Implement retry logic for network operations
- Gracefully handle API rate limits
