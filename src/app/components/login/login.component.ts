import { Perfil } from './../../models/perfil.models';
import { Usuario } from './../../models/usuario.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { usuarioResolver } from '../usuario/resolver/usuario-resolver';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.minLength(3)]],
      // password: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login = this.loginForm.get('login')!.value;
      const password = this.loginForm.get('password')!.value;
      this.authService.login(login, password).subscribe({
        next: (resp) => {
          // const user = resp.body;
          // if (user.perfil.id === 1) {
          //   this.router.navigateByUrl('/');
          // } else if (user.perfil.id === 2) {
          //   this.router.navigateByUrl('/admin');
          // } else {
          //   this.router.navigateByUrl('/login');
          // }

          // redirecionar para a página principal
          //this.router.navigateByUrl('/produtos');

          //implementar a logica p buscar o idPerfil do usuario logado
          // if (resp.idPerfil == 1) {
          //   this.router.navigateByUrl('/');
          // }
          // else {
          //   this.router.navigateByUrl('/admin');
          // }
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log(err);
          this.showSnackbarTopPosition(
            'Usuário ou senha Inválidos',
            'Fechar',
            2000
          );
        },
      });
    } else {
      this.showSnackbarTopPosition('Dados inválidos', 'Fechar', 2000);
    }
  }

  onRegister() {
    // criar usuário
  }

  showSnackbarTopPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
