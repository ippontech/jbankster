/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JBanksterTestModule } from '../../../test.module';
import { StellarAccountDetailComponent } from 'app/entities/stellar-account/stellar-account-detail.component';
import { StellarAccount } from 'app/shared/model/stellar-account.model';

describe('Component Tests', () => {
    describe('StellarAccount Management Detail Component', () => {
        let comp: StellarAccountDetailComponent;
        let fixture: ComponentFixture<StellarAccountDetailComponent>;
        const route = ({ data: of({ stellarAccount: new StellarAccount(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JBanksterTestModule],
                declarations: [StellarAccountDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StellarAccountDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StellarAccountDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stellarAccount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
