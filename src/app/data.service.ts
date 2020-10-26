import { Injectable } from '@angular/core';
import { Comment } from './comment';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result:any;
  constructor(private _http: HttpClient) {}
  
   getComment(): Observable<Comment[]>{
    return this._http.get<Comment[]>("/api/comment");
  }
  postComment(com:Comment): Observable<Comment> {
    return this._http.post<Comment>("/api/postComment",com);
  }
  
}
