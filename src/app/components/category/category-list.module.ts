import { NgModule } from "@angular/core";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormField } from "@angular/material/form-field";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    CategoryListComponent,
    CategoryFormComponent,
    // MatTableModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // RouterModule,
    // MatPaginatorModule,
    MatFormField // Adicione o FormsModule aos imports do módulo
  ],
  exports: []
})
export class CategoryListModule { }
