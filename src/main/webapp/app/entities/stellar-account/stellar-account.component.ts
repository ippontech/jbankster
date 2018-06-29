import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStellarAccount } from 'app/shared/model/stellar-account.model';
import { Principal } from 'app/core';
import { StellarAccountService } from './stellar-account.service';

@Component({
    selector: 'jhi-stellar-account',
    templateUrl: './stellar-account.component.html'
})
export class StellarAccountComponent implements OnInit, OnDestroy {
    stellarAccounts: IStellarAccount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private stellarAccountService: StellarAccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.stellarAccountService.query().subscribe(
            (res: HttpResponse<IStellarAccount[]>) => {
                this.stellarAccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStellarAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStellarAccount) {
        return item.id;
    }

    registerChangeInStellarAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('stellarAccountListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
