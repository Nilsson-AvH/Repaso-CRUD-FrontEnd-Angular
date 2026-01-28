import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { HttpCategory } from '../../../../core/services/http-category';

@Component({
  selector: 'app-category-new',
  imports: [ReactiveFormsModule],
  templateUrl: './category-new.html',
  styleUrl: './category-new.css',
})
export class CategoryNew {
  // Definir el atributo que contendra la estructura del formulario, (agrupa los campos del formulario)

  // Forma Imperativa
  formData!: FormGroup; // Tipado que me sugiere angular para los formularios reactivos

  // Controlar cuando se suscribe y se desuscribe a un observable
  registerSubscribed!: Subscription;

  constructor(
    private httpCategory: HttpCategory,
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

  // Metodo con el cual vamos a capturar los datos del formulario al presionar el boton submit
  onSubmit() {
    // Verificar si el formulario es valido
    // IMPORTANTE: Si los campos no tienen validaciones, el formulario siempre sera valido
    if (this.formData.valid) {
      // Registra haciendo uso del servicio

      // Muestra los datos de los campos del formulario
      console.log(this.formData.value)

      this.registerSubscribed = this.httpCategory.createCategory(this.formData.value).subscribe({
        next: (data) => {
          console.log(data)
          this.formData.reset();
          // Redirigir al listado de categorías
          this.router.navigateByUrl('/dashboard/categories');
        },
        error: (error) => {
          console.error(error)
        },
        complete: () => {
          //Toca todos los campos y activa o despliega los mensajes de error
          this.formData.markAsTouched();
        },
      })
    }
    else {
      // Muestre todos los mensajes de error en la vista de cada uno de los campor
      console.error('Formulario invalido');
    }
  }

  ngOnDestroy() {

    // Validar que el observable no este suscrito
    if (this.registerSubscribed) {
      console.info('Componente destruido');
      this.registerSubscribed.unsubscribe(); //Desuscribirse manualmente
    }
  }
}
