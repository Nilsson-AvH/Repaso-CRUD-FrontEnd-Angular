import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import id from '@angular/common/locales/id';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush // mi app usa single change detection pero se puede cambiar a Default
})
export class CategoryList {
  // Definir el atributo que contendra la estructura de las categorias
  public categories$: Observable<any[]> = new Observable<any[]>();
  // categories: any[] = []; // Signals

  // Creamos un atributo para almacenar la categoria que se va a editar
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);
  // Trigger sirve para forzar la actualizacion de la vista

  public categoryToEdit: any = null;

  constructor(
    private httpCategory: HttpCategory,
    private router: Router) { }

  // Usamos el Hook del ciclo de vida del componente
  ngOnInit() {
    // Se usa el trigger para forzar la actualizacion de la vista
    this.categories$ = this.refreshTrigger$.pipe(
      switchMap(() => this.httpCategory.getCategories())
    );


    // Usamos el Hook del Ciclo de vida que avisa que se esta inicializando el componente
    // ngOnInit() {
    //   this.categories$ = this.httpCategory.getCategories()
    // IMPORTANTE: Si la estructura de datos que Ud esta trayendo del Backend tiene varias propiedades, asegurece de extraer solo los datos que necesita
    // .pipe(
    //   map( data => {
    //     return data.data;
    //   }),
    //   catchError( err => {
    //     return of([])
    //   })
    // );
  }

  onDelete(id: string) {
    console.info(`Elimina la categoria: ${id}`);
    this.httpCategory.deleteCategoryById(id).subscribe({
      next: (data) => {
        console.info(data);
        // Se usa el trigger para forzar la actualizacion de la vista
        this.refreshTrigger$.next();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  onEdit(id: string) {
    console.info(`Edita la categoria: ${id}`);
    // this.router.navigateByUrl('/dashboard/category/edit/' + id);
    // this.router.navigateByUrl(`/dashboard/category/edit/${id}`);
    // this.router.navigate(['/dashboard/category/edit/', id]);
    this.router.navigate(['/dashboard', 'category', 'edit', id]);
  }

}