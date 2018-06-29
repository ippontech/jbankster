import { IUserProfile } from './user-profile.model';

export interface IStellarAccount {
  id?: number;
  name?: string;
  accountId?: string;
  secretSeed?: string;
  userProfiles?: IUserProfile[];
}

export const defaultValue: Readonly<IStellarAccount> = {};
