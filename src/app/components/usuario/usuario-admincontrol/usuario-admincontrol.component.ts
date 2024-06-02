import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-admincontrol',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  templateUrl: './usuario-admincontrol.component.html',
  styleUrl: './usuario-admincontrol.component.css'
})
export class UsuarioAdminControlComponent {

}
