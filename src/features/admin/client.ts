export type ApiResult = {
  success: boolean;
  message: string;
  details: { field: string; message: string }[];
  data?: unknown;
};

/** Sends a request and always returns a readable result. */
export async function sendJson(url: string, method: string, body?: unknown): Promise<ApiResult> {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const json = await response.json();

    return {
      success: json.success,
      message: json.error?.message ?? "",
      details: json.error?.details ?? [],
      data: json.data,
    };
  } catch {
    return { success: false, message: "The request failed. Try again.", details: [] };
  }
}
