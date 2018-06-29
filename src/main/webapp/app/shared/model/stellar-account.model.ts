import { IUserProfile } from 'app/shared/model//user-profile.model';

export interface IStellarAccount {
    id?: number;
    name?: string;
    accountId?: string;
    secretSeed?: string;
    userProfiles?: IUserProfile[];
}

export class StellarAccount implements IStellarAccount {
    constructor(
        public id?: number,
        public name?: string,
        public accountId?: string,
        public secretSeed?: string,
        public userProfiles?: IUserProfile[]
    ) {}
}
