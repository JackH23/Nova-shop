const API_URL = process.env.NEXT_PUBLIC_API_URL;

let refreshPromise: Promise<string> | null = null;

function getStoredToken(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem(key) ||
    sessionStorage.getItem(key)
  );
}

function saveAccessToken(accessToken: string) {
  if (typeof window === "undefined") {
    return;
  }

  // If refreshToken is stored in localStorage,
  // Remember Me was enabled.
  if (localStorage.getItem("refreshToken")) {
    localStorage.setItem(
      "accessToken",
      accessToken,
    );
  } else {
    sessionStorage.setItem(
      "accessToken",
      accessToken,
    );
  }
}

// ========================================
// Refresh access token
// ========================================

async function refreshAccessToken() {
  const refreshToken =
    getStoredToken("refreshToken");

  if (!refreshToken) {
    throw new Error(
      "Refresh token not found",
    );
  }

  const response = await fetch(
    `${API_URL}/auth/refresh-token`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        refreshToken,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to refresh access token",
    );
  }

  saveAccessToken(data.accessToken);

  return data.accessToken;
}

// ========================================
// Create request headers
// ========================================

function createHeaders(
  options: RequestInit,
  accessToken: string | null,
) {
  const headers = new Headers(
    options.headers,
  );

  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  // JSON request
  if (!isFormData) {
    if (!headers.has("Content-Type")) {
      headers.set(
        "Content-Type",
        "application/json",
      );
    }
  }

  // FormData request
  //
  // Do NOT manually set multipart/form-data.
  // Browser automatically creates:
  //
  // multipart/form-data;
  // boundary=----WebKitFormBoundary...
  if (isFormData) {
    headers.delete("Content-Type");
  }

  // Authorization
  if (accessToken) {
    headers.set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
  }

  return headers;
}

// ========================================
// API request
// ========================================

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const accessToken =
    getStoredToken("accessToken");

  // First request
  let response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: createHeaders(
        options,
        accessToken,
      ),
    },
  );

  // ========================================
  // Access token expired
  // ========================================

  if (
    response.status === 401 &&
    endpoint !== "/auth/login" &&
    endpoint !== "/auth/google" &&
    endpoint !== "/auth/refresh-token"
  ) {
    try {
      if (!refreshPromise) {
        refreshPromise =
          refreshAccessToken().finally(
            () => {
              refreshPromise = null;
            },
          );
      }

      const newAccessToken =
        await refreshPromise;

      // Retry original request
      response = await fetch(
        `${API_URL}${endpoint}`,
        {
          ...options,

          headers: createHeaders(
            options,
            newAccessToken,
          ),
        },
      );
    } catch {
      // Refresh token invalid/expired
      if (typeof window !== "undefined") {
        localStorage.removeItem(
          "accessToken",
        );

        localStorage.removeItem(
          "refreshToken",
        );

        sessionStorage.removeItem(
          "accessToken",
        );

        sessionStorage.removeItem(
          "refreshToken",
        );

        window.location.href = "/login";
      }

      throw new Error(
        "Your session has expired. Please login again.",
      );
    }
  }

  // ========================================
  // Parse response
  // ========================================

  const contentType =
    response.headers.get("content-type");

  let data: any;

  if (
    contentType?.includes(
      "application/json",
    )
  ) {
    data = await response.json();
  } else {
    const text = await response.text();

    if (!response.ok) {
      throw new Error(
        text || "Request failed",
      );
    }

    return text as T;
  }

  // ========================================
  // Error response
  // ========================================

  if (!response.ok) {
    throw new Error(
      data.message || "Request failed",
    );
  }

  return data as T;
}