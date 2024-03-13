import { NgIf } from '@angular/common';
import { EnderecoService } from '../../../services/endereco.service';
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
import { Endereco } from '../../../models/endereco.models';

@Component({
  selector: 'app-endereco-form',
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
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.css',
})
export class EnderecoFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const endereco: Endereco = activatedRoute.snapshot.data['endereco'];

    this.formGroup = formBuilder.group({
      // id: [endereco && endereco.id ? endereco.id : null],
      // nome: [
      //   endereco && endereco.nome ? endereco.nome : '',
      //   Validators.required,
      // ],
      // login: [
      //   endereco && endereco.login ? endereco.login : '',
      //   Validators.required,
      // ],
      // senha: [
      //   endereco && endereco.senha ? endereco.senha : '',
      //   Validators.required,
      // ],
      // cpf: [endereco && endereco.cpf ? endereco.cpf : ''],
      // perfil: [endereco && endereco.perfil ? endereco.perfil : ''],
      // codigoArea: [endereco && endereco.codigoArea ? endereco.codigoArea : ''],
      // numero: [endereco && endereco.numero ? endereco.numero : ''],
      // rua: [endereco && endereco.rua ? endereco.rua : ''],
      // numeroCasa: [endereco && endereco.numeroCasa ? endereco.numeroCasa : ''],
      // cidade: [endereco && endereco.cidade ? endereco.cidade : ''],
      // estado: [endereco && endereco.estado ? endereco.estado : ''],
      // cep: [endereco && endereco.cep ? endereco.cep : ''],
    });
  }
  salvarEndereco() {
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      if (endereco.id == null) {
        this.enderecoService.insert(endereco).subscribe({
          next: (enderecoCadastrado) => {
            this.router.navigateByUrl('/enderecos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.enderecoService.update(endereco).subscribe({
          next: (enderecoAlterado) => {
            this.router.navigateByUrl('/enderecos');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluirEndereco() {
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      if (endereco.id != null) {
        this.enderecoService.delete(endereco).subscribe({
          next: () => {
            this.router.navigateByUrl('/enderecos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
