import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../../../services/sidebar.service';
import { MatList, MatNavList, MatListItem } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenav, MatDrawer, MatDrawerContainer, RouterModule,
    MatDrawerContent, MatToolbar, MatList, MatNavList, MatListItem, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  @ViewChild('drawer') public drawer!: MatDrawer;

  constructor(private sideBarService: SidebarService) { }

  ngOnInit(): void {
    this.sideBarService.sideNavToggleSubject.subscribe(
      () => {
        this.drawer.toggle();
      }
    )
  }
}
