import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<string>;

    private tokenObs: Observable<string>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<string>(
            localStorage.getItem('userToken')
        );
        this.tokenObs = this.currentUserSubject.asObservable();
    }

    public get token() {
        return this.tokenObs;
    }

    public get tokenValue() {
        return this.currentUserSubject.value;
    }

    public isLoggedIn() {
        if (environment.noLogin) {
            return true;
        }
        return this.currentUserSubject.value !== null;
    }

    public login(credentials: LoginCredentials): Observable<string> {
        return this.http
            .post<LoginResponse>(
                `${environment.apiUrl}/auth_api/login`,
                credentials
            )
            .pipe(
                catchError(_ => this.logout),
                map(res => {
                    localStorage.setItem('userToken', res.token);
                    this.currentUserSubject.next(res.token);
                    return res.token;
                })
            );
    }

    public logout() {
        localStorage.removeItem('userToken');
        this.currentUserSubject.next(null);
    }
}
