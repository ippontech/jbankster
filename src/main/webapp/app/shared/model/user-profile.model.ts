import { IStellarAccount } from './stellar-account.model';

export interface IUserProfile {
  id?: number;
  phone?: string;
  stellarAccounts?: IStellarAccount[];
}

export const defaultValue: Readonly<IUserProfile> = {};
