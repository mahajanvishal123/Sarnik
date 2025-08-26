import { apiUrl } from '../../../redux/utils/config';

export const API_BASE = `${apiUrl}/notifiction`;

export async function saveToken(token, userId = "guest") {
  await fetch(`${API_BASE}/save-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, userId }),
  });
}

export async function sendTestNotification(token, title, body) {
  const res = await fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      notification: { title, body },
      data: { click_action: "https://saaranik-projects.netlify.app" },
    }),
  });
  return res.json();
}
