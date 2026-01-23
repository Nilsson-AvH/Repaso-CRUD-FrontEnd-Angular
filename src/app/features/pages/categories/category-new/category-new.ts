import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
      name: new FormControl(''),
      description: new FormControl(''),
    })
  }
}
