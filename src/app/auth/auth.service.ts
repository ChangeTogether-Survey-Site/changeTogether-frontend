import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({providedIn: "root"})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router){}

    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getIsAuthenticated(){
        return this.isAuthenticated;
    }

    createUser(email: string, password: string){
        const authData: AuthData = {email: email, password: password};
        this.http.post("http://localhost:3500/api/user/signup", authData)
            .subscribe(response => {
                console.log(response);
        });
    }

    loginUser(email: string, password: string){
        const authData: AuthData = {email: email, password: password};
        this.http.post<{token: string}>("http://localhost:3500/api/user/login", authData)
            .subscribe(response => {
                console.log(response);
                const token = response.token;
                this.token = token;
                // broadcast to other components that the auth status has changed
                if (token) {
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(["/"]);
                }

        });
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(["/"]);
    }
}
