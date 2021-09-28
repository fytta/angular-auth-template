import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class BaseCrudService {

    httpClient: HttpClient;
    url: string;

    constructor(httpClient: HttpClient, @Inject('url') url: string) {
        this.httpClient = httpClient;
        this.url = url;
    }

    public save(object: any): Observable<any> {
        return this.httpClient.post<any>(this.url + 'create', object);
    }

    public delete(id: number, objeto: Object): Observable<any> {
        return this.httpClient.delete<any>(this.url + `delete/${id}`);
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.url + "list");
    }

    public getOne(id: number): Observable<any> {
        return this.httpClient.get<any>(this.url + `getone/${id}`);
    }

    public update(id: number, object: Object): Observable<any> {
        return this.httpClient.put<any>(this.url + `update/${id}`, object);
    }

}