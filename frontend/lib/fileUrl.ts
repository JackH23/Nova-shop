export function getFileUrl(path?: string | null) {
  if (!path) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BACKEND_URL = API_URL?.replace(/\/api\/?$/, "") ?? "";

  return `${BACKEND_URL}${path}`;
}