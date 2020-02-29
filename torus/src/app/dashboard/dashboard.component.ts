import { Component } from "@angular/core";
import web3Obj from "../helper";
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
/// <reference types="chrome"/>
const tokenAbi = require("human-standard-token-abi");
import { ToastrService } from "ngx-toastr";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: "dash-component",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  address: string = "";
  tip_amounts: any = "";
  balance: string = "";
  buildEnvironment: "production" | "staging" | "testing" | "development" =
    "production";
  console: string | object;
  selectedVerifier: "google" | "reddit" | "discord" = "google";
  placeholder: string = "Enter google email";
  selectedVerifierId: string;
  qr_value: any;
  sha3Value: string;
  httpOptions: { headers: HttpHeaders; };
  userInfo: any;
  ngOnInit() {
    //this.setBuildEnvironment();
  }

  constructor(
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    public http: HttpClient
  ) {
    console.log("dashboard page loaded");
    this.ngxService.start();
    //this.setStateInfo();

    
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
  }
  
  selectedVerifiers = [
    { label: "Google", value: "google" },
    { label: "Reddit", value: "reddit" },
    { label: "Discord", value: "discord" }
  ];

  ngAfterContentInit() {
    const isTorus = sessionStorage.getItem("pageUsingTorus");
    this.initialize();
  }

  async initialize(){

    let confirm = sessionStorage.getItem('setEnv');
    console.log(confirm);
    //this.setStateInfo();
    if(confirm != 'true'){
    try {
          await web3Obj.initialize('production')
          this.setStateInfo()
        } catch (error) {
          this.ngxService.stop();
          console.error(error)
         }
        }else{
          this.setStateInfo()
        }
    sessionStorage.setItem("setEnv", "false");
  }

  async setStateInfo() {
    this.address = (await web3Obj.web3.eth.getAccounts())[0];
    this.balance = web3Obj.web3.utils.fromWei(
      await web3Obj.web3.eth.getBalance(this.address),
      "ether"
    );
    // this.address = "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe";
    // this.balance = "20";
    this.getUserInfo();
    this.ngxService.stop();
    //await web3Obj.torus.cleanUp();
    console.log("address is", this.address, "balance is", this.balance);
    this.qr_value = this.address;
  }

  printToConsole() {
    document.querySelector("#console>p").innerHTML =
      typeof this.console === "object"
        ? JSON.stringify(this.console)
        : this.console;
  }

  changeProvider = async () => {
    await web3Obj.torus.setProvider({ host: "ropsten" });
    this.console = "finished changing provider";
    this.printToConsole();
  };


  async logout() {
    this.address = "";
    this.balance = "0";
    sessionStorage.setItem("pageUsingTorus", "false");
    //chrome.storage.local.set({"pageUsingTorus":"false"})
    this.router.navigate([""]);
  }

  async createPaymentTx(val: any) {

    if(typeof(val)!='number' && val < 0.0001){
      this.showToastInfo('error', 'Enter valid Amount');
    }
    else{
      console.log(val);
      // this.console = (
      //   await web3Obj.torus.initiateTopup("moonpay", {
      //     selectedCurrency: "USD"
      //   })
      // ).toString();
      // this.printToConsole();
    }
  }

  async signMessage(amount:number) {
    // hex message
    // @ts-ignore
    if(typeof(amount) !='number' && amount < 0.0001){
      this.showToastInfo('error', 'Enter valid Amount');
    }
    else{ 

      this.ngxService.start();
    //chrome.storage.local.get('targetEmail',(result)=>{
      // let address = result.targetEmail;
      let email_address = 'rajeshkumar.robert@gmail.com';
      let address = await web3Obj.torus.getPublicAddress({
        verifier: this.selectedVerifier,
        verifierId: email_address
      });

      console.log('targetAddress',address);
      //console.log(web3Obj);
      const message = web3Obj.web3.utils.keccak256(address+amount+10);
      // @ts-ignore
      web3Obj.torus.web3.currentProvider.send( 
        {
          method: "eth_sign",
          params: [this.address, message],
          from: this.address
        },
        (err: any, result: any) => {
          this.ngxService.stop();
          if(result){
            let val = {
              "receiverEmail":email_address, 
              "signature":result.result,
              "message":"send amount", 
              "amount":amount.toString(), 
              "senderAddress":this.address
            }
            this.postData('add',val).subscribe((res)=>{
              console.log(res);
            })


          }

          if (err) {
            return console.error(err);
          }
          this.console = `sign message => true \n ${result}`;
          console.log(result);
          this.showToastInfo('info', result.result);
        }
      );
    //})
  }
  }

  
  postData(param:any,data: any): Observable<any> {
    return this.http.post<any>('http://62.171.137.55:3000/'+param, data, this.httpOptions)
      .pipe(
      );
  }


  showHideButton(){
    let el = document.getElementById('torusWidget');
    let property = el.style.display;
    if(property =='none'){
      el.style.display = 'block';
    }else{
      el.style.display = 'none';
    }
  }

  
  

  async sendEth() {
    web3Obj.web3.eth.sendTransaction({
      from: this.address,
      to: this.address,
      value: web3Obj.web3.utils.toWei("0.01")
    });
  }

  showToastError(title:string, msg:string) {
    this.toastr.error(msg,title,{
      timeOut: 3000,
      closeButton:true,
      easing:'ease-in',
      progressBar:true,
    });
  }

  showToastInfo(title:string, msg:string){
    this.toastr.info(msg,title,{
      timeOut: 3000,
      closeButton:true,
      easing:'ease-in',
      progressBar:true,
    });
  }

  async getUserInfo() {
    this.userInfo = await web3Obj.torus.getUserInfo("");
    console.log(this.userInfo);
  }

}
