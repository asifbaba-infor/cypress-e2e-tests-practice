# Cypress E2E Testing Practice

## Security Note
This project uses environment variables for sensitive information like credentials and does not store JWT tokens in code.

### Setup Instructions
1. Create a `cypress.env.json` file in the project root with the following structure:
```json
{
  "USER_EMAIL": "your-email@example.com",
  "USER_PASSWORD": "your-password"
}
```

2. This file is gitignored to prevent credentials from being committed to the repository.

3. JWT tokens are generated during test execution via the loginAPI command and stored temporarily in Cypress.env('token').

4. For CI/CD pipelines, set these environment variables in your CI system instead of using the file.

## Running Tests
- `npm run cypress:open` - Open Cypress Test Runner
- `npm run cypress:run` - Run tests headlessly

## Project Structure
- `cypress/e2e` - Test files
- `cypress/support` - Support files including custom commands
- `cypress/fixtures` - Test data