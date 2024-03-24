import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido.models';

export const pedidoResolver: ResolveFn<Pedido> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PedidoService).findById(route.paramMap.get('id')!);
};
