import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JBanksterUserProfileModule } from './user-profile/user-profile.module';
import { JBanksterStellarAccountModule } from './stellar-account/stellar-account.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JBanksterUserProfileModule,
        JBanksterStellarAccountModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JBanksterEntityModule {}
