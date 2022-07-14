import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MyInitService } from './my-init.service';

@NgModule({
  providers: [
    MyInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (myInitService: MyInitService) => () => myInitService.initCheck(),
      deps: [MyInitService],
      multi: true,
    }
  ]
})
export class InitModule { }