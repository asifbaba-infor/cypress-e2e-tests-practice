# Security Best Practices

## Handling Sensitive Information

### Credentials
- Never hardcode credentials in source code
- Store credentials in `cypress.env.json` which is gitignored
- For CI/CD, use environment variables provided by your CI system

### JWT Tokens
- Never hardcode JWT tokens in source code or config files
- JWT tokens should be generated during test execution via API calls
- Store tokens temporarily in Cypress.env('token') during test execution
- Do not commit tokens to the repository

## Security Measures
1. All sensitive files are added to `.gitignore`
2. Credentials are stored in environment variables
3. JWT tokens are generated at runtime
4. No hardcoded secrets in the codebase

## Reporting Security Issues
If you discover any security issues, please report them to the project maintainer immediately.