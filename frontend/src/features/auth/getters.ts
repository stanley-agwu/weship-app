import { IRootState } from '../../types.ts';

export const getAuthState = (state: IRootState) => state.auth;
