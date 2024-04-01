import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { Category } from '../../../models/category.models';
import { CategoryService } from '../../../services/categoria.service';

export const categoryResolver: ResolveFn<Category> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CategoryService).findById(route.paramMap.get('id')!);
};
