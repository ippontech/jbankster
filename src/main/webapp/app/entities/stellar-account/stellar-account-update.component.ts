import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStellarAccount } from 'app/shared/model/stellar-account.model';
import { StellarAccountService } from './stellar-account.service';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from 'app/entities/user-profile';

@Component({
    selector: 'jhi-stellar-account-update',
    templateUrl: './stellar-account-update.component.html'
})
export class StellarAccountUpdateComponent implements OnInit {
    private _stellarAccount: IStellarAccount;
    isSaving: boolean;

    userprofiles: IUserProfile[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private stellarAccountService: StellarAccountService,
        private userProfileService: UserProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stellarAccount }) => {
            this.stellarAccount = stellarAccount;
        });
        this.userProfileService.query().subscribe(
            (res: HttpResponse<IUserProfile[]>) => {
                this.userprofiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stellarAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.stellarAccountService.update(this.stellarAccount));
        } else {
            this.subscribeToSaveResponse(this.stellarAccountService.create(this.stellarAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStellarAccount>>) {
        result.subscribe((res: HttpResponse<IStellarAccount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserProfileById(index: number, item: IUserProfile) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get stellarAccount() {
        return this._stellarAccount;
    }

    set stellarAccount(stellarAccount: IStellarAccount) {
        this._stellarAccount = stellarAccount;
    }
}
