/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JBanksterTestModule } from '../../../test.module';
import { StellarAccountDeleteDialogComponent } from 'app/entities/stellar-account/stellar-account-delete-dialog.component';
import { StellarAccountService } from 'app/entities/stellar-account/stellar-account.service';

describe('Component Tests', () => {
    describe('StellarAccount Management Delete Component', () => {
        let comp: StellarAccountDeleteDialogComponent;
        let fixture: ComponentFixture<StellarAccountDeleteDialogComponent>;
        let service: StellarAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JBanksterTestModule],
                declarations: [StellarAccountDeleteDialogComponent]
            })
                .overrideTemplate(StellarAccountDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StellarAccountDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StellarAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
