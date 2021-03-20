import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        title: 'Ordenes de venta',
        url: 'sale-orders',
        image: '../../../../assets/images/menu/shopping-cart.png'
      },
      {
        title: 'Ordenes de compra',
        url: 'purchase-orders',
        image: '../../../../assets/images/menu/shopping-bag.png'
      },
      {
        title: 'Inventario',
        url: 'stocks',
        image: '../../../../assets/images/menu/warehouse.png'
      },
      {
        title: 'Clientes',
        url: 'customers',
        image: '../../../../assets/images/menu/target.png'
      },
      {
        title: 'Empleados',
        url: 'employees',
        image: '../../../../assets/images/menu/customer.png'
      },
      {
        title: 'Suplidores',
        url: 'suppliers',
        image: '../../../../assets/images/menu/hotel-supplier.png'
      },
      {
        title: 'Reports',
        url: 'reports',
        image: '../../../../assets/images/menu/profit-report.png'
      }
    ]
  }

}
