# GitHub setup and initial issues

Run these steps once, after `npm install` has created `package-lock.json`.

## 1. Create the repository

Create an empty repository named `mybhubaneswar` on GitHub, with no README, `.gitignore` or license.

## 2. Make the first commit and create the permanent branches

Run these inside the project folder, replacing `YOUR-USERNAME`:

```bash
git init -b main
git add .
git status
git commit -m "chore: set up project foundation"
git remote add origin https://github.com/YOUR-USERNAME/mybhubaneswar.git
git push -u origin main
git switch -c dev
git push -u origin dev
```

Check that `git status` lists no `.env.local` or `node_modules` before committing.

## 3. Protect `main`

In **Settings > Branches**, add a rule for `main`:

- Require a pull request before merging
- Block force pushes

Don't require an approving review, because GitHub won't let you approve your own pull request.

GitHub offers this protection on public repositories, and on private repositories only with a paid plan. On a free private repository, follow the same rule by hand.

## 4. Create the Project board

Under **Projects > New project**, choose the **Board** layout and name it `MyBhubaneswar.com`. Use the columns `Backlog`, `Ready`, `In progress`, `In review` and `Done`, and link the repository.

## 5. Add the initial issues

Create one issue for each task, then add them to the board.

| Title                                           | Acceptance criteria                                                          |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| Phase 0: Confirm V1 scope and open decisions    | All items in `docs/v1-scope.md` are confirmed                                |
| Phase 1: Define design tokens                   | Typography, colors, spacing, shadows and radii are defined                   |
| Phase 1: Build header, navigation and footer    | Navigation works on mobile and desktop                                       |
| Phase 1: Create reusable UI components          | Buttons, inputs, cards, badges and section headers follow common conventions |
| Phase 1: Create loading, empty and error states | Each state is reusable and responsive                                        |
| Phase 1: Create shared layouts and breakpoints  | Layouts work on mobile and desktop                                           |
| Phase 1: Configure formatting and basic tests   | Linting, formatting, type checks and tests pass with no errors               |
