export interface SubmitFormResult {
  ok: boolean;
  error?: string;
}

/**
 * Submit form data as JSON to a webhook URL.
 * Handles errors gracefully and returns a result object.
 *
 * @param url - The webhook endpoint URL
 * @param data - The form data object to send
 * @returns Promise resolving to { ok: boolean; error?: string }
 */
export async function submitForm(
  url: string,
  data: Record<string, any>
): Promise<SubmitFormResult> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const result = await response.json();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
