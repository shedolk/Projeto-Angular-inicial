import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const authorizedProfiles = route.data['authorizedProfiles'] as string[];

  if (authService.isTokenExpired()) {
    console.log('Token inválido');
    authService.removeToken();
    authService.removeUsuarioLogado();
    router.navigate(['/login']);
    return false;
  } else {
    const perfil = authService.getPerfilUsuario();
    if (authorizedProfiles && !authorizedProfiles.includes(perfil)) {
      console.log(`Acesso negado. Perfil ${perfil} não autorizado`);
      router.navigate(['/']);
      return false;
    }
    console.log('Token válido');
    return true;
  }
};
