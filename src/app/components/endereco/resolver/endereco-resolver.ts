import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { EnderecoService } from '../../../services/endereco.service';
import { Endereco } from '../../../models/endereco.models';

export const enderecoResolver: ResolveFn<Endereco> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(EnderecoService).findById(route.paramMap.get('id')!);
};
