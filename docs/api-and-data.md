# API and database conventions

The API follows these conventions. Admin routes live under `/api/v1/admin`, and every one checks the session and role on the server.

## Endpoints

- Base path: `/api/v1`
- Plural, kebab-case resources: `/api/v1/places`, `/api/v1/bus-routes`
- Single records by slug on public routes: `/api/v1/places/{slug}`
- Resources: `places`, `categories`, `events`, `news`, `bus-routes`, `bus-stops`, `people`, `businesses`
- List filters as query parameters: `?category=temple&page=1&limit=20`

## Response formats

Success with one record:

```json
{
  "success": true,
  "data": {}
}
```

Success with a list:

```json
{
  "success": true,
  "data": [],
  "meta": { "page": 1, "limit": 20, "total": 0, "totalPages": 0 }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "A readable explanation.",
    "details": []
  }
}
```

`details` is optional and only lists problems that are safe to show.

| Status | Code               | Meaning                               |
| ------ | ------------------ | ------------------------------------- |
| 400    | `VALIDATION_ERROR` | The input is invalid                  |
| 401    | `UNAUTHENTICATED`  | Sign-in is required                   |
| 403    | `FORBIDDEN`        | The user lacks permission             |
| 404    | `NOT_FOUND`        | The record doesn't exist              |
| 409    | `CONFLICT`         | The record clashes with existing data |
| 429    | `RATE_LIMITED`     | Too many requests                     |
| 500    | `INTERNAL_ERROR`   | An unexpected server error occurred   |

Dates use UTC ISO 8601 strings and are displayed in India Standard Time.

## Database ownership

The project owner owns the schemas, indexes, migrations and production data. All database access goes through `src/server`, and each collection has one data-access module. Schema changes are made in a pull request with the Zod schema, types and indexes updated together.

Development and production use separate databases.

## Shared content fields

Public content records include these fields:

| Field                     | Purpose                         |
| ------------------------- | ------------------------------- |
| `slug`                    | Stable, unique URL identifier   |
| `status`                  | `draft` or `published`          |
| `sourceName`, `sourceUrl` | Where the information came from |
| `lastVerifiedAt`          | When a person last checked it   |
| `createdAt`, `updatedAt`  | Record history                  |

Optional facts that aren't verified are left out and displayed as unavailable, never filled with a guess.

Schemas for Place, Category, Event, NewsArticle, BusRoute, BusStop, Person, Business and User are in `src/server/schemas.ts`. Bus routes keep their ordered stop names, and each BusStop lists the route numbers that serve it.
