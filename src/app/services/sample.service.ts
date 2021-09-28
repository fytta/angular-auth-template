import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class SampleService extends BaseCrudService {

  constructor(httpClient: HttpClient) {
    const url: string = 'http://localhost:8080/sample/';
    super(httpClient, url);
  }

}