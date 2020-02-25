import { Component } from '@angular/core'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private ngxService: NgxUiLoaderService){
    console.log('App component loaded');
  }

  // ngOnInit() {
  //   this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
  //   // Stop the foreground loading after 5s
  //   setTimeout(() => {
  //     this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
  //   }, 5000);
  // }
}
