function _defineProperties(n,t){for(var e=0;e<t.length;e++){var l=t[e];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(n,l.key,l)}}function _createClass(n,t,e){return t&&_defineProperties(n.prototype,t),e&&_defineProperties(n,e),n}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{L6id:function(n,t,e){"use strict";e.r(t);var l=e("8Y7J"),o=function n(){_classCallCheck(this,n)},i=e("pMnS"),a=e("mrSG"),r=e("/D8a");e("gPpf");var s=function(){function n(t,e){_classCallCheck(this,n),this.router=t,this.ngxService=e,this.address="",this.balance="",this.buildEnvironment="production",this.selectedVerifier="google",this.placeholder="Enter google email",this.buildEnvironments=["production","staging","testing","development"],this.selectedVerifiers=[{label:"Google",value:"google"},{label:"Reddit",value:"reddit"},{label:"Discord",value:"discord"}],console.log("home component loaded")}return _createClass(n,[{key:"ngOnInit",value:function(){this.ngxService.start()}},{key:"ngAfterContentInit",value:function(){this.firstFunction()}},{key:"firstFunction",value:function(){var n=sessionStorage.getItem("pageUsingTorus");console.log(n,"istorus"),this.ngxService.stop(),"false"!=n&&null!=n&&this.router.navigate(["dashboard"])}},{key:"setBuildEnvironment",value:function(){return a.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return this.ngxService.start(),setTimeout((function(){sessionStorage.setItem("setEnv","true"),document.querySelector("#torusLogin").style.display="none"}),500),n.prev=1,n.next=4,r.a.initialize("production");case 4:this.firstFunction(),this.ngxService.stop(),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),this.ngxService.stop(),console.error(n.t0);case 11:case"end":return n.stop()}}),n,this,[[1,8]])})))}}]),n}(),u=e("iInd"),c=e("HHV2"),g=l.nb({encapsulation:0,styles:[['.card_home[_ngcontent-%COMP%]{padding:20px;background:#0000aa30;-webkit-box-align:center;align-items:center;display:-webkit-box;display:flex;border-radius:10px}#torusWidget[_ngcontent-%COMP%]   .torus-btn[_ngcontent-%COMP%]{position:absolute;display:block;bottom:109%;left:1130%}.touch_btn[_ngcontent-%COMP%]{background:#000000f0;color:#fff;border:2px solid #fff;display:block;border-radius:10px;height:45px;margin:auto;position:absolute;bottom:38%;right:28%;-webkit-transition:background 1s;transition:background 1s}.touch_btn[_ngcontent-%COMP%]:hover{background:#fff;color:#000;cursor:pointer}*[_ngcontent-%COMP%]{font-family:Lato,sans-serif}.welcome_title[_ngcontent-%COMP%]{text-align:center;font-size:3rem;background:#ffffffa0;width:80%;margin:auto;padding:10px;border-radius:14px}.welcome_title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#006be8}.sub_welcome_title[_ngcontent-%COMP%]{margin-top:5px;font-size:1rem}.bg[_ngcontent-%COMP%]{-webkit-animation:3s ease-in-out infinite alternate slide;animation:3s ease-in-out infinite alternate slide;background-image:linear-gradient(-60deg,#6c3 50%,#09f 50%);bottom:0;left:-50%;opacity:.5;position:fixed;right:-50%;top:0;z-index:-1}.bg2[_ngcontent-%COMP%]{animation-direction:alternate-reverse;-webkit-animation-duration:4s;animation-duration:4s}.bg3[_ngcontent-%COMP%]{-webkit-animation-duration:5s;animation-duration:5s}@-webkit-keyframes slide{0%{-webkit-transform:translateX(-25%);transform:translateX(-25%)}100%{-webkit-transform:translateX(25%);transform:translateX(25%)}}@keyframes slide{0%{-webkit-transform:translateX(-25%);transform:translateX(-25%)}100%{-webkit-transform:translateX(25%);transform:translateX(25%)}}body[_ngcontent-%COMP%]{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code[_ngcontent-%COMP%]{font-family:source-code-pro,Menlo,Monaco,Consolas,"Courier New",monospace}.app[_ngcontent-%COMP%]{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}#console[_ngcontent-%COMP%]{border:1px solid #000;height:40px;padding:2px;bottom:10px;position:absolute;text-align:left;width:calc(100% - 20px);border-radius:5px}#console[_ngcontent-%COMP%]::before{content:"Console :";position:absolute;top:-20px;font-size:12px}#console[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{margin:.5em}button[_ngcontent-%COMP%]{height:25px;margin:5px;background:0 0;border-radius:5px}.home_content[_ngcontent-%COMP%]{width:80%;margin:40px auto}.home_content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{float:left;width:40%;margin:20px}.home_content[_ngcontent-%COMP%]   .content_image[_ngcontent-%COMP%]{float:right;width:58%}.home_content[_ngcontent-%COMP%]   .content_image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:-webkit-fill-available;width:100%}.clear[_ngcontent-%COMP%]{clear:both}@media only screen and (max-width:767px){.home_content[_ngcontent-%COMP%]   .content_image[_ngcontent-%COMP%], .home_content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{float:none;width:100%}.card[_ngcontent-%COMP%]{display:block}.touch_btn[_ngcontent-%COMP%]{bottom:20%;right:42%}.welcome_title[_ngcontent-%COMP%]{font-size:1.2rem}.sub_welcome_title[_ngcontent-%COMP%]{font-size:.7rem}.description[_ngcontent-%COMP%]{margin:0}}']],data:{}});function d(n){return l.Eb(0,[(n()(),l.pb(0,0,null,null,17,"div",[],null,null,null,null,null)),(n()(),l.pb(1,0,null,null,6,"h3",[["class","welcome_title"]],null,null,null,null,null)),(n()(),l.Db(-1,null,[" Welcome to "])),(n()(),l.pb(3,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),l.Db(-1,null,["Torus"])),(n()(),l.Db(-1,null,[" App "])),(n()(),l.pb(6,0,null,null,1,"p",[["class","sub_welcome_title"]],null,null,null,null,null)),(n()(),l.Db(-1,null,["SIMPLE. SECURE. SEAMLESS"])),(n()(),l.pb(8,0,null,null,9,"div",[["class","home_content card_home"]],null,null,null,null,null)),(n()(),l.pb(9,0,null,null,2,"div",[["class","description"]],null,null,null,null,null)),(n()(),l.pb(10,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l.Db(-1,null,[" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.. "])),(n()(),l.pb(12,0,null,null,4,"div",[["class","content_image"]],null,null,null,null,null)),(n()(),l.pb(13,0,null,null,1,"a",[],null,null,null,null,null)),(n()(),l.pb(14,0,null,null,0,"img",[["src","../assets/images/touch.jpg"]],null,null,null,null,null)),(n()(),l.pb(15,0,null,null,1,"button",[["class","touch_btn"]],null,[[null,"click"]],(function(n,t,e){var l=!0;return"click"===t&&(l=!1!==n.component.setBuildEnvironment()&&l),l}),null,null)),(n()(),l.Db(-1,null,["Touch the future"])),(n()(),l.pb(17,0,null,null,0,"div",[["class","clear"]],null,null,null,null,null)),(n()(),l.pb(18,0,null,null,0,"div",[["class","bg"]],null,null,null,null,null))],null,null)}var b=l.lb("home-component",s,(function(n){return l.Eb(0,[(n()(),l.pb(0,0,null,null,1,"home-component",[],null,null,null,d,g)),l.ob(1,1163264,null,0,s,[u.o,c.d],null,null)],(function(n,t){n(t,1,0)}),null)}),{},{},[]),p=e("SVse"),m=e("s7LF"),f=function n(){_classCallCheck(this,n)};e.d(t,"HomeModuleNgFactory",(function(){return h}));var h=l.mb(o,[],(function(n){return l.xb([l.yb(512,l.j,l.X,[[8,[i.a,b]],[3,l.j],l.v]),l.yb(4608,p.l,p.k,[l.s,[2,p.t]]),l.yb(4608,m.c,m.c,[]),l.yb(1073742336,p.b,p.b,[]),l.yb(1073742336,m.b,m.b,[]),l.yb(1073742336,m.a,m.a,[]),l.yb(1073742336,u.q,u.q,[[2,u.v],[2,u.o]]),l.yb(1073742336,f,f,[]),l.yb(1073742336,o,o,[]),l.yb(1024,u.m,(function(){return[[{path:"",component:s}]]}),[])])}))}}]);