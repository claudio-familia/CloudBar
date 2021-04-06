// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApiUrl: 'http://localhost:5000/api',
  firebase: {
    apiKey: "AIzaSyBMR0sJULuDITm2nzbUtRqFNg7ygTuAgaA",
    authDomain: "payrollapp-528dc.firebaseapp.com",
    databaseURL: "https://payrollapp-528dc.firebaseio.com",
    projectId: "payrollapp-528dc",
    storageBucket: "payrollapp-528dc.appspot.com",
    messagingSenderId: "804038142679",
    appId: "1:804038142679:web:1a5c14123f98d88e9cde92",
    storageFolder: '/uploads',
  },  
  urls: {
    person: 'people',
    parameter: 'parameters',
    place: 'places',
    user: 'users',
    role: 'roles',
    category: 'categories',
    item: 'items',
    sale: 'sales',
  }
};