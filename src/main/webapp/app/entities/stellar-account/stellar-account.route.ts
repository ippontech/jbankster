import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { StellarAccount } from 'app/shared/model/stellar-account.model';
import { StellarAccountService } from './stellar-account.service';
import { StellarAccountComponent } from './stellar-account.component';
import { StellarAccountDetailComponent } from './stellar-account-detail.component';
import { StellarAccountUpdateComponent } from './stellar-account-update.component';
import { StellarAccountDeletePopupComponent } from './stellar-account-delete-dialog.component';
import { IStellarAccount } from 'app/shared/model/stellar-account.model';

@Injectable({ providedIn: 'root' })
export class StellarAccountResolve implements Resolve<IStellarAccount> {
    constructor(private service: StellarAccountService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((stellarAccount: HttpResponse<StellarAccount>) => stellarAccount.body);
        }
        return Observable.of(new StellarAccount());
    }
}

export const stellarAccountRoute: Routes = [
    {
        path: 'stellar-account',
        component: StellarAccountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jBanksterApp.stellarAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stellar-account/:id/view',
        component: StellarAccountDetailComponent,
        resolve: {
            stellarAccount: StellarAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jBanksterApp.stellarAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stellar-account/new',
        component: StellarAccountUpdateComponent,
        resolve: {
            stellarAccount: StellarAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jBanksterApp.stellarAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stellar-account/:id/edit',
        component: StellarAccountUpdateComponent,
        resolve: {
            stellarAccount: StellarAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jBanksterApp.stellarAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stellarAccountPopupRoute: Routes = [
    {
        path: 'stellar-account/:id/delete',
        component: StellarAccountDeletePopupComponent,
        resolve: {
            stellarAccount: StellarAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jBanksterApp.stellarAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
