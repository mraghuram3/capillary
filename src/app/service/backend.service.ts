import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Game } from './../model/game';
 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
@Injectable()
export class BackendService {

 apiurl = '/api/';
 dataUrl: string = this.apiurl + 'games';
 sortUrl: string = this.apiurl + 'sort';
 searchUrl: string = this.apiurl + 'search';

    constructor(private http: Http) {
    }
  getGames(): Observable<Game[]> {
    const body = JSON.stringify({});
    console.log(body);
    return this.http.post(this.dataUrl, body, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  search (query: string): Observable<Game[]> {
    const body = JSON.stringify({title: query});
    console.log(body);
    return this.http.post(this.searchUrl, body, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  sort (query: string, by: string): Observable<Game[]> {
    const body = JSON.stringify({title: query, by: by});
    console.log(body);
    return this.http.post(this.sortUrl, body, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getOptions(): RequestOptions {
     const headers = new Headers({'Content-Type': 'application/json'});
     const token = localStorage.getItem('token');
     console.log(token);
     headers.append('x-access-token', token);
     const options = new RequestOptions({ headers: headers });

     return options;
  }
  private extractData(res: Response) {
    const body = res.json();
    console.log(body);
    return body;
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
