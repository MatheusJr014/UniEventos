// Lightweight JWT payload decoder (browser-only)
// Decodes the payload (base64url) and returns the parsed JSON object.
export default function decodeJwt(token) {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    let payload = parts[1];
    // base64url -> base64
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    // pad
    while (payload.length % 4) payload += '=';
    const decoded = atob(payload);
    // handle UTF-8
    const json = decodeURIComponent(decoded.split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  } catch (err) {
    // swallow errors and return null
    // console.warn('decodeJwt error', err);
    return null;
  }
}
