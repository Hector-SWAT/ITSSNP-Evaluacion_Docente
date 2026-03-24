function Ed(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const a=Object.getOwnPropertyDescriptor(r,o);a&&Object.defineProperty(e,o,a.get?a:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function Cd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ys={exports:{}},Bo={},Ks={exports:{}},L={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _r=Symbol.for("react.element"),zd=Symbol.for("react.portal"),Pd=Symbol.for("react.fragment"),Td=Symbol.for("react.strict_mode"),_d=Symbol.for("react.profiler"),Id=Symbol.for("react.provider"),Rd=Symbol.for("react.context"),Dd=Symbol.for("react.forward_ref"),Ld=Symbol.for("react.suspense"),Md=Symbol.for("react.memo"),Od=Symbol.for("react.lazy"),El=Symbol.iterator;function Fd(e){return e===null||typeof e!="object"?null:(e=El&&e[El]||e["@@iterator"],typeof e=="function"?e:null)}var Xs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Js=Object.assign,Zs={};function An(e,t,n){this.props=e,this.context=t,this.refs=Zs,this.updater=n||Xs}An.prototype.isReactComponent={};An.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};An.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function qs(){}qs.prototype=An.prototype;function Pi(e,t,n){this.props=e,this.context=t,this.refs=Zs,this.updater=n||Xs}var Ti=Pi.prototype=new qs;Ti.constructor=Pi;Js(Ti,An.prototype);Ti.isPureReactComponent=!0;var Cl=Array.isArray,ec=Object.prototype.hasOwnProperty,_i={current:null},tc={key:!0,ref:!0,__self:!0,__source:!0};function nc(e,t,n){var r,o={},a=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(a=""+t.key),t)ec.call(t,r)&&!tc.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var c=Array(s),d=0;d<s;d++)c[d]=arguments[d+2];o.children=c}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:_r,type:e,key:a,ref:l,props:o,_owner:_i.current}}function Ad(e,t){return{$$typeof:_r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ii(e){return typeof e=="object"&&e!==null&&e.$$typeof===_r}function $d(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var zl=/\/+/g;function ia(e,t){return typeof e=="object"&&e!==null&&e.key!=null?$d(""+e.key):t.toString(36)}function ao(e,t,n,r,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case _r:case zd:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+ia(l,0):r,Cl(o)?(n="",e!=null&&(n=e.replace(zl,"$&/")+"/"),ao(o,t,n,"",function(d){return d})):o!=null&&(Ii(o)&&(o=Ad(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(zl,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Cl(e))for(var s=0;s<e.length;s++){a=e[s];var c=r+ia(a,s);l+=ao(a,t,n,c,o)}else if(c=Fd(e),typeof c=="function")for(e=c.call(e),s=0;!(a=e.next()).done;)a=a.value,c=r+ia(a,s++),l+=ao(a,t,n,c,o);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Br(e,t,n){if(e==null)return e;var r=[],o=0;return ao(e,r,"","",function(a){return t.call(n,a,o++)}),r}function Ud(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},io={transition:null},Bd={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:io,ReactCurrentOwner:_i};function rc(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:Br,forEach:function(e,t,n){Br(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Br(e,function(){t++}),t},toArray:function(e){return Br(e,function(t){return t})||[]},only:function(e){if(!Ii(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=An;L.Fragment=Pd;L.Profiler=_d;L.PureComponent=Pi;L.StrictMode=Td;L.Suspense=Ld;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Bd;L.act=rc;L.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Js({},e.props),o=e.key,a=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,l=_i.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)ec.call(t,c)&&!tc.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){s=Array(c);for(var d=0;d<c;d++)s[d]=arguments[d+2];r.children=s}return{$$typeof:_r,type:e.type,key:o,ref:a,props:r,_owner:l}};L.createContext=function(e){return e={$$typeof:Rd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Id,_context:e},e.Consumer=e};L.createElement=nc;L.createFactory=function(e){var t=nc.bind(null,e);return t.type=e,t};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:Dd,render:e}};L.isValidElement=Ii;L.lazy=function(e){return{$$typeof:Od,_payload:{_status:-1,_result:e},_init:Ud}};L.memo=function(e,t){return{$$typeof:Md,type:e,compare:t===void 0?null:t}};L.startTransition=function(e){var t=io.transition;io.transition={};try{e()}finally{io.transition=t}};L.unstable_act=rc;L.useCallback=function(e,t){return ke.current.useCallback(e,t)};L.useContext=function(e){return ke.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};L.useEffect=function(e,t){return ke.current.useEffect(e,t)};L.useId=function(){return ke.current.useId()};L.useImperativeHandle=function(e,t,n){return ke.current.useImperativeHandle(e,t,n)};L.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)};L.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)};L.useMemo=function(e,t){return ke.current.useMemo(e,t)};L.useReducer=function(e,t,n){return ke.current.useReducer(e,t,n)};L.useRef=function(e){return ke.current.useRef(e)};L.useState=function(e){return ke.current.useState(e)};L.useSyncExternalStore=function(e,t,n){return ke.current.useSyncExternalStore(e,t,n)};L.useTransition=function(){return ke.current.useTransition()};L.version="18.3.1";Ks.exports=L;var v=Ks.exports;const Wd=Cd(v),Vd=Ed({__proto__:null,default:Wd},[v]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hd=v,Qd=Symbol.for("react.element"),Gd=Symbol.for("react.fragment"),Yd=Object.prototype.hasOwnProperty,Kd=Hd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Xd={key:!0,ref:!0,__self:!0,__source:!0};function oc(e,t,n){var r,o={},a=null,l=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)Yd.call(t,r)&&!Xd.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:Qd,type:e,key:a,ref:l,props:o,_owner:Kd.current}}Bo.Fragment=Gd;Bo.jsx=oc;Bo.jsxs=oc;Ys.exports=Bo;var i=Ys.exports,ac={exports:{}},Le={},ic={exports:{}},lc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,_){var R=P.length;P.push(_);e:for(;0<R;){var A=R-1>>>1,V=P[A];if(0<o(V,_))P[A]=_,P[R]=V,R=A;else break e}}function n(P){return P.length===0?null:P[0]}function r(P){if(P.length===0)return null;var _=P[0],R=P.pop();if(R!==_){P[0]=R;e:for(var A=0,V=P.length,K=V>>>1;A<K;){var re=2*(A+1)-1,vt=P[re],Te=re+1,qe=P[Te];if(0>o(vt,R))Te<V&&0>o(qe,vt)?(P[A]=qe,P[Te]=R,A=Te):(P[A]=vt,P[re]=R,A=re);else if(Te<V&&0>o(qe,R))P[A]=qe,P[Te]=R,A=Te;else break e}}return _}function o(P,_){var R=P.sortIndex-_.sortIndex;return R!==0?R:P.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,s=l.now();e.unstable_now=function(){return l.now()-s}}var c=[],d=[],m=1,u=null,g=3,x=!1,w=!1,j=!1,E=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(P){for(var _=n(d);_!==null;){if(_.callback===null)r(d);else if(_.startTime<=P)r(d),_.sortIndex=_.expirationTime,t(c,_);else break;_=n(d)}}function b(P){if(j=!1,h(P),!w)if(n(c)!==null)w=!0,te(y);else{var _=n(d);_!==null&&be(b,_.startTime-P)}}function y(P,_){w=!1,j&&(j=!1,p(z),z=-1),x=!0;var R=g;try{for(h(_),u=n(c);u!==null&&(!(u.expirationTime>_)||P&&!G());){var A=u.callback;if(typeof A=="function"){u.callback=null,g=u.priorityLevel;var V=A(u.expirationTime<=_);_=e.unstable_now(),typeof V=="function"?u.callback=V:u===n(c)&&r(c),h(_)}else r(c);u=n(c)}if(u!==null)var K=!0;else{var re=n(d);re!==null&&be(b,re.startTime-_),K=!1}return K}finally{u=null,g=R,x=!1}}var k=!1,C=null,z=-1,D=5,I=-1;function G(){return!(e.unstable_now()-I<D)}function ye(){if(C!==null){var P=e.unstable_now();I=P;var _=!0;try{_=C(!0,P)}finally{_?ue():(k=!1,C=null)}}else k=!1}var ue;if(typeof f=="function")ue=function(){f(ye)};else if(typeof MessageChannel<"u"){var O=new MessageChannel,q=O.port2;O.port1.onmessage=ye,ue=function(){q.postMessage(null)}}else ue=function(){E(ye,0)};function te(P){C=P,k||(k=!0,ue())}function be(P,_){z=E(function(){P(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){w||x||(w=!0,te(y))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(P){switch(g){case 1:case 2:case 3:var _=3;break;default:_=g}var R=g;g=_;try{return P()}finally{g=R}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,_){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var R=g;g=P;try{return _()}finally{g=R}},e.unstable_scheduleCallback=function(P,_,R){var A=e.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?A+R:A):R=A,P){case 1:var V=-1;break;case 2:V=250;break;case 5:V=1073741823;break;case 4:V=1e4;break;default:V=5e3}return V=R+V,P={id:m++,callback:_,priorityLevel:P,startTime:R,expirationTime:V,sortIndex:-1},R>A?(P.sortIndex=R,t(d,P),n(c)===null&&P===n(d)&&(j?(p(z),z=-1):j=!0,be(b,R-A))):(P.sortIndex=V,t(c,P),w||x||(w=!0,te(y))),P},e.unstable_shouldYield=G,e.unstable_wrapCallback=function(P){var _=g;return function(){var R=g;g=_;try{return P.apply(this,arguments)}finally{g=R}}}})(lc);ic.exports=lc;var Jd=ic.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zd=v,De=Jd;function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sc=new Set,dr={};function an(e,t){In(e,t),In(e+"Capture",t)}function In(e,t){for(dr[e]=t,e=0;e<t.length;e++)sc.add(t[e])}var pt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),La=Object.prototype.hasOwnProperty,qd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Pl={},Tl={};function ef(e){return La.call(Tl,e)?!0:La.call(Pl,e)?!1:qd.test(e)?Tl[e]=!0:(Pl[e]=!0,!1)}function tf(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function nf(e,t,n,r){if(t===null||typeof t>"u"||tf(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Se(e,t,n,r,o,a,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=l}var pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){pe[e]=new Se(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];pe[t]=new Se(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){pe[e]=new Se(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){pe[e]=new Se(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){pe[e]=new Se(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){pe[e]=new Se(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){pe[e]=new Se(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){pe[e]=new Se(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){pe[e]=new Se(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ri=/[\-:]([a-z])/g;function Di(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ri,Di);pe[t]=new Se(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ri,Di);pe[t]=new Se(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ri,Di);pe[t]=new Se(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){pe[e]=new Se(e,1,!1,e.toLowerCase(),null,!1,!1)});pe.xlinkHref=new Se("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){pe[e]=new Se(e,1,!1,e.toLowerCase(),null,!0,!0)});function Li(e,t,n,r){var o=pe.hasOwnProperty(t)?pe[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(nf(t,n,o,r)&&(n=null),r||o===null?ef(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var xt=Zd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Wr=Symbol.for("react.element"),mn=Symbol.for("react.portal"),hn=Symbol.for("react.fragment"),Mi=Symbol.for("react.strict_mode"),Ma=Symbol.for("react.profiler"),cc=Symbol.for("react.provider"),uc=Symbol.for("react.context"),Oi=Symbol.for("react.forward_ref"),Oa=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Fi=Symbol.for("react.memo"),kt=Symbol.for("react.lazy"),dc=Symbol.for("react.offscreen"),_l=Symbol.iterator;function Wn(e){return e===null||typeof e!="object"?null:(e=_l&&e[_l]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,la;function Zn(e){if(la===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);la=t&&t[1]||""}return`
`+la+e}var sa=!1;function ca(e,t){if(!e||sa)return"";sa=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var o=d.stack.split(`
`),a=r.stack.split(`
`),l=o.length-1,s=a.length-1;1<=l&&0<=s&&o[l]!==a[s];)s--;for(;1<=l&&0<=s;l--,s--)if(o[l]!==a[s]){if(l!==1||s!==1)do if(l--,s--,0>s||o[l]!==a[s]){var c=`
`+o[l].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=l&&0<=s);break}}}finally{sa=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Zn(e):""}function rf(e){switch(e.tag){case 5:return Zn(e.type);case 16:return Zn("Lazy");case 13:return Zn("Suspense");case 19:return Zn("SuspenseList");case 0:case 2:case 15:return e=ca(e.type,!1),e;case 11:return e=ca(e.type.render,!1),e;case 1:return e=ca(e.type,!0),e;default:return""}}function Aa(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case hn:return"Fragment";case mn:return"Portal";case Ma:return"Profiler";case Mi:return"StrictMode";case Oa:return"Suspense";case Fa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case uc:return(e.displayName||"Context")+".Consumer";case cc:return(e._context.displayName||"Context")+".Provider";case Oi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Fi:return t=e.displayName||null,t!==null?t:Aa(e.type)||"Memo";case kt:t=e._payload,e=e._init;try{return Aa(e(t))}catch{}}return null}function of(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Aa(t);case 8:return t===Mi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function At(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function fc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function af(e){var t=fc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,a.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vr(e){e._valueTracker||(e._valueTracker=af(e))}function pc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=fc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function vo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function $a(e,t){var n=t.checked;return Z({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Il(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=At(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function mc(e,t){t=t.checked,t!=null&&Li(e,"checked",t,!1)}function Ua(e,t){mc(e,t);var n=At(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ba(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ba(e,t.type,At(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Rl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ba(e,t,n){(t!=="number"||vo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var qn=Array.isArray;function En(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+At(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Wa(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return Z({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Dl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(S(92));if(qn(n)){if(1<n.length)throw Error(S(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:At(n)}}function hc(e,t){var n=At(t.value),r=At(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ll(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function gc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Va(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?gc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Hr,xc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Hr=Hr||document.createElement("div"),Hr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Hr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function fr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var nr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},lf=["Webkit","ms","Moz","O"];Object.keys(nr).forEach(function(e){lf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),nr[t]=nr[e]})});function vc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||nr.hasOwnProperty(e)&&nr[e]?(""+t).trim():t+"px"}function yc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=vc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var sf=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ha(e,t){if(t){if(sf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function Qa(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ga=null;function Ai(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ya=null,Cn=null,zn=null;function Ml(e){if(e=Dr(e)){if(typeof Ya!="function")throw Error(S(280));var t=e.stateNode;t&&(t=Go(t),Ya(e.stateNode,e.type,t))}}function bc(e){Cn?zn?zn.push(e):zn=[e]:Cn=e}function wc(){if(Cn){var e=Cn,t=zn;if(zn=Cn=null,Ml(e),t)for(e=0;e<t.length;e++)Ml(t[e])}}function jc(e,t){return e(t)}function kc(){}var ua=!1;function Sc(e,t,n){if(ua)return e(t,n);ua=!0;try{return jc(e,t,n)}finally{ua=!1,(Cn!==null||zn!==null)&&(kc(),wc())}}function pr(e,t){var n=e.stateNode;if(n===null)return null;var r=Go(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(S(231,t,typeof n));return n}var Ka=!1;if(pt)try{var Vn={};Object.defineProperty(Vn,"passive",{get:function(){Ka=!0}}),window.addEventListener("test",Vn,Vn),window.removeEventListener("test",Vn,Vn)}catch{Ka=!1}function cf(e,t,n,r,o,a,l,s,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(m){this.onError(m)}}var rr=!1,yo=null,bo=!1,Xa=null,uf={onError:function(e){rr=!0,yo=e}};function df(e,t,n,r,o,a,l,s,c){rr=!1,yo=null,cf.apply(uf,arguments)}function ff(e,t,n,r,o,a,l,s,c){if(df.apply(this,arguments),rr){if(rr){var d=yo;rr=!1,yo=null}else throw Error(S(198));bo||(bo=!0,Xa=d)}}function ln(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Nc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ol(e){if(ln(e)!==e)throw Error(S(188))}function pf(e){var t=e.alternate;if(!t){if(t=ln(e),t===null)throw Error(S(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var a=o.alternate;if(a===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===n)return Ol(o),e;if(a===r)return Ol(o),t;a=a.sibling}throw Error(S(188))}if(n.return!==r.return)n=o,r=a;else{for(var l=!1,s=o.child;s;){if(s===n){l=!0,n=o,r=a;break}if(s===r){l=!0,r=o,n=a;break}s=s.sibling}if(!l){for(s=a.child;s;){if(s===n){l=!0,n=a,r=o;break}if(s===r){l=!0,r=a,n=o;break}s=s.sibling}if(!l)throw Error(S(189))}}if(n.alternate!==r)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?e:t}function Ec(e){return e=pf(e),e!==null?Cc(e):null}function Cc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Cc(e);if(t!==null)return t;e=e.sibling}return null}var zc=De.unstable_scheduleCallback,Fl=De.unstable_cancelCallback,mf=De.unstable_shouldYield,hf=De.unstable_requestPaint,ne=De.unstable_now,gf=De.unstable_getCurrentPriorityLevel,$i=De.unstable_ImmediatePriority,Pc=De.unstable_UserBlockingPriority,wo=De.unstable_NormalPriority,xf=De.unstable_LowPriority,Tc=De.unstable_IdlePriority,Wo=null,ot=null;function vf(e){if(ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(Wo,e,void 0,(e.current.flags&128)===128)}catch{}}var Ke=Math.clz32?Math.clz32:wf,yf=Math.log,bf=Math.LN2;function wf(e){return e>>>=0,e===0?32:31-(yf(e)/bf|0)|0}var Qr=64,Gr=4194304;function er(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function jo(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,l=n&268435455;if(l!==0){var s=l&~o;s!==0?r=er(s):(a&=l,a!==0&&(r=er(a)))}else l=n&~o,l!==0?r=er(l):a!==0&&(r=er(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,a=t&-t,o>=a||o===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ke(t),o=1<<n,r|=e[n],t&=~o;return r}function jf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-Ke(a),s=1<<l,c=o[l];c===-1?(!(s&n)||s&r)&&(o[l]=jf(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}}function Ja(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function _c(){var e=Qr;return Qr<<=1,!(Qr&4194240)&&(Qr=64),e}function da(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ir(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ke(t),e[t]=n}function Sf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Ke(n),a=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~a}}function Ui(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ke(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var $=0;function Ic(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Rc,Bi,Dc,Lc,Mc,Za=!1,Yr=[],_t=null,It=null,Rt=null,mr=new Map,hr=new Map,Nt=[],Nf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Al(e,t){switch(e){case"focusin":case"focusout":_t=null;break;case"dragenter":case"dragleave":It=null;break;case"mouseover":case"mouseout":Rt=null;break;case"pointerover":case"pointerout":mr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":hr.delete(t.pointerId)}}function Hn(e,t,n,r,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},t!==null&&(t=Dr(t),t!==null&&Bi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Ef(e,t,n,r,o){switch(t){case"focusin":return _t=Hn(_t,e,t,n,r,o),!0;case"dragenter":return It=Hn(It,e,t,n,r,o),!0;case"mouseover":return Rt=Hn(Rt,e,t,n,r,o),!0;case"pointerover":var a=o.pointerId;return mr.set(a,Hn(mr.get(a)||null,e,t,n,r,o)),!0;case"gotpointercapture":return a=o.pointerId,hr.set(a,Hn(hr.get(a)||null,e,t,n,r,o)),!0}return!1}function Oc(e){var t=Yt(e.target);if(t!==null){var n=ln(t);if(n!==null){if(t=n.tag,t===13){if(t=Nc(n),t!==null){e.blockedOn=t,Mc(e.priority,function(){Dc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function lo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=qa(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ga=r,n.target.dispatchEvent(r),Ga=null}else return t=Dr(n),t!==null&&Bi(t),e.blockedOn=n,!1;t.shift()}return!0}function $l(e,t,n){lo(e)&&n.delete(t)}function Cf(){Za=!1,_t!==null&&lo(_t)&&(_t=null),It!==null&&lo(It)&&(It=null),Rt!==null&&lo(Rt)&&(Rt=null),mr.forEach($l),hr.forEach($l)}function Qn(e,t){e.blockedOn===t&&(e.blockedOn=null,Za||(Za=!0,De.unstable_scheduleCallback(De.unstable_NormalPriority,Cf)))}function gr(e){function t(o){return Qn(o,e)}if(0<Yr.length){Qn(Yr[0],e);for(var n=1;n<Yr.length;n++){var r=Yr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(_t!==null&&Qn(_t,e),It!==null&&Qn(It,e),Rt!==null&&Qn(Rt,e),mr.forEach(t),hr.forEach(t),n=0;n<Nt.length;n++)r=Nt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Nt.length&&(n=Nt[0],n.blockedOn===null);)Oc(n),n.blockedOn===null&&Nt.shift()}var Pn=xt.ReactCurrentBatchConfig,ko=!0;function zf(e,t,n,r){var o=$,a=Pn.transition;Pn.transition=null;try{$=1,Wi(e,t,n,r)}finally{$=o,Pn.transition=a}}function Pf(e,t,n,r){var o=$,a=Pn.transition;Pn.transition=null;try{$=4,Wi(e,t,n,r)}finally{$=o,Pn.transition=a}}function Wi(e,t,n,r){if(ko){var o=qa(e,t,n,r);if(o===null)wa(e,t,r,So,n),Al(e,r);else if(Ef(o,e,t,n,r))r.stopPropagation();else if(Al(e,r),t&4&&-1<Nf.indexOf(e)){for(;o!==null;){var a=Dr(o);if(a!==null&&Rc(a),a=qa(e,t,n,r),a===null&&wa(e,t,r,So,n),a===o)break;o=a}o!==null&&r.stopPropagation()}else wa(e,t,r,null,n)}}var So=null;function qa(e,t,n,r){if(So=null,e=Ai(r),e=Yt(e),e!==null)if(t=ln(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Nc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return So=e,null}function Fc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gf()){case $i:return 1;case Pc:return 4;case wo:case xf:return 16;case Tc:return 536870912;default:return 16}default:return 16}}var Ct=null,Vi=null,so=null;function Ac(){if(so)return so;var e,t=Vi,n=t.length,r,o="value"in Ct?Ct.value:Ct.textContent,a=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[a-r];r++);return so=o.slice(e,1<r?1-r:void 0)}function co(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Kr(){return!0}function Ul(){return!1}function Me(e){function t(n,r,o,a,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Kr:Ul,this.isPropagationStopped=Ul,this}return Z(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kr)},persist:function(){},isPersistent:Kr}),t}var $n={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hi=Me($n),Rr=Z({},$n,{view:0,detail:0}),Tf=Me(Rr),fa,pa,Gn,Vo=Z({},Rr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gn&&(Gn&&e.type==="mousemove"?(fa=e.screenX-Gn.screenX,pa=e.screenY-Gn.screenY):pa=fa=0,Gn=e),fa)},movementY:function(e){return"movementY"in e?e.movementY:pa}}),Bl=Me(Vo),_f=Z({},Vo,{dataTransfer:0}),If=Me(_f),Rf=Z({},Rr,{relatedTarget:0}),ma=Me(Rf),Df=Z({},$n,{animationName:0,elapsedTime:0,pseudoElement:0}),Lf=Me(Df),Mf=Z({},$n,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Of=Me(Mf),Ff=Z({},$n,{data:0}),Wl=Me(Ff),Af={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$f={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Uf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Bf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Uf[e])?!!t[e]:!1}function Qi(){return Bf}var Wf=Z({},Rr,{key:function(e){if(e.key){var t=Af[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=co(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?$f[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qi,charCode:function(e){return e.type==="keypress"?co(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?co(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Vf=Me(Wf),Hf=Z({},Vo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vl=Me(Hf),Qf=Z({},Rr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qi}),Gf=Me(Qf),Yf=Z({},$n,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kf=Me(Yf),Xf=Z({},Vo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Jf=Me(Xf),Zf=[9,13,27,32],Gi=pt&&"CompositionEvent"in window,or=null;pt&&"documentMode"in document&&(or=document.documentMode);var qf=pt&&"TextEvent"in window&&!or,$c=pt&&(!Gi||or&&8<or&&11>=or),Hl=" ",Ql=!1;function Uc(e,t){switch(e){case"keyup":return Zf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var gn=!1;function ep(e,t){switch(e){case"compositionend":return Bc(t);case"keypress":return t.which!==32?null:(Ql=!0,Hl);case"textInput":return e=t.data,e===Hl&&Ql?null:e;default:return null}}function tp(e,t){if(gn)return e==="compositionend"||!Gi&&Uc(e,t)?(e=Ac(),so=Vi=Ct=null,gn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $c&&t.locale!=="ko"?null:t.data;default:return null}}var np={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Gl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!np[e.type]:t==="textarea"}function Wc(e,t,n,r){bc(r),t=No(t,"onChange"),0<t.length&&(n=new Hi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ar=null,xr=null;function rp(e){eu(e,0)}function Ho(e){var t=yn(e);if(pc(t))return e}function op(e,t){if(e==="change")return t}var Vc=!1;if(pt){var ha;if(pt){var ga="oninput"in document;if(!ga){var Yl=document.createElement("div");Yl.setAttribute("oninput","return;"),ga=typeof Yl.oninput=="function"}ha=ga}else ha=!1;Vc=ha&&(!document.documentMode||9<document.documentMode)}function Kl(){ar&&(ar.detachEvent("onpropertychange",Hc),xr=ar=null)}function Hc(e){if(e.propertyName==="value"&&Ho(xr)){var t=[];Wc(t,xr,e,Ai(e)),Sc(rp,t)}}function ap(e,t,n){e==="focusin"?(Kl(),ar=t,xr=n,ar.attachEvent("onpropertychange",Hc)):e==="focusout"&&Kl()}function ip(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ho(xr)}function lp(e,t){if(e==="click")return Ho(t)}function sp(e,t){if(e==="input"||e==="change")return Ho(t)}function cp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Je=typeof Object.is=="function"?Object.is:cp;function vr(e,t){if(Je(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!La.call(t,o)||!Je(e[o],t[o]))return!1}return!0}function Xl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jl(e,t){var n=Xl(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Xl(n)}}function Qc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gc(){for(var e=window,t=vo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=vo(e.document)}return t}function Yi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function up(e){var t=Gc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Qc(n.ownerDocument.documentElement,n)){if(r!==null&&Yi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,a=Math.min(r.start,o);r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=Jl(n,a);var l=Jl(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var dp=pt&&"documentMode"in document&&11>=document.documentMode,xn=null,ei=null,ir=null,ti=!1;function Zl(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ti||xn==null||xn!==vo(r)||(r=xn,"selectionStart"in r&&Yi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ir&&vr(ir,r)||(ir=r,r=No(ei,"onSelect"),0<r.length&&(t=new Hi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=xn)))}function Xr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var vn={animationend:Xr("Animation","AnimationEnd"),animationiteration:Xr("Animation","AnimationIteration"),animationstart:Xr("Animation","AnimationStart"),transitionend:Xr("Transition","TransitionEnd")},xa={},Yc={};pt&&(Yc=document.createElement("div").style,"AnimationEvent"in window||(delete vn.animationend.animation,delete vn.animationiteration.animation,delete vn.animationstart.animation),"TransitionEvent"in window||delete vn.transitionend.transition);function Qo(e){if(xa[e])return xa[e];if(!vn[e])return e;var t=vn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Yc)return xa[e]=t[n];return e}var Kc=Qo("animationend"),Xc=Qo("animationiteration"),Jc=Qo("animationstart"),Zc=Qo("transitionend"),qc=new Map,ql="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ut(e,t){qc.set(e,t),an(t,[e])}for(var va=0;va<ql.length;va++){var ya=ql[va],fp=ya.toLowerCase(),pp=ya[0].toUpperCase()+ya.slice(1);Ut(fp,"on"+pp)}Ut(Kc,"onAnimationEnd");Ut(Xc,"onAnimationIteration");Ut(Jc,"onAnimationStart");Ut("dblclick","onDoubleClick");Ut("focusin","onFocus");Ut("focusout","onBlur");Ut(Zc,"onTransitionEnd");In("onMouseEnter",["mouseout","mouseover"]);In("onMouseLeave",["mouseout","mouseover"]);In("onPointerEnter",["pointerout","pointerover"]);In("onPointerLeave",["pointerout","pointerover"]);an("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));an("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));an("onBeforeInput",["compositionend","keypress","textInput","paste"]);an("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));an("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));an("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var tr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mp=new Set("cancel close invalid load scroll toggle".split(" ").concat(tr));function es(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,ff(r,t,void 0,e),e.currentTarget=null}function eu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var l=r.length-1;0<=l;l--){var s=r[l],c=s.instance,d=s.currentTarget;if(s=s.listener,c!==a&&o.isPropagationStopped())break e;es(o,s,d),a=c}else for(l=0;l<r.length;l++){if(s=r[l],c=s.instance,d=s.currentTarget,s=s.listener,c!==a&&o.isPropagationStopped())break e;es(o,s,d),a=c}}}if(bo)throw e=Xa,bo=!1,Xa=null,e}function H(e,t){var n=t[ii];n===void 0&&(n=t[ii]=new Set);var r=e+"__bubble";n.has(r)||(tu(t,e,2,!1),n.add(r))}function ba(e,t,n){var r=0;t&&(r|=4),tu(n,e,r,t)}var Jr="_reactListening"+Math.random().toString(36).slice(2);function yr(e){if(!e[Jr]){e[Jr]=!0,sc.forEach(function(n){n!=="selectionchange"&&(mp.has(n)||ba(n,!1,e),ba(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Jr]||(t[Jr]=!0,ba("selectionchange",!1,t))}}function tu(e,t,n,r){switch(Fc(t)){case 1:var o=zf;break;case 4:o=Pf;break;default:o=Wi}n=o.bind(null,t,n,e),o=void 0,!Ka||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function wa(e,t,n,r,o){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===o||c.nodeType===8&&c.parentNode===o))return;l=l.return}for(;s!==null;){if(l=Yt(s),l===null)return;if(c=l.tag,c===5||c===6){r=a=l;continue e}s=s.parentNode}}r=r.return}Sc(function(){var d=a,m=Ai(n),u=[];e:{var g=qc.get(e);if(g!==void 0){var x=Hi,w=e;switch(e){case"keypress":if(co(n)===0)break e;case"keydown":case"keyup":x=Vf;break;case"focusin":w="focus",x=ma;break;case"focusout":w="blur",x=ma;break;case"beforeblur":case"afterblur":x=ma;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=Bl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=If;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Gf;break;case Kc:case Xc:case Jc:x=Lf;break;case Zc:x=Kf;break;case"scroll":x=Tf;break;case"wheel":x=Jf;break;case"copy":case"cut":case"paste":x=Of;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Vl}var j=(t&4)!==0,E=!j&&e==="scroll",p=j?g!==null?g+"Capture":null:g;j=[];for(var f=d,h;f!==null;){h=f;var b=h.stateNode;if(h.tag===5&&b!==null&&(h=b,p!==null&&(b=pr(f,p),b!=null&&j.push(br(f,b,h)))),E)break;f=f.return}0<j.length&&(g=new x(g,w,null,n,m),u.push({event:g,listeners:j}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",g&&n!==Ga&&(w=n.relatedTarget||n.fromElement)&&(Yt(w)||w[mt]))break e;if((x||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,x?(w=n.relatedTarget||n.toElement,x=d,w=w?Yt(w):null,w!==null&&(E=ln(w),w!==E||w.tag!==5&&w.tag!==6)&&(w=null)):(x=null,w=d),x!==w)){if(j=Bl,b="onMouseLeave",p="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(j=Vl,b="onPointerLeave",p="onPointerEnter",f="pointer"),E=x==null?g:yn(x),h=w==null?g:yn(w),g=new j(b,f+"leave",x,n,m),g.target=E,g.relatedTarget=h,b=null,Yt(m)===d&&(j=new j(p,f+"enter",w,n,m),j.target=h,j.relatedTarget=E,b=j),E=b,x&&w)t:{for(j=x,p=w,f=0,h=j;h;h=pn(h))f++;for(h=0,b=p;b;b=pn(b))h++;for(;0<f-h;)j=pn(j),f--;for(;0<h-f;)p=pn(p),h--;for(;f--;){if(j===p||p!==null&&j===p.alternate)break t;j=pn(j),p=pn(p)}j=null}else j=null;x!==null&&ts(u,g,x,j,!1),w!==null&&E!==null&&ts(u,E,w,j,!0)}}e:{if(g=d?yn(d):window,x=g.nodeName&&g.nodeName.toLowerCase(),x==="select"||x==="input"&&g.type==="file")var y=op;else if(Gl(g))if(Vc)y=sp;else{y=ip;var k=ap}else(x=g.nodeName)&&x.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(y=lp);if(y&&(y=y(e,d))){Wc(u,y,n,m);break e}k&&k(e,g,d),e==="focusout"&&(k=g._wrapperState)&&k.controlled&&g.type==="number"&&Ba(g,"number",g.value)}switch(k=d?yn(d):window,e){case"focusin":(Gl(k)||k.contentEditable==="true")&&(xn=k,ei=d,ir=null);break;case"focusout":ir=ei=xn=null;break;case"mousedown":ti=!0;break;case"contextmenu":case"mouseup":case"dragend":ti=!1,Zl(u,n,m);break;case"selectionchange":if(dp)break;case"keydown":case"keyup":Zl(u,n,m)}var C;if(Gi)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else gn?Uc(e,n)&&(z="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(z="onCompositionStart");z&&($c&&n.locale!=="ko"&&(gn||z!=="onCompositionStart"?z==="onCompositionEnd"&&gn&&(C=Ac()):(Ct=m,Vi="value"in Ct?Ct.value:Ct.textContent,gn=!0)),k=No(d,z),0<k.length&&(z=new Wl(z,e,null,n,m),u.push({event:z,listeners:k}),C?z.data=C:(C=Bc(n),C!==null&&(z.data=C)))),(C=qf?ep(e,n):tp(e,n))&&(d=No(d,"onBeforeInput"),0<d.length&&(m=new Wl("onBeforeInput","beforeinput",null,n,m),u.push({event:m,listeners:d}),m.data=C))}eu(u,t)})}function br(e,t,n){return{instance:e,listener:t,currentTarget:n}}function No(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=pr(e,n),a!=null&&r.unshift(br(e,a,o)),a=pr(e,t),a!=null&&r.push(br(e,a,o))),e=e.return}return r}function pn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ts(e,t,n,r,o){for(var a=t._reactName,l=[];n!==null&&n!==r;){var s=n,c=s.alternate,d=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&d!==null&&(s=d,o?(c=pr(n,a),c!=null&&l.unshift(br(n,c,s))):o||(c=pr(n,a),c!=null&&l.push(br(n,c,s)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var hp=/\r\n?/g,gp=/\u0000|\uFFFD/g;function ns(e){return(typeof e=="string"?e:""+e).replace(hp,`
`).replace(gp,"")}function Zr(e,t,n){if(t=ns(t),ns(e)!==t&&n)throw Error(S(425))}function Eo(){}var ni=null,ri=null;function oi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ai=typeof setTimeout=="function"?setTimeout:void 0,xp=typeof clearTimeout=="function"?clearTimeout:void 0,rs=typeof Promise=="function"?Promise:void 0,vp=typeof queueMicrotask=="function"?queueMicrotask:typeof rs<"u"?function(e){return rs.resolve(null).then(e).catch(yp)}:ai;function yp(e){setTimeout(function(){throw e})}function ja(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),gr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);gr(t)}function Dt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function os(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Un=Math.random().toString(36).slice(2),rt="__reactFiber$"+Un,wr="__reactProps$"+Un,mt="__reactContainer$"+Un,ii="__reactEvents$"+Un,bp="__reactListeners$"+Un,wp="__reactHandles$"+Un;function Yt(e){var t=e[rt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[mt]||n[rt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=os(e);e!==null;){if(n=e[rt])return n;e=os(e)}return t}e=n,n=e.parentNode}return null}function Dr(e){return e=e[rt]||e[mt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function yn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function Go(e){return e[wr]||null}var li=[],bn=-1;function Bt(e){return{current:e}}function Q(e){0>bn||(e.current=li[bn],li[bn]=null,bn--)}function W(e,t){bn++,li[bn]=e.current,e.current=t}var $t={},ve=Bt($t),Ce=Bt(!1),en=$t;function Rn(e,t){var n=e.type.contextTypes;if(!n)return $t;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in n)o[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function ze(e){return e=e.childContextTypes,e!=null}function Co(){Q(Ce),Q(ve)}function as(e,t,n){if(ve.current!==$t)throw Error(S(168));W(ve,t),W(Ce,n)}function nu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(S(108,of(e)||"Unknown",o));return Z({},n,r)}function zo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||$t,en=ve.current,W(ve,e),W(Ce,Ce.current),!0}function is(e,t,n){var r=e.stateNode;if(!r)throw Error(S(169));n?(e=nu(e,t,en),r.__reactInternalMemoizedMergedChildContext=e,Q(Ce),Q(ve),W(ve,e)):Q(Ce),W(Ce,n)}var ct=null,Yo=!1,ka=!1;function ru(e){ct===null?ct=[e]:ct.push(e)}function jp(e){Yo=!0,ru(e)}function Wt(){if(!ka&&ct!==null){ka=!0;var e=0,t=$;try{var n=ct;for($=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ct=null,Yo=!1}catch(o){throw ct!==null&&(ct=ct.slice(e+1)),zc($i,Wt),o}finally{$=t,ka=!1}}return null}var wn=[],jn=0,Po=null,To=0,Oe=[],Fe=0,tn=null,ut=1,dt="";function Qt(e,t){wn[jn++]=To,wn[jn++]=Po,Po=e,To=t}function ou(e,t,n){Oe[Fe++]=ut,Oe[Fe++]=dt,Oe[Fe++]=tn,tn=e;var r=ut;e=dt;var o=32-Ke(r)-1;r&=~(1<<o),n+=1;var a=32-Ke(t)+o;if(30<a){var l=o-o%5;a=(r&(1<<l)-1).toString(32),r>>=l,o-=l,ut=1<<32-Ke(t)+o|n<<o|r,dt=a+e}else ut=1<<a|n<<o|r,dt=e}function Ki(e){e.return!==null&&(Qt(e,1),ou(e,1,0))}function Xi(e){for(;e===Po;)Po=wn[--jn],wn[jn]=null,To=wn[--jn],wn[jn]=null;for(;e===tn;)tn=Oe[--Fe],Oe[Fe]=null,dt=Oe[--Fe],Oe[Fe]=null,ut=Oe[--Fe],Oe[Fe]=null}var Re=null,Ie=null,Y=!1,Ge=null;function au(e,t){var n=Ae(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ls(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Re=e,Ie=Dt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Re=e,Ie=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=tn!==null?{id:ut,overflow:dt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ae(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Re=e,Ie=null,!0):!1;default:return!1}}function si(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ci(e){if(Y){var t=Ie;if(t){var n=t;if(!ls(e,t)){if(si(e))throw Error(S(418));t=Dt(n.nextSibling);var r=Re;t&&ls(e,t)?au(r,n):(e.flags=e.flags&-4097|2,Y=!1,Re=e)}}else{if(si(e))throw Error(S(418));e.flags=e.flags&-4097|2,Y=!1,Re=e}}}function ss(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Re=e}function qr(e){if(e!==Re)return!1;if(!Y)return ss(e),Y=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!oi(e.type,e.memoizedProps)),t&&(t=Ie)){if(si(e))throw iu(),Error(S(418));for(;t;)au(e,t),t=Dt(t.nextSibling)}if(ss(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ie=Dt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ie=null}}else Ie=Re?Dt(e.stateNode.nextSibling):null;return!0}function iu(){for(var e=Ie;e;)e=Dt(e.nextSibling)}function Dn(){Ie=Re=null,Y=!1}function Ji(e){Ge===null?Ge=[e]:Ge.push(e)}var kp=xt.ReactCurrentBatchConfig;function Yn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(S(309));var r=n.stateNode}if(!r)throw Error(S(147,e));var o=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(l){var s=o.refs;l===null?delete s[a]:s[a]=l},t._stringRef=a,t)}if(typeof e!="string")throw Error(S(284));if(!n._owner)throw Error(S(290,e))}return e}function eo(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function cs(e){var t=e._init;return t(e._payload)}function lu(e){function t(p,f){if(e){var h=p.deletions;h===null?(p.deletions=[f],p.flags|=16):h.push(f)}}function n(p,f){if(!e)return null;for(;f!==null;)t(p,f),f=f.sibling;return null}function r(p,f){for(p=new Map;f!==null;)f.key!==null?p.set(f.key,f):p.set(f.index,f),f=f.sibling;return p}function o(p,f){return p=Ft(p,f),p.index=0,p.sibling=null,p}function a(p,f,h){return p.index=h,e?(h=p.alternate,h!==null?(h=h.index,h<f?(p.flags|=2,f):h):(p.flags|=2,f)):(p.flags|=1048576,f)}function l(p){return e&&p.alternate===null&&(p.flags|=2),p}function s(p,f,h,b){return f===null||f.tag!==6?(f=Ta(h,p.mode,b),f.return=p,f):(f=o(f,h),f.return=p,f)}function c(p,f,h,b){var y=h.type;return y===hn?m(p,f,h.props.children,b,h.key):f!==null&&(f.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===kt&&cs(y)===f.type)?(b=o(f,h.props),b.ref=Yn(p,f,h),b.return=p,b):(b=xo(h.type,h.key,h.props,null,p.mode,b),b.ref=Yn(p,f,h),b.return=p,b)}function d(p,f,h,b){return f===null||f.tag!==4||f.stateNode.containerInfo!==h.containerInfo||f.stateNode.implementation!==h.implementation?(f=_a(h,p.mode,b),f.return=p,f):(f=o(f,h.children||[]),f.return=p,f)}function m(p,f,h,b,y){return f===null||f.tag!==7?(f=Zt(h,p.mode,b,y),f.return=p,f):(f=o(f,h),f.return=p,f)}function u(p,f,h){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ta(""+f,p.mode,h),f.return=p,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Wr:return h=xo(f.type,f.key,f.props,null,p.mode,h),h.ref=Yn(p,null,f),h.return=p,h;case mn:return f=_a(f,p.mode,h),f.return=p,f;case kt:var b=f._init;return u(p,b(f._payload),h)}if(qn(f)||Wn(f))return f=Zt(f,p.mode,h,null),f.return=p,f;eo(p,f)}return null}function g(p,f,h,b){var y=f!==null?f.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return y!==null?null:s(p,f,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Wr:return h.key===y?c(p,f,h,b):null;case mn:return h.key===y?d(p,f,h,b):null;case kt:return y=h._init,g(p,f,y(h._payload),b)}if(qn(h)||Wn(h))return y!==null?null:m(p,f,h,b,null);eo(p,h)}return null}function x(p,f,h,b,y){if(typeof b=="string"&&b!==""||typeof b=="number")return p=p.get(h)||null,s(f,p,""+b,y);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Wr:return p=p.get(b.key===null?h:b.key)||null,c(f,p,b,y);case mn:return p=p.get(b.key===null?h:b.key)||null,d(f,p,b,y);case kt:var k=b._init;return x(p,f,h,k(b._payload),y)}if(qn(b)||Wn(b))return p=p.get(h)||null,m(f,p,b,y,null);eo(f,b)}return null}function w(p,f,h,b){for(var y=null,k=null,C=f,z=f=0,D=null;C!==null&&z<h.length;z++){C.index>z?(D=C,C=null):D=C.sibling;var I=g(p,C,h[z],b);if(I===null){C===null&&(C=D);break}e&&C&&I.alternate===null&&t(p,C),f=a(I,f,z),k===null?y=I:k.sibling=I,k=I,C=D}if(z===h.length)return n(p,C),Y&&Qt(p,z),y;if(C===null){for(;z<h.length;z++)C=u(p,h[z],b),C!==null&&(f=a(C,f,z),k===null?y=C:k.sibling=C,k=C);return Y&&Qt(p,z),y}for(C=r(p,C);z<h.length;z++)D=x(C,p,z,h[z],b),D!==null&&(e&&D.alternate!==null&&C.delete(D.key===null?z:D.key),f=a(D,f,z),k===null?y=D:k.sibling=D,k=D);return e&&C.forEach(function(G){return t(p,G)}),Y&&Qt(p,z),y}function j(p,f,h,b){var y=Wn(h);if(typeof y!="function")throw Error(S(150));if(h=y.call(h),h==null)throw Error(S(151));for(var k=y=null,C=f,z=f=0,D=null,I=h.next();C!==null&&!I.done;z++,I=h.next()){C.index>z?(D=C,C=null):D=C.sibling;var G=g(p,C,I.value,b);if(G===null){C===null&&(C=D);break}e&&C&&G.alternate===null&&t(p,C),f=a(G,f,z),k===null?y=G:k.sibling=G,k=G,C=D}if(I.done)return n(p,C),Y&&Qt(p,z),y;if(C===null){for(;!I.done;z++,I=h.next())I=u(p,I.value,b),I!==null&&(f=a(I,f,z),k===null?y=I:k.sibling=I,k=I);return Y&&Qt(p,z),y}for(C=r(p,C);!I.done;z++,I=h.next())I=x(C,p,z,I.value,b),I!==null&&(e&&I.alternate!==null&&C.delete(I.key===null?z:I.key),f=a(I,f,z),k===null?y=I:k.sibling=I,k=I);return e&&C.forEach(function(ye){return t(p,ye)}),Y&&Qt(p,z),y}function E(p,f,h,b){if(typeof h=="object"&&h!==null&&h.type===hn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Wr:e:{for(var y=h.key,k=f;k!==null;){if(k.key===y){if(y=h.type,y===hn){if(k.tag===7){n(p,k.sibling),f=o(k,h.props.children),f.return=p,p=f;break e}}else if(k.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===kt&&cs(y)===k.type){n(p,k.sibling),f=o(k,h.props),f.ref=Yn(p,k,h),f.return=p,p=f;break e}n(p,k);break}else t(p,k);k=k.sibling}h.type===hn?(f=Zt(h.props.children,p.mode,b,h.key),f.return=p,p=f):(b=xo(h.type,h.key,h.props,null,p.mode,b),b.ref=Yn(p,f,h),b.return=p,p=b)}return l(p);case mn:e:{for(k=h.key;f!==null;){if(f.key===k)if(f.tag===4&&f.stateNode.containerInfo===h.containerInfo&&f.stateNode.implementation===h.implementation){n(p,f.sibling),f=o(f,h.children||[]),f.return=p,p=f;break e}else{n(p,f);break}else t(p,f);f=f.sibling}f=_a(h,p.mode,b),f.return=p,p=f}return l(p);case kt:return k=h._init,E(p,f,k(h._payload),b)}if(qn(h))return w(p,f,h,b);if(Wn(h))return j(p,f,h,b);eo(p,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,f!==null&&f.tag===6?(n(p,f.sibling),f=o(f,h),f.return=p,p=f):(n(p,f),f=Ta(h,p.mode,b),f.return=p,p=f),l(p)):n(p,f)}return E}var Ln=lu(!0),su=lu(!1),_o=Bt(null),Io=null,kn=null,Zi=null;function qi(){Zi=kn=Io=null}function el(e){var t=_o.current;Q(_o),e._currentValue=t}function ui(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Tn(e,t){Io=e,Zi=kn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ee=!0),e.firstContext=null)}function Ue(e){var t=e._currentValue;if(Zi!==e)if(e={context:e,memoizedValue:t,next:null},kn===null){if(Io===null)throw Error(S(308));kn=e,Io.dependencies={lanes:0,firstContext:e}}else kn=kn.next=e;return t}var Kt=null;function tl(e){Kt===null?Kt=[e]:Kt.push(e)}function cu(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,tl(t)):(n.next=o.next,o.next=n),t.interleaved=n,ht(e,r)}function ht(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var St=!1;function nl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function uu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ft(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Lt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,F&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,ht(e,n)}return o=r.interleaved,o===null?(t.next=t,tl(r)):(t.next=o.next,o.next=t),r.interleaved=t,ht(e,n)}function uo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ui(e,n)}}function us(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?o=a=l:a=a.next=l,n=n.next}while(n!==null);a===null?o=a=t:a=a.next=t}else o=a=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ro(e,t,n,r){var o=e.updateQueue;St=!1;var a=o.firstBaseUpdate,l=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var c=s,d=c.next;c.next=null,l===null?a=d:l.next=d,l=c;var m=e.alternate;m!==null&&(m=m.updateQueue,s=m.lastBaseUpdate,s!==l&&(s===null?m.firstBaseUpdate=d:s.next=d,m.lastBaseUpdate=c))}if(a!==null){var u=o.baseState;l=0,m=d=c=null,s=a;do{var g=s.lane,x=s.eventTime;if((r&g)===g){m!==null&&(m=m.next={eventTime:x,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var w=e,j=s;switch(g=t,x=n,j.tag){case 1:if(w=j.payload,typeof w=="function"){u=w.call(x,u,g);break e}u=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=j.payload,g=typeof w=="function"?w.call(x,u,g):w,g==null)break e;u=Z({},u,g);break e;case 2:St=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[s]:g.push(s))}else x={eventTime:x,lane:g,tag:s.tag,payload:s.payload,callback:s.callback,next:null},m===null?(d=m=x,c=u):m=m.next=x,l|=g;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;g=s,s=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(m===null&&(c=u),o.baseState=c,o.firstBaseUpdate=d,o.lastBaseUpdate=m,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else a===null&&(o.shared.lanes=0);rn|=l,e.lanes=l,e.memoizedState=u}}function ds(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(S(191,o));o.call(r)}}}var Lr={},at=Bt(Lr),jr=Bt(Lr),kr=Bt(Lr);function Xt(e){if(e===Lr)throw Error(S(174));return e}function rl(e,t){switch(W(kr,t),W(jr,e),W(at,Lr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Va(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Va(t,e)}Q(at),W(at,t)}function Mn(){Q(at),Q(jr),Q(kr)}function du(e){Xt(kr.current);var t=Xt(at.current),n=Va(t,e.type);t!==n&&(W(jr,e),W(at,n))}function ol(e){jr.current===e&&(Q(at),Q(jr))}var X=Bt(0);function Do(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Sa=[];function al(){for(var e=0;e<Sa.length;e++)Sa[e]._workInProgressVersionPrimary=null;Sa.length=0}var fo=xt.ReactCurrentDispatcher,Na=xt.ReactCurrentBatchConfig,nn=0,J=null,ie=null,se=null,Lo=!1,lr=!1,Sr=0,Sp=0;function he(){throw Error(S(321))}function il(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Je(e[n],t[n]))return!1;return!0}function ll(e,t,n,r,o,a){if(nn=a,J=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,fo.current=e===null||e.memoizedState===null?zp:Pp,e=n(r,o),lr){a=0;do{if(lr=!1,Sr=0,25<=a)throw Error(S(301));a+=1,se=ie=null,t.updateQueue=null,fo.current=Tp,e=n(r,o)}while(lr)}if(fo.current=Mo,t=ie!==null&&ie.next!==null,nn=0,se=ie=J=null,Lo=!1,t)throw Error(S(300));return e}function sl(){var e=Sr!==0;return Sr=0,e}function nt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return se===null?J.memoizedState=se=e:se=se.next=e,se}function Be(){if(ie===null){var e=J.alternate;e=e!==null?e.memoizedState:null}else e=ie.next;var t=se===null?J.memoizedState:se.next;if(t!==null)se=t,ie=e;else{if(e===null)throw Error(S(310));ie=e,e={memoizedState:ie.memoizedState,baseState:ie.baseState,baseQueue:ie.baseQueue,queue:ie.queue,next:null},se===null?J.memoizedState=se=e:se=se.next=e}return se}function Nr(e,t){return typeof t=="function"?t(e):t}function Ea(e){var t=Be(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=ie,o=r.baseQueue,a=n.pending;if(a!==null){if(o!==null){var l=o.next;o.next=a.next,a.next=l}r.baseQueue=o=a,n.pending=null}if(o!==null){a=o.next,r=r.baseState;var s=l=null,c=null,d=a;do{var m=d.lane;if((nn&m)===m)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var u={lane:m,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(s=c=u,l=r):c=c.next=u,J.lanes|=m,rn|=m}d=d.next}while(d!==null&&d!==a);c===null?l=r:c.next=s,Je(r,t.memoizedState)||(Ee=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do a=o.lane,J.lanes|=a,rn|=a,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ca(e){var t=Be(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,a=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do a=e(a,l.action),l=l.next;while(l!==o);Je(a,t.memoizedState)||(Ee=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function fu(){}function pu(e,t){var n=J,r=Be(),o=t(),a=!Je(r.memoizedState,o);if(a&&(r.memoizedState=o,Ee=!0),r=r.queue,cl(gu.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||se!==null&&se.memoizedState.tag&1){if(n.flags|=2048,Er(9,hu.bind(null,n,r,o,t),void 0,null),ce===null)throw Error(S(349));nn&30||mu(n,t,o)}return o}function mu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hu(e,t,n,r){t.value=n,t.getSnapshot=r,xu(t)&&vu(e)}function gu(e,t,n){return n(function(){xu(t)&&vu(e)})}function xu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Je(e,n)}catch{return!0}}function vu(e){var t=ht(e,1);t!==null&&Xe(t,e,1,-1)}function fs(e){var t=nt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Nr,lastRenderedState:e},t.queue=e,e=e.dispatch=Cp.bind(null,J,e),[t.memoizedState,e]}function Er(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function yu(){return Be().memoizedState}function po(e,t,n,r){var o=nt();J.flags|=e,o.memoizedState=Er(1|t,n,void 0,r===void 0?null:r)}function Ko(e,t,n,r){var o=Be();r=r===void 0?null:r;var a=void 0;if(ie!==null){var l=ie.memoizedState;if(a=l.destroy,r!==null&&il(r,l.deps)){o.memoizedState=Er(t,n,a,r);return}}J.flags|=e,o.memoizedState=Er(1|t,n,a,r)}function ps(e,t){return po(8390656,8,e,t)}function cl(e,t){return Ko(2048,8,e,t)}function bu(e,t){return Ko(4,2,e,t)}function wu(e,t){return Ko(4,4,e,t)}function ju(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ku(e,t,n){return n=n!=null?n.concat([e]):null,Ko(4,4,ju.bind(null,t,e),n)}function ul(){}function Su(e,t){var n=Be();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&il(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Nu(e,t){var n=Be();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&il(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Eu(e,t,n){return nn&21?(Je(n,t)||(n=_c(),J.lanes|=n,rn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ee=!0),e.memoizedState=n)}function Np(e,t){var n=$;$=n!==0&&4>n?n:4,e(!0);var r=Na.transition;Na.transition={};try{e(!1),t()}finally{$=n,Na.transition=r}}function Cu(){return Be().memoizedState}function Ep(e,t,n){var r=Ot(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},zu(e))Pu(t,n);else if(n=cu(e,t,n,r),n!==null){var o=je();Xe(n,e,r,o),Tu(n,t,r)}}function Cp(e,t,n){var r=Ot(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(zu(e))Pu(t,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var l=t.lastRenderedState,s=a(l,n);if(o.hasEagerState=!0,o.eagerState=s,Je(s,l)){var c=t.interleaved;c===null?(o.next=o,tl(t)):(o.next=c.next,c.next=o),t.interleaved=o;return}}catch{}finally{}n=cu(e,t,o,r),n!==null&&(o=je(),Xe(n,e,r,o),Tu(n,t,r))}}function zu(e){var t=e.alternate;return e===J||t!==null&&t===J}function Pu(e,t){lr=Lo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Tu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ui(e,n)}}var Mo={readContext:Ue,useCallback:he,useContext:he,useEffect:he,useImperativeHandle:he,useInsertionEffect:he,useLayoutEffect:he,useMemo:he,useReducer:he,useRef:he,useState:he,useDebugValue:he,useDeferredValue:he,useTransition:he,useMutableSource:he,useSyncExternalStore:he,useId:he,unstable_isNewReconciler:!1},zp={readContext:Ue,useCallback:function(e,t){return nt().memoizedState=[e,t===void 0?null:t],e},useContext:Ue,useEffect:ps,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,po(4194308,4,ju.bind(null,t,e),n)},useLayoutEffect:function(e,t){return po(4194308,4,e,t)},useInsertionEffect:function(e,t){return po(4,2,e,t)},useMemo:function(e,t){var n=nt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=nt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ep.bind(null,J,e),[r.memoizedState,e]},useRef:function(e){var t=nt();return e={current:e},t.memoizedState=e},useState:fs,useDebugValue:ul,useDeferredValue:function(e){return nt().memoizedState=e},useTransition:function(){var e=fs(!1),t=e[0];return e=Np.bind(null,e[1]),nt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=J,o=nt();if(Y){if(n===void 0)throw Error(S(407));n=n()}else{if(n=t(),ce===null)throw Error(S(349));nn&30||mu(r,t,n)}o.memoizedState=n;var a={value:n,getSnapshot:t};return o.queue=a,ps(gu.bind(null,r,a,e),[e]),r.flags|=2048,Er(9,hu.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=nt(),t=ce.identifierPrefix;if(Y){var n=dt,r=ut;n=(r&~(1<<32-Ke(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Sr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Sp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Pp={readContext:Ue,useCallback:Su,useContext:Ue,useEffect:cl,useImperativeHandle:ku,useInsertionEffect:bu,useLayoutEffect:wu,useMemo:Nu,useReducer:Ea,useRef:yu,useState:function(){return Ea(Nr)},useDebugValue:ul,useDeferredValue:function(e){var t=Be();return Eu(t,ie.memoizedState,e)},useTransition:function(){var e=Ea(Nr)[0],t=Be().memoizedState;return[e,t]},useMutableSource:fu,useSyncExternalStore:pu,useId:Cu,unstable_isNewReconciler:!1},Tp={readContext:Ue,useCallback:Su,useContext:Ue,useEffect:cl,useImperativeHandle:ku,useInsertionEffect:bu,useLayoutEffect:wu,useMemo:Nu,useReducer:Ca,useRef:yu,useState:function(){return Ca(Nr)},useDebugValue:ul,useDeferredValue:function(e){var t=Be();return ie===null?t.memoizedState=e:Eu(t,ie.memoizedState,e)},useTransition:function(){var e=Ca(Nr)[0],t=Be().memoizedState;return[e,t]},useMutableSource:fu,useSyncExternalStore:pu,useId:Cu,unstable_isNewReconciler:!1};function He(e,t){if(e&&e.defaultProps){t=Z({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function di(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Z({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Xo={isMounted:function(e){return(e=e._reactInternals)?ln(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=je(),o=Ot(e),a=ft(r,o);a.payload=t,n!=null&&(a.callback=n),t=Lt(e,a,o),t!==null&&(Xe(t,e,o,r),uo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=je(),o=Ot(e),a=ft(r,o);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=Lt(e,a,o),t!==null&&(Xe(t,e,o,r),uo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=je(),r=Ot(e),o=ft(n,r);o.tag=2,t!=null&&(o.callback=t),t=Lt(e,o,r),t!==null&&(Xe(t,e,r,n),uo(t,e,r))}};function ms(e,t,n,r,o,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,l):t.prototype&&t.prototype.isPureReactComponent?!vr(n,r)||!vr(o,a):!0}function _u(e,t,n){var r=!1,o=$t,a=t.contextType;return typeof a=="object"&&a!==null?a=Ue(a):(o=ze(t)?en:ve.current,r=t.contextTypes,a=(r=r!=null)?Rn(e,o):$t),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Xo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),t}function hs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Xo.enqueueReplaceState(t,t.state,null)}function fi(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},nl(e);var a=t.contextType;typeof a=="object"&&a!==null?o.context=Ue(a):(a=ze(t)?en:ve.current,o.context=Rn(e,a)),o.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(di(e,t,a,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Xo.enqueueReplaceState(o,o.state,null),Ro(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function On(e,t){try{var n="",r=t;do n+=rf(r),r=r.return;while(r);var o=n}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:o,digest:null}}function za(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function pi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var _p=typeof WeakMap=="function"?WeakMap:Map;function Iu(e,t,n){n=ft(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Fo||(Fo=!0,ki=r),pi(e,t)},n}function Ru(e,t,n){n=ft(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){pi(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){pi(e,t),typeof r!="function"&&(Mt===null?Mt=new Set([this]):Mt.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function gs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new _p;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Hp.bind(null,e,t,n),t.then(e,e))}function xs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function vs(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ft(-1,1),t.tag=2,Lt(n,t,1))),n.lanes|=1),e)}var Ip=xt.ReactCurrentOwner,Ee=!1;function we(e,t,n,r){t.child=e===null?su(t,null,n,r):Ln(t,e.child,n,r)}function ys(e,t,n,r,o){n=n.render;var a=t.ref;return Tn(t,o),r=ll(e,t,n,r,a,o),n=sl(),e!==null&&!Ee?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,gt(e,t,o)):(Y&&n&&Ki(t),t.flags|=1,we(e,t,r,o),t.child)}function bs(e,t,n,r,o){if(e===null){var a=n.type;return typeof a=="function"&&!vl(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,Du(e,t,a,r,o)):(e=xo(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&o)){var l=a.memoizedProps;if(n=n.compare,n=n!==null?n:vr,n(l,r)&&e.ref===t.ref)return gt(e,t,o)}return t.flags|=1,e=Ft(a,r),e.ref=t.ref,e.return=t,t.child=e}function Du(e,t,n,r,o){if(e!==null){var a=e.memoizedProps;if(vr(a,r)&&e.ref===t.ref)if(Ee=!1,t.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&(Ee=!0);else return t.lanes=e.lanes,gt(e,t,o)}return mi(e,t,n,r,o)}function Lu(e,t,n){var r=t.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},W(Nn,_e),_e|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,W(Nn,_e),_e|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,W(Nn,_e),_e|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,W(Nn,_e),_e|=r;return we(e,t,o,n),t.child}function Mu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function mi(e,t,n,r,o){var a=ze(n)?en:ve.current;return a=Rn(t,a),Tn(t,o),n=ll(e,t,n,r,a,o),r=sl(),e!==null&&!Ee?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,gt(e,t,o)):(Y&&r&&Ki(t),t.flags|=1,we(e,t,n,o),t.child)}function ws(e,t,n,r,o){if(ze(n)){var a=!0;zo(t)}else a=!1;if(Tn(t,o),t.stateNode===null)mo(e,t),_u(t,n,r),fi(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var c=l.context,d=n.contextType;typeof d=="object"&&d!==null?d=Ue(d):(d=ze(n)?en:ve.current,d=Rn(t,d));var m=n.getDerivedStateFromProps,u=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function";u||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==r||c!==d)&&hs(t,l,r,d),St=!1;var g=t.memoizedState;l.state=g,Ro(t,r,l,o),c=t.memoizedState,s!==r||g!==c||Ce.current||St?(typeof m=="function"&&(di(t,n,m,r),c=t.memoizedState),(s=St||ms(t,n,s,r,g,c,d))?(u||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),l.props=r,l.state=c,l.context=d,r=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,uu(e,t),s=t.memoizedProps,d=t.type===t.elementType?s:He(t.type,s),l.props=d,u=t.pendingProps,g=l.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ue(c):(c=ze(n)?en:ve.current,c=Rn(t,c));var x=n.getDerivedStateFromProps;(m=typeof x=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==u||g!==c)&&hs(t,l,r,c),St=!1,g=t.memoizedState,l.state=g,Ro(t,r,l,o);var w=t.memoizedState;s!==u||g!==w||Ce.current||St?(typeof x=="function"&&(di(t,n,x,r),w=t.memoizedState),(d=St||ms(t,n,d,r,g,w,c)||!1)?(m||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,w,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,w,c)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),l.props=r,l.state=w,l.context=c,r=d):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return hi(e,t,n,r,a,o)}function hi(e,t,n,r,o,a){Mu(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&is(t,n,!1),gt(e,t,a);r=t.stateNode,Ip.current=t;var s=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Ln(t,e.child,null,a),t.child=Ln(t,null,s,a)):we(e,t,s,a),t.memoizedState=r.state,o&&is(t,n,!0),t.child}function Ou(e){var t=e.stateNode;t.pendingContext?as(e,t.pendingContext,t.pendingContext!==t.context):t.context&&as(e,t.context,!1),rl(e,t.containerInfo)}function js(e,t,n,r,o){return Dn(),Ji(o),t.flags|=256,we(e,t,n,r),t.child}var gi={dehydrated:null,treeContext:null,retryLane:0};function xi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Fu(e,t,n){var r=t.pendingProps,o=X.current,a=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),W(X,o&1),e===null)return ci(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,a?(r=t.mode,a=t.child,l={mode:"hidden",children:l},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=qo(l,r,0,null),e=Zt(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=xi(n),t.memoizedState=gi,e):dl(t,l));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Rp(e,t,l,r,s,o,n);if(a){a=r.fallback,l=t.mode,o=e.child,s=o.sibling;var c={mode:"hidden",children:r.children};return!(l&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Ft(o,c),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?a=Ft(s,a):(a=Zt(a,l,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,l=e.child.memoizedState,l=l===null?xi(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~n,t.memoizedState=gi,r}return a=e.child,e=a.sibling,r=Ft(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function dl(e,t){return t=qo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function to(e,t,n,r){return r!==null&&Ji(r),Ln(t,e.child,null,n),e=dl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Rp(e,t,n,r,o,a,l){if(n)return t.flags&256?(t.flags&=-257,r=za(Error(S(422))),to(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,o=t.mode,r=qo({mode:"visible",children:r.children},o,0,null),a=Zt(a,o,l,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&Ln(t,e.child,null,l),t.child.memoizedState=xi(l),t.memoizedState=gi,a);if(!(t.mode&1))return to(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,a=Error(S(419)),r=za(a,r,void 0),to(e,t,l,r)}if(s=(l&e.childLanes)!==0,Ee||s){if(r=ce,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,ht(e,o),Xe(r,e,o,-1))}return xl(),r=za(Error(S(421))),to(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Qp.bind(null,e),o._reactRetry=t,null):(e=a.treeContext,Ie=Dt(o.nextSibling),Re=t,Y=!0,Ge=null,e!==null&&(Oe[Fe++]=ut,Oe[Fe++]=dt,Oe[Fe++]=tn,ut=e.id,dt=e.overflow,tn=t),t=dl(t,r.children),t.flags|=4096,t)}function ks(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ui(e.return,t,n)}function Pa(e,t,n,r,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=o)}function Au(e,t,n){var r=t.pendingProps,o=r.revealOrder,a=r.tail;if(we(e,t,r.children,n),r=X.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ks(e,n,t);else if(e.tag===19)ks(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(W(X,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Do(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Pa(t,!1,o,n,a);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Do(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Pa(t,!0,n,null,a);break;case"together":Pa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function mo(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function gt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),rn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,n=Ft(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ft(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Dp(e,t,n){switch(t.tag){case 3:Ou(t),Dn();break;case 5:du(t);break;case 1:ze(t.type)&&zo(t);break;case 4:rl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;W(_o,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(W(X,X.current&1),t.flags|=128,null):n&t.child.childLanes?Fu(e,t,n):(W(X,X.current&1),e=gt(e,t,n),e!==null?e.sibling:null);W(X,X.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Au(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),W(X,X.current),r)break;return null;case 22:case 23:return t.lanes=0,Lu(e,t,n)}return gt(e,t,n)}var $u,vi,Uu,Bu;$u=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vi=function(){};Uu=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Xt(at.current);var a=null;switch(n){case"input":o=$a(e,o),r=$a(e,r),a=[];break;case"select":o=Z({},o,{value:void 0}),r=Z({},r,{value:void 0}),a=[];break;case"textarea":o=Wa(e,o),r=Wa(e,r),a=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Eo)}Ha(n,r);var l;n=null;for(d in o)if(!r.hasOwnProperty(d)&&o.hasOwnProperty(d)&&o[d]!=null)if(d==="style"){var s=o[d];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(dr.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var c=r[d];if(s=o!=null?o[d]:void 0,r.hasOwnProperty(d)&&c!==s&&(c!=null||s!=null))if(d==="style")if(s){for(l in s)!s.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&s[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(a||(a=[]),a.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(a=a||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(a=a||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(dr.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&H("scroll",e),a||s===c||(a=[])):(a=a||[]).push(d,c))}n&&(a=a||[]).push("style",n);var d=a;(t.updateQueue=d)&&(t.flags|=4)}};Bu=function(e,t,n,r){n!==r&&(t.flags|=4)};function Kn(e,t){if(!Y)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ge(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lp(e,t,n){var r=t.pendingProps;switch(Xi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ge(t),null;case 1:return ze(t.type)&&Co(),ge(t),null;case 3:return r=t.stateNode,Mn(),Q(Ce),Q(ve),al(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(qr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ge!==null&&(Ei(Ge),Ge=null))),vi(e,t),ge(t),null;case 5:ol(t);var o=Xt(kr.current);if(n=t.type,e!==null&&t.stateNode!=null)Uu(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(S(166));return ge(t),null}if(e=Xt(at.current),qr(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[rt]=t,r[wr]=a,e=(t.mode&1)!==0,n){case"dialog":H("cancel",r),H("close",r);break;case"iframe":case"object":case"embed":H("load",r);break;case"video":case"audio":for(o=0;o<tr.length;o++)H(tr[o],r);break;case"source":H("error",r);break;case"img":case"image":case"link":H("error",r),H("load",r);break;case"details":H("toggle",r);break;case"input":Il(r,a),H("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},H("invalid",r);break;case"textarea":Dl(r,a),H("invalid",r)}Ha(n,a),o=null;for(var l in a)if(a.hasOwnProperty(l)){var s=a[l];l==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&Zr(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Zr(r.textContent,s,e),o=["children",""+s]):dr.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&H("scroll",r)}switch(n){case"input":Vr(r),Rl(r,a,!0);break;case"textarea":Vr(r),Ll(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Eo)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=gc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[rt]=t,e[wr]=r,$u(e,t,!1,!1),t.stateNode=e;e:{switch(l=Qa(n,r),n){case"dialog":H("cancel",e),H("close",e),o=r;break;case"iframe":case"object":case"embed":H("load",e),o=r;break;case"video":case"audio":for(o=0;o<tr.length;o++)H(tr[o],e);o=r;break;case"source":H("error",e),o=r;break;case"img":case"image":case"link":H("error",e),H("load",e),o=r;break;case"details":H("toggle",e),o=r;break;case"input":Il(e,r),o=$a(e,r),H("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Z({},r,{value:void 0}),H("invalid",e);break;case"textarea":Dl(e,r),o=Wa(e,r),H("invalid",e);break;default:o=r}Ha(n,o),s=o;for(a in s)if(s.hasOwnProperty(a)){var c=s[a];a==="style"?yc(e,c):a==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&xc(e,c)):a==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&fr(e,c):typeof c=="number"&&fr(e,""+c):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(dr.hasOwnProperty(a)?c!=null&&a==="onScroll"&&H("scroll",e):c!=null&&Li(e,a,c,l))}switch(n){case"input":Vr(e),Rl(e,r,!1);break;case"textarea":Vr(e),Ll(e);break;case"option":r.value!=null&&e.setAttribute("value",""+At(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?En(e,!!r.multiple,a,!1):r.defaultValue!=null&&En(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Eo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ge(t),null;case 6:if(e&&t.stateNode!=null)Bu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(S(166));if(n=Xt(kr.current),Xt(at.current),qr(t)){if(r=t.stateNode,n=t.memoizedProps,r[rt]=t,(a=r.nodeValue!==n)&&(e=Re,e!==null))switch(e.tag){case 3:Zr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Zr(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[rt]=t,t.stateNode=r}return ge(t),null;case 13:if(Q(X),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Y&&Ie!==null&&t.mode&1&&!(t.flags&128))iu(),Dn(),t.flags|=98560,a=!1;else if(a=qr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(S(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(S(317));a[rt]=t}else Dn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ge(t),a=!1}else Ge!==null&&(Ei(Ge),Ge=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||X.current&1?le===0&&(le=3):xl())),t.updateQueue!==null&&(t.flags|=4),ge(t),null);case 4:return Mn(),vi(e,t),e===null&&yr(t.stateNode.containerInfo),ge(t),null;case 10:return el(t.type._context),ge(t),null;case 17:return ze(t.type)&&Co(),ge(t),null;case 19:if(Q(X),a=t.memoizedState,a===null)return ge(t),null;if(r=(t.flags&128)!==0,l=a.rendering,l===null)if(r)Kn(a,!1);else{if(le!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Do(e),l!==null){for(t.flags|=128,Kn(a,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return W(X,X.current&1|2),t.child}e=e.sibling}a.tail!==null&&ne()>Fn&&(t.flags|=128,r=!0,Kn(a,!1),t.lanes=4194304)}else{if(!r)if(e=Do(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Kn(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!Y)return ge(t),null}else 2*ne()-a.renderingStartTime>Fn&&n!==1073741824&&(t.flags|=128,r=!0,Kn(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(n=a.last,n!==null?n.sibling=l:t.child=l,a.last=l)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=ne(),t.sibling=null,n=X.current,W(X,r?n&1|2:n&1),t):(ge(t),null);case 22:case 23:return gl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?_e&1073741824&&(ge(t),t.subtreeFlags&6&&(t.flags|=8192)):ge(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function Mp(e,t){switch(Xi(t),t.tag){case 1:return ze(t.type)&&Co(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Mn(),Q(Ce),Q(ve),al(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ol(t),null;case 13:if(Q(X),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));Dn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Q(X),null;case 4:return Mn(),null;case 10:return el(t.type._context),null;case 22:case 23:return gl(),null;case 24:return null;default:return null}}var no=!1,xe=!1,Op=typeof WeakSet=="function"?WeakSet:Set,T=null;function Sn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ee(e,t,r)}else n.current=null}function yi(e,t,n){try{n()}catch(r){ee(e,t,r)}}var Ss=!1;function Fp(e,t){if(ni=ko,e=Gc(),Yi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var l=0,s=-1,c=-1,d=0,m=0,u=e,g=null;t:for(;;){for(var x;u!==n||o!==0&&u.nodeType!==3||(s=l+o),u!==a||r!==0&&u.nodeType!==3||(c=l+r),u.nodeType===3&&(l+=u.nodeValue.length),(x=u.firstChild)!==null;)g=u,u=x;for(;;){if(u===e)break t;if(g===n&&++d===o&&(s=l),g===a&&++m===r&&(c=l),(x=u.nextSibling)!==null)break;u=g,g=u.parentNode}u=x}n=s===-1||c===-1?null:{start:s,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ri={focusedElem:e,selectionRange:n},ko=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var j=w.memoizedProps,E=w.memoizedState,p=t.stateNode,f=p.getSnapshotBeforeUpdate(t.elementType===t.type?j:He(t.type,j),E);p.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(b){ee(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return w=Ss,Ss=!1,w}function sr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&yi(t,n,a)}o=o.next}while(o!==r)}}function Jo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function bi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Wu(e){var t=e.alternate;t!==null&&(e.alternate=null,Wu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[rt],delete t[wr],delete t[ii],delete t[bp],delete t[wp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Vu(e){return e.tag===5||e.tag===3||e.tag===4}function Ns(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Vu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function wi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Eo));else if(r!==4&&(e=e.child,e!==null))for(wi(e,t,n),e=e.sibling;e!==null;)wi(e,t,n),e=e.sibling}function ji(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ji(e,t,n),e=e.sibling;e!==null;)ji(e,t,n),e=e.sibling}var de=null,Qe=!1;function bt(e,t,n){for(n=n.child;n!==null;)Hu(e,t,n),n=n.sibling}function Hu(e,t,n){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(Wo,n)}catch{}switch(n.tag){case 5:xe||Sn(n,t);case 6:var r=de,o=Qe;de=null,bt(e,t,n),de=r,Qe=o,de!==null&&(Qe?(e=de,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):de.removeChild(n.stateNode));break;case 18:de!==null&&(Qe?(e=de,n=n.stateNode,e.nodeType===8?ja(e.parentNode,n):e.nodeType===1&&ja(e,n),gr(e)):ja(de,n.stateNode));break;case 4:r=de,o=Qe,de=n.stateNode.containerInfo,Qe=!0,bt(e,t,n),de=r,Qe=o;break;case 0:case 11:case 14:case 15:if(!xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var a=o,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&yi(n,t,l),o=o.next}while(o!==r)}bt(e,t,n);break;case 1:if(!xe&&(Sn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ee(n,t,s)}bt(e,t,n);break;case 21:bt(e,t,n);break;case 22:n.mode&1?(xe=(r=xe)||n.memoizedState!==null,bt(e,t,n),xe=r):bt(e,t,n);break;default:bt(e,t,n)}}function Es(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Op),t.forEach(function(r){var o=Gp.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ve(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var a=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:de=s.stateNode,Qe=!1;break e;case 3:de=s.stateNode.containerInfo,Qe=!0;break e;case 4:de=s.stateNode.containerInfo,Qe=!0;break e}s=s.return}if(de===null)throw Error(S(160));Hu(a,l,o),de=null,Qe=!1;var c=o.alternate;c!==null&&(c.return=null),o.return=null}catch(d){ee(o,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Qu(t,e),t=t.sibling}function Qu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),tt(e),r&4){try{sr(3,e,e.return),Jo(3,e)}catch(j){ee(e,e.return,j)}try{sr(5,e,e.return)}catch(j){ee(e,e.return,j)}}break;case 1:Ve(t,e),tt(e),r&512&&n!==null&&Sn(n,n.return);break;case 5:if(Ve(t,e),tt(e),r&512&&n!==null&&Sn(n,n.return),e.flags&32){var o=e.stateNode;try{fr(o,"")}catch(j){ee(e,e.return,j)}}if(r&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,l=n!==null?n.memoizedProps:a,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&mc(o,a),Qa(s,l);var d=Qa(s,a);for(l=0;l<c.length;l+=2){var m=c[l],u=c[l+1];m==="style"?yc(o,u):m==="dangerouslySetInnerHTML"?xc(o,u):m==="children"?fr(o,u):Li(o,m,u,d)}switch(s){case"input":Ua(o,a);break;case"textarea":hc(o,a);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var x=a.value;x!=null?En(o,!!a.multiple,x,!1):g!==!!a.multiple&&(a.defaultValue!=null?En(o,!!a.multiple,a.defaultValue,!0):En(o,!!a.multiple,a.multiple?[]:"",!1))}o[wr]=a}catch(j){ee(e,e.return,j)}}break;case 6:if(Ve(t,e),tt(e),r&4){if(e.stateNode===null)throw Error(S(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(j){ee(e,e.return,j)}}break;case 3:if(Ve(t,e),tt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{gr(t.containerInfo)}catch(j){ee(e,e.return,j)}break;case 4:Ve(t,e),tt(e);break;case 13:Ve(t,e),tt(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(ml=ne())),r&4&&Es(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(xe=(d=xe)||m,Ve(t,e),xe=d):Ve(t,e),tt(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!m&&e.mode&1)for(T=e,m=e.child;m!==null;){for(u=T=m;T!==null;){switch(g=T,x=g.child,g.tag){case 0:case 11:case 14:case 15:sr(4,g,g.return);break;case 1:Sn(g,g.return);var w=g.stateNode;if(typeof w.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(j){ee(r,n,j)}}break;case 5:Sn(g,g.return);break;case 22:if(g.memoizedState!==null){zs(u);continue}}x!==null?(x.return=g,T=x):zs(u)}m=m.sibling}e:for(m=null,u=e;;){if(u.tag===5){if(m===null){m=u;try{o=u.stateNode,d?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=u.stateNode,c=u.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=vc("display",l))}catch(j){ee(e,e.return,j)}}}else if(u.tag===6){if(m===null)try{u.stateNode.nodeValue=d?"":u.memoizedProps}catch(j){ee(e,e.return,j)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===e)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break e;for(;u.sibling===null;){if(u.return===null||u.return===e)break e;m===u&&(m=null),u=u.return}m===u&&(m=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:Ve(t,e),tt(e),r&4&&Es(e);break;case 21:break;default:Ve(t,e),tt(e)}}function tt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Vu(n)){var r=n;break e}n=n.return}throw Error(S(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(fr(o,""),r.flags&=-33);var a=Ns(e);ji(e,a,o);break;case 3:case 4:var l=r.stateNode.containerInfo,s=Ns(e);wi(e,s,l);break;default:throw Error(S(161))}}catch(c){ee(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ap(e,t,n){T=e,Gu(e)}function Gu(e,t,n){for(var r=(e.mode&1)!==0;T!==null;){var o=T,a=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||no;if(!l){var s=o.alternate,c=s!==null&&s.memoizedState!==null||xe;s=no;var d=xe;if(no=l,(xe=c)&&!d)for(T=o;T!==null;)l=T,c=l.child,l.tag===22&&l.memoizedState!==null?Ps(o):c!==null?(c.return=l,T=c):Ps(o);for(;a!==null;)T=a,Gu(a),a=a.sibling;T=o,no=s,xe=d}Cs(e)}else o.subtreeFlags&8772&&a!==null?(a.return=o,T=a):Cs(e)}}function Cs(e){for(;T!==null;){var t=T;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:xe||Jo(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!xe)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:He(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&ds(t,a,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ds(t,l,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var m=d.memoizedState;if(m!==null){var u=m.dehydrated;u!==null&&gr(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}xe||t.flags&512&&bi(t)}catch(g){ee(t,t.return,g)}}if(t===e){T=null;break}if(n=t.sibling,n!==null){n.return=t.return,T=n;break}T=t.return}}function zs(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var n=t.sibling;if(n!==null){n.return=t.return,T=n;break}T=t.return}}function Ps(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Jo(4,t)}catch(c){ee(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(c){ee(t,o,c)}}var a=t.return;try{bi(t)}catch(c){ee(t,a,c)}break;case 5:var l=t.return;try{bi(t)}catch(c){ee(t,l,c)}}}catch(c){ee(t,t.return,c)}if(t===e){T=null;break}var s=t.sibling;if(s!==null){s.return=t.return,T=s;break}T=t.return}}var $p=Math.ceil,Oo=xt.ReactCurrentDispatcher,fl=xt.ReactCurrentOwner,$e=xt.ReactCurrentBatchConfig,F=0,ce=null,oe=null,fe=0,_e=0,Nn=Bt(0),le=0,Cr=null,rn=0,Zo=0,pl=0,cr=null,Ne=null,ml=0,Fn=1/0,st=null,Fo=!1,ki=null,Mt=null,ro=!1,zt=null,Ao=0,ur=0,Si=null,ho=-1,go=0;function je(){return F&6?ne():ho!==-1?ho:ho=ne()}function Ot(e){return e.mode&1?F&2&&fe!==0?fe&-fe:kp.transition!==null?(go===0&&(go=_c()),go):(e=$,e!==0||(e=window.event,e=e===void 0?16:Fc(e.type)),e):1}function Xe(e,t,n,r){if(50<ur)throw ur=0,Si=null,Error(S(185));Ir(e,n,r),(!(F&2)||e!==ce)&&(e===ce&&(!(F&2)&&(Zo|=n),le===4&&Et(e,fe)),Pe(e,r),n===1&&F===0&&!(t.mode&1)&&(Fn=ne()+500,Yo&&Wt()))}function Pe(e,t){var n=e.callbackNode;kf(e,t);var r=jo(e,e===ce?fe:0);if(r===0)n!==null&&Fl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Fl(n),t===1)e.tag===0?jp(Ts.bind(null,e)):ru(Ts.bind(null,e)),vp(function(){!(F&6)&&Wt()}),n=null;else{switch(Ic(r)){case 1:n=$i;break;case 4:n=Pc;break;case 16:n=wo;break;case 536870912:n=Tc;break;default:n=wo}n=td(n,Yu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Yu(e,t){if(ho=-1,go=0,F&6)throw Error(S(327));var n=e.callbackNode;if(_n()&&e.callbackNode!==n)return null;var r=jo(e,e===ce?fe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=$o(e,r);else{t=r;var o=F;F|=2;var a=Xu();(ce!==e||fe!==t)&&(st=null,Fn=ne()+500,Jt(e,t));do try{Wp();break}catch(s){Ku(e,s)}while(!0);qi(),Oo.current=a,F=o,oe!==null?t=0:(ce=null,fe=0,t=le)}if(t!==0){if(t===2&&(o=Ja(e),o!==0&&(r=o,t=Ni(e,o))),t===1)throw n=Cr,Jt(e,0),Et(e,r),Pe(e,ne()),n;if(t===6)Et(e,r);else{if(o=e.current.alternate,!(r&30)&&!Up(o)&&(t=$o(e,r),t===2&&(a=Ja(e),a!==0&&(r=a,t=Ni(e,a))),t===1))throw n=Cr,Jt(e,0),Et(e,r),Pe(e,ne()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(S(345));case 2:Gt(e,Ne,st);break;case 3:if(Et(e,r),(r&130023424)===r&&(t=ml+500-ne(),10<t)){if(jo(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){je(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ai(Gt.bind(null,e,Ne,st),t);break}Gt(e,Ne,st);break;case 4:if(Et(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-Ke(r);a=1<<l,l=t[l],l>o&&(o=l),r&=~a}if(r=o,r=ne()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*$p(r/1960))-r,10<r){e.timeoutHandle=ai(Gt.bind(null,e,Ne,st),r);break}Gt(e,Ne,st);break;case 5:Gt(e,Ne,st);break;default:throw Error(S(329))}}}return Pe(e,ne()),e.callbackNode===n?Yu.bind(null,e):null}function Ni(e,t){var n=cr;return e.current.memoizedState.isDehydrated&&(Jt(e,t).flags|=256),e=$o(e,t),e!==2&&(t=Ne,Ne=n,t!==null&&Ei(t)),e}function Ei(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function Up(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],a=o.getSnapshot;o=o.value;try{if(!Je(a(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Et(e,t){for(t&=~pl,t&=~Zo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ke(t),r=1<<n;e[n]=-1,t&=~r}}function Ts(e){if(F&6)throw Error(S(327));_n();var t=jo(e,0);if(!(t&1))return Pe(e,ne()),null;var n=$o(e,t);if(e.tag!==0&&n===2){var r=Ja(e);r!==0&&(t=r,n=Ni(e,r))}if(n===1)throw n=Cr,Jt(e,0),Et(e,t),Pe(e,ne()),n;if(n===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Gt(e,Ne,st),Pe(e,ne()),null}function hl(e,t){var n=F;F|=1;try{return e(t)}finally{F=n,F===0&&(Fn=ne()+500,Yo&&Wt())}}function on(e){zt!==null&&zt.tag===0&&!(F&6)&&_n();var t=F;F|=1;var n=$e.transition,r=$;try{if($e.transition=null,$=1,e)return e()}finally{$=r,$e.transition=n,F=t,!(F&6)&&Wt()}}function gl(){_e=Nn.current,Q(Nn)}function Jt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,xp(n)),oe!==null)for(n=oe.return;n!==null;){var r=n;switch(Xi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Co();break;case 3:Mn(),Q(Ce),Q(ve),al();break;case 5:ol(r);break;case 4:Mn();break;case 13:Q(X);break;case 19:Q(X);break;case 10:el(r.type._context);break;case 22:case 23:gl()}n=n.return}if(ce=e,oe=e=Ft(e.current,null),fe=_e=t,le=0,Cr=null,pl=Zo=rn=0,Ne=cr=null,Kt!==null){for(t=0;t<Kt.length;t++)if(n=Kt[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,a=n.pending;if(a!==null){var l=a.next;a.next=o,r.next=l}n.pending=r}Kt=null}return e}function Ku(e,t){do{var n=oe;try{if(qi(),fo.current=Mo,Lo){for(var r=J.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Lo=!1}if(nn=0,se=ie=J=null,lr=!1,Sr=0,fl.current=null,n===null||n.return===null){le=1,Cr=t,oe=null;break}e:{var a=e,l=n.return,s=n,c=t;if(t=fe,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,m=s,u=m.tag;if(!(m.mode&1)&&(u===0||u===11||u===15)){var g=m.alternate;g?(m.updateQueue=g.updateQueue,m.memoizedState=g.memoizedState,m.lanes=g.lanes):(m.updateQueue=null,m.memoizedState=null)}var x=xs(l);if(x!==null){x.flags&=-257,vs(x,l,s,a,t),x.mode&1&&gs(a,d,t),t=x,c=d;var w=t.updateQueue;if(w===null){var j=new Set;j.add(c),t.updateQueue=j}else w.add(c);break e}else{if(!(t&1)){gs(a,d,t),xl();break e}c=Error(S(426))}}else if(Y&&s.mode&1){var E=xs(l);if(E!==null){!(E.flags&65536)&&(E.flags|=256),vs(E,l,s,a,t),Ji(On(c,s));break e}}a=c=On(c,s),le!==4&&(le=2),cr===null?cr=[a]:cr.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var p=Iu(a,c,t);us(a,p);break e;case 1:s=c;var f=a.type,h=a.stateNode;if(!(a.flags&128)&&(typeof f.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Mt===null||!Mt.has(h)))){a.flags|=65536,t&=-t,a.lanes|=t;var b=Ru(a,s,t);us(a,b);break e}}a=a.return}while(a!==null)}Zu(n)}catch(y){t=y,oe===n&&n!==null&&(oe=n=n.return);continue}break}while(!0)}function Xu(){var e=Oo.current;return Oo.current=Mo,e===null?Mo:e}function xl(){(le===0||le===3||le===2)&&(le=4),ce===null||!(rn&268435455)&&!(Zo&268435455)||Et(ce,fe)}function $o(e,t){var n=F;F|=2;var r=Xu();(ce!==e||fe!==t)&&(st=null,Jt(e,t));do try{Bp();break}catch(o){Ku(e,o)}while(!0);if(qi(),F=n,Oo.current=r,oe!==null)throw Error(S(261));return ce=null,fe=0,le}function Bp(){for(;oe!==null;)Ju(oe)}function Wp(){for(;oe!==null&&!mf();)Ju(oe)}function Ju(e){var t=ed(e.alternate,e,_e);e.memoizedProps=e.pendingProps,t===null?Zu(e):oe=t,fl.current=null}function Zu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Mp(n,t),n!==null){n.flags&=32767,oe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{le=6,oe=null;return}}else if(n=Lp(n,t,_e),n!==null){oe=n;return}if(t=t.sibling,t!==null){oe=t;return}oe=t=e}while(t!==null);le===0&&(le=5)}function Gt(e,t,n){var r=$,o=$e.transition;try{$e.transition=null,$=1,Vp(e,t,n,r)}finally{$e.transition=o,$=r}return null}function Vp(e,t,n,r){do _n();while(zt!==null);if(F&6)throw Error(S(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Sf(e,a),e===ce&&(oe=ce=null,fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ro||(ro=!0,td(wo,function(){return _n(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=$e.transition,$e.transition=null;var l=$;$=1;var s=F;F|=4,fl.current=null,Fp(e,n),Qu(n,e),up(ri),ko=!!ni,ri=ni=null,e.current=n,Ap(n),hf(),F=s,$=l,$e.transition=a}else e.current=n;if(ro&&(ro=!1,zt=e,Ao=o),a=e.pendingLanes,a===0&&(Mt=null),vf(n.stateNode),Pe(e,ne()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Fo)throw Fo=!1,e=ki,ki=null,e;return Ao&1&&e.tag!==0&&_n(),a=e.pendingLanes,a&1?e===Si?ur++:(ur=0,Si=e):ur=0,Wt(),null}function _n(){if(zt!==null){var e=Ic(Ao),t=$e.transition,n=$;try{if($e.transition=null,$=16>e?16:e,zt===null)var r=!1;else{if(e=zt,zt=null,Ao=0,F&6)throw Error(S(331));var o=F;for(F|=4,T=e.current;T!==null;){var a=T,l=a.child;if(T.flags&16){var s=a.deletions;if(s!==null){for(var c=0;c<s.length;c++){var d=s[c];for(T=d;T!==null;){var m=T;switch(m.tag){case 0:case 11:case 15:sr(8,m,a)}var u=m.child;if(u!==null)u.return=m,T=u;else for(;T!==null;){m=T;var g=m.sibling,x=m.return;if(Wu(m),m===d){T=null;break}if(g!==null){g.return=x,T=g;break}T=x}}}var w=a.alternate;if(w!==null){var j=w.child;if(j!==null){w.child=null;do{var E=j.sibling;j.sibling=null,j=E}while(j!==null)}}T=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,T=l;else e:for(;T!==null;){if(a=T,a.flags&2048)switch(a.tag){case 0:case 11:case 15:sr(9,a,a.return)}var p=a.sibling;if(p!==null){p.return=a.return,T=p;break e}T=a.return}}var f=e.current;for(T=f;T!==null;){l=T;var h=l.child;if(l.subtreeFlags&2064&&h!==null)h.return=l,T=h;else e:for(l=f;T!==null;){if(s=T,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Jo(9,s)}}catch(y){ee(s,s.return,y)}if(s===l){T=null;break e}var b=s.sibling;if(b!==null){b.return=s.return,T=b;break e}T=s.return}}if(F=o,Wt(),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(Wo,e)}catch{}r=!0}return r}finally{$=n,$e.transition=t}}return!1}function _s(e,t,n){t=On(n,t),t=Iu(e,t,1),e=Lt(e,t,1),t=je(),e!==null&&(Ir(e,1,t),Pe(e,t))}function ee(e,t,n){if(e.tag===3)_s(e,e,n);else for(;t!==null;){if(t.tag===3){_s(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Mt===null||!Mt.has(r))){e=On(n,e),e=Ru(t,e,1),t=Lt(t,e,1),e=je(),t!==null&&(Ir(t,1,e),Pe(t,e));break}}t=t.return}}function Hp(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=je(),e.pingedLanes|=e.suspendedLanes&n,ce===e&&(fe&n)===n&&(le===4||le===3&&(fe&130023424)===fe&&500>ne()-ml?Jt(e,0):pl|=n),Pe(e,t)}function qu(e,t){t===0&&(e.mode&1?(t=Gr,Gr<<=1,!(Gr&130023424)&&(Gr=4194304)):t=1);var n=je();e=ht(e,t),e!==null&&(Ir(e,t,n),Pe(e,n))}function Qp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Gp(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(S(314))}r!==null&&r.delete(t),qu(e,n)}var ed;ed=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ce.current)Ee=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ee=!1,Dp(e,t,n);Ee=!!(e.flags&131072)}else Ee=!1,Y&&t.flags&1048576&&ou(t,To,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;mo(e,t),e=t.pendingProps;var o=Rn(t,ve.current);Tn(t,n),o=ll(null,t,r,e,o,n);var a=sl();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ze(r)?(a=!0,zo(t)):a=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,nl(t),o.updater=Xo,t.stateNode=o,o._reactInternals=t,fi(t,r,e,n),t=hi(null,t,r,!0,a,n)):(t.tag=0,Y&&a&&Ki(t),we(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(mo(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=Kp(r),e=He(r,e),o){case 0:t=mi(null,t,r,e,n);break e;case 1:t=ws(null,t,r,e,n);break e;case 11:t=ys(null,t,r,e,n);break e;case 14:t=bs(null,t,r,He(r.type,e),n);break e}throw Error(S(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:He(r,o),mi(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:He(r,o),ws(e,t,r,o,n);case 3:e:{if(Ou(t),e===null)throw Error(S(387));r=t.pendingProps,a=t.memoizedState,o=a.element,uu(e,t),Ro(t,r,null,n);var l=t.memoizedState;if(r=l.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){o=On(Error(S(423)),t),t=js(e,t,r,n,o);break e}else if(r!==o){o=On(Error(S(424)),t),t=js(e,t,r,n,o);break e}else for(Ie=Dt(t.stateNode.containerInfo.firstChild),Re=t,Y=!0,Ge=null,n=su(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Dn(),r===o){t=gt(e,t,n);break e}we(e,t,r,n)}t=t.child}return t;case 5:return du(t),e===null&&ci(t),r=t.type,o=t.pendingProps,a=e!==null?e.memoizedProps:null,l=o.children,oi(r,o)?l=null:a!==null&&oi(r,a)&&(t.flags|=32),Mu(e,t),we(e,t,l,n),t.child;case 6:return e===null&&ci(t),null;case 13:return Fu(e,t,n);case 4:return rl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ln(t,null,r,n):we(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:He(r,o),ys(e,t,r,o,n);case 7:return we(e,t,t.pendingProps,n),t.child;case 8:return we(e,t,t.pendingProps.children,n),t.child;case 12:return we(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,a=t.memoizedProps,l=o.value,W(_o,r._currentValue),r._currentValue=l,a!==null)if(Je(a.value,l)){if(a.children===o.children&&!Ce.current){t=gt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){l=a.child;for(var c=s.firstContext;c!==null;){if(c.context===r){if(a.tag===1){c=ft(-1,n&-n),c.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var m=d.pending;m===null?c.next=c:(c.next=m.next,m.next=c),d.pending=c}}a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),ui(a.return,n,t),s.lanes|=n;break}c=c.next}}else if(a.tag===10)l=a.type===t.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(S(341));l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),ui(l,n,t),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===t){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}we(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,Tn(t,n),o=Ue(o),r=r(o),t.flags|=1,we(e,t,r,n),t.child;case 14:return r=t.type,o=He(r,t.pendingProps),o=He(r.type,o),bs(e,t,r,o,n);case 15:return Du(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:He(r,o),mo(e,t),t.tag=1,ze(r)?(e=!0,zo(t)):e=!1,Tn(t,n),_u(t,r,o),fi(t,r,o,n),hi(null,t,r,!0,e,n);case 19:return Au(e,t,n);case 22:return Lu(e,t,n)}throw Error(S(156,t.tag))};function td(e,t){return zc(e,t)}function Yp(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ae(e,t,n,r){return new Yp(e,t,n,r)}function vl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Kp(e){if(typeof e=="function")return vl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Oi)return 11;if(e===Fi)return 14}return 2}function Ft(e,t){var n=e.alternate;return n===null?(n=Ae(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function xo(e,t,n,r,o,a){var l=2;if(r=e,typeof e=="function")vl(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case hn:return Zt(n.children,o,a,t);case Mi:l=8,o|=8;break;case Ma:return e=Ae(12,n,t,o|2),e.elementType=Ma,e.lanes=a,e;case Oa:return e=Ae(13,n,t,o),e.elementType=Oa,e.lanes=a,e;case Fa:return e=Ae(19,n,t,o),e.elementType=Fa,e.lanes=a,e;case dc:return qo(n,o,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cc:l=10;break e;case uc:l=9;break e;case Oi:l=11;break e;case Fi:l=14;break e;case kt:l=16,r=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=Ae(l,n,t,o),t.elementType=e,t.type=r,t.lanes=a,t}function Zt(e,t,n,r){return e=Ae(7,e,r,t),e.lanes=n,e}function qo(e,t,n,r){return e=Ae(22,e,r,t),e.elementType=dc,e.lanes=n,e.stateNode={isHidden:!1},e}function Ta(e,t,n){return e=Ae(6,e,null,t),e.lanes=n,e}function _a(e,t,n){return t=Ae(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Xp(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=da(0),this.expirationTimes=da(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=da(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function yl(e,t,n,r,o,a,l,s,c){return e=new Xp(e,t,n,s,c),t===1?(t=1,a===!0&&(t|=8)):t=0,a=Ae(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},nl(a),e}function Jp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:mn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function nd(e){if(!e)return $t;e=e._reactInternals;e:{if(ln(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ze(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var n=e.type;if(ze(n))return nu(e,n,t)}return t}function rd(e,t,n,r,o,a,l,s,c){return e=yl(n,r,!0,e,o,a,l,s,c),e.context=nd(null),n=e.current,r=je(),o=Ot(n),a=ft(r,o),a.callback=t??null,Lt(n,a,o),e.current.lanes=o,Ir(e,o,r),Pe(e,r),e}function ea(e,t,n,r){var o=t.current,a=je(),l=Ot(o);return n=nd(n),t.context===null?t.context=n:t.pendingContext=n,t=ft(a,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Lt(o,t,l),e!==null&&(Xe(e,o,l,a),uo(e,o,l)),l}function Uo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Is(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function bl(e,t){Is(e,t),(e=e.alternate)&&Is(e,t)}function Zp(){return null}var od=typeof reportError=="function"?reportError:function(e){console.error(e)};function wl(e){this._internalRoot=e}ta.prototype.render=wl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));ea(e,t,null,null)};ta.prototype.unmount=wl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;on(function(){ea(null,e,null,null)}),t[mt]=null}};function ta(e){this._internalRoot=e}ta.prototype.unstable_scheduleHydration=function(e){if(e){var t=Lc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Nt.length&&t!==0&&t<Nt[n].priority;n++);Nt.splice(n,0,e),n===0&&Oc(e)}};function jl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function na(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Rs(){}function qp(e,t,n,r,o){if(o){if(typeof r=="function"){var a=r;r=function(){var d=Uo(l);a.call(d)}}var l=rd(t,r,e,0,null,!1,!1,"",Rs);return e._reactRootContainer=l,e[mt]=l.current,yr(e.nodeType===8?e.parentNode:e),on(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var d=Uo(c);s.call(d)}}var c=yl(e,0,!1,null,null,!1,!1,"",Rs);return e._reactRootContainer=c,e[mt]=c.current,yr(e.nodeType===8?e.parentNode:e),on(function(){ea(t,c,n,r)}),c}function ra(e,t,n,r,o){var a=n._reactRootContainer;if(a){var l=a;if(typeof o=="function"){var s=o;o=function(){var c=Uo(l);s.call(c)}}ea(t,l,e,o)}else l=qp(n,t,e,o,r);return Uo(l)}Rc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=er(t.pendingLanes);n!==0&&(Ui(t,n|1),Pe(t,ne()),!(F&6)&&(Fn=ne()+500,Wt()))}break;case 13:on(function(){var r=ht(e,1);if(r!==null){var o=je();Xe(r,e,1,o)}}),bl(e,1)}};Bi=function(e){if(e.tag===13){var t=ht(e,134217728);if(t!==null){var n=je();Xe(t,e,134217728,n)}bl(e,134217728)}};Dc=function(e){if(e.tag===13){var t=Ot(e),n=ht(e,t);if(n!==null){var r=je();Xe(n,e,t,r)}bl(e,t)}};Lc=function(){return $};Mc=function(e,t){var n=$;try{return $=e,t()}finally{$=n}};Ya=function(e,t,n){switch(t){case"input":if(Ua(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Go(r);if(!o)throw Error(S(90));pc(r),Ua(r,o)}}}break;case"textarea":hc(e,n);break;case"select":t=n.value,t!=null&&En(e,!!n.multiple,t,!1)}};jc=hl;kc=on;var em={usingClientEntryPoint:!1,Events:[Dr,yn,Go,bc,wc,hl]},Xn={findFiberByHostInstance:Yt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},tm={bundleType:Xn.bundleType,version:Xn.version,rendererPackageName:Xn.rendererPackageName,rendererConfig:Xn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ec(e),e===null?null:e.stateNode},findFiberByHostInstance:Xn.findFiberByHostInstance||Zp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var oo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!oo.isDisabled&&oo.supportsFiber)try{Wo=oo.inject(tm),ot=oo}catch{}}Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=em;Le.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!jl(t))throw Error(S(200));return Jp(e,t,null,n)};Le.createRoot=function(e,t){if(!jl(e))throw Error(S(299));var n=!1,r="",o=od;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=yl(e,1,!1,null,null,n,!1,r,o),e[mt]=t.current,yr(e.nodeType===8?e.parentNode:e),new wl(t)};Le.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=Ec(t),e=e===null?null:e.stateNode,e};Le.flushSync=function(e){return on(e)};Le.hydrate=function(e,t,n){if(!na(t))throw Error(S(200));return ra(null,e,t,!0,n)};Le.hydrateRoot=function(e,t,n){if(!jl(e))throw Error(S(405));var r=n!=null&&n.hydratedSources||null,o=!1,a="",l=od;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=rd(t,null,e,1,n??null,o,!1,a,l),e[mt]=t.current,yr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new ta(t)};Le.render=function(e,t,n){if(!na(t))throw Error(S(200));return ra(null,e,t,!1,n)};Le.unmountComponentAtNode=function(e){if(!na(e))throw Error(S(40));return e._reactRootContainer?(on(function(){ra(null,null,e,!1,function(){e._reactRootContainer=null,e[mt]=null})}),!0):!1};Le.unstable_batchedUpdates=hl;Le.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!na(n))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return ra(e,t,n,!1,r)};Le.version="18.3.1-next-f1338f8080-20240426";function ad(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ad)}catch(e){console.error(e)}}ad(),ac.exports=Le;var nm=ac.exports,id,Ds=nm;id=Ds.createRoot,Ds.hydrateRoot;const rm=()=>window.location.origin,om=rm();async function am(e,t,n=null){let r=localStorage.getItem("sicot_token")||localStorage.getItem("token");console.log(`📡 ${e} ${t} - Token:`,r?"✅ Presente":"❌ No hay token"),r&&console.log(`📡 Token (primeros 20): ${r.substring(0,20)}...`);const o={"Content-Type":"application/json"};r&&(o.Authorization=`Bearer ${r}`);const a={method:e,headers:o};n&&(a.body=JSON.stringify(n));try{const l=await fetch(`${om}${t}`,a);if(l.status===401){console.warn("⚠️ Token expirado o inválido - Status 401");const c=await l.json().catch(()=>({}));throw console.warn("⚠️ Mensaje del servidor:",c),localStorage.removeItem("sicot_user"),localStorage.removeItem("sicot_token"),localStorage.removeItem("token"),localStorage.removeItem("user"),new Error(c.error||"Sesión expirada")}const s=await l.json();if(!l.ok)throw new Error(s.error||`Error ${l.status}`);return s}catch(l){throw console.error(`❌ Error en ${e} ${t}:`,l),l}}async function im(e,t){try{console.log("🔐 Intentando login para:",e);const n=await am("POST","/api/auth/login",{usuario:e,password:t});return n.token&&(localStorage.setItem("sicot_token",n.token),localStorage.setItem("token",n.token),console.log("✅ Token guardado correctamente"),console.log("✅ Token length:",n.token.length)),n}catch(n){throw console.error("❌ Error en login:",n),n}}function lm(){console.log("👋 Cerrando sesión"),localStorage.removeItem("sicot_user"),localStorage.removeItem("sicot_token"),localStorage.removeItem("token"),localStorage.removeItem("user")}const ld=v.createContext(null);function sm({children:e}){const[t,n]=v.useState(null),[r,o]=v.useState(!0);v.useEffect(()=>{try{const c=localStorage.getItem("sicot_user")||localStorage.getItem("user"),d=localStorage.getItem("sicot_token")||localStorage.getItem("token");if(c&&d){const m=JSON.parse(c);n(m),console.log("✅ Sesión restaurada:",m),localStorage.setItem("sicot_user",JSON.stringify(m)),localStorage.setItem("user",JSON.stringify(m))}else localStorage.removeItem("sicot_user"),localStorage.removeItem("user"),localStorage.removeItem("sicot_token"),localStorage.removeItem("token")}catch(c){console.error("Error restaurando sesión:",c),localStorage.clear()}o(!1)},[]);const s={user:t,loading:r,login:async(c,d)=>{try{const m=await im(c,d),u={id:m.num_control??m.id??c,nombre:m.nombre_completo,tipo:m.tipo_usuario,idPeriodo:m.id_perio??null};return localStorage.setItem("sicot_user",JSON.stringify(u)),localStorage.setItem("user",JSON.stringify(u)),console.log("✅ Login exitoso:",u),console.log("🔑 Token presente:",!!localStorage.getItem("token")),n(u),u}catch(m){throw console.error("❌ Error en login:",m),m}},logout:()=>{lm(),localStorage.removeItem("sicot_user"),localStorage.removeItem("user"),localStorage.removeItem("sicot_token"),localStorage.removeItem("token"),n(null),console.log("👋 Sesión cerrada")},isAuthenticated:!!t,isAlumno:(t==null?void 0:t.tipo)==="alumno",isAdmin:(t==null?void 0:t.tipo)==="admin"};return i.jsx(ld.Provider,{value:s,children:e})}function sn(){const e=v.useContext(ld);if(!e)throw new Error("useAuth debe usarse dentro de <AuthProvider>");return e}/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function zr(){return zr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},zr.apply(this,arguments)}var Pt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Pt||(Pt={}));const Ls="popstate";function cm(e){e===void 0&&(e={});function t(r,o){let{pathname:a,search:l,hash:s}=r.location;return Ci("",{pathname:a,search:l,hash:s},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:sd(o)}return dm(t,n,null,e)}function ae(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function kl(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function um(){return Math.random().toString(36).substr(2,8)}function Ms(e,t){return{usr:e.state,key:e.key,idx:t}}function Ci(e,t,n,r){return n===void 0&&(n=null),zr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Bn(t):t,{state:n,key:t&&t.key||r||um()})}function sd(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Bn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function dm(e,t,n,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:a=!1}=r,l=o.history,s=Pt.Pop,c=null,d=m();d==null&&(d=0,l.replaceState(zr({},l.state,{idx:d}),""));function m(){return(l.state||{idx:null}).idx}function u(){s=Pt.Pop;let E=m(),p=E==null?null:E-d;d=E,c&&c({action:s,location:j.location,delta:p})}function g(E,p){s=Pt.Push;let f=Ci(j.location,E,p);d=m()+1;let h=Ms(f,d),b=j.createHref(f);try{l.pushState(h,"",b)}catch(y){if(y instanceof DOMException&&y.name==="DataCloneError")throw y;o.location.assign(b)}a&&c&&c({action:s,location:j.location,delta:1})}function x(E,p){s=Pt.Replace;let f=Ci(j.location,E,p);d=m();let h=Ms(f,d),b=j.createHref(f);l.replaceState(h,"",b),a&&c&&c({action:s,location:j.location,delta:0})}function w(E){let p=o.location.origin!=="null"?o.location.origin:o.location.href,f=typeof E=="string"?E:sd(E);return f=f.replace(/ $/,"%20"),ae(p,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,p)}let j={get action(){return s},get location(){return e(o,l)},listen(E){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Ls,u),c=E,()=>{o.removeEventListener(Ls,u),c=null}},createHref(E){return t(o,E)},createURL:w,encodeLocation(E){let p=w(E);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:g,replace:x,go(E){return l.go(E)}};return j}var Os;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Os||(Os={}));function fm(e,t,n){return n===void 0&&(n="/"),pm(e,t,n)}function pm(e,t,n,r){let o=typeof t=="string"?Bn(t):t,a=dd(o.pathname||"/",n);if(a==null)return null;let l=cd(e);mm(l);let s=null;for(let c=0;s==null&&c<l.length;++c){let d=Em(a);s=km(l[c],d)}return s}function cd(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let o=(a,l,s)=>{let c={relativePath:s===void 0?a.path||"":s,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};c.relativePath.startsWith("/")&&(ae(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let d=qt([r,c.relativePath]),m=n.concat(c);a.children&&a.children.length>0&&(ae(a.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),cd(a.children,t,m,d)),!(a.path==null&&!a.index)&&t.push({path:d,score:wm(d,a.index),routesMeta:m})};return e.forEach((a,l)=>{var s;if(a.path===""||!((s=a.path)!=null&&s.includes("?")))o(a,l);else for(let c of ud(a.path))o(a,l,c)}),t}function ud(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),a=n.replace(/\?$/,"");if(r.length===0)return o?[a,""]:[a];let l=ud(r.join("/")),s=[];return s.push(...l.map(c=>c===""?a:[a,c].join("/"))),o&&s.push(...l),s.map(c=>e.startsWith("/")&&c===""?"/":c)}function mm(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:jm(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const hm=/^:[\w-]+$/,gm=3,xm=2,vm=1,ym=10,bm=-2,Fs=e=>e==="*";function wm(e,t){let n=e.split("/"),r=n.length;return n.some(Fs)&&(r+=bm),t&&(r+=xm),n.filter(o=>!Fs(o)).reduce((o,a)=>o+(hm.test(a)?gm:a===""?vm:ym),r)}function jm(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function km(e,t,n){let{routesMeta:r}=e,o={},a="/",l=[];for(let s=0;s<r.length;++s){let c=r[s],d=s===r.length-1,m=a==="/"?t:t.slice(a.length)||"/",u=Sm({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},m),g=c.route;if(!u)return null;Object.assign(o,u.params),l.push({params:o,pathname:qt([a,u.pathname]),pathnameBase:_m(qt([a,u.pathnameBase])),route:g}),u.pathnameBase!=="/"&&(a=qt([a,u.pathnameBase]))}return l}function Sm(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Nm(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let a=o[0],l=a.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((d,m,u)=>{let{paramName:g,isOptional:x}=m;if(g==="*"){let j=s[u]||"";l=a.slice(0,a.length-j.length).replace(/(.)\/+$/,"$1")}const w=s[u];return x&&!w?d[g]=void 0:d[g]=(w||"").replace(/%2F/g,"/"),d},{}),pathname:a,pathnameBase:l,pattern:e}}function Nm(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),kl(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,s,c)=>(r.push({paramName:s,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function Em(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return kl(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function dd(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Cm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,zm=e=>Cm.test(e);function Pm(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Bn(e):e,a;if(n)if(zm(n))a=n;else{if(n.includes("//")){let l=n;n=n.replace(/\/\/+/g,"/"),kl(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+n))}n.startsWith("/")?a=As(n.substring(1),"/"):a=As(n,t)}else a=t;return{pathname:a,search:Im(r),hash:Rm(o)}}function As(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function Ia(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Tm(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function fd(e,t){let n=Tm(e);return t?n.map((r,o)=>o===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function pd(e,t,n,r){r===void 0&&(r=!1);let o;typeof e=="string"?o=Bn(e):(o=zr({},e),ae(!o.pathname||!o.pathname.includes("?"),Ia("?","pathname","search",o)),ae(!o.pathname||!o.pathname.includes("#"),Ia("#","pathname","hash",o)),ae(!o.search||!o.search.includes("#"),Ia("#","search","hash",o)));let a=e===""||o.pathname==="",l=a?"/":o.pathname,s;if(l==null)s=n;else{let u=t.length-1;if(!r&&l.startsWith("..")){let g=l.split("/");for(;g[0]==="..";)g.shift(),u-=1;o.pathname=g.join("/")}s=u>=0?t[u]:"/"}let c=Pm(o,s),d=l&&l!=="/"&&l.endsWith("/"),m=(a||l===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||m)&&(c.pathname+="/"),c}const qt=e=>e.join("/").replace(/\/\/+/g,"/"),_m=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Im=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Rm=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Dm(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const md=["post","put","patch","delete"];new Set(md);const Lm=["get",...md];new Set(Lm);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Pr(){return Pr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Pr.apply(this,arguments)}const Sl=v.createContext(null),Mm=v.createContext(null),Mr=v.createContext(null),oa=v.createContext(null),Vt=v.createContext({outlet:null,matches:[],isDataRoute:!1}),hd=v.createContext(null);function Or(){return v.useContext(oa)!=null}function Fr(){return Or()||ae(!1),v.useContext(oa).location}function gd(e){v.useContext(Mr).static||v.useLayoutEffect(e)}function cn(){let{isDataRoute:e}=v.useContext(Vt);return e?Km():Om()}function Om(){Or()||ae(!1);let e=v.useContext(Sl),{basename:t,future:n,navigator:r}=v.useContext(Mr),{matches:o}=v.useContext(Vt),{pathname:a}=Fr(),l=JSON.stringify(fd(o,n.v7_relativeSplatPath)),s=v.useRef(!1);return gd(()=>{s.current=!0}),v.useCallback(function(d,m){if(m===void 0&&(m={}),!s.current)return;if(typeof d=="number"){r.go(d);return}let u=pd(d,JSON.parse(l),a,m.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:qt([t,u.pathname])),(m.replace?r.replace:r.push)(u,m.state,m)},[t,r,l,a,e])}function xd(){let{matches:e}=v.useContext(Vt),t=e[e.length-1];return t?t.params:{}}function Fm(e,t){return Am(e,t)}function Am(e,t,n,r){Or()||ae(!1);let{navigator:o}=v.useContext(Mr),{matches:a}=v.useContext(Vt),l=a[a.length-1],s=l?l.params:{};l&&l.pathname;let c=l?l.pathnameBase:"/";l&&l.route;let d=Fr(),m;if(t){var u;let E=typeof t=="string"?Bn(t):t;c==="/"||(u=E.pathname)!=null&&u.startsWith(c)||ae(!1),m=E}else m=d;let g=m.pathname||"/",x=g;if(c!=="/"){let E=c.replace(/^\//,"").split("/");x="/"+g.replace(/^\//,"").split("/").slice(E.length).join("/")}let w=fm(e,{pathname:x}),j=Vm(w&&w.map(E=>Object.assign({},E,{params:Object.assign({},s,E.params),pathname:qt([c,o.encodeLocation?o.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?c:qt([c,o.encodeLocation?o.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),a,n,r);return t&&j?v.createElement(oa.Provider,{value:{location:Pr({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:Pt.Pop}},j):j}function $m(){let e=Ym(),t=Dm(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),n?v.createElement("pre",{style:o},n):null,null)}const Um=v.createElement($m,null);class Bm extends v.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?v.createElement(Vt.Provider,{value:this.props.routeContext},v.createElement(hd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Wm(e){let{routeContext:t,match:n,children:r}=e,o=v.useContext(Sl);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),v.createElement(Vt.Provider,{value:t},r)}function Vm(e,t,n,r){var o;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var a;if(!n)return null;if(n.errors)e=n.matches;else if((a=r)!=null&&a.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let l=e,s=(o=n)==null?void 0:o.errors;if(s!=null){let m=l.findIndex(u=>u.route.id&&(s==null?void 0:s[u.route.id])!==void 0);m>=0||ae(!1),l=l.slice(0,Math.min(l.length,m+1))}let c=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<l.length;m++){let u=l[m];if((u.route.HydrateFallback||u.route.hydrateFallbackElement)&&(d=m),u.route.id){let{loaderData:g,errors:x}=n,w=u.route.loader&&g[u.route.id]===void 0&&(!x||x[u.route.id]===void 0);if(u.route.lazy||w){c=!0,d>=0?l=l.slice(0,d+1):l=[l[0]];break}}}return l.reduceRight((m,u,g)=>{let x,w=!1,j=null,E=null;n&&(x=s&&u.route.id?s[u.route.id]:void 0,j=u.route.errorElement||Um,c&&(d<0&&g===0?(Xm("route-fallback"),w=!0,E=null):d===g&&(w=!0,E=u.route.hydrateFallbackElement||null)));let p=t.concat(l.slice(0,g+1)),f=()=>{let h;return x?h=j:w?h=E:u.route.Component?h=v.createElement(u.route.Component,null):u.route.element?h=u.route.element:h=m,v.createElement(Wm,{match:u,routeContext:{outlet:m,matches:p,isDataRoute:n!=null},children:h})};return n&&(u.route.ErrorBoundary||u.route.errorElement||g===0)?v.createElement(Bm,{location:n.location,revalidation:n.revalidation,component:j,error:x,children:f(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):f()},null)}var vd=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(vd||{}),yd=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(yd||{});function Hm(e){let t=v.useContext(Sl);return t||ae(!1),t}function Qm(e){let t=v.useContext(Mm);return t||ae(!1),t}function Gm(e){let t=v.useContext(Vt);return t||ae(!1),t}function bd(e){let t=Gm(),n=t.matches[t.matches.length-1];return n.route.id||ae(!1),n.route.id}function Ym(){var e;let t=v.useContext(hd),n=Qm(),r=bd();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Km(){let{router:e}=Hm(vd.UseNavigateStable),t=bd(yd.UseNavigateStable),n=v.useRef(!1);return gd(()=>{n.current=!0}),v.useCallback(function(o,a){a===void 0&&(a={}),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,Pr({fromRouteId:t},a)))},[e,t])}const $s={};function Xm(e,t,n){$s[e]||($s[e]=!0)}function Jm(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Tr(e){let{to:t,replace:n,state:r,relative:o}=e;Or()||ae(!1);let{future:a,static:l}=v.useContext(Mr),{matches:s}=v.useContext(Vt),{pathname:c}=Fr(),d=cn(),m=pd(t,fd(s,a.v7_relativeSplatPath),c,o==="path"),u=JSON.stringify(m);return v.useEffect(()=>d(JSON.parse(u),{replace:n,state:r,relative:o}),[d,u,o,n,r]),null}function lt(e){ae(!1)}function Zm(e){let{basename:t="/",children:n=null,location:r,navigationType:o=Pt.Pop,navigator:a,static:l=!1,future:s}=e;Or()&&ae(!1);let c=t.replace(/^\/*/,"/"),d=v.useMemo(()=>({basename:c,navigator:a,static:l,future:Pr({v7_relativeSplatPath:!1},s)}),[c,s,a,l]);typeof r=="string"&&(r=Bn(r));let{pathname:m="/",search:u="",hash:g="",state:x=null,key:w="default"}=r,j=v.useMemo(()=>{let E=dd(m,c);return E==null?null:{location:{pathname:E,search:u,hash:g,state:x,key:w},navigationType:o}},[c,m,u,g,x,w,o]);return j==null?null:v.createElement(Mr.Provider,{value:d},v.createElement(oa.Provider,{children:n,value:j}))}function qm(e){let{children:t,location:n}=e;return Fm(zi(t),n)}new Promise(()=>{});function zi(e,t){t===void 0&&(t=[]);let n=[];return v.Children.forEach(e,(r,o)=>{if(!v.isValidElement(r))return;let a=[...t,o];if(r.type===v.Fragment){n.push.apply(n,zi(r.props.children,a));return}r.type!==lt&&ae(!1),!r.props.index||!r.props.children||ae(!1);let l={id:r.props.id||a.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(l.children=zi(r.props.children,a)),n.push(l)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const eh="6";try{window.__reactRouterVersion=eh}catch{}const th="startTransition",Us=Vd[th];function nh(e){let{basename:t,children:n,future:r,window:o}=e,a=v.useRef();a.current==null&&(a.current=cm({window:o,v5Compat:!0}));let l=a.current,[s,c]=v.useState({action:l.action,location:l.location}),{v7_startTransition:d}=r||{},m=v.useCallback(u=>{d&&Us?Us(()=>c(u)):c(u)},[c,d]);return v.useLayoutEffect(()=>l.listen(m),[l,m]),v.useEffect(()=>Jm(r),[r]),v.createElement(Zm,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:l,future:r})}var Bs;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Bs||(Bs={}));var Ws;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Ws||(Ws={}));const wt={logoITSSNP:"/assets/logo-itssnp2.png",logoTECNM:"/assets/logo-tecnm.png",iconUser:"/assets/icon-user.png",iconLock:"/assets/icon-lock.png",iconEye:"/assets/icon-eye.png",iconEyeOff:"/assets/icon-eye-off.png"};function rh(){const e=cn(),{login:t}=sn(),[n,r]=v.useState(""),[o,a]=v.useState(""),[l,s]=v.useState(""),[c,d]=v.useState(!1),[m,u]=v.useState(!1),[g,x]=v.useState(!1),[w,j]=v.useState(!1),E=async p=>{if(p.preventDefault(),!n.trim()||!o){s("Por favor completa todos los campos.");return}s(""),d(!0);try{const f=await t(n.trim(),o);e(f.tipo==="admin"?"/dashboard":"/panel-alumno",{replace:!0})}catch(f){s(f.message||"Credenciales incorrectas. Intenta de nuevo.")}finally{d(!1)}};return i.jsxs(i.Fragment,{children:[i.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),i.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),i.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap",rel:"stylesheet"}),i.jsx("style",{children:`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shake {
          10%,90%{transform:translateX(-3px)}
          30%,70%{transform:translateX(-5px)}
          50%    {transform:translateX(5px)}
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 55% 45%;
        }

        .lp-brand {
          background: linear-gradient(155deg, #0b1f4a 0%, #1648b8 60%, #0b7ec9 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 48px 40px; gap: 32px;
          position: relative; overflow: hidden;
        }
        .lp-brand::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .lp-logos {
          display: flex; align-items: center; gap: 32px;
          position: relative; z-index: 2;
        }
        .lp-logo-container {
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.95);
          border-radius: 16px;
          padding: 16px 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .lp-logo {
          height: 70px; width: auto; object-fit: contain;
          transition: transform 0.2s ease;
        }
        .lp-logo:hover { transform: scale(1.05); }
        .lp-divider {
          width: 2px; height: 50px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
        }

        .lp-brand-text { text-align: center; position: relative; z-index: 2; }
        .lp-inst {
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8);
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px;
        }
        .lp-title {
          font-size: clamp(24px, 3vw, 34px); font-weight: 800;
          color: #fff; line-height: 1.25;
        }
        .lp-title span { color: #7dd3fc; font-weight: 800; }

        .lp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; padding: 8px 20px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.95); margin-top: 16px;
        }

        .lp-form-side {
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          padding: 40px clamp(24px, 5vw, 64px);
        }
        .lp-card {
          width: 100%; max-width: 400px;
          animation: fadeUp 0.45s ease both;
        }
        .lp-card-title { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
        .lp-card-sub   { font-size: 14px; color: #64748b; margin-bottom: 32px; line-height: 1.6; }

        .lp-field  { margin-bottom: 22px; }
        .lp-label  { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; }
        .lp-input-wrap { position: relative; }

        .lp-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .lp-input-icon img {
          width: 100%; height: 100%; object-fit: contain;
          opacity: 0.5; filter: brightness(0);
        }

        .lp-input {
          width: 100%; padding: 14px 16px 14px 48px;
          border: 1.5px solid #e2e8f0; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; color: #0f172a;
          background: #f8fafc; outline: none; transition: all 0.2s ease;
        }
        .lp-input:focus {
          border-color: #2563eb; background: #fff;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.12);
        }
        .lp-input.with-padding { padding-right: 48px; }

        .lp-eye-btn {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          width: 24px; height: 24px; padding: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0.5; transition: opacity 0.15s;
        }
        .lp-eye-btn:hover { opacity: 0.9; }
        .lp-eye-btn img { width: 100%; height: 100%; object-fit: contain; filter: brightness(0); }

        .lp-error {
          display: flex; align-items: center; gap: 10px;
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px;
          padding: 14px 16px; margin-bottom: 24px;
          font-size: 14px; font-weight: 500; color: #dc2626;
          animation: shake 0.4s ease;
        }

        .lp-btn {
          width: 100%; padding: 16px;
          background: linear-gradient(135deg, #1648b8, #2563eb);
          border: none; border-radius: 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 700; color: #fff; letter-spacing: 0.3px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 18px rgba(37,99,235,0.35);
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .lp-btn:hover:not(:disabled) {
          opacity: 0.95; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.45);
        }
        .lp-btn:active:not(:disabled) { transform: translateY(0); }
        .lp-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .lp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .lp-footer { margin-top: 32px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; }

        .lp-mobile-logos { display: none; }

        @media (max-width: 800px) {
          .lp-root {
            grid-template-columns: 1fr;
            background: linear-gradient(155deg,#0b1f4a,#1648b8 60%,#0b7ec9);
          }
          .lp-brand { display: none; }
          .lp-form-side {
            background: transparent; padding: 24px 20px;
            align-items: flex-start; padding-top: 40px;
          }
          .lp-card {
            background: #fff; border-radius: 24px;
            padding: 36px 28px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .lp-mobile-logos {
            display: flex; align-items: center;
            justify-content: center; gap: 24px; margin-bottom: 32px;
          }
          .lp-mobile-logo {
            background: #fff; border-radius: 12px;
            padding: 12px 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .lp-mobile-logo img { height: 40px; width: auto; object-fit: contain; }
          .lp-mobile-divider {
            width: 2px; height: 40px;
            background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
          }
        }
      `}),i.jsxs("div",{className:"lp-root",children:[i.jsxs("div",{className:"lp-brand",children:[i.jsxs("div",{className:"lp-logos",children:[i.jsx("div",{className:"lp-logo-container",children:g?i.jsx("span",{style:{fontSize:"40px"},children:"🏫"}):i.jsx("img",{src:wt.logoITSSNP,alt:"ITSSNP",className:"lp-logo",onError:()=>x(!0)})}),i.jsx("div",{className:"lp-divider"}),i.jsx("div",{className:"lp-logo-container",children:w?i.jsx("span",{style:{fontSize:"40px"},children:"🎓"}):i.jsx("img",{src:wt.logoTECNM,alt:"TecNM",className:"lp-logo",onError:()=>j(!0)})})]}),i.jsxs("div",{className:"lp-brand-text",children:[i.jsx("p",{className:"lp-inst",children:"ITSSNP — TecNM"}),i.jsxs("h1",{className:"lp-title",children:["Sistema de",i.jsx("br",{}),i.jsx("span",{children:"Evaluación Docente"})]})]}),i.jsxs("div",{className:"lp-badge",children:[i.jsx("span",{children:"📋"})," SICOT — Periodo ENE-JUN/26"]})]}),i.jsx("div",{className:"lp-form-side",children:i.jsxs("div",{className:"lp-card",children:[i.jsxs("div",{className:"lp-mobile-logos",children:[i.jsx("div",{className:"lp-mobile-logo",children:g?i.jsx("span",{style:{fontSize:"32px"},children:"🏫"}):i.jsx("img",{src:wt.logoITSSNP,alt:"ITSSNP",onError:()=>x(!0)})}),i.jsx("div",{className:"lp-mobile-divider"}),i.jsx("div",{className:"lp-mobile-logo",children:w?i.jsx("span",{style:{fontSize:"32px"},children:"🎓"}):i.jsx("img",{src:wt.logoTECNM,alt:"TecNM",onError:()=>j(!0)})})]}),i.jsx("h2",{className:"lp-card-title",children:"Iniciar sesión"}),i.jsx("p",{className:"lp-card-sub",children:"Ingresa tu número de control o usuario administrador para acceder al sistema"}),l&&i.jsxs("div",{className:"lp-error",children:[i.jsx("span",{children:"⚠️"}),i.jsx("span",{children:l})]}),i.jsxs("form",{onSubmit:E,noValidate:!0,children:[i.jsxs("div",{className:"lp-field",children:[i.jsx("label",{className:"lp-label",children:"Usuario / No. de control"}),i.jsxs("div",{className:"lp-input-wrap",children:[i.jsx("span",{className:"lp-input-icon",children:i.jsx("img",{src:wt.iconUser,alt:""})}),i.jsx("input",{className:"lp-input",type:"text",placeholder:"Ej: 22120015, 22100058",value:n,onChange:p=>{r(p.target.value),s("")},autoComplete:"username",autoFocus:!0,disabled:c})]})]}),i.jsxs("div",{className:"lp-field",children:[i.jsx("label",{className:"lp-label",children:"Contraseña"}),i.jsxs("div",{className:"lp-input-wrap",children:[i.jsx("span",{className:"lp-input-icon",children:i.jsx("img",{src:wt.iconLock,alt:""})}),i.jsx("input",{className:"lp-input with-padding",type:m?"text":"password",placeholder:"Tu contraseña SICOT",value:o,onChange:p=>{a(p.target.value),s("")},autoComplete:"current-password",disabled:c}),i.jsx("button",{type:"button",className:"lp-eye-btn",onClick:()=>u(p=>!p),tabIndex:-1,children:i.jsx("img",{src:m?wt.iconEyeOff:wt.iconEye,alt:m?"ocultar":"mostrar"})})]})]}),i.jsx("button",{type:"submit",className:"lp-btn",disabled:c,children:c?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"lp-spinner"}),i.jsx("span",{children:"Verificando…"})]}):"Ingresar al sistema →"})]}),i.jsxs("p",{className:"lp-footer",children:["Instituto Tecnológico Superior de la Sierra Norte de Puebla · TecNM",i.jsx("br",{}),"¿Problemas para acceder? Contacta a Control Escolar"]})]})})]})]})}const Ze=window.location.origin;console.log("📡 API Base URL:",Ze);function Ar(){return localStorage.getItem("token")}function it(){return{Authorization:`Bearer ${Ar()}`,"Content-Type":"application/json"}}const oh=[{id:1,nombre:"Detección y diagnóstico oportuno de necesidades"},{id:2,nombre:"Monitoreo del rendimiento académico"},{id:3,nombre:"Seguimiento y retroalimentación continua"},{id:4,nombre:"Comunicación y relación con los tutorados"},{id:5,nombre:"Compromiso y responsabilidad"},{id:6,nombre:"Capacidad para motivar y acompañar en el desarrollo personal y profesional"},{id:7,nombre:"Impacto en la reducción de reprobación y deserción"},{id:8,nombre:"Aplicación de estrategias de rescate académico"},{id:9,nombre:"Satisfacción general del tutor o la tutora"}],ah={1:{5:"Detectó completamente mis necesidades y ofreció un apoyo excelente.",4:"Detectó bien mis necesidades y ofreció un apoyo adecuado.",3:"Detectó mis necesidades de forma general y ofreció apoyo limitado.",2:"Detectó algunas de mis necesidades, pero no ofreció apoyo adecuado.",1:"No detectó mis necesidades ni ofreció apoyo."},2:{5:"Realizó un seguimiento constante y me brindó apoyo eficaz en todo momento.",4:"Realizó un buen seguimiento y me apoyó en las materias problemáticas.",3:"Realizó seguimiento regular pero no siempre me apoyó en mis problemáticas.",2:"Hizo un seguimiento ocasional pero no constante.",1:"Nunca realizó seguimiento de mi desempeño."},3:{5:"Siempre hizo un seguimiento constante y su retroalimentación fue muy valiosa.",4:"Hizo un buen seguimiento y me dio retroalimentación útil.",3:"Hizo un seguimiento irregular con retroalimentación limitada.",2:"Hizo un seguimiento mínimo y su retroalimentación fue escasa.",1:"Nunca hizo seguimiento ni dio retroalimentación."},4:{5:"La comunicación fue excelente y siempre me sentí en confianza.",4:"La comunicación fue buena y generó confianza en muchas ocasiones.",3:"La comunicación fue irregular, aunque a veces me sentí en confianza.",2:"La comunicación fue escasa y no generó confianza.",1:"No hubo comunicación ni confianza."},5:{5:"Siempre asistió y demostró un alto nivel de compromiso con mi desarrollo.",4:"Asistió a las sesiones y demostró un buen nivel de compromiso.",3:"Asistió a la mayoría de las sesiones, pero su compromiso fue irregular.",2:"Asistió a pocas sesiones y su compromiso fue mínimo.",1:"No asistió ni mostró compromiso."},6:{5:"Me motivó siempre y me dio una excelente orientación para mi desarrollo.",4:"Me motivó constantemente y me ofreció una buena orientación.",3:"Me motivó algunas veces y la orientación fue general.",2:"Me motivó de manera limitada y no me brindó mucha orientación.",1:"No me motivó ni me ofreció orientación."},7:{5:"Su impacto fue muy positivo, ayudándome a evitar la reprobación y el abandono.",4:"Su impacto fue positivo y me ayudó a mejorar mi rendimiento.",3:"Su impacto fue moderado, pero no evitó todas las dificultades.",2:"Tuvo un impacto muy limitado en mi desempeño.",1:"No tuvo ningún impacto positivo."},8:{5:"Aplicó estrategias excelentes y me ayudó a superar todas mis dificultades.",4:"Aplicó buenas estrategias y me ayudó a superar algunas dificultades.",3:"Aplicó algunas estrategias, pero no siempre resultaron efectivas.",2:"Aplicó estrategias mínimas o ineficaces.",1:"No aplicó ninguna estrategia de rescate."},9:{5:"Muy alta satisfacción con el acompañamiento de mi tutor(a).",4:"Alta satisfacción con el acompañamiento de mi tutor(a).",3:"Satisfacción regular con el acompañamiento de mi tutor(a).",2:"Baja satisfacción con el acompañamiento de mi tutor(a).",1:"Muy baja satisfacción con el acompañamiento de mi tutor(a)."}},Ye=oh,ih=ah;async function wd(){try{const e=await fetch(`${Ze}/api/alumno/perfil`,{headers:it()});if(!e.ok){const n=await e.json();throw new Error(n.error||"Error al obtener perfil")}return await e.json()}catch(e){throw console.error("❌ Error en getPerfilAlumnoAPI:",e),e}}async function lh(){try{const e=await fetch(`${Ze}/api/alumno/evaluaciones`,{headers:it()});if(!e.ok){const n=await e.json();throw new Error(n.error||"Error al obtener evaluaciones")}return await e.json()}catch(e){throw console.error("❌ Error en getEvaluacionesAlumnoAPI:",e),e}}async function sh(){try{const e=await fetch(`${Ze}/api/encuesta/preguntas`,{headers:it()});if(!e.ok){const n=await e.json();throw new Error(n.error||"Error al obtener preguntas")}return await e.json()}catch(e){throw console.error("❌ Error en getPreguntasAPI:",e),e}}async function ch(e,t){try{console.log("🚀 Iniciando evaluación con tutor:",e,"grupo:",t);const n=await fetch(`${Ze}/api/evaluacion/iniciar`,{method:"POST",headers:it(),body:JSON.stringify({idTutor:e,idGrupo:t})}),r=await n.json();if(!n.ok)throw new Error(r.error||"Error al iniciar evaluación");return r}catch(n){throw console.error("❌ Error en iniciarEvaluacionAPI:",n),n}}async function Vs(e,t){try{console.log("💾 Guardando respuestas:",{idEvaluacion:e,respuestas:t==null?void 0:t.length});const n=await fetch(`${Ze}/api/evaluacion/responder`,{method:"POST",headers:it(),body:JSON.stringify({idEvaluacion:e,respuestas:t})}),r=await n.json();if(console.log("📡 Respuesta del servidor:",r),!n.ok)throw new Error(r.error||"Error al guardar respuestas");return r}catch(n){throw console.error("❌ Error en guardarRespuestasAPI:",n),n}}async function uh(e,t,n){try{const r=String(n).trim();if(console.log("💬 Guardando comentario:",{idEvaluacion:e,idDocente:t,texto:r}),!r)throw new Error("El comentario no puede estar vacío");if(r.length<10)throw new Error("El comentario debe tener al menos 10 caracteres.");if(r.length>1e3)throw new Error("El comentario no puede superar los 1000 caracteres.");const o=await fetch(`${Ze}/api/evaluacion/comentario`,{method:"POST",headers:it(),body:JSON.stringify({idEvaluacion:e,idDocente:t,comentario:r})}),a=await o.json();if(!o.ok)throw new Error(a.error||"Error al guardar el comentario");return console.log("✅ Comentario guardado correctamente:",a),a}catch(r){throw console.error("❌ Error en guardarComentarioAPI:",r),r}}async function Hs(){var e;try{if(!Ar())throw new Error("No hay token de autenticación");const n=await fetch(`${Ze}/api/dashboard/docentes`,{headers:it()});if(n.status===401)throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.error||"Error al obtener docentes")}const r=await n.json();return console.log("✅ Docentes cargados:",((e=r.docentes)==null?void 0:e.length)||0),r.docentes||[]}catch(t){throw console.error("❌ Error en getDocentesAPI:",t),t}}async function Qs(){var e;try{if(!Ar())throw new Error("No hay token de autenticación");const n=await fetch(`${Ze}/api/dashboard/periodos`,{headers:it()});if(n.status===401)throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.error||"Error al obtener periodos")}const r=await n.json();return console.log("✅ Periodos cargados:",((e=r.periodos)==null?void 0:e.length)||0),r.periodos||[]}catch(t){throw console.error("❌ Error en getPeriodosAPI:",t),t}}async function dh(e,t){var n;try{if(!Ar())throw new Error("No hay token de autenticación");const o=await fetch(`${Ze}/api/dashboard/docentes/${e}/periodos/${t}/grupos`,{headers:it()});if(o.status===401)throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");if(!o.ok){const l=await o.json().catch(()=>({}));throw new Error(l.error||"Error al obtener grupos")}const a=await o.json();return console.log("✅ Grupos cargados:",((n=a.grupos)==null?void 0:n.length)||0),a.grupos||[]}catch(r){throw console.error("❌ Error en getGruposAPI:",r),r}}async function Gs(e,t,n=null){try{if(!Ar())throw new Error("No hay token de autenticación");let o=`${Ze}/api/dashboard/resultados?idDocente=${e}&idPeriodo=${t}`;n&&(o+=`&idGrupo=${n}`);const a=await fetch(o,{headers:it()});if(a.status===401)throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");if(!a.ok){const s=await a.json().catch(()=>({}));throw new Error(s.error||"Error al obtener resultados")}const l=await a.json();return console.log("✅ Resultados cargados para docente:",e),{...l,completaron:(l.completaron||[]).map(s=>({...s,grupo:s.grupo||s.grupo_clave||""})),faltantes:(l.faltantes||[]).map(s=>({...s,grupo:s.grupo||s.grupo_clave||""}))}}catch(r){throw console.error("❌ Error en getResultadosDocenteAPI:",r),r}}const jt={logoITSSNP:"https://i.postimg.cc/YhqbKr76/logo-itssnp.png",logoITSSNP2:"https://i.postimg.cc/Xp7QSjW9/logo-itssnp2.png",logoTECNM:"https://i.postimg.cc/ykYv41K5/logo-tecnm.png",logoTECNM2:"https://i.postimg.cc/QHx0G8Dz/logo-tecnm2.png",iconUser:"https://i.postimg.cc/hh0p5Jkx/icon-user.png",iconCalendar:"https://i.postimg.cc/9fZ7qW8y/icon-calendar.png"};function fh(){const e=cn(),{user:t,logout:n}=sn(),[r,o]=v.useState(null),[a,l]=v.useState([]),[s,c]=v.useState(!0),[d,m]=v.useState(0),[u,g]=v.useState("docentes"),[x,w]=v.useState(!1),[j,E]=v.useState(!1),p=O=>a.some(q=>q.idTutor===O&&q.completada===!0),f=(O,q)=>{if(!O||!q)return!1;const te=new Date,be=new Date(O),P=new Date(q);return te>=be&&te<=P},h=O=>O?new Date(O).toLocaleDateString("es-MX",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}):"";v.useEffect(()=>{if(!t)return;(async()=>{c(!0);try{console.log("🔍 Cargando perfil del alumno...");const q=await wd();o(q),console.log("✅ Perfil cargado:",q);const te=await lh();l(te.evaluaciones||[]),console.log("✅ Datos cargados:",{perfil:q,evaluaciones:te})}catch(q){console.error("❌ Error cargando datos:",q)}finally{c(!1)}})()},[t,d]),v.useEffect(()=>{const O=()=>m(q=>q+1);return window.addEventListener("focus",O),()=>window.removeEventListener("focus",O)},[]);const b=(r==null?void 0:r.tutor)||null,y=(r==null?void 0:r.docentes)||[],k=(r==null?void 0:r.configuracion)||{},C=(r==null?void 0:r.periodo)||"",z=b?p(b.id):!1,D=y.filter(O=>p(O.id)).length,I=y.length,G=b?f(k.fechaInicioTutor,k.fechaFinTutor):!1,ye=f(k.fechaInicioDocente,k.fechaFinDocente),ue=k.tutorActivo&&b&&G||k.docenteActivo&&y.length>0&&ye;return s?i.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%)"},children:[i.jsxs("div",{style:{textAlign:"center",background:"#fff",padding:"40px",borderRadius:"20px",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"},children:[i.jsx("div",{style:{width:"50px",height:"50px",border:"5px solid #e2e8f0",borderTop:"5px solid #2563eb",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 20px"}}),i.jsx("p",{style:{fontSize:"16px",color:"#0f172a",fontWeight:500},children:"Cargando tus evaluaciones..."})]}),i.jsx("style",{children:"@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"})]}):i.jsxs(i.Fragment,{children:[i.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),i.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),i.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap",rel:"stylesheet"}),i.jsx("style",{children:`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        @keyframes fadeUp { 
          from { opacity:0; transform:translateY(20px); } 
          to { opacity:1; transform:translateY(0); } 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        @keyframes barFill {
          from { width: 0; }
          to { width: var(--pct); }
        }

        .pa-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: #f8fafc;
          display: flex; flex-direction: column;
        }

        .pa-nav {
          background: linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%);
          height: 80px; 
          padding: 0 clamp(16px,4vw,48px);
          display: flex; 
          align-items: center; 
          justify-content: space-between;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          position: sticky; 
          top: 0; 
          z-index: 10;
        }
        .pa-nav-brand {
          display: flex; 
          align-items: center; 
          gap: 24px;
        }
        .pa-nav-logos {
          display: flex; 
          align-items: center; 
          gap: 20px;
        }
        .pa-nav-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
          filter: brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          transition: transform 0.2s ease;
        }
        .pa-nav-logo:hover {
          transform: scale(1.05);
        }
        .pa-nav-divider {
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
        }
        .pa-nav-title {
          font-size: 16px; 
          font-weight: 600; 
          color: rgba(255,255,255,0.95);
          letter-spacing: 0.3px;
          border-left: 2px solid rgba(255,255,255,0.3);
          padding-left: 20px;
        }
        .pa-nav-user-section {
          display: flex; 
          align-items: center; 
          gap: 16px;
        }
        .pa-nav-user-info {
          display: flex; 
          align-items: center; 
          gap: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; 
          padding: 8px 20px 8px 16px;
        }
        .pa-nav-user-icon {
          width: 18px; 
          height: 18px;
          opacity: 0.8;
          filter: brightness(0) invert(1);
        }
        .pa-nav-user-name {
          font-size: 14px; 
          font-weight: 500; 
          color: #fff;
        }
        .pa-btn-logout {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; 
          padding: 8px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; 
          font-weight: 600; 
          color: #fff;
          cursor: pointer; 
          transition: all 0.2s;
        }
        .pa-btn-logout:hover {
          background: rgba(255,255,255,0.24);
          transform: translateY(-1px);
        }

        .pa-body {
          flex: 1;
          padding: clamp(24px,4vw,48px) clamp(16px,4vw,48px);
          max-width: 1200px; 
          width: 100%; 
          margin: 0 auto;
          display: flex; 
          flex-direction: column; 
          gap: 24px;
        }

        .pa-hero {
          background: linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%);
          border-radius: 24px; 
          padding: 32px 36px;
          position: relative; 
          overflow: hidden;
          animation: fadeUp 0.45s ease both;
          box-shadow: 0 20px 40px rgba(11,31,74,0.25);
        }
        .pa-hero::before {
          content: '';
          position: absolute; 
          inset: 0;
          background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .pa-hero-content {
          position: relative; 
          z-index: 1;
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          flex-wrap: wrap; 
          gap: 24px;
        }
        .pa-hero-info h1 {
          font-size: clamp(24px, 3vw, 32px); 
          font-weight: 800; 
          color: #fff;
          line-height: 1.2; 
          margin-bottom: 12px;
        }
        .pa-hero-badges {
          display: flex; 
          flex-wrap: wrap; 
          gap: 10px;
        }
        .pa-hero-badge {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; 
          padding: 8px 18px;
          font-size: 13px; 
          font-weight: 500; 
          color: rgba(255,255,255,0.95);
        }
        .pa-hero-stats {
          background: rgba(255,255,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.20);
          border-radius: 18px; 
          padding: 20px 28px;
          text-align: center;
        }
        .pa-stats-number {
          font-size: 36px; 
          font-weight: 800; 
          color: #fff;
          line-height: 1;
        }
        .pa-stats-label {
          font-size: 12px; 
          color: rgba(255,255,255,0.65);
          text-transform: uppercase; 
          letter-spacing: 0.5px;
          margin-top: 6px;
        }
        .pa-stats-divider {
          font-size: 24px; 
          color: rgba(255,255,255,0.3);
          margin: 0 4px;
        }

        .pa-tabs {
          display: flex;
          gap: 12px;
          background: #fff;
          border-radius: 16px;
          padding: 8px;
          border: 1.5px solid #e2e8f0;
        }
        .pa-tab {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #64748b;
        }
        .pa-tab.active {
          background: linear-gradient(135deg, #1648b8, #2563eb);
          color: #fff;
          box-shadow: 0 4px 12px rgba(37,99,235,0.3);
        }
        .pa-tab:hover:not(.active) {
          background: #f1f5f9;
        }

        .pa-section {
          background: #fff;
          border-radius: 24px;
          border: 1.5px solid #e2e8f0;
          overflow: hidden;
          animation: fadeUp 0.4s ease both;
        }
        .pa-section-header {
          padding: 20px 24px;
          background: #f8fafc;
          border-bottom: 1.5px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .pa-section-header h2 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pa-fechas {
          font-size: 12px;
          color: #64748b;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pa-fechas img {
          width: 14px;
          height: 14px;
          opacity: 0.6;
        }
        .pa-section-content {
          padding: 24px;
        }

        .pa-card-tutor {
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
          border: 1.5px solid #fcd34d;
        }
        .pa-card-tutor .pa-avatar {
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          color: #b45309;
        }

        .pa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .pa-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 20px;
          transition: all 0.2s ease;
        }
        .pa-card:hover:not(.pa-card-disabled) {
          border-color: #2563eb;
          box-shadow: 0 8px 24px rgba(37,99,235,0.12);
          transform: translateY(-2px);
        }
        .pa-card-disabled {
          opacity: 0.7;
          background: #f8fafc;
        }
        .pa-card-completada {
          background: #f0fdf4;
          border-color: #86efac;
        }

        .pa-card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }
        .pa-avatar {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: #1e40af;
          flex-shrink: 0;
        }
        .pa-card-completada .pa-avatar {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
        }
        .pa-card-info {
          flex: 1;
          min-width: 0;
        }
        .pa-card-name {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .pa-card-materia {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
        }
        .pa-card-grupo {
          font-size: 12px;
          font-weight: 600;
          color: #7c3aed;
          background: #f5f3ff;
          display: inline-block;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .pa-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }
        .pa-badge-success {
          background: #dcfce7;
          color: #166534;
        }
        .pa-badge-warning {
          background: #fef3c7;
          color: #b45309;
        }
        .pa-badge-info {
          background: #dbeafe;
          color: #1e40af;
        }
        .pa-badge-disabled {
          background: #f1f5f9;
          color: #94a3b8;
        }

        .pa-btn {
          width: 100%;
          margin-top: 16px;
          padding: 12px;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .pa-btn-primary {
          background: linear-gradient(135deg, #1648b8, #2563eb);
          color: #fff;
        }
        .pa-btn-primary:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }
        .pa-btn-disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .pa-empty {
          text-align: center;
          padding: 48px;
          color: #94a3b8;
        }
        .pa-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .pa-footer {
          margin-top: 32px;
          padding: 24px 0;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }

        @media (max-width: 700px) {
          .pa-nav {
            height: auto;
            padding: 16px;
            flex-direction: column;
            gap: 12px;
          }
          .pa-nav-brand {
            width: 100%;
            justify-content: center;
          }
          .pa-nav-user-section {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          .pa-hero-content {
            flex-direction: column;
            align-items: stretch;
          }
          .pa-section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .pa-grid {
            grid-template-columns: 1fr;
          }
        }
      `}),i.jsxs("div",{className:"pa-root",children:[i.jsxs("nav",{className:"pa-nav",children:[i.jsxs("div",{className:"pa-nav-brand",children:[i.jsxs("div",{className:"pa-nav-logos",children:[i.jsx("img",{src:x?jt.logoITSSNP2:jt.logoITSSNP,alt:"ITSSNP",className:"pa-nav-logo",onError:()=>w(!0)}),i.jsx("div",{className:"pa-nav-divider"}),i.jsx("img",{src:j?jt.logoTECNM2:jt.logoTECNM,alt:"TecNM",className:"pa-nav-logo",onError:()=>E(!0)})]}),i.jsx("span",{className:"pa-nav-title",children:"SICOT · Evaluación Docente"})]}),i.jsxs("div",{className:"pa-nav-user-section",children:[i.jsxs("div",{className:"pa-nav-user-info",children:[i.jsx("img",{src:jt.iconUser,alt:"",className:"pa-nav-user-icon"}),i.jsx("span",{className:"pa-nav-user-name",children:(t==null?void 0:t.nombre)||"Usuario"})]}),i.jsx("button",{className:"pa-btn-logout",onClick:n,children:"Cerrar sesión"})]})]}),i.jsxs("div",{className:"pa-body",children:[i.jsxs("div",{className:"pa-hero",children:[i.jsxs("div",{className:"pa-hero-content",children:[i.jsxs("div",{className:"pa-hero-info",children:[i.jsx("h1",{children:"Evaluación Docente"}),i.jsxs("div",{className:"pa-hero-badges",children:[i.jsxs("span",{className:"pa-hero-badge",children:[i.jsx("img",{src:jt.iconUser,alt:"",style:{width:"14px",height:"14px",filter:"brightness(0) invert(1)"}}),"No. Control: ",i.jsx("strong",{children:t==null?void 0:t.id})]}),r&&i.jsxs(i.Fragment,{children:[i.jsxs("span",{className:"pa-hero-badge",children:[i.jsx("span",{children:"📚"})," ",r.siglas," · Semestre ",r.semestre]}),i.jsxs("span",{className:"pa-hero-badge",children:["Periodo: ",i.jsx("strong",{children:C})]})]})]}),r&&i.jsx("p",{style:{color:"rgba(255,255,255,0.65)",marginTop:"12px",fontSize:"14px"},children:r.carrera})]}),i.jsxs("div",{className:"pa-hero-stats",children:[i.jsxs("div",{children:[i.jsx("span",{className:"pa-stats-number",children:z?1:0}),i.jsx("span",{className:"pa-stats-divider",children:"/"}),i.jsx("span",{className:"pa-stats-number",style:{opacity:.5},children:"1"})]}),i.jsx("div",{className:"pa-stats-label",children:"Tutor evaluado"}),i.jsxs("div",{style:{marginTop:12,borderTop:"1px solid rgba(255,255,255,0.2)",paddingTop:12},children:[i.jsxs("div",{children:[i.jsx("span",{className:"pa-stats-number",children:D}),i.jsx("span",{className:"pa-stats-divider",children:"/"}),i.jsx("span",{className:"pa-stats-number",style:{opacity:.5},children:I})]}),i.jsx("div",{className:"pa-stats-label",children:"Docentes evaluados"})]})]})]}),i.jsxs("div",{className:"pa-progress",style:{marginTop:24},children:[i.jsxs("div",{className:"pa-progress-header",children:[i.jsx("span",{children:"Progreso general"}),i.jsxs("span",{className:"pa-progress-percent",children:[I===0?0:Math.round(((z?1:0)+D)/(1+I)*100),"%"]})]}),i.jsx("div",{className:"pa-progress-track",children:i.jsx("div",{className:"pa-progress-fill",style:{width:`${((z?1:0)+D)/(1+I)*100}%`}})})]})]}),!ue&&i.jsxs("div",{className:"pa-empty",style:{background:"#fff",borderRadius:20,border:"2px dashed #cbd5e1"},children:[i.jsx("div",{className:"pa-empty-icon",children:"📅"}),i.jsx("p",{children:"No hay evaluaciones activas en este momento."}),i.jsx("p",{style:{fontSize:13,marginTop:8,color:"#94a3b8"},children:"Las evaluaciones estarán disponibles durante el periodo establecido por la administración."})]}),ue&&i.jsxs("div",{className:"pa-tabs",children:[k.tutorActivo&&b&&i.jsx("button",{className:`pa-tab ${u==="tutor"?"active":""}`,onClick:()=>g("tutor"),children:"👨‍🏫 Evaluación de Tutor"}),k.docenteActivo&&y.length>0&&i.jsxs("button",{className:`pa-tab ${u==="docentes"?"active":""}`,onClick:()=>g("docentes"),children:["📚 Evaluación de Docentes (",D,"/",I,")"]})]}),u==="tutor"&&k.tutorActivo&&b&&i.jsxs("div",{className:"pa-section",children:[i.jsxs("div",{className:"pa-section-header",children:[i.jsx("h2",{children:"👨‍🏫 Tu Tutor Académico"}),i.jsxs("div",{className:"pa-fechas",children:[i.jsx("img",{src:jt.iconCalendar,alt:""}),h(k.fechaInicioTutor)," - ",h(k.fechaFinTutor)]})]}),i.jsx("div",{className:"pa-section-content",children:i.jsxs("div",{className:`pa-card pa-card-tutor ${z?"pa-card-completada":""} ${G?"":"pa-card-disabled"}`,children:[i.jsxs("div",{className:"pa-card-header",children:[i.jsx("div",{className:"pa-avatar",children:b.nombre.charAt(0)}),i.jsxs("div",{className:"pa-card-info",children:[i.jsx("div",{className:"pa-card-name",children:b.nombre}),i.jsx("div",{className:"pa-card-materia",children:b.materia||"Tutoría Académica"}),i.jsxs("span",{className:"pa-card-grupo",children:["Grupo ",b.grupo]})]})]}),i.jsx("div",{className:"pa-badges",style:{marginTop:12},children:z?i.jsx("span",{className:"pa-badge pa-badge-success",children:"✓ Evaluación completada"}):G?i.jsx("span",{className:"pa-badge pa-badge-info",children:"⏳ Pendiente de evaluar"}):i.jsx("span",{className:"pa-badge pa-badge-warning",children:"⏰ Periodo de evaluación cerrado"})}),!z&&G&&i.jsx("button",{className:"pa-btn pa-btn-primary",onClick:()=>e(`/evaluacion/${b.id}`,{state:{tutor:b,numControl:t==null?void 0:t.id,idGrupo:b.id_grupo,tipo:"tutor"}}),children:"Evaluar Tutor →"}),z&&i.jsx("button",{className:"pa-btn pa-btn-disabled",disabled:!0,children:"✓ Evaluación ya realizada"}),!G&&!z&&i.jsx("button",{className:"pa-btn pa-btn-disabled",disabled:!0,children:"📅 Evaluación no disponible"})]})})]}),u==="docentes"&&k.docenteActivo&&y.length>0&&i.jsxs("div",{className:"pa-section",children:[i.jsxs("div",{className:"pa-section-header",children:[i.jsx("h2",{children:"📚 Tus Docentes"}),i.jsxs("div",{className:"pa-fechas",children:[i.jsx("img",{src:jt.iconCalendar,alt:""}),h(k.fechaInicioDocente)," - ",h(k.fechaFinDocente)]})]}),i.jsx("div",{className:"pa-section-content",children:i.jsx("div",{className:"pa-grid",children:y.map((O,q)=>{const te=p(O.id),be=ye;return i.jsxs("div",{className:`pa-card ${te?"pa-card-completada":""} ${be?"":"pa-card-disabled"}`,style:{animationDelay:`${q*.05}s`},children:[i.jsxs("div",{className:"pa-card-header",children:[i.jsx("div",{className:"pa-avatar",children:O.nombre.charAt(0)}),i.jsxs("div",{className:"pa-card-info",children:[i.jsx("div",{className:"pa-card-name",children:O.nombre}),i.jsx("div",{className:"pa-card-materia",children:O.materia}),i.jsxs("span",{className:"pa-card-grupo",children:["Grupo ",O.grupo]})]})]}),i.jsx("div",{className:"pa-badges",style:{marginTop:12},children:te?i.jsx("span",{className:"pa-badge pa-badge-success",children:"✓ Evaluación completada"}):be?i.jsx("span",{className:"pa-badge pa-badge-info",children:"⏳ Pendiente de evaluar"}):i.jsx("span",{className:"pa-badge pa-badge-warning",children:"⏰ Periodo de evaluación cerrado"})}),!te&&be&&i.jsx("button",{className:"pa-btn pa-btn-primary",onClick:()=>e(`/evaluacion/${O.id}`,{state:{tutor:O,numControl:t==null?void 0:t.id,idGrupo:O.id_grupo,tipo:"docente"}}),children:"Evaluar Docente →"}),te&&i.jsx("button",{className:"pa-btn pa-btn-disabled",disabled:!0,children:"✓ Evaluación ya realizada"}),!be&&!te&&i.jsx("button",{className:"pa-btn pa-btn-disabled",disabled:!0,children:"📅 Evaluación no disponible"})]},O.id)})})})]}),k.docenteActivo&&y.length===0&&i.jsxs("div",{className:"pa-empty",children:[i.jsx("div",{className:"pa-empty-icon",children:"📚"}),i.jsx("p",{children:"No tienes docentes asignados en este periodo."}),i.jsx("p",{style:{fontSize:13,marginTop:8,color:"#94a3b8"},children:"Esto puede deberse a que aún no tienes carga académica asignada."})]})]}),i.jsxs("footer",{className:"pa-footer",children:[i.jsx("p",{children:"© 2026 · ITSSNP · Sistema de Evaluación Docente · TecNM"}),i.jsx("p",{style:{marginTop:"4px"},children:"Instituto Tecnológico Superior de la Sierra Norte de Puebla"})]})]})]})}function ph({tutor:e,onEnviar:t,cargando:n=!1,error:r=null}){const[o,a]=v.useState(""),[l,s]=v.useState(!1),c=o.length,d=1e3,m=10,u=c/d*100,g=c>=m&&c<=d;l||s(!0);const x=()=>{const j=String(o).trim();if(!j){alert("Por favor escribe un comentario antes de enviar");return}if(j.length<10){alert("El comentario debe tener al menos 10 caracteres");return}t(j)},w=e.nombre.replace(/^(Dr\.|Dra\.|M\.C\.|Ing\.|Mtra?\.|Lic\.)?\s*/i,"").trim()[0]??"T";return i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
        @keyframes _fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes _pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .com-container {
          animation: _fadeInUp 0.4s ease both;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .com-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1.5px solid #bae6fd;
          border-radius: 16px;
        }

        .com-av {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #dbeafe, #7dd3fc);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
          color: #0369a1;
          flex-shrink: 0;
        }

        .com-info h3 {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .com-info p {
          font-size: 13px;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .com-card {
          background: #fff;
          border: 1.5px solid #e8edf5;
          border-radius: 16px;
          padding: clamp(20px, 4vw, 28px);
          box-shadow: 0 4px 28px rgba(30, 64, 175, 0.07);
        }

        .com-label {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
          display: block;
        }

        .com-label-sub {
          font-size: 12px;
          font-weight: 500;
          color: #ef4444;
          margin-top: 2px;
        }

        .com-textarea-wrapper {
          position: relative;
          margin-bottom: 12px;
        }

        .com-textarea {
          width: 100%;
          min-height: 160px;
          padding: 14px 16px;
          border: 2px solid #e8edf5;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #0f172a;
          resize: vertical;
          max-height: 280px;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fafbff;
        }

        .com-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          background: #fff;
        }

        .com-textarea::placeholder {
          color: #cbd5e1;
        }

        .com-textarea:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .com-counter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .com-counter-text {
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
        }

        .com-counter-text.warning {
          color: #c2410c;
          font-weight: 600;
        }

        .com-counter-text.error {
          color: #b91c1c;
          font-weight: 600;
        }

        .com-counter-bar {
          flex: 1;
          height: 4px;
          background: #e8edf5;
          border-radius: 2px;
          overflow: hidden;
        }

        .com-counter-fill {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #86efac);
          border-radius: 2px;
          transition: background 0.3s, width 0.3s;
        }

        .com-counter-fill.warning {
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }

        .com-counter-fill.error {
          background: linear-gradient(90deg, #ef4444, #fca5a5);
        }

        .com-hints {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 16px;
          font-size: 13px;
          color: #b91c1c;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .com-hints.valid {
          background: #f0fdf4;
          border-color: #86efac;
          color: #15803d;
        }

        .com-hints-icon {
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .com-hints-text {
          flex: 1;
          line-height: 1.4;
        }

        .com-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .com-btn {
          flex: 1;
          min-width: 140px;
          padding: 13px 20px;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .com-btn-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: #fff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .com-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .com-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .com-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .com-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: _spin 0.7s linear infinite;
        }

        .com-error-box {
          background: #fef2f2;
          border: 1.5px solid #fca5a5;
          border-radius: 12px;
          padding: 12px 14px;
          color: #b91c1c;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          gap: 8px;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .com-error-icon {
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .com-required {
          color: #ef4444;
          font-weight: 700;
        }

        .com-note {
          margin-top: 16px;
          padding: 12px;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          font-size: 12px;
          color: #0369a1;
          font-weight: 500;
          line-height: 1.6;
        }

        @keyframes _spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .com-card {
            padding: 16px 14px;
          }

          .com-textarea {
            min-height: 140px;
          }

          .com-actions {
            flex-direction: column;
          }

          .com-btn {
            min-width: auto;
          }
        }
      `}),i.jsxs("div",{className:"com-container",children:[i.jsxs("div",{className:"com-header",children:[i.jsx("div",{className:"com-av",children:w}),i.jsxs("div",{className:"com-info",children:[i.jsx("h3",{children:"¡Última etapa de la evaluación!"}),i.jsxs("p",{children:["Tu comentario es muy importante para ",e.nombre]})]})]}),i.jsxs("div",{className:"com-card",children:[i.jsxs("label",{className:"com-label",children:["Comentarios sobre el docente",i.jsxs("span",{className:"com-label-sub",children:[i.jsx("span",{className:"com-required",children:"* Obligatorio"})," — Mínimo 10 caracteres"]})]}),i.jsx("div",{className:"com-textarea-wrapper",children:i.jsx("textarea",{className:"com-textarea",placeholder:"Comparte tu experiencia, sugerencias o comentarios constructivos sobre cómo fue tu clase con este docente. Sé respetuoso y detallado...",value:o,onChange:j=>a(j.target.value),disabled:n,maxLength:d})}),i.jsxs("div",{className:"com-counter",children:[i.jsxs("span",{className:`com-counter-text ${c>d*.9?"error":c>d*.7?"warning":""}`,children:[c," / ",d," caracteres"]}),i.jsx("div",{className:"com-counter-bar",children:i.jsx("div",{className:`com-counter-fill ${c>d*.9?"error":c>d*.7?"warning":""}`,style:{width:`${Math.min(u,100)}%`}})})]}),r&&i.jsxs("div",{className:"com-error-box",children:[i.jsx("span",{className:"com-error-icon",children:"⚠️"}),i.jsx("span",{children:r})]}),o.length===0&&i.jsxs("div",{className:"com-hints",children:[i.jsx("span",{className:"com-hints-icon",children:"✏️"}),i.jsxs("span",{className:"com-hints-text",children:["Este campo es ",i.jsx("span",{style:{fontWeight:700},children:"obligatorio"}),". Por favor escribe tus comentarios sobre el docente evaluado."]})]}),o.length>0&&o.length<m&&i.jsxs("div",{className:"com-hints",children:[i.jsx("span",{className:"com-hints-icon",children:"⚠️"}),i.jsxs("span",{className:"com-hints-text",children:["Necesitas al menos ",m," caracteres. Faltan ",m-o.length," caracteres."]})]}),g&&i.jsxs("div",{className:"com-hints valid",children:[i.jsx("span",{className:"com-hints-icon",children:"✅"}),i.jsx("span",{className:"com-hints-text",children:"Tu comentario está listo para ser enviado."})]}),c>d*.9&&i.jsxs("div",{className:"com-hints",children:[i.jsx("span",{className:"com-hints-icon",children:"⚠️"}),i.jsxs("span",{className:"com-hints-text",children:["Estás cerca del límite de caracteres (",d," máximo)."]})]}),i.jsx("div",{className:"com-actions",children:i.jsx("button",{className:"com-btn com-btn-primary",onClick:x,disabled:!g||n,title:g?"":"Completa el comentario para continuar",children:n?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"com-spinner"}),"Finalizando..."]}):i.jsx(i.Fragment,{children:"✓ Finalizar Evaluación"})})}),i.jsx("div",{className:"com-note",children:"📌 Al finalizar, tu evaluación se completará y serás redirigido a tu panel de control donde podrás evaluar a otros docentes."})]})]})]})}const mh=[{valor:5,label:"Excelente",color:"#15803d",bg:"#f0fdf4",border:"#86efac"},{valor:4,label:"Muy bueno",color:"#0369a1",bg:"#f0f9ff",border:"#7dd3fc"},{valor:3,label:"Bueno",color:"#b45309",bg:"#fffbeb",border:"#fcd34d"},{valor:2,label:"Regular",color:"#c2410c",bg:"#fff7ed",border:"#fdba74"},{valor:1,label:"Deficiente",color:"#b91c1c",bg:"#fef2f2",border:"#fca5a5"}];function hh({visible:e}){return i.jsxs("div",{style:{position:"fixed",bottom:28,left:"50%",zIndex:300,transform:`translateX(-50%) translateY(${e?0:14}px)`,opacity:e?1:0,transition:"all .25s cubic-bezier(.16,1,.3,1)",pointerEvents:"none",background:"#1e293b",color:"#fff",borderRadius:14,padding:"13px 24px",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:10,boxShadow:"0 10px 40px rgba(0,0,0,.45)",whiteSpace:"nowrap"},children:[i.jsx("span",{style:{fontSize:20},children:"⚠️"}),"Selecciona una opción para poder continuar"]})}function gh(){var We,fn,Nl;const e=cn(),t=Fr(),{idGrupo:n}=xd(),{user:r}=sn(),o=((We=t.state)==null?void 0:We.tutor)??{id:Number(n),nombre:"Tutor",materia:"",grupo:""},a=((fn=t.state)==null?void 0:fn.numControl)??(r==null?void 0:r.id)??0,l=((Nl=t.state)==null?void 0:Nl.idGrupo)??n,[s,c]=v.useState([]),[d,m]=v.useState(null),[u,g]=v.useState(null),[x,w]=v.useState(null),[j,E]=v.useState(!0),[p,f]=v.useState(""),[h,b]=v.useState(0),[y,k]=v.useState({}),[C,z]=v.useState("libre"),[D,I]=v.useState(!1),[G,ye]=v.useState(0),[ue,O]=v.useState(!1),[q,te]=v.useState(!1),[be,P]=v.useState(null),_=v.useRef(0),R=v.useRef({}),A=v.useRef(null),V=v.useRef(null);v.useEffect(()=>{_.current=h},[h]),v.useEffect(()=>{R.current=y},[y]),v.useEffect(()=>{const M=async()=>{try{E(!0);const B=await sh();c(B.preguntas||[]),m(B.idEncuesta);const yt=await wd(a);w(yt),console.log("📝 Tutor ID:",o.id,"Tutor nombre:",o.nombre);const Ht=await ch(o.id,l);g(Ht.idEvaluacion)}catch(B){console.error("Error al cargar evaluación:",B),f(B.message||"Error al cargar la evaluación")}finally{E(!1)}};return o.id&&a&&l&&M(),()=>{clearTimeout(A.current),clearTimeout(V.current)}},[]),v.useEffect(()=>{C==="transitando"&&(clearTimeout(A.current),A.current=setTimeout(()=>{const M=_.current+1;M>=s.length?z("comentario"):(_.current=M,b(M),ye(B=>B+1),I(!1),z("libre"),window.scrollTo({top:0,behavior:"smooth"}))},700)),C==="enviando"&&(clearTimeout(A.current),A.current=setTimeout(async()=>{try{const M=Object.entries(R.current).map(([yt,Ht])=>({idPregunta:Number(yt),calificacion:Ht})),B=await Vs(u,M);B.success?e("/gracias",{replace:!0,state:{tutor:o,totalPreguntas:s.length,carrera:(x==null?void 0:x.carrera)||"Carrera"}}):(console.error("Error al guardar:",B.error),z("comentario"))}catch(M){console.error("Error en envío:",M),z("comentario")}},1100))},[C,u,e,s.length,o,x]);const K=s[h],re=Ye.find(M=>M.id===(K==null?void 0:K.idCategoria)),vt=ih[K==null?void 0:K.idCategoria]??{},Te=y[K==null?void 0:K.id],qe=Object.keys(y).length,un=s.length?Math.round(h/s.length*100):0,$r=h===s.length-1,dn=C==="libre",et=s.length,Ur=()=>{O(!0),clearTimeout(V.current),V.current=setTimeout(()=>O(!1),2500)},N=M=>{if(!dn){Te!==void 0&&Ur();return}const B={...R.current,[K.id]:M};R.current=B,k(B),z("transitando")},U=async M=>{te(!0),P(null);try{const B=String(M).trim();if(console.log("📝 Enviando comentario:",B),!B)throw new Error("El comentario no puede estar vacío");if(B.length<10)throw new Error("El comentario debe tener al menos 10 caracteres");console.log("💾 Guardando respuestas de la evaluación...");const yt=Object.entries(R.current).map(([Sd,Nd])=>({idPregunta:Number(Sd),calificacion:Number(Nd)}));console.log("📊 Respuestas a guardar:",yt);const Ht=await Vs(u,yt);if(console.log("📡 Resultado guardar respuestas:",Ht),!Ht.success)throw new Error(Ht.error||"Error al guardar las respuestas");console.log("💬 Guardando comentario...");const aa=await uh(u,o.id,B);if(console.log("📡 Resultado guardar comentario:",aa),!aa.success)throw new Error(aa.error||"Error al guardar el comentario");e("/gracias",{replace:!0,state:{tutor:o,totalPreguntas:s.length,carrera:(x==null?void 0:x.carrera)||"Carrera"}})}catch(B){console.error("❌ Error en handleEnviarComentario:",B),P(B.message||"Error inesperado"),te(!1)}};if(j)return i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%)"},children:[i.jsx("div",{style:{width:"60px",height:"60px",border:"5px solid rgba(255,255,255,0.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 1s linear infinite",marginBottom:"20px"}}),i.jsx("p",{style:{color:"#fff",fontSize:"16px"},children:"Cargando evaluación..."}),i.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]});if(p)return i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",padding:"20px",textAlign:"center"},children:[i.jsx("h2",{style:{color:"#b91c1c",marginBottom:"16px"},children:"Error"}),i.jsx("p",{style:{marginBottom:"24px"},children:p}),i.jsx("button",{onClick:()=>e("/panel-alumno"),style:{padding:"12px 24px",background:"#2563eb",color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer"},children:"Volver al panel"})]});if(C==="comentario"||C==="enviando")return i.jsxs(i.Fragment,{children:[i.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),i.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),i.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap",rel:"stylesheet"}),i.jsx("style",{children:`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body, #root { height: 100%; }

          .com-page {
            font-family: 'DM Sans', sans-serif;
            min-height: 100dvh;
            background: #eef2ff;
            display: flex;
            flex-direction: column;
          }

          .com-nav {
            background: linear-gradient(135deg,#0d2660 0%,#1648b8 55%,#0b7ec9 100%);
            height: 60px;
            padding: 0 clamp(16px,4vw,40px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 14px rgba(0,0,0,.26);
            position: sticky;
            top: 0;
            z-index: 20;
          }

          .com-back {
            background: rgba(255,255,255,.12);
            border: 1px solid rgba(255,255,255,.22);
            border-radius: 8px;
            padding: 6px 14px;
            font-family: 'DM Sans',sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #fff;
            cursor: pointer;
            transition: background .15s;
          }

          .com-back:hover {
            background: rgba(255,255,255,.24);
          }

          .com-nav-title {
            font-size: 13px;
            font-weight: 700;
            color: rgba(255,255,255,.85);
            flex: 1;
            text-align: center;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .com-body {
            flex: 1;
            padding: clamp(14px,3vw,40px) clamp(14px,4vw,24px) 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 13px;
          }

          .com-wrap {
            width: 100%;
            max-width: 680px;
            display: flex;
            flex-direction: column;
            gap: 13px;
          }
        `}),i.jsxs("div",{className:"com-page",children:[i.jsxs("nav",{className:"com-nav",children:[i.jsx("button",{className:"com-back",onClick:()=>e("/panel-alumno"),children:"← Volver"}),i.jsx("p",{className:"com-nav-title",children:o.nombre}),i.jsxs("span",{style:{fontSize:"13px",fontWeight:"700",color:"rgba(255,255,255,.82)",background:"rgba(255,255,255,.12)",borderRadius:"8px",padding:"5px 12px",whiteSpace:"nowrap"},children:[qe,"/",et," preguntas"]})]}),i.jsx("div",{className:"com-body",children:i.jsx("div",{className:"com-wrap",children:i.jsx(ph,{tutor:o,onEnviar:U,cargando:q,error:be})})})]})]});if(!K)return null;const me=o.nombre.replace(/^(Dr\.|Dra\.|M\.C\.|Ing\.|Mtra?\.|Lic\.)?\s*/i,"").trim()[0]??"T";return i.jsxs(i.Fragment,{children:[i.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),i.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),i.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap",rel:"stylesheet"}),i.jsx("style",{children:`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        @keyframes _spin   { to { transform: rotate(360deg); } }
        @keyframes _inR    { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: translateX(0); } }
        @keyframes _rubIn  { from { opacity:0; transform: translateY(-7px); } to { opacity:1; transform: translateY(0); } }
        @keyframes _fadeUp { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }

        .ev-root { font-family: 'DM Sans', sans-serif; min-height: 100dvh; background: #eef2ff; display: flex; flex-direction: column; }

        /* navbar */
        .ev-nav { background: linear-gradient(135deg,#0d2660 0%,#1648b8 55%,#0b7ec9 100%); height: 60px; padding: 0 clamp(16px,4vw,40px); display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 14px rgba(0,0,0,.26); position: sticky; top: 0; z-index: 20; }
        .ev-back { background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.22); border-radius: 8px; padding: 6px 14px; font-family: 'DM Sans',sans-serif; font-size: 13px; font-weight: 600; color: #fff; cursor: pointer; transition: background .15s; }
        .ev-back:hover { background: rgba(255,255,255,.24); }
        .ev-nav-mid { font-size: 13px; font-weight: 700; color: rgba(255,255,255,.85); flex: 1; text-align: center; padding: 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ev-nav-num { font-size: 13px; font-weight: 700; color: rgba(255,255,255,.82); background: rgba(255,255,255,.12); border-radius: 8px; padding: 5px 12px; white-space: nowrap; }

        /* barra progreso */
        .ev-prog { height: 5px; background: rgba(14,40,100,.10); position: sticky; top: 60px; z-index: 19; }
        .ev-prog-fill { height: 100%; background: linear-gradient(90deg,#16a34a,#86efac); transition: width .5s ease; }

        /* body */
        .ev-body { flex: 1; padding: clamp(14px,3vw,40px) clamp(14px,4vw,24px) 80px; display: flex; flex-direction: column; align-items: center; gap: 13px; }
        .ev-wrap { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 13px; }

        /* tutor card */
        .ev-tcard { background: #fff; border: 1.5px solid #e8eeff; border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; animation: _fadeUp .3s ease both; }
        .ev-tav { width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0; background: linear-gradient(135deg,#e8eeff,#c7d7ff); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #1e40af; }
        .ev-tname { font-size: 14px; font-weight: 700; color: #0f172a; }
        .ev-tmat  { font-size: 12px; color: #64748b; margin-top: 2px; }
        .ev-ttags { display: flex; gap: 6px; margin-top: 5px; flex-wrap: wrap; }
        .ev-ttag  { background: #f1f5ff; border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 600; color: #3b4fd8; }
        .ev-ttag-g { background: #dcfce7; color: #15803d; }

        /* dots */
        .ev-dots { display: flex; flex-wrap: wrap; gap: 5px; background: #fff; border: 1.5px solid #e8eeff; border-radius: 14px; padding: 11px 13px; animation: _fadeUp .3s ease .04s both; }
        .ev-d   { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; border: 2px solid transparent; }
        .ev-d-e { background: #f1f5f9; color: #94a3b8; border-color: #e2e8f0; }
        .ev-d-a { background: #dbeafe;  color: #1e40af; border-color: #93c5fd; }
        .ev-d-c { background: #1e40af;  color: #fff;    border-color: #1e40af; }

        /* card pregunta */
        .ev-card { background: #fff; border: 1.5px solid #e8eeff; border-radius: 20px; padding: clamp(20px,4vw,36px); box-shadow: 0 4px 28px rgba(30,64,175,.07); animation: _inR .2s ease both; }

        /* categoría */
        .ev-catrow  { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .ev-catpill { display: inline-flex; align-items: center; gap: 8px; background: #eff2ff; border-radius: 9px; padding: 5px 12px; flex: 1; min-width: 0; }
        .ev-catnum  { background: #1e40af; color: #fff; border-radius: 5px; padding: 1px 6px; font-size: 10px; font-weight: 800; flex-shrink: 0; }
        .ev-catlbl  { font-size: 11.5px; font-weight: 700; color: #3730a3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ev-rtoggle { background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 19px; padding: 0; flex-shrink: 0; transition: color .15s; }
        .ev-rtoggle:hover { color: #3b82f6; }

        /* rúbrica */
        .ev-rub       { background: #0f172a; border-radius: 14px; padding: 14px 16px; margin-bottom: 20px; animation: _rubIn .18s ease; }
        .ev-rubtitle  { font-size: 10.5px; font-weight: 800; color: #93c5fd; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 10px; }
        .ev-rubrow    { display: flex; gap: 10px; align-items: flex-start; padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
        .ev-rubrow:last-child { border-bottom: none; padding-bottom: 0; }
        .ev-rubval    { min-width: 28px; height: 22px; border-radius: 6px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #fff; background: #1e3a8a; }
        .ev-rubtxt    { font-size: 12.5px; color: #cbd5e1; line-height: 1.5; }

        /* pregunta */
        .ev-q { font-size: clamp(16px,2.2vw,20px); font-weight: 700; color: #0f172a; line-height: 1.55; margin-bottom: 24px; }

        /* opciones */
        .ev-opts { display: flex; flex-direction: column; gap: 10px; }
        .ev-opt {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: 13px;
          border: 2px solid #e8edf5; background: #fafbff;
          user-select: none;
          transition: border-color .16s, background .16s, transform .18s, box-shadow .16s, opacity .2s;
        }
        .ev-opt-libre  { cursor: pointer; }
        .ev-opt-libre:hover:not(.ev-opt-sel) { border-color: #c7d2fe; background: #f4f6ff; transform: translateX(3px); }
        .ev-opt-lock   { cursor: not-allowed; }
        .ev-opt-lock:not(.ev-opt-sel) { opacity: .28; }
        .ev-opt-sel { border-color: var(--ob); background: var(--obg); transform: translateX(5px); box-shadow: 0 2px 14px rgba(0,0,0,.06); }

        .ev-opnum { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; background: #f1f5f9; color: #475569; transition: background .16s, color .16s; }
        .ev-opt-sel .ev-opnum { background: var(--oc); color: #fff; }
        .ev-radio { width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; border: 2px solid #cbd5e1; background: #fff; display: flex; align-items: center; justify-content: center; transition: border-color .15s, background .15s; }
        .ev-opt-sel .ev-radio { border-color: var(--oc); background: var(--oc); }
        .ev-rdot  { width: 8px; height: 8px; border-radius: 50%; background: #fff; transform: scale(0); opacity: 0; transition: all .15s; }
        .ev-opt-sel .ev-rdot { transform: scale(1); opacity: 1; }
        .ev-oplbl { font-size: 13.5px; font-weight: 700; color: var(--oc, #475569); }
        .ev-oprub { font-size: 12px; color: #64748b; margin-top: 2px; line-height: 1.4; }

        /* hints */
        .ev-hint { display: flex; align-items: center; gap: 8px; border-radius: 10px; padding: 11px 14px; margin-top: 14px; font-size: 13px; font-weight: 500; }
        .ev-hint-info { background: #f0f9ff; border: 1px solid #bae6fd; color: #0369a1; }
        .ev-hint-ok   { background: #f0fdf4; border: 1px solid #86efac; color: #15803d; font-weight: 600; }

        @media (max-width: 480px) {
          .ev-opt { padding: 11px 12px; gap: 10px; }
          .ev-q   { font-size: 15px; }
        }
      `}),i.jsx(hh,{visible:ue}),i.jsxs("div",{className:"ev-root",children:[i.jsxs("nav",{className:"ev-nav",children:[i.jsx("button",{className:"ev-back",onClick:()=>e("/panel-alumno"),children:"← Volver"}),i.jsx("p",{className:"ev-nav-mid",children:o.nombre}),i.jsxs("span",{className:"ev-nav-num",children:[h+1," / ",et]})]}),i.jsx("div",{className:"ev-prog",children:i.jsx("div",{className:"ev-prog-fill",style:{width:`${un}%`}})}),i.jsx("div",{className:"ev-body",children:i.jsxs("div",{className:"ev-wrap",children:[i.jsxs("div",{className:"ev-tcard",children:[i.jsx("div",{className:"ev-tav",children:me}),i.jsxs("div",{children:[i.jsx("p",{className:"ev-tname",children:o.nombre}),i.jsx("p",{className:"ev-tmat",children:o.materia}),i.jsxs("div",{className:"ev-ttags",children:[o.grupo&&i.jsx("span",{className:"ev-ttag",children:o.grupo}),i.jsx("span",{className:"ev-ttag",children:"Encuesta de tutoría"}),i.jsxs("span",{className:"ev-ttag ev-ttag-g",children:[qe,"/",et," respondidas"]})]})]})]}),i.jsx("div",{className:"ev-dots",children:s.map((M,B)=>{const yt=B===h?"ev-d-c":y[M.id]!==void 0?"ev-d-a":"ev-d-e";return i.jsx("div",{className:`ev-d ${yt}`,title:`Pregunta ${B+1}`,children:y[M.id]!==void 0&&B!==h?"✓":B+1},M.id)})}),i.jsxs("div",{className:"ev-card",children:[i.jsxs("div",{className:"ev-catrow",children:[i.jsxs("div",{className:"ev-catpill",children:[i.jsx("span",{className:"ev-catnum",children:re==null?void 0:re.id}),i.jsx("span",{className:"ev-catlbl",children:re==null?void 0:re.nombre})]}),i.jsx("button",{className:"ev-rtoggle",onClick:()=>I(M=>!M),title:"Ver rúbrica de evaluación",children:D?"✕":"ℹ"})]}),D&&i.jsxs("div",{className:"ev-rub",children:[i.jsxs("p",{className:"ev-rubtitle",children:["Rúbrica — ",re==null?void 0:re.nombre]}),[5,4,3,2,1].map(M=>i.jsxs("div",{className:"ev-rubrow",children:[i.jsx("span",{className:"ev-rubval",children:M}),i.jsx("span",{className:"ev-rubtxt",children:vt[M]})]},M))]}),i.jsx("p",{className:"ev-q",children:K.texto}),i.jsx("div",{className:"ev-opts",children:mh.map(M=>{const B=Te===M.valor;return i.jsxs("div",{className:["ev-opt",B?"ev-opt-sel":"",dn?"ev-opt-libre":"ev-opt-lock"].filter(Boolean).join(" "),style:{"--oc":M.color,"--obg":M.bg,"--ob":M.border},onClick:()=>N(M.valor),children:[i.jsx("div",{className:"ev-opnum",children:M.valor}),i.jsx("div",{className:"ev-radio",children:i.jsx("div",{className:"ev-rdot"})}),i.jsxs("div",{style:{flex:1},children:[i.jsx("p",{className:"ev-oplbl",children:M.label}),i.jsx("p",{className:"ev-oprub",children:vt[M.valor]})]})]},M.valor)})}),dn&&i.jsxs("div",{className:"ev-hint ev-hint-info",children:[i.jsx("span",{children:"💡"}),$r?"Al seleccionar, verás el formulario de comentarios.":"Selecciona una opción para avanzar a la siguiente pregunta."]}),!dn&&i.jsxs("div",{className:"ev-hint ev-hint-ok",children:[i.jsx("span",{children:"✅"}),"Respuesta guardada — avanzando…"]})]},G)]})})]})]})}function xh(){var c,d,m;const e=cn(),t=Fr(),{user:n}=sn(),[r,o]=v.useState({nombre:(n==null?void 0:n.nombre)||"Alumno",carrera:((c=t.state)==null?void 0:c.carrera)||"Carrera",fecha:new Date().toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}),a=((d=t.state)==null?void 0:d.tutor)??{nombre:"Tutor"},l=((m=t.state)==null?void 0:m.totalPreguntas)??0,s=()=>{e("/panel-alumno",{replace:!0})};return i.jsxs(i.Fragment,{children:[i.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),i.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),i.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap",rel:"stylesheet"}),i.jsx("style",{children:`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body, #root {
          height: 100%;
        }

        @keyframes _fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes _slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes _bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .gracias-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: linear-gradient(135deg, #0d2660 0%, #1648b8 55%, #0b7ec9 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(20px, 5vw, 40px);
        }

        .gracias-container {
          max-width: 600px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: _fadeIn 0.6s ease both;
        }

        .gracias-header {
          text-align: center;
          color: #fff;
        }

        .gracias-icon {
          font-size: 80px;
          margin-bottom: 16px;
          animation: _bounce 2s ease-in-out infinite;
          display: inline-block;
        }

        .gracias-title {
          font-size: clamp(28px, 6vw, 42px);
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .gracias-subtitle {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
        }

        .gracias-card {
          background: #fff;
          border-radius: 20px;
          padding: clamp(24px, 5vw, 36px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: _slideUp 0.7s ease both;
          animation-delay: 0.1s;
        }

        .gracias-message {
          margin-bottom: 24px;
        }

        .gracias-message-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .gracias-message-text {
          font-size: 15px;
          font-weight: 400;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .gracias-info {
          background: #f0f9ff;
          border-left: 4px solid #0369a1;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .gracias-info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }

        .gracias-info-item:last-child {
          margin-bottom: 0;
        }

        .gracias-info-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #0369a1;
          letter-spacing: 0.5px;
        }

        .gracias-info-value {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
        }

        .gracias-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 20px 0;
        }

        .gracias-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 20px 0;
        }

        .gracias-stat {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .gracias-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #0369a1;
          margin-bottom: 4px;
        }

        .gracias-stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gracias-cta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .gracias-btn {
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .gracias-btn-primary {
          background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%);
          color: #fff;
          box-shadow: 0 8px 24px rgba(3, 105, 161, 0.3);
        }

        .gracias-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(3, 105, 161, 0.4);
        }

        .gracias-btn-primary:active {
          transform: translateY(0);
        }

        .gracias-btn-secondary {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .gracias-btn-secondary:hover {
          background: #e2e8f0;
        }

        .gracias-btn-icon {
          font-size: 18px;
        }

        .gracias-footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .gracias-footer-text {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
        }

        .gracias-footer-highlight {
          color: #0369a1;
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .gracias-icon {
            font-size: 60px;
          }

          .gracias-title {
            font-size: 28px;
          }

          .gracias-subtitle {
            font-size: 14px;
          }

          .gracias-stats {
            grid-template-columns: 1fr;
          }

          .gracias-message-text {
            font-size: 14px;
          }
        }
      `}),i.jsx("div",{className:"gracias-root",children:i.jsxs("div",{className:"gracias-container",children:[i.jsxs("div",{className:"gracias-header",children:[i.jsx("div",{className:"gracias-icon",children:"✅"}),i.jsx("h1",{className:"gracias-title",children:"¡Evaluación Completada!"}),i.jsxs("p",{className:"gracias-subtitle",children:["Gracias por tu tiempo y retroalimentación",i.jsx("br",{}),"Tu opinión es valiosa para mejorar la calidad educativa"]})]}),i.jsxs("div",{className:"gracias-card",children:[i.jsxs("div",{className:"gracias-message",children:[i.jsx("h2",{className:"gracias-message-title",children:"¡Agradecemos tu participación!"}),i.jsxs("p",{className:"gracias-message-text",children:["Hola ",i.jsx("span",{style:{fontWeight:700,color:"#0f172a"},children:r.nombre}),", hemos recibido tu evaluación del docente ",i.jsx("span",{style:{fontWeight:700,color:"#0f172a"},children:a.nombre}),". Tu retroalimentación contribuye significativamente a nuestro proceso de mejora continua."]})]}),i.jsxs("div",{className:"gracias-info",children:[i.jsxs("div",{className:"gracias-info-item",children:[i.jsx("span",{className:"gracias-info-label",children:"👤 Nombre del Alumno"}),i.jsx("span",{className:"gracias-info-value",children:r.nombre})]}),i.jsxs("div",{className:"gracias-info-item",children:[i.jsx("span",{className:"gracias-info-label",children:"🎓 Carrera"}),i.jsx("span",{className:"gracias-info-value",children:r.carrera})]}),i.jsxs("div",{className:"gracias-info-item",children:[i.jsx("span",{className:"gracias-info-label",children:"📅 Fecha de Evaluación"}),i.jsx("span",{className:"gracias-info-value",children:r.fecha})]})]}),i.jsxs("div",{className:"gracias-stats",children:[i.jsxs("div",{className:"gracias-stat",children:[i.jsx("div",{className:"gracias-stat-value",children:l}),i.jsx("div",{className:"gracias-stat-label",children:"Preguntas respondidas"})]}),i.jsxs("div",{className:"gracias-stat",children:[i.jsx("div",{className:"gracias-stat-value",children:"100%"}),i.jsx("div",{className:"gracias-stat-label",children:"Evaluación completada"})]})]}),i.jsx("div",{className:"gracias-divider"}),i.jsx("div",{className:"gracias-cta",children:i.jsxs("button",{className:"gracias-btn gracias-btn-primary",onClick:s,children:[i.jsx("span",{className:"gracias-btn-icon",children:"→"}),"Continuar con evaluaciones faltantes"]})}),i.jsx("div",{className:"gracias-footer",children:i.jsxs("p",{className:"gracias-footer-text",children:["Si aún tienes ",i.jsx("span",{className:"gracias-footer-highlight",children:"docentes por evaluar"}),", serás redirigido a tu panel de control donde podrás continuar con las evaluaciones pendientes."]})})]})]})})]})}const vh=()=>window.location.origin,Ra=vh();function yh(){return localStorage.getItem("token")}function Da(){return{Authorization:`Bearer ${yh()}`,"Content-Type":"application/json"}}function bh({onConfigChange:e}){var p,f,h,b;const[t,n]=v.useState([]),[r,o]=v.useState(null),[a,l]=v.useState(!1),[s,c]=v.useState(null),[d,m]=v.useState("success"),[u,g]=v.useState({fechaInicioTutor:"",fechaFinTutor:"",fechaInicioDocente:"",fechaFinDocente:"",tutorActivo:!1,docenteActivo:!1});v.useEffect(()=>{x()},[]);const x=async()=>{l(!0);try{console.log("🔍 Cargando configuración...");const y=await fetch(`${Ra}/api/admin/configuracion`,{headers:Da()});if(!y.ok)throw new Error(`Error ${y.status}: ${y.statusText}`);const k=await y.json();if(console.log("📊 Datos recibidos:",k),n(k.periodos||[]),o(k.periodoActivo),k.encuesta){const C=z=>{if(!z)return"";const D=new Date(z),I=D.getFullYear(),G=String(D.getMonth()+1).padStart(2,"0"),ye=String(D.getDate()).padStart(2,"0"),ue=String(D.getHours()).padStart(2,"0"),O=String(D.getMinutes()).padStart(2,"0");return`${I}-${G}-${ye}T${ue}:${O}`};g({fechaInicioTutor:C(k.encuesta.FechaInicioTutor),fechaFinTutor:C(k.encuesta.FechaFinTutor),fechaInicioDocente:C(k.encuesta.FechaInicioDocente),fechaFinDocente:C(k.encuesta.FechaFinDocente),tutorActivo:k.encuesta.TutorActivo===1||k.encuesta.TutorActivo===!0,docenteActivo:k.encuesta.DocenteActivo===1||k.encuesta.DocenteActivo===!0}),console.log("⚙️ Configuración cargada:",{tutorActivo:u.tutorActivo,docenteActivo:u.docenteActivo,fechaInicioTutor:u.fechaInicioTutor,fechaFinTutor:u.fechaFinTutor})}w("Configuración cargada correctamente","success")}catch(y){console.error("❌ Error cargando configuración:",y),w("Error al cargar configuración: "+y.message,"error")}finally{l(!1)}},w=(y,k)=>{c(y),m(k),setTimeout(()=>c(null),5e3)},j=async y=>{l(!0);try{const k=await fetch(`${Ra}/api/admin/activar-periodo`,{method:"POST",headers:Da(),body:JSON.stringify({idPeriodo:y})}),C=await k.json();if(!k.ok)throw new Error(C.error||"Error al activar periodo");w(C.mensaje,"success"),x(),e&&e()}catch(k){console.error("Error activando periodo:",k),w("Error al activar periodo: "+k.message,"error")}finally{l(!1)}},E=async()=>{l(!0);try{console.log("💾 Guardando configuración:",u);const y=D=>D?D.replace("T"," ")+":00":null,k={fechaInicioTutor:y(u.fechaInicioTutor),fechaFinTutor:y(u.fechaFinTutor),fechaInicioDocente:y(u.fechaInicioDocente),fechaFinDocente:y(u.fechaFinDocente),tutorActivo:u.tutorActivo,docenteActivo:u.docenteActivo};console.log("📤 Payload a enviar:",k);const C=await fetch(`${Ra}/api/admin/configurar-evaluacion`,{method:"POST",headers:Da(),body:JSON.stringify(k)}),z=await C.json();if(console.log("📡 Respuesta guardar:",z),!C.ok)throw new Error(z.error||"Error al guardar configuración");w(z.mensaje,"success"),e&&e()}catch(y){console.error("Error guardando configuración:",y),w("Error al guardar configuración: "+y.message,"error")}finally{l(!1)}};return i.jsxs("div",{style:{padding:"24px",maxWidth:"100%",margin:"0 auto"},children:[s&&i.jsxs("div",{style:{background:d==="success"?"#dbeafe":"#fee2e2",border:d==="success"?"1px solid #3b82f6":"1px solid #ef4444",borderRadius:"12px",padding:"12px 20px",marginBottom:"24px",color:d==="success"?"#1e40af":"#b91c1c",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[i.jsx("span",{children:s}),i.jsx("button",{onClick:()=>c(null),style:{background:"transparent",border:"none",fontSize:"18px",cursor:"pointer",color:d==="success"?"#1e40af":"#b91c1c"},children:"✕"})]}),i.jsxs("div",{style:{background:"#fff",borderRadius:"20px",border:"1.5px solid #e2e8f0",padding:"24px",marginBottom:"24px"},children:[i.jsx("h2",{style:{fontSize:"18px",fontWeight:"700",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px"},children:"📅 Periodo Escolar"}),i.jsx("p",{style:{fontSize:"13px",color:"#64748b",marginBottom:"16px"},children:"Selecciona el periodo que los alumnos verán para evaluar a sus docentes"}),i.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",marginBottom:"16px"},children:t.map(y=>i.jsxs("button",{onClick:()=>j(y.IdPerio),disabled:a,style:{padding:"8px 16px",borderRadius:"10px",border:(r==null?void 0:r.IdPerio)===y.IdPerio?"2px solid #2563eb":"1.5px solid #e2e8f0",background:(r==null?void 0:r.IdPerio)===y.IdPerio?"#eff6ff":"#fff",color:(r==null?void 0:r.IdPerio)===y.IdPerio?"#1e40af":"#64748b",fontWeight:(r==null?void 0:r.IdPerio)===y.IdPerio?"700":"500",cursor:a?"not-allowed":"pointer",transition:"all 0.2s",opacity:a?.6:1},children:[y.NombreCorto||y.nombre_corto||y.Nombre||`Periodo ${y.IdPerio}`,y.Situación===1&&" ✓ Activo"]},y.IdPerio))}),r&&i.jsxs("div",{style:{background:"#f1f5f9",borderRadius:"10px",padding:"12px",fontSize:"14px",color:"#334155"},children:[i.jsx("strong",{children:"Periodo activo:"})," ",r.Nombre||r.nombre," (",r.NombreCorto||r.nombre_corto,")"]})]}),i.jsxs("div",{style:{background:"#fff",borderRadius:"20px",border:"1.5px solid #e2e8f0",padding:"24px",marginBottom:"24px"},children:[i.jsx("h2",{style:{fontSize:"18px",fontWeight:"700",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px"},children:"👨‍🏫 Evaluación de Tutor"}),i.jsx("p",{style:{fontSize:"13px",color:"#64748b",marginBottom:"16px"},children:"Configura la evaluación del tutor académico de cada alumno"}),i.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px",cursor:"pointer"},children:[i.jsx("input",{type:"checkbox",checked:u.tutorActivo,onChange:y=>g({...u,tutorActivo:y.target.checked}),style:{width:"18px",height:"18px",cursor:"pointer"}}),i.jsx("span",{style:{fontWeight:"500"},children:"Activar evaluación de tutor"})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[i.jsxs("div",{children:[i.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"600",color:"#64748b",marginBottom:"6px"},children:"Fecha de inicio"}),i.jsx("input",{type:"datetime-local",value:u.fechaInicioTutor,onChange:y=>g({...u,fechaInicioTutor:y.target.value}),disabled:!u.tutorActivo,style:{width:"100%",padding:"10px 12px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontFamily:"inherit",fontSize:"14px",background:u.tutorActivo?"#fff":"#f8fafc"}})]}),i.jsxs("div",{children:[i.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"600",color:"#64748b",marginBottom:"6px"},children:"Fecha de fin"}),i.jsx("input",{type:"datetime-local",value:u.fechaFinTutor,onChange:y=>g({...u,fechaFinTutor:y.target.value}),disabled:!u.tutorActivo,style:{width:"100%",padding:"10px 12px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontFamily:"inherit",fontSize:"14px",background:u.tutorActivo?"#fff":"#f8fafc"}})]})]})]}),i.jsxs("div",{style:{background:"#fff",borderRadius:"20px",border:"1.5px solid #e2e8f0",padding:"24px",marginBottom:"24px"},children:[i.jsx("h2",{style:{fontSize:"18px",fontWeight:"700",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px"},children:"📚 Evaluación de Docentes"}),i.jsx("p",{style:{fontSize:"13px",color:"#64748b",marginBottom:"16px"},children:"Configura la evaluación de todos los docentes que imparten clase al alumno"}),i.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px",cursor:"pointer"},children:[i.jsx("input",{type:"checkbox",checked:u.docenteActivo,onChange:y=>g({...u,docenteActivo:y.target.checked}),style:{width:"18px",height:"18px",cursor:"pointer"}}),i.jsx("span",{style:{fontWeight:"500"},children:"Activar evaluación de docentes"})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[i.jsxs("div",{children:[i.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"600",color:"#64748b",marginBottom:"6px"},children:"Fecha de inicio"}),i.jsx("input",{type:"datetime-local",value:u.fechaInicioDocente,onChange:y=>g({...u,fechaInicioDocente:y.target.value}),disabled:!u.docenteActivo,style:{width:"100%",padding:"10px 12px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontFamily:"inherit",fontSize:"14px",background:u.docenteActivo?"#fff":"#f8fafc"}})]}),i.jsxs("div",{children:[i.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"600",color:"#64748b",marginBottom:"6px"},children:"Fecha de fin"}),i.jsx("input",{type:"datetime-local",value:u.fechaFinDocente,onChange:y=>g({...u,fechaFinDocente:y.target.value}),disabled:!u.docenteActivo,style:{width:"100%",padding:"10px 12px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontFamily:"inherit",fontSize:"14px",background:u.docenteActivo?"#fff":"#f8fafc"}})]})]})]}),i.jsxs("div",{style:{display:"flex",gap:"12px",marginTop:"8px"},children:[i.jsx("button",{onClick:E,disabled:a,style:{flex:2,padding:"14px",background:"linear-gradient(135deg, #1648b8, #2563eb)",border:"none",borderRadius:"12px",fontSize:"16px",fontWeight:"700",color:"#fff",cursor:a?"not-allowed":"pointer",transition:"all 0.2s",opacity:a?.7:1},children:a?"Guardando...":"💾 Guardar configuración"}),i.jsx("button",{onClick:x,disabled:a,style:{flex:1,padding:"14px",background:"#f1f5f9",border:"1.5px solid #e2e8f0",borderRadius:"12px",fontSize:"14px",fontWeight:"600",color:"#475569",cursor:a?"not-allowed":"pointer",transition:"all 0.2s"},children:"🔄 Recargar"})]}),i.jsxs("div",{style:{marginTop:"24px",padding:"16px",background:"#f8fafc",borderRadius:"12px",border:"1px solid #e2e8f0"},children:[i.jsx("h3",{style:{fontSize:"13px",fontWeight:"700",color:"#0f172a",marginBottom:"12px"},children:"📋 Resumen de configuración"}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",fontSize:"12px"},children:[i.jsxs("div",{children:[i.jsx("span",{style:{color:"#64748b"},children:"Evaluación de Tutor:"})," ",i.jsx("span",{style:{fontWeight:"600",color:u.tutorActivo?"#15803d":"#dc2626"},children:u.tutorActivo?"✓ Activa":"✗ Inactiva"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"#64748b"},children:"Evaluación de Docentes:"})," ",i.jsx("span",{style:{fontWeight:"600",color:u.docenteActivo?"#15803d":"#dc2626"},children:u.docenteActivo?"✓ Activa":"✗ Inactiva"})]}),u.tutorActivo&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{children:[i.jsx("span",{style:{color:"#64748b"},children:"Inicio Tutor:"})," ",i.jsx("span",{style:{fontWeight:"500"},children:((p=u.fechaInicioTutor)==null?void 0:p.replace("T"," "))||"No configurado"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"#64748b"},children:"Fin Tutor:"})," ",i.jsx("span",{style:{fontWeight:"500"},children:((f=u.fechaFinTutor)==null?void 0:f.replace("T"," "))||"No configurado"})]})]}),u.docenteActivo&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{children:[i.jsx("span",{style:{color:"#64748b"},children:"Inicio Docentes:"})," ",i.jsx("span",{style:{fontWeight:"500"},children:((h=u.fechaInicioDocente)==null?void 0:h.replace("T"," "))||"No configurado"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"#64748b"},children:"Fin Docentes:"})," ",i.jsx("span",{style:{fontWeight:"500"},children:((b=u.fechaFinDocente)==null?void 0:b.replace("T"," "))||"No configurado"})]})]})]})]})]})}const wh=()=>window.location.origin,jh=wh();function kh(){return localStorage.getItem("token")}function Sh(){return{Authorization:`Bearer ${kh()}`,"Content-Type":"application/json"}}async function Nh(e){const t=await fetch(`${jh}/api/dashboard/departamentos?idPeriodo=${e}`,{headers:Sh()});if(t.status===401)throw new Error("Sesión expirada");if(!t.ok){const r=await t.json().catch(()=>({}));throw new Error(r.error||"Error al obtener departamentos")}return(await t.json()).departamentos||[]}const Tt={EXCELENTE:{bg:"#f0fdf4",border:"#86efac",text:"#15803d",badge:"#dcfce7"},"MUY BUENO":{bg:"#f0f9ff",border:"#7dd3fc",text:"#0369a1",badge:"#dbeafe"},BUENO:{bg:"#fffbeb",border:"#fcd34d",text:"#b45309",badge:"#fef3c7"},REGULAR:{bg:"#fff7ed",border:"#fdba74",text:"#c2410c",badge:"#ffedd5"},DEFICIENTE:{bg:"#fef2f2",border:"#fca5a5",text:"#b91c1c",badge:"#fee2e2"},"SIN DATOS":{bg:"#f8fafc",border:"#e2e8f0",text:"#94a3b8",badge:"#f1f5f9"}},jd=["#2563eb","#7c3aed","#0891b2","#059669","#d97706","#dc2626","#db2777","#16a34a","#9333ea"];function kd(e){return e>=4.5?"EXCELENTE":e>=3.5?"MUY BUENO":e>=2.5?"BUENO":e>=1.5?"REGULAR":e>0?"DEFICIENTE":"SIN DATOS"}function Eh({datos:e}){return i.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:Ye.map((t,n)=>{const r=e[t.id]??0,o=Tt[kd(r)];return i.jsxs("div",{children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},children:[i.jsxs("span",{style:{fontSize:11.5,fontWeight:600,color:"#475569",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingRight:8},children:[n+1,". ",t.nombre]}),i.jsx("span",{style:{fontSize:13,fontWeight:800,color:o.text,flexShrink:0},children:r.toFixed(1)})]}),i.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:99,overflow:"hidden"},children:i.jsx("div",{style:{height:"100%",width:`${r/5*100}%`,background:jd[n],borderRadius:99,transition:"width .6s cubic-bezier(.16,1,.3,1)"}})})]},t.id)})})}function Ch({datos:e,size:t=260}){const n=t/2,r=t/2,o=t*.38,a=Ye.length,l=d=>d*2*Math.PI/a-Math.PI/2,s=(d,m)=>({x:n+m*Math.cos(l(d)),y:r+m*Math.sin(l(d))}),c=Ye.map((d,m)=>s(m,(e[d.id]??0)/5*o));return i.jsxs("svg",{viewBox:`0 0 ${t} ${t}`,style:{width:"100%",maxWidth:t,display:"block",margin:"0 auto"},children:[[1,2,3,4,5].map(d=>{const m=Ye.map((u,g)=>s(g,d/5*o));return i.jsx("path",{d:m.map((u,g)=>`${g===0?"M":"L"}${u.x} ${u.y}`).join(" ")+"Z",fill:"none",stroke:"#e2e8f0",strokeWidth:1},d)}),Ye.map((d,m)=>{const u=s(m,o);return i.jsx("line",{x1:n,y1:r,x2:u.x,y2:u.y,stroke:"#e2e8f0",strokeWidth:1},m)}),i.jsx("polygon",{points:c.map(d=>`${d.x},${d.y}`).join(" "),fill:"rgba(37,99,235,.18)",stroke:"#2563eb",strokeWidth:2.2,strokeLinejoin:"round"}),c.map((d,m)=>i.jsx("circle",{cx:d.x,cy:d.y,r:4,fill:"#2563eb",stroke:"#fff",strokeWidth:1.5},m)),Ye.map((d,m)=>{const u=s(m,o+20);return i.jsx("text",{x:u.x,y:u.y,textAnchor:"middle",dominantBaseline:"middle",fontSize:10,fontWeight:700,fill:"#475569",children:m+1},m)})]})}function zh(e,t){if(!e)return;const{docente:n,periodo:r,promediosCat:o,promedioGeneral:a,clasificacion:l,completaron:s,faltantes:c}=e,d=[["SISTEMA DE EVALUACIÓN DOCENTE — ITSSNP"],["Docente:",n.nombre],["Periodo:",r.nombre],...t?[["Grupo:",t]]:[],["Promedio:",a,"Clasificación:",l],[],["#","Criterio","Promedio"],...Ye.map((u,g)=>{var x;return[g+1,u.nombre,((x=o[u.id])==null?void 0:x.toFixed(2))??"—"]}),[],["COMPLETARON"],["No.Control","Nombre","Grupo","Carrera"],...s.map(u=>[u.numControl||u.num_control,u.nombre||u.nombre_completo,u.grupo||u.Clave||u.clave||"—",u.carrera||u.Carrera||u.carrera_nombre]),[],["PENDIENTES"],["No.Control","Nombre","Grupo","Carrera"],...c.map(u=>[u.numControl||u.num_control,u.nombre||u.nombre_completo,u.grupo||u.Clave||u.clave||"—",u.carrera||u.Carrera||u.carrera_nombre])],m=document.createElement("a");m.href=URL.createObjectURL(new Blob(["\uFEFF"+d.map(u=>u.map(g=>`"${String(g??"").replace(/"/g,'""')}"`).join(",")).join(`
`)],{type:"text/csv;charset=utf-8;"})),m.download=`evaluacion_${n.nombre.replace(/\s+/g,"_")}.csv`,m.click()}function Ph(e,t){if(!e)return;const{docente:n,periodo:r,promediosCat:o,promedioGeneral:a,clasificacion:l,completaron:s,faltantes:c}=e,d=x=>`<Cell><Data ss:Type="String">${String(x??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</Data></Cell>`,m=x=>`<Cell><Data ss:Type="Number">${x}</Data></Cell>`,u=`<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Resultados"><Table>
<Row><Cell><Data ss:Type="String">Docente: ${n.nombre}</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">Periodo: ${r.nombre}</Data></Cell></Row>
${t?`<Row><Cell><Data ss:Type="String">Grupo: ${t}</Data></Cell></Row>`:""}
<Row><Cell><Data ss:Type="String">Promedio: ${a}</Data></Cell><Cell><Data ss:Type="String">Clasificación: ${l}</Data></Cell></Row>
<Row/>${Ye.map((x,w)=>`<Row>${m(w+1)}${d(x.nombre)}${m((o[x.id]??0).toFixed(2))}</Row>`).join("")}
<Row/><Row><Cell><Data ss:Type="String">COMPLETARON</Data></Cell></Row>
${s.map(x=>`<Row>${m(x.numControl||x.num_control)}${d(x.nombre||x.nombre_completo)}${d(x.grupo||x.Clave||x.clave||"—")}${d(x.carrera||x.Carrera||x.carrera_nombre)}</Row>`).join("")}
<Row/><Row><Cell><Data ss:Type="String">PENDIENTES</Data></Cell></Row>
${c.map(x=>`<Row>${m(x.numControl||x.num_control)}${d(x.nombre||x.nombre_completo)}${d(x.grupo||x.Clave||x.clave||"—")}${d(x.carrera||x.Carrera||x.carrera_nombre)}</Row>`).join("")}
</Table></Worksheet></Workbook>`,g=document.createElement("a");g.href=URL.createObjectURL(new Blob([u],{type:"application/vnd.ms-excel;charset=utf-8;"})),g.download=`evaluacion_${n.nombre.replace(/\s+/g,"_")}.xls`,g.click()}function Th({idPeriodo:e,onVerDocente:t}){const[n,r]=v.useState([]),[o,a]=v.useState(!1),[l,s]=v.useState(null),[c,d]=v.useState(null);return v.useEffect(()=>{if(!e){r([]);return}a(!0),s(null),Nh(e).then(r).catch(m=>s(m.message)).finally(()=>a(!1))},[e]),e?o?i.jsx("div",{className:"db-depto-wrap",children:i.jsxs("div",{className:"db-depto-header",children:[i.jsx("span",{className:"db-depto-title",children:"🏢 Estadísticas por departamento"}),i.jsx("div",{className:"db-spinner-sm"})]})}):l?i.jsx("div",{className:"db-depto-wrap",children:i.jsxs("div",{className:"db-depto-header",children:[i.jsx("span",{className:"db-depto-title",children:"🏢 Estadísticas por departamento"}),i.jsxs("span",{style:{fontSize:12,color:"#ef4444"},children:["⚠️ ",l]})]})}):n.length?i.jsxs("div",{className:"db-depto-wrap",children:[i.jsxs("div",{className:"db-depto-header",children:[i.jsx("span",{className:"db-depto-title",children:"🏢 Estadísticas por departamento"}),i.jsxs("span",{className:"db-depto-sub",children:[n.length," departamentos · ordenados por promedio"]})]}),i.jsx("div",{className:"db-depto-cards",children:n.map((m,u)=>{var E,p;const g=Tt[m.clasificacion]??Tt["SIN DATOS"],x=m.totalDocentes>0?Math.round(m.docentesEvaluados/m.totalDocentes*100):0,w=c===m.nombre,j=u===0?"🥇":u===1?"🥈":u===2?"🥉":null;return i.jsxs("div",{className:"db-depto-card",style:{borderColor:w?g.text:g.border,background:w?g.bg:"#fff"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:10},children:[i.jsxs("div",{style:{flex:1,minWidth:0},children:[j&&i.jsxs("span",{style:{fontSize:14},children:[j," "]}),i.jsx("span",{style:{fontSize:12,fontWeight:800,color:"#0f172a",lineHeight:1.3},children:m.nombre})]}),i.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[i.jsx("div",{style:{fontSize:22,fontWeight:800,color:g.text,lineHeight:1},children:(E=m.promedioGeneral)==null?void 0:E.toFixed(2)}),i.jsx("div",{style:{fontSize:9,color:g.text,fontWeight:700,opacity:.7},children:"/ 5.00"})]})]}),i.jsx("div",{style:{marginBottom:10},children:i.jsx("span",{style:{background:g.badge,color:g.text,borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".04em"},children:m.clasificacion})}),i.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10},children:[{lbl:"Docentes",val:`${m.docentesEvaluados}/${m.totalDocentes}`,sub:`${x}% eval.`},{lbl:"Participación",val:`${m.participacionAlumnos}%`,sub:"alumnos"}].map(f=>i.jsxs("div",{style:{background:"#f8faff",borderRadius:8,padding:"6px 8px"},children:[i.jsx("div",{style:{fontSize:13,fontWeight:800,color:"#0f172a"},children:f.val}),i.jsx("div",{style:{fontSize:10,color:"#64748b",fontWeight:600},children:f.lbl}),i.jsx("div",{style:{fontSize:9,color:"#94a3b8"},children:f.sub})]},f.lbl))}),i.jsx("div",{style:{height:4,background:"#f1f5f9",borderRadius:99,overflow:"hidden",marginBottom:10},children:i.jsx("div",{style:{height:"100%",width:`${m.promedioGeneral/5*100}%`,background:g.text,borderRadius:99,transition:"width .7s ease"}})}),i.jsx("button",{onClick:()=>d(w?null:m.nombre),style:{width:"100%",padding:"5px 0",background:w?g.text:"#f1f5ff",border:`1.5px solid ${w?g.text:"#c7d2fe"}`,borderRadius:7,fontSize:11,fontWeight:700,color:w?"#fff":"#1e40af",cursor:"pointer",transition:"all .15s"},children:w?"▲ Cerrar ranking":`▼ Ver ranking (${((p=m.docentes)==null?void 0:p.length)??0})`}),w&&i.jsx("div",{style:{marginTop:10,borderTop:`1px solid ${g.border}`,paddingTop:10,display:"flex",flexDirection:"column",gap:6},children:[...m.docentes||[]].sort((f,h)=>h.promedio-f.promedio).map((f,h)=>{var k;const b=Tt[f.clasificacion]??Tt["SIN DATOS"],y=h===0?"🥇":h===1?"🥈":h===2?"🥉":`${h+1}.`;return i.jsxs("div",{style:{background:"#fff",border:"1px solid #e8eeff",borderRadius:8,padding:"8px 10px"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:4},children:[i.jsx("span",{style:{fontSize:h<3?13:11,fontWeight:800,minWidth:20},children:y}),i.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#0f172a",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:f.nombre}),i.jsx("span",{style:{fontSize:13,fontWeight:800,color:b.text,flexShrink:0},children:(k=f.promedio)==null?void 0:k.toFixed(2)})]}),i.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6},children:[i.jsx("span",{style:{background:b.badge,color:b.text,borderRadius:4,padding:"1px 6px",fontSize:9,fontWeight:800,textTransform:"uppercase"},children:f.clasificacion}),i.jsxs("span",{style:{fontSize:10,color:"#94a3b8"},children:[f.alumnosCompletaron,"/",f.totalAlumnos," alumnos"]}),i.jsx("button",{onClick:()=>t(f.id),style:{background:"#1e40af",border:"none",borderRadius:5,padding:"3px 8px",fontSize:10,fontWeight:700,color:"#fff",cursor:"pointer"},children:"Ver →"})]})]},f.id)})})]},m.nombre)})})]}):null:null}function _h(){const e=cn(),{user:t,logout:n}=sn(),[r,o]=v.useState([]),[a,l]=v.useState([]),[s,c]=v.useState([]),[d,m]=v.useState(""),[u,g]=v.useState(""),[x,w]=v.useState(""),[j,E]=v.useState(""),[p,f]=v.useState(null),[h,b]=v.useState(!1),[y,k]=v.useState(null),[C,z]=v.useState(!0),[D,I]=v.useState(!0),[G,ye]=v.useState(!1),[ue,O]=v.useState(null),[q,te]=v.useState(null),[be,P]=v.useState(null),[_,R]=v.useState("completaron"),[A,V]=v.useState("barras"),[K,re]=v.useState("resultados"),vt=[...new Set(r.map(N=>N.departamento||"Sin Departamento"))].sort(),Te=d?r.filter(N=>(N.departamento||"Sin Departamento")===d):r,qe=r.find(N=>String(N.id)===String(u)),un=j?(()=>{const N=s.find(U=>String(U.id)===String(j));return N?N.Clave||N.clave||`Grupo ${N.id}`:null})():null;v.useEffect(()=>{(!t||t.tipo!=="admin")&&e("/login",{replace:!0})},[t,e]);const $r=v.useCallback(async()=>{try{const N=await Hs();o(N);const U=await Qs();l(U);const me=U.find(We=>We.activo===1||We.activo===!0);me&&!x&&w(String(me.id))}catch(N){console.error("Error recargando datos:",N)}},[x]);v.useEffect(()=>{if(!t||t.tipo!=="admin")return;(async()=>{try{z(!0),o(await Hs()),O(null)}catch(U){O(U.message),U.message.includes("401")&&e("/login",{replace:!0})}finally{z(!1)}try{I(!0);const U=await Qs();l(U),te(null);const me=U.find(We=>We.activo===1||We.activo===!0);me&&w(String(me.id))}catch(U){te(U.message),U.message.includes("401")&&e("/login",{replace:!0})}finally{I(!1)}})()},[t,e]),v.useEffect(()=>{g(""),E(""),c([]),f(null),k(null)},[d]),v.useEffect(()=>{if(!u||!x){c([]),E("");return}ye(!0),dh(Number(u),Number(x)).then(N=>{const U=N.map(me=>({...me,Clave:me.Clave||me.clave||`Grupo ${me.id}`}));c(U),P(null),E("")}).catch(N=>{P(N.message),c([]),E("")}).finally(()=>ye(!1))},[u,x]),v.useEffect(()=>{if(!u||!x){f(null),k(null);return}b(!0),k(null),f(null),Gs(Number(u),Number(x),j?Number(j):void 0).then(f).catch(N=>{k(N.message),N.message.includes("401")&&e("/login",{replace:!0})}).finally(()=>b(!1))},[u,x,j,e]);const dn=v.useCallback(N=>{g(String(N)),window.scrollTo({top:0,behavior:"smooth"})},[]),et=p?Tt[p.clasificacion]??Tt["SIN DATOS"]:{},Ur=p?Math.round(p.completaron.length/p.totalAlumnos*100):0;return i.jsxs(i.Fragment,{children:[i.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),i.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),i.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap",rel:"stylesheet"}),i.jsx("style",{children:`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{height:100%}
        @keyframes _fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes _barIn{from{width:0}to{width:var(--w)}}
        @keyframes _spin{to{transform:rotate(360deg)}}
        @keyframes _slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}

        .db-root{font-family:'DM Sans',sans-serif;min-height:100dvh;background:#f0f4ff;display:flex;flex-direction:column}

        .db-nav{background:linear-gradient(135deg,#0d2660 0%,#1648b8 55%,#0b7ec9 100%);height:64px;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 18px rgba(0,0,0,.28);position:sticky;top:0;z-index:10}
        .db-brand{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700;color:#fff}
        .db-brand-dot{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e}
        .db-nav-r{display:flex;align-items:center;gap:10px}
        .db-nav-user{font-size:13px;color:rgba(255,255,255,.72)}
        .db-nav-badge{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:.04em}
        .db-btn-logout{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:5px 14px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#fff;cursor:pointer;transition:background .15s}
        .db-btn-logout:hover{background:rgba(255,255,255,.24)}

        .db-body{flex:1;padding:clamp(18px,3vw,40px) clamp(14px,4vw,48px);display:flex;flex-direction:column;gap:20px;max-width:1200px;width:100%;margin:0 auto}

        .db-depto-wrap{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:20px 22px;animation:_fadeUp .35s ease both}
        .db-depto-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:16px}
        .db-depto-title{font-size:13px;font-weight:800;color:#0f172a;display:flex;align-items:center;gap:6px}
        .db-depto-sub{font-size:11.5px;color:#94a3b8;font-weight:500}
        .db-spinner-sm{width:18px;height:18px;border:2px solid #e8eeff;border-top-color:#2563eb;border-radius:50%;animation:_spin .7s linear infinite;flex-shrink:0}

        .db-depto-cards{display:flex;gap:14px;overflow-x:auto;padding-bottom:6px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
        .db-depto-cards::-webkit-scrollbar{height:4px}
        .db-depto-cards::-webkit-scrollbar-track{background:#f1f5f9;border-radius:99px}
        .db-depto-cards::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:99px}
        .db-depto-card{flex:0 0 220px;border:1.5px solid;border-radius:14px;padding:14px 14px;scroll-snap-align:start;transition:box-shadow .2s,transform .2s;animation:_slideIn .3s ease both}
        .db-depto-card:hover{box-shadow:0 4px 20px rgba(37,99,235,.12);transform:translateY(-2px)}

        .db-filters{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:22px 24px;display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;animation:_fadeUp .35s ease both}
        .db-fgroup{display:flex;flex-direction:column;gap:6px;flex:1;min-width:175px}
        .db-flabel{font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em;display:flex;align-items:center;gap:6px}
        .db-flabel-step{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#1e40af;color:#fff;font-size:10px;font-weight:800;flex-shrink:0}
        .db-fsel{height:44px;padding:0 14px;background:#f8faff;border:1.5px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:#0f172a;cursor:pointer;outline:none;transition:border-color .15s}
        .db-fsel:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.12)}
        .db-fsel:disabled{opacity:0.5;cursor:not-allowed;background:#f1f5f9}
        .db-fsep{display:flex;align-items:center;padding-bottom:8px;color:#cbd5e1;font-size:18px;flex-shrink:0;align-self:flex-end}

        .db-breadcrumb{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:10px 16px;background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:10px;font-size:12px;font-weight:600;color:#0369a1;animation:_fadeUp .2s ease both}
        .db-breadcrumb-sep{color:#7dd3fc}
        .db-breadcrumb-chip{background:#dbeafe;border-radius:6px;padding:2px 8px;font-weight:700;color:#1e40af}

        .db-empty{background:#fff;border:1.5px dashed #c7d2fe;border-radius:18px;padding:56px 24px;text-align:center;animation:_fadeUp .4s ease both}
        .db-empty-icon{font-size:48px;margin-bottom:14px}
        .db-empty-title{font-size:18px;font-weight:700;color:#334155;margin-bottom:6px}
        .db-empty-sub{font-size:14px;color:#94a3b8}
        .db-empty-steps{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:20px}
        .db-empty-step{display:flex;align-items:center;gap:6px;padding:8px 14px;background:#f8faff;border:1.5px solid #e2e8f0;border-radius:10px;font-size:12px;font-weight:600;color:#64748b}
        .db-empty-step-num{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#e2e8f0;color:#475569;font-size:11px;font-weight:800}
        .db-loading{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:56px 24px;text-align:center;animation:_fadeUp .3s ease both}
        .db-spinner{width:40px;height:40px;border:3px solid #e8eeff;border-top-color:#2563eb;border-radius:50%;animation:_spin .7s linear infinite;margin:0 auto 16px}
        .db-loading-text{font-size:15px;font-weight:600;color:#64748b}
        .db-error{background:#fef2f2;border:1.5px solid #fca5a5;border-radius:18px;padding:32px 24px;text-align:center;animation:_fadeUp .3s ease both}
        .db-error-icon{font-size:40px;margin-bottom:12px}
        .db-error-title{font-size:17px;font-weight:700;color:#b91c1c;margin-bottom:6px}
        .db-error-msg{font-size:13px;color:#ef4444}
        .db-retry-btn{margin-top:16px;padding:9px 22px;background:#b91c1c;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#fff;cursor:pointer}

        .db-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;animation:_fadeUp .35s ease both}
        @media(max-width:900px){.db-grid{grid-template-columns:1fr}}
        .db-card{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:22px 24px}
        .db-card-title{font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px;display:flex;align-items:center;gap:8px}
        .db-card-title-icon{font-size:16px}

        .db-resumen{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
        .db-score-circle{width:86px;height:86px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:3px solid;flex-shrink:0}
        .db-score-num{font-size:24px;font-weight:800;line-height:1}
        .db-score-max{font-size:11px;opacity:.6}
        .db-resumen-info{flex:1;min-width:140px}
        .db-resumen-name{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:2px;line-height:1.3}
        .db-resumen-dept{font-size:11px;font-weight:600;color:#7c3aed;background:#f5f3ff;border-radius:5px;padding:2px 7px;display:inline-block;margin-bottom:4px}
        .db-resumen-period{font-size:13px;color:#64748b;margin-bottom:10px}
        .db-clasif-badge{display:inline-flex;align-items:center;gap:6px;border-radius:8px;padding:5px 12px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em}

        .db-prog-info{display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:8px}
        .db-prog-track{height:10px;background:#f1f5f9;border-radius:99px;overflow:hidden}
        .db-prog-fill{height:100%;background:linear-gradient(90deg,#2563eb,#22c55e);border-radius:99px;width:var(--w);animation:_barIn .8s cubic-bezier(.16,1,.3,1) both}

        .db-tabs{display:flex;gap:2px;background:#f1f5f9;border-radius:10px;padding:3px;margin-bottom:14px}
        .db-tab{flex:1;padding:7px 0;border-radius:8px;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;background:transparent;color:#64748b}
        .db-tab-active{background:#fff;color:#1e40af;box-shadow:0 1px 6px rgba(0,0,0,.08)}

        .db-table-wrap{overflow-x:auto;border-radius:10px;border:1.5px solid #e8eeff}
        .db-table{width:100%;border-collapse:collapse;font-size:13px}
        .db-table th{background:#f8faff;padding:10px 14px;text-align:left;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1.5px solid #e8eeff}
        .db-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#334155;vertical-align:middle}
        .db-table tr:last-child td{border-bottom:none}
        .db-table tr:hover td{background:#fafbff}
        .db-nc{font-family:monospace;font-weight:700;color:#3b4fd8;font-size:12px}
        .db-chip-carrera{background:#f1f5ff;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#3b4fd8}
        .db-chip-grupo{background:#f5f0ff;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#7c3aed}
        .db-chip-pend{background:#fff7ed;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#c2410c}

        .db-export-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
        .db-exp-btn{height:42px;padding:0 20px;border-radius:10px;border:1.5px solid;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .16s}
        .db-exp-csv{background:#f0fdf4;border-color:#86efac;color:#15803d}.db-exp-csv:hover{background:#dcfce7}
        .db-exp-xls{background:#f0f9ff;border-color:#7dd3fc;color:#0369a1}.db-exp-xls:hover{background:#dbeafe}

        .db-chart-toggle{display:flex;gap:6px;margin-bottom:16px}
        .db-ctoggle-btn{flex:1;padding:7px 0;border-radius:8px;border:1.5px solid #e2e8f0;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .15s;background:#f8faff;color:#64748b}
        .db-ctoggle-btn.active{background:#1e40af;border-color:#1e40af;color:#fff}

        .db-footer{text-align:center;padding:18px;font-size:11px;color:#94a3b8}
      `}),i.jsxs("div",{className:"db-root",children:[i.jsxs("nav",{className:"db-nav",children:[i.jsxs("div",{className:"db-brand",children:[i.jsx("span",{className:"db-brand-dot"}),"SICOT · Dashboard"]}),i.jsxs("div",{className:"db-nav-r",children:[i.jsx("span",{className:"db-nav-badge",children:"Admin"}),i.jsx("span",{className:"db-nav-user",children:(t==null?void 0:t.nombre)||"Admin"}),i.jsx("button",{className:"db-btn-logout",onClick:n,children:"Cerrar sesión"})]})]}),i.jsxs("div",{className:"db-body",children:[i.jsxs("div",{style:{display:"flex",gap:"12px",background:"#fff",borderRadius:"16px",padding:"6px",border:"1.5px solid #e2e8f0",marginBottom:"24px"},children:[i.jsx("button",{onClick:()=>re("resultados"),style:{flex:1,padding:"12px 20px",border:"none",borderRadius:"12px",fontSize:"14px",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",background:K==="resultados"?"linear-gradient(135deg, #1648b8, #2563eb)":"transparent",color:K==="resultados"?"#fff":"#64748b"},children:"📊 Resultados de Evaluación"}),i.jsx("button",{onClick:()=>re("configuracion"),style:{flex:1,padding:"12px 20px",border:"none",borderRadius:"12px",fontSize:"14px",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",background:K==="configuracion"?"linear-gradient(135deg, #1648b8, #2563eb)":"transparent",color:K==="configuracion"?"#fff":"#64748b"},children:"⚙️ Configuración de Evaluaciones"})]}),K==="resultados"?i.jsxs(i.Fragment,{children:[i.jsx(Th,{idPeriodo:x,onVerDocente:dn}),i.jsxs("div",{className:"db-filters",children:[i.jsxs("div",{className:"db-fgroup",children:[i.jsxs("label",{className:"db-flabel",children:[i.jsx("span",{className:"db-flabel-step",children:"1"}),"Departamento"]}),i.jsx("select",{className:"db-fsel",value:d,onChange:N=>m(N.target.value),disabled:C||!!ue,children:C?i.jsx("option",{children:"Cargando…"}):ue?i.jsx("option",{children:"Error al cargar"}):i.jsxs(i.Fragment,{children:[i.jsx("option",{value:"",children:"— Todos los departamentos —"}),vt.map(N=>i.jsxs("option",{value:N,children:[N," (",r.filter(U=>(U.departamento||"Sin Departamento")===N).length,")"]},N))]})})]}),i.jsx("div",{className:"db-fsep",children:"›"}),i.jsxs("div",{className:"db-fgroup",children:[i.jsxs("label",{className:"db-flabel",children:[i.jsx("span",{className:"db-flabel-step",children:"2"}),"Docente / Tutor"]}),i.jsx("select",{className:"db-fsel",value:u,onChange:N=>g(N.target.value),disabled:C||!!ue,children:C?i.jsx("option",{children:"Cargando…"}):ue?i.jsx("option",{children:"Error"}):i.jsxs(i.Fragment,{children:[i.jsx("option",{value:"",children:d?`— Docentes (${Te.length}) —`:"— Selecciona un docente —"}),Te.map(N=>i.jsx("option",{value:N.id,children:N.nombre},N.id))]})})]}),i.jsx("div",{className:"db-fsep",children:"›"}),i.jsxs("div",{className:"db-fgroup",children:[i.jsxs("label",{className:"db-flabel",children:[i.jsx("span",{className:"db-flabel-step",children:"3"}),"Periodo escolar"]}),i.jsx("select",{className:"db-fsel",value:x,onChange:N=>w(N.target.value),disabled:D||!!q,children:D?i.jsx("option",{children:"Cargando…"}):q?i.jsx("option",{children:"Error"}):i.jsxs(i.Fragment,{children:[i.jsx("option",{value:"",children:"— Selecciona un periodo —"}),a.map(N=>i.jsxs("option",{value:N.id,children:[N.Nombre||N.nombre||`Periodo ${N.id}`,N.activo===1||N.activo===!0?" ★ Activo":""]},N.id))]})})]}),i.jsx("div",{className:"db-fsep",children:"›"}),i.jsxs("div",{className:"db-fgroup",children:[i.jsxs("label",{className:"db-flabel",children:[i.jsx("span",{className:"db-flabel-step",children:"4"}),"Grupo ",i.jsx("span",{style:{fontWeight:400,textTransform:"none",letterSpacing:0,color:"#94a3b8"},children:"(opcional)"})]}),i.jsx("select",{className:"db-fsel",value:j,onChange:N=>E(N.target.value),disabled:!u||!x||G||!!be,children:!u||!x?i.jsx("option",{value:"",children:"Selecciona docente y periodo"}):G?i.jsx("option",{children:"Cargando grupos…"}):be?i.jsx("option",{children:"Error al cargar grupos"}):i.jsxs(i.Fragment,{children:[i.jsx("option",{value:"",children:"— Todos los grupos —"}),s.map(N=>i.jsx("option",{value:N.id,children:N.Clave||N.clave||`Grupo ${N.id}`},N.id))]})})]})]}),(d||u||j)&&i.jsxs("div",{className:"db-breadcrumb",children:[i.jsx("span",{children:"🔍 Filtrando:"}),d&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"db-breadcrumb-sep",children:"›"}),i.jsxs("span",{children:["Depto. ",i.jsx("span",{className:"db-breadcrumb-chip",children:d})]})]}),qe&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"db-breadcrumb-sep",children:"›"}),i.jsxs("span",{children:["Docente ",i.jsx("span",{className:"db-breadcrumb-chip",children:qe.nombre})]})]}),un&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"db-breadcrumb-sep",children:"›"}),i.jsxs("span",{children:["Grupo ",i.jsx("span",{className:"db-breadcrumb-chip",children:un})]})]}),i.jsx("button",{onClick:()=>{m(""),g(""),E(""),f(null),k(null)},style:{marginLeft:"auto",background:"none",border:"1px solid #bae6fd",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700,color:"#0369a1",cursor:"pointer"},children:"✕ Limpiar"})]}),!h&&!y&&!p&&i.jsxs("div",{className:"db-empty",children:[i.jsx("div",{className:"db-empty-icon",children:"📊"}),i.jsx("p",{className:"db-empty-title",children:"Selecciona un docente para ver su evaluación"}),i.jsx("p",{className:"db-empty-sub",children:'Usa los filtros de arriba o haz clic en "Ver →" desde el ranking de cualquier departamento.'}),i.jsx("div",{className:"db-empty-steps",children:["Departamento","Docente","Periodo","Grupo (opcional)"].map((N,U)=>i.jsxs("div",{className:"db-empty-step",children:[i.jsx("span",{className:"db-empty-step-num",children:U+1}),N]},N))})]}),h&&i.jsxs("div",{className:"db-loading",children:[i.jsx("div",{className:"db-spinner"}),i.jsx("p",{className:"db-loading-text",children:"Cargando resultados…"})]}),!h&&y&&i.jsxs("div",{className:"db-error",children:[i.jsx("div",{className:"db-error-icon",children:"⚠️"}),i.jsx("p",{className:"db-error-title",children:"No se pudieron cargar los resultados"}),i.jsx("p",{className:"db-error-msg",children:y}),i.jsx("button",{className:"db-retry-btn",onClick:()=>{u&&x&&(b(!0),Gs(Number(u),Number(x),j?Number(j):void 0).then(f).catch(N=>k(N.message)).finally(()=>b(!1)))},children:"🔄 Reintentar"})]}),!h&&!y&&p&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"db-grid",children:[i.jsxs("div",{className:"db-card",style:{borderColor:et.border,background:et.bg},children:[i.jsxs("p",{className:"db-card-title",children:[i.jsx("span",{className:"db-card-title-icon",children:"🏅"}),"Calificación general"]}),i.jsxs("div",{className:"db-resumen",children:[i.jsxs("div",{className:"db-score-circle",style:{borderColor:et.text,color:et.text},children:[i.jsx("span",{className:"db-score-num",children:p.promedioGeneral}),i.jsx("span",{className:"db-score-max",children:"/ 5.00"})]}),i.jsxs("div",{className:"db-resumen-info",children:[i.jsx("p",{className:"db-resumen-name",children:p.docente.nombre}),d&&i.jsxs("span",{className:"db-resumen-dept",children:["🏢 ",d]}),i.jsx("p",{className:"db-resumen-period",children:p.periodo.nombre}),i.jsxs("div",{className:"db-clasif-badge",style:{background:et.badge,color:et.text},children:["★ ",p.clasificacion]})]})]})]}),i.jsxs("div",{className:"db-card",children:[i.jsxs("p",{className:"db-card-title",children:[i.jsx("span",{className:"db-card-title-icon",children:"👥"}),"Participación de alumnos"]}),i.jsx("div",{style:{display:"flex",gap:16,marginBottom:18},children:[{lbl:"Total",val:p.totalAlumnos,col:"#1e40af",bg:"#eff2ff"},{lbl:"Completaron",val:p.completaron.length,col:"#15803d",bg:"#f0fdf4"},{lbl:"Pendientes",val:p.faltantes.length,col:"#c2410c",bg:"#fff7ed"}].map(N=>i.jsxs("div",{style:{flex:1,background:N.bg,borderRadius:12,padding:"12px 14px",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:24,fontWeight:800,color:N.col},children:N.val}),i.jsx("div",{style:{fontSize:11,fontWeight:600,color:N.col,opacity:.75,textTransform:"uppercase",letterSpacing:".04em"},children:N.lbl})]},N.lbl))}),i.jsxs("div",{className:"db-prog-info",children:[i.jsx("span",{style:{color:"#15803d",fontWeight:700},children:"Completado"}),i.jsxs("span",{style:{color:"#15803d"},children:[Ur,"%"]})]}),i.jsx("div",{className:"db-prog-track",children:i.jsx("div",{className:"db-prog-fill",style:{"--w":`${Ur}%`}})})]})]}),i.jsxs("div",{className:"db-grid",children:[i.jsxs("div",{className:"db-card",children:[i.jsxs("p",{className:"db-card-title",children:[i.jsx("span",{className:"db-card-title-icon",children:"📈"}),"Resultados por criterio"]}),i.jsxs("div",{className:"db-chart-toggle",children:[i.jsx("button",{className:`db-ctoggle-btn${A==="barras"?" active":""}`,onClick:()=>V("barras"),children:"▬ Barras"}),i.jsx("button",{className:`db-ctoggle-btn${A==="radar"?" active":""}`,onClick:()=>V("radar"),children:"◉ Radar"})]}),A==="barras"?i.jsx(Eh,{datos:p.promediosCat}):i.jsxs("div",{children:[i.jsx(Ch,{datos:p.promediosCat}),i.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10,justifyContent:"center"},children:Ye.map((N,U)=>i.jsxs("span",{style:{fontSize:10.5,fontWeight:600,color:"#64748b",background:"#f1f5f9",borderRadius:5,padding:"2px 6px"},children:[U+1,". ",N.nombre.split(" ").slice(0,3).join(" "),"…"]},N.id))})]})]}),i.jsxs("div",{className:"db-card",children:[i.jsxs("p",{className:"db-card-title",children:[i.jsx("span",{className:"db-card-title-icon",children:"👤"}),"Lista de alumnos"]}),i.jsxs("div",{className:"db-tabs",children:[i.jsxs("button",{className:`db-tab${_==="completaron"?" db-tab-active":""}`,onClick:()=>R("completaron"),children:["✅ Completaron (",p.completaron.length,")"]}),i.jsxs("button",{className:`db-tab${_==="faltantes"?" db-tab-active":""}`,onClick:()=>R("faltantes"),children:["⏳ Pendientes (",p.faltantes.length,")"]})]}),i.jsx("div",{className:"db-table-wrap",children:i.jsxs("table",{className:"db-table",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"No. Control"}),i.jsx("th",{children:"Nombre"}),i.jsx("th",{children:"Grupo"}),i.jsx("th",{children:"Carrera"}),i.jsx("th",{children:"Estado"})]})}),i.jsxs("tbody",{children:[(_==="completaron"?p.completaron:p.faltantes).map((N,U)=>i.jsxs("tr",{children:[i.jsx("td",{className:"db-nc",children:N.numControl||N.num_control}),i.jsx("td",{style:{fontWeight:600},children:N.nombre||N.nombre_completo}),i.jsx("td",{children:i.jsx("span",{className:"db-chip-grupo",children:N.grupo||N.Clave||N.clave||"—"})}),i.jsx("td",{children:i.jsx("span",{className:"db-chip-carrera",children:N.carrera||N.Carrera||N.carrera_nombre})}),i.jsx("td",{children:_==="completaron"?i.jsx("span",{style:{color:"#15803d",fontWeight:700,fontSize:12},children:"✓ Completada"}):i.jsx("span",{className:"db-chip-pend",children:"⏳ Pendiente"})})]},`${_}-${N.numControl||N.num_control||U}`)),(_==="completaron"&&p.completaron.length===0||_==="faltantes"&&p.faltantes.length===0)&&i.jsx("tr",{children:i.jsx("td",{colSpan:"5",style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No hay alumnos en esta categoría"})})]})]})}),i.jsxs("div",{className:"db-export-row",children:[i.jsx("button",{className:"db-exp-btn db-exp-csv",onClick:()=>zh(p,un),children:"📄 Exportar CSV"}),i.jsx("button",{className:"db-exp-btn db-exp-xls",onClick:()=>Ph(p,un),children:"📊 Exportar Excel"})]})]})]}),i.jsxs("div",{className:"db-card",children:[i.jsxs("p",{className:"db-card-title",children:[i.jsx("span",{className:"db-card-title-icon",children:"📋"}),"Detalle por criterio de evaluación"]}),i.jsx("div",{style:{overflowX:"auto"},children:i.jsxs("table",{className:"db-table",style:{minWidth:600},children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{style:{width:30},children:"#"}),i.jsx("th",{children:"Criterio"}),i.jsx("th",{style:{width:100,textAlign:"center"},children:"Promedio"}),i.jsx("th",{style:{width:130},children:"Clasificación"}),i.jsx("th",{style:{width:160},children:"Nivel"})]})}),i.jsx("tbody",{children:Ye.map((N,U)=>{const me=p.promediosCat[N.id]??0,We=kd(me),fn=Tt[We];return i.jsxs("tr",{children:[i.jsx("td",{style:{fontWeight:800,color:"#94a3b8"},children:U+1}),i.jsx("td",{style:{fontWeight:600,color:"#0f172a"},children:N.nombre}),i.jsx("td",{style:{textAlign:"center",fontWeight:800,color:fn.text,fontSize:16},children:me.toFixed(1)}),i.jsx("td",{children:i.jsx("span",{style:{background:fn.badge,color:fn.text,borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:800,textTransform:"uppercase"},children:We})}),i.jsx("td",{children:i.jsx("div",{style:{height:7,background:"#f1f5f9",borderRadius:99,overflow:"hidden"},children:i.jsx("div",{style:{height:"100%",width:`${me/5*100}%`,background:jd[U],borderRadius:99}})})})]},N.id)})})]})})]})]})]}):i.jsx(bh,{onConfigChange:$r})]}),i.jsx("footer",{className:"db-footer",children:"© 2026 · ITSSNP · Sistema de Evaluación Docente · SWATCorps"})]})]})}function Ih(){const e=cn(),{idDoce:t}=xd();return i.jsx("div",{style:{fontFamily:"'DM Sans', sans-serif",minHeight:"100dvh",background:"#eef2ff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16},children:i.jsxs("div",{style:{background:"#fff",borderRadius:16,padding:"32px 40px",textAlign:"center",boxShadow:"0 4px 24px rgba(30,64,175,.08)"},children:[i.jsx("p",{style:{fontSize:40,marginBottom:12},children:"📊"}),i.jsxs("h2",{style:{color:"#0f172a",fontSize:20,fontWeight:700,marginBottom:8},children:["Detalle del Docente #",t]}),i.jsx("p",{style:{color:"#64748b",fontSize:14,marginBottom:24},children:"Esta sección está en desarrollo."}),i.jsx("button",{onClick:()=>e("/dashboard"),style:{background:"#1e40af",color:"#fff",border:"none",borderRadius:10,padding:"10px 24px",cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:600},children:"← Volver al Dashboard"})]})})}function Rh({children:e}){const{user:t}=sn();return t?i.jsx(Tr,{to:t.tipo==="admin"?"/dashboard":"/panel-alumno",replace:!0}):e}function Jn({children:e,roles:t}){const{user:n}=sn();return n?t&&!t.includes(n.tipo)?i.jsx(Tr,{to:n.tipo==="admin"?"/dashboard":"/panel-alumno",replace:!0}):e:i.jsx(Tr,{to:"/login",replace:!0})}function Dh(){return i.jsx(nh,{children:i.jsxs(qm,{children:[i.jsx(lt,{path:"/",element:i.jsx(Tr,{to:"/login",replace:!0})}),i.jsx(lt,{path:"/login",element:i.jsx(Rh,{children:i.jsx(rh,{})})}),i.jsx(lt,{path:"/panel-alumno",element:i.jsx(Jn,{roles:["alumno"],children:i.jsx(fh,{})})}),i.jsx(lt,{path:"/evaluacion/:idGrupo",element:i.jsx(Jn,{roles:["alumno"],children:i.jsx(gh,{})})}),i.jsx(lt,{path:"/gracias",element:i.jsx(Jn,{roles:["alumno"],children:i.jsx(xh,{})})}),i.jsx(lt,{path:"/dashboard",element:i.jsx(Jn,{roles:["admin"],children:i.jsx(_h,{})})}),i.jsx(lt,{path:"/dashboard/docente/:idDoce",element:i.jsx(Jn,{roles:["admin"],children:i.jsx(Ih,{})})}),i.jsx(lt,{path:"*",element:i.jsx(Tr,{to:"/login",replace:!0})})]})})}id(document.getElementById("root")).render(i.jsx(v.StrictMode,{children:i.jsx(sm,{children:i.jsx(Dh,{})})}));
