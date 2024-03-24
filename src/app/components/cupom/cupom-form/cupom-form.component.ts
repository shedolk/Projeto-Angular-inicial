import { NgIf } from '@angular/common';
import { CupomService } from '../../../services/cupom.service';
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
import { Cupom } from '../../../models/cupom.models';

@Component({
  selector: 'app-cupom-form',
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
  templateUrl: './cupom-form.component.html',
  styleUrl: './cupom-form.component.css',
})
export class CupomFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const cupom: Cupom = this.activatedRoute.snapshot.data['cupom'];

    this.formGroup = this.formBuilder.group({
      id: [cupom && cupom.id ? cupom.id : null],
      nomeCupom: [cupom && cupom.nomeCupom ? cupom.nomeCupom : null],
      dataAplicada: [cupom && cupom.dataAplicada ? cupom.dataAplicada : null],
      cidade: [cupom && cupom.desconto ? cupom.desconto : null],
    });
  }
  salvarCupom() {
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;
      if (cupom.id == null) {
        this.cupomService.insert(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.router.navigateByUrl('/cupoms');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.cupomService.update(cupom).subscribe({
          next: (cupomAlterado) => {
            this.router.navigateByUrl('/cupom');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluirCupom() {
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;
      if (cupom.id != null) {
        this.cupomService.delete(cupom).subscribe({
          next: () => {
            this.router.navigateByUrl('/cupom');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
