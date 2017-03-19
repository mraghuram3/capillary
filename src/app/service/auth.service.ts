import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  public token: string;
  public loginUrl: string = '/api/authenticate/';

  constructor(private http: Http) {
     const tokenfromcache = localStorage.getItem('token');
      if (tokenfromcache != null) {
        this.token = tokenfromcache; }
   }
   login(username: string, password: string): Observable<boolean> {
            const body = JSON.stringify({ name: username, password: password });
            const headers = new Headers({ 'Content-Type': 'application/json' });
            const options = new RequestOptions({ headers: headers });

            console.log(body);
        return this.http.post(this.loginUrl, body, options)
            .map((res: Response) => {
                // login successful if there's a jwt token in the response
                console.log(res);
                const token = res.json().token;
                if (token != null) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', token);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('token');
    }
}