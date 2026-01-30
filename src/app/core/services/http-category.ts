import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

// El servicio del frontend se habla con el backend por medio de la url base

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private base_url: string = 'http://localhost:3000/api';
  private slug: string = 'categories';
  // const http = inject(HttpClient); // Inyección de dependencia en una funcion
  // Se inyecta como dependencia la clase que permite hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // Aca basicamente se definen los metodos que se van a usar para hacer peticiones HTTP
  // Como se harian en el postman

  createCategory(newCategory: any): Observable<any> {
    return this.http.post(`${this.base_url}/${this.slug}`, newCategory);
  }

  getCategoryById(id: String) {
    return this.http.get(`${this.base_url}/${this.slug}/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.base_url}/${this.slug}`)
      .pipe(
        tap(data => console.info(data)),
        catchError(err => of([])),
      );
  }
  // Verificar que estructura de datos me trae el backend
  // getCategories().pipe
  // }
  deleteCategoryById(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/${this.slug}/${id}`);
  }
}