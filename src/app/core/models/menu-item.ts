export class MenuItem {
    url: string;
    image: string;
    title: string;
}

export const MENU: MenuItem[] = [
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
];
export const SETTINGMENU: MenuItem[] = [
    {
        title: 'Personal',
        url: 'people',
        image: 'person'
    },
    {
        title: 'Franquicias',
        url: 'places',
        image: 'store_front'
    },
    {
        title: 'Parametros',
        url: 'parameters',
        image: 'label_important'
    }
];