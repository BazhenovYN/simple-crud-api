# SIMPLE CRUD API

Implement simple CRUD API using in-memory database underneath.

## Installation

> [!IMPORTANT]
> Please read the installation instructions carefully

1. Install Node.js [v20.11.0](https://nodejs.org/en/download)

2. Clone this repository to local computer

```bash
git clone https://github.com/BazhenovYN/simple-crud-api.git
```

3. Navigate to the project directory

```bash
cd simple-crud-api
```

4. Create a `.env` file based on the provided `.env.template`

```bash
cp .env.template .env
```

## Available Scripts

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.

### `npm run start:prod`

Locally preview the production build.

### `npm run test`

Perform a single run of all test suites.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs a scan on your codebase using ESLint. During the scan, ESLint examines your JavaScript code files to identify potential errors, coding conventions violations, and stylistic issues. It applies a set of predefined rules or rulesets to analyze your code, providing feedback on areas that need attention or improvement.

### `npm run lint:fix`

Run this script to make ESLint not only to identify potential errors and violations but also automatically to fix as many of these issues as possible. It applies automatic code transformations to resolve common problems and align your code with the configured ruleset.

This command is useful when you want to quickly fix common issues in your codebase without manually going through each reported problem.

### `npm run format`

Runs a scan on your codebase using Prettier. Prettier analyzes the code files in the project and checks their formatting for compliance with the established rules. If the formatting does not comply with the rules, the command will generate appropriate errors or warnings.

### `npm run format:fix`

Run this script to make Prettier not only to identify potential errors and violations but also automatically to fix as many of these issues as possible. It applies automatic code transformations to resolve common problems and align your code with the configured ruleset.

This command is useful when you want to quickly fix common issues in your codebase without manually going through each reported problem.

## License

[MIT](./LICENSE)
