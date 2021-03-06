function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
  
const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOT_ADMIN = '/admin';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    plants: path(ROOTS_DASHBOARD, '/plants'),
    users: path(ROOTS_DASHBOARD, '/users'),
    user: path(ROOTS_DASHBOARD, '/profile')
  }
};

export const PATH_ADMIN = {
  root: ROOT_ADMIN,
  general: {
    plants: path(ROOT_ADMIN, '/plants'),
    users: path(ROOT_ADMIN, '/users'),
  }
}