# Architecture and folder structure

## Stack

| Layer      | Choice                                                              | Added in                               |
| ---------- | ------------------------------------------------------------------- | -------------------------------------- |
| Frontend   | Next.js App Router, TypeScript                                      | Phase 0                                |
| Styling    | Tailwind CSS                                                        | Phase 0                                |
| Components | Custom components, with shadcn/ui only where it saves real work     | Phase 1                                |
| Maps       | Leaflet (pinned CDN file), OpenStreetMap                            | Phase 2                                |
| Backend    | Next.js Route Handlers                                              | Phase 4                                |
| Database   | MongoDB Atlas                                                       | Phase 4                                |
| Validation | Zod                                                                 | Phase 4, or earlier if a form needs it |
| Images     | Cloudinary                                                          | Phase 4                                |
| Testing    | Vitest (Phase 1), Playwright (when the first user journey needs it) | Phase 1 onward                         |
| Formatting | Prettier                                                            | Phase 1                                |
| Hosting    | Vercel, awaiting confirmation                                       | Phase 5                                |

Packages are installed only in the phase that uses them. This keeps the project small and avoids maintaining unused code.

A separate Express server, Redis and microservices are excluded unless a clear need emerges.

## How the application fits together

```text
Browser
  -> Next.js pages (server components by default)
       -> feature code
            -> data-access functions (server only)
                 -> MongoDB Atlas

Admin forms and client requests
  -> Route Handlers
       -> Zod validation, then authorization
            -> data-access functions
```

One Next.js application serves both the website and its API. For a solo developer, this means one codebase and one deployment.

No runtime packages have been added since Phase 0. Leaflet 1.9.4 loads on map pages from a version-pinned CDN file with integrity checks. Icons are a small inline set, and motion uses CSS, which keeps the browser download small.

Key rules:

- Pages use server components by default. Client components are used only where the browser is required, such as the map and interactive filters.
- Only data-access functions talk to MongoDB.
- Secrets stay on the server.
- Anything entering from outside is validated with Zod.
- Admin operations are authorized on the server, never only in the interface.

## Folder structure

Folders are created when a phase first needs them.

```text
src/
  app/                  Routes, layouts and Route Handlers
    (public)/           Public website pages
    admin/              Admin pages
    api/                Route Handlers
  components/
    ui/                 Reusable basic components
    layout/             Header, navigation and footer
  features/             Code for one feature, such as places or events
  lib/                  Shared helpers and configuration
  server/               Server-only database connection and data access
  types/                Types shared across features
docs/                   Project documentation
public/                 Static files
```

A feature's code stays in its folder until two or more features need it. It then moves to `components` or `lib`.

## Images

Phase 1 photos are served from Wikimedia Commons and optimized by `next/image`. Phase 4 moves approved images to Cloudinary. Each photo's credit stays in `src/lib/photos.ts`.

## Content

Public pages read published records through `src/server/content.ts`. Pure filter and search logic stays in `src/features`. Starter content lives in `src/server/seed`. Filters and search use the URL, so results can be shared.

## Dated content

Past events drop out automatically at request time. News pages hold our own short summaries and link to the publisher for the full report.

Live service data stays with its official owners. The site links to the Ama app and NTES, and labels its own bus and station details as scheduled reference information.

## Data trust

Every public content record needs a source and a last-updated time. Scheduled information must be labelled as scheduled. If a value is unknown, the interface shows that it is unavailable.

Development data must also be verified, or clearly marked as test data and kept out of production.
