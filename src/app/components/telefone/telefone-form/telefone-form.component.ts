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
    const telefone: Telefone = activatedRoute.snapshot.data['telefone'];

    this.formGroup = formBuilder.group({
      // id: [telefone && telefone.id ? telefone.id : null],
      // nome: [
      //   telefone && telefone.nome ? telefone.nome : '',
      //   Validators.required,
      // ],
      // login: [
      //   telefone && telefone.login ? telefone.login : '',
      //   Validators.required,
      // ],
      // senha: [
      //   telefone && telefone.senha ? telefone.senha : '',
      //   Validators.required,
      // ],
      // cpf: [telefone && telefone.cpf ? telefone.cpf : ''],
      // perfil: [telefone && telefone.perfil ? telefone.perfil : ''],
      // codigoArea: [telefone && telefone.codigoArea ? telefone.codigoArea : ''],
      // numero: [telefone && telefone.numero ? telefone.numero : ''],
      // rua: [telefone && telefone.rua ? telefone.rua : ''],
      // numeroCasa: [telefone && telefone.numeroCasa ? telefone.numeroCasa : ''],
      // cidade: [telefone && telefone.cidade ? telefone.cidade : ''],
      // estado: [telefone && telefone.estado ? telefone.estado : ''],
      // cep: [telefone && telefone.cep ? telefone.cep : ''],
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
