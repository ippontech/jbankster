import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStellarAccount } from 'app/shared/model/stellar-account.model';

@Component({
    selector: 'jhi-stellar-account-detail',
    templateUrl: './stellar-account-detail.component.html'
})
export class StellarAccountDetailComponent implements OnInit {
    stellarAccount: IStellarAccount;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stellarAccount }) => {
            this.stellarAccount = stellarAccount;
        });
    }

    previousState() {
        window.history.back();
    }
}
