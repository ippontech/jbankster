/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JBanksterTestModule } from '../../../test.module';
import { StellarAccountComponent } from 'app/entities/stellar-account/stellar-account.component';
import { StellarAccountService } from 'app/entities/stellar-account/stellar-account.service';
import { StellarAccount } from 'app/shared/model/stellar-account.model';

describe('Component Tests', () => {
    describe('StellarAccount Management Component', () => {
        let comp: StellarAccountComponent;
        let fixture: ComponentFixture<StellarAccountComponent>;
        let service: StellarAccountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JBanksterTestModule],
                declarations: [StellarAccountComponent],
                providers: []
            })
                .overrideTemplate(StellarAccountComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StellarAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StellarAccountService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StellarAccount(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.stellarAccounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
