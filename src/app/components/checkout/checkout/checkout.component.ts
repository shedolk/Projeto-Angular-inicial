import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemCarrinho } from '../../../models/itemcarrinho.models';
import { Order } from '../../../models/order.models';
import { CarrinhoService } from '../../../services/carrinho.service';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { MatRadioModule } from '@angular/material/radio';
import { Address } from '../../../models/adress.models';
import { Phone } from '../../../models/phone.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddressService } from '../../../services/address.service';
import { PhoneService } from '../../../services/phone.service';
import { AddressModalComponent } from '../../addressmodal/addressmodal.component';
import { PhoneModalComponent } from '../../phonemodal/phonemodal.component';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  carrinhoItems: ItemCarrinho[] = [];
  paymentForm!: FormGroup;
  usuarioLogado: Usuario | null = null;
  totalCarrinho: number = 0;

  selectedAddress: Address | null = null;
  selectedPhone: Phone | null = null;

  constructor(
    private carrinhoService: CarrinhoService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private phoneService: PhoneService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(items => {
      this.carrinhoItems = items;
      this.calcularTotalCarrinho();
    });
      //this.calcularTotalCarrinho();
    //   this.carrinhoService.totalComDesconto$.subscribe(total => {
    //     this.totalCarrinho = total;
    // });

    this.paymentForm = this.formBuilder.group({
      paymentMethod: ['card', Validators.required],
      cardNumber: [''],
      cardName: [''],
      expiryDate: [''],
      cvv: ['']
    });

    this.authService.getUsuarioLogado().subscribe(usuario => {
      this.usuarioLogado = usuario;
    });
    this.setupCardValidators();
  }

  setupCardValidators() {
    this.paymentForm.get('paymentMethod')!.valueChanges.subscribe(method => {
      if (method === 'card') {
        this.paymentForm.get('cardNumber')!.setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(16)]);
        this.paymentForm.get('cardName')!.setValidators([Validators.required]);
        this.paymentForm.get('expiryDate')!.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]);
        this.paymentForm.get('cvv')!.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
      } else {
        this.paymentForm.get('cardNumber')!.clearValidators();
        this.paymentForm.get('cardName')!.clearValidators();
        this.paymentForm.get('expiryDate')!.clearValidators();
        this.paymentForm.get('cvv')!.clearValidators();
      }
      this.paymentForm.get('cardNumber')!.updateValueAndValidity();
      this.paymentForm.get('cardName')!.updateValueAndValidity();
      this.paymentForm.get('expiryDate')!.updateValueAndValidity();
      this.paymentForm.get('cvv')!.updateValueAndValidity();
    });
  }

  calcularTotalCarrinho() {
    this.totalCarrinho = this.carrinhoItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const desconto = this.carrinhoService.getDesconto();
    this.totalCarrinho -= desconto;
  }

  onCheckout() {
    if (this.paymentForm.invalid && this.paymentForm.get('paymentMethod')!.value === 'card') {
      this.showSnackbar('Por favor, preencha todas as informações de pagamento corretamente.', 'Fechar');
      return;
    }

    if (this.carrinhoItems.length === 0) {
      this.showSnackbar('Seu carrinho está vazio.', 'Fechar');
      return;
    }

    // Atualizar o preço de cada item no carrinho para refletir o desconto
    const desconto = this.carrinhoService.getDesconto();
    const totalOriginal = this.carrinhoItems.reduce((total, item) => total + item.preco * item.quantidade, 0);
    const fatorDesconto = totalOriginal / (totalOriginal - desconto);

    const itensComDesconto = this.carrinhoItems.map(item => ({
      ...item,
      preco: item.preco / fatorDesconto
    }));

    this.orderService.save(itensComDesconto).subscribe({
      next: (order: Order) => {
        this.showSnackbar('Pedido realizado com sucesso!', 'Fechar');
        this.carrinhoService.limparCarrinho();
        this.router.navigate(['/produtos']); // ou outra rota, conforme necessário

    // this.orderService.save(this.carrinhoItems).subscribe({
    //   next: (order: Order) => {
    //     this.showSnackbar('Pedido realizado com sucesso!', 'Fechar');
    //     this.carrinhoService.limparCarrinho();
    //     this.router.navigate(['/produtos']); // ou outra rota, conforme necessário
      },
      error: (err) => {
        console.error(err);
        this.showSnackbar('Erro ao realizar o pedido. Tente novamente.', 'Fechar');
      }
    });
  }

  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  selectAddress(): void {
    const dialogRef = this.dialog.open(AddressModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedAddress = result;
      }
    });
  }

  selectPhone(): void {
    const dialogRef = this.dialog.open(PhoneModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedPhone = result;
      }
    });
  }
}
