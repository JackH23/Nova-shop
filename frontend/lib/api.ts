const API_URL = process.env.NEXT_PUBLIC_API_URL;

let refreshPromise: Promise<string> | null = null;

// ========================================
// Get stored token
// ========================================

export function getStoredToken(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
}

// ========================================
// Check JWT expiration
// ========================================

function isTokenExpired(token: string | null) {
  if (!token) {
    return true;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );

    if (!payload.exp) {
      return true;
    }

    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

// ========================================
// Check refresh token
// ========================================

function getValidRefreshToken() {
  const refreshToken = getStoredToken("refreshToken");

  if (!refreshToken) {
    return null;
  }

  if (isTokenExpired(refreshToken)) {
    clearAuthTokens();

    return null;
  }

  return refreshToken;
}

// ========================================
// Check authentication
// ========================================

export function hasAuthToken() {
  const accessToken = getStoredToken("accessToken");

  const refreshToken = getStoredToken("refreshToken");

  if (refreshToken && isTokenExpired(refreshToken)) {
    clearAuthTokens();

    return false;
  }

  return Boolean(accessToken || refreshToken);
}

// ========================================
// Save access token
// ========================================

function saveAccessToken(accessToken: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("accessToken", accessToken);
}

// ========================================
// Clear authentication
// ========================================

function clearAuthTokens() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Remove tokens from old implementation
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");

  // Notify Navbar/useMe
  window.dispatchEvent(
    new Event("auth-changed"),
  );
}

// ========================================
// Refresh access token
// ========================================

async function refreshAccessToken() {
  const refreshToken = getValidRefreshToken();

  if (!refreshToken) {
    clearAuthTokens();

    throw new Error(
      "Refresh token expired or not found",
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
    clearAuthTokens();

    throw new Error(
      data.message ||
        "Unable to refresh access token",
    );
  }

  if (!data.accessToken) {
    clearAuthTokens();

    throw new Error(
      "New access token was not returned",
    );
  }

  // IMPORTANT:
  // Replace access token only.
  // Do NOT remove refresh token.
  saveAccessToken(data.accessToken);

  return data.accessToken;
}

// ========================================
// Create request headers
// ========================================

function createHeaders(options: RequestInit, accessToken: string | null) {
  const headers = new Headers(options.headers);

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  // JSON request
  if (!isFormData) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  // FormData
  if (isFormData) {
    headers.delete("Content-Type");
  }

  // Authorization
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
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
  const accessToken = getStoredToken("accessToken");

  const storedRefreshToken = getStoredToken("refreshToken");

  const refreshToken =
    storedRefreshToken && !isTokenExpired(storedRefreshToken)
      ? storedRefreshToken
      : null;

  if (storedRefreshToken && !refreshToken) {
    clearAuthTokens();
  }

  // ========================================
  // First request
  // ========================================

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: createHeaders(options, accessToken),
  });

  // ========================================
  // Authentication endpoints
  // ========================================

  const isAuthEndpoint =
    endpoint === "/auth/login" ||
    endpoint === "/auth/google" ||
    endpoint === "/auth/refresh-token";

  // ========================================
  // 401 Unauthorized
  // ========================================

  if (response.status === 401 && !isAuthEndpoint) {
    // ========================================
    // Guest user
    // ========================================
    //
    // User never logged in.
    // Do NOT redirect.
    // Do NOT refresh.
    //
    // Home page must remain accessible.
    // ========================================

    if (!accessToken && !refreshToken) {
      throw new Error("Authentication required.");
    }

    // ========================================
    // Try refresh token
    // ========================================

    if (refreshToken) {
      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise;

        // Retry original request
        response = await fetch(`${API_URL}${endpoint}`, {
          ...options,

          headers: createHeaders(options, newAccessToken),
        });
      } catch {
        // ========================================
        // Session expired
        // ========================================

        clearAuthTokens();

        // IMPORTANT:
        // Do NOT redirect to /login.
        //
        // Login is now a modal.
        throw new Error("Your session has expired. Please login again.");
      }
    } else {
      // Access token exists but refresh token doesn't
      clearAuthTokens();

      throw new Error("Your session has expired. Please login again.");
    }
  }

  // ========================================
  // Parse response
  // ========================================

  const contentType = response.headers.get("content-type");

  let data: any;

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || "Request failed");
    }

    return text as T;
  }

  // ========================================
  // Error response
  // ========================================

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}
