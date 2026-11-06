# MyBhubaneswar.com

A trusted digital guide that brings useful information about Bhubaneswar into one place for residents, tourists, students and local businesses.

**Current stage:** Phase 3, content and transport. Content is stored in code until the Phase 4 database.

## Requirements

- Node.js 20.9 or newer (the current LTS release is recommended)
- npm, which is included with Node.js
- Git

## Installation

```bash
git clone <repository-url>
cd <repository-folder>
npm ci
```

Then create your local environment file.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS or Linux:

```bash
cp .env.example .env.local
```

`npm ci` needs the committed `package-lock.json`. The project's `.npmrc` avoids an npm 10.9 install crash, so keep it. The app needs no real secrets during Phase 0.

## Development

```bash
npm run dev
```

Open <http://localhost:3000>.

| Command                | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the development server            |
| `npm run build`        | Create a production build               |
| `npm run start`        | Run the production build                |
| `npm run lint`         | Check code with ESLint                  |
| `npm run typecheck`    | Check TypeScript types                  |
| `npm run format`       | Format all files with Prettier          |
| `npm run format:check` | Check formatting without changing files |
| `npm test`             | Run the unit tests once                 |
| `npm run test:watch`   | Rerun tests as files change             |
| `npm run check`        | Run lint, types, formatting and tests   |

The shared components can be reviewed at <http://localhost:3000/design-system>.

## Git workflow

- `main`: production-ready releases, with no direct pushes
- `dev`: integration branch
- `feature/*`: one small task per branch, merged into `dev` by pull request

Details are in [coding standards](docs/coding-standards.md).

## Project documents

- [V1 scope and decisions](docs/v1-scope.md)
- [Architecture and folder structure](docs/architecture.md)
- [Coding standards](docs/coding-standards.md)
- [API and database conventions](docs/api-and-data.md)
- [Design reference](docs/design-reference.md)
- [GitHub setup and initial issues](docs/github-setup.md)

Task status lives in the GitHub Project board.

## Data rules

- Publish only verified information, with its source and last-updated time.
- Never call data live without a reliable, authorized live source.
- Label missing information as unavailable. Never invent it.
