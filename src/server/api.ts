import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details?: unknown[],
  ) {
    super(message);
  }
}

export const notFoundError = () => new ApiError(404, "NOT_FOUND", "The record doesn't exist.");

export function ok<T>(data: T, meta?: object, status = 200) {
  return NextResponse.json({ success: true, data, ...(meta && { meta }) }, { status });
}

function toErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: { code: error.code, message: error.message, details: error.details },
      },
      { status: error.status },
    );
  }

  if (error instanceof ZodError) {
    const details = error.issues.map(({ path, message }) => ({
      field: path.join("."),
      message,
    }));
    return toErrorResponse(new ApiError(400, "VALIDATION_ERROR", "Check the form.", details));
  }

  if ((error as { code?: number }).code === 11000) {
    return toErrorResponse(new ApiError(409, "CONFLICT", "That record already exists."));
  }

  // Internal details stay in the server log and never reach the visitor.
  console.error(error);
  return toErrorResponse(new ApiError(500, "INTERNAL_ERROR", "Something went wrong."));
}

export function handle<Context>(
  handler: (request: NextRequest, context: Context) => Promise<Response>,
) {
  return async (request: NextRequest, context: Context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

/** Rejects writes sent from other websites. */
export function assertSameOrigin(request: NextRequest): void {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host || new URL(origin).host !== host) {
    throw new ApiError(403, "FORBIDDEN", "This request isn't allowed.");
  }
}

export async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, "VALIDATION_ERROR", "The request body isn't valid JSON.");
  }
}
