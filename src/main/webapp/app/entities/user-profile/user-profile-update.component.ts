import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';
import { IStellarAccount } from 'app/shared/model/stellar-account.model';
import { StellarAccountService } from 'app/entities/stellar-account';

@Component({
    selector: 'jhi-user-profile-update',
    templateUrl: './user-profile-update.component.html'
})
export class UserProfileUpdateComponent implements OnInit {
    private _userProfile: IUserProfile;
    isSaving: boolean;

    stellaraccounts: IStellarAccount[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userProfileService: UserProfileService,
        private stellarAccountService: StellarAccountService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userProfile }) => {
            this.userProfile = userProfile;
        });
        this.stellarAccountService.query().subscribe(
            (res: HttpResponse<IStellarAccount[]>) => {
                this.stellaraccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userProfile.id !== undefined) {
            this.subscribeToSaveResponse(this.userProfileService.update(this.userProfile));
        } else {
            this.subscribeToSaveResponse(this.userProfileService.create(this.userProfile));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>) {
        result.subscribe((res: HttpResponse<IUserProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStellarAccountById(index: number, item: IStellarAccount) {
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
    get userProfile() {
        return this._userProfile;
    }

    set userProfile(userProfile: IUserProfile) {
        this._userProfile = userProfile;
    }
}
