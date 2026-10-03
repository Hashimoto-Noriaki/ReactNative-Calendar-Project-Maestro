import { create } from 'zustand';
import type { LoginUser } from '../types/login';

type LoginUserState = {
  loginUser: LoginUser;
  setLoginUser: (user: LoginUser) => void;
  logout: () => void;
};

const initialUser: LoginUser = { id: 0, name: '' };

export const useLoginUserStore = create<LoginUserState>((set) => ({
  loginUser: initialUser,
  setLoginUser: (user) => set({ loginUser: user }),
  logout: () => set({ loginUser: initialUser }),
}));
