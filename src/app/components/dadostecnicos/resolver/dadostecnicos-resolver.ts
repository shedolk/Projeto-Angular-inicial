import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { DadosTecnicos } from '../../../models/dadostecnicos.models';
import { DadostecnicosService } from '../../../services/dadostecnicos.service';

export const dadosTecnicosResolver: ResolveFn<DadosTecnicos> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(DadostecnicosService).findById(route.paramMap.get('id')!);
};
