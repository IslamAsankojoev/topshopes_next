export default {
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60 * 1, // 30 дней
  },
  cookies: {
    secure: true,
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
};