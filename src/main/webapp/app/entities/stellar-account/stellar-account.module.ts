import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JBanksterSharedModule } from 'app/shared';
import {
    StellarAccountComponent,
    StellarAccountDetailComponent,
    StellarAccountUpdateComponent,
    StellarAccountDeletePopupComponent,
    StellarAccountDeleteDialogComponent,
    stellarAccountRoute,
    stellarAccountPopupRoute
} from './';

const ENTITY_STATES = [...stellarAccountRoute, ...stellarAccountPopupRoute];

@NgModule({
    imports: [JBanksterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StellarAccountComponent,
        StellarAccountDetailComponent,
        StellarAccountUpdateComponent,
        StellarAccountDeleteDialogComponent,
        StellarAccountDeletePopupComponent
    ],
    entryComponents: [
        StellarAccountComponent,
        StellarAccountUpdateComponent,
        StellarAccountDeleteDialogComponent,
        StellarAccountDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JBanksterStellarAccountModule {}
