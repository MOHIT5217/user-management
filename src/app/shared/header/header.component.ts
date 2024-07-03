import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

interface Items {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Add New User',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'client/add_user'
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'View List',
            routerLink: '/client'
          }
        ]
      },
      // {
      //   label: 'Quit',
      //   icon: 'pi pi-fw pi-power-off'
      // }
    ];
  }
}

