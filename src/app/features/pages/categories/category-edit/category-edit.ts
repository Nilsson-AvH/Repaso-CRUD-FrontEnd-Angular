import { Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.css',
})
export class CategoryEdit {
  // Definir el atributo que contendra la estructura del formulario, (agrupa los campos del formulario)

  // Forma Imperativa
  formData!: FormGroup; // Tipado que me sugiere angular para los formularios reactivos

  // Controlar cuando se suscribe y se desuscribe a un observable
  registerSubscribed!: Subscription;

  //Guarda el id de la categoria
  categoryId!: string | null;

  constructor(
    private activatedRoute: ActivatedRoute, // Dependencia que tiene la info de la ruta activa
    private httpCategory: HttpCategory, // Dependencia que permite hacer peticiones HTTP
    private router: Router
  ) {
    // Instanciando un objeto de la clase FormGroup (Para crear em el formulario)
    // Se usa para agrupar los campos que llevará el formulario
    this.formData = new FormGroup({
      // Instanciando un objeto de la clase FormControl (Para crear un campo)
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ),
      description: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(140)
        ]
      ),
    })
  }

  // Getters para acceder a los campos del formulario
  get theName() {
    return this.formData.get('name')
  }

  get theDescription() {
    return this.formData.get('description')
  }

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

  onSubmit() {
    console.log(this.formData.value);
  }

}
