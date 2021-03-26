// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const config: any = {
	ApiUrl: 'http://localhost:5000/api',
  urls: {
    person: 'person'
  }
};

export class AppSettings {
  getModalBasicConf(): any {
    return {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'animated slideInDown',
      centered: true,
    };
  }
}