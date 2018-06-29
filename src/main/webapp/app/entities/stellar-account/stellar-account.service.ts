import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStellarAccount } from 'app/shared/model/stellar-account.model';

type EntityResponseType = HttpResponse<IStellarAccount>;
type EntityArrayResponseType = HttpResponse<IStellarAccount[]>;

@Injectable({ providedIn: 'root' })
export class StellarAccountService {
    private resourceUrl = SERVER_API_URL + 'api/stellar-accounts';

    constructor(private http: HttpClient) {}

    create(stellarAccount: IStellarAccount): Observable<EntityResponseType> {
        return this.http.post<IStellarAccount>(this.resourceUrl, stellarAccount, { observe: 'response' });
    }

    update(stellarAccount: IStellarAccount): Observable<EntityResponseType> {
        return this.http.put<IStellarAccount>(this.resourceUrl, stellarAccount, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStellarAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStellarAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
