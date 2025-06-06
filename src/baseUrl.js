let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
if (baseUrl.endsWith('/')) {
  baseUrl = baseUrl.slice(0, -1);
}
export default baseUrl;
