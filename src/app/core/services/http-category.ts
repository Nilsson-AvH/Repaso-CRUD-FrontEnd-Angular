import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  // const http = inject(HttpClient); // Inyección de dependencia en una funcion
  // Se inyecta como dependencia la clase que permite hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  createCategory(newCategory: any) {
    return this.http.post('http://localhost:3000/api/categories', newCategory);
  }
}
