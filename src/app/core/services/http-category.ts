import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
// Category no es mas que un tipo de dato que define la estructura de un objeto que yo mismo me invente
// para que el frontend sepa que estructura de datos va a recibir del backend
// y no me de errores de que no existe una propiedad
// La palabra type es para decirle a typescript que voy a usar un tipo de dato
// Type solo me indica, no hace nada
import { type Category } from '../interfaces/Category'; // Importamos la interface Category
import { environment } from '../../../environments/environment';

// El servicio del frontend se habla con el backend por medio de la url base

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private base_url: string = environment.apiUrl;
  private slug: string = 'categories';
  // const http = inject(HttpClient); // Inyección de dependencia en una funcion
  // Se inyecta como dependencia la clase que permite hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // Aca basicamente se definen los metodos que se van a usar para hacer peticiones HTTP
  // Como se harian en el postman

  createCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(`${this.base_url}/${this.slug}`, newCategory);
  }

  getCategoryById(id: String): Observable<Category> {
    return this.http.get<Category>(`${this.base_url}/${this.slug}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base_url}/${this.slug}`)
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

  updateCategoryById(id: string | null, updatedCategory: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.base_url}/${this.slug}/${id}`, updatedCategory);
  }
}