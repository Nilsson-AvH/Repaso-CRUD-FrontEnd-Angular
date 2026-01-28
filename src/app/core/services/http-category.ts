import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// El servicio del frontend se habla con el backend por medio de la url base

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private base_url: string = 'http://localhost:3000/api/categories';
  // const http = inject(HttpClient); // Inyección de dependencia en una funcion
  // Se inyecta como dependencia la clase que permite hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  createCategory(newCategory: any): Observable<any> {
    return this.http.post(this.base_url, newCategory);
  }
  getCategories(): Observable<any> {
    return this.http.get(this.base_url);
  }
  // Verificar que estructura de datos me trae el backend
  // getCategories().pipe
  // }
}