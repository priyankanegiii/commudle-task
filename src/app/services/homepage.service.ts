import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { DevToArticle } from '../models/devtoarticle' ;


@Injectable({
    providedIn: 'root',
})

export class HomepageService {
    apiUrl : string = 'https://dev.to/api/articles';
    constructor(private http: HttpClient){}
    getArticles():Observable<DevToArticle[]> {
        return this.http.get<DevToArticle[]>(this.apiUrl);
    }
}