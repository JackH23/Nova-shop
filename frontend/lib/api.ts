const API_URL = process.env.NEXT_PUBLIC_API_URL;
let refreshPromise: Promise<string> | null = null;

function getStoredToken(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(key) || sessionStorage.getItem(key);
}

function saveAccessToken(accessToken: string) {
  if (typeof window === "undefined") {
    return;
  }

  // If refreshToken is stored in localStorage,
  // Remember Me was enabled.
  if (localStorage.getItem("refreshToken")) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    sessionStorage.setItem("accessToken", accessToken);
  }
}

async function refreshAccessToken() {
  const refreshToken = getStoredToken("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to refresh access token");
  }

  saveAccessToken(data.accessToken);

  return data.accessToken;
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const accessToken = getStoredToken("accessToken");

  // First request
  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),

      ...options.headers,
    },
  });

  // Access token expired
  if (
    response.status === 401 &&
    endpoint !== "/auth/login" &&
    endpoint !== "/auth/google" &&
    endpoint !== "/auth/refresh-token"
  ) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      // Retry original request with new token
      response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
          ...options.headers,
        },
      });
    } catch {
      // Refresh token is also invalid/expired
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        window.location.href = "/login";
      }

      throw new Error("Your session has expired. Please login again.");
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
