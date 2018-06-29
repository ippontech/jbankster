import { IStellarAccount } from 'app/shared/model//stellar-account.model';

export interface IUserProfile {
    id?: number;
    phone?: string;
    stellarAccounts?: IStellarAccount[];
}

export class UserProfile implements IUserProfile {
    constructor(public id?: number, public phone?: string, public stellarAccounts?: IStellarAccount[]) {}
}
