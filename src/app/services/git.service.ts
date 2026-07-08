import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import { GitProfile } from "../models/gitprofile";
import { Repo } from "../models/repo";


@Injectable({
  providedIn: 'root',
})
export class GitService {
  apiUrl = 'https://api.github.com/users/:user';

  constructor(private http: HttpClient) {}

  getUsers(username: string): Observable<GitProfile> {
    const apiUrl = this.apiUrl.replace(':user', username);

    return this.http.get<GitProfile>(apiUrl,);
  }

  getRepos(username: string): Observable<Repo[]> {
    const apiUrl = this.apiUrl.replace(':user', username) + '/repos';

    return this.http.get<Repo[]>(apiUrl);
  }
}