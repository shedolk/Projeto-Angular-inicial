import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Order } from '../../../models/order.models';
import { OrderService } from '../../../services/order.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-list-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatToolbar, MatCard, MatCardContent, MatIcon],
  templateUrl: './order-list-admin.component.html',
  styleUrl: './order-list-admin.component.css'
})
export class OrderListAdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cliente', 'total', 'acao'];
  orders: Order[] = [];
  totalFaturamento: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.findAll().subscribe((data: Order[]) => {
      this.orders = data;
      this.calculateTotalFaturamento();
    });
  }

  calculateTotalFaturamento(): void {
    this.totalFaturamento = this.orders.reduce((sum, order) => sum + order.totalPedido, 0);
  }

  viewOrder(orderId: number): void {
    // Lógica para visualizar detalhes do pedido
  }

  deleteOrder(orderId: number): void {
    // Lógica para excluir um pedido
  }
}
