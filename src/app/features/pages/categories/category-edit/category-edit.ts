import { Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  imports: [],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.css',
})
export class CategoryEdit {
  categoryId!: string | null; //Guarda el id de la categoria

  constructor(
    private activatedRoute: ActivatedRoute, // Dependencia que tiene la info de la ruta activa
    private httpCategory: HttpCategory // Dependencia que permite hacer peticiones HTTP
  ) { }

  ngOnInit() {
    // Paso 1: Obtener el id de la categoria
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(`El id de la categoria es: ${this.categoryId}`);

    // Validamos si viene el id para cargar los datos de la categoria por ese id
    if (this.categoryId) {
      // Paso 2: Obtener la categoria por id
      this.httpCategory.getCategoryById(this.categoryId).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => { }
      })
    }
    // Paso 3: Actualizar la categoria
    // Paso 4: Redirigir a la lista de categorias
    // this.httpCategory.getCategoryById();
  }

}
