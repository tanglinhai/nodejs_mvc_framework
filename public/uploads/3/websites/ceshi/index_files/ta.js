var taqHome;
(function(){function ya(a){M||(m("user state returned."),M=!0,(B=String(a))&&"null"!=B&&"undefined"!=B?(Z("_trs_user",B,"/",null,P(x.domain)),f.uid=B):(a=P(x.domain),Z("_trs_user","","/",new Date(0),a)))}function ka(a){return null==a||void 0==a?!0:"string"!=typeof a?!1:0==s(a).length}function s(a){return a.replace(/^\s+|\s+$/gm,"")}function za(){var a="",b=document.getElementsByTagName("meta");try{if(0<b.length)for(var c=0;c<b.length;c++){var g=b[c],e=g.getAttribute("charset");if(e){a=e;break}else{var d=
g.getAttribute("http-equiv");if(d&&"content-type"==d.toLowerCase()){var f=g.content.split(";"),e=1<f.length?f[1].split("=")[1]:null;if(e){a=e;break}}}}}catch(h){m("fail to parse charset: "+h)}return a.toUpperCase()}function q(a,b){return null==a||void 0==a?a:s(a).length>b?a.substring(0,b-3)+"...":a}function Aa(a){return a.replace(/<br.*?>/g," ")}function $(a){var b=l.cookie.indexOf(a+"=");if(-1==b)return null;b=b+a.length+1;a=l.cookie.indexOf(";",b);-1==a&&(a=l.cookie.length);return decodeURIComponent(l.cookie.substring(b,
a))}function la(a,b,c,g,e){null==e||void 0==e||0==aa(e)?l.cookie=a+"="+encodeURIComponent(b)+"; path="+c+"; expires="+g:l.cookie=a+"="+encodeURIComponent(b)+"; path="+c+"; domain="+e+"; expires="+g}function Z(a,b,c,g,e){a=encodeURIComponent(a)+"="+encodeURIComponent(b);c&&(a+="; path="+c);g instanceof Date&&(a+="; expires="+g.toGMTString());e&&(a+="; domain="+e);l.cookie=a}function ma(a){if(ka(a)||"undefined"==a||"string"!=typeof a)return!0;if(24<a.length)return m("length="+a.length+": "+a),!0;var b=
a.indexOf("_");if(-1==b||4<b)return m("first underline index="+b+": "+a),!0;var c=a.indexOf("_",b+1);if(-1==c||1==c-b)return m("second underline index="+c+": "+a),!0;b=a.indexOf("_",c+1);return-1!=b?(m("third underline index="+b+": "+a),!0):!1}function na(a){var b=parseInt(Math.floor(1E3*Math.random()+1)+""+Math.floor(1E3*Math.random()+1));return String(b.toString(36).concat("_").concat(a).concat("_").concat((new Date).valueOf().toString(36)))}function Ba(a){var b=parseInt(Math.floor(1E3*Math.random()+
1)+""+Math.floor(1E3*Math.random()+1));return String((a+"").concat("_").concat((new Date).valueOf().toString(36)).concat("_").concat(b.toString(36)))}function Ca(a,b){var c=a.match(RegExp("(^|&|\\?|#)("+b+")=([^&#]*)(&|$|#)",""));return c?c[3]:"null"}function m(a){if(window.console&&console.log)try{console.log(a)}catch(b){}}function Da(){var a;try{return a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),a.GetVariable("$version")}catch(b){}try{return a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
version="WIN 6,0,21,0",a.AllowScriptAccess="always",a.GetVariable("$version")}catch(c){}try{return a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),a.GetVariable("$version")}catch(g){}try{return new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),"WIN 3,0,18,0"}catch(e){}try{return new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),"WIN 2,0,0,11"}catch(d){return"-1"}}function Ea(){var a="Shockwave Flash ";if(navigator.plugins&&0<navigator.plugins.length){var b=navigator.plugins["Shockwave Flash"];
if(!b)return"-1";try{if(void 0!=b.version)return b.version}catch(c){}b=b.description;return-1!=b.indexOf(a)?b.substring(a.length):b}for(var b=Da().split(","),g="",a="WIN ",e=0,d=b.length;e<d;e++)-1!=b[e].indexOf(a)?(g+=b[e].substring(a.length),g+="."):e==d-1?g+=b[e]:(g+=b[e],g+=".");return g}function ba(){if(!f.uid&&!M&&3E3>(new Date).getTime()-oa)setTimeout(ba,100),m("wait for asynchronous return.");else{m("send request."+(f.uid?"with uid: "+f.uid:"without uid"));var a="";f.title=x.title||"";for(var b in f)ka(f[b])||
(""!=a&&(a+="&"),a+=b+"="+encodeURIComponent(f[b]));if(taqHome){try{ca=(new Date).getTime(),pa=f.mpId}catch(c){}(new Image(1,1)).src=taqHome+"/1.gif?"+a}else m("no _taq.home!")}}function qa(a){a=K.timing;try{if(0>=parseInt(a.loadEventEnd))setTimeout(function(){qa(f)},50);else{var b=a.domainLookupEnd-a.domainLookupStart,c=a.connectEnd-a.connectStart,g=a.responseStart-a.requestStart,e=a.domContentLoadedEventStart-a.fetchStart,d=a.responseEnd-a.navigationStart;-1!==t.navigator.userAgent.indexOf("Chrome")&&
(f.p_fp=-1,t.chrome&&(msFirstPaint=t.chrome.loadTimes().firstPaintTime,f.p_fp=0<=msFirstPaint?msFirstPaint:-1));-1!=navigator.appName.indexOf("Microsoft Internet Explorer")&&document.all&&(msFirstPaint=a.msFirstPaint-a.navigationStart,f.p_fp=0<=msFirstPaint?msFirstPaint:-1);requestType=K.navigation.type;var h=a.loadEventEnd-a.navigationStart;f.p_d=0<=b?b:-1;f.p_ct=0<=c?c:-1;f.p_st=0<=g?g:-1;f.p_nt=0<=d?d:-1;f.p_tt=0<=h?h:-1;f.p_dr=0<=e?e:-1;f.p_rt=requestType;f.p_c=0;1===requestType&&(f.p_c=0);0===
a.requestStart&&(f.p_c=1);a.connectStart===a.connectEnd&&(f.p_c=1);if("getEntriesByType"in K&&K.getEntriesByType("resource")instanceof Array){var k=K.getEntriesByType("resource");f.p_rc=k.length}ba()}}catch(u){}}function Fa(a){var b=a.getAttribute("data-trs-ta-event-key");if(null==b||"undefined"==b||""==b||"null"==b){for(;(a=a.parentNode)&&1==a.nodeType;)if(b=a.getAttribute("data-trs-ta-event-key"),null!=b&&"undefined"!=b&&""!=b&&"null"!=b)return a;return null}return a}function aa(a){return"string"!=
typeof a?!1:0<a.length}function C(a){return null==a||"undefined"==a||""==a||"null"==a?a:a.replace(/\t/g," ").replace(/(^\s*)|(\s*$)/g,"").replace(/[\r\n]/g," ")}function da(a){return null==a||"undefined"==a||""==a||"null"==a?a:a.replace(/(^\s*)|(\s*$)/g,"")}function h(a,b,c){null!=c&&"undefined"!=c&&""!=c&&"null"!=c&&(a+="&"+b+"="+c);return a}function ea(a,b,c){var g=b.getAttribute("href"),e=g?g.match(/^#/):!1,d=e?g:b.href,d=q(d,255),k=q(b.id,255),g=q(C(b.innerText),255);c&&c.elemText&&(g=q(C(c.elemText),
255));c=q(b.type,255);var m=q(b.name,255);b=q(b.target,255);a=h(a,"pv",f.pv);a=h(a,"e_id",k);a=h(a,"url",q(encodeURIComponent(N)),1024);if(aa(d)&&(a=h(a,"e_tu",encodeURIComponent(d)),!e)){var u,d=da(d);0==d.indexOf("http")||0==d.indexOf("https")?(e=d.substring(0,d.indexOf("://")),d=d.substring(d.indexOf("://")+3),-1<d.indexOf("/")?u=d.substring(0,d.indexOf("/")):u=d):0==d.indexOf("//")?(e=null,d=d.substring(d.indexOf("//")+2),-1<d.indexOf("/")?u=d.substring(0,d.indexOf("/")):u=d):-1<d.indexOf(":")?
(e=d.substring(0,d.indexOf(":")),u=null):(e=null,u=parseDomain2(document.URL));a=h(a,"e_td",encodeURIComponent(u));a=h(a,"e_tp",encodeURIComponent(e))}a=h(a,"e_tt",c);a=h(a,"e_tx",encodeURIComponent(g));a=h(a,"e_en",m);return a=h(a,"e_ht",b)}function Ga(a){function b(a){if(!a)return"";var c=a.getAttribute("alt")?da(a.getAttribute("alt")):"",b=a.getAttribute("title")?da(a.getAttribute("title")):"";a=a.getAttribute("src")?a.getAttribute("src"):"";return q(C(c?c:b?b:a),19)}var c={flag:!1};for(a;1==a.nodeType;a=
a.parentNode)if(a.getAttribute("href")){c.anchorEle=a;c.anchorText=function(){if("area"==a.nodeName.toLowerCase()){var c=a.parentNode,e=c.name||c.id,c=function(){for(var a=null,c=document.getElementsByTagName("img"),b=0;b<c.length;b++)if(c[b].getAttribute("usemap")=="#"+e){a=c[b];break}return a}();return b(c)}c=q(C(ra(a)),19);if(0<c.length)return c;c=q(C(a.title),19);if(0<c.length)return c;var d;return(c=function(){for(var c="",b=a.childNodes,g=0;g<b.length;g++)if(1==b[g].nodeType&&(d||(d=b[g]),"img"==
b[g].nodeName.toLowerCase())){c=b[g];break}return c}())?b(c):d?d.nodeName.toLowerCase()+" "+q(C(ra(d)),19):""}();c.flag=!0;break}return c}function ra(a){return a?"string"==typeof a.textContent?a.textContent:a.innerText:""}function Ha(a){var b=Fa(a.target||a.srcElement);if(null!=b){var c=b.tagName.toLowerCase();if("a"==c||"input"==c||"button"==c){var g=q(b.getAttribute("data-trs-ta-event-key"),255),e=q(b.getAttribute("data-trs-ta-event-type"),255),d=q(C(b.getAttribute("data-trs-ta-event-itemtype")),
255),l=q(C(b.getAttribute("data-trs-ta-event-item")),255),p=q(C(b.getAttribute("data-trs-ta-event-itemname")),255),u,L,t;fa?(L=Math.max(document.documentElement.scrollTop,document.body.scrollTop),u=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),u=Math.floor(a.clientX+u),L=Math.floor(a.clientY+L)):(u=Math.floor(a.pageX),L=Math.floor(a.pageY));var w=window.innerWidth||document.documentElement.clientWidth||document.body.offsetWidth;0!=u&&0!=L&&(t=Math.floor(u-w/2));w=a.type;n=
ea(n,b);n=h(n,"t_k",encodeURIComponent(g));n=h(n,"t_t",encodeURIComponent(e));n=h(n,"t_it",encodeURIComponent(d));n=h(n,"t_i",encodeURIComponent(l));n=h(n,"t_in",encodeURIComponent(p));n=h(n,"x",u);n=h(n,"y",L);n=h(n,"x2",t);n=h(n,"e_tn",c);n=h(n,"e_et",w);(new Image(1,1)).src=n;n=sa}}b=a.target||a.srcElement;if(null!=b){var c=q(b.tagName.toLowerCase(),255),r,s,x;fa?(s=Math.max(document.documentElement.scrollTop,document.body.scrollTop),r=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),
r=Math.floor(a.clientX+r),s=Math.floor(a.clientY+s)):(r=Math.floor(a.pageX),s=Math.floor(a.pageY));g=window.innerWidth||document.documentElement.clientWidth||document.body.offsetWidth;0!=r&&0!=s&&(x=Math.floor(r-g/2));g=ta.collectable(b);e=Ga(b);d="a"==c||"input"==c||"button"==c;"a"!=c&&"input"!=c&&"button"!=c&&(Q+=1,H=""==H?"{"+r+","+s+","+x+"}":H+(";{"+r+","+s+","+x+"}"),10<=Q&&(Q=0,I+="&pa=["+H+"]",H="",l=new Image(1,1),l.src=I+"&pv="+f.pv,I=F+"&clicktype=1"));if(d||g){e.flag?(k=ea(k,e.anchorEle,
{elemText:e.anchorText}),c=q(e.anchorEle.tagName.toLowerCase(),255),k=h(k,"e_tn",c),k=h(k,"e_iac","1")):(k=ea(k,b),k=h(k,"e_tn",c),k=h(k,"e_iac","0"));c=q(a.type,255);g="";e=0;try{var z=ua.readXPath(b),A=new ua.Base64,g=encodeURIComponent(A.encode(z));m(encodeURIComponent(z));0!=ca&&(e=Math.floor(((new Date).getTime()-ca)/1E3))}catch(B){m("someting wrong for getting element xPath"),m(B)}k=h(k,"e_et",c);k=h(k,"e_nd",g);k=h(k,"e_etd",e);k=h(k,"x",r);k=h(k,"y",s);k=h(k,"x2",x);k=h(k,"mpId",pa);k=h(k,
"cs",f.cs);k=h(k,"cu",f.cu);l=new Image(1,1);l.src=k;k=F+"&clicktype=2"}}var G,D,y;fa?(D=Math.max(document.documentElement.scrollTop,document.body.scrollTop),G=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),G=Math.floor(a.clientX+G),D=Math.floor(a.clientY+D)):(G=Math.floor(a.pageX),Math.floor(D=a.pageY));a=window.innerWidth||document.documentElement.clientWidth||document.body.offsetWidth;0!=G&&0!=D&&(y=Math.floor(G-a/2));R+=1;""==E?(E="{x:"+G+",y:"+D+"}",J="{z:"+y+",y:"+D+
"}"):(E+=",{x:"+G+",y:"+D+"}",J+=",{z:"+y+",y:"+D+"}");10<=R&&(R=0,v+="&br="+S+"*"+T,v+="&pa=["+E+"]",v+="&pb=["+J+"]",J=E="",(new Image(1,1)).src=v,v=F+"&clicktype=3")}function Ia(){if(""!=H){var a=new Image(1,1);a.src=I+="&pa=["+H+"]&pv="+f.pv;I=F+"&clicktype=1"}""!=E&&(v+="&br="+S+"*"+T,v+="&pa=["+E+"]",v+="&pb=["+J+"]",J=E="",a=new Image(1,1),a.src=v,v=F)}function P(a){for(var b=".com.cn .net.cn .org.cn .gov.cn .edu.cn .com .cn .net .cc .org .tv .edu .mil .info .mobi .biz .pro .travel .museum .int .areo .post .rec".split(" "),
c="",g=0;g<b.length;g++)if(c=b[g],-1!=a.indexOf(c)){a=a.replace(c,"");a=a.substring(a.lastIndexOf(".")+1,a.length);a+=c;break}return a}function ga(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function Ja(){var a=function(){return{Base64:function(){_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(a){var b="",e,d,f,h,k,l,m=0;for(a=_utf8_encode(a);m<a.length;)e=a.charCodeAt(m++),d=a.charCodeAt(m++),f=a.charCodeAt(m++),
h=e>>2,e=(e&3)<<4|d>>4,k=(d&15)<<2|f>>6,l=f&63,isNaN(d)?k=l=64:isNaN(f)&&(l=64),b=b+_keyStr.charAt(h)+_keyStr.charAt(e)+_keyStr.charAt(k)+_keyStr.charAt(l);return b};this.decode=function(a){var b="",e,d,f,h,k,l=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<a.length;)e=_keyStr.indexOf(a.charAt(l++)),d=_keyStr.indexOf(a.charAt(l++)),h=_keyStr.indexOf(a.charAt(l++)),k=_keyStr.indexOf(a.charAt(l++)),e=e<<2|d>>4,d=(d&15)<<4|h>>2,f=(h&3)<<6|k,b+=String.fromCharCode(e),64!=h&&(b+=String.fromCharCode(d)),
64!=k&&(b+=String.fromCharCode(f));return b=_utf8_decode(b)};_utf8_encode=function(a){a=a.replace(/\r\n/g,"\n");for(var b="",e=0;e<a.length;e++){var d=a.charCodeAt(e);128>d?b+=String.fromCharCode(d):(127<d&&2048>d?b+=String.fromCharCode(d>>6|192):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128)),b+=String.fromCharCode(d&63|128))}return b};_utf8_decode=function(a){for(var b="",e=0,d=c1=c2=0;e<a.length;)d=a.charCodeAt(e),128>d?(b+=String.fromCharCode(d),e++):191<d&&224>d?(c2=a.charCodeAt(e+
1),b+=String.fromCharCode((d&31)<<6|c2&63),e+=2):(c2=a.charCodeAt(e+1),c3=a.charCodeAt(e+2),b+=String.fromCharCode((d&15)<<12|(c2&63)<<6|c3&63),e+=3);return b}},readXPath:function(a){if(""!==a.id)return"//*[@id='"+a.id+"']";for(var b=0,e=a.parentNode,d=a.parentNode.childNodes,f=0,h=d.length;f<h;f++){var k=d[f];if(k==a)return e==document.body?a.tagName.toLowerCase()+(1==b+1?"":"["+(b+1)+"]"):arguments.callee(a.parentNode)+"/"+a.tagName.toLowerCase()+(1==b+1?"":"["+(b+1)+"]");1==k.nodeType&&k.tagName==
a.tagName&&b++}},indexOf:function(a,b){if(null!=Array.prototype.indexOf)return a.indexOf(b);for(var e=0;e<a.length;e++)if(a[e]===b)return e;return-1}}}(),b=["TEXTAREA","HTML","BODY"];return{tools:a,collectable:function(c){if(c==document||!c)return!1;c=c.tagName.toUpperCase();return-1<a.indexOf(b,c)?!1:!0}}}var f={},t=window;if(!t["ta.js"]){t["ta.js"]=!0;var U=t.location.hash.substring(1),U=Ca(U,"heatShow");t.TA17Obj={};var V=t.TA17Obj,l=document,r=!1,w=za(),y=(l.characterSet?l.characterSet:l.charset).toUpperCase();
f.bc=y;if(aa(w)){f.mc=w;var O=/^GB/;if(!(w==y||O.test(w)&&O.test(y))){m("meta charset is different from browser charset, return.");return}}try{r=l.domain==top.document.domain}catch(Ka){m("unable check top.document.domain: "+Ka)}var x=r?top.document:l;f.domain=x.domain||"";t&&t.screen&&(f.sh=t.screen.height||0,f.sw=t.screen.width||0,f.cd=t.screen.colorDepth||0);if(r=l.getElementById("gscrumb"))f.gc=s(r.innerHTML);var r=l.getElementById("NewsPaperName"),w=l.getElementById("NewsEditionName"),y=l.getElementById("NewsEditionNumber"),
O=l.getElementById("NewsArticleTitle"),va=l.getElementById("NewsArticleAuthor"),ha=l.getElementById("NewsArticleID"),wa=l.getElementById("NewsArticleTime");if(y||ha)r&&(f.a_pn=s(r.innerHTML)),w&&(f.a_ea=s(w.innerHTML)),y&&(f.a_en=s(y.innerHTML)),O&&(f.a_nt=Aa(s(O.innerHTML))),va&&(f.a_ar=s(va.innerHTML)),ha&&(f.a_id=s(ha.innerHTML)),wa&&(f.a_te=s(wa.innerHTML));if("undefined"!=typeof _taq){taqHome=_taq.home;for(var p in _taq)switch(_taq[p][0]){case "_mpId":f.mpId=_taq[p][1];break;case "_setUID":_taq[p][1]&&
""!=_taq[p][1]&&(f.uid=_taq[p][1])}}else{r=l.getElementById("_trs_ta_js");if(!r){m("not found _trs_ta_js script element, so just return!");return}w=r.src.split("?")[1].split("&");for(p in w)try{if("mpid"==w[p].split("=")[0]){f.mpId=w[p].split("=")[1];break}}catch(La){m("fail and skip, i="+p+", myselfSrcParamArray="+w)}taqHome=r.src.split("/js/")[0]}var B=$("_trs_user"),oa,M=!1;if(B)f.uid=B,m("get user id from cookie");else if("undefined"!=typeof window.TA17Callbacks_getAndSendLoginUser){oa=(new Date).getTime();
try{m("start to get user id"),window.TA17Callbacks_getAndSendLoginUser(ya)}catch(Ma){m("no valid method for getting user was provided."),M=!0}}else m("no valid method for getting user was provided."),M=!0;V.clearLoginUser=function(){var a=P(x.domain);Z("_trs_user","","/",new Date(0),a)};var z,A;f.pv=Ba(f.mpId);0<l.cookie.length&&(z=$("_trs_ua_s_1"),A=$("_trs_uv"));ma(z)&&(p=z,z=na(f.mpId),m("sessionCookie expired: "+p+", so create new: "+z));ma(A)&&(p=A,A=na(f.mpId),m("UVCookie expired: "+p+", so create new: "+
A));p=new Date;p.setDate(p.getDate()+730);V=P(x.domain);la("_trs_uv",A,"/",p.toGMTString(),V);m("set UVCookie topLevelDomain: "+V+", _trs_uv="+A);p=new Date;p.setMinutes(p.getMinutes()+30);la("_trs_ua_s_1",z,"/",p.toGMTString());m("set sessionCookie: _trs_ua_s_1="+z);f.cs=z||"";f.cu=A||"";f.title=x.title||"";f.url=x.URL||"";f.refer=x.referrer||"";if(1==U){var W=document.createElement("iframe"),ia;ia=document.referrer&&"function"==typeof document.referrer.indexOf&&0<=document.referrer.indexOf("/console/heatmap")?
document.referrer.slice(0,document.referrer.indexOf("/console/heatmap")):taqHome;var ja=document.documentElement.scrollWidth,X=document.documentElement.scrollHeight,Y=0;W.src=ia+"/agent.html#"+ja+"*"+X;document.body.appendChild(W);W.style.display="none";var xa=function(){document.documentElement.scrollHeight!=X?(Y=0,ja=document.documentElement.scrollWidth,X=document.documentElement.scrollHeight,W.src=ia+"/agent.html?random="+Math.random()+"#"+ja+"*"+X):3>=Y?(Y++,setTimeout(xa,1E3)):Y=0};ga(window,
"resize",xa);U=0}navigator&&(f.lang=navigator.language||navigator.browserLanguage||"",f.fl=Ea(),f.je=navigator.javaEnabled()?1:0,f.ce=navigator.cookieEnabled?1:0);var K=t.performance;K?qa(f):ba();var ca=0,pa=0,fa=/msie (\d+\.\d+)/i.test(navigator.userAgent),sa=taqHome+"/1.gif?event=click&sr="+screen.width+"*"+screen.height+"&url="+encodeURIComponent(document.URL),n=sa,Q=0,S=0,T=0,R=0;document.all||document.captureEvents(Event.MOUSEMOVE);var S=document.documentElement&&document.documentElement.scrollWidth||
document.body&&document.body.scrollWidth||0,T=document.documentElement&&document.documentElement.scrollHeight||document.body&&document.body.scrollHeight||0,N=q(document.URL,1024);0<N.indexOf("#")&&(N=N.substring(0,N.indexOf("#")));var F=taqHome+"/1.gif?event=mousedown&sr="+screen.width+"*"+screen.height+"&br="+S+"*"+T,I=F+"&clicktype=1",k=F+"&clicktype=2",v=F+"&clicktype=3",H="",E="",J="",ta=Ja(),ua=ta.tools;ga(document,"mouseup",Ha);ga(window,"unload",Ia)}})();