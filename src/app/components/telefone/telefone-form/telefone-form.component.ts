import { NgIf } from '@angular/common';

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Telefone } from '../../../models/telefone.models';
import { TelefoneService } from '../../../services/telefone.service';

@Component({
  selector: 'app-telefone-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './telefone-form.component.html',
  styleUrl: './telefone-form.component.css',
})
export class TelefoneFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const telefone: Telefone = this.activatedRoute.snapshot.data['telefone'];

    this.formGroup = formBuilder.group({
      id: [telefone && telefone.id ? telefone.id : null],
      codigoArea: [
        telefone && telefone.codigoArea ? telefone.codigoArea : null,
      ],
      numero: [telefone && telefone.numero ? telefone.numero : null],
      idUsuario: [telefone && telefone.usuario.id ? telefone.usuario.id : null],
    });
  }
  salvarTelefone() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id == null) {
        this.telefoneService.insert(telefone).subscribe({
          next: (telefoneCadastrado) => {
            this.router.navigateByUrl('/telefones');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.telefoneService.update(telefone).subscribe({
          next: (telefoneAlterado) => {
            this.router.navigateByUrl('/telefones');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluirTelefone() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id != null) {
        this.telefoneService.delete(telefone).subscribe({
          next: () => {
            this.router.navigateByUrl('/telefones');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
