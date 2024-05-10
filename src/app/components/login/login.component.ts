import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // const email = this.loginForm.get('email')!.value;
      // const password = this.loginForm.get('password')!.value;
      const login = this.loginForm.get('login')!.value;
      const senha = this.loginForm.get('senha')!.value;
      // this.authService.login(email, password).subscribe({
      this.authService.login(login, senha).subscribe({
        next: (resp) => {
          // redirecionar para a página principal
          this.router.navigateByUrl('/usuarios');
        },
        error: (err) => {
          console.log(err);
          this.showSnackbarTopPosition("Usuário ou senha Inválidos", 'Fechar', 2000);
        }
      });
    } else {
      this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 2000);
    }
  }

  onRegister() {
    // criar usuário
  }

  showSnackbarTopPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
