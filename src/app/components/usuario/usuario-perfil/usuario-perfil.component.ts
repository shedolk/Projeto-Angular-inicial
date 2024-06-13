import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.models';
import { Usuario } from '../../../models/usuario.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { Endereco } from '../../../models/endereco.models';
import { Telefone } from '../../../models/telefone.models';
import { UsuarioService } from '../../../services/usuario.service';
import { EnderecoService } from '../../../services/endereco.service';
import { TelefoneService } from '../../../services/telefone.service';
import { FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../models/adress.models';
import { Phone } from '../../../models/phone.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddressService } from '../../../services/address.service';
import { PhoneService } from '../../../services/phone.service';
import { AddressModalComponent } from '../../addressmodal/addressmodal.component';
import { PhoneModalComponent } from '../../phonemodal/phonemodal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltip,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './usuario-perfil.component.html',
  styleUrl: './usuario-perfil.component.css'
})
export class UsuarioPerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  pedidos: Order[] = [];

  selectedAddress: Address | null = null;
  selectedPhone: Phone | null = null;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private router: Router,
    private addressService: AddressService,
    private phoneService: PhoneService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.authService.getUsuarioLogado().subscribe(usuario => {
      this.usuario = usuario;
      if (usuario) {
        this.carregarPedidos(usuario.id);
        this.carregarUsuario(usuario.login);
      }
    });
  }

  carregarUsuario(login: string): void {
    this.usuarioService.findByLogin(login).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  carregarPedidos(idUsuario: number): void {
    this.orderService.getPedidosPorUsuario(idUsuario).subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }




  editarDados(): void {
    if (this.usuario && this.usuario.login) {
      this.usuarioService.findByLogin(this.usuario.login).subscribe((usuario) => {
        if (usuario && usuario.id) {
          this.router.navigate(['/usuarios/edit', usuario.id]);
        }
      });
    }
  }

  // editarDados(): void {
  //   if (this.usuario && this.usuario.id) {
  //     this.router.navigate(['/usuarios/edit', this.usuario.id]);
  //   }
  // }

  verDetalhes(pedidoId: number): void {
    this.router.navigate(['/orders', pedidoId]);
  }

  voltarParaPrincipal(): void {
    this.router.navigate(['/']);
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
