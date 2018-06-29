import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStellarAccount } from 'app/shared/model/stellar-account.model';
import { StellarAccountService } from './stellar-account.service';

@Component({
    selector: 'jhi-stellar-account-delete-dialog',
    templateUrl: './stellar-account-delete-dialog.component.html'
})
export class StellarAccountDeleteDialogComponent {
    stellarAccount: IStellarAccount;

    constructor(
        private stellarAccountService: StellarAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stellarAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stellarAccountListModification',
                content: 'Deleted an stellarAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stellar-account-delete-popup',
    template: ''
})
export class StellarAccountDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stellarAccount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StellarAccountDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stellarAccount = stellarAccount;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
