import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { ItemPedido } from '../../../models/itemPedido.models';
import { ItemPedidoService } from '../../../services/itemPedido.service';

export const itempedidoResolver: ResolveFn<ItemPedido> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ItemPedidoService).findById(route.paramMap.get('id')!);
};
