import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Perfil } from '../../../models/perfil.models';
import { PerfilService } from '../../../services/perfil.service';
import { Endereco } from '../../../models/endereco.models';
import { Telefone } from '../../../models/telefone.models';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent {
  formGroup: FormGroup;
  perfils: Perfil[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private PerfilService: PerfilService,
    private authService: AuthService,
  ){

    //const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];

    const id: string = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.usuarioService.findById(id).subscribe((usuario) => {
        this.formGroup.patchValue(usuario);
      });
    }

    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      cpf: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)],
      ],
      idPerfil: ['', Validators.required],
    });
  }

  //   this.formGroup = this.formBuilder.group({
  //     id: [usuario && usuario.id ? usuario.id : null],
  //     nome: [usuario && usuario.nome ? usuario.nome : '', Validators.required],
  //     login: [
  //       usuario && usuario.login ? usuario.login : '',
  //       Validators.required,
  //     ],
  //     senha: [
  //       usuario && usuario.senha ? usuario.senha : '',
  //       Validators.required,
  //     ],
  //     cpf: [
  //       usuario && usuario.cpf ? usuario.cpf : '',
  //     [ Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)],
  //     ],
  //     idPerfil: [usuario && usuario.perfil.id ? usuario.perfil.id : '', Validators.required],
  //   });
  // }

  ngOnInit(): void {
    this.PerfilService.findAll().subscribe((data) => {
      this.perfils = data;
    });
  }


  salvarUsuario() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      //const usuario = this.formGroup.value;

      const usuario = {
        ...this.formGroup.value,
        perfil: this.perfils.find(p => p.id === this.formGroup.value.idPerfil)
      };
      console.log('Usuário para cadastro:', usuario);

      if (usuario.id == null) {
        this.usuarioService.insert(usuario).subscribe({
          next: (usuarioCadastrado) => {
            //this.router.navigateByUrl('/usuarios');
            this.router.navigateByUrl('/login');

            this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            this.tratarErros(err);
          },
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
          next: (usuarioAlterado) => {
            //this.router.navigateByUrl('/usuarios');
            this.authService.updateUsuarioLogado(usuarioAlterado);
            this.router.navigateByUrl('/produtos');

            this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
            this.tratarErros(err);
          },
        });
      }
    }
  }

  excluirUsuario() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;
      if (usuario.id != null) {
        this.usuarioService.delete(usuario).subscribe({
          next: () => {
            this.router.navigateByUrl('/usuarios');
            this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }

  tratarErros(error: HttpErrorResponse) {
    if (error.status === 400) {
      // erros relacionados a campos
      if (error.error?.errors) {
        error.error.errors.forEach((validationError: any) => {
          // obs: o fieldName tem o mesmo valor da api
          const formControl = this.formGroup.get(validationError.fieldName);
          console.log(validationError);
          if (formControl) {
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (error.status < 400) {
      // Erro genérico não relacionado a um campo específico.
      this.snackBar.open(
        error.error?.message || 'Erro genérico no envio do formulário.',
        'Fechar',
        {
          duration: 3000,
        }
      );
    } else if (error.status >= 500) {
      this.snackBar.open(
        'Erro interno do servidor. Por favor, tente novamente mais tarde.',
        'Fechar',
        {
          duration: 3000,
        }
      );
    }
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome deve ser informado.',
    },
    login: {
      required: 'O login deve ser informado.',
    },
    senha: {
      required: 'A senha deve ser informada.',
    },
    cpf: {
      required: 'O CPF deve ser informado.',
      pattern: 'O CPF deve estar no formato xxx.xxx.xxx-xx.',
    },
    perfil: {
      required: 'O perfil deve ser informado.',
    },
  };

  getErrorMessage(
    controlName: string,
    errors: ValidationErrors | null | undefined
  ): string {
    if (!errors) {
      return '';
    }
    // retorna a mensagem de erro
    for (const errorName in errors) {
      if (
        errors.hasOwnProperty(errorName) &&
        this.errorMessages[controlName][errorName]
      ) {
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'Login já existe , coloque outro.)';
  }
}
