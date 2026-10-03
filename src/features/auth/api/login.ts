import type { LoginFormData } from '../schemas/login-schema';
import type { LoginUser } from '../types/login';

export const login = (info: LoginFormData): LoginUser => {
  const { email, password } = info;
  if (email === 'test@example.com' && password === 'password') {
    return { id: 1, name: 'sample太郎' };
  }
  throw new Error('ログインに失敗しました');
};
