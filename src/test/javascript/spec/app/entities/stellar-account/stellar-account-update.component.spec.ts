/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JBanksterTestModule } from '../../../test.module';
import { StellarAccountUpdateComponent } from 'app/entities/stellar-account/stellar-account-update.component';
import { StellarAccountService } from 'app/entities/stellar-account/stellar-account.service';
import { StellarAccount } from 'app/shared/model/stellar-account.model';

describe('Component Tests', () => {
    describe('StellarAccount Management Update Component', () => {
        let comp: StellarAccountUpdateComponent;
        let fixture: ComponentFixture<StellarAccountUpdateComponent>;
        let service: StellarAccountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JBanksterTestModule],
                declarations: [StellarAccountUpdateComponent]
            })
                .overrideTemplate(StellarAccountUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StellarAccountUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StellarAccountService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StellarAccount(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stellarAccount = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StellarAccount();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stellarAccount = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
