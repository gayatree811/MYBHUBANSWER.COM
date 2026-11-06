# Coding standards

## Naming

| Item                       | Convention           | Example                   |
| -------------------------- | -------------------- | ------------------------- |
| Folders and route segments | kebab-case           | `bus-routes`              |
| Component files            | PascalCase           | `PlaceCard.tsx`           |
| Other TypeScript files     | camelCase            | `formatDate.ts`           |
| Components and types       | PascalCase           | `PlaceCard`               |
| Variables and functions    | camelCase            | `getPlaceBySlug`          |
| Constants                  | UPPER_SNAKE_CASE     | `MAX_PAGE_SIZE`           |
| Environment variables      | UPPER_SNAKE_CASE     | `MONGODB_URI`             |
| MongoDB collections        | Plural camelCase     | `busRoutes`               |
| MongoDB fields             | camelCase            | `lastVerifiedAt`          |
| URLs                       | Lowercase kebab-case | `/places/lingaraj-temple` |

## TypeScript and React

- Keep strict mode on. Avoid `any`; use `unknown` and narrow it.
- Use the `@/` import path for code in `src`.
- Keep components small, and pass data through typed props.
- Use server components unless the browser is required.
- Handle loading, empty and error states.
- Use semantic HTML and support keyboard navigation.
- Keep comments for reasons that the code can't show.

## Security

- Never commit `.env` files, credentials or privileged API keys.
- Use the `NEXT_PUBLIC_` prefix only for values that are safe to expose.
- Validate all external input on the server.
- Check authorization inside every admin Route Handler or server action.
- Never show internal errors or stack traces to users.
- Add a dependency only when it solves a real need, and review `npm audit` results.

## Git workflow

| Branch      | Purpose                                                      |
| ----------- | ------------------------------------------------------------ |
| `main`      | Production-ready releases. Protected, with no direct pushes. |
| `dev`       | Integration of reviewed features.                            |
| `feature/*` | One temporary branch per task.                               |

Typical task:

1. Pick an issue and confirm its acceptance criteria.
2. Run `git switch dev && git pull origin dev`.
3. Run `git switch -c feature/short-task-name`.
4. Build the task, test it and commit it.
5. Push the branch and open a pull request into `dev`.
6. Review the pull request against the issue, and ensure the checks pass before merging.
7. Test the merged result on `dev`.
8. When a release is approved, open a pull request from `dev` into `main`.

Rules:

- Never develop directly on `main`, and preferably not on `dev`.
- Never force-push to `main` or `dev`.
- Keep tasks small and pull requests easy to review.
- Write descriptive commits, such as `feat: add place listing` or `fix: handle missing map coordinates`.

Working alone removes the second reviewer, so each pull request needs a self-review of its diff against the issue's acceptance criteria.
