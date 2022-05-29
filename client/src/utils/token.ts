export const getToken = () => {
  return localStorage.getItem('tecGreen_token');
}
export const setToken = (token: string) => {
  localStorage.setItem('tecGreen_token', token);
}
export const clearToken = () => {
  localStorage.removeItem('tecGreen_token');
}