import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor() {
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

  // Metodo con el cual vamos a capturar los datos del formulario al presionar el boton submit
  onSubmit() {
    // Verificar si el formulario es valido
    // IMPORTANTE: Si los campos no tienen validaciones, el formulario siempre sera valido
    if (this.formData.valid) {
      // Registra haciendo uso del servicio

      // Muestra los datos de los campos del formulario
      console.log(this.formData.value)
    }
    else {
      // Muestre todos los mensajes de error en la vista de cada uno de los campor
      console.error('Formulario invalido');
    }
  }
}
