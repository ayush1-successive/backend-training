# backend-training

This repo includes all my node assignments.

# Install Node.js lts version

1. Update Package list

```
sudo apt update
```

2. Install curl

```
sudo apt install curl
```

3. Setup LTS version of Node.js

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
```

4. Verify Installation

```
node -v
npm -v
```

# Project Setup

1. Cloned the repository with:

```
git clone https://github.com/ayush1-successive/backend-training.git
```

2. Generated this README.md file in the repository explaining all steps.

3. Created file named 'different-architecture.md' to explain various architectural types.

4. Created a file named 'client-server.md' to explain the client-server architecture.

5. Install nodemon globally:

```
npm install -g nodemon
```

6. Created a folder named 'lib.'

7. Inside the 'lib' folder, created a file named 'math.js' and include operations such as add, sub, mult, div.

8. Exported all these operations.

9. In the project's root directory, created an 'index.js' file.

10. Run the application using nodemon;

```
nodemon index.js
```

11. Reviewed the generated 'Maths Operation Result.xlsx' file for the computed values.

## Environment Variables

| Name       | Description                              | Default Value |
| ---------- | ---------------------------------------- | ------------- |
| DEV_MODE   | Mode of the application                  | development   |
| PORT       | Port on which the server will listen     | 8080          |
| JWT_SECRET | Secret key used for JWT token encryption | <secret_key>  |
| MONGO_URL  | URL for connecting to MongoDB            | <mongo_url>   |

## Available Scripts

### `npm test`

Runs the Jest test runner to execute tests.

### `npm run coverage`

Runs Jest with coverage report generation. It watches all files for changes.

### `npm run lint`

Lints TypeScript files in the `src` directory using ESLint.

### `npm run lint:fix`

Fixes linting issues in TypeScript files in the `src` directory using ESLint.

### `npm run prepare`

Installs Husky, a Git hooks manager.

### `npm start`

Starts the application using `nodemon` and executes `ts-node` to run `src/index.ts`.

### `npm run sonarqube`

Executes the SonarQube scanner using the `sonarqube-scanner.js` script.
