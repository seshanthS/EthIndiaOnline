import { Component } from '@angular/core'
import web3Obj from '../helper'
import { Router } from '@angular/router'
import { NgxUiLoaderService } from 'ngx-ui-loader'
const tokenAbi = require('human-standard-token-abi')

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  address: string = ''
  balance: string = ''
  buildEnvironment: 'production' | 'staging'| 'testing' | 'development' =  'production'
  console: string | object
  selectedVerifier: 'google' | 'reddit' | 'discord' = 'google'
  placeholder: string = 'Enter google email'
  selectedVerifierId: string

  constructor(
    public router: Router,
    private ngxService: NgxUiLoaderService
  ){
    console.log('home component loaded');
  }

  buildEnvironments = ['production', 'staging', 'testing', 'development']
  selectedVerifiers = [
    { label: 'Google', value: 'google' },
    { label: 'Reddit', value: 'reddit' },
    { label: 'Discord', value: 'discord' }
  ]

  
  ngOnInit() {
    this.ngxService.start(); 
  }
  ngAfterContentInit() {

    this.firstFunction();
  }

  firstFunction(){
    const isTorus = sessionStorage.getItem('pageUsingTorus');
    console.log(isTorus, 'istorus');
    this.ngxService.stop();
    if(isTorus != 'false' && isTorus != null){
    //if(true){
      //sessionStorage.setItem('setEnv', 'false');
      this.router.navigate(['dashboard']);
    }
  }



  async setBuildEnvironment() {
    this.ngxService.start();

    setTimeout(() => {
      sessionStorage.setItem('setEnv', 'true');
      let btn = <HTMLElement> document.querySelector('#torusLogin');
      btn.style.display = 'none';
    }, 500);

    //e.preventDefault()
    try {
      await web3Obj.initialize('production');
      this.firstFunction();
      this.ngxService.stop();
    } catch (error) {
      this.ngxService.stop();
      console.log(error)
    }
  }

}
