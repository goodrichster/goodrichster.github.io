/*! Framework 1.1.0 - 2015-12-28 4:22:48 PM EST - dgoo */
/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(t,e){"use strict";function n(){if(!i.READY){i.event.determineEventTypes();for(var t in i.gestures)i.gestures.hasOwnProperty(t)&&i.detection.register(i.gestures[t]);i.event.onTouch(i.DOCUMENT,i.EVENT_MOVE,i.detection.detect),i.event.onTouch(i.DOCUMENT,i.EVENT_END,i.detection.detect),i.READY=!0}}var i=function(t,e){return new i.Instance(t,e||{})};i.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},i.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,i.HAS_TOUCHEVENTS="ontouchstart"in t,i.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,i.NO_MOUSEEVENTS=i.HAS_TOUCHEVENTS&&navigator.userAgent.match(i.MOBILE_REGEX),i.EVENT_TYPES={},i.DIRECTION_DOWN="down",i.DIRECTION_LEFT="left",i.DIRECTION_UP="up",i.DIRECTION_RIGHT="right",i.POINTER_MOUSE="mouse",i.POINTER_TOUCH="touch",i.POINTER_PEN="pen",i.EVENT_START="start",i.EVENT_MOVE="move",i.EVENT_END="end",i.DOCUMENT=document,i.plugins={},i.READY=!1,i.Instance=function(t,e){var r=this;return n(),this.element=t,this.enabled=!0,this.options=i.utils.extend(i.utils.extend({},i.defaults),e||{}),this.options.stop_browser_behavior&&i.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),i.event.onTouch(t,i.EVENT_START,function(t){r.enabled&&i.detection.startDetect(r,t)}),this},i.Instance.prototype={on:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.addEventListener(n[i],e,!1);return this},off:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.removeEventListener(n[i],e,!1);return this},trigger:function(t,e){var n=i.DOCUMENT.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e;var r=this.element;return i.utils.hasParent(e.target,r)&&(r=e.target),r.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var r=null,o=!1,s=!1;i.event={bindDom:function(t,e,n){for(var i=e.split(" "),r=0;i.length>r;r++)t.addEventListener(i[r],n,!1)},onTouch:function(t,e,n){var a=this;this.bindDom(t,i.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();if(!u.match(/mouse/)||!s){(u.match(/touch/)||u.match(/pointerdown/)||u.match(/mouse/)&&1===c.which)&&(o=!0),u.match(/touch|pointer/)&&(s=!0);var h=0;o&&(i.HAS_POINTEREVENTS&&e!=i.EVENT_END?h=i.PointerEvent.updatePointer(e,c):u.match(/touch/)?h=c.touches.length:s||(h=u.match(/up/)?0:1),h>0&&e==i.EVENT_END?e=i.EVENT_MOVE:h||(e=i.EVENT_END),h||null===r?r=c:c=r,n.call(i.detection,a.collectEventData(t,e,c)),i.HAS_POINTEREVENTS&&e==i.EVENT_END&&(h=i.PointerEvent.updatePointer(e,c))),h||(r=null,o=!1,s=!1,i.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=i.HAS_POINTEREVENTS?i.PointerEvent.getEvents():i.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],i.EVENT_TYPES[i.EVENT_START]=t[0],i.EVENT_TYPES[i.EVENT_MOVE]=t[1],i.EVENT_TYPES[i.EVENT_END]=t[2]},getTouchList:function(t){return i.HAS_POINTEREVENTS?i.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,n){var r=this.getTouchList(n,e),o=i.POINTER_TOUCH;return(n.type.match(/mouse/)||i.PointerEvent.matchType(i.POINTER_MOUSE,n))&&(o=i.POINTER_MOUSE),{center:i.utils.getCenter(r),timeStamp:(new Date).getTime(),target:n.target,touches:r,eventType:e,pointerType:o,srcEvent:n,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return i.detection.stopDetect()}}}},i.PointerEvent={pointers:{},getTouchList:function(){var t=this,e=[];return Object.keys(t.pointers).sort().forEach(function(n){e.push(t.pointers[n])}),e},updatePointer:function(t,e){return t==i.EVENT_END?this.pointers={}:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e),Object.keys(this.pointers).length},matchType:function(t,e){if(!e.pointerType)return!1;var n={};return n[i.POINTER_MOUSE]=e.pointerType==e.MSPOINTER_TYPE_MOUSE||e.pointerType==i.POINTER_MOUSE,n[i.POINTER_TOUCH]=e.pointerType==e.MSPOINTER_TYPE_TOUCH||e.pointerType==i.POINTER_TOUCH,n[i.POINTER_PEN]=e.pointerType==e.MSPOINTER_TYPE_PEN||e.pointerType==i.POINTER_PEN,n[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},i.utils={extend:function(t,n,i){for(var r in n)t[r]!==e&&i||(t[r]=n[r]);return t},hasParent:function(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1},getCenter:function(t){for(var e=[],n=[],i=0,r=t.length;r>i;i++)e.push(t[i].pageX),n.push(t[i].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,i=e.pageX-t.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,e){var n=Math.abs(t.pageX-e.pageX),r=Math.abs(t.pageY-e.pageY);return n>=r?t.pageX-e.pageX>0?i.DIRECTION_LEFT:i.DIRECTION_RIGHT:t.pageY-e.pageY>0?i.DIRECTION_UP:i.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,i=e.pageY-t.pageY;return Math.sqrt(n*n+i*i)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==i.DIRECTION_UP||t==i.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,e){var n,i=["webkit","khtml","moz","ms","o",""];if(e&&t.style){for(var r=0;i.length>r;r++)for(var o in e)e.hasOwnProperty(o)&&(n=o,i[r]&&(n=i[r]+n.substring(0,1).toUpperCase()+n.substring(1)),t.style[n]=e[o]);"none"==e.userSelect&&(t.onselectstart=function(){return!1})}}},i.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:i.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,r=this.gestures.length;r>n;n++){var o=this.gestures[n];if(!this.stopped&&e[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==i.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=i.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var n=0,r=t.touches.length;r>n;n++)e.touches.push(i.utils.extend({},t.touches[n]))}var o=t.timeStamp-e.timeStamp,s=t.center.pageX-e.center.pageX,a=t.center.pageY-e.center.pageY,c=i.utils.getVelocity(o,s,a);return i.utils.extend(t,{deltaTime:o,deltaX:s,deltaY:a,velocityX:c.x,velocityY:c.y,distance:i.utils.getDistance(e.center,t.center),angle:i.utils.getAngle(e.center,t.center),direction:i.utils.getDirection(e.center,t.center),scale:i.utils.getScale(e.touches,t.touches),rotation:i.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var n=t.defaults||{};return n[t.name]===e&&(n[t.name]=!0),i.utils.extend(i.defaults,n,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},i.gestures=i.gestures||{},i.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case i.EVENT_START:clearTimeout(this.timer),i.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==i.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case i.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case i.EVENT_END:clearTimeout(this.timer)}}},i.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==i.EVENT_END){var n=i.detection.previous,r=!1;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n&&"tap"==n.name&&t.timeStamp-n.lastEvent.timeStamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance&&(e.trigger("doubletap",t),r=!0),(!r||e.options.tap_always)&&(i.detection.current.name="tap",e.trigger(i.detection.current.name,t))}}},i.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==i.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},i.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(n.options.drag_max_touches>0&&t.touches.length>n.options.drag_max_touches))switch(t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:if(t.distance<n.options.drag_min_distance&&i.detection.current.name!=this.name)return;i.detection.current.name=this.name,(i.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var r=i.detection.current.lastEvent.direction;t.drag_locked_to_axis&&r!==t.direction&&(t.direction=i.utils.isVertical(r)?0>t.deltaY?i.DIRECTION_UP:i.DIRECTION_DOWN:0>t.deltaX?i.DIRECTION_LEFT:i.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),n.trigger(this.name+t.direction,t),(n.options.drag_block_vertical&&i.utils.isVertical(t.direction)||n.options.drag_block_horizontal&&!i.utils.isVertical(t.direction))&&t.preventDefault();break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(2>t.touches.length))switch(n.options.transform_always_block&&t.preventDefault(),t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:var r=Math.abs(1-t.scale),o=Math.abs(t.rotation);if(n.options.transform_min_scale>r&&n.options.transform_min_rotation>o)return;i.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),o>n.options.transform_min_rotation&&n.trigger("rotate",t),r>n.options.transform_min_scale&&(n.trigger("pinch",t),n.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,n){return n.options.prevent_mouseevents&&t.pointerType==i.POINTER_MOUSE?(t.stopDetect(),e):(n.options.prevent_default&&t.preventDefault(),t.eventType==i.EVENT_START&&n.trigger(this.name,t),e)}},i.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==i.EVENT_END&&e.trigger(this.name,t)}},"object"==typeof module&&"object"==typeof module.exports?module.exports=i:(t.Hammer=i,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return i}))})(this),function(t,e){"use strict";t!==e&&(Hammer.event.bindDom=function(n,i,r){t(n).on(i,function(t){var n=t.originalEvent||t;n.pageX===e&&(n.pageX=t.pageX,n.pageY=t.pageY),n.target||(n.target=t.target),n.which===e&&(n.which=n.button),n.preventDefault||(n.preventDefault=t.preventDefault),n.stopPropagation||(n.stopPropagation=t.stopPropagation),r.call(this,n)})},Hammer.Instance.prototype.on=function(e,n){return t(this.element).on(e,n)},Hammer.Instance.prototype.off=function(e,n){return t(this.element).off(e,n)},Hammer.Instance.prototype.trigger=function(e,n){var i=t(this.element);return i.has(n.target).length&&(i=t(n.target)),i.trigger({type:e,gesture:n})},t.fn.hammer=function(e){return this.each(function(){var n=t(this),i=n.data("hammer");i?i&&e&&Hammer.utils.extend(i.options,e):n.data("hammer",new Hammer(this,e||{}))})})}(window.jQuery||window.Zepto);

/*
 RequireJS 2.0.6 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(Z){function x(b){return J.call(b)==="[object Function]"}function E(b){return J.call(b)==="[object Array]"}function o(b,e){if(b){var f;for(f=0;f<b.length;f+=1)if(b[f]&&e(b[f],f,b))break}}function M(b,e){if(b){var f;for(f=b.length-1;f>-1;f-=1)if(b[f]&&e(b[f],f,b))break}}function y(b,e){for(var f in b)if(b.hasOwnProperty(f)&&e(b[f],f))break}function N(b,e,f,h){e&&y(e,function(e,j){if(f||!F.call(b,j))h&&typeof e!=="string"?(b[j]||(b[j]={}),N(b[j],e,f,h)):b[j]=e});return b}function t(b,e){return function(){return e.apply(b,
arguments)}}function $(b){if(!b)return b;var e=Z;o(b.split("."),function(b){e=e[b]});return e}function aa(b,e,f){return function(){var h=ga.call(arguments,0),c;if(f&&x(c=h[h.length-1]))c.__requireJsBuild=!0;h.push(e);return b.apply(null,h)}}function ba(b,e,f){o([["toUrl"],["undef"],["defined","requireDefined"],["specified","requireSpecified"]],function(h){var c=h[1]||h[0];b[h[0]]=e?aa(e[c],f):function(){var b=z[O];return b[c].apply(b,arguments)}})}function G(b,e,f,h){e=Error(e+"\nhttp://requirejs.org/docs/errors.html#"+
b);e.requireType=b;e.requireModules=h;if(f)e.originalError=f;return e}function ha(){if(H&&H.readyState==="interactive")return H;M(document.getElementsByTagName("script"),function(b){if(b.readyState==="interactive")return H=b});return H}var j,p,u,B,s,C,H,I,ca,da,ia=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ja=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/\.js$/,ka=/^\.\//;p=Object.prototype;var J=p.toString,F=p.hasOwnProperty;p=Array.prototype;var ga=p.slice,la=p.splice,w=!!(typeof window!==
"undefined"&&navigator&&document),fa=!w&&typeof importScripts!=="undefined",ma=w&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,O="_",S=typeof opera!=="undefined"&&opera.toString()==="[object Opera]",z={},r={},P=[],K=!1;if(typeof define==="undefined"){if(typeof requirejs!=="undefined"){if(x(requirejs))return;r=requirejs;requirejs=void 0}typeof require!=="undefined"&&!x(require)&&(r=require,require=void 0);j=requirejs=function(b,e,f,h){var c,o=O;!E(b)&&typeof b!=="string"&&
(c=b,E(e)?(b=e,e=f,f=h):b=[]);if(c&&c.context)o=c.context;(h=z[o])||(h=z[o]=j.s.newContext(o));c&&h.configure(c);return h.require(b,e,f)};j.config=function(b){return j(b)};require||(require=j);j.version="2.0.6";j.jsExtRegExp=/^\/|:|\?|\.js$/;j.isBrowser=w;p=j.s={contexts:z,newContext:function(b){function e(a,d,k){var l,b,i,v,e,c,f,g=d&&d.split("/");l=g;var h=m.map,j=h&&h["*"];if(a&&a.charAt(0)===".")if(d){l=m.pkgs[d]?g=[d]:g.slice(0,g.length-1);d=a=l.concat(a.split("/"));for(l=0;d[l];l+=1)if(b=d[l],
b===".")d.splice(l,1),l-=1;else if(b==="..")if(l===1&&(d[2]===".."||d[0]===".."))break;else l>0&&(d.splice(l-1,2),l-=2);l=m.pkgs[d=a[0]];a=a.join("/");l&&a===d+"/"+l.main&&(a=d)}else a.indexOf("./")===0&&(a=a.substring(2));if(k&&(g||j)&&h){d=a.split("/");for(l=d.length;l>0;l-=1){i=d.slice(0,l).join("/");if(g)for(b=g.length;b>0;b-=1)if(k=h[g.slice(0,b).join("/")])if(k=k[i]){v=k;e=l;break}if(v)break;!c&&j&&j[i]&&(c=j[i],f=l)}!v&&c&&(v=c,e=f);v&&(d.splice(0,e,v),a=d.join("/"))}return a}function f(a){w&&
o(document.getElementsByTagName("script"),function(d){if(d.getAttribute("data-requiremodule")===a&&d.getAttribute("data-requirecontext")===g.contextName)return d.parentNode.removeChild(d),!0})}function h(a){var d=m.paths[a];if(d&&E(d)&&d.length>1)return f(a),d.shift(),g.undef(a),g.require([a]),!0}function c(a,d,k,l){var b,i,v=a?a.indexOf("!"):-1,c=null,f=d?d.name:null,h=a,j=!0,m="";a||(j=!1,a="_@r"+(M+=1));v!==-1&&(c=a.substring(0,v),a=a.substring(v+1,a.length));c&&(c=e(c,f,l),i=q[c]);a&&(c?m=i&&
i.normalize?i.normalize(a,function(a){return e(a,f,l)}):e(a,f,l):(m=e(a,f,l),b=g.nameToUrl(m)));a=c&&!i&&!k?"_unnormalized"+(O+=1):"";return{prefix:c,name:m,parentMap:d,unnormalized:!!a,url:b,originalName:h,isDefine:j,id:(c?c+"!"+m:m)+a}}function p(a){var d=a.id,k=n[d];k||(k=n[d]=new g.Module(a));return k}function r(a,d,k){var b=a.id,c=n[b];if(F.call(q,b)&&(!c||c.defineEmitComplete))d==="defined"&&k(q[b]);else p(a).on(d,k)}function A(a,d){var k=a.requireModules,b=!1;if(d)d(a);else if(o(k,function(d){if(d=
n[d])d.error=a,d.events.error&&(b=!0,d.emit("error",a))}),!b)j.onError(a)}function s(){P.length&&(la.apply(D,[D.length-1,0].concat(P)),P=[])}function u(a,d,k){a=a&&a.map;d=aa(k||g.require,a,d);ba(d,g,a);d.isBrowser=w;return d}function z(a){delete n[a];o(L,function(d,k){if(d.map.id===a)return L.splice(k,1),d.defined||(g.waitCount-=1),!0})}function B(a,d,k){var b=a.map.id,c=a.depMaps,i;if(a.inited){if(d[b])return a;d[b]=!0;o(c,function(a){var a=a.id,b=n[a];return!b||k[a]||!b.inited||!b.enabled?void 0:
i=B(b,d,k)});k[b]=!0;return i}}function C(a,d,b){var l=a.map.id,c=a.depMaps;if(a.inited&&a.map.isDefine){if(d[l])return q[l];d[l]=a;o(c,function(i){var i=i.id,c=n[i];!Q[i]&&c&&(!c.inited||!c.enabled?b[l]=!0:(c=C(c,d,b),b[i]||a.defineDepById(i,c)))});a.check(!0);return q[l]}}function I(a){a.check()}function T(){var a,d,b,l,c=(b=m.waitSeconds*1E3)&&g.startTime+b<(new Date).getTime(),i=[],e=!1,j=!0;if(!U){U=!0;y(n,function(b){a=b.map;d=a.id;if(b.enabled&&!b.error)if(!b.inited&&c)h(d)?e=l=!0:(i.push(d),
f(d));else if(!b.inited&&b.fetched&&a.isDefine&&(e=!0,!a.prefix))return j=!1});if(c&&i.length)return b=G("timeout","Load timeout for modules: "+i,null,i),b.contextName=g.contextName,A(b);j&&(o(L,function(a){if(!a.defined){var a=B(a,{},{}),d={};a&&(C(a,d,{}),y(d,I))}}),y(n,I));if((!c||l)&&e)if((w||fa)&&!V)V=setTimeout(function(){V=0;T()},50);U=!1}}function W(a){p(c(a[0],null,!0)).init(a[1],a[2])}function J(a){var a=a.currentTarget||a.srcElement,d=g.onScriptLoad;a.detachEvent&&!S?a.detachEvent("onreadystatechange",
d):a.removeEventListener("load",d,!1);d=g.onScriptError;a.detachEvent&&!S||a.removeEventListener("error",d,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}var U,X,g,Q,V,m={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{}},n={},Y={},D=[],q={},R={},M=1,O=1,L=[];Q={require:function(a){return u(a)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports=q[a.map.id]={}},module:function(a){return a.module={id:a.map.id,uri:a.map.url,config:function(){return m.config&&m.config[a.map.id]||
{}},exports:q[a.map.id]}}};X=function(a){this.events=Y[a.id]||{};this.map=a;this.shim=m.shim[a.id];this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};X.prototype={init:function(a,d,b,c){c=c||{};if(!this.inited){this.factory=d;if(b)this.on("error",b);else this.events.error&&(b=t(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.depMaps.rjsSkipMap=a.rjsSkipMap;this.errback=b;this.inited=!0;this.ignore=c.ignore;c.enabled||this.enabled?this.enable():
this.check()}},defineDepById:function(a,d){var b;o(this.depMaps,function(d,c){if(d.id===a)return b=c,!0});return this.defineDep(b,d)},defineDep:function(a,d){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=d)},fetch:function(){if(!this.fetched){this.fetched=!0;g.startTime=(new Date).getTime();var a=this.map;if(this.shim)u(this,!0)(this.shim.deps||[],t(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},
load:function(){var a=this.map.url;R[a]||(R[a]=!0,g.load(this.map.id,a))},check:function(a){if(this.enabled&&!this.enabling){var d,b,c=this.map.id;b=this.depExports;var e=this.exports,i=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(this.depCount<1&&!this.defined){if(x(i)){if(this.events.error)try{e=g.execCb(c,i,b,e)}catch(f){d=f}else e=g.execCb(c,i,b,e);if(this.map.isDefine)if((b=this.module)&&b.exports!==void 0&&b.exports!==this.exports)e=
b.exports;else if(e===void 0&&this.usingExports)e=this.exports;if(d)return d.requireMap=this.map,d.requireModules=[this.map.id],d.requireType="define",A(this.error=d)}else e=i;this.exports=e;if(this.map.isDefine&&!this.ignore&&(q[c]=e,j.onResourceLoad))j.onResourceLoad(g,this.map,this.depMaps);delete n[c];this.defined=!0;g.waitCount-=1;g.waitCount===0&&(L=[])}this.defining=!1;if(!a&&this.defined&&!this.defineEmitted)this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0}}else this.fetch()}},
callPlugin:function(){var a=this.map,d=a.id,b=c(a.prefix,null,!1,!0);r(b,"defined",t(this,function(b){var k;k=this.map.name;var i=this.map.parentMap?this.map.parentMap.name:null;if(this.map.unnormalized){if(b.normalize&&(k=b.normalize(k,function(a){return e(a,i,!0)})||""),b=c(a.prefix+"!"+k,this.map.parentMap,!1,!0),r(b,"defined",t(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),b=n[b.id]){if(this.events.error)b.on("error",t(this,function(a){this.emit("error",a)}));
b.enable()}}else k=t(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),k.error=t(this,function(a){this.inited=!0;this.error=a;a.requireModules=[d];y(n,function(a){a.map.id.indexOf(d+"_unnormalized")===0&&z(a.map.id)});A(a)}),k.fromText=function(a,b){var d=K;d&&(K=!1);p(c(a));j.exec(b);d&&(K=!0);g.completeLoad(a)},b.load(a.name,u(a.parentMap,!0,function(a,b,d){a.rjsSkipMap=!0;return g.require(a,b,d)}),k,m)}));g.enable(b,this);this.pluginMaps[b.id]=b},enable:function(){this.enabled=
!0;if(!this.waitPushed)L.push(this),g.waitCount+=1,this.waitPushed=!0;this.enabling=!0;o(this.depMaps,t(this,function(a,b){var k,e;if(typeof a==="string"){a=c(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.depMaps.rjsSkipMap);this.depMaps[b]=a;if(k=Q[a.id]){this.depExports[b]=k(this);return}this.depCount+=1;r(a,"defined",t(this,function(a){this.defineDep(b,a);this.check()}));this.errback&&r(a,"error",this.errback)}k=a.id;e=n[k];!Q[k]&&e&&!e.enabled&&g.enable(a,this)}));y(this.pluginMaps,
t(this,function(a){var b=n[a.id];b&&!b.enabled&&g.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){o(this.events[a],function(a){a(b)});a==="error"&&delete this.events[a]}};return g={config:m,contextName:b,registry:n,defined:q,urlFetched:R,waitCount:0,defQueue:D,Module:X,makeModuleMap:c,configure:function(a){a.baseUrl&&a.baseUrl.charAt(a.baseUrl.length-1)!=="/"&&(a.baseUrl+="/");var b=m.pkgs,e=m.shim,f=m.paths,
j=m.map;N(m,a,!0);m.paths=N(f,a.paths,!0);if(a.map)m.map=N(j||{},a.map,!0,!0);if(a.shim)y(a.shim,function(a,b){E(a)&&(a={deps:a});if(a.exports&&!a.exports.__buildReady)a.exports=g.makeShimExports(a.exports);e[b]=a}),m.shim=e;if(a.packages)o(a.packages,function(a){a=typeof a==="string"?{name:a}:a;b[a.name]={name:a.name,location:a.location||a.name,main:(a.main||"main").replace(ka,"").replace(ea,"")}}),m.pkgs=b;y(n,function(a,b){if(!a.inited&&!a.map.unnormalized)a.map=c(b)});if(a.deps||a.callback)g.require(a.deps||
[],a.callback)},makeShimExports:function(a){var b;return typeof a==="string"?(b=function(){return $(a)},b.exports=a,b):function(){return a.apply(Z,arguments)}},requireDefined:function(a,b){var e=c(a,b,!1,!0).id;return F.call(q,e)},requireSpecified:function(a,b){a=c(a,b,!1,!0).id;return F.call(q,a)||F.call(n,a)},require:function(a,d,e,f){var h;if(typeof a==="string"){if(x(d))return A(G("requireargs","Invalid require call"),e);if(j.get)return j.get(g,a,d);a=c(a,d,!1,!0);a=a.id;return!F.call(q,a)?A(G("notloaded",
'Module name "'+a+'" has not been loaded yet for context: '+b)):q[a]}e&&!x(e)&&(f=e,e=void 0);d&&!x(d)&&(f=d,d=void 0);for(s();D.length;)if(h=D.shift(),h[0]===null)return A(G("mismatch","Mismatched anonymous define() module: "+h[h.length-1]));else W(h);p(c(null,f)).init(a,d,e,{enabled:!0});T();return g.require},undef:function(a){s();var b=c(a,null,!0),e=n[a];delete q[a];delete R[b.url];delete Y[a];if(e){if(e.events.defined)Y[a]=e.events;z(a)}},enable:function(a){n[a.id]&&p(a).enable()},completeLoad:function(a){var b,
c,e=m.shim[a]||{},f=e.exports&&e.exports.exports;for(s();D.length;){c=D.shift();if(c[0]===null){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);W(c)}c=n[a];if(!b&&!q[a]&&c&&!c.inited)if(m.enforceDefine&&(!f||!$(f)))if(h(a))return;else return A(G("nodefine","No define call for "+a,null,[a]));else W([a,e.deps||[],e.exports]);T()},toUrl:function(a,b){var c=a.lastIndexOf("."),f=null;c!==-1&&(f=a.substring(c,a.length),a=a.substring(0,c));return g.nameToUrl(e(a,b&&b.id,!0),f)},nameToUrl:function(a,b){var c,
e,f,i,h,g;if(j.jsExtRegExp.test(a))i=a+(b||"");else{c=m.paths;e=m.pkgs;i=a.split("/");for(h=i.length;h>0;h-=1)if(g=i.slice(0,h).join("/"),f=e[g],g=c[g]){E(g)&&(g=g[0]);i.splice(0,h,g);break}else if(f){c=a===f.name?f.location+"/"+f.main:f.location;i.splice(0,h,c);break}i=i.join("/");i+=b||(/\?/.test(i)?"":".js");i=(i.charAt(0)==="/"||i.match(/^[\w\+\.\-]+:/)?"":m.baseUrl)+i}return m.urlArgs?i+((i.indexOf("?")===-1?"?":"&")+m.urlArgs):i},load:function(a,b){j.load(g,a,b)},execCb:function(a,b,c,e){return b.apply(e,
c)},onScriptLoad:function(a){if(a.type==="load"||ma.test((a.currentTarget||a.srcElement).readyState))H=null,a=J(a),g.completeLoad(a.id)},onScriptError:function(a){var b=J(a);if(!h(b.id))return A(G("scripterror","Script error",a,[b.id]))}}}};j({});ba(j);if(w&&(u=p.head=document.getElementsByTagName("head")[0],B=document.getElementsByTagName("base")[0]))u=p.head=B.parentNode;j.onError=function(b){throw b;};j.load=function(b,e,f){var h=b&&b.config||{},c;if(w)return c=h.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml",
"html:script"):document.createElement("script"),c.type=h.scriptType||"text/javascript",c.charset="utf-8",c.async=!0,c.setAttribute("data-requirecontext",b.contextName),c.setAttribute("data-requiremodule",e),c.attachEvent&&!(c.attachEvent.toString&&c.attachEvent.toString().indexOf("[native code")<0)&&!S?(K=!0,c.attachEvent("onreadystatechange",b.onScriptLoad)):(c.addEventListener("load",b.onScriptLoad,!1),c.addEventListener("error",b.onScriptError,!1)),c.src=f,I=c,B?u.insertBefore(c,B):u.appendChild(c),
I=null,c;else fa&&(importScripts(f),b.completeLoad(e))};w&&M(document.getElementsByTagName("script"),function(b){if(!u)u=b.parentNode;if(s=b.getAttribute("data-main")){if(!r.baseUrl)C=s.split("/"),ca=C.pop(),da=C.length?C.join("/")+"/":"./",r.baseUrl=da,s=ca;s=s.replace(ea,"");r.deps=r.deps?r.deps.concat(s):[s];return!0}});define=function(b,e,f){var h,c;typeof b!=="string"&&(f=e,e=b,b=null);E(e)||(f=e,e=[]);!e.length&&x(f)&&f.length&&(f.toString().replace(ia,"").replace(ja,function(b,c){e.push(c)}),
e=(f.length===1?["require"]:["require","exports","module"]).concat(e));if(K&&(h=I||ha()))b||(b=h.getAttribute("data-requiremodule")),c=z[h.getAttribute("data-requirecontext")];(c?c.defQueue:P).push([b,e,f])};define.amd={jQuery:!0};j.exec=function(b){return eval(b)};j(r)}})(this);

//
// framework.js - Sitewide JavaScript for Headers/Footers
//
// $Author: suchan $
// $Date: 2012-10-26 12:45:41 -0400 (Fri, 26 Oct 2012) $
// $Revision: 132348 $
//

(function($){

var Framework = {
   init: function(){
       Framework.supernav();
       Framework.mainsearch();
       Framework.superfooter();
   },
   
   supernav: function(){

       if (/hbs\.edu\/doctoral\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-doctoral").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/mba\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-mba").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/about\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-about").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/news\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-about").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/hbs\.edu\/faculty\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-faculty").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/exed\.hbs\.edu\//.test(document.location.href)) {
          $(".universal-header-v3 .nav-tabs #header-nav-ee").toggleClass('active inherit-bg inherit-color-onhover');
       } else if (/alumni/.test(document.location.hostname)) {
          $(".universal-header-v3 .nav-tabs #header-nav-alumni").toggleClass('active inherit-bg inherit-color-onhover');
       }

       $(".universal-banner .toggle-button").click(function(){
          window.setTimeout(function(){
              $(".universal-site-search-query").each(function(){
                 this.selectionStart = this.selectionEnd = this.value.length;
              })
          },500);
       });

       $("#supernav-sitemap,.supernav-sitemap-trigger").click(function(){
          $("#supernav .sitemap").slideToggle(400);
          $("#supernav-sitemap").toggleClass("on");
          if (window.analytics && !window.sitemapEventSent)  {
                analytics.event("sitemap");
                window.sitemapEventSent = 1;
          }
          return false;
       }).attr('href','#');

       $("#supernav .close a").click(function(){
          $("#supernav .sitemap").slideToggle(400);
          $("#supernav-sitemap").toggleClass("on");
          return false;
       });
   },
      
   mainsearch: function() {
      var prompt = 'SEARCH';
      if ($("#search_text").attr('data-placeholder')) { prompt = $("#search_text").attr('data-placeholder') }
      $("#search_text").focus(function(){
            if ($(this).val() == prompt) { $(this).val('') }
      });
      // new
      $(".universal-site-search-query").keypress(function (e) {
          var code = (e.keyCode ? e.keyCode : e.which);
          if (code === 13) { //Enter keycode                        
              $("#aspnetForm").submit(function(){return false});
              $(".universal-site-search-button").click();
          }
      });
      // legacy
      $('#search_text').keypress(function(e) { 
          if(e.which == 13) {
             $(this).blur();
             $('#search_submit').click();
             return false;
          }
          else{
             return true;
          }
      });

      $("#search_submit,.universal-site-search-button").click(function(){
          var val = '';
          $("#search_text,.universal-site-search-query").filter(':visible').each(function(){
              val = val || $(this).val();
          });
          if (val != prompt && val != '') {
             var url = $("meta[name=HBSSearchUrl]").attr('content');
             if (url) {
                var subset = $("meta[name=HBSSearchSubset]").attr('content');
                if (subset) {
                    subset = 'sub='+subset+'&';
                } else {
                    subset = ''
                }
                document.location.href = url +"?"+subset+"q=" + encodeURIComponent(val);
             } else {
                url = "http://search.hbs.edu:8765/";
                var subset = $("meta[name=HBSSearchSubset]").attr('content');
                if (subset) {
                    subset = 'sub='+subset+'&';
                } else {
                    subset = ''
                }
                var theme = $("meta[name=HBSSearchTheme]").attr('content');
                if (theme) {
                    theme = theme + '/'
                } else {
                    theme = ''
                }
                document.location.href = url + theme+"?"+subset+"qt=" + encodeURIComponent(val);
            }
          }
          return false;
      });

      $(".mobile-navbar-search").each(function(){
             var subset = $("meta[name=HBSSearchSubset]").attr('content');
             if (subset) {
                $(this).append('<input type="hidden" name="subset" value="'+subset+'"/>');
             } 
      })

      $("meta[name=HBSSearchSuggestUrl]").eq(0).each(function(){
          var url = $(this).attr('content');
          var searchurl = $("meta[name=HBSSearchUrl]").attr('content');
          $(".universal-site-search-query").wrap('<div class="typeahead-container" data-typeahead-prefetch="'+url+'?_autocomplete=1&step=9999"></div>') 
          $(document).trigger('framework.domupdate');

          $(".typeahead-container").on('select',function(e,data){
               document.location.href = framework.URI(searchurl).search({'q':data.val}).toString()
          })

          $(".universal-site-search-query").on('keyup',function(){
             console.info($(this).val())
             if ($(this).val()){
               $(".slider-container").addClass('slider-backdrop-active')
             } else {
               $(".slider-container").removeClass('slider-backdrop-active')
             }
          }).blur(function(){
               $(".slider-container").removeClass('slider-backdrop-active')
          })

      })

   },

   mobilesearch: function(){
       
   },
       
   superfooter: function(){


          if( /hbs.edu\/employment/.test(document.location) ) {
            // Use linkedin school page for HR site and company page for the rest (Service now #INC0044210)
            $('.universal-footer .linkedin a#footer-linkedin').attr("href", "https://www.linkedin.com/company/4867?trk=vsrp_companies_res_name&trkInfo=VSRPsearchId%3A827216871418409731774%2CVSRPtargetId%3A4867%2CVSRPcmpt%3Aprimary"); 
          } else {
            $('.universal-footer .linkedin a#footer-linkedin').attr("href", "https://www.linkedin.com/edu/school?id=18484&trk=tyah&trkInfo=tarId%3A1416328166551%2Ctas%3Aharvard%20bus%2Cidx%3A6-1-10");  
          }

           // inherit color       
           var match = false;
           $("div[class*='-inherit']").eq(0).each(function(){
              /([a-z]+-inherit)/.test(this.className);
              var color = RegExp.$1
              match = true;
              $(".universal-footer-v3,.universal-header-v3").addClass(color);
           })
           if (!match) $(".universal-footer-v3,.universal-header-v3").addClass('hbsred-inherit');


          // inject site-footer into the superfooter
          var footer = $("#site-footer #info").html() || $("#site-footer").html();
          $("#site-footer").remove();          
          $("#superfooter .infobar .inner").append(footer);
          
          function toggleopen(){
             
             $("#superfooter .selector").not('.opened').each(function(){
                $("#superfooter .icon-footer-expand").removeClass("icon-footer-expand").addClass("icon-footer-collapse")
                $("#superfooter .infobar").slideDown(150,function(){
                    $("#superfooter .selector").toggleClass("opened");
                });
             });
          }

          function toggleclose(){
                closeAll();
                
                $("#superfooter .selector.opened").each(function(){
                   $("#superfooter .icon-footer-collapse").removeClass("icon-footer-collapse").addClass("icon-footer-expand")
                   $(".footerspace").slideUp(150);
                   $("#superfooter .infobar").slideToggle(150,function(){
                      $("#superfooter .selector").toggleClass("opened");
                   });
                });
          }

          // opening the infobar with click
                
          $("#superfooter .selector").click(function(){
             toggleopen();
             if (window.analytics && !window.footerOpenEventSent)  {
                analytics.event("footer");
                window.footerOpenEventSent = 1;
             }
          });   
                
          $("#superfooter").click(function(){
             toggleclose();
          });   
                
          // Social Icons
               
          $("#superfooter").click(function(event){event.stopPropagation();})


          function toggleOverlay(li) {
              $("li:last",li).addClass("last");
              $(".overlay", li).slideToggle(function(){
                  $(this).toggleClass("closed");                  
              });     
              
              $("a.close",li).remove();
              $(".overlay",li).prepend('<a href="#" class="close"><span class="icon-square-close-micro"></span></a>');
              $("a.close",li).click(function(){
                 closeAll();
                 return false;
              })
          }
             
          function closeAll() { 
               $(".overlay:not(.closed)").slideToggle(function(){
                  $(this).toggleClass("closed");
               }); 
               $(".overlay.closed").hide();
          }
              
          $("#superfooter .opens-overlay-popup").addClass("opens-overlay");

          $("#superfooter .opens-overlay>a").click(function(event){
               closeAll();
               var $p = $(this).parent();
               if ($(">div,>ul",$p).hasClass("closed")) { 
                    toggleOverlay($p);
               }
               event.stopPropagation();
               return false;
          });
                
          $("html").click(function(){
               toggleclose();
          });
          
    }

}


$(window).load(function(){Framework.init()}); // make sure this happens last for the mobile flyout search box


})(jQuery);


/**
* Functions extracted from the core.js library, these are stored in framework.js so they can be changed globally.
*
*
**/ 

(function($){

var GlobalCore = {

    inSharePointEditModeCache: null,
    inSharePointEditMode: function(){
      if (GlobalCore.inSharePointEditModeCache == null) {
         GlobalCore.inSharePointEditModeCache = $(".ms-formfieldlabel").size() > 0;
      }
      return GlobalCore.inSharePointEditModeCache;
    },
    
    add_link_class: function(a) {
        $a = $(a);

        //add to prevent double event bindings
        $a.data("linkClassAdded",true);

        var ext = false;
        var pdf = false;
        var href = a.href;
        var hrefAttr = $a.attr("href");
        
        if (href && href.indexOf('mailto') == -1) {
            //with exception of 1)PDFs 2)clubhub.hbs.org and 3)hbs.planyourlegacy.org, all non hbs.edu links are to open in a new tab.

            if (hrefAttr == "#" || href.indexOf('hbs.edu') > -1 || href.indexOf('hbs.org') > -1 || 
                href.indexOf('service-now.com') > -1 || href.indexOf('hbsstg.org') > -1 ||
                href.indexOf('force.com') > -1 ||
                href.indexOf('hbs.planyourlegacy.org') > -1 || href.indexOf('javascript:') > -1){
                ext = false;
            } else {
                ext = true;
            }
            if ( href.indexOf('.pdf') > -1 ) {
                ext = false;
                pdf = true;
             }
        }
        
        if ($a.hasClass('noext')) {
            ext = false;
        }

        if (($a.attr('class') || '').indexOf('widget-video') > -1) {
            ext = false;
        }
        
        if ($a.hasClass('nopdf')) {
            pdf = false;
        }

        // if there are any images inside the a tag and marked as ext
        if (ext && ($a.children("img").size() > 0) && ($a.attr("href") != "#")){    
            ext = false;
            $a.addClass('ext-no-icon');
        }
        // if there are any images inside the a tag and marked as ext        
        if (pdf && ($a.children("img").size() > 0)&&($a.attr("href") != "#")){    
            pdf = false;
            $a.addClass('ext-no-icon');
        }
        if (ext) $a.addClass('ext');
        if (pdf) $a.addClass('pdf');
    },
    
    std_link: function(a,options) {

        if( GlobalCore.inSharePointEditMode() ) return;
    
        if( $(a).data("linkClassAdded") == true ) return;
        
        // fix the sharepoint deployment bug
        if (document.location.hostname === 'www.hbs.edu' && a.hostname && a.hostname === 'prod.hbs.edu') a.hostname = 'www.hbs.edu';

        var defaults = {
           noIcons: false
        };

        options = $.extend(defaults,options)
        GlobalCore.add_link_class(a);
        $a = $(a);
        
        //add code to open in a new window
        if (($a.hasClass("ext")||($a.hasClass("pdf"))||($a.hasClass("ext-no-icon")))) {
            if(!$(a).parent().hasClass("opens-overlay")){ //without this, clicking on a footer's social media icon opens up in a new tab
                if (!a.target) {
                    a.target = "_blank";
                }
                /*$(a).click(function(){
                    window.open(a.href);
                    return false;
                });*/
            }
        }

        //hover effect for .pdf links
        if($("#pdfHover").length < 1){
            $("body").append($('<div id="pdfHover"><span class="pdf-text">PDF</span><span class="arrow-down"> </span></div>'));
        }
        if ($a.hasClass('pdf') || $a.hasClass('protected')) {
           if((!options.noIcons) && (!$a.hasClass('ext-no-icon'))){    //skip if unwanted
                
                $(a).hover(
                    function(e){

                        var x = e.pageX;
                        var y = e.pageY;
                        var $a = $(this);
                        if (!$a.hasClass('pdf') && !$a.hasClass('protected')) return;
                        
                        //get the y distance of the link
                        var $t = $(e.target);
                        var top = Math.ceil($t.offset().top);
                        var cursorDistance = y - top;
        
                        // get lineHeight
                        $t.prepend('<span>I</span>');
                        var measure = $t.find('span').eq(0);
                        var lineHeight = measure.height();
                        measure.remove();
        
                        //Supports up to 2 lines only. Anything beyond, hover icon appears at line 2.
                        var lines = 0;
                        if (cursorDistance >= lineHeight) {
                            lines = 1
                        } 

                        if ($a.hasClass('protected')) {
                           $("#pdfHover .pdf-text").html("LOGIN&nbsp;REQUIRED");
                           $("#pdfHover").addClass("protected");
                        } else {
                           $("#pdfHover").removeClass("protected");
                           $("#pdfHover .pdf-text").html("PDF");
                        }

                        $("#pdfHover").css("top", top + (lines * lineHeight)-33);
                        $("#pdfHover").css("left", x-20);
                    },
                    function(){
                        $("#pdfHover").css("top", "-50px");
                        $("#pdfHover").css("left", "-50px");
                });
            }
        }
    }
}



window.GlobalCore = GlobalCore;

})(jQuery);

/* ----------------------------------------------------
 *
 * Load Query Parameters
 *
 * ----------------------------------------------------
 */

window.query = {};
window.location.href.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) { if ($3) window.query[$1] = $3;}
);

/* ----------------------------------------------------
 *
 * for browsers that don't support logging
 *
 * ----------------------------------------------------
 
 
if(typeof console == 'undefined' || typeof console.info == 'undefined') {
   var names = ["log", "debug", "info", "warn", "error", "assert","dir", "dirxml", "group"
                , "groupEnd", "time", "timeEnd", "count", "trace","profile", "profileEnd"];
   window.console = {};
   for (var i = 0; i <names.length; ++i) window.console[names[i]] = function() {};
}*/

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  global.console = global.console || {};
  var con = global.console;
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
})(typeof window === 'undefined' ? this : window);
// Using `this` for web workers while maintaining compatibility with browser
// targeted script loaders such as Browserify or Webpack where the only way to
// get to the global object is via `window`.














(function() {
    var lastTime = 0; 
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
  

/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*   sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*   interval: 100,   // number = milliseconds of polling interval
*   over: showNav,  // function = onMouseOver callback (required)
*   timeout: 0,   // number = milliseconds delay before onMouseOut function call
*   out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian(at)cherne(dot)net>
*/
(function($) {
    $.fn.hoverIntent = function(f,g) {
        // default configuration options
        var cfg = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        // override configuration options with user supplied object
        cfg = $.extend(cfg, g ? { over: f, out: g } : f );

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).unbind("mousemove",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
            var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
            while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
            if ( p == this ) { return false; }

            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // else e.type == "onmouseover"
            if (e.type == "mouseover") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).bind("mousemove",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

            // else e.type == "onmouseout"
            } else {
                // unbind expensive mousemove event
                $(ob).unbind("mousemove",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // bind the function to the two event listeners
        return this.mouseover(handleHover).mouseout(handleHover);
    };
})(jQuery);
/*!
* jquery.inputmask.bundle
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.64-60
*/
!function(a){function b(b){this.el=void 0,this.opts=a.extend(!0,{},this.defaults,b),this.noMasksCache=b&&void 0!==b.definitions,this.userOptions=b||{},e(this.opts.alias,b,this.opts)}function c(a){var b=document.createElement("input"),c="on"+a,d=c in b;return d||(b.setAttribute(c,"return;"),d="function"==typeof b[c]),b=null,d}function d(a){var b="text"==a||"tel"==a||"password"==a;if(!b){var c=document.createElement("input");c.setAttribute("type",a),b="text"===c.type,c=null}return b}function e(b,c,d){var f=d.aliases[b];return f?(f.alias&&e(f.alias,void 0,d),a.extend(!0,d,f),a.extend(!0,d,c),!0):(void 0==d.mask&&(d.mask=b),!1)}function f(b,c,d){var f=a(b),g=f.data("inputmask");if(g&&""!=g)try{g=g.replace(new RegExp("'","g"),'"');var h=a.parseJSON("{"+g+"}");a.extend(!0,d,h)}catch(i){}for(var j in c){var k=f.data("inputmask-"+j.toLowerCase());void 0!=k&&(k="boolean"==typeof k?k:k.toString(),"mask"==j&&0==k.indexOf("[")?(d[j]=k.replace(/[\s[\]]/g,"").split("','"),d[j][0]=d[j][0].replace("'",""),d[j][d[j].length-1]=d[j][d[j].length-1].replace("'","")):d[j]=k)}return d.alias?e(d.alias,d,c):a.extend(!0,c,d),c}function g(c,d){function e(b){function d(a,b,c,d){this.matches=[],this.isGroup=a||!1,this.isOptional=b||!1,this.isQuantifier=c||!1,this.isAlternator=d||!1,this.quantifier={min:1,max:1}}function e(b,d,e){var f=c.definitions[d],g=0==b.matches.length;if(e=void 0!=e?e:b.matches.length,f&&!m){f.placeholder=a.isFunction(f.placeholder)?f.placeholder.call(this,c):f.placeholder;for(var h=f.prevalidator,i=h?h.length:0,j=1;j<f.cardinality;j++){var k=i>=j?h[j-1]:[],l=k.validator,n=k.cardinality;b.matches.splice(e++,0,{fn:l?"string"==typeof l?new RegExp(l):new function(){this.test=l}:new RegExp("."),cardinality:n?n:1,optionality:b.isOptional,newBlockMarker:g,casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d})}b.matches.splice(e++,0,{fn:f.validator?"string"==typeof f.validator?new RegExp(f.validator):new function(){this.test=f.validator}:new RegExp("."),cardinality:f.cardinality,optionality:b.isOptional,newBlockMarker:g,casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d})}else b.matches.splice(e++,0,{fn:null,cardinality:0,optionality:b.isOptional,newBlockMarker:g,casing:null,def:d,placeholder:void 0,mask:d}),m=!1}for(var f,g,h,i,j,k,l=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,m=!1,n=new d,o=[],p=[];f=l.exec(b);)switch(g=f[0],g.charAt(0)){case c.optionalmarker.end:case c.groupmarker.end:if(h=o.pop(),o.length>0){if(i=o[o.length-1],i.matches.push(h),i.isAlternator){j=o.pop();for(var q=0;q<j.matches.length;q++)j.matches[q].isGroup=!1;o.length>0?(i=o[o.length-1],i.matches.push(j)):n.matches.push(j)}}else n.matches.push(h);break;case c.optionalmarker.start:o.push(new d(!1,!0));break;case c.groupmarker.start:o.push(new d(!0));break;case c.quantifiermarker.start:var r=new d(!1,!1,!0);g=g.replace(/[{}]/g,"");var s=g.split(","),t=isNaN(s[0])?s[0]:parseInt(s[0]),u=1==s.length?t:isNaN(s[1])?s[1]:parseInt(s[1]);if(("*"==u||"+"==u)&&(t="*"==u?0:1),r.quantifier={min:t,max:u},o.length>0){var v=o[o.length-1].matches;if(f=v.pop(),!f.isGroup){var w=new d(!0);w.matches.push(f),f=w}v.push(f),v.push(r)}else{if(f=n.matches.pop(),!f.isGroup){var w=new d(!0);w.matches.push(f),f=w}n.matches.push(f),n.matches.push(r)}break;case c.escapeChar:m=!0;break;case c.alternatormarker:o.length>0?(i=o[o.length-1],k=i.matches.pop()):k=n.matches.pop(),k.isAlternator?o.push(k):(j=new d(!1,!1,!1,!0),j.matches.push(k),o.push(j));break;default:if(o.length>0){if(i=o[o.length-1],i.matches.length>0&&!i.isAlternator&&(k=i.matches[i.matches.length-1],k.isGroup&&(k.isGroup=!1,e(k,c.groupmarker.start,0),e(k,c.groupmarker.end))),e(i,g),i.isAlternator){j=o.pop();for(var q=0;q<j.matches.length;q++)j.matches[q].isGroup=!1;o.length>0?(i=o[o.length-1],i.matches.push(j)):n.matches.push(j)}}else n.matches.length>0&&(k=n.matches[n.matches.length-1],k.isGroup&&(k.isGroup=!1,e(k,c.groupmarker.start,0),e(k,c.groupmarker.end))),e(n,g)}return n.matches.length>0&&(k=n.matches[n.matches.length-1],k.isGroup&&(k.isGroup=!1,e(k,c.groupmarker.start,0),e(k,c.groupmarker.end)),p.push(n)),p}function f(f,g){if(void 0==f||""==f)return void 0;if(1==f.length&&0==c.greedy&&0!=c.repeat&&(c.placeholder=""),c.repeat>0||"*"==c.repeat||"+"==c.repeat){var h="*"==c.repeat?0:"+"==c.repeat?1:c.repeat;f=c.groupmarker.start+f+c.groupmarker.end+c.quantifiermarker.start+h+","+c.repeat+c.quantifiermarker.end}var i;return void 0==b.prototype.masksCache[f]||d===!0?(i={mask:f,maskToken:e(f),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:g},d!==!0&&(b.prototype.masksCache[f]=i)):i=a.extend(!0,{},b.prototype.masksCache[f]),i}function g(a){if(a=a.toString(),c.numericInput){a=a.split("").reverse();for(var b=0;b<a.length;b++)a[b]==c.optionalmarker.start?a[b]=c.optionalmarker.end:a[b]==c.optionalmarker.end?a[b]=c.optionalmarker.start:a[b]==c.groupmarker.start?a[b]=c.groupmarker.end:a[b]==c.groupmarker.end&&(a[b]=c.groupmarker.start);a=a.join("")}return a}var h=void 0;if(a.isFunction(c.mask)&&(c.mask=c.mask.call(this,c)),a.isArray(c.mask)){if(c.mask.length>1){c.keepStatic=void 0==c.keepStatic?!0:c.keepStatic;var i="(";return a.each(c.mask,function(b,c){i.length>1&&(i+=")|("),i+=g(void 0==c.mask||a.isFunction(c.mask)?c:c.mask)}),i+=")",f(i,c.mask)}c.mask=c.mask.pop()}return c.mask&&(h=void 0==c.mask.mask||a.isFunction(c.mask.mask)?f(g(c.mask),c.mask):f(g(c.mask.mask),c.mask)),h}function h(e,f,g){function h(a,b,c){b=b||0;var d,e,f,g=[],h=0;do{if(a===!0&&i().validPositions[h]){var j=i().validPositions[h];e=j.match,d=j.locator.slice(),g.push(c===!0?j.input:H(h,e))}else f=r(h,d,h-1),e=f.match,d=f.locator.slice(),g.push(H(h,e));h++}while((void 0==ea||ea>h-1)&&null!=e.fn||null==e.fn&&""!=e.def||b>=h);return g.pop(),g}function i(){return f}function n(a){var b=i();b.buffer=void 0,b.tests={},a!==!0&&(b._buffer=void 0,b.validPositions={},b.p=0)}function o(a,b){var c=i(),d=-1,e=c.validPositions;void 0==a&&(a=-1);var f=d,g=d;for(var h in e){var j=parseInt(h);e[j]&&(b||null!=e[j].match.fn)&&(a>=j&&(f=j),j>=a&&(g=j))}return d=-1!=f&&a-f>1||a>g?f:g}function p(b,c,d){if(g.insertMode&&void 0!=i().validPositions[b]&&void 0==d){var e,f=a.extend(!0,{},i().validPositions),h=o();for(e=b;h>=e;e++)delete i().validPositions[e];i().validPositions[b]=c;var j,k=!0,l=i().validPositions;for(e=j=b;h>=e;e++){var m=f[e];if(void 0!=m)for(var n=j,p=-1;n<C()&&(null==m.match.fn&&l[e]&&(l[e].match.optionalQuantifier===!0||l[e].match.optionality===!0)||null!=m.match.fn);){if(null==m.match.fn||!g.keepStatic&&l[e]&&(void 0!=l[e+1]&&u(e+1,l[e].locator.slice(),e).length>1||void 0!=l[e].alternation)?n++:n=D(j),t(n,m.match.def)){k=A(n,m.input,!0,!0)!==!1,j=n;break}if(k=null==m.match.fn,p==n)break;p=n}if(!k)break}if(!k)return i().validPositions=a.extend(!0,{},f),!1}else i().validPositions[b]=c;return!0}function q(a,b,c,d){var e,f=a;i().p=a;for(e=f;b>e;e++)void 0!=i().validPositions[e]&&(c===!0||0!=g.canClearPosition(i(),e,o(),d,g))&&delete i().validPositions[e];for(n(!0),e=f+1;e<=o();){for(;void 0!=i().validPositions[f];)f++;var h=i().validPositions[f];f>e&&(e=f+1);var j=i().validPositions[e];void 0!=j&&void 0==h?(t(f,j.match.def)&&A(f,j.input,!0)!==!1&&(delete i().validPositions[e],e++),f++):e++}var k=o(),l=C();for(c!==!0&&void 0!=i().validPositions[k]&&i().validPositions[k].input==g.radixPoint&&delete i().validPositions[k],e=k+1;l>=e;e++)i().validPositions[e]&&delete i().validPositions[e];n(!0)}function r(a,b,c){var d=i().validPositions[a];if(void 0==d)for(var e=u(a,b,c),f=o(),h=i().validPositions[f]||u(0)[0],j=void 0!=h.alternation?h.locator[h.alternation].toString().split(","):[],k=0;k<e.length&&(d=e[k],!(d.match&&(g.greedy&&d.match.optionalQuantifier!==!0||(d.match.optionality===!1||d.match.newBlockMarker===!1)&&d.match.optionalQuantifier!==!0)&&(void 0==h.alternation||h.alternation!=d.alternation||void 0!=d.locator[h.alternation]&&z(d.locator[h.alternation].toString().split(","),j))));k++);return d}function s(a){return i().validPositions[a]?i().validPositions[a].match:u(a)[0].match}function t(a,b){for(var c=!1,d=u(a),e=0;e<d.length;e++)if(d[e].match&&d[e].match.def==b){c=!0;break}return c}function u(b,c,d,e){function f(c,d,e,g){function j(e,g,n){if(h>1e4)return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+i().mask),!0;if(h==b&&void 0==e.matches)return k.push({match:e,locator:g.reverse()}),!0;if(void 0!=e.matches){if(e.isGroup&&n!==!0){if(e=j(c.matches[m+1],g))return!0}else if(e.isOptional){var o=e;if(e=f(e,d,g,n)){var p=k[k.length-1].match,q=0==a.inArray(p,o.matches);if(!q)return!0;l=!0,h=b}}else if(e.isAlternator){var r,s=e,t=[],u=k.slice(),v=g.length,w=d.length>0?d.shift():-1;if(-1==w||"string"==typeof w){var x=h,y=d.slice(),z=[];"string"==typeof w&&(z=w.split(","));for(var A=0;A<s.matches.length;A++){if(k=[],e=j(s.matches[A],[A].concat(g),n)||e,e!==!0&&void 0!=e&&z[z.length-1]<s.matches.length){var B=c.matches.indexOf(e)+1;c.matches.length>B&&(e=j(c.matches[B],[B].concat(g.slice(1,g.length)),n),e&&(z.push(B.toString()),a.each(k,function(a,b){b.alternation=g.length-1})))}r=k.slice(),h=x,k=[];for(var C=0;C<y.length;C++)d[C]=y[C];for(var D=0;D<r.length;D++){var E=r[D];E.alternation=E.alternation||v;for(var F=0;F<t.length;F++){var G=t[F];if(E.match.mask==G.match.mask&&("string"!=typeof w||-1!=a.inArray(E.locator[E.alternation].toString(),z))){r.splice(D,1),D--,G.locator[E.alternation]=G.locator[E.alternation]+","+E.locator[E.alternation],G.alternation=E.alternation;break}}}t=t.concat(r)}"string"==typeof w&&(t=a.map(t,function(b,c){if(isFinite(c)){var d,e=b.alternation,f=b.locator[e].toString().split(",");b.locator[e]=void 0,b.alternation=void 0;for(var g=0;g<f.length;g++)d=-1!=a.inArray(f[g],z),d&&(void 0!=b.locator[e]?(b.locator[e]+=",",b.locator[e]+=f[g]):b.locator[e]=parseInt(f[g]),b.alternation=e);if(void 0!=b.locator[e])return b}})),k=u.concat(t),h=b,l=k.length>0}else e=s.matches[w]?j(s.matches[w],[w].concat(g),n):!1;if(e)return!0}else if(e.isQuantifier&&n!==!0)for(var H=e,I=d.length>0&&n!==!0?d.shift():0;I<(isNaN(H.quantifier.max)?I+1:H.quantifier.max)&&b>=h;I++){var J=c.matches[a.inArray(H,c.matches)-1];if(e=j(J,[I].concat(g),!0)){var p=k[k.length-1].match;p.optionalQuantifier=I>H.quantifier.min-1;var q=0==a.inArray(p,J.matches);if(q){if(I>H.quantifier.min-1){l=!0,h=b;break}return!0}return!0}}else if(e=f(e,d,g,n))return!0}else h++}for(var m=d.length>0?d.shift():0;m<c.matches.length;m++)if(c.matches[m].isQuantifier!==!0){var n=j(c.matches[m],[m].concat(e),g);if(n&&h==b)return n;if(h>b)break}}var g=i().maskToken,h=c?d:0,j=c||[0],k=[],l=!1;if(e===!0&&i().tests[b])return i().tests[b];if(void 0==c){for(var m,n=b-1;void 0==(m=i().validPositions[n])&&n>-1&&(!i().tests[n]||void 0==(m=i().tests[n][0]));)n--;void 0!=m&&n>-1&&(h=n,j=m.locator.slice())}for(var o=j.shift();o<g.length;o++){var p=f(g[o],j,[o]);if(p&&h==b||h>b)break}return(0==k.length||l)&&k.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:""},locator:[]}),i().tests[b]=a.extend(!0,[],k),i().tests[b]}function v(){return void 0==i()._buffer&&(i()._buffer=h(!1,1)),i()._buffer}function w(){return void 0==i().buffer&&(i().buffer=h(!0,o(),!0)),i().buffer}function x(a,b,c){if(c=c||w().slice(),a===!0)n(),a=0,b=c.length;else for(var d=a;b>d;d++)delete i().validPositions[d],delete i().tests[d];for(var d=a;b>d;d++)c[d]!=g.skipOptionalPartCharacter&&A(d,c[d],!0,!0)}function y(a,b){switch(b.casing){case"upper":a=a.toUpperCase();break;case"lower":a=a.toLowerCase()}return a}function z(b,c){for(var d=g.greedy?c:c.slice(0,1),e=!1,f=0;f<b.length;f++)if(-1!=a.inArray(b[f],d)){e=!0;break}return e}function A(b,c,d,e){function f(b,c,d,e){var f=!1;return a.each(u(b),function(h,j){for(var k=j.match,l=c?1:0,m="",r=(w(),k.cardinality);r>l;r--)m+=F(b-(r-1));if(c&&(m+=c),f=null!=k.fn?k.fn.test(m,i(),b,d,g):c!=k.def&&c!=g.skipOptionalPartCharacter||""==k.def?!1:{c:k.def,pos:b},f!==!1){var s=void 0!=f.c?f.c:c;s=s==g.skipOptionalPartCharacter&&null===k.fn?k.def:s;var t=b,u=w();if(void 0!=f.remove&&(a.isArray(f.remove)||(f.remove=[f.remove]),a.each(f.remove.sort(function(a,b){return b-a}),function(a,b){q(b,b+1,!0)})),void 0!=f.insert&&(a.isArray(f.insert)||(f.insert=[f.insert]),a.each(f.insert.sort(function(a,b){return a-b}),function(a,b){A(b.pos,b.c,!0)})),f.refreshFromBuffer){var v=f.refreshFromBuffer;if(d=!0,x(v===!0?v:v.start,v.end,u),void 0==f.pos&&void 0==f.c)return f.pos=o(),!1;if(t=void 0!=f.pos?f.pos:b,t!=b)return f=a.extend(f,A(t,s,!0)),!1}else if(f!==!0&&void 0!=f.pos&&f.pos!=b&&(t=f.pos,x(b,t),t!=b))return f=a.extend(f,A(t,s,!0)),!1;return 1!=f&&void 0==f.pos&&void 0==f.c?!1:(h>0&&n(!0),p(t,a.extend({},j,{input:y(s,k)}),e)||(f=!1),!1)}}),f}function h(b,c,d,e){for(var f,h,j,k,l=a.extend(!0,{},i().validPositions),m=o();m>=0&&(k=i().validPositions[m],!k||void 0==k.alternation||(f=m,h=i().validPositions[f].alternation,r(f).locator[k.alternation]==k.locator[k.alternation]));m--);if(void 0!=h){f=parseInt(f);for(var p in i().validPositions)if(p=parseInt(p),k=i().validPositions[p],p>=f&&void 0!=k.alternation){var q=i().validPositions[f].locator[h].toString().split(","),s=k.locator[h]||q[0];s.length>0&&(s=s.split(",")[0]);for(var t=0;t<q.length;t++)if(s<q[t]){for(var u,v,w=p;w>=0;w--)if(u=i().validPositions[w],void 0!=u){v=u.locator[h],u.locator[h]=parseInt(q[t]);break}if(s!=u.locator[h]){for(var x=[],y=0,z=p+1;z<o()+1;z++){var B=i().validPositions[z];B&&(null!=B.match.fn?x.push(B.input):b>z&&y++),delete i().validPositions[z],delete i().tests[z]}for(n(!0),g.keepStatic=!g.keepStatic,j=!0;x.length>0;){var C=x.shift();if(C!=g.skipOptionalPartCharacter&&!(j=A(o()+1,C,!1,!0)))break}if(u.alternation=h,u.locator[h]=v,j){for(var D=o(b)+1,E=0,z=p+1;z<o()+1;z++){var B=i().validPositions[z];B&&null==B.match.fn&&b>z&&E++}b+=E-y,j=A(b>D?D:b,c,d,e)}if(g.keepStatic=!g.keepStatic,j)return j;n(),i().validPositions=a.extend(!0,{},l)}}break}}return!1}function j(b,c){for(var d=i().validPositions[c],e=d.locator,f=e.length,g=b;c>g;g++)if(!B(g)){var h=u(g),j=h[0],k=-1;a.each(h,function(a,b){for(var c=0;f>c;c++)b.locator[c]&&z(b.locator[c].toString().split(","),e[c].toString().split(","))&&c>k&&(k=c,j=b)}),p(g,a.extend({},j,{input:j.match.def}),!0)}}d=d===!0;for(var k=w(),l=b-1;l>-1&&!i().validPositions[l];l--);for(l++;b>l;l++)void 0==i().validPositions[l]&&((!B(l)||k[l]!=H(l))&&u(l).length>1||k[l]==g.radixPoint||"0"==k[l]&&a.inArray(g.radixPoint,k)<l)&&f(l,k[l],!0);var m=b,s=!1,t=a.extend(!0,{},i().validPositions);if(m<C()&&(s=f(m,c,d,e),(!d||e)&&s===!1)){var v=i().validPositions[m];if(!v||null!=v.match.fn||v.match.def!=c&&c!=g.skipOptionalPartCharacter){if((g.insertMode||void 0==i().validPositions[D(m)])&&!B(m))for(var E=m+1,G=D(m);G>=E;E++)if(s=f(E,c,d,e),s!==!1){j(m,E),m=E;break}}else s={caret:D(m)}}if(s===!1&&g.keepStatic&&P(k)&&(s=h(b,c,d,e)),s===!0&&(s={pos:m}),a.isFunction(g.postValidation)&&0!=s&&!d){n(!0);var I=g.postValidation(w(),g);if(!I)return n(!0),i().validPositions=a.extend(!0,{},t),!1}return s}function B(a){var b=s(a);if(null!=b.fn)return b.fn;if(!g.keepStatic&&void 0==i().validPositions[a]){for(var c=u(a),d=!0,e=0;e<c.length;e++)if(""!=c[e].match.def&&(void 0==c[e].alternation||c[e].locator[c[e].alternation].length>1)){d=!1;break}return d}return!1}function C(){var a;ea=da.prop("maxLength"),-1==ea&&(ea=void 0);var b,c=o(),d=i().validPositions[c],e=void 0!=d?d.locator.slice():void 0;for(b=c+1;void 0==d||null!=d.match.fn||null==d.match.fn&&""!=d.match.def;b++)d=r(b,e,b-1),e=d.locator.slice();var f=s(b-1);return a=""!=f.def?b:b-1,void 0==ea||ea>a?a:ea}function D(a){var b=C();if(a>=b)return b;for(var c=a;++c<b&&!B(c)&&(g.nojumps!==!0||g.nojumpsThreshold>c););return c}function E(a){var b=a;if(0>=b)return 0;for(;--b>0&&!B(b););return b}function F(a){return void 0==i().validPositions[a]?H(a):i().validPositions[a].input}function G(b,c,d,e,f){if(e&&a.isFunction(g.onBeforeWrite)){var h=g.onBeforeWrite.call(b,e,c,d,g);if(h){if(h.refreshFromBuffer){var i=h.refreshFromBuffer;x(i===!0?i:i.start,i.end,h.buffer),n(!0),c=w()}d=h.caret||d}}b._valueSet(c.join("")),void 0!=d&&M(b,d),f===!0&&(ha=!0,a(b).trigger("input"))}function H(a,b){if(b=b||s(a),void 0!=b.placeholder)return b.placeholder;if(null==b.fn){if(!g.keepStatic&&void 0==i().validPositions[a]){for(var c,d=u(a),e=!1,f=0;f<d.length;f++){if(c&&""!=d[f].match.def&&d[f].match.def!=c.match.def&&(void 0==d[f].alternation||d[f].alternation==c.alternation)){e=!0;break}1!=d[f].match.optionality&&1!=d[f].match.optionalQuantifier&&(c=d[f])}if(e)return g.placeholder.charAt(a%g.placeholder.length)}return b.def}return g.placeholder.charAt(a%g.placeholder.length)}function I(b,c,d,e){function f(){var a=!1,b=v().slice(j,D(j)).join("").indexOf(h);if(-1!=b&&!B(j)){a=!0;for(var c=v().slice(j,j+b),d=0;d<c.length;d++)if(" "!=c[d]){a=!1;break}}return a}var g=void 0!=e?e.slice():b._valueGet().split(""),h="",j=0;if(n(),i().p=D(-1),c&&b._valueSet(""),!d){var k=v().slice(0,D(-1)).join(""),l=g.join("").match(new RegExp("^"+J(k),"g"));l&&l.length>0&&(g.splice(0,l.length*k.length),j=D(j))}a.each(g,function(c,e){var g=a.Event("keypress");g.which=e.charCodeAt(0),h+=e;var k=o(void 0,!0),l=i().validPositions[k],m=r(k+1,l?l.locator.slice():void 0,k);if(!f()||d){var n=d?c:null==m.match.fn&&m.match.optionality&&k+1<i().p?k+1:i().p;V.call(b,g,!0,!1,d,n),j=n+1,h=""}else V.call(b,g,!0,!1,!0,k+1)}),c&&G(b,w(),a(b).is(":focus")?D(o(0)):void 0,a.Event("checkval"))}function J(a){return b.escapeRegex(a)}function K(b){if(b[0].inputmask&&!b.hasClass("hasDatepicker")){var c=[],d=i().validPositions;for(var e in d)d[e].match&&null!=d[e].match.fn&&c.push(d[e].input);var f=(fa?c.reverse():c).join(""),h=(fa?w().slice().reverse():w()).join("");return a.isFunction(g.onUnMask)&&(f=g.onUnMask.call(b,h,f,g)||f),f}return b[0]._valueGet()}function L(a){if(fa&&"number"==typeof a&&(!g.greedy||""!=g.placeholder)){var b=w().length;a=b-a}return a}function M(b,c,d){var e,f=b.jquery&&b.length>0?b[0]:b;if("number"!=typeof c)return f.setSelectionRange?(c=f.selectionStart,d=f.selectionEnd):window.getSelection?(e=window.getSelection().getRangeAt(0),(e.commonAncestorContainer.parentNode==f||e.commonAncestorContainer==f)&&(c=e.startOffset,d=e.endOffset)):document.selection&&document.selection.createRange&&(e=document.selection.createRange(),c=0-e.duplicate().moveStart("character",-1e5),d=c+e.text.length),{begin:L(c),end:L(d)};if(c=L(c),d=L(d),d="number"==typeof d?d:c,a(f).is(":visible")){var h=a(f).css("font-size").replace("px","")*d;if(f.scrollLeft=h>f.scrollWidth?h:0,k||0!=g.insertMode||c!=d||d++,f.setSelectionRange)f.selectionStart=c,f.selectionEnd=d;else if(window.getSelection){if(e=document.createRange(),void 0==f.firstChild){var i=document.createTextNode("");f.appendChild(i)}e.setStart(f.firstChild,c<f._valueGet().length?c:f._valueGet().length),e.setEnd(f.firstChild,d<f._valueGet().length?d:f._valueGet().length),e.collapse(!0);var j=window.getSelection();j.removeAllRanges(),j.addRange(e)}else f.createTextRange&&(e=f.createTextRange(),e.collapse(!0),e.moveEnd("character",d),e.moveStart("character",c),e.select())}}function N(b){var c,d,e=w(),f=e.length,g=o(),h={},j=i().validPositions[g],k=void 0!=j?j.locator.slice():void 0;for(c=g+1;c<e.length;c++)d=r(c,k,c-1),k=d.locator.slice(),h[c]=a.extend(!0,{},d);var l=j&&void 0!=j.alternation?j.locator[j.alternation]:void 0;for(c=f-1;c>g&&(d=h[c],(d.match.optionality||d.match.optionalQuantifier||l&&(l!=h[c].locator[j.alternation]&&null!=d.match.fn||null==d.match.fn&&d.locator[j.alternation]&&z(d.locator[j.alternation].toString().split(","),l.split(","))&&""!=u(c)[0].def))&&e[c]==H(c,d.match));c--)f--;return b?{l:f,def:h[f]?h[f].match:void 0}:f}function O(a){for(var b=N(),c=a.length-1;c>b&&!B(c);c--);return a.splice(b,c+1-b),a}function P(b){if(a.isFunction(g.isComplete))return g.isComplete.call(da,b,g);if("*"==g.repeat)return void 0;{var c=!1,d=N(!0),e=E(d.l);o()}if(void 0==d.def||d.def.newBlockMarker||d.def.optionality||d.def.optionalQuantifier){c=!0;for(var f=0;e>=f;f++){var h=r(f).match;if(null!=h.fn&&void 0==i().validPositions[f]&&h.optionality!==!0&&h.optionalQuantifier!==!0||null==h.fn&&b[f]!=H(f,h)){c=!1;break}}}return c}function Q(a,b){return fa?a-b>1||a-b==1&&g.insertMode:b-a>1||b-a==1&&g.insertMode}function R(c){var d=a._data(c).events,e=!1;a.each(d,function(c,d){a.each(d,function(a,c){if("inputmask"==c.namespace&&"setvalue"!=c.type){var d=c.handler;c.handler=function(a){if(!(this.disabled||this.readOnly&&!("keydown"==a.type&&a.ctrlKey&&67==a.keyCode||a.keyCode==b.keyCode.TAB))){switch(a.type){case"input":if(ha===!0||e===!0)return ha=!1,a.preventDefault();break;case"keydown":ga=!1,e=!1;break;case"keypress":if(ga===!0)return a.preventDefault();ga=!0;break;case"compositionstart":e=!0;break;case"compositionupdate":ha=!0;break;case"compositionend":e=!1}return d.apply(this,arguments)}a.preventDefault()}}})})}function S(b){function c(b){if(void 0==a.valHooks[b]||1!=a.valHooks[b].inputmaskpatch){var c=a.valHooks[b]&&a.valHooks[b].get?a.valHooks[b].get:function(a){return a.value},d=a.valHooks[b]&&a.valHooks[b].set?a.valHooks[b].set:function(a,b){return a.value=b,a};a.valHooks[b]={get:function(b){a(b);if(b.inputmask){if(b.inputmask.opts.autoUnmask)return b.inputmask.unmaskedvalue();var d=c(b),e=b.inputmask.maskset,f=e._buffer;return f=f?f.join(""):"",d!=f?d:""}return c(b)},set:function(b,c){var e,f=a(b);return e=d(b,c),b.inputmask&&f.triggerHandler("setvalue.inputmask"),e},inputmaskpatch:!0}}}function d(){a(this);return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():g.call(this)!=v().join("")?g.call(this):"":g.call(this)}function e(b){h.call(this,b),this.inputmask&&a(this).triggerHandler("setvalue.inputmask")}function f(b){a(b).bind("mouseenter.inputmask",function(b){var c=a(this),d=this,e=d._valueGet();""!=e&&e!=w().join("")&&c.triggerHandler("setvalue.inputmask")});
//!! the bound handlers are executed in the order they where bound
var c=a._data(b).events,d=c.mouseover;if(d){for(var e=d[d.length-1],f=d.length-1;f>0;f--)d[f]=d[f-1];d[0]=e}}var g,h;if(!b._valueGet){var i;Object.getOwnPropertyDescriptor&&void 0==b.value?(g=function(){return this.textContent},h=function(a){this.textContent=a},Object.defineProperty(b,"value",{get:d,set:e})):((i=Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(b,"value"))&&i.configurable,document.__lookupGetter__&&b.__lookupGetter__("value")?(g=b.__lookupGetter__("value"),h=b.__lookupSetter__("value"),b.__defineGetter__("value",d),b.__defineSetter__("value",e)):(g=function(){return b.value},h=function(a){b.value=a},c(b.type),f(b))),b._valueGet=function(a){return fa&&a!==!0?g.call(this).split("").reverse().join(""):g.call(this)},b._valueSet=function(a){h.call(this,fa?a.split("").reverse().join(""):a)}}}function T(c,d,e,f){function h(){if(g.keepStatic){n(!0);var b,d=[],e=a.extend(!0,{},i().validPositions);for(b=o();b>=0;b--){var f=i().validPositions[b];if(f&&(null!=f.match.fn&&d.push(f.input),delete i().validPositions[b],void 0!=f.alternation&&f.locator[f.alternation]==r(b).locator[f.alternation]))break}if(b>-1)for(;d.length>0;){i().p=D(o());var h=a.Event("keypress");h.which=d.pop().charCodeAt(0),V.call(c,h,!0,!1,!1,i().p)}else i().validPositions=a.extend(!0,{},e)}}if((g.numericInput||fa)&&(d==b.keyCode.BACKSPACE?d=b.keyCode.DELETE:d==b.keyCode.DELETE&&(d=b.keyCode.BACKSPACE),fa)){var j=e.end;e.end=e.begin,e.begin=j}if(d==b.keyCode.BACKSPACE&&(e.end-e.begin<1||0==g.insertMode)?(e.begin=E(e.begin),void 0==i().validPositions[e.begin]||i().validPositions[e.begin].input!=g.groupSeparator&&i().validPositions[e.begin].input!=g.radixPoint||e.begin--):d==b.keyCode.DELETE&&e.begin==e.end&&(e.end=B(e.end)?e.end+1:D(e.end)+1,void 0==i().validPositions[e.begin]||i().validPositions[e.begin].input!=g.groupSeparator&&i().validPositions[e.begin].input!=g.radixPoint||e.end++),q(e.begin,e.end,!1,f),f!==!0){h();var k=o(e.begin);k<e.begin?(-1==k&&n(),i().p=D(k)):i().p=e.begin}}function U(d){var e=this,f=a(e),h=d.keyCode,k=M(e);h==b.keyCode.BACKSPACE||h==b.keyCode.DELETE||j&&127==h||d.ctrlKey&&88==h&&!c("cut")?(d.preventDefault(),88==h&&(aa=w().join("")),T(e,h,k),G(e,w(),i().p,d,aa!=w().join("")),e._valueGet()==v().join("")?f.trigger("cleared"):P(w())===!0&&f.trigger("complete"),g.showTooltip&&f.prop("title",i().mask)):h==b.keyCode.END||h==b.keyCode.PAGE_DOWN?setTimeout(function(){var a=D(o());g.insertMode||a!=C()||d.shiftKey||a--,M(e,d.shiftKey?k.begin:a,a)},0):h==b.keyCode.HOME&&!d.shiftKey||h==b.keyCode.PAGE_UP?M(e,0,d.shiftKey?k.begin:0):(g.undoOnEscape&&h==b.keyCode.ESCAPE||90==h&&d.ctrlKey)&&d.altKey!==!0?(I(e,!0,!1,aa.split("")),f.click()):h!=b.keyCode.INSERT||d.shiftKey||d.ctrlKey?0!=g.insertMode||d.shiftKey||(h==b.keyCode.RIGHT?setTimeout(function(){var a=M(e);M(e,a.begin)},0):h==b.keyCode.LEFT&&setTimeout(function(){var a=M(e);M(e,fa?a.begin+1:a.begin-1)},0)):(g.insertMode=!g.insertMode,M(e,g.insertMode||k.begin!=C()?k.begin:k.begin-1)),g.onKeyDown.call(this,d,w(),M(e).begin,g),ia=-1!=a.inArray(h,g.ignorables)}function V(c,d,e,f,h){var j=this,k=a(j),l=c.which||c.charCode||c.keyCode;if(!(d===!0||c.ctrlKey&&c.altKey)&&(c.ctrlKey||c.metaKey||ia))return!0;if(l){46==l&&0==c.shiftKey&&","==g.radixPoint&&(l=44);var m,o=d?{begin:h,end:h}:M(j),q=String.fromCharCode(l),r=Q(o.begin,o.end);r&&(i().undoPositions=a.extend(!0,{},i().validPositions),T(j,b.keyCode.DELETE,o,!0),o.begin=i().p,g.insertMode||(g.insertMode=!g.insertMode,p(o.begin,f),g.insertMode=!g.insertMode),r=!g.multi),i().writeOutBuffer=!0;var s=fa&&!r?o.end:o.begin,t=A(s,q,f);if(t!==!1){if(t!==!0&&(s=void 0!=t.pos?t.pos:s,q=void 0!=t.c?t.c:q),n(!0),void 0!=t.caret)m=t.caret;else{var v=i().validPositions;m=!g.keepStatic&&(void 0!=v[s+1]&&u(s+1,v[s].locator.slice(),s).length>1||void 0!=v[s].alternation)?s+1:D(s)}i().p=m}if(e!==!1){var y=this;if(setTimeout(function(){g.onKeyValidation.call(y,t,g)},0),i().writeOutBuffer&&t!==!1){var z=w();G(j,z,d?void 0:g.numericInput?E(m):m,c,d!==!0),d!==!0&&setTimeout(function(){P(z)===!0&&k.trigger("complete")},0)}else r&&(i().buffer=void 0,i().validPositions=i().undoPositions)}else r&&(i().buffer=void 0,i().validPositions=i().undoPositions);if(g.showTooltip&&k.prop("title",i().mask),d&&a.isFunction(g.onBeforeWrite)){var B=g.onBeforeWrite.call(this,c,w(),m,g);if(B&&B.refreshFromBuffer){var C=B.refreshFromBuffer;x(C===!0?C:C.start,C.end,B.buffer),n(!0),B.caret&&(i().p=B.caret)}}c.preventDefault()}}function W(b){var c=this,d=a(c),e=c._valueGet(!0),f=M(c);if("propertychange"==b.type&&c._valueGet().length<=C())return!0;if("paste"==b.type){var h=e.substr(0,f.begin),i=e.substr(f.end,e.length);h==v().slice(0,f.begin).join("")&&(h=""),i==v().slice(f.end).join("")&&(i=""),window.clipboardData&&window.clipboardData.getData?e=h+window.clipboardData.getData("Text")+i:b.originalEvent&&b.originalEvent.clipboardData&&b.originalEvent.clipboardData.getData&&(e=h+b.originalEvent.clipboardData.getData("text/plain")+i)}var j=e;if(a.isFunction(g.onBeforePaste)){if(j=g.onBeforePaste.call(c,e,g),j===!1)return b.preventDefault(),!1;j||(j=e)}return I(c,!1,!1,fa?j.split("").reverse():j.split("")),G(c,w(),void 0,b,!0),d.click(),P(w())===!0&&d.trigger("complete"),!1}function X(b){var c=this;I(c,!0,!1),P(w())===!0&&a(c).trigger("complete"),b.preventDefault()}function Y(a){var b=this;aa=w().join(""),(""==ca||0!=a.originalEvent.data.indexOf(ca))&&(ba=M(b))}function Z(b){var c=this,d=M(c);0==b.originalEvent.data.indexOf(ca)&&(n(),d=ba);var e=b.originalEvent.data;M(c,d.begin,d.end);for(var f=0;f<e.length;f++){var h=a.Event("keypress");h.which=e.charCodeAt(f),ga=!1,ia=!1,V.call(c,h)}setTimeout(function(){var a=i().p;G(c,w(),g.numericInput?E(a):a)},0),ca=b.originalEvent.data}function $(a){}function _(c){da=a(c),g.showTooltip&&da.prop("title",i().mask),("rtl"==c.dir||g.rightAlign)&&da.css("text-align","right"),("rtl"==c.dir||g.numericInput)&&(c.dir="ltr",da.removeAttr("dir"),c.inputmask.isRTL=!0,fa=!0),da.unbind(".inputmask"),(da.is(":input")&&d(da.attr("type"))||c.isContentEditable)&&(da.closest("form").bind("submit",function(a){aa!=w().join("")&&da.change(),g.clearMaskOnLostFocus&&da[0]._valueGet&&da[0]._valueGet()==v().join("")&&da[0]._valueSet(""),g.removeMaskOnSubmit&&da.inputmask("remove")}).bind("reset",function(){setTimeout(function(){da.triggerHandler("setvalue.inputmask")},0)}),da.bind("mouseenter.inputmask",function(){var b=a(this),c=this;!b.is(":focus")&&g.showMaskOnHover&&c._valueGet()!=w().join("")&&G(c,w())}).bind("blur.inputmask",function(b){var c=a(this),d=this;if(d.inputmask){var e=d._valueGet(),f=w().slice();ja=!0,aa!=f.join("")&&setTimeout(function(){c.change(),aa=f.join("")},0),""!=e&&(g.clearMaskOnLostFocus&&(e==v().join("")?f=[]:O(f)),P(f)===!1&&(c.trigger("incomplete"),g.clearIncomplete&&(n(),f=g.clearMaskOnLostFocus?[]:v().slice())),G(d,f,void 0,b))}}).bind("focus.inputmask",function(b){var c=(a(this),this),d=c._valueGet();g.showMaskOnFocus&&(!g.showMaskOnHover||g.showMaskOnHover&&""==d)?c._valueGet()!=w().join("")&&G(c,w(),D(o())):M(c,D(o())),aa=w().join("")}).bind("mouseleave.inputmask",function(){var b=a(this),c=this;if(g.clearMaskOnLostFocus){var d=w().slice(),e=c._valueGet();b.is(":focus")||e==b.attr("placeholder")||""==e||(e==v().join("")?d=[]:O(d),G(c,d))}}).bind("click.inputmask",function(){var b=a(this),c=this;if(b.is(":focus")){var d=M(c);if(d.begin==d.end)if(g.radixFocus&&""!=g.radixPoint&&-1!=a.inArray(g.radixPoint,w())&&(ja||w().join("")==v().join("")))M(c,a.inArray(g.radixPoint,w())),ja=!1;else{var e=L(d.begin),f=D(o(e));f>e?M(c,B(e)?e:D(e)):M(c,f)}}}).bind("dblclick.inputmask",function(){var a=this;setTimeout(function(){M(a,0,D(o()))},0)}).bind(m+".inputmask dragdrop.inputmask drop.inputmask",W).bind("cut.inputmask",function(c){ha=!0;var d=this,e=a(d),f=M(d);T(d,b.keyCode.DELETE,f),G(d,w(),i().p,c,aa!=w().join("")),d._valueGet()==v().join("")&&e.trigger("cleared"),g.showTooltip&&e.prop("title",i().mask)}).bind("complete.inputmask",g.oncomplete).bind("incomplete.inputmask",g.onincomplete).bind("cleared.inputmask",g.oncleared),da.bind("keydown.inputmask",U).bind("keypress.inputmask",V),l||da.bind("compositionstart.inputmask",Y).bind("compositionupdate.inputmask",Z).bind("compositionend.inputmask",$),"paste"===m&&da.bind("input.inputmask",X)),da.bind("setvalue.inputmask",function(){var b=this,c=b._valueGet();b._valueSet(a.isFunction(g.onBeforeMask)?g.onBeforeMask.call(b,c,g)||c:c),I(b,!0,!1),aa=w().join(""),(g.clearMaskOnLostFocus||g.clearIncomplete)&&b._valueGet()==v().join("")&&b._valueSet("")}),S(c);var e=a.isFunction(g.onBeforeMask)?g.onBeforeMask.call(c,c._valueGet(),g)||c._valueGet():c._valueGet();I(c,!0,!1,e.split(""));var f=w().slice();aa=f.join("");var h;try{h=document.activeElement}catch(j){}P(f)===!1&&g.clearIncomplete&&n(),g.clearMaskOnLostFocus&&(f.join("")==v().join("")?f=[]:O(f)),G(c,f),h===c&&M(c,D(o())),R(c)}var aa,ba,ca,da,ea,fa=!1,ga=!1,ha=!1,ia=!1,ja=!0;if(void 0!=e)switch(e.action){case"isComplete":return el=e.el,da=a(el),f=el.inputmask.maskset,g=el.inputmask.opts,P(e.buffer);case"unmaskedvalue":return el=e.el,da=a(el),f=el.inputmask.maskset,g=el.inputmask.opts,fa=el.inputmask.isRTL,K(da);case"mask":aa=w().join(""),_(e.el);break;case"format":da=a({}),da[0].inputmask=new b,da[0].inputmask.opts=g,da[0].inputmask.el=da[0],da[0].inputmask.maskset=f,da[0].inputmask.isRTL=g.numericInput,g.numericInput&&(fa=!0);var ka=(a.isFunction(g.onBeforeMask)?g.onBeforeMask.call(da,e.value,g)||e.value:e.value).split("");return I(da,!1,!1,fa?ka.reverse():ka),a.isFunction(g.onBeforeWrite)&&g.onBeforeWrite.call(this,void 0,w(),0,g),e.metadata?{value:fa?w().slice().reverse().join(""):w().join(""),metadata:da.inputmask("getmetadata")}:fa?w().slice().reverse().join(""):w().join("");case"isValid":da=a({}),da[0].inputmask=new b,da[0].inputmask.opts=g,da[0].inputmask.el=da[0],da[0].inputmask.maskset=f,da[0].inputmask.isRTL=g.numericInput,g.numericInput&&(fa=!0);var ka=e.value.split("");I(da,!1,!0,fa?ka.reverse():ka);for(var la=w(),ma=N(),na=la.length-1;na>ma&&!B(na);na--);return la.splice(ma,na+1-ma),P(la)&&e.value==la.join("");case"getemptymask":return el=e.el,da=a(el),f=el.inputmask.maskset,g=el.inputmask.opts,v();case"remove":el=e.el,da=a(el),f=el.inputmask.maskset,g=el.inputmask.opts,el._valueSet(K(da)),da.unbind(".inputmask"),el.inputmask=void 0;var oa;Object.getOwnPropertyDescriptor&&(oa=Object.getOwnPropertyDescriptor(el,"value")),oa&&oa.get?el._valueGet&&Object.defineProperty(el,"value",{get:el._valueGet,set:el._valueSet}):document.__lookupGetter__&&el.__lookupGetter__("value")&&el._valueGet&&(el.__defineGetter__("value",el._valueGet),el.__defineSetter__("value",el._valueSet));try{delete el._valueGet,delete el._valueSet}catch(pa){el._valueGet=void 0,el._valueSet=void 0}break;case"getmetadata":if(el=e.el,da=a(el),f=el.inputmask.maskset,g=el.inputmask.opts,a.isArray(f.metadata)){for(var qa,ra=o(),sa=ra;sa>=0;sa--)if(i().validPositions[sa]&&void 0!=i().validPositions[sa].alternation){qa=i().validPositions[sa].alternation;break}return void 0!=qa?f.metadata[i().validPositions[ra].locator[qa]]:f.metadata[0]}return f.metadata}}b.prototype={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,oncomplete:a.noop,onincomplete:a.noop,oncleared:a.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},alias:null,onKeyDown:a.noop,onBeforeMask:void 0,onBeforePaste:void 0,onBeforeWrite:void 0,onUnMask:void 0,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:a.noop,skipOptionalPartCharacter:" ",showTooltip:!1,numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",groupSeparator:"",radixFocus:!1,nojumps:!1,nojumpsThreshold:0,keepStatic:void 0,definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1}},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:void 0,canClearPosition:a.noop,postValidation:void 0},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},masksCache:{},mask:function(a){var c=a.jquery&&a.length>0?a[0]:a;f(a,this.opts,this.userOptions);var d=g(this.opts,this.noMasksCache);return void 0!=d&&(c.inputmask=new b,c.inputmask.opts=this.opts,c.inputmask.noMasksCache=this.noMasksCache,c.inputmask.el=c,c.inputmask.maskset=d,c.inputmask.isRTL=!1,h({action:"mask",el:c},d,this.opts)),a},unmaskedvalue:function(){return this.el?h({action:"unmaskedvalue",el:this.el}):void 0},remove:function(){return this.el?(h({action:"remove",el:this.el}),this.el.inputmask=void 0,this.el):void 0},getemptymask:function(){return this.el?h({action:"getemptymask",el:this.el}):void 0},hasMaskedValue:function(){return!this.opts.autoUnmask},isComplete:function(){return this.el?h({action:"isComplete",buffer:this.el._valueGet().split(""),el:this.el}):void 0},getmetadata:function(){return this.el?h({action:"getmetadata",el:this.el}):void 0}},b.extendDefaults=function(c){a.extend(b.prototype.defaults,c)},b.extendDefinitions=function(c){a.extend(b.prototype.defaults.definitions,c)},b.extendAliases=function(c){a.extend(b.prototype.defaults.aliases,c)},b.format=function(c,d,f){var i=a.extend(!0,{},b.prototype.defaults,d);return e(i.alias,d,i),h({action:"format",value:c,metadata:f},g(i,d&&void 0!==d.definitions),i)},b.isValid=function(c,d){var f=a.extend(!0,{},b.prototype.defaults,d);return e(f.alias,d,f),h({action:"isValid",value:c},g(f,d&&void 0!==d.definitions),f)},b.escapeRegex=function(a){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"];return a.replace(new RegExp("(\\"+b.join("|\\")+")","gim"),"\\$1")},b.keyCode={ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91};var i=navigator.userAgent,j=null!==i.match(new RegExp("iphone","i")),k=(null!==i.match(new RegExp("android.*safari.*","i")),null!==i.match(new RegExp("android.*chrome.*","i"))),l=null!==i.match(new RegExp("android.*firefox.*","i")),m=(/Kindle/i.test(i)||/Silk/i.test(i)||/KFTT/i.test(i)||/KFOT/i.test(i)||/KFJWA/i.test(i)||/KFJWI/i.test(i)||/KFSOWI/i.test(i)||/KFTHWA/i.test(i)||/KFTHWI/i.test(i)||/KFAPWA/i.test(i)||/KFAPWI/i.test(i),c("paste")?"paste":c("input")?"input":"propertychange");return window.inputmask=b,b}(jQuery),function(a){return void 0===a.fn.inputmask&&(a.fn.inputmask=function(b,c){var d;if("string"==typeof b)switch(b){case"mask":return d=new inputmask(c),this.each(function(){d.mask(this)});case"unmaskedvalue":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.unmaskedvalue():a(e).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.getemptymask():"";case"hasMaskedValue":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.hasMaskedValue():!1;case"isComplete":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.isComplete():!0;case"getmetadata":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.getmetadata():void 0;default:return c=c||{},c.alias=b,d=new inputmask(c),this.each(function(){d.mask(this)})}else{if("object"==typeof b)return d=new inputmask(b),this.each(function(){d.mask(this)});if(void 0==b)return this.each(function(){d=new inputmask,d.mask(this)})}}),a.fn.inputmask}(jQuery),function(a){return inputmask.extendDefinitions({h:{validator:"[01][0-9]|2[0-3]",cardinality:2,prevalidator:[{validator:"[0-2]",cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:"[0-5]",cardinality:1}]},d:{validator:"0[1-9]|[12][0-9]|3[01]",cardinality:2,prevalidator:[{validator:"[0-3]",cardinality:1}]},m:{validator:"0[1-9]|1[012]",cardinality:2,prevalidator:[{validator:"[01]",cardinality:1}]},y:{validator:"(19|20)\\d{2}",cardinality:4,prevalidator:[{validator:"[12]",cardinality:1},{validator:"(19|20)",cardinality:2},{validator:"(19|20)\\d",cardinality:3}]}}),inputmask.extendAliases({"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),val2pre:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+b+"[01])")},val2:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|[12][0-9])"+b+"(0[1-9]|1[012]))|(30"+b+"(0[13-9]|1[012]))|(31"+b+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(a,b,c){if(isNaN(a))return!1;var d=parseInt(a.concat(b.toString().slice(a.length))),e=parseInt(a.concat(c.toString().slice(a.length)));return(isNaN(d)?!1:d>=b&&c>=d)||(isNaN(e)?!1:e>=b&&c>=e)},determinebaseyear:function(a,b,c){var d=(new Date).getFullYear();if(a>d)return a;if(d>b){for(var e=b.toString().slice(0,2),f=b.toString().slice(2,4);e+c>b;)e--;var g=e+f;return a>g?a:g}return d},onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==inputmask.keyCode.RIGHT){var g=new Date;f.val(g.getDate().toString()+(g.getMonth()+1).toString()+g.getFullYear().toString()),f.triggerHandler("setvalue.inputmask")}},getFrontValue:function(a,b,c){for(var d=0,e=0,f=0;f<a.length&&"2"!=a.charAt(f);f++){var g=c.definitions[a.charAt(f)];g?(d+=e,e=g.cardinality):e++}return b.join("").substr(d,e)},definitions:{1:{validator:function(a,b,c,d,e){var f=e.regex.val1.test(a);return d||f||a.charAt(1)!=e.separator&&-1=="-./".indexOf(a.charAt(1))||!(f=e.regex.val1.test("0"+a.charAt(0)))?f:(b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)})},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=a;isNaN(b.buffer[c+1])||(f+=b.buffer[c+1]);var g=1==f.length?e.regex.val1pre.test(f):e.regex.val1.test(f);if(!d&&!g){if(g=e.regex.val1.test(a+"0"))return b.buffer[c]=a,b.buffer[++c]="0",{pos:c,c:"0"};if(g=e.regex.val1.test("0"+a))return b.buffer[c]="0",c++,{pos:c}}return g},cardinality:1}]},2:{validator:function(a,b,c,d,e){var f=e.getFrontValue(b.mask,b.buffer,e);-1!=f.indexOf(e.placeholder[0])&&(f="01"+e.separator);var g=e.regex.val2(e.separator).test(f+a);if(!d&&!g&&(a.charAt(1)==e.separator||-1!="-./".indexOf(a.charAt(1)))&&(g=e.regex.val2(e.separator).test(f+"0"+a.charAt(0))))return b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)};if(e.mask.indexOf("2")==e.mask.length-1&&g){var h=b.buffer.join("").substr(4,4)+a;if(h!=e.leapday)return!0;var i=parseInt(b.buffer.join("").substr(0,4),10);return i%4===0?i%100===0?i%400===0?!0:!1:!0:!1}return g},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){isNaN(b.buffer[c+1])||(a+=b.buffer[c+1]);var f=e.getFrontValue(b.mask,b.buffer,e);-1!=f.indexOf(e.placeholder[0])&&(f="01"+e.separator);var g=1==a.length?e.regex.val2pre(e.separator).test(f+a):e.regex.val2(e.separator).test(f+a);return d||g||!(g=e.regex.val2(e.separator).test(f+"0"+a))?g:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},y:{validator:function(a,b,c,d,e){if(e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)){var f=b.buffer.join("").substr(0,6);if(f!=e.leapday)return!0;var g=parseInt(a,10);return g%4===0?g%100===0?g%400===0?!0:!1:!0:!1}return!1},cardinality:4,prevalidator:[{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,1);if(f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,2),f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),b.buffer[c++]=g.charAt(1),{pos:c}}return f},cardinality:1},{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2);if(f=e.isInYearRange(a[0]+g[1]+a[1],e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(1),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2),e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear)){var h=b.buffer.join("").substr(0,6);if(h!=e.leapday)f=!0;else{var i=parseInt(a,10);f=i%4===0?i%100===0?i%400===0?!0:!1:!0:!1}}else f=!1;if(f)return b.buffer[c-1]=g.charAt(0),b.buffer[c++]=g.charAt(1),b.buffer[c++]=a.charAt(0),{refreshFromBuffer:{start:c-3,end:c},pos:c}}return f},cardinality:2},{validator:function(a,b,c,d,e){return e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",regex:{val2pre:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[13-9]|1[012])"+b+"[0-3])|(02"+b+"[0-2])")},val2:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+b+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+b+"30)|((0[13578]|1[02])"+b+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==inputmask.keyCode.RIGHT){var g=new Date;f.val((g.getMonth()+1).toString()+g.getDate().toString()+g.getFullYear().toString()),f.triggerHandler("setvalue.inputmask")}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==inputmask.keyCode.RIGHT){var g=new Date;f.val(g.getFullYear().toString()+(g.getMonth()+1).toString()+g.getDate().toString()),f.triggerHandler("setvalue.inputmask")}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",definitions:{h:{validator:function(a,b,c,d,e){if("24"==e.hourFormat&&24==parseInt(a,10))return b.buffer[c-1]="0",b.buffer[c]="0",{refreshFromBuffer:{start:c-1,end:c},c:"0"};var f=e.regex.hrs.test(a);if(!d&&!f&&(a.charAt(1)==e.timeseparator||-1!="-.:".indexOf(a.charAt(1)))&&(f=e.regex.hrs.test("0"+a.charAt(0))))return b.buffer[c-1]="0",b.buffer[c]=a.charAt(0),c++,{refreshFromBuffer:{start:c-2,end:c},pos:c,c:e.timeseparator};if(f&&"24"!==e.hourFormat&&e.regex.hrs24.test(a)){var g=parseInt(a,10);return 24==g?(b.buffer[c+5]="a",b.buffer[c+6]="m"):(b.buffer[c+5]="p",b.buffer[c+6]="m"),g-=12,10>g?(b.buffer[c]=g.toString(),b.buffer[c-1]="0"):(b.buffer[c]=g.toString().charAt(1),b.buffer[c-1]=g.toString().charAt(0)),{refreshFromBuffer:{start:c-1,end:c+6},c:b.buffer[c]}}return f},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.hrspre.test(a);return d||f||!(f=e.regex.hrs.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.mspre.test(a);return d||f||!(f=e.regex.ms.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},t:{validator:function(a,b,c,d,e){return e.regex.ampm.test(a+"m")},casing:"lower",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:!1},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:!1},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"}}),inputmask}(jQuery),function(a){return inputmask.extendDefinitions({A:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"},"#":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"}}),inputmask.extendAliases({url:{mask:"ir",placeholder:"",separator:"",defaultPrefix:"http://",regex:{urlpre1:new RegExp("[fh]"),urlpre2:new RegExp("(ft|ht)"),urlpre3:new RegExp("(ftp|htt)"),urlpre4:new RegExp("(ftp:|http|ftps)"),urlpre5:new RegExp("(ftp:/|ftps:|http:|https)"),urlpre6:new RegExp("(ftp://|ftps:/|http:/|https:)"),urlpre7:new RegExp("(ftp://|ftps://|http://|https:/)"),urlpre8:new RegExp("(ftp://|ftps://|http://|https://)")},definitions:{i:{validator:function(a,b,c,d,e){return!0},cardinality:8,prevalidator:function(){for(var a=[],b=8,c=0;b>c;c++)a[c]=function(){var a=c;return{validator:function(b,c,d,e,f){if(f.regex["urlpre"+(a+1)]){var g,h=b;a+1-b.length>0&&(h=c.buffer.join("").substring(0,a+1-b.length)+""+h);var i=f.regex["urlpre"+(a+1)].test(h);if(!e&&!i){for(d-=a,g=0;g<f.defaultPrefix.length;g++)c.buffer[d]=f.defaultPrefix[g],d++;for(g=0;g<h.length-1;g++)c.buffer[d]=h[g],d++;return{pos:d}}return i}return!1},cardinality:a}}();return a}()},r:{validator:".",cardinality:50}},insertMode:!1,autoUnmask:!1},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(a,b,c,d,e){return c-1>-1&&"."!=b.buffer[c-1]?(a=b.buffer[c-1]+a,a=c-2>-1&&"."!=b.buffer[c-2]?b.buffer[c-2]+a:"0"+a):a="00"+a,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a)},cardinality:1}}},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",greedy:!1,onBeforePaste:function(a,b){return a=a.toLowerCase(),a.replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",cardinality:1,casing:"lower"}}}}),inputmask}(jQuery),function(a){return inputmask.extendAliases({numeric:{mask:function(a){function b(b){for(var c="",d=0;d<b.length;d++)c+=a.definitions[b[d]]?"\\"+b[d]:b[d];return c}if(0!==a.repeat&&isNaN(a.integerDigits)&&(a.integerDigits=a.repeat),a.repeat=0,a.groupSeparator==a.radixPoint&&("."==a.radixPoint?a.groupSeparator=",":","==a.radixPoint?a.groupSeparator=".":a.groupSeparator="")," "===a.groupSeparator&&(a.skipOptionalPartCharacter=void 0),a.autoGroup=a.autoGroup&&""!=a.groupSeparator,a.autoGroup&&("string"==typeof a.groupSize&&isFinite(a.groupSize)&&(a.groupSize=parseInt(a.groupSize)),isFinite(a.integerDigits))){var c=Math.floor(a.integerDigits/a.groupSize),d=a.integerDigits%a.groupSize;a.integerDigits=parseInt(a.integerDigits)+(0==d?c-1:c)}a.placeholder.length>1&&(a.placeholder=a.placeholder.charAt(0)),a.radixFocus=a.radixFocus&&"0"==a.placeholder,a.definitions[";"]=a.definitions["~"],a.definitions[";"].definitionSymbol="~";var e=b(a.prefix);return e+="[+]",e+="~{1,"+a.integerDigits+"}",void 0!=a.digits&&(isNaN(a.digits)||parseInt(a.digits)>0)&&(e+=a.digitsOptional?"["+(a.decimalProtect?":":a.radixPoint)+";{"+a.digits+"}]":(a.decimalProtect?":":a.radixPoint)+";{"+a.digits+"}"),""!=a.negationSymbol.back&&(e+="[-]"),e+=b(a.suffix),a.greedy=!1,e},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,radixPoint:".",radixFocus:!0,groupSize:3,autoGroup:!1,allowPlus:!0,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:void 0,max:void 0,postFormat:function(b,c,d,e){var f=!1;b.length>=e.suffix.length&&b.join("").indexOf(e.suffix)==b.length-e.suffix.length&&(b.length=b.length-e.suffix.length,f=!0),c=c>=b.length?b.length-1:c<e.prefix.length?e.prefix.length:c;var g=!1,h=b[c];if(""==e.groupSeparator||-1!=a.inArray(e.radixPoint,b)&&c>a.inArray(e.radixPoint,b)||new RegExp("["+inputmask.escapeRegex(e.negationSymbol.front)+"+]").test(h)){if(f)for(var i=0,j=e.suffix.length;j>i;i++)b.push(e.suffix.charAt(i));return{pos:c}}var k=b.slice();h==e.groupSeparator&&(k.splice(c--,1),h=k[c]),d?h!=e.radixPoint&&(k[c]="?"):k.splice(c,0,"?");var l=k.join(""),m=l;if(l.length>0&&e.autoGroup||d&&-1!=l.indexOf(e.groupSeparator)){var n=inputmask.escapeRegex(e.groupSeparator);g=0==l.indexOf(e.groupSeparator),l=l.replace(new RegExp(n,"g"),"");var o=l.split(e.radixPoint);if(l=""==e.radixPoint?l:o[0],l!=e.prefix+"?0"&&l.length>=e.groupSize+e.prefix.length)for(var p=new RegExp("([-+]?[\\d?]+)([\\d?]{"+e.groupSize+"})");p.test(l);)l=l.replace(p,"$1"+e.groupSeparator+"$2"),l=l.replace(e.groupSeparator+e.groupSeparator,e.groupSeparator);""!=e.radixPoint&&o.length>1&&(l+=e.radixPoint+o[1])}g=m!=l,b.length=l.length;for(var i=0,j=l.length;j>i;i++)b[i]=l.charAt(i);var q=a.inArray("?",b);if(-1==q&&h==e.radixPoint&&(q=a.inArray(e.radixPoint,b)),d?b[q]=h:b.splice(q,1),!g&&f)for(var i=0,j=e.suffix.length;j>i;i++)b.push(e.suffix.charAt(i));return{pos:q,refreshFromBuffer:g,buffer:b}},onBeforeWrite:function(b,c,d,e){if(b&&"blur"==b.type){var f=c.join(""),g=f.replace(e.prefix,"");if(g=g.replace(e.suffix,""),g=g.replace(new RegExp(inputmask.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(g=g.replace(inputmask.escapeRegex(e.radixPoint),".")),isFinite(g)&&isFinite(e.min)&&parseFloat(g)<parseFloat(e.min))return a.extend(!0,{refreshFromBuffer:!0,buffer:(e.prefix+e.min).split("")},e.postFormat((e.prefix+e.min).split(""),0,!0,e));var h=""!=e.radixPoint?c.join("").split(e.radixPoint):[c.join("")],i=h[0].match(e.regex.integerPart(e)),j=2==h.length?h[1].match(e.regex.integerNPart(e)):void 0;!i||i[0]!=e.negationSymbol.front+"0"&&i[0]!=e.negationSymbol.front&&"+"!=i[0]||void 0!=j&&!j[0].match(/^0+$/)||c.splice(i.index,1);var k=a.inArray(e.radixPoint,c);if(-1!=k&&isFinite(e.digits)&&!e.digitsOptional){for(var l=1;l<=e.digits;l++)(void 0==c[k+l]||c[k+l]==e.placeholder.charAt(0))&&(c[k+l]="0");return{refreshFromBuffer:!0,buffer:c}}}if(e.autoGroup){var m=e.postFormat(c,d-1,!0,e);return m.caret=d<=e.prefix.length?m.pos:m.pos+1,m}},regex:{integerPart:function(a){return new RegExp("["+inputmask.escapeRegex(a.negationSymbol.front)+"+]?\\d+")},integerNPart:function(a){return new RegExp("[\\d"+inputmask.escapeRegex(a.groupSeparator)+"]+")}},signHandler:function(a,b,c,d,e){if(!d&&e.allowMinus&&"-"===a||e.allowPlus&&"+"===a){var f=b.buffer.join("").match(e.regex.integerPart(e));if(f&&f[0].length>0)return b.buffer[f.index]==("-"===a?"+":e.negationSymbol.front)?"-"==a?""!=e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c,insert:{pos:b.buffer.length-e.suffix.length-1,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c}:""!=e.negationSymbol.back?{pos:f.index,c:"+",remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c}:{pos:f.index,c:"+",remove:f.index,caret:c}:b.buffer[f.index]==("-"===a?e.negationSymbol.front:"+")?"-"==a&&""!=e.negationSymbol.back?{
remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c-1}:{remove:f.index,caret:c-1}:"-"==a?""!=e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,caret:c+1,insert:{pos:b.buffer.length-e.suffix.length,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,caret:c+1}:{pos:f.index,c:a,caret:c+1}}return!1},radixHandler:function(b,c,d,e,f){if(!e&&b===f.radixPoint&&f.digits>0){var g=a.inArray(f.radixPoint,c.buffer),h=c.buffer.join("").match(f.regex.integerPart(f));if(-1!=g&&c.validPositions[g])return c.validPositions[g-1]?{caret:g+1}:{pos:h.index,c:h[0],caret:g+1};if(!h||"0"==h[0]&&h.index+1!=d)return c.buffer[h?h.index:d]="0",{pos:(h?h.index:d)+1}}return!1},leadingZeroHandler:function(b,c,d,e,f){var g=c.buffer.join("").match(f.regex.integerNPart(f)),h=a.inArray(f.radixPoint,c.buffer);if(g&&!e&&(-1==h||h>=d))if(0==g[0].indexOf("0")){d<f.prefix.length&&(d=g.index);var i=a.inArray(f.radixPoint,c._buffer),j=c._buffer&&c.buffer.slice(h).join("")==c._buffer.slice(i).join("")||0==parseInt(c.buffer.slice(h+1).join("")),k=c._buffer&&c.buffer.slice(g.index,h).join("")==c._buffer.slice(f.prefix.length,i).join("")||"0"==c.buffer.slice(g.index,h).join("");if(-1==h||j&&k)return c.buffer.splice(g.index,1),d=d>g.index?d-1:g.index,{pos:d,remove:g.index};if(g.index+1==d||"0"==b)return c.buffer.splice(g.index,1),d=g.index,{pos:d,remove:g.index}}else if("0"===b&&d<=g.index&&g[0]!=f.groupSeparator)return!1;return!0},postValidation:function(a,b){var c=!0,d=a.join(""),e=d.replace(b.prefix,"");return e=e.replace(b.suffix,""),e=e.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator),"g"),""),","===b.radixPoint&&(e=e.replace(inputmask.escapeRegex(b.radixPoint),".")),e=e.replace(new RegExp("^"+inputmask.escapeRegex(b.negationSymbol.front)),"-"),e=e.replace(new RegExp(inputmask.escapeRegex(b.negationSymbol.back)+"$"),""),isFinite(e)&&isFinite(b.max)&&(c=parseFloat(e)<=parseFloat(b.max)),c},definitions:{"~":{validator:function(b,c,d,e,f){var g=f.signHandler(b,c,d,e,f);if(!g&&(g=f.radixHandler(b,c,d,e,f),!g&&(g=e?new RegExp("[0-9"+inputmask.escapeRegex(f.groupSeparator)+"]").test(b):new RegExp("[0-9]").test(b),g===!0&&(g=f.leadingZeroHandler(b,c,d,e,f),g===!0)))){var h=a.inArray(f.radixPoint,c.buffer);g=-1!=h&&f.digitsOptional===!1&&d>h&&!e?{pos:d,remove:d}:{pos:d}}return g},cardinality:1,prevalidator:null},"+":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&(d&&e.allowMinus&&a===e.negationSymbol.front||e.allowMinus&&"-"==a||e.allowPlus&&"+"==a)&&(f="-"==a?""!=e.negationSymbol.back?{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1,insert:{pos:b.buffer.length,c:e.negationSymbol.back}}:{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1}:!0),f},cardinality:1,prevalidator:null,placeholder:""},"-":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&d&&e.allowMinus&&a===e.negationSymbol.back&&(f=!0),f},cardinality:1,prevalidator:null,placeholder:""},":":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);if(!f){var g="["+inputmask.escapeRegex(e.radixPoint)+"]";f=new RegExp(g).test(a),f&&b.validPositions[c]&&b.validPositions[c].match.placeholder==e.radixPoint&&(f={caret:c+1})}return f},cardinality:1,prevalidator:null,placeholder:function(a){return a.radixPoint}}},insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,onUnMask:function(a,b,c){var d=a.replace(c.prefix,"");return d=d.replace(c.suffix,""),d=d.replace(new RegExp(inputmask.escapeRegex(c.groupSeparator),"g"),""),c.unmaskAsNumber?(d=d.replace(inputmask.escapeRegex.call(this,c.radixPoint),"."),Number(d)):d},isComplete:function(a,b){var c=a.join(""),d=a.slice();if(b.postFormat(d,0,!0,b),d.join("")!=c)return!1;var e=c.replace(b.prefix,"");return e=e.replace(b.suffix,""),e=e.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator),"g"),""),","===b.radixPoint&&(e=e.replace(inputmask.escapeRegex(b.radixPoint),".")),isFinite(e)},onBeforeMask:function(a,b){if(""!=b.radixPoint&&isFinite(a))a=a.toString().replace(".",b.radixPoint);else{var c=a.match(/,/g),d=a.match(/\./g);d&&c?d.length>c.length?(a=a.replace(/\./g,""),a=a.replace(",",b.radixPoint)):c.length>d.length?(a=a.replace(/,/g,""),a=a.replace(".",b.radixPoint)):a=a.indexOf(".")<a.indexOf(",")?a.replace(/\./g,""):a=a.replace(/,/g,""):a=a.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator),"g"),"")}return 0==b.digits&&(-1!=a.indexOf(".")?a=a.substring(0,a.indexOf(".")):-1!=a.indexOf(",")&&(a=a.substring(0,a.indexOf(",")))),a},canClearPosition:function(b,c,d,e,f){var g=b.validPositions[c].input,h=g!=f.radixPoint&&isFinite(g)||c==d||g==f.groupSeparator||g==f.negationSymbol.front||g==f.negationSymbol.back;if(h&&isFinite(g)){var i;if(!e&&b.buffer){i=b.buffer.join("").substr(0,c).match(f.regex.integerNPart(f));var j=c+1,k=null==i||0==parseInt(i[0].replace(new RegExp(inputmask.escapeRegex(f.groupSeparator),"g"),""));if(k)for(;b.validPositions[j]&&(b.validPositions[j].input==f.groupSeparator||"0"==b.validPositions[j].input);)delete b.validPositions[j],j++}var l=[];for(var m in b.validPositions)l.push(b.validPositions[m].input);i=l.join("").match(f.regex.integerNPart(f));var n=a.inArray(f.radixPoint,b.buffer);if(i&&(-1==n||n>=c))if(0==i[0].indexOf("0"))h=i.index!=c||-1==n;else{var o=parseInt(i[0].replace(new RegExp(inputmask.escapeRegex(f.groupSeparator),"g"),""));-1!=n&&10>o&&(b.validPositions[c].input="0",b.p=f.prefix.length+1,h=!1)}}return h}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:"0",radixPoint:""}}),inputmask}(jQuery),function(a){return inputmask.extendAliases({phone:{url:"phone-codes/phone-codes.js",countrycode:"",mask:function(b){b.definitions["#"]=b.definitions[9];var c=[];return a.ajax({url:b.url,async:!1,dataType:"json",success:function(a){c=a},error:function(a,c,d){alert(d+" - "+b.url)}}),c=c.sort(function(a,b){return(a.mask||a)<(b.mask||b)?-1:1})},keepStatic:!1,nojumps:!0,nojumpsThreshold:1,onBeforeMask:function(a,b){var c=a.replace(/^0/g,"");return(c.indexOf(b.countrycode)>1||-1==c.indexOf(b.countrycode))&&(c="+"+b.countrycode+c),c}},phonebe:{alias:"phone",url:"phone-codes/phone-be.js",countrycode:"32",nojumpsThreshold:4}}),inputmask}(jQuery),function(a){return inputmask.extendAliases({Regex:{mask:"r",greedy:!1,repeat:"*",regex:null,regexTokens:null,tokenizer:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(a,b){return new RegExp(b.regex).test(a.join(""))},definitions:{r:{validator:function(b,c,d,e,f){function g(a,b){this.matches=[],this.isGroup=a||!1,this.isQuantifier=b||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function h(){var a,b,c=new g,d=[];for(f.regexTokens=[];a=f.tokenizer.exec(f.regex);)switch(b=a[0],b.charAt(0)){case"(":d.push(new g(!0));break;case")":var e=d.pop();d.length>0?d[d.length-1].matches.push(e):c.matches.push(e);break;case"{":case"+":case"*":var h=new g(!1,!0);b=b.replace(/[{}]/g,"");var i=b.split(","),j=isNaN(i[0])?i[0]:parseInt(i[0]),k=1==i.length?j:isNaN(i[1])?i[1]:parseInt(i[1]);if(h.quantifier={min:j,max:k},d.length>0){var l=d[d.length-1].matches;if(a=l.pop(),!a.isGroup){var e=new g(!0);e.matches.push(a),a=e}l.push(a),l.push(h)}else{if(a=c.matches.pop(),!a.isGroup){var e=new g(!0);e.matches.push(a),a=e}c.matches.push(a),c.matches.push(h)}break;default:d.length>0?d[d.length-1].matches.push(b):c.matches.push(b)}c.matches.length>0&&f.regexTokens.push(c)}function i(b,c){var d=!1;c&&(k+="(",m++);for(var e=0;e<b.matches.length;e++){var f=b.matches[e];if(1==f.isGroup)d=i(f,!0);else if(1==f.isQuantifier){var g=a.inArray(f,b.matches),h=b.matches[g-1],j=k;if(isNaN(f.quantifier.max)){for(;f.repeaterPart&&f.repeaterPart!=k&&f.repeaterPart.length>k.length&&!(d=i(h,!0)););d=d||i(h,!0),d&&(f.repeaterPart=k),k=j+f.quantifier.max}else{for(var l=0,o=f.quantifier.max-1;o>l&&!(d=i(h,!0));l++);k=j+"{"+f.quantifier.min+","+f.quantifier.max+"}"}}else if(void 0!=f.matches)for(var p=0;p<f.length&&!(d=i(f[p],c));p++);else{var q;if("["==f.charAt(0)){q=k,q+=f;for(var r=0;m>r;r++)q+=")";var s=new RegExp("^("+q+")$");d=s.test(n)}else for(var t=0,u=f.length;u>t;t++)if("\\"!=f.charAt(t)){q=k,q+=f.substr(0,t+1),q=q.replace(/\|$/,"");for(var r=0;m>r;r++)q+=")";var s=new RegExp("^("+q+")$");if(d=s.test(n))break}k+=f}if(d)break}return c&&(k+=")",m--),d}null==f.regexTokens&&h();var j=c.buffer.slice(),k="",l=!1,m=0;j.splice(d,0,b);for(var n=j.join(""),o=0;o<f.regexTokens.length;o++){var g=f.regexTokens[o];if(l=i(g,g.isGroup))break}return l},cardinality:1}}}}),inputmask}(jQuery);



if (typeof jQuery.fn.on === 'function') { // protect against old jQuery libraries


/* Parsley dist/parsley.min.js build version 1.1.16 http://parsleyjs.org */
!function(d){var h=function(a){this.messages={defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",urlstrict:"This value should be a valid url.",number:"This value should be a valid number.",digits:"This value should be digits.",dateIso:"This value should be a valid date (YYYY-MM-DD).",alphanum:"This value should be alphanumeric.",phone:"This value should be a valid phone number."},notnull:"This value should not be null.",
notblank:"This value should not be blank.",required:"This value is required.",regexp:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or less.",rangelength:"This value length is invalid. It should be between %s and %s characters long.",
mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or less.",rangecheck:"You must select between %s and %s choices.",equalto:"This value should be the same."};this.init(a)};h.prototype={constructor:h,validators:{notnull:function(a){return 0<a.length},notblank:function(a){return"string"===typeof a&&""!==a.replace(/^\s+/g,"").replace(/\s+$/g,"")},required:function(a){if("object"===typeof a){for(var b in a)if(this.required(a[b]))return!0;return!1}return this.notnull(a)&&
this.notblank(a)},type:function(a,b){var c;switch(b){case "number":c=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;break;case "digits":c=/^\d+$/;break;case "alphanum":c=/^\w+$/;break;case "email":c=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
break;case "url":a=/(https?|s?ftp|git)/i.test(a)?a:"http://"+a;case "urlstrict":c=/^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
break;case "dateIso":c=/^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;break;case "phone":c=/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;break;default:return!1}return""!==a?c.test(a):!1},regexp:function(a,b,c){return RegExp(b,c.options.regexpFlag||"").test(a)},minlength:function(a,b){return a.length>=b},maxlength:function(a,b){return a.length<=b},rangelength:function(a,b){return this.minlength(a,b[0])&&this.maxlength(a,b[1])},
min:function(a,b){return Number(a)>=b},max:function(a,b){return Number(a)<=b},range:function(a,b){return a>=b[0]&&a<=b[1]},equalto:function(a,b,c){c.options.validateIfUnchanged=!0;return a===d(b).val()},remote:function(a,b,c){var f={},g={};f[c.$element.attr("name")]=a;"undefined"!==typeof c.options.remoteDatatype&&(g={dataType:c.options.remoteDatatype});var m=function(a,b){"undefined"!==typeof b&&("undefined"!==typeof c.Validator.messages.remote&&b!==c.Validator.messages.remote)&&d(c.ulError+" .remote").remove();
c.updtConstraint({name:"remote",valid:a},b);c.manageValidationResult()},n=function(a){if("object"===typeof a)return a;try{a=d.parseJSON(a)}catch(b){}return a},e=function(a){return"object"===typeof a&&null!==a?"undefined"!==typeof a.error?a.error:"undefined"!==typeof a.message?a.message:null:null};d.ajax(d.extend({},{url:b,data:f,type:c.options.remoteMethod||"GET",success:function(a){a=n(a);m(1===a||!0===a||"object"===typeof a&&null!==a&&"undefined"!==typeof a.success,e(a))},error:function(a){a=n(a);
m(!1,e(a))}},g));return null},mincheck:function(a,b){return this.minlength(a,b)},maxcheck:function(a,b){return this.maxlength(a,b)},rangecheck:function(a,b){return this.rangelength(a,b)}},init:function(a){var b=a.validators;a=a.messages;for(var c in b)this.addValidator(c,b[c]);for(c in a)this.addMessage(c,a[c])},formatMesssage:function(a,b){if("object"===typeof b){for(var c in b)a=this.formatMesssage(a,b[c]);return a}return"string"===typeof a?a.replace(/%s/i,b):""},addValidator:function(a,b){this.validators[a]=
b},addMessage:function(a,b,c){if("undefined"!==typeof c&&!0===c)this.messages.type[a]=b;else if("type"===a)for(var d in b)this.messages.type[d]=b[d];else this.messages[a]=b}};var j=function(a,b,c){this.options=b;this.Validator=new h(b);if("ParsleyFieldMultiple"===c)return this;this.init(a,c||"ParsleyField")};j.prototype={constructor:j,init:function(a,b){this.type=b;this.valid=!0;this.element=a;this.validatedOnce=!1;this.$element=d(a);this.val=this.$element.val();this.isRequired=!1;this.constraints=
{};"undefined"===typeof this.isRadioOrCheckbox&&(this.isRadioOrCheckbox=!1,this.hash=this.generateHash(),this.errorClassHandler=this.options.errors.classHandler(a,this.isRadioOrCheckbox)||this.$element);this.ulErrorManagement();this.bindHtml5Constraints();this.addConstraints();this.hasConstraints()&&this.bindValidationEvents()},setParent:function(a){this.$parent=d(a)},getParent:function(){return this.$parent},bindHtml5Constraints:function(){if(this.$element.hasClass("required")||this.$element.prop("required"))this.options.required=
!0;"undefined"!==typeof this.$element.attr("type")&&RegExp(this.$element.attr("type"),"i").test("email url number range")&&(this.options.type=this.$element.attr("type"),RegExp(this.options.type,"i").test("number range")&&(this.options.type="number","undefined"!==typeof this.$element.attr("min")&&this.$element.attr("min").length&&(this.options.min=this.$element.attr("min")),"undefined"!==typeof this.$element.attr("max")&&this.$element.attr("max").length&&(this.options.max=this.$element.attr("max"))));
"string"===typeof this.$element.attr("pattern")&&this.$element.attr("pattern").length&&(this.options.regexp=this.$element.attr("pattern"))},addConstraints:function(){for(var a in this.options){var b={};b[a]=this.options[a];this.addConstraint(b,!0)}},addConstraint:function(a,b){for(var c in a)c=c.toLowerCase(),"function"===typeof this.Validator.validators[c]&&(this.constraints[c]={name:c,requirements:a[c],valid:null},"required"===c&&(this.isRequired=!0),this.addCustomConstraintMessage(c));"undefined"===
typeof b&&this.bindValidationEvents()},updateConstraint:function(a,b){for(var c in a)this.updtConstraint({name:c,requirements:a[c],valid:null},b)},updtConstraint:function(a,b){this.constraints[a.name]=d.extend(!0,this.constraints[a.name],a);"string"===typeof b&&(this.Validator.messages[a.name]=b);this.bindValidationEvents()},removeConstraint:function(a){a=a.toLowerCase();delete this.constraints[a];"required"===a&&(this.isRequired=!1);this.hasConstraints()?this.bindValidationEvents():"ParsleyForm"===
typeof this.getParent()?this.getParent().removeItem(this.$element):this.destroy()},addCustomConstraintMessage:function(a){var b=a+("type"===a&&"undefined"!==typeof this.options[a]?this.options[a].charAt(0).toUpperCase()+this.options[a].substr(1):"")+"Message";"undefined"!==typeof this.options[b]&&this.Validator.addMessage("type"===a?this.options[a]:a,this.options[b],"type"===a)},bindValidationEvents:function(){this.valid=null;this.$element.addClass("parsley-validated");this.$element.off("."+this.type);
this.options.remote&&!/change/i.test(this.options.trigger)&&(this.options.trigger=!this.options.trigger?"change":" change");var a=(!this.options.trigger?"":this.options.trigger)+(/key/i.test(this.options.trigger)?"":" keyup");this.$element.is("select")&&(a+=/change/i.test(a)?"":" change");a=a.replace(/^\s+/g,"").replace(/\s+$/g,"");this.$element.on((a+" ").split(" ").join("."+this.type+" "),!1,d.proxy(this.eventValidation,this))},generateHash:function(){return"parsley-"+(Math.random()+"").substring(2)},
getHash:function(){return this.hash},getVal:function(){return this.$element.data("value")||this.$element.val()},eventValidation:function(a){var b=this.getVal();if("keyup"===a.type&&!/keyup/i.test(this.options.trigger)&&!this.validatedOnce||"change"===a.type&&!/change/i.test(this.options.trigger)&&!this.validatedOnce||!this.isRadioOrCheckbox&&b.length<this.options.validationMinlength&&!this.validatedOnce)return!0;this.validate()},isValid:function(){return this.validate(!1)},hasConstraints:function(){for(var a in this.constraints)return!0;
return!1},validate:function(a){var b=this.getVal(),c=null;if(!this.hasConstraints())return null;if(this.options.listeners.onFieldValidate(this.element,this)||""===b&&!this.isRequired)return this.reset(),null;if(!this.needsValidation(b))return this.valid;c=this.applyValidators();("undefined"!==typeof a?a:this.options.showErrors)&&this.manageValidationResult();return c},needsValidation:function(a){if(!this.options.validateIfUnchanged&&null!==this.valid&&this.val===a&&this.validatedOnce)return!1;this.val=
a;return this.validatedOnce=!0},applyValidators:function(){var a=null,b;for(b in this.constraints){var c=this.Validator.validators[this.constraints[b].name](this.val,this.constraints[b].requirements,this);!1===c?(a=!1,this.constraints[b].valid=a,this.options.listeners.onFieldError(this.element,this.constraints,this)):!0===c&&(this.constraints[b].valid=!0,a=!1!==a,this.options.listeners.onFieldSuccess(this.element,this.constraints,this))}return a},manageValidationResult:function(){var a=null,b;for(b in this.constraints)!1===
this.constraints[b].valid?(this.manageError(this.constraints[b]),a=!1):!0===this.constraints[b].valid&&(this.removeError(this.constraints[b].name),a=!1!==a);this.valid=a;return!0===this.valid?(this.removeErrors(),this.errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass),!0):!1===this.valid?(this.errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass),!1):a},ulErrorManagement:function(){this.ulError="#"+this.hash;this.ulTemplate=
d(this.options.errors.errorsWrapper).attr("id",this.hash).addClass("parsley-error-list")},removeError:function(a){a=this.ulError+" ."+a;var b=this;this.options.animate?d(a).fadeOut(this.options.animateDuration,function(){d(this).remove();b.ulError&&0===d(b.ulError).children().length&&b.removeErrors()}):d(a).remove();this.ulError&&0===d(this.ulError).children().length&&this.removeErrors()},addError:function(a){for(var b in a){var c=d(this.options.errors.errorElem).addClass(b);d(this.ulError).append(this.options.animate?
d(c).html(a[b]).hide().fadeIn(this.options.animateDuration):d(c).html(a[b]))}},removeErrors:function(){this.options.animate?d(this.ulError).fadeOut(this.options.animateDuration,function(){d(this).remove()}):d(this.ulError).remove()},reset:function(){this.valid=null;this.removeErrors();this.validatedOnce=!1;this.errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);for(var a in this.constraints)this.constraints[a].valid=null;return this},manageError:function(a){d(this.ulError).length||
this.manageErrorContainer();if(!("required"===a.name&&null!==this.getVal()&&0<this.getVal().length)&&(!this.isRequired||!("required"!==a.name&&(null===this.getVal()||0===this.getVal().length)))){var b=a.name,c=!1!==this.options.errorMessage?"custom-error-message":b,f={};a=!1!==this.options.errorMessage?this.options.errorMessage:"type"===a.name?this.Validator.messages[b][a.requirements]:"undefined"===typeof this.Validator.messages[b]?this.Validator.messages.defaultMessage:this.Validator.formatMesssage(this.Validator.messages[b],
a.requirements);d(this.ulError+" ."+c).length||(f[c]=a,this.addError(f))}},manageErrorContainer:function(){var a=this.options.errorContainer||this.options.errors.container(this.element,this.isRadioOrCheckbox),b=this.options.animate?this.ulTemplate.show():this.ulTemplate;"undefined"!==typeof a?d(a).append(b):!this.isRadioOrCheckbox?this.$element.after(b):this.$element.parent().after(b)},addListener:function(a){for(var b in a)this.options.listeners[b]=a[b]},destroy:function(){this.$element.removeClass("parsley-validated");
this.reset().$element.off("."+this.type).removeData(this.type)}};var l=function(a,b,c){this.initMultiple(a,b);this.inherit(a,b);this.Validator=new h(b);this.init(a,c||"ParsleyFieldMultiple")};l.prototype={constructor:l,initMultiple:function(a,b){this.element=a;this.$element=d(a);this.group=b.group||!1;this.hash=this.getName();this.siblings=this.group?'[data-group="'+this.group+'"]':'input[name="'+this.$element.attr("name")+'"]';this.isRadioOrCheckbox=!0;this.isRadio=this.$element.is("input[type=radio]");
this.isCheckbox=this.$element.is("input[type=checkbox]");this.errorClassHandler=b.errors.classHandler(a,this.isRadioOrCheckbox)||this.$element.parent()},inherit:function(a,b){var c=new j(a,b,"ParsleyFieldMultiple"),d;for(d in c)"undefined"===typeof this[d]&&(this[d]=c[d])},getName:function(){if(this.group)return"parsley-"+this.group;if("undefined"===typeof this.$element.attr("name"))throw"A radio / checkbox input must have a data-group attribute or a name to be Parsley validated !";return"parsley-"+
this.$element.attr("name").replace(/(:|\.|\[|\])/g,"")},getVal:function(){if(this.isRadio)return d(this.siblings+":checked").val()||"";if(this.isCheckbox){var a=[];d(this.siblings+":checked").each(function(){a.push(d(this).val())});return a}},bindValidationEvents:function(){this.valid=null;this.$element.addClass("parsley-validated");this.$element.off("."+this.type);var a=this,b=(!this.options.trigger?"":this.options.trigger)+(/change/i.test(this.options.trigger)?"":" change"),b=b.replace(/^\s+/g,
"").replace(/\s+$/g,"");d(this.siblings).each(function(){d(this).on(b.split(" ").join("."+a.type+" "),!1,d.proxy(a.eventValidation,a))})}};var k=function(a,b,c){this.init(a,b,c||"parsleyForm")};k.prototype={constructor:k,init:function(a,b,c){this.type=c;this.items=[];this.$element=d(a);this.options=b;var f=this;this.$element.find(b.inputs).each(function(){f.addItem(this)});this.$element.on("submit."+this.type,!1,d.proxy(this.validate,this))},addListener:function(a){for(var b in a)if(/Field/.test(b))for(var c=
0;c<this.items.length;c++)this.items[c].addListener(a);else this.options.listeners[b]=a[b]},addItem:function(a){if(d(a).is(this.options.excluded))return!1;a=d(a).parsley(this.options);a.setParent(this);this.items.push(a)},removeItem:function(a){a=d(a).parsley();for(var b=0;b<this.items.length;b++)if(this.items[b].hash===a.hash)return this.items[b].destroy(),this.items.splice(b,1),!0;return!1},validate:function(a){var b=!0;this.focusedField=!1;for(var c=0;c<this.items.length;c++)if("undefined"!==typeof this.items[c]&&
!1===this.items[c].validate()&&(b=!1,!this.focusedField&&"first"===this.options.focus||"last"===this.options.focus))this.focusedField=this.items[c].$element;this.focusedField&&!b&&this.focusedField.focus();this.options.listeners.onFormSubmit(b,a,this);return b},isValid:function(){for(var a=0;a<this.items.length;a++)if(!1===this.items[a].isValid())return!1;return!0},removeErrors:function(){for(var a=0;a<this.items.length;a++)this.items[a].parsley("reset")},destroy:function(){for(var a=0;a<this.items.length;a++)this.items[a].destroy();
this.$element.off("."+this.type).removeData(this.type)},reset:function(){for(var a=0;a<this.items.length;a++)this.items[a].reset()}};d.fn.parsley=function(a,b){function c(c,g){var e=d(c).data(g);if(!e){switch(g){case "parsleyForm":e=new k(c,f,"parsleyForm");break;case "parsleyField":e=new j(c,f,"parsleyField");break;case "parsleyFieldMultiple":e=new l(c,f,"parsleyFieldMultiple");break;default:return}d(c).data(g,e)}return"string"===typeof a&&"function"===typeof e[a]?(e=e[a](b),"undefined"!==typeof e?
e:d(c)):e}var f=d.extend(!0,{},d.fn.parsley.defaults,"undefined"!==typeof window.ParsleyConfig?window.ParsleyConfig:{},a,this.data()),g=null;d(this).is("form")?g=c(d(this),"parsleyForm"):d(this).is(f.inputs)&&!d(this).is(f.excluded)&&(g=c(d(this),!d(this).is("input[type=radio], input[type=checkbox]")?"parsleyField":"parsleyFieldMultiple"));return"function"===typeof b?b():g};d.fn.parsley.Constructor=k;d.fn.parsley.defaults={inputs:"input, textarea, select",excluded:"input[type=hidden], :disabled",
trigger:!1,animate:!0,animateDuration:300,focus:"first",validationMinlength:3,successClass:"parsley-success",errorClass:"parsley-error",errorMessage:!1,validators:{},showErrors:!0,messages:{},validateIfUnchanged:!1,errors:{classHandler:function(){},container:function(){},errorsWrapper:"<ul></ul>",errorElem:"<li></li>"},listeners:{onFieldValidate:function(){return!1},onFormSubmit:function(){},onFieldError:function(){},onFieldSuccess:function(){}}};d(window).on("load",function(){d('[data-validate="parsley"]').each(function(){d(this).parsley()})})}(window.jQuery||
window.Zepto);




}
/*
 * jQuery scrollintoview() plugin and :scrollable selector filter
 *
 * Version 1.8 (14 Jul 2011)
 * Requires jQuery 1.4 or newer
 *
 * Copyright (c) 2011 Robert Koritnik
 * Licensed under the terms of the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(f){var c={vertical:{x:false,y:true},horizontal:{x:true,y:false},both:{x:true,y:true},x:{x:true,y:false},y:{x:false,y:true}};var b={duration:"fast",direction:"both"};var e=/^(?:html)$/i;var g=function(k,j){j=j||(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(k,null):k.currentStyle);var i=document.defaultView&&document.defaultView.getComputedStyle?true:false;var h={top:(parseFloat(i?j.borderTopWidth:f.css(k,"borderTopWidth"))||0),left:(parseFloat(i?j.borderLeftWidth:f.css(k,"borderLeftWidth"))||0),bottom:(parseFloat(i?j.borderBottomWidth:f.css(k,"borderBottomWidth"))||0),right:(parseFloat(i?j.borderRightWidth:f.css(k,"borderRightWidth"))||0)};return{top:h.top,left:h.left,bottom:h.bottom,right:h.right,vertical:h.top+h.bottom,horizontal:h.left+h.right}};var d=function(h){var j=f(window);var i=e.test(h[0].nodeName);return{border:i?{top:0,left:0,bottom:0,right:0}:g(h[0]),scroll:{top:(i?j:h).scrollTop(),left:(i?j:h).scrollLeft()},scrollbar:{right:i?0:h.innerWidth()-h[0].clientWidth,bottom:i?0:h.innerHeight()-h[0].clientHeight},rect:(function(){var k=h[0].getBoundingClientRect();return{top:i?0:k.top,left:i?0:k.left,bottom:i?h[0].clientHeight:k.bottom,right:i?h[0].clientWidth:k.right}})()}};f.fn.extend({scrollintoview:function(j){j=f.extend({},b,j);j.direction=c[typeof(j.direction)==="string"&&j.direction.toLowerCase()]||c.both;var n="";if(j.direction.x===true){n="horizontal"}if(j.direction.y===true){n=n?"both":"vertical"}var l=this.eq(0);var i=l.closest(":scrollable("+n+")");if(i.length>0){i=i.eq(0);var m={e:d(l),s:d(i)};var h={top:m.e.rect.top-(m.s.rect.top+m.s.border.top),bottom:m.s.rect.bottom-m.s.border.bottom-m.s.scrollbar.bottom-m.e.rect.bottom,left:m.e.rect.left-(m.s.rect.left+m.s.border.left),right:m.s.rect.right-m.s.border.right-m.s.scrollbar.right-m.e.rect.right};var k={};if(j.direction.y===true){if(h.top<0){k.scrollTop=m.s.scroll.top+h.top}else{if(h.top>0&&h.bottom<0){k.scrollTop=m.s.scroll.top+Math.min(h.top,-h.bottom)}}}if(j.direction.x===true){if(h.left<0){k.scrollLeft=m.s.scroll.left+h.left}else{if(h.left>0&&h.right<0){k.scrollLeft=m.s.scroll.left+Math.min(h.left,-h.right)}}}if(!f.isEmptyObject(k)){if(e.test(i[0].nodeName)){i=f("html,body")}i.animate(k,j.duration).eq(0).queue(function(o){f.isFunction(j.complete)&&j.complete.call(i[0]);o()})}else{f.isFunction(j.complete)&&j.complete.call(i[0])}}return this}});var a={auto:true,scroll:true,visible:false,hidden:false};f.extend(f.expr[":"],{scrollable:function(k,i,n,h){var m=c[typeof(n[3])==="string"&&n[3].toLowerCase()]||c.both;var l=(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(k,null):k.currentStyle);var o={x:a[l.overflowX.toLowerCase()]||false,y:a[l.overflowY.toLowerCase()]||false,isRoot:e.test(k.nodeName)};if(!o.x&&!o.y&&!o.isRoot){return false}var j={height:{scroll:k.scrollHeight,client:k.clientHeight},width:{scroll:k.scrollWidth,client:k.clientWidth},scrollableX:function(){return(o.x||o.isRoot)&&this.width.scroll>this.width.client},scrollableY:function(){return(o.y||o.isRoot)&&this.height.scroll>this.height.client}};return m.y&&j.scrollableY()||m.x&&j.scrollableX()}})})(jQuery);

if (typeof jQuery.fn.on === 'function') { // protect against old jQuery libraries

/*! jQuery UI - v1.10.3 - 2013-06-30
* http://jqueryui.com
* Includes: jquery.ui.widget.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);



(function(c){c(window.jQuery,window,document)})(function(c,p,u,v){c.widget("selectBox.selectBoxIt",{VERSION:"3.6.0",options:{showEffect:"none",showEffectOptions:{},showEffectSpeed:"medium",hideEffect:"none",hideEffectOptions:{},hideEffectSpeed:"medium",showFirstOption:!0,defaultText:"",defaultIcon:"",downArrowIcon:"",theme:"default",keydownOpen:!0,isMobile:function(){return/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(navigator.userAgent||navigator.vendor||p.opera)},"native":!1,
aggressiveChange:!1,selectWhenHidden:!0,viewport:c(p),similarSearch:!1,copyAttributes:["title","rel"],copyClasses:"button",nativeMousedown:!1,customShowHideEvent:!1,autoWidth:!0,html:!0,populate:"",dynamicPositioning:!0,hideCurrent:!1},getThemes:function(){var a=c(this.element).attr("data-theme")||"c";return{bootstrap:{focus:"active",hover:"",enabled:"enabled",disabled:"disabled",arrow:"caret",button:"btn",list:"dropdown-menu",container:"bootstrap",open:"open"},jqueryui:{focus:"ui-state-focus",hover:"ui-state-hover",
enabled:"ui-state-enabled",disabled:"ui-state-disabled",arrow:"ui-icon ui-icon-triangle-1-s",button:"ui-widget ui-state-default",list:"ui-widget ui-widget-content",container:"jqueryui",open:"selectboxit-open"},jquerymobile:{focus:"ui-btn-down-"+a,hover:"ui-btn-hover-"+a,enabled:"ui-enabled",disabled:"ui-disabled",arrow:"ui-icon ui-icon-arrow-d ui-icon-shadow",button:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+a,list:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+
a,container:"jquerymobile",open:"selectboxit-open"},"default":{focus:"selectboxit-focus",hover:"selectboxit-hover",enabled:"selectboxit-enabled",disabled:"selectboxit-disabled",arrow:"selectboxit-default-arrow",button:"selectboxit-btn",list:"selectboxit-list",container:"selectboxit-container",open:"selectboxit-open"}}},isDeferred:function(a){return c.isPlainObject(a)&&a.promise&&a.done},_create:function(a){var b=this.options.populate;if(this.element.is("select"))return this.widgetProto=c.Widget.prototype,
this.originalElem=this.element[0],this.selectBox=this.element,this.options.populate&&(this.add&&!a)&&this.add(b),this.selectItems=this.element.find("option"),this.firstSelectItem=this.selectItems.slice(0,1),this.documentHeight=c(u).height(),this.theme=this.getThemes()[this.options.theme]||this.getThemes()["default"],this.currentFocus=0,this.blur=!0,this.textArray=[],this.currentIndex=0,this.currentText="",this.flipped=!1,a||(this.selectBoxStyles=this.selectBox.attr("style")),this._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(this.theme)._eventHandlers(),
this.originalElem.disabled&&this.disable&&this.disable(),this._ariaAccessibility&&this._ariaAccessibility(),this.isMobile=this.options.isMobile(),this._mobile&&this._mobile(),this.options["native"]&&this._applyNativeSelect(),this.triggerEvent("create"),this},_createDropdownButton:function(){var a=this.originalElemId=this.originalElem.id||"",b=this.originalElemValue=this.originalElem.value||"",d=this.originalElemName=this.originalElem.name||"",e=this.options.copyClasses,h=this.selectBox.attr("class")||
"";this.dropdownText=c("<span/>",{id:a&&a+"SelectBoxItText","class":"selectboxit-text",unselectable:"on",text:this.firstSelectItem.text()}).attr("data-val",b);this.dropdownImageContainer=c("<span/>",{"class":"selectboxit-option-icon-container"});this.dropdownImage=c("<i/>",{id:a&&a+"SelectBoxItDefaultIcon","class":"selectboxit-default-icon",unselectable:"on"});this.dropdown=c("<span/>",{id:a&&a+"SelectBoxIt","class":"selectboxit "+("button"===e?h:"")+" "+(this.selectBox.prop("disabled")?this.theme.disabled:
this.theme.enabled),name:d,tabindex:this.selectBox.attr("tabindex")||"0",unselectable:"on"}).append(this.dropdownImageContainer.append(this.dropdownImage)).append(this.dropdownText);this.dropdownContainer=c("<span/>",{id:a&&a+"SelectBoxItContainer","class":"selectboxit-container "+("container"===e?h:"")}).append(this.dropdown);return this},_createUnorderedList:function(){var a=this,b,d,e,h,g,n,f,k="",m=a.originalElemId||"",m=c("<ul/>",{id:m&&m+"SelectBoxItOptions","class":"selectboxit-options",tabindex:-1}),
s,t,q,r;a.options.showFirstOption||(a.selectItems.first().attr("disabled","disabled"),a.selectItems=a.selectBox.find("option").slice(1));a.selectItems.each(function(m){e=d="";b=c(this).prop("disabled");h=c(this).attr("data-icon")||"";n=(g=c(this).attr("data-iconurl")||"")?"selectboxit-option-icon-url":"";f=g?"style=\"background-image:url('"+g+"');\"":"";s=c(this).attr("data-selectedtext");q=(t=c(this).attr("data-text"))?t:c(this).text();r=c(this).parent();r.is("optgroup")&&(d="selectboxit-optgroup-option",
0===c(this).index()&&(e='<span class="selectboxit-optgroup-header '+r.first().attr("class")+'"data-disabled="true">'+r.first().attr("label")+"</span>"));k+=e+'<li id="'+m+'" data-val="'+this.value+'" data-disabled="'+b+'" class="'+d+" selectboxit-option "+(c(this).attr("class")||"")+'"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon '+h+" "+(n||a.theme.container)+'"'+f+"></i></span>"+(a.options.html?q:a.htmlEscape(q))+"</a></li>";
a.textArray[m]=b?"":q;this.selected&&(a._setText(a.dropdownText,s||q),a.currentFocus=m)});if(a.options.defaultText||a.selectBox.attr("data-text")){var p=a.options.defaultText||a.selectBox.attr("data-text");a._setText(a.dropdownText,p);a.options.defaultText=p}m.append(k);a.list=m;a.dropdownContainer.append(a.list);a.listItems=a.list.find("li");a.listAnchors=a.list.find("a");a.listItems.first().addClass("selectboxit-option-first");a.listItems.last().addClass("selectboxit-option-last");a.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(a.theme.disabled);
a.dropdownImage.addClass(a.selectBox.attr("data-icon")||a.options.defaultIcon||a.listItems.eq(a.currentFocus).find("i").attr("class"));a.dropdownImage.attr("style",a.listItems.eq(a.currentFocus).find("i").attr("style"));return a},_replaceSelectBox:function(){var a=this.originalElem.id||"",b=this.selectBox.attr("data-size"),b=this.listSize=b===v?"auto":"0"===b?"auto":+b;this.selectBox.css("display","none").after(this.dropdownContainer);this.dropdown.height();this.downArrow=c("<i/>",{id:a&&a+"SelectBoxItArrow",
"class":"selectboxit-arrow",unselectable:"on"});this.downArrowContainer=c("<span/>",{id:a&&a+"SelectBoxItArrowContainer","class":"selectboxit-arrow-container",unselectable:"on"}).append(this.downArrow);this.dropdown.append(this.downArrowContainer);this.listItems.removeClass("selectboxit-selected").eq(this.currentFocus).addClass("selectboxit-selected");this._realOuterWidth(this.dropdownImageContainer)||this.dropdownImageContainer.remove();this.options.autoWidth&&(this.dropdown.is(":visible")?this.dropdown.css({width:"auto"}).css({width:this.list.outerWidth(!0)+
this.downArrowContainer.outerWidth(!0)+this.dropdownImage.outerWidth(!0)}):this.dropdown.css({width:"auto"}).css({width:this._realOuterWidth(this.list)+this._realOuterWidth(this.downArrowContainer)+this._realOuterWidth(this.dropdownImage)}),this.list.css({"min-width":this.dropdown.width()}));this.dropdownText.css({"max-width":this.dropdownContainer.width()-(this.downArrowContainer.outerWidth(!0)+this.dropdownImage.outerWidth(!0))});"number"===c.type(b)&&(this.maxHeight=this.listAnchors.outerHeight(!0)*
b);return this},_scrollToView:function(a){var b=this.listItems.eq(this.currentFocus),d=this.list.scrollTop(),c=b.height(),b=b.position().top,h=Math.abs(b),g=this.list.height();"search"===a?g-b<c?this.list.scrollTop(d+(b-(g-c))):-1>b&&this.list.scrollTop(b-c):"up"===a?-1>b&&this.list.scrollTop(d-h):"down"===a&&g-b<c&&this.list.scrollTop(d+(h-g+c));return this},_callbackSupport:function(a){c.isFunction(a)&&a.call(this,this.dropdown);return this},_setText:function(a,b){this.options.html?a.html(b):a.text(b);
return this},open:function(a){var b=this,d=b.options.showEffect,c=b.options.showEffectSpeed,h=b.options.showEffectOptions,g=b.options["native"],f=b.isMobile;if(!b.listItems.length||b.dropdown.hasClass(b.theme.disabled))return b;if(!g&&!f&&!this.list.is(":visible")){b.triggerEvent("open");b._dynamicPositioning&&b.options.dynamicPositioning&&b._dynamicPositioning();if("none"===d)b.list.show();else if("show"===d||"slideDown"===d||"fadeIn"===d)b.list[d](c);else b.list.show(d,h,c);b.list.promise().done(function(){b._scrollToView("search")})}b._callbackSupport(a);
return b},close:function(a){var b=this.options.hideEffect,d=this.options.hideEffectSpeed,c=this.options.hideEffectOptions,h=this.isMobile;if(!this.options["native"]&&!h&&this.list.is(":visible"))if(this.triggerEvent("close"),"none"===b)this.list.hide();else if("hide"===b||"slideUp"===b||"fadeOut"===b)this.list[b](d);else this.list.hide(b,c,d);this._callbackSupport(a);return this},toggle:function(){var a=this.list.is(":visible");a?this.close():a||this.open()},_keyMappings:{38:"up",40:"down",13:"enter",
8:"backspace",9:"tab",32:"space",27:"esc"},_keydownMethods:function(){var a=this,b=a.list.is(":visible")||!a.options.keydownOpen;return{down:function(){a.moveDown&&b&&a.moveDown()},up:function(){a.moveUp&&b&&a.moveUp()},enter:function(){var b=a.listItems.eq(a.currentFocus);a._update(b);"true"!==b.attr("data-preventclose")&&a.close();a.triggerEvent("enter")},tab:function(){a.triggerEvent("tab-blur");a.close()},backspace:function(){a.triggerEvent("backspace")},esc:function(){a.close()}}},_eventHandlers:function(){var a=
this,b=a.options.nativeMousedown,d=a.options.customShowHideEvent,e,h,g=a.focusClass,f=a.hoverClass,l=a.openClass;this.dropdown.on({"click.selectBoxIt":function(){a.dropdown.trigger("focus",!0);a.originalElem.disabled||(a.triggerEvent("click"),b||d||a.toggle())},"mousedown.selectBoxIt":function(){c(this).data("mdown",!0);a.triggerEvent("mousedown");b&&!d&&a.toggle()},"mouseup.selectBoxIt":function(){a.triggerEvent("mouseup")},"blur.selectBoxIt":function(){a.blur&&(a.triggerEvent("blur"),a.close(),
c(this).removeClass(g))},"focus.selectBoxIt":function(b,d){var e=c(this).data("mdown");c(this).removeData("mdown");e||d||setTimeout(function(){a.triggerEvent("tab-focus")},0);d||(c(this).hasClass(a.theme.disabled)||c(this).addClass(g),a.triggerEvent("focus"))},"keydown.selectBoxIt":function(b){var d=a._keyMappings[b.keyCode],c=a._keydownMethods()[d];c&&(c(),!a.options.keydownOpen||"up"!==d&&"down"!==d||a.open());c&&"tab"!==d&&b.preventDefault()},"keypress.selectBoxIt":function(b){var d=a._keyMappings[b.charCode||
b.keyCode],c=String.fromCharCode(b.charCode||b.keyCode);a.search&&(!d||d&&"space"===d)&&a.search(c,!0,!0);"space"===d&&b.preventDefault()},"mouseenter.selectBoxIt":function(){a.triggerEvent("mouseenter")},"mouseleave.selectBoxIt":function(){a.triggerEvent("mouseleave")}});a.list.on({"mouseover.selectBoxIt":function(){a.blur=!1},"mouseout.selectBoxIt":function(){a.blur=!0}});a.list.on({"click.selectBoxIt":function(){a._update(c(this));a.triggerEvent("option-click");"false"===c(this).attr("data-disabled")&&
"true"!==c(this).attr("data-preventclose")&&a.close()},"focusin.selectBoxIt":function(){a.listItems.not(c(this)).removeAttr("data-active");c(this).attr("data-active","");var b=a.list.is(":hidden");(a.options.searchWhenHidden&&b||a.options.aggressiveChange||b&&a.options.selectWhenHidden)&&a._update(c(this));c(this).add(c(this).find(".selectboxit-option-anchor")).addClass(g)},"mouseup.selectBoxIt":function(){b&&!d&&(a._update(c(this)),a.triggerEvent("option-mouseup"),"false"===c(this).attr("data-disabled")&&
"true"!==c(this).attr("data-preventclose")&&a.close())},"mouseenter.selectBoxIt":function(){"false"===c(this).attr("data-disabled")&&(a.listItems.removeAttr("data-active"),c(this).addClass(g).attr("data-active",""),a.listItems.not(c(this)).add(a.listAnchors.not(c(this).find(".selectboxit-option-anchor"))).removeClass(g),c(this).add(c(this).find(".selectboxit-option-anchor")).addClass(g),a.currentFocus=+c(this).attr("id"))},"mouseleave.selectBoxIt":function(){"false"===c(this).attr("data-disabled")&&
(a.listItems.not(c(this)).removeClass(g).removeAttr("data-active"),c(this).add(c(this).find(".selectboxit-option-anchor")).addClass(g),a.currentFocus=+c(this).attr("id"))},"blur.selectBoxIt":function(){c(this).add(c(this).find(".selectboxit-option-anchor")).removeClass(g)}},".selectboxit-option");a.list.on({"click.selectBoxIt":function(a){a.preventDefault()}},"a");a.selectBox.on({"change.selectBoxIt, internal-change.selectBoxIt":function(b,d){var c,g;d||(c=a.list.find('li[data-val="'+a.originalElem.value+
'"]'),c.length&&(a.listItems.eq(a.currentFocus).removeClass(a.focusClass),a.currentFocus=+c.attr("id")));c=a.listItems.eq(a.currentFocus);g=c.attr("data-selectedtext");h=(e=c.attr("data-text"))?e:c.find("a").text();a._setText(a.dropdownText,g||h);a.dropdownText.attr("data-val",a.originalElem.value);c.find("i").attr("class")&&(a.dropdownImage.attr("class",c.find("i").attr("class")).addClass("selectboxit-default-icon"),a.dropdownImage.attr("style",c.find("i").attr("style")));a.triggerEvent("changed")},
"disable.selectBoxIt":function(){a.dropdown.addClass(a.theme.disabled)},"enable.selectBoxIt":function(){a.dropdown.removeClass(a.theme.disabled)},"open.selectBoxIt":function(){var b=a.list.find("li[data-val='"+a.dropdownText.attr("data-val")+"']");b.length||(b=a.listItems.not("[data-disabled=true]").first());a.currentFocus=+b.attr("id");b=a.listItems.eq(a.currentFocus);a.dropdown.addClass(l).removeClass(f).addClass(g);a.listItems.removeClass(a.selectedClass).removeAttr("data-active").not(b).add(a.listAnchors.not(b.find(".selectboxit-option-anchor"))).removeClass(g);
b.addClass(a.selectedClass).add(b.find(".selectboxit-option-anchor")).addClass(g);a.options.hideCurrent&&(a.listItems.show(),b.hide())},"close.selectBoxIt":function(){a.dropdown.removeClass(l)},"blur.selectBoxIt":function(){a.dropdown.removeClass(g)},"mouseenter.selectBoxIt":function(){c(this).hasClass(a.theme.disabled)||a.dropdown.addClass(f)},"mouseleave.selectBoxIt":function(){a.dropdown.removeClass(f)},destroy:function(a){a.preventDefault();a.stopPropagation()}});return a},_update:function(a){var b,
d=this.options.defaultText||this.selectBox.attr("data-text"),c=this.listItems.eq(this.currentFocus);"false"===a.attr("data-disabled")&&(this.listItems.eq(this.currentFocus).attr("data-selectedtext"),(b=c.attr("data-text"))||c.text(),(d&&this.options.html?this.dropdownText.html()===d:this.dropdownText.text()===d)&&this.selectBox.val()===a.attr("data-val")?this.triggerEvent("change"):(this.selectBox.val(a.attr("data-val")),this.currentFocus=+a.attr("id"),this.originalElem.value!==this.dropdownText.attr("data-val")&&
this.triggerEvent("change")))},_addClasses:function(a){this.focusClass=a.focus;this.hoverClass=a.hover;var b=a.button,d=a.list,c=a.arrow,h=a.container;this.openClass=a.open;this.selectedClass="selectboxit-selected";this.downArrow.addClass(this.selectBox.attr("data-downarrow")||this.options.downArrowIcon||c);this.dropdownContainer.addClass(h);this.dropdown.addClass(b);this.list.addClass(d);return this},refresh:function(a,b){this._destroySelectBoxIt()._create(!0);b||this.triggerEvent("refresh");this._callbackSupport(a);
return this},htmlEscape:function(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},triggerEvent:function(a){this.selectBox.trigger(a,{selectbox:this.selectBox,selectboxOption:this.selectItems.eq(this.options.showFirstOption?this.currentFocus:0<=this.currentFocus-1?this.currentFocus:0),dropdown:this.dropdown,dropdownOption:this.listItems.eq(this.currentFocus)});return this},_copyAttributes:function(){this._addSelectBoxAttributes&&
this._addSelectBoxAttributes();return this},_realOuterWidth:function(a){if(a.is(":visible"))return a.outerWidth(!0);a=a.clone();var b;a.css({visibility:"hidden",display:"block",position:"absolute"}).appendTo("body");b=a.outerWidth(!0);a.remove();return b}});var f=c.selectBox.selectBoxIt.prototype;f._ariaAccessibility=function(){var a=this;a.dropdown.attr({role:"combobox","aria-autocomplete":"list","aria-expanded":"false","aria-owns":a.list.attr("id"),"aria-activedescendant":a.listItems.eq(a.currentFocus).length?
a.listItems.eq(a.currentFocus)[0].id:"","aria-label":c("label[for='"+a.originalElem.id+"']").text()||"","aria-live":"assertive"}).on({"disable.selectBoxIt":function(){a.dropdown.attr("aria-disabled","true")},"enable.selectBoxIt":function(){a.dropdown.attr("aria-disabled","false")}});a.list.attr({role:"listbox","aria-hidden":"true"});a.listItems.attr({role:"option"});a.selectBox.on({"change.selectBoxIt":function(){a.dropdownText.attr("aria-label",a.originalElem.value)},"open.selectBoxIt":function(){a.list.attr("aria-hidden",
"false");a.dropdown.attr("aria-expanded","true")},"close.selectBoxIt":function(){a.list.attr("aria-hidden","true");a.dropdown.attr("aria-expanded","false")}});return a};f._addSelectBoxAttributes=function(){var a=this;a._addAttributes(a.selectBox.prop("attributes"),a.dropdown);a.selectItems.each(function(b){a._addAttributes(c(this).prop("attributes"),a.listItems.eq(b))});return a};f._addAttributes=function(a,b){var d=this.options.copyAttributes;a.length&&c.each(a,function(a,h){var g=h.name.toLowerCase(),
f=h.value;"null"===f||-1===c.inArray(g,d)&&-1===g.indexOf("data")||b.attr(g,f)});return this};f.destroy=function(a){this._destroySelectBoxIt();this.widgetProto.destroy.call(this);this._callbackSupport(a);return this};f._destroySelectBoxIt=function(){this.dropdown.off(".selectBoxIt");c.contains(this.dropdownContainer[0],this.originalElem)&&this.dropdownContainer.before(this.selectBox);this.dropdownContainer.remove();this.selectBox.removeAttr("style").attr("style",this.selectBoxStyles);this.selectBox.show();
this.triggerEvent("destroy");return this};f.disable=function(a){this.options.disabled||(this.close(),this.selectBox.attr("disabled","disabled"),this.dropdown.removeAttr("tabindex").removeClass(this.theme.enabled).addClass(this.theme.disabled),this.setOption("disabled",!0),this.triggerEvent("disable"));this._callbackSupport(a);return this};f.disableOption=function(a,b){var d,e;"number"===c.type(a)&&(this.close(),d=this.selectBox.find("option").eq(a),this.triggerEvent("disable-option"),d.attr("disabled",
"disabled"),this.listItems.eq(a).attr("data-disabled","true").addClass(this.theme.disabled),this.currentFocus===a&&(d=this.listItems.eq(this.currentFocus).nextAll("li").not("[data-disabled='true']").first().length,e=this.listItems.eq(this.currentFocus).prevAll("li").not("[data-disabled='true']").first().length,d?this.moveDown():e?this.moveUp():this.disable()));this._callbackSupport(b);return this};f._isDisabled=function(a){this.originalElem.disabled&&this.disable();return this};f._dynamicPositioning=
function(){if("number"===c.type(this.listSize))this.list.css("max-height",this.maxHeight||"none");else{var a=this.dropdown.offset().top,b=this.list.data("max-height")||this.list.outerHeight(),d=this.dropdown.outerHeight(),e=this.options.viewport,h=e.height(),e=c.isWindow(e.get(0))?e.scrollTop():e.offset().top,g=!(a+d+b<=h+e);this.list.data("max-height")||this.list.data("max-height",this.list.outerHeight());g?this.dropdown.offset().top-e>=b?(this.list.css("max-height",b),this.list.css("top",this.dropdown.position().top-
this.list.outerHeight())):(a=Math.abs(a+d+b-(h+e)),h=Math.abs(this.dropdown.offset().top-e-b),a<h?(this.list.css("max-height",b-a-d/2),this.list.css("top","auto")):(this.list.css("max-height",b-h-d/2),this.list.css("top",this.dropdown.position().top-this.list.outerHeight()))):(this.list.css("max-height",b),this.list.css("top","auto"))}return this};f.enable=function(a){this.options.disabled&&(this.triggerEvent("enable"),this.selectBox.removeAttr("disabled"),this.dropdown.attr("tabindex",0).removeClass(this.theme.disabled).addClass(this.theme.enabled),
this.setOption("disabled",!1),this._callbackSupport(a));return this};f.enableOption=function(a,b){var d;"number"===c.type(a)&&(d=this.selectBox.find("option").eq(a),this.triggerEvent("enable-option"),d.removeAttr("disabled"),this.listItems.eq(a).attr("data-disabled","false").removeClass(this.theme.disabled));this._callbackSupport(b);return this};f.moveDown=function(a){this.currentFocus+=1;var b="true"===this.listItems.eq(this.currentFocus).attr("data-disabled")?!0:!1,d=this.listItems.eq(this.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;
if(this.currentFocus===this.listItems.length)this.currentFocus-=1;else{if(b&&d){this.listItems.eq(this.currentFocus-1).blur();this.moveDown();return}b&&!d?this.currentFocus-=1:(this.listItems.eq(this.currentFocus-1).blur().end().eq(this.currentFocus).focusin(),this._scrollToView("down"),this.triggerEvent("moveDown"))}this._callbackSupport(a);return this};f.moveUp=function(a){this.currentFocus-=1;var b="true"===this.listItems.eq(this.currentFocus).attr("data-disabled")?!0:!1,d=this.listItems.eq(this.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;
if(-1===this.currentFocus)this.currentFocus+=1;else{if(b&&d){this.listItems.eq(this.currentFocus+1).blur();this.moveUp();return}b&&!d?this.currentFocus+=1:(this.listItems.eq(this.currentFocus+1).blur().end().eq(this.currentFocus).focusin(),this._scrollToView("up"),this.triggerEvent("moveUp"))}this._callbackSupport(a);return this};f._setCurrentSearchOption=function(a){(this.options.aggressiveChange||this.options.selectWhenHidden||this.listItems.eq(a).is(":visible"))&&!0!==this.listItems.eq(a).data("disabled")&&
(this.listItems.eq(this.currentFocus).blur(),this.currentFocus=this.currentIndex=a,this.listItems.eq(this.currentFocus).focusin(),this._scrollToView("search"),this.triggerEvent("search"));return this};f._searchAlgorithm=function(a,b){var d=!1,c,h,g,f,l=this.textArray,k=this.currentText;c=a;for(g=l.length;c<g;c+=1){f=l[c];for(h=0;h<g;h+=1)-1!==l[h].search(b)&&(d=!0,h=g);d||(k=this.currentText=this.currentText.charAt(this.currentText.length-1).replace(/[|()\[{.+*?$\\]/g,"\\$0"));b=RegExp(k,"gi");if(3>
k.length){if(b=RegExp(k.charAt(0),"gi"),-1!==f.charAt(0).search(b)){this._setCurrentSearchOption(c);if(f.substring(0,k.length).toLowerCase()!==k.toLowerCase()||this.options.similarSearch)this.currentIndex+=1;return!1}}else if(-1!==f.search(b))return this._setCurrentSearchOption(c),!1;if(f.toLowerCase()===this.currentText.toLowerCase())return this._setCurrentSearchOption(c),this.currentText="",!1}return!0};f.search=function(a,b,c){this.currentText=c?this.currentText+a.replace(/[|()\[{.+*?$\\]/g,"\\$0"):
a.replace(/[|()\[{.+*?$\\]/g,"\\$0");this._searchAlgorithm(this.currentIndex,RegExp(this.currentText,"gi"))&&this._searchAlgorithm(0,this.currentText);this._callbackSupport(b);return this};f._applyNativeSelect=function(){var a=this,b,c,e;a.dropdownContainer.append(a.selectBox);a.selectBox.css({display:"block",visibility:"visible",width:a.dropdown.outerWidth(),height:a.dropdown.outerHeight(),opacity:"0",position:"absolute",top:"0",left:"0",cursor:"pointer","z-index":"999999",margin:a.dropdown.css("margin"),
padding:"0","-webkit-appearance":"menulist-button"}).on({"changed.selectBoxIt":function(){b=a.selectBox.find("option").filter(":selected");e=(c=b.attr("data-text"))?c:b.text();a._setText(a.dropdownText,e);a.list.find('li[data-val="'+b.val()+'"]').find("i").attr("class")&&a.dropdownImage.attr("class",a.list.find('li[data-val="'+b.val()+'"]').find("i").attr("class")).addClass("selectboxit-default-icon");a.triggerEvent("option-click")}})};f._mobile=function(a){this.isMobile&&this._applyNativeSelect();
return this};f.selectOption=function(a,b){var d=c.type(a);"number"===d?this.selectBox.val(this.selectItems.eq(a).val()).change():"string"===d&&this.selectBox.val(a).change();this._callbackSupport(b);return this};f.setOption=function(a,b,d){var e=this;"string"===c.type(a)&&(e.options[a]=b);e.refresh(function(){e._callbackSupport(d)},!0);return e};f.setOptions=function(a,b){var d=this;c.isPlainObject(a)&&(d.options=c.extend({},d.options,a));d.refresh(function(){d._callbackSupport(b)},!0);return d};
f.wait=function(a,b){this.widgetProto._delay.call(this,b,a);return this};f.add=function(a,b){this._populate(a,function(a){var e=this,h=c.type(a),g=0,f,l=[],k=(f=e._isJSON(a))&&e._parseJSON(a);if(a&&("array"===h||f&&k.data&&"array"===c.type(k.data))||"object"===h&&a.data&&"array"===c.type(a.data)){e._isJSON(a)&&(a=k);a.data&&(a=a.data);g;for(f=a.length;g<=f-1;g+=1)h=a[g],c.isPlainObject(h)?l.push(c("<option/>",h)):"string"===c.type(h)&&l.push(c("<option/>",{text:h,value:h}));e.selectBox.append(l)}else a&&
"string"===h&&!e._isJSON(a)?e.selectBox.append(a):a&&"object"===h?e.selectBox.append(c("<option/>",a)):a&&(e._isJSON(a)&&c.isPlainObject(e._parseJSON(a)))&&e.selectBox.append(c("<option/>",e._parseJSON(a)));e.dropdown?e.refresh(function(){e._callbackSupport(b)},!0):e._callbackSupport(b);return e})};f._parseJSON=function(a){return JSON&&JSON.parse&&JSON.parse(a)||c.parseJSON(a)};f._isJSON=function(a){try{return this._parseJSON(a),!0}catch(b){return!1}};f._populate=function(a,b){var d=this;a=c.isFunction(a)?
a.call():a;d.isDeferred(a)?a.done(function(a){b.call(d,a)}):b.call(d,a);return d};f.remove=function(a,b){var d=this,e=c.type(a),f=0,g,n="";if("array"===e){f;for(g=a.length;f<=g-1;f+=1)e=a[f],"number"===c.type(e)&&(n=n.length?n+(", option:eq("+e+")"):n+("option:eq("+e+")"));d.selectBox.find(n).remove()}else"number"===e?d.selectBox.find("option").eq(a).remove():d.selectBox.find("option").remove();d.dropdown?d.refresh(function(){d._callbackSupport(b)},!0):d._callbackSupport(b);return d}});



}
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("bloodhound", [ "jquery" ], function(a0) {
            return root["Bloodhound"] = factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root["Bloodhound"] = factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function(id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        "use strict";
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        "use strict";
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        !_.some(local, function(l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("typeahead.js", [ "jquery" ], function(a0) {
            return factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var WWW = function() {
        "use strict";
        var defaultClassNames = {
            wrapper: "twitter-typeahead",
            input: "tt-input",
            hint: "tt-hint",
            menu: "tt-menu",
            dataset: "tt-dataset",
            suggestion: "tt-suggestion",
            selectable: "tt-selectable",
            empty: "tt-empty",
            open: "tt-open",
            cursor: "tt-cursor",
            highlight: "tt-highlight"
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function(o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function(v, k) {
                selectors[k] = "." + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: "relative",
                    display: "inline-block"
                },
                hint: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: "1"
                },
                input: {
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent"
                },
                inputWithNoHint: {
                    position: "relative",
                    verticalAlign: "top"
                },
                menu: {
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    zIndex: "100",
                    display: "none"
                },
                ltr: {
                    left: "0",
                    right: "auto"
                },
                rtl: {
                    left: "auto",
                    right: " 0"
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                });
            }
            return css;
        }
    }();
    var EventBus = function() {
        "use strict";
        var namespace, deprecationMap;
        namespace = "typeahead:";
        deprecationMap = {
            render: "rendered",
            cursorchange: "cursorchanged",
            select: "selected",
            autocomplete: "autocompleted"
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function(type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function(type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger("before" + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function(type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function(str) {
            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr("dir", dir);
                    this.trigger("langDirChanged", dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            bind: function() {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on("input.tt", onInput);
                } else {
                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || "";
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(":focus");
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $("<div>");
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var keys, nameGenerator;
        keys = {
            val: "tt-selectable-display",
            obj: "tt-selectable-object"
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error("missing source");
            }
            if (!o.node) {
                $.error("missing node");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || "",
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger("rendered", this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger("rendered", this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({
                    _query: query
                }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger("asyncCanceled", query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger("asyncRequested", query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        rendered += suggestions.length;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        that.async && that.trigger("asyncReceived", query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger("cleared");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = $("<div>");
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $("<div>").text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function() {
        "use strict";
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error("node is required");
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger("selectableClicked", $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetRendered", dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetCleared");
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function() {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function(dataset) {
                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr("dir", dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off(".tt");
                this.$node = $("<div>");
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function() {
        "use strict";
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css("display", "block");
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function() {
        "use strict";
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            if (!o.menu) {
                $.error("missing menu");
            }
            if (!o.eventBus) {
                $.error("missing event bus");
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
            onFocused = c(this, "activate", "open", "_onFocused");
            onBlurred = c(this, "deactivate", "_onBlurred");
            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
            onEscKeyed = c(this, "isActive", "_onEscKeyed");
            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $("<div>");
                $menu = this.menu.$node || $("<div>");
                $input.on("blur.tt", function($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function() {
                            $input.focus();
                        });
                    }
                });
                $menu.on("mousedown.tt", function($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger("render", suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger("asyncrequest", query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger("asynccancel", query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger("asyncreceive", query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger("change", this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable);// && $e.preventDefault();
                } else if ($selectable = this.menu.getTopSelectable()) {
                    //this.autocomplete($selectable) && $e.preventDefault();
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || "";
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before("active")) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger("active");
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before("idle")) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger("idle");
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before("open")) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger("open");
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before("close")) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger("close");
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before("select", data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger("select", data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger("autocomplete", data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger("cursorchange", payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function() {
                var args = [].slice.call(arguments);
                _.each(methods, function(method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function() {
        "use strict";
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val("");
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({
                        el: $input
                    });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function(t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function(t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function(t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function(t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function(t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function(t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function(t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function(t) {
                        t.setVal(newVal);
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function(typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function() {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: "off",
                spellcheck: false
            });
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    })();
});
define('jquery', function () {
    if (typeof jQuery === 'undefined')
        throw 'jQuery is not installed';
    return jQuery;
});
define('framework/smoothscroll', ['jquery'], function ($) {
    return function (a, event, isMock) {
        var href = $(a).attr('href');
        if (event.isDefaultPrevented())
            return;
        if (href.indexOf('#') != 0)
            return;
        var name = a.href.split('#')[1];
        var target = $(document.getElementById(name));
        if (target.length == 0)
            return false;
        if (name.indexOf('xslq-logline') > -1)
            return false;
        if ($('body').hasClass('nosmooth'))
            return false;
        if ($(a).hasClass('nosmooth'))
            return false;
        target.attr('id', name + '-link');
        window.setTimeout(function () {
            target.attr('id', name);
        }, 1000);
        var targetOffset = target.offset().top;
        if (!isMock) {
            if (document.getElementById('s4-workspace')) {
                $('#s4-workspace,html,body').animate({ scrollTop: targetOffset }, 1000, 'swing', function () {
                    document.location.href = '#' + name;
                });
            } else {
                $('html,body').animate({ scrollTop: targetOffset }, 1000, 'swing', function () {
                    document.location.href = '#' + name;
                });
            }
            event.preventDefault();
        } else {
            $(a).addClass('smooth-scroll-mock');
        }
        return true;
    };
});
define('framework/tabs', ['jquery'], function ($) {
    return function (el) {
        var $el = $(el);
        if ($el.data('tabs-installed') === true)
            return;
        $el.data('tabs-installed', true);
        var toggleClass = 'inherit-bg';
        if ($(el).hasClass('active-white-bg'))
            toggleClass = 'white-bg';
        $(el).on('mouseenter', 'a', function () {
            if (!$(this).hasClass(toggleClass) && $('html').hasClass('ua-no-touch'))
                $(this).addClass('hover');
        });
        $(el).on('mouseleave', 'a', function () {
            if (!$(this).hasClass(toggleClass))
                $(this).removeClass('hover');
        });
        $(el).on('click', 'a[href^=\'#\']', function (event, skipAnalytics) {
            var clicked = this;
            var scrollContainer = $el.parents('.fade-container-active').eq(0);
            if (scrollContainer.length) {
                if ($el.is('table')) {
                    scrollContainer.find('.overflow-x').animate({ scrollLeft: $(clicked).offset().left + scrollContainer.find('.overflow-x').scrollLeft() - 60 }, 500);
                } else {
                    $el.animate({ scrollLeft: $(clicked).offset().left + $el.scrollLeft() - 40 }, 500);
                }
            }
            $('a', $(this).parents('.nav-tabs').eq(0)).each(function () {
                $(this).removeClass(toggleClass + ' hover');
                $(this).parent().removeClass('active');
                var id = this.href.split('#', 2)[1];
                $target = $('*[id=\'' + id + '\']');
                if (window.analytics && !skipAnalytics && clicked == this && $target.length)
                    analytics.event('nav-tab-' + id.toLowerCase());
                clicked == this ? $target.show() : $target.hide();
            });
            $(clicked).addClass(toggleClass).parent().addClass('active');
            $(document).trigger('framework.domupdate');
            return false;
        });
        $(el).find('li, td').eq(0).find('a').trigger('click', true);
    };
});
define('framework/choice', ['jquery'], function ($) {
    function toggle(clicked, el) {
        $(el).find('.choice-button-active').removeClass('choice-button-active');
        $(clicked).addClass('choice-button-active');
        $('a.choice-button', el).each(function () {
            $target = $(document.getElementById(this.href.split('#', 2)[1]));
            clicked == this ? $target.show() : $target.hide();
            clicked == this ? $target.addClass('choice-active') : $target.removeClass('choice-active');
        });
        $('option.choice-button', el).each(function () {
            $target = $(document.getElementById(this.value.split('#', 2)[1]));
            clicked == this ? $target.show() : $target.hide();
            clicked == this ? $target.addClass('choice-active') : $target.removeClass('choice-active');
        });
        $(document).trigger('framework.domupdate');
        $(el).trigger('changed');
    }
    return function (el) {
        var $el = $(el);
        if ($el.data('choice-installed') === true)
            return;
        $el.data('choice-installed', true);
        if ($(el).is('select')) {
            $(el).on('change', function () {
                toggle($(this).find(':selected')[0], el);
            });
            toggle($(el).find(':selected')[0], el);
        }
        $(el).on('click', 'a[href^=\'#\']', function (event) {
            toggle(this, el);
            event.preventDefault();
        });
        $(el).find('.choice-button').eq(0).click();
    };
});
define('framework/megamenu', ['jquery'], function ($) {
    return function (el) {
        var $el = $(el);
        if ($el.data('megamenu-installed') === true)
            return;
        $el.data('megamenu-installed', true);
        $el.on('click', '.megamenu-close', function (event) {
            $('.megamenu-toggled', el).removeClass('megamenu-toggled');
            event.preventDefault();
        });
        $('body').click(function (event) {
            if (!jQuery.contains(el, event.target)) {
                $('.megamenu-toggled', el).removeClass('megamenu-toggled');
            }
        });
        var opening = false;
        $el.on('click', '.megamenu-button', function (event) {
            var item = $(this).parents('.megamenu-item').eq(0);
            if (item.hasClass('megamenu-toggled')) {
                $('.megamenu-toggled', el).removeClass('megamenu-toggled');
            } else {
                $('.megamenu-toggled', el).removeClass('megamenu-toggled');
                $(item).addClass('megamenu-toggled');
            }
            event.preventDefault();
        });
    };
});
define('framework/links', ['jquery'], function ($) {
    return function (el) {
        $('a', el).each(function () {
            if (this.href && this.href.indexOf('twitter.com/intent') > -1)
                return;
            GlobalCore.std_link(this);
        });
    };
});
define('framework/slideshow', ['jquery'], function ($) {
    function renderSlideshowNav(el, images) {
        if (images.length == 0)
            return;
        var h = '<ul class="slideshow-nav mobile-hidden">';
        h += '<li><a href="#" class="prev"><span class="icon-circle-arrow-left"></span></a></li>';
        h += '<li><a href="#" class="next"><span class="icon-circle-arrow-right"></span></a></li>';
        if ($(el).hasClass('dark')) {
            h = h.replace('icon-circle-arrow-left', 'icon-circle-arrow-left-white');
            h = h.replace('icon-circle-arrow-right', 'icon-circle-arrow-right-white');
        }
        h += '</ul>';
        $('.slideshow-controls', el).append(h);
        $('.slideshow-nav span', el).hover(function () {
            if ($(this).hasClass('fade')) {
            } else if (this.className.indexOf('left-white') > -1) {
                this.className = 'icon-circle-arrow-left-inverted inherit-bg';
            } else if (this.className.indexOf('left') > -1 && $(el).hasClass('light')) {
                this.className = 'icon-circle-arrow-left-white';
            } else if (this.className.indexOf('left') > -1) {
                this.className = 'icon-circle-arrow-left-white-inverted inherit-bg';
            } else if (this.className.indexOf('right-white') > -1) {
                this.className = 'icon-circle-arrow-right-inverted inherit-bg';
            } else if (this.className.indexOf('right') > -1 && $(el).hasClass('light')) {
                this.className = 'icon-circle-arrow-right-white';
            } else if (this.className.indexOf('right') > -1) {
                this.className = 'icon-circle-arrow-right-white-inverted inherit-bg';
            }
        }, function () {
            if ($(this).hasClass('fade')) {
            } else if (this.className.indexOf('left-inverted') > -1) {
                this.className = 'icon-circle-arrow-left-white';
            } else if (this.className.indexOf('left') > -1) {
                this.className = 'icon-circle-arrow-left';
            } else if (this.className.indexOf('right-inverted') > -1) {
                this.className = 'icon-circle-arrow-right-white';
            } else if (this.className.indexOf('right') > -1) {
                this.className = 'icon-circle-arrow-right';
            }
        });
        $('.slideshow-nav .next,.slideshow-nav .prev', el).click(function (event) {
            event.preventDefault();
            if ($(this).hasClass('disabled'))
                return;
            if ($(this).hasClass('next')) {
                $('.slideshow-thumbnails .active', el).next().find('a').click();
            } else {
                $('.slideshow-thumbnails .active', el).prev().find('a').click();
            }
        });
    }
    function renderSlideshowViewport(el, images) {
        var img = images[0].src;
        var h = '<div class="slideshow-viewport mobile-hidden"><img src="' + img + '" class="fluid"/></div><div class="slideshow-controls mobile-hidden"></div>';
        $(el).append(h);
    }
    function renderSlideshowThumbnails(el, images) {
        var $controls = $('.slideshow-controls', el);
        var h = '<div class="slideshow-thumbnails-viewport"><ul class="slideshow-thumbnails">';
        images.each(function () {
            var thumb = $(this).parent().find('img.thumbnail').eq(0).attr('src') || this.src;
            var src = this.src;
            h += '<li><a href="#" class="stroke2 inherit-border-color-onhover"><img src="' + thumb + '" width="56" height="52" data-src="' + src + '"/></a></li>';
        });
        if ($(el).hasClass('dark')) {
            h = h.replace(/stroke2 /g, 'white-stroke2 ');
        }
        h += '</ul></div>';
        $controls.append(h);
        if (images.filter('[title]').size() > 0) {
            var c = '<div class="slideshow-caption nu"></div>';
            var fullimg = $('.slideshow-images img:not(.thumbnail)', el).eq(0);
            if (fullimg && fullimg.attr('title')) {
                $('.slideshow-caption').html(fullimg.attr('title'));
            }
            $controls.append(c);
            $controls.addClass('captioned');
        }
        $('.slideshow-thumbnails a', el).click(function (event) {
            var index = $('.slideshow-thumbnails a', el).index(this);
            if (index == 0) {
                if ($(el).hasClass('dark')) {
                    $('.slideshow-nav .prev', el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-left-white').removeClass('icon-circle-arrow-left-white-inverted inherit-bg');
                } else {
                    $('.slideshow-nav .prev', el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-left').removeClass('icon-circle-arrow-left-white-inverted inherit-bg icon-circle-arrow-left-white');
                }
            } else {
                $('.slideshow-nav .prev', el).removeClass('disabled').find('span').removeClass('fade');
            }
            if (index == images.length - 1) {
                if ($(el).hasClass('dark')) {
                    $('.slideshow-nav .next', el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-right-white').removeClass('icon-circle-arrow-right-white-inverted inherit-bg');
                } else {
                    $('.slideshow-nav .next', el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-right').removeClass('icon-circle-arrow-right-white-inverted icon-circle-arrow-right-white inherit-bg');
                }
            } else {
                $('.slideshow-nav .next', el).removeClass('disabled').find('span').removeClass('fade');
            }
            if (images.length > 5) {
                var w = $(this).parent().width() + 8;
                var end = w * (index - 2);
                if (end < 0)
                    end = 0;
                console.info('animating', end);
                $(el).find('.slideshow-thumbnails').stop().animate({ left: -end }, 500, 'swing');
            }
            var img = $('img', this).data('src');
            $('.slideshow-viewport img', el).attr('src', img);
            var fullimg = $('.slideshow-images img:not(.thumbnail)', el).eq(index);
            console.info('index', index, fullimg[0]);
            if (fullimg && fullimg.attr('title')) {
                $('.slideshow-caption', el).fadeOut('fast', function () {
                    $(this).html(fullimg.attr('title')).fadeIn('fast');
                });
            } else {
                $('.slideshow-caption', el).html('');
            }
            $('.slideshow-thumbnails .active', el).removeClass('active');
            $(this).parent().addClass('active');
            event.preventDefault();
            event.stopPropagation();
        });
    }
    function renderMobileCarousel(el, images) {
        if (images.length == 0)
            return;
        var h = '<div class="carousel-container mobile-visible">';
        h += '<ul class="carousel-panels">';
        images.each(function () {
            var src = $(this).attr('src');
            var caption = $(this).attr('title');
            if (caption) {
                h += '<li><img src="' + src + '" class="fluid"/><div>' + caption + '</div></li>';
            } else {
                h += '<li><img src="' + src + '" class="fluid"/></li>';
            }
        });
        h += '</ul>';
        h += '<div class="carousel-nav carousel-nav-minimal carousel-nav-centered"></div>';
        h += '</div>';
        $(el).append(h);
    }
    return function (el) {
        if ($(el).hasClass('slideshow-pattern'))
            return;
        $(el).addClass('slideshow-pattern');
        $('.slideshow-images', el).hide();
        var images = $(el).find('.slideshow-images > li > img:not(.thumbnail)');
        renderSlideshowViewport(el, images);
        renderSlideshowThumbnails(el, images);
        renderSlideshowNav(el, images);
        renderMobileCarousel(el, images);
        $('.slideshow-thumbnails a', el).eq(0).click();
    };
});
define('framework/obfuscate', ['jquery'], function ($) {
    return function (a) {
        function reverse(text) {
            return text.split('').reverse().join('');
        }
        var email;
        if (a.href.indexOf('mailto:') > -1) {
            email = a.href.replace('mailto:', '');
        } else {
            email = a.innerHTML;
        }
        ;
        email = reverse(email);
        email = email.replace(/\+/, '@');
        email = reverse(email);
        if (a.href.indexOf('mailto') == -1) {
            a.innerHTML = email;
        }
        ;
        a.href = 'mailto:' + email;
    };
});
define('framework/expandable', ['jquery'], function ($) {
    function updateExpandableHeading($el) {
        var currentContent = $el.clone(true, true);
        if ($('html').hasClass('ua-mobile') && !$el.next().hasClass('accordionized')) {
            console.log('Mobile');
            var h = '';
            h += '<div class="expandable-headings accordionized"><div class="toggle-container">';
            h += '<a href="#" class="toggle-button black eta-uc">' + $el.find('h2, h3').first().text() + ' <i class="icon24-open toggle-hide"></i><i class="icon24-close toggle-show"></i></a>';
            h += '<div class="toggle-show has-slide accordion-body">';
            currentContent.find('h2, h3').first().remove();
            h += '</div></div></div>';
            $el.addClass('original').hide();
            $newel = $(h);
            $el.after($newel);
            $newel.find('.accordion-body').append(currentContent);
            $(document).trigger('framework.domupdate');
        }
        if ($('html').hasClass('ua-tablet') || $('html').hasClass('ua-desktop')) {
            console.log('tablet or desktop');
            $el.next('.accordionized').remove();
            $el.show();
            $(document).trigger('framework.domupdate');
        }
    }
    return function (el) {
        if ($(el).data('expandable-installed') === true)
            return;
        $(el).data('expandable-installed', true);
        var $el = $(el);
        $el.find('dd').hide();
        if ($el.hasClass('plusminus')) {
            $el.find('>dt').each(function () {
                $(this).find('a:first').prepend('<span class="plus">+</span><span class="minus">&ndash;</span>');
            });
        }
        if ($el.hasClass('accordian')) {
            $el.find('>dt').each(function () {
                $(this).find('a:first').after('<span class="icon-accordian-expand"></span><span class="icon-accordian-collapse"></span>');
            });
        }
        if ($el.hasClass('mobile-accordion')) {
            $('.mobile-accordion-header', $el).each(function () {
                window.framework.fastClick(this);
                if ($(this).hasClass('mobile-accordion-header-plusminus')) {
                    $(this).prepend('<span class="icon-plusbox mobile-visible"></span>');
                } else {
                    $(this).prepend('<span class="icon-expand2 mobile-visible black"></span>');
                }
            });
            $el.on('click', '.mobile-accordion-header', function () {
                console.info($(this).find('mobile-visible:visible').length);
                if ($(this).find('.mobile-visible:visible').length === 0)
                    return;
                if ($(this).hasClass('mobile-accordion-header-plusminus')) {
                    $(this).find('.icon-plusbox,.icon-minusbox').toggleClass('icon-minusbox icon-plubox');
                }
                $(this).toggleClass('mobile-accordion-header-active').next('.mobile-accordion-body').slideToggle('fast');
            });
            $el.find('.mobile-accordion-header.mobile-accordion-header-active').each(function () {
                if ($(this).hasClass('mobile-accordion-header-plusminus')) {
                    $(this).find('.icon-plusbox,.icon-minusbox').toggleClass('icon-minusbox icon-plubox');
                }
                $(this).next('.mobile-accordion-body').css('display', 'block');
            });
        } else if ($el.hasClass('mobile-accordion2')) {
            $el.on('click', 'a', function (event) {
                var parent = $(this).parent();
                parent.toggleClass('active');
                var placeholder = parent.find('.mobile-accordion2-placeholder');
                if (placeholder.length == 0) {
                    var target = $(this).attr('href');
                    parent.append('<div class="mobile-accordion2-placeholder"></div>');
                    $(target).each(function () {
                        parent.find('.mobile-accordion2-placeholder').append(this);
                    });
                }
                event.preventDefault();
            });
        } else if ($el.hasClass('mobile-expandable-headings')) {
            updateExpandableHeading($el);
            $(document).bind('framework.resize', function () {
                updateExpandableHeading($el);
            });
        } else {
            $el.on('click', 'dt', function () {
                $(this).toggleClass('open').next('dd').slideToggle('fast');
                if (window.Widgets)
                    window.Widgets.refresh();
                return false;
            });
        }
    };
});
define('framework/backtotop', ['jquery'], function ($) {
    return function (el) {
        if ($(el).data('backtotop-installed') == true)
            return;
        $(el).data('backtotop-installed', true);
        var viewport = window;
        if (document.getElementById('s4-workspace')) {
            viewport = document.getElementById('s4-workspace');
        }
        $(viewport).scroll(function () {
            if ($(this).scrollTop() > 300) {
                if (!$(el).hasClass('active')) {
                    $(el).addClass('active fadeInUp').removeClass('fadeOutDown');
                }
            } else if ($(el).hasClass('active')) {
                $(el).removeClass('fadeInUp').addClass('fadeOutDown');
                window.setTimeout(function () {
                    $(el).removeClass('active');
                }, 500);
            }
        });
        if (!jQuery.support.opacity) {
            $(el).addClass('no-opacity-support');
        }
        $(el).click(function (event) {
            $(this).removeClass('paused');
            if (document.getElementById('s4-workspace')) {
                $('#s4-workspace').animate({ scrollTop: 0 }, 600);
            } else {
                $('body,html').animate({ scrollTop: 0 }, 600);
            }
            event.preventDefault();
        });
    };
});
define('framework/dropdown', ['jquery'], function ($) {
    function open($el, touched) {
        $('body').trigger('framework.dropdown.closeall');
        if ($el.hasClass('dropdown-container3')) {
            $el.find('.dropdown-anchor').toggleClass('dropdown-anchor');
            var anchor = $('<div class="dropdown-anchor"></div>');
            var menu = $el.find('.dropdown-menu3').eq(0);
            $el.find('.dropdown-toggle3').addClass('active');
            if ($el.offset().top > $(window).scrollTop() + $(window).height() - menu.height() && $el.offset().top - menu.height() > 0) {
                anchor.addClass('dropdown-anchor-up');
                $el.prepend(anchor);
            } else {
                anchor.addClass('dropdown-anchor-down');
                $el.append(anchor);
            }
            if ($el.offset().left > $(window).scrollLeft() + $(window).width() - menu.width()) {
                anchor.addClass('dropdown-anchor-left');
            } else {
                anchor.addClass('dropdown-anchor-right');
            }
            menu.appendTo(anchor);
        }
        if ($el.hasClass('active')) {
            close($el);
            return;
        }
        $el.find('.hover').removeClass('hover inherit-bg');
        $el.addClass('opening active').trigger('opened');
        $el.find('.filtering-input').val('').trigger('change');
        ;
        if (touched) {
            window.setTimeout(function () {
                $el.removeClass('opening');
            }, 1000);
        } else {
            if ($('html').hasClass('ua-touch')) {
                window.setTimeout(function () {
                    $el.removeClass('opening');
                }, 1000);
            } else {
                $el.removeClass('opening');
            }
        }
    }
    function close($el) {
        if ($el.hasClass('opening'))
            return;
        $el.removeClass('active');
        $el.find('.dropdown-toggle3').removeClass('active').trigger('closed');
        ;
    }
    function bindevents($el) {
        $('.dropdown-menu a,.dropdown-menu2 a', $el).on('mouseenter', function () {
            if ($el.hasClass('opening'))
                return;
            $el.find('.hover').removeClass('hover inherit-bg');
            $(this).addClass('inherit-bg').addClass('hover');
        });
        $('.dropdown-menu a,.dropdown-menu2 a', $el).on('mouseleave', function () {
        });
        $('.dropdown-menu a,.dropdown-menu2 a', $el).on('click', function (event) {
            if ($el.hasClass('opening'))
                return false;
            if ($(this).is('a[href^=\'#\']')) {
                var val = $(this).text();
                $('.dropdown-toggle', $el).html(val + '<span class="icon-select"></span>');
                close($el);
                event.preventDefault();
            }
        });
        $el.on('click', '.dropdown-option', function () {
            $('.inherit-color.active', $el).removeClass('inherit-color active').addClass('white');
            $(this).addClass('inherit-color active').removeClass('white');
            $el.find('.dropdown-selected').html($(this).html());
            document.location.hash = $(this).attr('href');
            $el.trigger('change');
        });
        if ($el.hasClass('dropdown-container') || $el.hasClass('dropdown-container2')) {
            $('body').on('click', function (event) {
                if (!$(event.target).is('a')) {
                    close($el);
                }
            });
        }
        if ($el.hasClass('dropdown-container3')) {
            $('body').on('click', function (event) {
                if ($el.has(event.target).length == 0) {
                    close($el);
                }
            });
            $el.on('click', '.dropdown-close3', function (event) {
                close($el);
                event.preventDefault();
            });
        }
        $('body').on('framework.dropdown.closeall', function (event) {
            close($el);
        });
        $(document).on('esc.dropdown', function (e) {
            close($el);
        });
    }
    return function (el) {
        var $el = $(el);
        if ($el.data('dropdown-installed') == true)
            return;
        $el.data('dropdown-installed', true);
        if (!$.fn.on)
            $.fn.on = $.fn.bind;
        $('a.dropdown-toggle', $el).click(function () {
            open($el, true);
            return false;
        });
        $('a.dropdown-toggle2', $el).click(function () {
            open($el);
            return false;
        });
        $('a.dropdown-toggle3', $el).click(function () {
            if ($el.hasClass('active')) {
                close($el);
            } else {
                open($el);
            }
            return false;
        });
        if ($el.hasClass('dropdown-container')) {
            $el.on('mouseenter', function (event) {
                open($el);
            });
            $el.on('mouseleave', function () {
                close($el);
            });
        }
        if ($el.hasClass('dropdown-container2')) {
            var w = $('.dropdown-toggle2', $el).width();
            if (w) {
                if ($('.dropdown-menu2', $el).attr('class').indexOf('dropdown-split') > -1) {
                } else {
                    $('.dropdown-menu2', $el).css('min-width', w + 12);
                }
            }
        }
        bindevents($el);
    };
});
!function (document, undefined) {
    var cookie = function () {
        return cookie.get.apply(cookie, arguments);
    };
    var utils = cookie.utils = {
        isArray: Array.isArray || function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },
        isPlainObject: function (value) {
            return !!value && Object.prototype.toString.call(value) === '[object Object]';
        },
        toArray: function (value) {
            return Array.prototype.slice.call(value);
        },
        getKeys: Object.keys || function (obj) {
            var keys = [], key = '';
            for (key in obj) {
                if (obj.hasOwnProperty(key))
                    keys.push(key);
            }
            return keys;
        },
        escape: function (value) {
            return String(value).replace(/[,;"\\=\s%]/g, function (character) {
                return encodeURIComponent(character);
            });
        },
        retrieve: function (value, fallback) {
            return value == null ? fallback : value;
        }
    };
    cookie.defaults = {};
    cookie.expiresMultiplier = 60 * 60 * 24;
    cookie.set = function (key, value, options) {
        if (utils.isPlainObject(key)) {
            for (var k in key) {
                if (key.hasOwnProperty(k))
                    this.set(k, key[k], value);
            }
        } else {
            options = utils.isPlainObject(options) ? options : { expires: options };
            var expires = options.expires !== undefined ? options.expires : this.defaults.expires || '', expiresType = typeof expires;
            if (expiresType === 'string' && expires !== '')
                expires = new Date(expires);
            else if (expiresType === 'number')
                expires = new Date(+new Date() + 1000 * this.expiresMultiplier * expires);
            if (expires !== '' && 'toGMTString' in expires)
                expires = ';expires=' + expires.toGMTString();
            var path = options.path || this.defaults.path;
            path = path ? ';path=' + path : '';
            var domain = options.domain || this.defaults.domain;
            domain = domain ? ';domain=' + domain : '';
            var secure = options.secure || this.defaults.secure ? ';secure' : '';
            document.cookie = utils.escape(key) + '=' + utils.escape(value) + expires + path + domain + secure;
        }
        return this;
    };
    cookie.remove = function (keys) {
        keys = utils.isArray(keys) ? keys : utils.toArray(arguments);
        for (var i = 0, l = keys.length; i < l; i++) {
            this.set(keys[i], '', -1);
        }
        return this;
    };
    cookie.empty = function () {
        return this.remove(utils.getKeys(this.all()));
    };
    cookie.get = function (keys, fallback) {
        fallback = fallback || undefined;
        var cookies = this.all();
        if (utils.isArray(keys)) {
            var result = {};
            for (var i = 0, l = keys.length; i < l; i++) {
                var value = keys[i];
                result[value] = utils.retrieve(cookies[value], fallback);
            }
            return result;
        } else
            return utils.retrieve(cookies[keys], fallback);
    };
    cookie.all = function () {
        if (document.cookie === '')
            return {};
        var cookies = document.cookie.split('; '), result = {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var item = cookies[i].split('=');
            result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
        }
        return result;
    };
    cookie.enabled = function () {
        if (navigator.cookieEnabled)
            return true;
        var ret = cookie.set('_', '_').get('_') === '_';
        cookie.remove('_');
        return ret;
    };
    if (typeof define === 'function' && define.amd) {
        define('framework/cookie', [], function () {
            return cookie;
        });
    } else if (typeof exports !== 'undefined') {
        exports.cookie = cookie;
    } else
        window.cookie = cookie;
}(document);
define('punycode', function () {
    window.punycode;
});
define('framework/punycode', [], function () {
    return;
});
define('IPv6', function () {
    window.IPv6;
});
define('framework/IPv6', [], function () {
    return;
});
define('SecondLevelDomains', function () {
    window.SecondLevelDomains;
});
define('framework/SecondLevelDomains', [], function () {
    return;
});
(function (q, w) {
    'object' === typeof exports ? module.exports = w(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains')) : 'function' === typeof define && define.amd ? define('framework/URI', [
        './punycode',
        './IPv6',
        './SecondLevelDomains'
    ], w) : q.URI = w(q.punycode, q.IPv6, q.SecondLevelDomains, q);
}(this, function (q, w, v, p) {
    function e(a, b) {
        if (!(this instanceof e))
            return new e(a, b);
        void 0 === a && (a = 'undefined' !== typeof location ? location.href + '' : '');
        this.href(a);
        return void 0 !== b ? this.absoluteTo(b) : this;
    }
    function s(a) {
        return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
    function y(a) {
        return void 0 === a ? 'Undefined' : String(Object.prototype.toString.call(a)).slice(8, -1);
    }
    function l(a) {
        return 'Array' === y(a);
    }
    function x(a, b) {
        var c, e;
        if (l(b)) {
            c = 0;
            for (e = b.length; c < e; c++)
                if (!x(a, b[c]))
                    return !1;
            return !0;
        }
        var f = y(b);
        c = 0;
        for (e = a.length; c < e; c++)
            if ('RegExp' === f) {
                if ('string' === typeof a[c] && a[c].match(b))
                    return !0;
            } else if (a[c] === b)
                return !0;
        return !1;
    }
    function A(a, b) {
        if (!l(a) || !l(b) || a.length !== b.length)
            return !1;
        a.sort();
        b.sort();
        for (var c = 0, e = a.length; c < e; c++)
            if (a[c] !== b[c])
                return !1;
        return !0;
    }
    function B(a) {
        return escape(a);
    }
    function z(a) {
        return encodeURIComponent(a).replace(/[!'()*]/g, B).replace(/\*/g, '%2A');
    }
    var C = p && p.URI;
    e.version = '1.13.2';
    var d = e.prototype, t = Object.prototype.hasOwnProperty;
    e._parts = function () {
        return {
            protocol: null,
            username: null,
            password: null,
            hostname: null,
            urn: null,
            port: null,
            path: null,
            query: null,
            fragment: null,
            duplicateQueryParameters: e.duplicateQueryParameters,
            escapeQuerySpace: e.escapeQuerySpace
        };
    };
    e.duplicateQueryParameters = !1;
    e.escapeQuerySpace = !0;
    e.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
    e.idn_expression = /[^a-z0-9\.-]/i;
    e.punycode_expression = /(xn--)/i;
    e.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    e.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    e.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/gi;
    e.findUri = {
        start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
        end: /[\s\r\n]|$/,
        trim: /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/
    };
    e.defaultPorts = {
        http: '80',
        https: '443',
        ftp: '21',
        gopher: '70',
        ws: '80',
        wss: '443'
    };
    e.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
    e.domAttributes = {
        a: 'href',
        blockquote: 'cite',
        link: 'href',
        base: 'href',
        script: 'src',
        form: 'action',
        img: 'src',
        area: 'href',
        iframe: 'src',
        embed: 'src',
        source: 'src',
        track: 'src',
        input: 'src'
    };
    e.getDomAttribute = function (a) {
        if (a && a.nodeName) {
            var b = a.nodeName.toLowerCase();
            return 'input' === b && 'image' !== a.type ? void 0 : e.domAttributes[b];
        }
    };
    e.encode = z;
    e.decode = decodeURIComponent;
    e.iso8859 = function () {
        e.encode = escape;
        e.decode = unescape;
    };
    e.unicode = function () {
        e.encode = z;
        e.decode = decodeURIComponent;
    };
    e.characters = {
        pathname: {
            encode: {
                expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                map: {
                    '%24': '$',
                    '%26': '&',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '=',
                    '%3A': ':',
                    '%40': '@'
                }
            },
            decode: {
                expression: /[\/\?#]/g,
                map: {
                    '/': '%2F',
                    '?': '%3F',
                    '#': '%23'
                }
            }
        },
        reserved: {
            encode: {
                expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                map: {
                    '%3A': ':',
                    '%2F': '/',
                    '%3F': '?',
                    '%23': '#',
                    '%5B': '[',
                    '%5D': ']',
                    '%40': '@',
                    '%21': '!',
                    '%24': '$',
                    '%26': '&',
                    '%27': '\'',
                    '%28': '(',
                    '%29': ')',
                    '%2A': '*',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '='
                }
            }
        }
    };
    e.encodeQuery = function (a, b) {
        var c = e.encode(a + '');
        void 0 === b && (b = e.escapeQuerySpace);
        return b ? c.replace(/%20/g, '+') : c;
    };
    e.decodeQuery = function (a, b) {
        a += '';
        void 0 === b && (b = e.escapeQuerySpace);
        try {
            return e.decode(b ? a.replace(/\+/g, '%20') : a);
        } catch (c) {
            return a;
        }
    };
    e.recodePath = function (a) {
        a = (a + '').split('/');
        for (var b = 0, c = a.length; b < c; b++)
            a[b] = e.encodePathSegment(e.decode(a[b]));
        return a.join('/');
    };
    e.decodePath = function (a) {
        a = (a + '').split('/');
        for (var b = 0, c = a.length; b < c; b++)
            a[b] = e.decodePathSegment(a[b]);
        return a.join('/');
    };
    var r = {
            encode: 'encode',
            decode: 'decode'
        }, m, u = function (a, b) {
            return function (c) {
                return e[b](c + '').replace(e.characters[a][b].expression, function (c) {
                    return e.characters[a][b].map[c];
                });
            };
        };
    for (m in r)
        e[m + 'PathSegment'] = u('pathname', r[m]);
    e.encodeReserved = u('reserved', 'encode');
    e.parse = function (a, b) {
        var c;
        b || (b = {});
        c = a.indexOf('#');
        -1 < c && (b.fragment = a.substring(c + 1) || null, a = a.substring(0, c));
        c = a.indexOf('?');
        -1 < c && (b.query = a.substring(c + 1) || null, a = a.substring(0, c));
        '//' === a.substring(0, 2) ? (b.protocol = null, a = a.substring(2), a = e.parseAuthority(a, b)) : (c = a.indexOf(':'), -1 < c && (b.protocol = a.substring(0, c) || null, b.protocol && !b.protocol.match(e.protocol_expression) ? b.protocol = void 0 : 'file' === b.protocol ? a = a.substring(c + 3) : '//' === a.substring(c + 1, c + 3) ? (a = a.substring(c + 3), a = e.parseAuthority(a, b)) : (a = a.substring(c + 1), b.urn = !0)));
        b.path = a;
        return b;
    };
    e.parseHost = function (a, b) {
        var c = a.indexOf('/'), e;
        -1 === c && (c = a.length);
        '[' === a.charAt(0) ? (e = a.indexOf(']'), b.hostname = a.substring(1, e) || null, b.port = a.substring(e + 2, c) || null, '/' === b.port && (b.port = null)) : a.indexOf(':') !== a.lastIndexOf(':') ? (b.hostname = a.substring(0, c) || null, b.port = null) : (e = a.substring(0, c).split(':'), b.hostname = e[0] || null, b.port = e[1] || null);
        b.hostname && '/' !== a.substring(c).charAt(0) && (c++, a = '/' + a);
        return a.substring(c) || '/';
    };
    e.parseAuthority = function (a, b) {
        a = e.parseUserinfo(a, b);
        return e.parseHost(a, b);
    };
    e.parseUserinfo = function (a, b) {
        var c = a.indexOf('/'), g = -1 < c ? a.lastIndexOf('@', c) : a.indexOf('@');
        -1 < g && (-1 === c || g < c) ? (c = a.substring(0, g).split(':'), b.username = c[0] ? e.decode(c[0]) : null, c.shift(), b.password = c[0] ? e.decode(c.join(':')) : null, a = a.substring(g + 1)) : (b.username = null, b.password = null);
        return a;
    };
    e.parseQuery = function (a, b) {
        if (!a)
            return {};
        a = a.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
        if (!a)
            return {};
        for (var c = {}, g = a.split('&'), f = g.length, d, h, n = 0; n < f; n++)
            d = g[n].split('='), h = e.decodeQuery(d.shift(), b), d = d.length ? e.decodeQuery(d.join('='), b) : null, c[h] ? ('string' === typeof c[h] && (c[h] = [c[h]]), c[h].push(d)) : c[h] = d;
        return c;
    };
    e.build = function (a) {
        var b = '';
        a.protocol && (b += a.protocol + ':');
        a.urn || !b && !a.hostname || (b += '//');
        b += e.buildAuthority(a) || '';
        'string' === typeof a.path && ('/' !== a.path.charAt(0) && 'string' === typeof a.hostname && (b += '/'), b += a.path);
        'string' === typeof a.query && a.query && (b += '?' + a.query);
        'string' === typeof a.fragment && a.fragment && (b += '#' + a.fragment);
        return b;
    };
    e.buildHost = function (a) {
        var b = '';
        if (a.hostname)
            b = e.ip6_expression.test(a.hostname) ? b + ('[' + a.hostname + ']') : b + a.hostname;
        else
            return '';
        a.port && (b += ':' + a.port);
        return b;
    };
    e.buildAuthority = function (a) {
        return e.buildUserinfo(a) + e.buildHost(a);
    };
    e.buildUserinfo = function (a) {
        var b = '';
        a.username && (b += e.encode(a.username), a.password && (b += ':' + e.encode(a.password)), b += '@');
        return b;
    };
    e.buildQuery = function (a, b, c) {
        var g = '', f, d, h, n;
        for (d in a)
            if (t.call(a, d) && d)
                if (l(a[d]))
                    for (f = {}, h = 0, n = a[d].length; h < n; h++)
                        void 0 !== a[d][h] && void 0 === f[a[d][h] + ''] && (g += '&' + e.buildQueryParameter(d, a[d][h], c), !0 !== b && (f[a[d][h] + ''] = !0));
                else
                    void 0 !== a[d] && (g += '&' + e.buildQueryParameter(d, a[d], c));
        return g.substring(1);
    };
    e.buildQueryParameter = function (a, b, c) {
        return e.encodeQuery(a, c) + (null !== b ? '=' + e.encodeQuery(b, c) : '');
    };
    e.addQuery = function (a, b, c) {
        if ('object' === typeof b)
            for (var g in b)
                t.call(b, g) && e.addQuery(a, g, b[g]);
        else if ('string' === typeof b)
            void 0 === a[b] ? a[b] = c : ('string' === typeof a[b] && (a[b] = [a[b]]), l(c) || (c = [c]), a[b] = a[b].concat(c));
        else
            throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    };
    e.removeQuery = function (a, b, c) {
        var g;
        if (l(b))
            for (c = 0, g = b.length; c < g; c++)
                a[b[c]] = void 0;
        else if ('object' === typeof b)
            for (g in b)
                t.call(b, g) && e.removeQuery(a, g, b[g]);
        else if ('string' === typeof b)
            if (void 0 !== c)
                if (a[b] === c)
                    a[b] = void 0;
                else {
                    if (l(a[b])) {
                        g = a[b];
                        var f = {}, d, h;
                        if (l(c))
                            for (d = 0, h = c.length; d < h; d++)
                                f[c[d]] = !0;
                        else
                            f[c] = !0;
                        d = 0;
                        for (h = g.length; d < h; d++)
                            void 0 !== f[g[d]] && (g.splice(d, 1), h--, d--);
                        a[b] = g;
                    }
                }
            else
                a[b] = void 0;
        else
            throw new TypeError('URI.addQuery() accepts an object, string as the first parameter');
    };
    e.hasQuery = function (a, b, c, g) {
        if ('object' === typeof b) {
            for (var d in b)
                if (t.call(b, d) && !e.hasQuery(a, d, b[d]))
                    return !1;
            return !0;
        }
        if ('string' !== typeof b)
            throw new TypeError('URI.hasQuery() accepts an object, string as the name parameter');
        switch (y(c)) {
        case 'Undefined':
            return b in a;
        case 'Boolean':
            return a = Boolean(l(a[b]) ? a[b].length : a[b]), c === a;
        case 'Function':
            return !!c(a[b], b, a);
        case 'Array':
            return l(a[b]) ? (g ? x : A)(a[b], c) : !1;
        case 'RegExp':
            return l(a[b]) ? g ? x(a[b], c) : !1 : Boolean(a[b] && a[b].match(c));
        case 'Number':
            c = String(c);
        case 'String':
            return l(a[b]) ? g ? x(a[b], c) : !1 : a[b] === c;
        default:
            throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
        }
    };
    e.commonPath = function (a, b) {
        var c = Math.min(a.length, b.length), e;
        for (e = 0; e < c; e++)
            if (a.charAt(e) !== b.charAt(e)) {
                e--;
                break;
            }
        if (1 > e)
            return a.charAt(0) === b.charAt(0) && '/' === a.charAt(0) ? '/' : '';
        if ('/' !== a.charAt(e) || '/' !== b.charAt(e))
            e = a.substring(0, e).lastIndexOf('/');
        return a.substring(0, e + 1);
    };
    e.withinString = function (a, b, c) {
        c || (c = {});
        var g = c.start || e.findUri.start, d = c.end || e.findUri.end, k = c.trim || e.findUri.trim, h = /[a-z0-9-]=["']?$/i;
        for (g.lastIndex = 0;;) {
            var n = g.exec(a);
            if (!n)
                break;
            n = n.index;
            if (c.ignoreHtml) {
                var l = a.slice(Math.max(n - 3, 0), n);
                if (l && h.test(l))
                    continue;
            }
            var l = n + a.slice(n).search(d), m = a.slice(n, l).replace(k, '');
            c.ignore && c.ignore.test(m) || (l = n + m.length, m = b(m, n, l, a), a = a.slice(0, n) + m + a.slice(l), g.lastIndex = n + m.length);
        }
        g.lastIndex = 0;
        return a;
    };
    e.ensureValidHostname = function (a) {
        if (a.match(e.invalid_hostname_characters)) {
            if (!q)
                throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
            if (q.toASCII(a).match(e.invalid_hostname_characters))
                throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
        }
    };
    e.noConflict = function (a) {
        if (a)
            return a = { URI: this.noConflict() }, p.URITemplate && 'function' === typeof p.URITemplate.noConflict && (a.URITemplate = p.URITemplate.noConflict()), p.IPv6 && 'function' === typeof p.IPv6.noConflict && (a.IPv6 = p.IPv6.noConflict()), p.SecondLevelDomains && 'function' === typeof p.SecondLevelDomains.noConflict && (a.SecondLevelDomains = p.SecondLevelDomains.noConflict()), a;
        p.URI === this && (p.URI = C);
        return this;
    };
    d.build = function (a) {
        if (!0 === a)
            this._deferred_build = !0;
        else if (void 0 === a || this._deferred_build)
            this._string = e.build(this._parts), this._deferred_build = !1;
        return this;
    };
    d.clone = function () {
        return new e(this);
    };
    d.valueOf = d.toString = function () {
        return this.build(!1)._string;
    };
    r = {
        protocol: 'protocol',
        username: 'username',
        password: 'password',
        hostname: 'hostname',
        port: 'port'
    };
    u = function (a) {
        return function (b, c) {
            if (void 0 === b)
                return this._parts[a] || '';
            this._parts[a] = b || null;
            this.build(!c);
            return this;
        };
    };
    for (m in r)
        d[m] = u(r[m]);
    r = {
        query: '?',
        fragment: '#'
    };
    u = function (a, b) {
        return function (c, e) {
            if (void 0 === c)
                return this._parts[a] || '';
            null !== c && (c += '', c.charAt(0) === b && (c = c.substring(1)));
            this._parts[a] = c;
            this.build(!e);
            return this;
        };
    };
    for (m in r)
        d[m] = u(m, r[m]);
    r = {
        search: [
            '?',
            'query'
        ],
        hash: [
            '#',
            'fragment'
        ]
    };
    u = function (a, b) {
        return function (c, e) {
            var d = this[a](c, e);
            return 'string' === typeof d && d.length ? b + d : d;
        };
    };
    for (m in r)
        d[m] = u(r[m][1], r[m][0]);
    d.pathname = function (a, b) {
        if (void 0 === a || !0 === a) {
            var c = this._parts.path || (this._parts.hostname ? '/' : '');
            return a ? e.decodePath(c) : c;
        }
        this._parts.path = a ? e.recodePath(a) : '/';
        this.build(!b);
        return this;
    };
    d.path = d.pathname;
    d.href = function (a, b) {
        var c;
        if (void 0 === a)
            return this.toString();
        this._string = '';
        this._parts = e._parts();
        var g = a instanceof e, d = 'object' === typeof a && (a.hostname || a.path || a.pathname);
        a.nodeName && (d = e.getDomAttribute(a), a = a[d] || '', d = !1);
        !g && d && void 0 !== a.pathname && (a = a.toString());
        if ('string' === typeof a)
            this._parts = e.parse(a, this._parts);
        else if (g || d)
            for (c in g = g ? a._parts : a, g)
                t.call(this._parts, c) && (this._parts[c] = g[c]);
        else
            throw new TypeError('invalid input');
        this.build(!b);
        return this;
    };
    d.is = function (a) {
        var b = !1, c = !1, d = !1, f = !1, k = !1, h = !1, l = !1, m = !this._parts.urn;
        this._parts.hostname && (m = !1, c = e.ip4_expression.test(this._parts.hostname), d = e.ip6_expression.test(this._parts.hostname), b = c || d, k = (f = !b) && v && v.has(this._parts.hostname), h = f && e.idn_expression.test(this._parts.hostname), l = f && e.punycode_expression.test(this._parts.hostname));
        switch (a.toLowerCase()) {
        case 'relative':
            return m;
        case 'absolute':
            return !m;
        case 'domain':
        case 'name':
            return f;
        case 'sld':
            return k;
        case 'ip':
            return b;
        case 'ip4':
        case 'ipv4':
        case 'inet4':
            return c;
        case 'ip6':
        case 'ipv6':
        case 'inet6':
            return d;
        case 'idn':
            return h;
        case 'url':
            return !this._parts.urn;
        case 'urn':
            return !!this._parts.urn;
        case 'punycode':
            return l;
        }
        return null;
    };
    var D = d.protocol, E = d.port, F = d.hostname;
    d.protocol = function (a, b) {
        if (void 0 !== a && a && (a = a.replace(/:(\/\/)?$/, ''), !a.match(e.protocol_expression)))
            throw new TypeError('Protocol "' + a + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
        return D.call(this, a, b);
    };
    d.scheme = d.protocol;
    d.port = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 !== a && (0 === a && (a = null), a && (a += '', ':' === a.charAt(0) && (a = a.substring(1)), a.match(/[^0-9]/))))
            throw new TypeError('Port "' + a + '" contains characters other than [0-9]');
        return E.call(this, a, b);
    };
    d.hostname = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 !== a) {
            var c = {};
            e.parseHost(a, c);
            a = c.hostname;
        }
        return F.call(this, a, b);
    };
    d.host = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 === a)
            return this._parts.hostname ? e.buildHost(this._parts) : '';
        e.parseHost(a, this._parts);
        this.build(!b);
        return this;
    };
    d.authority = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 === a)
            return this._parts.hostname ? e.buildAuthority(this._parts) : '';
        e.parseAuthority(a, this._parts);
        this.build(!b);
        return this;
    };
    d.userinfo = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 === a) {
            if (!this._parts.username)
                return '';
            var c = e.buildUserinfo(this._parts);
            return c.substring(0, c.length - 1);
        }
        '@' !== a[a.length - 1] && (a += '@');
        e.parseUserinfo(a, this._parts);
        this.build(!b);
        return this;
    };
    d.resource = function (a, b) {
        var c;
        if (void 0 === a)
            return this.path() + this.search() + this.hash();
        c = e.parse(a);
        this._parts.path = c.path;
        this._parts.query = c.query;
        this._parts.fragment = c.fragment;
        this.build(!b);
        return this;
    };
    d.subdomain = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 === a) {
            if (!this._parts.hostname || this.is('IP'))
                return '';
            var c = this._parts.hostname.length - this.domain().length - 1;
            return this._parts.hostname.substring(0, c) || '';
        }
        c = this._parts.hostname.length - this.domain().length;
        c = this._parts.hostname.substring(0, c);
        c = new RegExp('^' + s(c));
        a && '.' !== a.charAt(a.length - 1) && (a += '.');
        a && e.ensureValidHostname(a);
        this._parts.hostname = this._parts.hostname.replace(c, a);
        this.build(!b);
        return this;
    };
    d.domain = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        'boolean' === typeof a && (b = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is('IP'))
                return '';
            var c = this._parts.hostname.match(/\./g);
            if (c && 2 > c.length)
                return this._parts.hostname;
            c = this._parts.hostname.length - this.tld(b).length - 1;
            c = this._parts.hostname.lastIndexOf('.', c - 1) + 1;
            return this._parts.hostname.substring(c) || '';
        }
        if (!a)
            throw new TypeError('cannot set domain empty');
        e.ensureValidHostname(a);
        !this._parts.hostname || this.is('IP') ? this._parts.hostname = a : (c = new RegExp(s(this.domain()) + '$'), this._parts.hostname = this._parts.hostname.replace(c, a));
        this.build(!b);
        return this;
    };
    d.tld = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        'boolean' === typeof a && (b = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is('IP'))
                return '';
            var c = this._parts.hostname.lastIndexOf('.'), c = this._parts.hostname.substring(c + 1);
            return !0 !== b && v && v.list[c.toLowerCase()] ? v.get(this._parts.hostname) || c : c;
        }
        if (a)
            if (a.match(/[^a-zA-Z0-9-]/))
                if (v && v.is(a))
                    c = new RegExp(s(this.tld()) + '$'), this._parts.hostname = this._parts.hostname.replace(c, a);
                else
                    throw new TypeError('TLD "' + a + '" contains characters other than [A-Z0-9]');
            else {
                if (!this._parts.hostname || this.is('IP'))
                    throw new ReferenceError('cannot set TLD on non-domain host');
                c = new RegExp(s(this.tld()) + '$');
                this._parts.hostname = this._parts.hostname.replace(c, a);
            }
        else
            throw new TypeError('cannot set TLD empty');
        this.build(!b);
        return this;
    };
    d.directory = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path && !this._parts.hostname)
                return '';
            if ('/' === this._parts.path)
                return '/';
            var c = this._parts.path.length - this.filename().length - 1, c = this._parts.path.substring(0, c) || (this._parts.hostname ? '/' : '');
            return a ? e.decodePath(c) : c;
        }
        c = this._parts.path.length - this.filename().length;
        c = this._parts.path.substring(0, c);
        c = new RegExp('^' + s(c));
        this.is('relative') || (a || (a = '/'), '/' !== a.charAt(0) && (a = '/' + a));
        a && '/' !== a.charAt(a.length - 1) && (a += '/');
        a = e.recodePath(a);
        this._parts.path = this._parts.path.replace(c, a);
        this.build(!b);
        return this;
    };
    d.filename = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || '/' === this._parts.path)
                return '';
            var c = this._parts.path.lastIndexOf('/'), c = this._parts.path.substring(c + 1);
            return a ? e.decodePathSegment(c) : c;
        }
        c = !1;
        '/' === a.charAt(0) && (a = a.substring(1));
        a.match(/\.?\//) && (c = !0);
        var d = new RegExp(s(this.filename()) + '$');
        a = e.recodePath(a);
        this._parts.path = this._parts.path.replace(d, a);
        c ? this.normalizePath(b) : this.build(!b);
        return this;
    };
    d.suffix = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? '' : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || '/' === this._parts.path)
                return '';
            var c = this.filename(), d = c.lastIndexOf('.');
            if (-1 === d)
                return '';
            c = c.substring(d + 1);
            c = /^[a-z0-9%]+$/i.test(c) ? c : '';
            return a ? e.decodePathSegment(c) : c;
        }
        '.' === a.charAt(0) && (a = a.substring(1));
        if (c = this.suffix())
            d = a ? new RegExp(s(c) + '$') : new RegExp(s('.' + c) + '$');
        else {
            if (!a)
                return this;
            this._parts.path += '.' + e.recodePath(a);
        }
        d && (a = e.recodePath(a), this._parts.path = this._parts.path.replace(d, a));
        this.build(!b);
        return this;
    };
    d.segment = function (a, b, c) {
        var e = this._parts.urn ? ':' : '/', d = this.path(), k = '/' === d.substring(0, 1), d = d.split(e);
        void 0 !== a && 'number' !== typeof a && (c = b, b = a, a = void 0);
        if (void 0 !== a && 'number' !== typeof a)
            throw Error('Bad segment "' + a + '", must be 0-based integer');
        k && d.shift();
        0 > a && (a = Math.max(d.length + a, 0));
        if (void 0 === b)
            return void 0 === a ? d : d[a];
        if (null === a || void 0 === d[a])
            if (l(b)) {
                d = [];
                a = 0;
                for (var h = b.length; a < h; a++)
                    if (b[a].length || d.length && d[d.length - 1].length)
                        d.length && !d[d.length - 1].length && d.pop(), d.push(b[a]);
            } else {
                if (b || 'string' === typeof b)
                    '' === d[d.length - 1] ? d[d.length - 1] = b : d.push(b);
            }
        else
            b || 'string' === typeof b && b.length ? d[a] = b : d.splice(a, 1);
        k && d.unshift('');
        return this.path(d.join(e), c);
    };
    d.segmentCoded = function (a, b, c) {
        var d, f;
        'number' !== typeof a && (c = b, b = a, a = void 0);
        if (void 0 === b) {
            a = this.segment(a, b, c);
            if (l(a))
                for (d = 0, f = a.length; d < f; d++)
                    a[d] = e.decode(a[d]);
            else
                a = void 0 !== a ? e.decode(a) : void 0;
            return a;
        }
        if (l(b))
            for (d = 0, f = b.length; d < f; d++)
                b[d] = e.decode(b[d]);
        else
            b = 'string' === typeof b ? e.encode(b) : b;
        return this.segment(a, b, c);
    };
    var G = d.query;
    d.query = function (a, b) {
        if (!0 === a)
            return e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ('function' === typeof a) {
            var c = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace), d = a.call(this, c);
            this._parts.query = e.buildQuery(d || c, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            this.build(!b);
            return this;
        }
        return void 0 !== a && 'string' !== typeof a ? (this._parts.query = e.buildQuery(a, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!b), this) : G.call(this, a, b);
    };
    d.setQuery = function (a, b, c) {
        var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ('object' === typeof a)
            for (var f in a)
                t.call(a, f) && (d[f] = a[f]);
        else if ('string' === typeof a)
            d[a] = void 0 !== b ? b : null;
        else
            throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
        this._parts.query = e.buildQuery(d, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        'string' !== typeof a && (c = b);
        this.build(!c);
        return this;
    };
    d.addQuery = function (a, b, c) {
        var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        e.addQuery(d, a, void 0 === b ? null : b);
        this._parts.query = e.buildQuery(d, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        'string' !== typeof a && (c = b);
        this.build(!c);
        return this;
    };
    d.removeQuery = function (a, b, c) {
        var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        e.removeQuery(d, a, b);
        this._parts.query = e.buildQuery(d, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        'string' !== typeof a && (c = b);
        this.build(!c);
        return this;
    };
    d.hasQuery = function (a, b, c) {
        var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        return e.hasQuery(d, a, b, c);
    };
    d.setSearch = d.setQuery;
    d.addSearch = d.addQuery;
    d.removeSearch = d.removeQuery;
    d.hasSearch = d.hasQuery;
    d.normalize = function () {
        return this._parts.urn ? this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build();
    };
    d.normalizeProtocol = function (a) {
        'string' === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a));
        return this;
    };
    d.normalizeHostname = function (a) {
        this._parts.hostname && (this.is('IDN') && q ? this._parts.hostname = q.toASCII(this._parts.hostname) : this.is('IPv6') && w && (this._parts.hostname = w.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!a));
        return this;
    };
    d.normalizePort = function (a) {
        'string' === typeof this._parts.protocol && this._parts.port === e.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a));
        return this;
    };
    d.normalizePath = function (a) {
        if (this._parts.urn || !this._parts.path || '/' === this._parts.path)
            return this;
        var b, c = this._parts.path, d = '', f, k;
        '/' !== c.charAt(0) && (b = !0, c = '/' + c);
        c = c.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/');
        b && (d = c.substring(1).match(/^(\.\.\/)+/) || '') && (d = d[0]);
        for (;;) {
            f = c.indexOf('/..');
            if (-1 === f)
                break;
            else if (0 === f) {
                c = c.substring(3);
                continue;
            }
            k = c.substring(0, f).lastIndexOf('/');
            -1 === k && (k = f);
            c = c.substring(0, k) + c.substring(f + 3);
        }
        b && this.is('relative') && (c = d + c.substring(1));
        c = e.recodePath(c);
        this._parts.path = c;
        this.build(!a);
        return this;
    };
    d.normalizePathname = d.normalizePath;
    d.normalizeQuery = function (a) {
        'string' === typeof this._parts.query && (this._parts.query.length ? this.query(e.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!a));
        return this;
    };
    d.normalizeFragment = function (a) {
        this._parts.fragment || (this._parts.fragment = null, this.build(!a));
        return this;
    };
    d.normalizeSearch = d.normalizeQuery;
    d.normalizeHash = d.normalizeFragment;
    d.iso8859 = function () {
        var a = e.encode, b = e.decode;
        e.encode = escape;
        e.decode = decodeURIComponent;
        this.normalize();
        e.encode = a;
        e.decode = b;
        return this;
    };
    d.unicode = function () {
        var a = e.encode, b = e.decode;
        e.encode = z;
        e.decode = unescape;
        this.normalize();
        e.encode = a;
        e.decode = b;
        return this;
    };
    d.readable = function () {
        var a = this.clone();
        a.username('').password('').normalize();
        var b = '';
        a._parts.protocol && (b += a._parts.protocol + '://');
        a._parts.hostname && (a.is('punycode') && q ? (b += q.toUnicode(a._parts.hostname), a._parts.port && (b += ':' + a._parts.port)) : b += a.host());
        a._parts.hostname && a._parts.path && '/' !== a._parts.path.charAt(0) && (b += '/');
        b += a.path(!0);
        if (a._parts.query) {
            for (var c = '', d = 0, f = a._parts.query.split('&'), k = f.length; d < k; d++) {
                var h = (f[d] || '').split('='), c = c + ('&' + e.decodeQuery(h[0], this._parts.escapeQuerySpace).replace(/&/g, '%26'));
                void 0 !== h[1] && (c += '=' + e.decodeQuery(h[1], this._parts.escapeQuerySpace).replace(/&/g, '%26'));
            }
            b += '?' + c.substring(1);
        }
        return b += e.decodeQuery(a.hash(), !0);
    };
    d.absoluteTo = function (a) {
        var b = this.clone(), c = [
                'protocol',
                'username',
                'password',
                'hostname',
                'port'
            ], d, f;
        if (this._parts.urn)
            throw Error('URNs do not have any generally defined hierarchical components');
        a instanceof e || (a = new e(a));
        b._parts.protocol || (b._parts.protocol = a._parts.protocol);
        if (this._parts.hostname)
            return b;
        for (d = 0; f = c[d]; d++)
            b._parts[f] = a._parts[f];
        b._parts.path ? '..' === b._parts.path.substring(-2) && (b._parts.path += '/') : (b._parts.path = a._parts.path, b._parts.query || (b._parts.query = a._parts.query));
        '/' !== b.path().charAt(0) && (a = a.directory(), b._parts.path = (a ? a + '/' : '') + b._parts.path, b.normalizePath());
        b.build();
        return b;
    };
    d.relativeTo = function (a) {
        var b = this.clone().normalize(), c, d, f, k;
        if (b._parts.urn)
            throw Error('URNs do not have any generally defined hierarchical components');
        a = new e(a).normalize();
        c = b._parts;
        d = a._parts;
        f = b.path();
        k = a.path();
        if ('/' !== f.charAt(0))
            throw Error('URI is already relative');
        if ('/' !== k.charAt(0))
            throw Error('Cannot calculate a URI relative to another relative URI');
        c.protocol === d.protocol && (c.protocol = null);
        if (c.username === d.username && c.password === d.password && null === c.protocol && null === c.username && null === c.password && c.hostname === d.hostname && c.port === d.port)
            c.hostname = null, c.port = null;
        else
            return b.build();
        if (f === k)
            return c.path = '', b.build();
        a = e.commonPath(b.path(), a.path());
        if (!a)
            return b.build();
        d = d.path.substring(a.length).replace(/[^\/]*$/, '').replace(/.*?\//g, '../');
        c.path = d + c.path.substring(a.length);
        return b.build();
    };
    d.equals = function (a) {
        var b = this.clone();
        a = new e(a);
        var c = {}, d = {}, f = {}, k;
        b.normalize();
        a.normalize();
        if (b.toString() === a.toString())
            return !0;
        c = b.query();
        d = a.query();
        b.query('');
        a.query('');
        if (b.toString() !== a.toString() || c.length !== d.length)
            return !1;
        c = e.parseQuery(c, this._parts.escapeQuerySpace);
        d = e.parseQuery(d, this._parts.escapeQuerySpace);
        for (k in c)
            if (t.call(c, k)) {
                if (!l(c[k])) {
                    if (c[k] !== d[k])
                        return !1;
                } else if (!A(c[k], d[k]))
                    return !1;
                f[k] = !0;
            }
        for (k in d)
            if (t.call(d, k) && !f[k])
                return !1;
        return !0;
    };
    d.duplicateQueryParameters = function (a) {
        this._parts.duplicateQueryParameters = !!a;
        return this;
    };
    d.escapeQuerySpace = function (a) {
        this._parts.escapeQuerySpace = !!a;
        return this;
    };
    return e;
}));
define('framework/dialog', ['jquery'], function ($) {
    function Dialog(options) {
        this.options = options;
    }
    Dialog.prototype.render = function (options) {
        var html = '';
        if (options.id) {
            html += '<div id="' + options.id + '">';
        } else {
            html += '<div>';
        }
        html += '<div class="js-framework color-framework component-framework pattern-framework grid-framework type-framework responsive-framework">';
        html += '<div class="modal-backdrop black-bg"></div>';
        html += '<div class="modal">';
        html += '<div class="shim16" id="modal-shim"></div>';
        html += '<div class="shim18 mobile-hidden"></div>';
        var styl = '';
        styl += options.width ? 'max-width:' + options.width : '';
        html += '<div class="container mobile-container tablet-container" style="' + styl + '">';
        var cls = '';
        cls += options.backgroundColor == 'black' ? '' : 'white-bg';
        cls += options.textColor == 'white' ? 'white' : '';
        var closeColor = options.textColor == 'white' ? 'white' : 'hbsred';
        var anim = options.animation == 'slidedown' ? 'modal-slidedown' : 'modal-fadein';
        html += '   <div class="modal-dialog ' + anim + ' ' + cls + '">';
        if (options.title) {
            html += '     <div class="modal-header"> ';
            html += '          <button type="button" class="modal-header-close btn-unstyled ' + closeColor + ' eta">&times;</button>';
            html += '          <div class="kappa-uc modal-header-text">' + options.title + '</div>';
            if (options.textColor == 'white') {
                html += '          <div class="hr white-bg"></div>';
            } else {
                html += '          <div class="hr"></div>';
            }
            html += '     </div>';
            html += '     <div class="modal-body">' + options.body + '</div>';
        } else {
            html += '     <div class="modal-header"> ';
            html += '          <button type="button" class="modal-header-close btn-unstyled ' + closeColor + ' eta" style="margin:0">&times;</button>';
            html += '          <div class="clear"></div>';
            html += '     </div>';
            html += '     <div class="modal-body" style="padding-top:0">' + options.body + '</div>';
        }
        if (options.buttons && $.isPlainObject(options.buttons)) {
            html += '     <div class="modal-footer" style="text-align:right"><div class="shim24"></div>';
            if (options.title)
                html += '<div class="hr"></div>';
            var num = 0;
            $.each(options.buttons, function (key, value) {
                if (num == 0) {
                    html += '       <button class="btn-submit hbsred-bg button-' + num + '" style="min-width:75px">' + key + '</button>';
                } else {
                    html += '       <button class="btn-submit silver-bg button-' + num + '" style="min-width:75px">' + key + '</button>';
                }
                num++;
            });
            html += '       <div class="shim12"></div>';
            html += '     </div>';
        } else if (options.buttons && $.isArray(options.buttons)) {
            html += '     <div class="modal-footer" style="text-align:right"><div class="shim24"></div>';
            if (options.title)
                html += '<div class="hr"></div>';
            var num = 0;
            $.each(options.buttons, function (i, obj) {
                html += '       <button class="button-' + num + ' ' + (obj['class'] || obj['className']) + '" style="min-width:75px;' + (obj.style || '') + '">' + obj.label + '</button>';
                num++;
            });
            html += '       <div class="shim12"></div>';
            html += '     </div>';
        } else {
            html += '<div class="shim24"></div>';
        }
        html += '   </div>';
        html += '<div class="shim32"></div>';
        html += '</div>';
        html += '<div class="shim32"></div>';
        html += '</div>';
        html += '</div></div>';
        return html;
    };
    Dialog.prototype.open = function () {
        var self = this;
        window.topDialog = this;
        $('#framework-modal').remove();
        var options = this.options;
        var h = this.render(options);
        var h = '<div id="framework-modal">' + h + '</div>';
        $('body').append(h);
        if (typeof options.body == 'object')
            $('#framework-modal .modal-body').html(options.body);
        $('#framework-modal .modal-footer').on('click', 'button', function () {
            var key = $(this).text();
            if ($.isArray(options.buttons)) {
                $.each(options.buttons, function (i, obj) {
                    if (obj.label == key) {
                        var fn = obj.onClick;
                        if (fn)
                            fn.apply(self);
                    }
                });
            } else {
                var fn = options.buttons[key];
                if (fn)
                    fn.apply(self);
            }
        });
        $('.modal').on('click', function (e) {
            if ($(event.target).is('.modal')) {
                self.close();
            }
        });
        $(document).off('esc.dialog').on('esc.dialog', function (e) {
            window.topDialog.close();
        });
        $('#framework-modal').on('click', '.modal-header-close', function () {
            self.close();
        });
        $('#framework-modal').on('touchmove', '.modal-backdrop', function (event) {
            event.preventDefault();
        });
        window.requestAnimationFrame(function () {
            $('body').addClass('modal-open');
            if (options.centered)
                self.center();
            $(document).trigger('framework.domupdate');
            if (window.Widgets)
                Widgets.refresh();
        });
    };
    Dialog.prototype.center = function () {
        var winHeight = $('#framework-modal .modal').height() * 0.75;
        var dlgHeight = $('#framework-modal .modal-body').height();
        var diff = winHeight / 2 - dlgHeight / 2;
        if (diff > 0) {
            $('#modal-shim').height(diff);
        } else {
            $('#modal-shim').height(0);
        }
    }, Dialog.prototype.onClose = function (fn) {
        this.closeFn = fn;
    }, Dialog.prototype.close = function () {
        window.topDialog = null;
        if (this.closeFn)
            this.closeFn();
        $('body').removeClass('modal-open');
        window.setTimeout(function () {
            $('#framework-modal').remove();
        }, 200);
    };
    Dialog.prototype.find = function (tag) {
        return $('#framework-modal').find(tag);
    };
    return Dialog;
});
!function (n, e) {
    'function' == typeof define && define.amd ? define('framework/nprogress.min', [], e) : 'object' == typeof exports ? module.exports = e() : n.NProgress = e();
}(this, function () {
    function n(n, e, t) {
        return e > n ? e : n > t ? t : n;
    }
    function e(n) {
        return 100 * (-1 + n);
    }
    function t(n, t, r) {
        var i;
        return i = 'translate3d' === c.positionUsing ? { transform: 'translate3d(' + e(n) + '%,0,0)' } : 'translate' === c.positionUsing ? { transform: 'translate(' + e(n) + '%,0)' } : { 'margin-left': e(n) + '%' }, i.transition = 'all ' + t + 'ms ' + r, i;
    }
    function r(n, e) {
        var t = 'string' == typeof n ? n : o(n);
        return t.indexOf(' ' + e + ' ') >= 0;
    }
    function i(n, e) {
        var t = o(n), i = t + e;
        r(t, e) || (n.className = i.substring(1));
    }
    function s(n, e) {
        var t, i = o(n);
        r(n, e) && (t = i.replace(' ' + e + ' ', ' '), n.className = t.substring(1, t.length - 1));
    }
    function o(n) {
        return (' ' + (n.className || '') + ' ').replace(/\s+/gi, ' ');
    }
    function a(n) {
        n && n.parentNode && n.parentNode.removeChild(n);
    }
    var u = {};
    u.version = '0.1.6';
    var c = u.settings = {
        minimum: 0.08,
        easing: 'ease',
        positionUsing: '',
        speed: 200,
        trickle: !0,
        trickleRate: 0.02,
        trickleSpeed: 800,
        showSpinner: !0,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: 'body',
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    u.configure = function (n) {
        var e, t;
        for (e in n)
            t = n[e], void 0 !== t && n.hasOwnProperty(e) && (c[e] = t);
        return this;
    }, u.status = null, u.set = function (e) {
        var r = u.isStarted();
        e = n(e, c.minimum, 1), u.status = 1 === e ? null : e;
        var i = u.render(!r), s = i.querySelector(c.barSelector), o = c.speed, a = c.easing;
        return i.offsetWidth, l(function (n) {
            '' === c.positionUsing && (c.positionUsing = u.getPositioningCSS()), f(s, t(e, o, a)), 1 === e ? (f(i, {
                transition: 'none',
                opacity: 1
            }), i.offsetWidth, setTimeout(function () {
                f(i, {
                    transition: 'all ' + o + 'ms linear',
                    opacity: 0
                }), setTimeout(function () {
                    u.remove(), n();
                }, o);
            }, o)) : setTimeout(n, o);
        }), this;
    }, u.isStarted = function () {
        return 'number' == typeof u.status;
    }, u.start = function () {
        u.status || u.set(0);
        var n = function () {
            setTimeout(function () {
                u.status && (u.trickle(), n());
            }, c.trickleSpeed);
        };
        return c.trickle && n(), this;
    }, u.done = function (n) {
        return n || u.status ? u.inc(0.3 + 0.5 * Math.random()).set(1) : this;
    }, u.inc = function (e) {
        var t = u.status;
        return t ? ('number' != typeof e && (e = (1 - t) * n(Math.random() * t, 0.1, 0.95)), t = n(t + e, 0, 0.994), u.set(t)) : u.start();
    }, u.trickle = function () {
        return u.inc(Math.random() * c.trickleRate);
    }, function () {
        var n = 0, e = 0;
        u.promise = function (t) {
            return t && 'resolved' != t.state() ? (0 == e && u.start(), n++, e++, t.always(function () {
                e--, 0 == e ? (n = 0, u.done()) : u.set((n - e) / n);
            }), this) : this;
        };
    }(), u.render = function (n) {
        if (u.isRendered())
            return document.getElementById('nprogress');
        i(document.documentElement, 'nprogress-busy');
        var t = document.createElement('div');
        t.id = 'nprogress', t.innerHTML = c.template;
        var r, s = t.querySelector(c.barSelector), o = n ? '-100' : e(u.status || 0), l = document.querySelector(c.parent);
        return f(s, {
            transition: 'all 0 linear',
            transform: 'translate3d(' + o + '%,0,0)'
        }), c.showSpinner || (r = t.querySelector(c.spinnerSelector), r && a(r)), l != document.body && i(l, 'nprogress-custom-parent'), l.appendChild(t), t;
    }, u.remove = function () {
        s(document.documentElement, 'nprogress-busy'), s(document.querySelector(c.parent), 'nprogress-custom-parent');
        var n = document.getElementById('nprogress');
        n && a(n);
    }, u.isRendered = function () {
        return !!document.getElementById('nprogress');
    }, u.getPositioningCSS = function () {
        var n = document.body.style, e = 'WebkitTransform' in n ? 'Webkit' : 'MozTransform' in n ? 'Moz' : 'msTransform' in n ? 'ms' : 'OTransform' in n ? 'O' : '';
        return e + 'Perspective' in n ? 'translate3d' : e + 'Transform' in n ? 'translate' : 'margin';
    };
    var l = function () {
            function n() {
                var t = e.shift();
                t && t(n);
            }
            var e = [];
            return function (t) {
                e.push(t), 1 == e.length && n();
            };
        }(), f = function () {
            function n(n) {
                return n.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (n, e) {
                    return e.toUpperCase();
                });
            }
            function e(n) {
                var e = document.body.style;
                if (n in e)
                    return n;
                for (var t, r = i.length, s = n.charAt(0).toUpperCase() + n.slice(1); r--;)
                    if (t = i[r] + s, t in e)
                        return t;
                return n;
            }
            function t(t) {
                return t = n(t), s[t] || (s[t] = e(t));
            }
            function r(n, e, r) {
                e = t(e), n.style[e] = r;
            }
            var i = [
                    'Webkit',
                    'O',
                    'Moz',
                    'ms'
                ], s = {};
            return function (n, e) {
                var t, i, s = arguments;
                if (2 == s.length)
                    for (t in e)
                        i = e[t], void 0 !== i && e.hasOwnProperty(t) && r(n, t, i);
                else
                    r(n, s[1], s[2]);
            };
        }();
    return u;
});
(function (f) {
    var c = {
        vertical: {
            x: false,
            y: true
        },
        horizontal: {
            x: true,
            y: false
        },
        both: {
            x: true,
            y: true
        },
        x: {
            x: true,
            y: false
        },
        y: {
            x: false,
            y: true
        }
    };
    var b = {
        duration: 'fast',
        direction: 'both'
    };
    var e = /^(?:html)$/i;
    var g = function (k, j) {
        j = j || (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(k, null) : k.currentStyle);
        var i = document.defaultView && document.defaultView.getComputedStyle ? true : false;
        var h = {
            top: parseFloat(i ? j.borderTopWidth : f.css(k, 'borderTopWidth')) || 0,
            left: parseFloat(i ? j.borderLeftWidth : f.css(k, 'borderLeftWidth')) || 0,
            bottom: parseFloat(i ? j.borderBottomWidth : f.css(k, 'borderBottomWidth')) || 0,
            right: parseFloat(i ? j.borderRightWidth : f.css(k, 'borderRightWidth')) || 0
        };
        return {
            top: h.top,
            left: h.left,
            bottom: h.bottom,
            right: h.right,
            vertical: h.top + h.bottom,
            horizontal: h.left + h.right
        };
    };
    var d = function (h) {
        var j = f(window);
        var i = e.test(h[0].nodeName);
        return {
            border: i ? {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            } : g(h[0]),
            scroll: {
                top: (i ? j : h).scrollTop(),
                left: (i ? j : h).scrollLeft()
            },
            scrollbar: {
                right: i ? 0 : h.innerWidth() - h[0].clientWidth,
                bottom: i ? 0 : h.innerHeight() - h[0].clientHeight
            },
            rect: function () {
                var k = h[0].getBoundingClientRect();
                return {
                    top: i ? 0 : k.top,
                    left: i ? 0 : k.left,
                    bottom: i ? h[0].clientHeight : k.bottom,
                    right: i ? h[0].clientWidth : k.right
                };
            }()
        };
    };
    f.fn.extend({
        scrollintoview: function (j) {
            j = f.extend({}, b, j);
            j.direction = c[typeof j.direction === 'string' && j.direction.toLowerCase()] || c.both;
            var n = '';
            if (j.direction.x === true) {
                n = 'horizontal';
            }
            if (j.direction.y === true) {
                n = n ? 'both' : 'vertical';
            }
            var l = this.eq(0);
            var i = l.closest(':scrollable(' + n + ')');
            if (i.length > 0) {
                i = i.eq(0);
                var m = {
                    e: d(l),
                    s: d(i)
                };
                var h = {
                    top: m.e.rect.top - (m.s.rect.top + m.s.border.top),
                    bottom: m.s.rect.bottom - m.s.border.bottom - m.s.scrollbar.bottom - m.e.rect.bottom,
                    left: m.e.rect.left - (m.s.rect.left + m.s.border.left),
                    right: m.s.rect.right - m.s.border.right - m.s.scrollbar.right - m.e.rect.right
                };
                var k = {};
                if (j.direction.y === true) {
                    if (h.top < 0) {
                        k.scrollTop = m.s.scroll.top + h.top;
                    } else {
                        if (h.top > 0 && h.bottom < 0) {
                            k.scrollTop = m.s.scroll.top + Math.min(h.top, -h.bottom);
                        }
                    }
                }
                if (j.direction.x === true) {
                    if (h.left < 0) {
                        k.scrollLeft = m.s.scroll.left + h.left;
                    } else {
                        if (h.left > 0 && h.right < 0) {
                            k.scrollLeft = m.s.scroll.left + Math.min(h.left, -h.right);
                        }
                    }
                }
                if (!f.isEmptyObject(k)) {
                    if (e.test(i[0].nodeName)) {
                        i = f('html,body');
                    }
                    i.animate(k, j.duration).eq(0).queue(function (o) {
                        f.isFunction(j.complete) && j.complete.call(i[0]);
                        o();
                    });
                } else {
                    f.isFunction(j.complete) && j.complete.call(i[0]);
                }
            }
            return this;
        }
    });
    var a = {
        auto: true,
        scroll: true,
        visible: false,
        hidden: false
    };
    f.extend(f.expr[':'], {
        scrollable: function (k, i, n, h) {
            var m = c[typeof n[3] === 'string' && n[3].toLowerCase()] || c.both;
            var l = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(k, null) : k.currentStyle;
            var o = {
                x: a[l.overflowX.toLowerCase()] || false,
                y: a[l.overflowY.toLowerCase()] || false,
                isRoot: e.test(k.nodeName)
            };
            if (!o.x && !o.y && !o.isRoot) {
                return false;
            }
            var j = {
                height: {
                    scroll: k.scrollHeight,
                    client: k.clientHeight
                },
                width: {
                    scroll: k.scrollWidth,
                    client: k.clientWidth
                },
                scrollableX: function () {
                    return (o.x || o.isRoot) && this.width.scroll > this.width.client;
                },
                scrollableY: function () {
                    return (o.y || o.isRoot) && this.height.scroll > this.height.client;
                }
            };
            return m.y && j.scrollableY() || m.x && j.scrollableX();
        }
    });
}(jQuery));
define('framework/jquery.scrollintoview.min', [], function () {
    return;
});
define('framework/exports', [
    'jquery',
    'framework/cookie',
    'framework/URI',
    'framework/dialog',
    'framework/nprogress.min',
    'framework/jquery.scrollintoview.min'
], function ($, cookie, URI, Dialog, nprogress) {
    if ($(window).data('exports-installed') === true)
        return;
    $(window).data('exports-installed', true);
    var exports = {};
    exports.cookie = cookie;
    exports.URI = URI;
    exports.Dialog = Dialog;
    exports.progress = nprogress;
    exports.debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    exports.reload = function () {
        if (window.sneaky) {
            window.sneaky.sneak();
            location.reload();
        }
    };
    exports.scrollIntoView = function (el) {
        $(el).eq(0).scrollintoview();
    };
    exports.scrollTo = function (el) {
        var targetOffset = $(el).offset().top;
        if (document.getElementById('s4-workspace')) {
            $('#s4-workspace,html,body').animate({ scrollTop: targetOffset }, 1, 'swing', function () {
            });
        } else {
            $('html,body').animate({ scrollTop: targetOffset }, 1, 'swing', function () {
            });
        }
    };
    function NoClickDelay(el) {
        this.element = typeof el === 'object' ? el : document.getElementById(el);
        if (window.Touch)
            this.element.addEventListener('touchstart', this, false);
    }
    NoClickDelay.prototype = {
        handleEvent: function (e) {
            switch (e.type) {
            case 'touchstart':
                this.onTouchStart(e);
                break;
            case 'touchmove':
                this.onTouchMove(e);
                break;
            case 'touchend':
                this.onTouchEnd(e);
                break;
            }
        },
        onTouchStart: function (e) {
            e.preventDefault();
            this.moved = false;
            this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            if (this.theTarget.nodeType === 3)
                this.theTarget = this.theTarget.parentNode;
            this.theTarget.className += ' pressed';
            this.element.addEventListener('touchmove', this, false);
            this.element.addEventListener('touchend', this, false);
        },
        onTouchMove: function () {
            this.moved = true;
            this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
        },
        onTouchEnd: function () {
            this.element.removeEventListener('touchmove', this, false);
            this.element.removeEventListener('touchend', this, false);
            if (!this.moved && this.theTarget) {
                this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
                var theEvent = document.createEvent('MouseEvents');
                theEvent.initEvent('click', true, true);
                this.theTarget.dispatchEvent(theEvent);
            }
            this.theTarget = undefined;
        }
    };
    exports.fastClick = function (el) {
        new NoClickDelay(el);
    };
    window.framework = exports;
    return exports;
});
define('framework/toggle', [
    'jquery',
    'framework/exports'
], function ($, FW) {
    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function saveToggleCookie(el, save) {
        var id = $(el).attr('id');
        if (!id)
            return;
        var cookie = readCookie('fw.toggle');
        var parts = [];
        if (cookie != null)
            parts = cookie.split('&');
        var states = [];
        var found = false;
        for (var i = 0; i < parts.length; i++) {
            if (!save && parts[i] == id) {
                found = true;
            } else if (save && parts[i] == id) {
                found = true;
                states.push(id);
            } else if (parts[i]) {
                states.push(parts[i]);
            }
        }
        if (!found && save)
            states.push(id);
        document.cookie = 'fw.toggle=' + states.join('&') + '; path=/';
    }
    function loadToggleCookie(el) {
        var id = $(el).attr('id');
        if (!id)
            return;
        var cookie = readCookie('fw.toggle');
        if (cookie) {
            var parts = cookie.split('&');
            for (var i = 0; i < parts.length; i++) {
                if (parts[i] == id) {
                    return true;
                }
            }
        }
        return false;
    }
    function isClosest(obj, thisContainer) {
        var objContainer = $(obj).closest('.toggle-container')[0];
        return $.data(objContainer) == $.data(thisContainer);
    }
    return function (el) {
        if ($(el).data('toggle-installed') == true)
            return;
        $(el).data('toggle-installed', true);
        $('.toggle-show', el).hide();
        $(el).find('.toggle-button').each(function () {
        });
        $(el).bind('reset', function () {
            $(el).removeClass('toggled');
            $(el).find('input.toggle-button:checkbox').prop('checked', false);
            $('.toggle-show', el).each(function () {
                if (isClosest(this, el)) {
                    $(this).hide();
                }
            });
            $('.toggle-hide', el).each(function () {
                if (isClosest(this, el)) {
                    $(this).show();
                }
            });
        });
        $(el).on('click', '.toggle-button', function (event) {
            var target = $(this).attr('href');
            if (typeof target === 'string' && target.indexOf('#') == 0)
                target = target.substring(1);
            if ($(this).hasClass('toggle-plus') || $(this).hasClass('toggle-minus')) {
                $(this).toggleClass('toggle-plus toggle-minus');
            }
            if (isClosest(this, el)) {
                $('.toggle-hide,.toggle-show,.mobile-toggle-show,.mobile-toggle-hide', el).each(function () {
                    if (isClosest(this, el)) {
                        if (!target || !$(this).attr('id') || target == $(this).attr('id')) {
                            $(this).addClass('to-toggle');
                        }
                    }
                });
                if (target) {
                    $('#' + target).addClass('to-toggle');
                }
                $('.to-toggle').each(function () {
                    if ($(this).hasClass('has-slide')) {
                        $(this).slideToggle('fast');
                    } else {
                        $(this).toggle();
                    }
                    $(this).removeClass('to-toggle');
                    $(this).parent().find('.toggle-focus:visible').focus();
                });
                $(el).toggleClass('toggled');
                if ($(el).hasClass('has-memory')) {
                    saveToggleCookie(el, $(el).hasClass('toggled'));
                }
                $(document).trigger('framework.domupdate');
                $(el).trigger('change');
                if ($(this).is(':checkbox')) {
                } else {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        });
        if ($(el).hasClass('has-memory')) {
            if (loadToggleCookie(el)) {
                $(el).toggleClass('toggled');
                $(el).find('input.toggle-button:checkbox').prop('checked', true);
                $('.toggle-hide,.toggle-show', el).each(function () {
                    if (isClosest(this, el)) {
                        $(this).toggle();
                    }
                });
            }
        }
    };
});
define('framework/plugins', ['jquery'], function ($) {
    var queues = {};
    var status = {};
    var plugins = { jqueryui: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js' };
    return {
        ready: function (pluginName, callback) {
            if (pluginName == 'jqueryui' && window.jQuery && window.jQuery.ui) {
                callback.call();
                return;
            }
            if (typeof plugins[pluginName] == 'undefined') {
                return;
            }
            if (typeof status[pluginName] == 'undefined') {
                status[pluginName] = 'start';
                queues[pluginName] = [];
            }
            if (status[pluginName] == 'finished') {
                callback.call();
            } else {
                queues[pluginName].push(callback);
            }
            if (status[pluginName] == 'start') {
                status[pluginName] = 'loading';
                console.info('loading', plugins[pluginName]);
                $.ajax({
                    url: plugins[pluginName],
                    dataType: 'script',
                    cache: true,
                    success: function () {
                        status[pluginName] = 'finished';
                        for (var i = 0; i < queues[pluginName].length; i++) {
                            queues[pluginName][i].call();
                        }
                    }
                });
            }
        }
    };
});
define('framework/datepicker', [
    'jquery',
    'framework/plugins'
], function ($, Plugins) {
    function cleanup(dp, color) {
        var dpdiv;
        if (dp.dpDiv) {
            dpdiv = $(dp.dpDiv[0]);
        } else {
            dpdiv = dp;
        }
        if (color == null)
            color = '';
        var cssStyles = {
            width: '250px',
            backgroundColor: '#cecece'
        };
        dpdiv.css('z-index', '1000');
        dpdiv.addClass('component-framework color-framework type-framework').css(cssStyles).children().addClass('datepicker-pattern ' + color);
    }
    function cleanup2(dp, color) {
        var dpdiv;
        if (dp.dpDiv) {
            dpdiv = $(dp.dpDiv[0]);
        } else {
            dpdiv = dp;
        }
        if (color == null)
            color = '';
        dpdiv.children().addClass('datepicker-pattern ' + color);
    }
    function parseDate(strDate) {
        var dateParts = strDate.split('/');
        return new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
    }
    function installDatepicker(el) {
        var opts = {};
        opts.beforeShow = function (input, dp) {
            dpdiv = $(dp.dpDiv[0]);
            $(input).data('dp', dp);
            cleanup(dp);
        };
        opts.beforeShowDay = function (date) {
            var data = { date: date };
            $(el).trigger('beforeShowDay', data);
            if (data.result) {
                return data.result;
            } else {
                return [
                    true,
                    '',
                    ''
                ];
            }
        };
        opts.monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
        opts.showAnim = '';
        opts.constrainInput = true;
        opts.gotoCurrent = true;
        opts.dateFormat = 'mm/dd/yy';
        if ($(el).hasClass('datepicker-cn')) {
            opts.monthNames = '1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月'.split(' ');
            opts.dayNamesMin = '一 二 三 四 五 六 日'.split(' ');
        }
        opts.onChangeMonthYear = function (year, month, dp) {
            if (year)
                $(el).trigger('changeMonthYear', {
                    year: year,
                    month: month
                });
            window.setTimeout(function () {
                cleanup(dp);
            }, 1);
        };
        opts.onSelect = function (str, dp) {
            if (str)
                $(el).trigger('select', { date: str });
            window.setTimeout(function () {
                cleanup(dp);
            }, 1);
        };
        if ($(el).attr('data-maxDate') || $('input', el).attr('data-maxDate')) {
            var d = parseDate($(el).attr('data-maxDate') || $('input', el).attr('data-maxDate'));
            if (d)
                opts.maxDate = d;
        }
        if ($(el).attr('data-minDate') || $('input', el).attr('data-minDate')) {
            var d = parseDate($(el).attr('data-minDate') || $('input', el).attr('data-minDate'));
            if (d)
                opts.minDate = d;
        }
        if ($(el).attr('data-dateFormat')) {
            opts.dateFormat = $(el).attr('data-dateFormat');
        }
        var classNames = $(el).parents('[class*=\'-inherit\']').attr('class');
        var color = 'white-inherit';
        if (/([^ ]+-inherit)/.test(classNames)) {
            color = RegExp.$1;
        }
        if ($(el).is(':input')) {
            var dp = $(el).datepicker(opts);
            $(el).keyup(function () {
                var dp = $(this).data('dp');
                cleanup(dp);
                window.setTimeout(function () {
                    cleanup(dp);
                }, 1);
            });
            $(el).bind('focus keydown', function () {
                cleanup($(this).data('dp'), color);
            });
        } else {
            $(el).prepend($('<div class="datepicker-top-container"></div>'));
            $(el).append($('<div class="datepicker-bottom-container"></div>'));
            $(el).on('focus', ':input', function () {
                var dp = $(el).data('dp');
                if (dp && dp.find('.ui-datepicker-inline').length) {
                    return;
                }
                var sel = '.datepicker-bottom-container';
                if ($(this).offset().top > $(window).scrollTop() + $(window).height() - 220) {
                    sel = '.datepicker-top-container';
                }
                opts.defaultDate = $(this).val();
                $(this).addClass('focus');
                dp = $(sel, el).datepicker(opts);
                $(el).data('dp', dp);
                cleanup2(dp, color);
            });
            $(el).on('select', function (e, data) {
                if (data) {
                    console.info('select', e, data);
                    $(':input', el).val(data.date);
                    $('.ui-datepicker', el).fadeOut(200, function () {
                        var dp = $(el).data('dp');
                        if (dp)
                            dp.datepicker('destroy');
                        $(':input', el).removeClass('focus');
                    });
                }
            });
            $('body').click(function (e) {
                dp = $(el).data('dp');
                if ($(el).has(e.target).length == 0 && $(e.target).attr('class') && $(e.target).attr('class').indexOf('ui-datepicker') == -1) {
                    var dp = $(el).data('dp');
                    if (dp)
                        dp.datepicker('destroy');
                    $(':input', el).removeClass('focus');
                }
            });
            $(el).on('keyup', ':input', function () {
                var val = $(this).val();
                console.info('input change', val);
                try {
                    var date = $.datepicker.parseDate('mm/dd/yy', val);
                    console.info('new date', date);
                    var dp = $(el).data('dp');
                    if (dp)
                        $(dp).datepicker('setDate', val);
                } catch (e) {
                }
            });
        }
    }
    return function (el) {
        if ($(el).data('datepicker-installed') == true)
            return;
        $(el).data('datepicker-installed', true);
        Plugins.ready('jqueryui', function () {
            installDatepicker(el);
        });
    };
});
(function (t, e) {
    'use strict';
    function n() {
        if (!i.READY) {
            i.event.determineEventTypes();
            for (var t in i.gestures)
                i.gestures.hasOwnProperty(t) && i.detection.register(i.gestures[t]);
            i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect), i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect), i.READY = !0;
        }
    }
    var i = function (t, e) {
        return new i.Instance(t, e || {});
    };
    i.defaults = {
        stop_browser_behavior: {
            userSelect: 'none',
            touchAction: 'none',
            touchCallout: 'none',
            contentZooming: 'none',
            userDrag: 'none',
            tapHighlightColor: 'rgba(0,0,0,0)'
        }
    }, i.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, i.HAS_TOUCHEVENTS = 'ontouchstart' in t, i.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS && navigator.userAgent.match(i.MOBILE_REGEX), i.EVENT_TYPES = {}, i.DIRECTION_DOWN = 'down', i.DIRECTION_LEFT = 'left', i.DIRECTION_UP = 'up', i.DIRECTION_RIGHT = 'right', i.POINTER_MOUSE = 'mouse', i.POINTER_TOUCH = 'touch', i.POINTER_PEN = 'pen', i.EVENT_START = 'start', i.EVENT_MOVE = 'move', i.EVENT_END = 'end', i.DOCUMENT = document, i.plugins = {}, i.READY = !1, i.Instance = function (t, e) {
        var r = this;
        return n(), this.element = t, this.enabled = !0, this.options = i.utils.extend(i.utils.extend({}, i.defaults), e || {}), this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), i.event.onTouch(t, i.EVENT_START, function (t) {
            r.enabled && i.detection.startDetect(r, t);
        }), this;
    }, i.Instance.prototype = {
        on: function (t, e) {
            for (var n = t.split(' '), i = 0; n.length > i; i++)
                this.element.addEventListener(n[i], e, !1);
            return this;
        },
        off: function (t, e) {
            for (var n = t.split(' '), i = 0; n.length > i; i++)
                this.element.removeEventListener(n[i], e, !1);
            return this;
        },
        trigger: function (t, e) {
            var n = i.DOCUMENT.createEvent('Event');
            n.initEvent(t, !0, !0), n.gesture = e;
            var r = this.element;
            return i.utils.hasParent(e.target, r) && (r = e.target), r.dispatchEvent(n), this;
        },
        enable: function (t) {
            return this.enabled = t, this;
        }
    };
    var r = null, o = !1, s = !1;
    i.event = {
        bindDom: function (t, e, n) {
            for (var i = e.split(' '), r = 0; i.length > r; r++)
                t.addEventListener(i[r], n, !1);
        },
        onTouch: function (t, e, n) {
            var a = this;
            this.bindDom(t, i.EVENT_TYPES[e], function (c) {
                var u = c.type.toLowerCase();
                if (!u.match(/mouse/) || !s) {
                    (u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === c.which) && (o = !0), u.match(/touch|pointer/) && (s = !0);
                    var h = 0;
                    o && (i.HAS_POINTEREVENTS && e != i.EVENT_END ? h = i.PointerEvent.updatePointer(e, c) : u.match(/touch/) ? h = c.touches.length : s || (h = u.match(/up/) ? 0 : 1), h > 0 && e == i.EVENT_END ? e = i.EVENT_MOVE : h || (e = i.EVENT_END), h || null === r ? r = c : c = r, n.call(i.detection, a.collectEventData(t, e, c)), i.HAS_POINTEREVENTS && e == i.EVENT_END && (h = i.PointerEvent.updatePointer(e, c))), h || (r = null, o = !1, s = !1, i.PointerEvent.reset());
                }
            });
        },
        determineEventTypes: function () {
            var t;
            t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() : i.NO_MOUSEEVENTS ? [
                'touchstart',
                'touchmove',
                'touchend touchcancel'
            ] : [
                'touchstart mousedown',
                'touchmove mousemove',
                'touchend touchcancel mouseup'
            ], i.EVENT_TYPES[i.EVENT_START] = t[0], i.EVENT_TYPES[i.EVENT_MOVE] = t[1], i.EVENT_TYPES[i.EVENT_END] = t[2];
        },
        getTouchList: function (t) {
            return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() : t.touches ? t.touches : [{
                    identifier: 1,
                    pageX: t.pageX,
                    pageY: t.pageY,
                    target: t.target
                }];
        },
        collectEventData: function (t, e, n) {
            var r = this.getTouchList(n, e), o = i.POINTER_TOUCH;
            return (n.type.match(/mouse/) || i.PointerEvent.matchType(i.POINTER_MOUSE, n)) && (o = i.POINTER_MOUSE), {
                center: i.utils.getCenter(r),
                timeStamp: new Date().getTime(),
                target: n.target,
                touches: r,
                eventType: e,
                pointerType: o,
                srcEvent: n,
                preventDefault: function () {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault();
                },
                stopPropagation: function () {
                    this.srcEvent.stopPropagation();
                },
                stopDetect: function () {
                    return i.detection.stopDetect();
                }
            };
        }
    }, i.PointerEvent = {
        pointers: {},
        getTouchList: function () {
            var t = this, e = [];
            return Object.keys(t.pointers).sort().forEach(function (n) {
                e.push(t.pointers[n]);
            }), e;
        },
        updatePointer: function (t, e) {
            return t == i.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e), Object.keys(this.pointers).length;
        },
        matchType: function (t, e) {
            if (!e.pointerType)
                return !1;
            var n = {};
            return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == i.POINTER_MOUSE, n[i.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == i.POINTER_TOUCH, n[i.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN, n[t];
        },
        getEvents: function () {
            return [
                'pointerdown MSPointerDown',
                'pointermove MSPointerMove',
                'pointerup pointercancel MSPointerUp MSPointerCancel'
            ];
        },
        reset: function () {
            this.pointers = {};
        }
    }, i.utils = {
        extend: function (t, n, i) {
            for (var r in n)
                t[r] !== e && i || (t[r] = n[r]);
            return t;
        },
        hasParent: function (t, e) {
            for (; t;) {
                if (t == e)
                    return !0;
                t = t.parentNode;
            }
            return !1;
        },
        getCenter: function (t) {
            for (var e = [], n = [], i = 0, r = t.length; r > i; i++)
                e.push(t[i].pageX), n.push(t[i].pageY);
            return {
                pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
                pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
            };
        },
        getVelocity: function (t, e, n) {
            return {
                x: Math.abs(e / t) || 0,
                y: Math.abs(n / t) || 0
            };
        },
        getAngle: function (t, e) {
            var n = e.pageY - t.pageY, i = e.pageX - t.pageX;
            return 180 * Math.atan2(n, i) / Math.PI;
        },
        getDirection: function (t, e) {
            var n = Math.abs(t.pageX - e.pageX), r = Math.abs(t.pageY - e.pageY);
            return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? i.DIRECTION_UP : i.DIRECTION_DOWN;
        },
        getDistance: function (t, e) {
            var n = e.pageX - t.pageX, i = e.pageY - t.pageY;
            return Math.sqrt(n * n + i * i);
        },
        getScale: function (t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1;
        },
        getRotation: function (t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0;
        },
        isVertical: function (t) {
            return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN;
        },
        stopDefaultBrowserBehavior: function (t, e) {
            var n, i = [
                    'webkit',
                    'khtml',
                    'moz',
                    'ms',
                    'o',
                    ''
                ];
            if (e && t.style) {
                for (var r = 0; i.length > r; r++)
                    for (var o in e)
                        e.hasOwnProperty(o) && (n = o, i[r] && (n = i[r] + n.substring(0, 1).toUpperCase() + n.substring(1)), t.style[n] = e[o]);
                'none' == e.userSelect && (t.onselectstart = function () {
                    return !1;
                });
            }
        }
    }, i.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function (t, e) {
            this.current || (this.stopped = !1, this.current = {
                inst: t,
                startEvent: i.utils.extend({}, e),
                lastEvent: !1,
                name: ''
            }, this.detect(e));
        },
        detect: function (t) {
            if (this.current && !this.stopped) {
                t = this.extendEventData(t);
                for (var e = this.current.inst.options, n = 0, r = this.gestures.length; r > n; n++) {
                    var o = this.gestures[n];
                    if (!this.stopped && e[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
                        this.stopDetect();
                        break;
                    }
                }
                return this.current && (this.current.lastEvent = t), t.eventType == i.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t;
            }
        },
        stopDetect: function () {
            this.previous = i.utils.extend({}, this.current), this.current = null, this.stopped = !0;
        },
        extendEventData: function (t) {
            var e = this.current.startEvent;
            if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
                e.touches = [];
                for (var n = 0, r = t.touches.length; r > n; n++)
                    e.touches.push(i.utils.extend({}, t.touches[n]));
            }
            var o = t.timeStamp - e.timeStamp, s = t.center.pageX - e.center.pageX, a = t.center.pageY - e.center.pageY, c = i.utils.getVelocity(o, s, a);
            return i.utils.extend(t, {
                deltaTime: o,
                deltaX: s,
                deltaY: a,
                velocityX: c.x,
                velocityY: c.y,
                distance: i.utils.getDistance(e.center, t.center),
                angle: i.utils.getAngle(e.center, t.center),
                direction: i.utils.getDirection(e.center, t.center),
                scale: i.utils.getScale(e.touches, t.touches),
                rotation: i.utils.getRotation(e.touches, t.touches),
                startEvent: e
            }), t;
        },
        register: function (t) {
            var n = t.defaults || {};
            return n[t.name] === e && (n[t.name] = !0), i.utils.extend(i.defaults, n, !0), t.index = t.index || 1000, this.gestures.push(t), this.gestures.sort(function (t, e) {
                return t.index < e.index ? -1 : t.index > e.index ? 1 : 0;
            }), this.gestures;
        }
    }, i.gestures = i.gestures || {}, i.gestures.Hold = {
        name: 'hold',
        index: 10,
        defaults: {
            hold_timeout: 500,
            hold_threshold: 1
        },
        timer: null,
        handler: function (t, e) {
            switch (t.eventType) {
            case i.EVENT_START:
                clearTimeout(this.timer), i.detection.current.name = this.name, this.timer = setTimeout(function () {
                    'hold' == i.detection.current.name && e.trigger('hold', t);
                }, e.options.hold_timeout);
                break;
            case i.EVENT_MOVE:
                t.distance > e.options.hold_threshold && clearTimeout(this.timer);
                break;
            case i.EVENT_END:
                clearTimeout(this.timer);
            }
        }
    }, i.gestures.Tap = {
        name: 'tap',
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function (t, e) {
            if (t.eventType == i.EVENT_END) {
                var n = i.detection.previous, r = !1;
                if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance)
                    return;
                n && 'tap' == n.name && t.timeStamp - n.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger('doubletap', t), r = !0), (!r || e.options.tap_always) && (i.detection.current.name = 'tap', e.trigger(i.detection.current.name, t));
            }
        }
    }, i.gestures.Swipe = {
        name: 'swipe',
        index: 40,
        defaults: {
            swipe_max_touches: 1,
            swipe_velocity: 0.7
        },
        handler: function (t, e) {
            if (t.eventType == i.EVENT_END) {
                if (e.options.swipe_max_touches > 0 && t.touches.length > e.options.swipe_max_touches)
                    return;
                (t.velocityX > e.options.swipe_velocity || t.velocityY > e.options.swipe_velocity) && (e.trigger(this.name, t), e.trigger(this.name + t.direction, t));
            }
        }
    }, i.gestures.Drag = {
        name: 'drag',
        index: 50,
        defaults: {
            drag_min_distance: 10,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function (t, n) {
            if (i.detection.current.name != this.name && this.triggered)
                return n.trigger(this.name + 'end', t), this.triggered = !1, e;
            if (!(n.options.drag_max_touches > 0 && t.touches.length > n.options.drag_max_touches))
                switch (t.eventType) {
                case i.EVENT_START:
                    this.triggered = !1;
                    break;
                case i.EVENT_MOVE:
                    if (t.distance < n.options.drag_min_distance && i.detection.current.name != this.name)
                        return;
                    i.detection.current.name = this.name, (i.detection.current.lastEvent.drag_locked_to_axis || n.options.drag_lock_to_axis && n.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
                    var r = i.detection.current.lastEvent.direction;
                    t.drag_locked_to_axis && r !== t.direction && (t.direction = i.utils.isVertical(r) ? 0 > t.deltaY ? i.DIRECTION_UP : i.DIRECTION_DOWN : 0 > t.deltaX ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT), this.triggered || (n.trigger(this.name + 'start', t), this.triggered = !0), n.trigger(this.name, t), n.trigger(this.name + t.direction, t), (n.options.drag_block_vertical && i.utils.isVertical(t.direction) || n.options.drag_block_horizontal && !i.utils.isVertical(t.direction)) && t.preventDefault();
                    break;
                case i.EVENT_END:
                    this.triggered && n.trigger(this.name + 'end', t), this.triggered = !1;
                }
        }
    }, i.gestures.Transform = {
        name: 'transform',
        index: 45,
        defaults: {
            transform_min_scale: 0.01,
            transform_min_rotation: 1,
            transform_always_block: !1
        },
        triggered: !1,
        handler: function (t, n) {
            if (i.detection.current.name != this.name && this.triggered)
                return n.trigger(this.name + 'end', t), this.triggered = !1, e;
            if (!(2 > t.touches.length))
                switch (n.options.transform_always_block && t.preventDefault(), t.eventType) {
                case i.EVENT_START:
                    this.triggered = !1;
                    break;
                case i.EVENT_MOVE:
                    var r = Math.abs(1 - t.scale), o = Math.abs(t.rotation);
                    if (n.options.transform_min_scale > r && n.options.transform_min_rotation > o)
                        return;
                    i.detection.current.name = this.name, this.triggered || (n.trigger(this.name + 'start', t), this.triggered = !0), n.trigger(this.name, t), o > n.options.transform_min_rotation && n.trigger('rotate', t), r > n.options.transform_min_scale && (n.trigger('pinch', t), n.trigger('pinch' + (1 > t.scale ? 'in' : 'out'), t));
                    break;
                case i.EVENT_END:
                    this.triggered && n.trigger(this.name + 'end', t), this.triggered = !1;
                }
        }
    }, i.gestures.Touch = {
        name: 'touch',
        index: -1 / 0,
        defaults: {
            prevent_default: !1,
            prevent_mouseevents: !1
        },
        handler: function (t, n) {
            return n.options.prevent_mouseevents && t.pointerType == i.POINTER_MOUSE ? (t.stopDetect(), e) : (n.options.prevent_default && t.preventDefault(), t.eventType == i.EVENT_START && n.trigger(this.name, t), e);
        }
    }, i.gestures.Release = {
        name: 'release',
        index: 1 / 0,
        handler: function (t, e) {
            t.eventType == i.EVENT_END && e.trigger(this.name, t);
        }
    }, 'object' == typeof module && 'object' == typeof module.exports ? module.exports = i : (t.Hammer = i, 'function' == typeof t.define && t.define.amd && t.define('hammer', [], function () {
        return i;
    }));
}(this), function (t, e) {
    'use strict';
    t !== e && (Hammer.event.bindDom = function (n, i, r) {
        t(n).on(i, function (t) {
            var n = t.originalEvent || t;
            n.pageX === e && (n.pageX = t.pageX, n.pageY = t.pageY), n.target || (n.target = t.target), n.which === e && (n.which = n.button), n.preventDefault || (n.preventDefault = t.preventDefault), n.stopPropagation || (n.stopPropagation = t.stopPropagation), r.call(this, n);
        });
    }, Hammer.Instance.prototype.on = function (e, n) {
        return t(this.element).on(e, n);
    }, Hammer.Instance.prototype.off = function (e, n) {
        return t(this.element).off(e, n);
    }, Hammer.Instance.prototype.trigger = function (e, n) {
        var i = t(this.element);
        return i.has(n.target).length && (i = t(n.target)), i.trigger({
            type: e,
            gesture: n
        });
    }, t.fn.hammer = function (e) {
        return this.each(function () {
            var n = t(this), i = n.data('hammer');
            i ? i && e && Hammer.utils.extend(i.options, e) : n.data('hammer', new Hammer(this, e || {}));
        });
    });
}(window.jQuery || window.Zepto));
define('framework/jquery.hammer', [], function () {
    return;
});
define('framework/carousel', [
    'jquery',
    'framework/cookie',
    'framework/jquery.hammer'
], function ($, cookie, Hammer) {
    function renderCarouselNav(el, color, inverted) {
        var size = $(el).find('.carousel-panels > li').size();
        $(el).data('size', size);
        $(el).find('.carousel-nav').each(function () {
            var nav = $(this);
            var h = '<ul class="nav-carousel">';
            if (color == 'white' && inverted) {
                h += '<li class="prev"><a href="#"><span class="icon-circle-arrow-left-white"></span></a></li>';
            } else if (color == 'white') {
                h += '<li class="prev"><a href="#"><span class="icon-circle-arrow-left"></span></a></li>';
            } else {
                h += '<li class="prev"><a href="#"><span class="icon-circle-arrow-left-white-inverted black-bg icon-transition-bg-color"></span></a></li>';
            }
            for (var i = 0; i < size; i++) {
                h += '<li class="dot"><a href="#"><span class="icon-dot icon-transition-color">&#8226;</span></a></li>';
            }
            if (color == 'white' && inverted) {
                h += '<li class="next desktop-visible"><a href="#"><span class="icon-circle-arrow-right-white"></span></a></li>';
            } else if (color == 'white') {
                h += '<li class="next desktop-visible"><a href="#"><span class="icon-circle-arrow-right"></span></a></li>';
            } else {
                h += '<li class="next desktop-visible"><a href="#"><span class="icon-circle-arrow-right-white-inverted black-bg icon-transition-bg-color"></span></a></li>';
            }
            h += '</ul>';
            if (nav.hasClass('carousel-nav-centered')) {
                h = '<table style="margin-left: auto !important;margin-right: auto !important;"><tr><td>' + h + '</td></tr></table>';
            }
            nav.html(h);
            if (nav.hasClass('carousel-nav-minimal')) {
                nav.find('.prev,.next').hide();
            }
        });
    }
    function setPanel(el, num, animate, color, inverted) {
        var size = $(el).data('size');
        $(el).data('num', num);
        var id = $(el).attr('id');
        if (id && $(el).hasClass('has-memory')) {
            cookie.set(id, num);
        }
        $(el).find('.active').removeClass('active');
        if (inverted) {
            $(el).find('.dot span').removeClass(color + ' active-' + color).addClass('white fade');
        } else {
            $(el).find('.dot span').removeClass(color + ' active-' + color).addClass('black');
        }
        if (color == 'white') {
            if (num == 0) {
                if (inverted) {
                    $(el).find('.prev').addClass('disabled').find('span').addClass('fade');
                } else {
                    $(el).find('.prev').addClass('disabled').find('span').addClass('fade').addClass('icon-circle-arrow-left').removeClass('icon-circle-arrow-left-white');
                }
            } else {
                $(el).find('.prev').removeClass('disabled').find('span').removeClass('fade');
            }
            if (num == size - 1) {
                if (inverted) {
                    $(el).find('.next').addClass('disabled').find('span').addClass('fade');
                } else {
                    $(el).find('.next').addClass('disabled').find('span').addClass('fade').addClass('icon-circle-arrow-right').removeClass('icon-circle-arrow-right-white');
                    ;
                }
            } else {
                $(el).find('.next').removeClass('disabled').find('span').removeClass('fade');
            }
        } else {
            if (num == 0) {
                $(el).find('.prev').addClass('disabled').find('span').removeClass('inherit-bg ' + color + '-bg black-bg').addClass('silver-bg');
            } else {
                var span = $(el).find('.prev').removeClass('disabled').find('span');
                if (span.hasClass(color + '-bg'))
                    span.removeClass('silver-bg').addClass(color + '-bg');
                else
                    span.removeClass('silver-bg').addClass('black-bg');
            }
            if (num == $(el).data('size') - 1) {
                $(el).find('.next').addClass('disabled').find('span').removeClass('inherit-bg ' + color + '-bg black-bg').addClass('silver-bg');
            } else {
                var span = $(el).find('.next').removeClass('disabled').find('span');
                if (span.hasClass(color + '-bg'))
                    span.removeClass('silver-bg').addClass(color + '-bg');
                else
                    span.removeClass('silver-bg').addClass('black-bg');
            }
        }
        $(el).find('.carousel-nav').each(function () {
            if (inverted) {
                $(this).find('.dot').eq(num).addClass('active').find('span').addClass(color + ' active-' + color).removeClass('black fade');
            } else {
                $(this).find('.dot').eq(num).addClass('active').find('span').addClass(color + ' active-' + color).removeClass('black fade');
            }
        });
        var w = $(el).width();
        var end = 0;
        var panels = $(el).find('.carousel-panels > li');
        for (var i = 0; i < num; i++) {
            end += panels.eq(i).width();
        }
        var speed = animate ? 500 : 0;
        $(el).data('pos', -end);
        $(el).find('.carousel-panels > li').css('max-height', 'none');
        var oldmaxheight = $(el).data('maxheight') || 0;
        var maxheight = oldmaxheight;
        var newmaxheight = $(el).find('.carousel-panels > li').eq(num).height();
        if (newmaxheight > maxheight)
            maxheight = newmaxheight;
        $(el).data('maxheight', maxheight);
        $(el).find('.carousel-panels > li').css('max-height', maxheight + 'px');
        $(el).find('.carousel-panels').stop().animate({ left: -end }, speed, 'swing', function () {
            $(el).find('.carousel-panels > li').slice(0, num + 2).removeClass('hidden').find('.lazy').show().trigger('appear');
        });
    }
    function resize(el) {
        var w = $(el).width();
        $(el).data('width', w);
        if (!$(el).find('.carousel-panels').hasClass('carousel-panels-fixed-width')) {
            $(el).find('.carousel-panels > li').css('width', w);
        }
    }
    function touchEvents($el) {
        var panels = $el.find('.carousel-panels');
        function handleHammer(ev) {
            ev.gesture.preventDefault();
            switch (ev.type) {
            case 'dragright':
            case 'dragleft':
                var pos = $el.data('pos') + ev.gesture.deltaX;
                var num = $el.data('num');
                var size = $el.data('size');
                if (num == 0 && pos > 0) {
                } else if (num == size - 1 && pos < 0) {
                } else {
                    panels.css({ left: pos });
                }
                break;
            case 'release':
                if (ev.gesture.deltaX < -100) {
                    $el.find('.next a').eq(0).trigger('click');
                }
                if (ev.gesture.deltaX > 100) {
                    $el.find('.prev a').eq(0).trigger('click');
                }
                break;
            }
        }
        if ('ontouchstart' in window) {
            $('img', $el).bind('dragstart', function (e) {
                return false;
            });
            panels.hammer({
                stop_browser_behavior: { touchAction: 'pan-y' },
                drag_lock_to_axis: true,
                drag_vertical: false
            }).on('release dragleft dragright', handleHammer);
        }
    }
    function shuffle(items) {
        var c = [];
        return items.each(function () {
            c.push($(this).clone(true));
        }).each(function (a, b) {
            $(b).replaceWith(c[a = Math.floor(Math.random() * c.length)]);
            c.splice(a, 1);
        });
    }
    return function (el) {
        var $el = $(el);
        if ($el.data('carousel-installed') == true)
            return;
        $el.data('carousel-installed', true);
        if ($el.hasClass('has-shuffle')) {
            shuffle($el.find('.carousel-panels > li'));
        }
        var color = 'teal';
        var inverted = false;
        if ($(el).parents('.inherit-bg').size() > 0 || $(el).hasClass('carousel-monotone')) {
            color = 'white';
        }
        if ($(el).hasClass('carousel-inverted')) {
            color = 'white';
            inverted = true;
        }
        renderCarouselNav(el, color, inverted);
        resize(el);
        $(window).load(function () {
            resize(el);
        });
        $(document).bind('framework.resize framework.domupdate', function () {
            resize(el);
            setPanel(el, $(el).data('num'), false, color, inverted);
        });
        touchEvents($el);
        var id = $el.attr('id');
        var startnum = parseInt(cookie.get(id)) || 0;
        if (startnum > $(el).data('size'))
            startnum = 0;
        $(el).data('num', startnum);
        setPanel(el, $(el).data('num'), false, color, inverted);
        $(window).load(function () {
            setPanel(el, $(el).data('num'), false, color, inverted);
        });
        $(el).on('click', '.nav-carousel .dot a', function (event) {
            var num = $(this).parent().parent().find('.dot a').index(this);
            setPanel(el, num, true, color, inverted);
            event.preventDefault();
        });
        $(el).on('click', '.next a', function (event) {
            if (!$(this).parent().hasClass('disabled')) {
                var num = $(el).data('num') + 1;
                setPanel(el, num, true, color, inverted);
                if (window.analytics)
                    analytics.event('carousel-arrow-next');
            }
            event.preventDefault();
        });
        $(el).on('click', '.carousel-next', function (event) {
            var num = $(el).data('num') + 1;
            setPanel(el, num, true, color, inverted);
            if (window.analytics)
                analytics.event('carousel-next');
            event.preventDefault();
        });
        $(el).on('click', '.carousel-prev', function (event) {
            var num = $(el).data('num') - 1;
            setPanel(el, num, true, color, inverted);
            if (window.analytics)
                analytics.event('carousel-prev');
            event.preventDefault();
        });
        $(el).on('click', '.prev a', function (event) {
            if (!$(this).parent().hasClass('disabled')) {
                var num = $(el).data('num') - 1;
                setPanel(el, num, true, color, inverted);
                if (window.analytics)
                    analytics.event('carousel-arrow-prev');
            }
            event.preventDefault();
        });
        $('.next a,.prev a,.dot a', el).hover(function () {
            if ($('html.ua-touch').length != 0)
                return;
            var icon = this.firstChild;
            if (inverted)
                return;
            if ($(icon).hasClass('silver-bg') || $(icon).hasClass('fade')) {
            } else if (color == 'white' && icon.className.indexOf('left') > -1) {
                icon.className = 'icon-circle-arrow-left-white';
            } else if (color == 'black' && icon.className.indexOf('left') > -1) {
                icon.className = 'icon-circle-arrow-left';
            } else if (color == 'white' && icon.className.indexOf('right') > -1) {
                icon.className = 'icon-circle-arrow-right-white';
            } else if (color == 'black' && icon.className.indexOf('right') > -1) {
                icon.className = 'icon-circle-arrow-right';
            } else if (color == 'white' && icon.className.indexOf('dot') > -1 && icon.className.indexOf('active-' + color) == -1) {
                icon.className = 'icon-dot white icon-transition-color';
            } else if (icon.className.indexOf('left') > -1) {
                icon.className = 'icon-circle-arrow-left-white-inverted ' + color + '-bg icon-transition-bg-color';
            } else if (icon.className.indexOf('right') > -1) {
                icon.className = 'icon-circle-arrow-right-white-inverted ' + color + '-bg icon-transition-bg-color';
            } else if (icon.className.indexOf('dot') > -1 && icon.className.indexOf('active-' + color) > -1) {
                icon.className = 'icon-dot ' + color + ' icon-transition-color active-' + color;
            } else if (icon.className.indexOf('dot') > -1) {
                icon.className = 'icon-dot ' + color + ' icon-transition-color';
            }
        }, function () {
            var icon = this.firstChild;
            if (inverted)
                return;
            if ($(icon).hasClass('silver-bg') || $(icon).hasClass('fade')) {
            } else if (color == 'white' && icon.className.indexOf('left') > -1) {
                icon.className = 'icon-circle-arrow-left';
            } else if (color == 'black' && icon.className.indexOf('left') > -1) {
                icon.className = 'icon-circle-arrow-left-white';
            } else if (color == 'white' && icon.className.indexOf('right') > -1) {
                icon.className = 'icon-circle-arrow-right';
            } else if (color == 'white' && icon.className.indexOf('right') > -1) {
                icon.className = 'icon-circle-arrow-right-white';
            } else if (icon.className.indexOf('left') > -1) {
                icon.className = 'icon-circle-arrow-left-white-inverted black-bg icon-transition-bg-color';
            } else if (icon.className.indexOf('right') > -1) {
                icon.className = 'icon-circle-arrow-right-white-inverted black-bg icon-transition-bg-color';
            } else if (icon.className.indexOf('dot') > -1 && icon.className.indexOf('active-' + color) > -1) {
                icon.className = 'icon-dot ' + color + ' icon-transition-color active-' + color;
            } else if (icon.className.indexOf('dot') > -1) {
                icon.className = 'icon-dot black icon-transition-color';
            }
        });
    };
});
define('framework/placeholder', ['jquery'], function ($) {
    ;
    (function (window, document, $) {
        if (!$.valHooks)
            return;
        var isInputSupported = 'placeholder' in document.createElement('input');
        var isTextareaSupported = 'placeholder' in document.createElement('textarea');
        var prototype = $.fn;
        var valHooks = $.valHooks;
        var propHooks = $.propHooks;
        var hooks;
        var placeholder;
        if (isInputSupported && isTextareaSupported) {
            placeholder = prototype.placeholder = function () {
                return this;
            };
            placeholder.input = placeholder.textarea = true;
        } else {
            placeholder = prototype.placeholder = function () {
                var $this = this;
                $this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                }).data('placeholder-enabled', true).trigger('blur.placeholder');
                return $this;
            };
            placeholder.input = isInputSupported;
            placeholder.textarea = isTextareaSupported;
            hooks = {
                'get': function (element) {
                    var $element = $(element);
                    var $passwordInput = $element.data('placeholder-password');
                    if ($passwordInput) {
                        return $passwordInput[0].value;
                    }
                    return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
                },
                'set': function (element, value) {
                    var $element = $(element);
                    var $passwordInput = $element.data('placeholder-password');
                    if ($passwordInput) {
                        return $passwordInput[0].value = value;
                    }
                    if (!$element.data('placeholder-enabled')) {
                        return element.value = value;
                    }
                    if (value == '') {
                        element.value = value;
                        if (element != safeActiveElement()) {
                            setPlaceholder.call(element);
                        }
                    } else if ($element.hasClass('placeholder')) {
                        clearPlaceholder.call(element, true, value) || (element.value = value);
                    } else {
                        element.value = value;
                    }
                    return $element;
                }
            };
            if (!isInputSupported) {
                valHooks.input = hooks;
                propHooks.value = hooks;
            }
            if (!isTextareaSupported) {
                valHooks.textarea = hooks;
                propHooks.value = hooks;
            }
            $(function () {
                $(document).delegate('form', 'submit.placeholder', function () {
                    var $inputs = $('.placeholder', this).each(clearPlaceholder);
                    setTimeout(function () {
                        $inputs.each(setPlaceholder);
                    }, 10);
                });
            });
            $(window).bind('beforeunload.placeholder', function () {
                $('.placeholder').each(function () {
                    this.value = '';
                });
            });
        }
        function args(elem) {
            var newAttrs = {};
            var rinlinejQuery = /^jQuery\d+$/;
            $.each(elem.attributes, function (i, attr) {
                if (attr.specified && !rinlinejQuery.test(attr.name)) {
                    newAttrs[attr.name] = attr.value;
                }
            });
            return newAttrs;
        }
        function clearPlaceholder(event, value) {
            var input = this;
            var $input = $(input);
            if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
                if ($input.data('placeholder-password')) {
                    $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                    if (event === true) {
                        return $input[0].value = value;
                    }
                    $input.focus();
                } else {
                    input.value = '';
                    $input.removeClass('placeholder');
                    input == safeActiveElement() && input.select();
                }
            }
        }
        function setPlaceholder() {
            var $replacement;
            var input = this;
            var $input = $(input);
            var id = this.id;
            if (input.value == '') {
                if (input.type == 'password') {
                    if (!$input.data('placeholder-textinput')) {
                        try {
                            $replacement = $input.clone().attr({ 'type': 'text' });
                        } catch (e) {
                            $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                        }
                        $replacement.removeAttr('name').data({
                            'placeholder-password': $input,
                            'placeholder-id': id
                        }).bind('focus.placeholder', clearPlaceholder);
                        $input.data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        }).before($replacement);
                    }
                    $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
                }
                $input.addClass('placeholder');
                $input[0].value = $input.attr('placeholder');
            } else {
                $input.removeClass('placeholder');
            }
        }
        function safeActiveElement() {
            try {
                return document.activeElement;
            } catch (err) {
            }
        }
    }(this, document, jQuery));
    return function (el) {
        $(el).placeholder();
    };
});
define('framework/trim', ['jquery'], function ($) {
    return function (el) {
        var verbose = false;
        if (/_fw_trim_verbose/.test(document.location)) {
            verbose = true;
        }
        if (verbose) {
            console.info('Element', el);
        }
        if ($(el).data('trim-installed') == true)
            return;
        $(el).data('trim-installed', true);
        var $el = $(el);
        var $clone = $(el.cloneNode(true)).css('overflow', 'visible').height('auto').css('max-height', 'none');
        $el.after($clone);
        if ($clone.outerHeight() <= $el.outerHeight()) {
            if (verbose) {
                console.info('Not trimming', el, $clone.outerHeight(), $el.outerHeight());
            }
            $clone.remove();
            return;
        }
        ;
        var $target = $('.trim-ellipsis,.trim-ellipsis-char', $clone).eq(0);
        if ($target.size() == 0)
            return;
        var option = 'word';
        if ($target.hasClass('trim-ellipsis-char'))
            option = 'char';
        function bestfit(clone, orig, target, origtext, pos, step, direction, option) {
            if (!origtext || origtext.length == 0)
                return text;
            var newtext;
            if (option == 'word') {
                for (var i = 0; i < 100; i++) {
                    if (origtext[pos + i * direction] == ' ') {
                        pos = pos + i * direction;
                        break;
                    }
                }
            }
            newtext = origtext.substr(0, pos);
            if (verbose) {
                console.info('NEW', direction, pos, step, newtext);
            }
            if (step == 0) {
                return;
            }
            if (step > 0) {
                newtext = newtext + '&hellip;';
                target.html(newtext);
            }
            var sizediff = clone.outerHeight() - orig.outerHeight();
            direction = -1;
            if (sizediff > 0) {
                pos = pos - Math.floor(step / 2);
            } else {
                pos = pos + Math.floor(step / 2);
                direction = 1;
            }
            bestfit(clone, orig, target, origtext, pos - 1, Math.floor(step / 2), direction, option);
        }
        var text = $target.html();
        bestfit($clone, $el, $target, text, text.length, text.length, 1, option);
        $el.html($clone.html());
        $clone.remove();
    };
});
if (typeof jQuery.fn.on === 'function') {
    !function (d) {
        var h = function (a) {
            this.messages = {
                defaultMessage: 'This value seems to be invalid.',
                type: {
                    email: 'This value should be a valid email.',
                    url: 'This value should be a valid url.',
                    urlstrict: 'This value should be a valid url.',
                    number: 'This value should be a valid number.',
                    digits: 'This value should be digits.',
                    dateIso: 'This value should be a valid date (YYYY-MM-DD).',
                    alphanum: 'This value should be alphanumeric.',
                    phone: 'This value should be a valid phone number.'
                },
                notnull: 'This value should not be null.',
                notblank: 'This value should not be blank.',
                required: 'This value is required.',
                regexp: 'This value seems to be invalid.',
                min: 'This value should be greater than or equal to %s.',
                max: 'This value should be lower than or equal to %s.',
                range: 'This value should be between %s and %s.',
                minlength: 'This value is too short. It should have %s characters or more.',
                maxlength: 'This value is too long. It should have %s characters or less.',
                rangelength: 'This value length is invalid. It should be between %s and %s characters long.',
                mincheck: 'You must select at least %s choices.',
                maxcheck: 'You must select %s choices or less.',
                rangecheck: 'You must select between %s and %s choices.',
                equalto: 'This value should be the same.'
            };
            this.init(a);
        };
        h.prototype = {
            constructor: h,
            validators: {
                notnull: function (a) {
                    return 0 < a.length;
                },
                notblank: function (a) {
                    return 'string' === typeof a && '' !== a.replace(/^\s+/g, '').replace(/\s+$/g, '');
                },
                required: function (a) {
                    if ('object' === typeof a) {
                        for (var b in a)
                            if (this.required(a[b]))
                                return !0;
                        return !1;
                    }
                    return this.notnull(a) && this.notblank(a);
                },
                type: function (a, b) {
                    var c;
                    switch (b) {
                    case 'number':
                        c = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                        break;
                    case 'digits':
                        c = /^\d+$/;
                        break;
                    case 'alphanum':
                        c = /^\w+$/;
                        break;
                    case 'email':
                        c = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
                        break;
                    case 'url':
                        a = /(https?|s?ftp|git)/i.test(a) ? a : 'http://' + a;
                    case 'urlstrict':
                        c = /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                        break;
                    case 'dateIso':
                        c = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;
                        break;
                    case 'phone':
                        c = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
                        break;
                    default:
                        return !1;
                    }
                    return '' !== a ? c.test(a) : !1;
                },
                regexp: function (a, b, c) {
                    return RegExp(b, c.options.regexpFlag || '').test(a);
                },
                minlength: function (a, b) {
                    return a.length >= b;
                },
                maxlength: function (a, b) {
                    return a.length <= b;
                },
                rangelength: function (a, b) {
                    return this.minlength(a, b[0]) && this.maxlength(a, b[1]);
                },
                min: function (a, b) {
                    return Number(a) >= b;
                },
                max: function (a, b) {
                    return Number(a) <= b;
                },
                range: function (a, b) {
                    return a >= b[0] && a <= b[1];
                },
                equalto: function (a, b, c) {
                    c.options.validateIfUnchanged = !0;
                    return a === d(b).val();
                },
                remote: function (a, b, c) {
                    var f = {}, g = {};
                    f[c.$element.attr('name')] = a;
                    'undefined' !== typeof c.options.remoteDatatype && (g = { dataType: c.options.remoteDatatype });
                    var m = function (a, b) {
                            'undefined' !== typeof b && ('undefined' !== typeof c.Validator.messages.remote && b !== c.Validator.messages.remote) && d(c.ulError + ' .remote').remove();
                            c.updtConstraint({
                                name: 'remote',
                                valid: a
                            }, b);
                            c.manageValidationResult();
                        }, n = function (a) {
                            if ('object' === typeof a)
                                return a;
                            try {
                                a = d.parseJSON(a);
                            } catch (b) {
                            }
                            return a;
                        }, e = function (a) {
                            return 'object' === typeof a && null !== a ? 'undefined' !== typeof a.error ? a.error : 'undefined' !== typeof a.message ? a.message : null : null;
                        };
                    d.ajax(d.extend({}, {
                        url: b,
                        data: f,
                        type: c.options.remoteMethod || 'GET',
                        success: function (a) {
                            a = n(a);
                            m(1 === a || !0 === a || 'object' === typeof a && null !== a && 'undefined' !== typeof a.success, e(a));
                        },
                        error: function (a) {
                            a = n(a);
                            m(!1, e(a));
                        }
                    }, g));
                    return null;
                },
                mincheck: function (a, b) {
                    return this.minlength(a, b);
                },
                maxcheck: function (a, b) {
                    return this.maxlength(a, b);
                },
                rangecheck: function (a, b) {
                    return this.rangelength(a, b);
                }
            },
            init: function (a) {
                var b = a.validators;
                a = a.messages;
                for (var c in b)
                    this.addValidator(c, b[c]);
                for (c in a)
                    this.addMessage(c, a[c]);
            },
            formatMesssage: function (a, b) {
                if ('object' === typeof b) {
                    for (var c in b)
                        a = this.formatMesssage(a, b[c]);
                    return a;
                }
                return 'string' === typeof a ? a.replace(/%s/i, b) : '';
            },
            addValidator: function (a, b) {
                this.validators[a] = b;
            },
            addMessage: function (a, b, c) {
                if ('undefined' !== typeof c && !0 === c)
                    this.messages.type[a] = b;
                else if ('type' === a)
                    for (var d in b)
                        this.messages.type[d] = b[d];
                else
                    this.messages[a] = b;
            }
        };
        var j = function (a, b, c) {
            this.options = b;
            this.Validator = new h(b);
            if ('ParsleyFieldMultiple' === c)
                return this;
            this.init(a, c || 'ParsleyField');
        };
        j.prototype = {
            constructor: j,
            init: function (a, b) {
                this.type = b;
                this.valid = !0;
                this.element = a;
                this.validatedOnce = !1;
                this.$element = d(a);
                this.val = this.$element.val();
                this.isRequired = !1;
                this.constraints = {};
                'undefined' === typeof this.isRadioOrCheckbox && (this.isRadioOrCheckbox = !1, this.hash = this.generateHash(), this.errorClassHandler = this.options.errors.classHandler(a, this.isRadioOrCheckbox) || this.$element);
                this.ulErrorManagement();
                this.bindHtml5Constraints();
                this.addConstraints();
                this.hasConstraints() && this.bindValidationEvents();
            },
            setParent: function (a) {
                this.$parent = d(a);
            },
            getParent: function () {
                return this.$parent;
            },
            bindHtml5Constraints: function () {
                if (this.$element.hasClass('required') || this.$element.prop('required'))
                    this.options.required = !0;
                'undefined' !== typeof this.$element.attr('type') && RegExp(this.$element.attr('type'), 'i').test('email url number range') && (this.options.type = this.$element.attr('type'), RegExp(this.options.type, 'i').test('number range') && (this.options.type = 'number', 'undefined' !== typeof this.$element.attr('min') && this.$element.attr('min').length && (this.options.min = this.$element.attr('min')), 'undefined' !== typeof this.$element.attr('max') && this.$element.attr('max').length && (this.options.max = this.$element.attr('max'))));
                'string' === typeof this.$element.attr('pattern') && this.$element.attr('pattern').length && (this.options.regexp = this.$element.attr('pattern'));
            },
            addConstraints: function () {
                for (var a in this.options) {
                    var b = {};
                    b[a] = this.options[a];
                    this.addConstraint(b, !0);
                }
            },
            addConstraint: function (a, b) {
                for (var c in a)
                    c = c.toLowerCase(), 'function' === typeof this.Validator.validators[c] && (this.constraints[c] = {
                        name: c,
                        requirements: a[c],
                        valid: null
                    }, 'required' === c && (this.isRequired = !0), this.addCustomConstraintMessage(c));
                'undefined' === typeof b && this.bindValidationEvents();
            },
            updateConstraint: function (a, b) {
                for (var c in a)
                    this.updtConstraint({
                        name: c,
                        requirements: a[c],
                        valid: null
                    }, b);
            },
            updtConstraint: function (a, b) {
                this.constraints[a.name] = d.extend(!0, this.constraints[a.name], a);
                'string' === typeof b && (this.Validator.messages[a.name] = b);
                this.bindValidationEvents();
            },
            removeConstraint: function (a) {
                a = a.toLowerCase();
                delete this.constraints[a];
                'required' === a && (this.isRequired = !1);
                this.hasConstraints() ? this.bindValidationEvents() : 'ParsleyForm' === typeof this.getParent() ? this.getParent().removeItem(this.$element) : this.destroy();
            },
            addCustomConstraintMessage: function (a) {
                var b = a + ('type' === a && 'undefined' !== typeof this.options[a] ? this.options[a].charAt(0).toUpperCase() + this.options[a].substr(1) : '') + 'Message';
                'undefined' !== typeof this.options[b] && this.Validator.addMessage('type' === a ? this.options[a] : a, this.options[b], 'type' === a);
            },
            bindValidationEvents: function () {
                this.valid = null;
                this.$element.addClass('parsley-validated');
                this.$element.off('.' + this.type);
                this.options.remote && !/change/i.test(this.options.trigger) && (this.options.trigger = !this.options.trigger ? 'change' : ' change');
                var a = (!this.options.trigger ? '' : this.options.trigger) + (/key/i.test(this.options.trigger) ? '' : ' keyup');
                this.$element.is('select') && (a += /change/i.test(a) ? '' : ' change');
                a = a.replace(/^\s+/g, '').replace(/\s+$/g, '');
                this.$element.on((a + ' ').split(' ').join('.' + this.type + ' '), !1, d.proxy(this.eventValidation, this));
            },
            generateHash: function () {
                return 'parsley-' + (Math.random() + '').substring(2);
            },
            getHash: function () {
                return this.hash;
            },
            getVal: function () {
                return this.$element.data('value') || this.$element.val();
            },
            eventValidation: function (a) {
                var b = this.getVal();
                if ('keyup' === a.type && !/keyup/i.test(this.options.trigger) && !this.validatedOnce || 'change' === a.type && !/change/i.test(this.options.trigger) && !this.validatedOnce || !this.isRadioOrCheckbox && b.length < this.options.validationMinlength && !this.validatedOnce)
                    return !0;
                this.validate();
            },
            isValid: function () {
                return this.validate(!1);
            },
            hasConstraints: function () {
                for (var a in this.constraints)
                    return !0;
                return !1;
            },
            validate: function (a) {
                var b = this.getVal(), c = null;
                if (!this.hasConstraints())
                    return null;
                if (this.options.listeners.onFieldValidate(this.element, this) || '' === b && !this.isRequired)
                    return this.reset(), null;
                if (!this.needsValidation(b))
                    return this.valid;
                c = this.applyValidators();
                ('undefined' !== typeof a ? a : this.options.showErrors) && this.manageValidationResult();
                return c;
            },
            needsValidation: function (a) {
                if (!this.options.validateIfUnchanged && null !== this.valid && this.val === a && this.validatedOnce)
                    return !1;
                this.val = a;
                return this.validatedOnce = !0;
            },
            applyValidators: function () {
                var a = null, b;
                for (b in this.constraints) {
                    var c = this.Validator.validators[this.constraints[b].name](this.val, this.constraints[b].requirements, this);
                    !1 === c ? (a = !1, this.constraints[b].valid = a, this.options.listeners.onFieldError(this.element, this.constraints, this)) : !0 === c && (this.constraints[b].valid = !0, a = !1 !== a, this.options.listeners.onFieldSuccess(this.element, this.constraints, this));
                }
                return a;
            },
            manageValidationResult: function () {
                var a = null, b;
                for (b in this.constraints)
                    !1 === this.constraints[b].valid ? (this.manageError(this.constraints[b]), a = !1) : !0 === this.constraints[b].valid && (this.removeError(this.constraints[b].name), a = !1 !== a);
                this.valid = a;
                return !0 === this.valid ? (this.removeErrors(), this.errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass), !0) : !1 === this.valid ? (this.errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass), !1) : a;
            },
            ulErrorManagement: function () {
                this.ulError = '#' + this.hash;
                this.ulTemplate = d(this.options.errors.errorsWrapper).attr('id', this.hash).addClass('parsley-error-list');
            },
            removeError: function (a) {
                a = this.ulError + ' .' + a;
                var b = this;
                this.options.animate ? d(a).fadeOut(this.options.animateDuration, function () {
                    d(this).remove();
                    b.ulError && 0 === d(b.ulError).children().length && b.removeErrors();
                }) : d(a).remove();
                this.ulError && 0 === d(this.ulError).children().length && this.removeErrors();
            },
            addError: function (a) {
                for (var b in a) {
                    var c = d(this.options.errors.errorElem).addClass(b);
                    d(this.ulError).append(this.options.animate ? d(c).html(a[b]).hide().fadeIn(this.options.animateDuration) : d(c).html(a[b]));
                }
            },
            removeErrors: function () {
                this.options.animate ? d(this.ulError).fadeOut(this.options.animateDuration, function () {
                    d(this).remove();
                }) : d(this.ulError).remove();
            },
            reset: function () {
                this.valid = null;
                this.removeErrors();
                this.validatedOnce = !1;
                this.errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
                for (var a in this.constraints)
                    this.constraints[a].valid = null;
                return this;
            },
            manageError: function (a) {
                d(this.ulError).length || this.manageErrorContainer();
                if (!('required' === a.name && null !== this.getVal() && 0 < this.getVal().length) && (!this.isRequired || !('required' !== a.name && (null === this.getVal() || 0 === this.getVal().length)))) {
                    var b = a.name, c = !1 !== this.options.errorMessage ? 'custom-error-message' : b, f = {};
                    a = !1 !== this.options.errorMessage ? this.options.errorMessage : 'type' === a.name ? this.Validator.messages[b][a.requirements] : 'undefined' === typeof this.Validator.messages[b] ? this.Validator.messages.defaultMessage : this.Validator.formatMesssage(this.Validator.messages[b], a.requirements);
                    d(this.ulError + ' .' + c).length || (f[c] = a, this.addError(f));
                }
            },
            manageErrorContainer: function () {
                var a = this.options.errorContainer || this.options.errors.container(this.element, this.isRadioOrCheckbox), b = this.options.animate ? this.ulTemplate.show() : this.ulTemplate;
                'undefined' !== typeof a ? d(a).append(b) : !this.isRadioOrCheckbox ? this.$element.after(b) : this.$element.parent().after(b);
            },
            addListener: function (a) {
                for (var b in a)
                    this.options.listeners[b] = a[b];
            },
            destroy: function () {
                this.$element.removeClass('parsley-validated');
                this.reset().$element.off('.' + this.type).removeData(this.type);
            }
        };
        var l = function (a, b, c) {
            this.initMultiple(a, b);
            this.inherit(a, b);
            this.Validator = new h(b);
            this.init(a, c || 'ParsleyFieldMultiple');
        };
        l.prototype = {
            constructor: l,
            initMultiple: function (a, b) {
                this.element = a;
                this.$element = d(a);
                this.group = b.group || !1;
                this.hash = this.getName();
                this.siblings = this.group ? '[data-group="' + this.group + '"]' : 'input[name="' + this.$element.attr('name') + '"]';
                this.isRadioOrCheckbox = !0;
                this.isRadio = this.$element.is('input[type=radio]');
                this.isCheckbox = this.$element.is('input[type=checkbox]');
                this.errorClassHandler = b.errors.classHandler(a, this.isRadioOrCheckbox) || this.$element.parent();
            },
            inherit: function (a, b) {
                var c = new j(a, b, 'ParsleyFieldMultiple'), d;
                for (d in c)
                    'undefined' === typeof this[d] && (this[d] = c[d]);
            },
            getName: function () {
                if (this.group)
                    return 'parsley-' + this.group;
                if ('undefined' === typeof this.$element.attr('name'))
                    throw 'A radio / checkbox input must have a data-group attribute or a name to be Parsley validated !';
                return 'parsley-' + this.$element.attr('name').replace(/(:|\.|\[|\])/g, '');
            },
            getVal: function () {
                if (this.isRadio)
                    return d(this.siblings + ':checked').val() || '';
                if (this.isCheckbox) {
                    var a = [];
                    d(this.siblings + ':checked').each(function () {
                        a.push(d(this).val());
                    });
                    return a;
                }
            },
            bindValidationEvents: function () {
                this.valid = null;
                this.$element.addClass('parsley-validated');
                this.$element.off('.' + this.type);
                var a = this, b = (!this.options.trigger ? '' : this.options.trigger) + (/change/i.test(this.options.trigger) ? '' : ' change'), b = b.replace(/^\s+/g, '').replace(/\s+$/g, '');
                d(this.siblings).each(function () {
                    d(this).on(b.split(' ').join('.' + a.type + ' '), !1, d.proxy(a.eventValidation, a));
                });
            }
        };
        var k = function (a, b, c) {
            this.init(a, b, c || 'parsleyForm');
        };
        k.prototype = {
            constructor: k,
            init: function (a, b, c) {
                this.type = c;
                this.items = [];
                this.$element = d(a);
                this.options = b;
                var f = this;
                this.$element.find(b.inputs).each(function () {
                    f.addItem(this);
                });
                this.$element.on('submit.' + this.type, !1, d.proxy(this.validate, this));
            },
            addListener: function (a) {
                for (var b in a)
                    if (/Field/.test(b))
                        for (var c = 0; c < this.items.length; c++)
                            this.items[c].addListener(a);
                    else
                        this.options.listeners[b] = a[b];
            },
            addItem: function (a) {
                if (d(a).is(this.options.excluded))
                    return !1;
                a = d(a).parsley(this.options);
                a.setParent(this);
                this.items.push(a);
            },
            removeItem: function (a) {
                a = d(a).parsley();
                for (var b = 0; b < this.items.length; b++)
                    if (this.items[b].hash === a.hash)
                        return this.items[b].destroy(), this.items.splice(b, 1), !0;
                return !1;
            },
            validate: function (a) {
                var b = !0;
                this.focusedField = !1;
                for (var c = 0; c < this.items.length; c++)
                    if ('undefined' !== typeof this.items[c] && !1 === this.items[c].validate() && (b = !1, !this.focusedField && 'first' === this.options.focus || 'last' === this.options.focus))
                        this.focusedField = this.items[c].$element;
                this.focusedField && !b && this.focusedField.focus();
                this.options.listeners.onFormSubmit(b, a, this);
                return b;
            },
            isValid: function () {
                for (var a = 0; a < this.items.length; a++)
                    if (!1 === this.items[a].isValid())
                        return !1;
                return !0;
            },
            removeErrors: function () {
                for (var a = 0; a < this.items.length; a++)
                    this.items[a].parsley('reset');
            },
            destroy: function () {
                for (var a = 0; a < this.items.length; a++)
                    this.items[a].destroy();
                this.$element.off('.' + this.type).removeData(this.type);
            },
            reset: function () {
                for (var a = 0; a < this.items.length; a++)
                    this.items[a].reset();
            }
        };
        d.fn.parsley = function (a, b) {
            function c(c, g) {
                var e = d(c).data(g);
                if (!e) {
                    switch (g) {
                    case 'parsleyForm':
                        e = new k(c, f, 'parsleyForm');
                        break;
                    case 'parsleyField':
                        e = new j(c, f, 'parsleyField');
                        break;
                    case 'parsleyFieldMultiple':
                        e = new l(c, f, 'parsleyFieldMultiple');
                        break;
                    default:
                        return;
                    }
                    d(c).data(g, e);
                }
                return 'string' === typeof a && 'function' === typeof e[a] ? (e = e[a](b), 'undefined' !== typeof e ? e : d(c)) : e;
            }
            var f = d.extend(!0, {}, d.fn.parsley.defaults, 'undefined' !== typeof window.ParsleyConfig ? window.ParsleyConfig : {}, a, this.data()), g = null;
            d(this).is('form') ? g = c(d(this), 'parsleyForm') : d(this).is(f.inputs) && !d(this).is(f.excluded) && (g = c(d(this), !d(this).is('input[type=radio], input[type=checkbox]') ? 'parsleyField' : 'parsleyFieldMultiple'));
            return 'function' === typeof b ? b() : g;
        };
        d.fn.parsley.Constructor = k;
        d.fn.parsley.defaults = {
            inputs: 'input, textarea, select',
            excluded: 'input[type=hidden], :disabled',
            trigger: !1,
            animate: !0,
            animateDuration: 300,
            focus: 'first',
            validationMinlength: 3,
            successClass: 'parsley-success',
            errorClass: 'parsley-error',
            errorMessage: !1,
            validators: {},
            showErrors: !0,
            messages: {},
            validateIfUnchanged: !1,
            errors: {
                classHandler: function () {
                },
                container: function () {
                },
                errorsWrapper: '<ul></ul>',
                errorElem: '<li></li>'
            },
            listeners: {
                onFieldValidate: function () {
                    return !1;
                },
                onFormSubmit: function () {
                },
                onFieldError: function () {
                },
                onFieldSuccess: function () {
                }
            }
        };
        d(window).on('load', function () {
            d('[data-validate="parsley"]').each(function () {
                d(this).parsley();
            });
        });
    }(window.jQuery || window.Zepto);
}
define('framework/jquery.parsley.min', [], function () {
    return;
});
define('framework/formcontainer', [
    'jquery',
    'framework/jquery.parsley.min'
], function ($) {
    return function (el) {
        var $el = $(el);
        if ($el.data('formcontainer-installed') === true)
            return;
        $el.data('formcontainer-installed', true);
        var action = $el.attr('data-action');
        var method = $el.attr('data-method');
        var form = $('#aspnetForm');
        var isFakeFormElement = !$el.is('form');
        if (isFakeFormElement) {
            if ($el.parents('#aspnetForm').size() == 0) {
                $el.wrap('<form></form>');
                form = $el.parent();
                form.attr('action', action);
                form.attr('method', method);
            }
            $el.on('click', ':submit', function (e) {
                if (!e.isDefaultPrevented())
                    submitForm(form, $el);
                return false;
            });
            function keypressInBox(e) {
                var code = e.keyCode ? e.keyCode : e.which;
                if (code === 13) {
                    e.preventDefault();
                    submitForm(form, $el);
                }
            }
            $(':text,:password', $el).bind('keypress', {}, keypressInBox);
        } else {
            form = $el;
            form.submit(function () {
                return submitForm(form, $el);
            });
        }
        $el.bind('validate', function () {
            validate(form, $el);
        });
        function validate(thisForm, container) {
            if ($(thisForm).attr('id') === 'aspnetForm') {
                $(':input', container).each(function () {
                    $(this).data('autoform', '1');
                });
                $(':input').each(function () {
                    if (!$(this).data('autoform')) {
                        $(this).addClass('autoform-remove-name');
                        if ($(this).hasClass('required')) {
                            $(this).addClass('autoform-remove-required');
                            $(this).removeClass('required');
                        }
                    }
                });
            }
            thisForm.parsley({
                messages: {
                    defaultMessage: '<b>ERROR</b> This value seems to be invalid.',
                    type: {
                        email: '<b>ERROR</b> This value should be a valid email.',
                        url: '<b>ERROR</b> This value should be a valid url.',
                        urlstrict: '<b>ERROR</b> This value should be a valid url.',
                        number: '<b>ERROR</b> This value should be a valid number.',
                        digits: '<b>ERROR</b> This value should be digits.',
                        dateIso: '<b>ERROR</b> This value should be a valid date (YYYY-MM-DD).',
                        alphanum: '<b>ERROR</b> This value should be alphanumeric.',
                        phone: '<b>ERROR</b> This value should be a valid phone number.'
                    },
                    notnull: '<b>ERROR</b> This value should not be null.',
                    notblank: '<b>ERROR</b> This value should not be blank.',
                    required: '<b>ERROR</b> This value is required.',
                    regexp: '<b>ERROR</b> This value seems to be invalid.',
                    min: '<b>ERROR</b> This value should be greater than or equal to %s.',
                    max: '<b>ERROR</b> This value should be lower than or equal to %s.',
                    range: '<b>ERROR</b> This value should be between %s and %s.',
                    minlength: '<b>ERROR</b> This value is too short. It should have %s characters or more.',
                    maxlength: '<b>ERROR</b> This value is too long. It should have %s characters or less.',
                    rangelength: '<b>ERROR</b> This value length is invalid. It should be between %s and %s characters long.',
                    mincheck: '<b>ERROR</b> You must select at least %s choices.',
                    maxcheck: '<b>ERROR</b> You must select %s choices or less.',
                    rangecheck: '<b>ERROR</b> You must select between %s and %s choices.',
                    equalto: '<b>ERROR</b> This value should be the same.'
                },
                animate: false,
                errorClass: 'field-error',
                errors: {
                    errorElem: '<div><b>Error:</b> </div>',
                    errorsWrapper: '<div></div>',
                    classHandler: function (elem, isRadioOrCheckbox) {
                        var grp = elem.parents('.field-group-vertical').eq(0);
                        if (grp)
                            return grp;
                        if (!elem.attr('class') || elem.attr('class').indexOf('field') === -1) {
                            return $(elem).parent().parent();
                        } else {
                            return $(elem).parent();
                        }
                    },
                    container: function (elem, isRadioOrCheckbox) {
                        var $container;
                        var grp = elem.parents('.field-group-vertical').eq(0);
                        if (grp.length) {
                            $container = $('<div class=\'error-placeholder\'></div>').insertAfter(grp.children().last());
                            return $container;
                        }
                        if (!elem.attr('class') || elem.attr('class').indexOf('field') === -1) {
                            $container = $('<div class=\'error-placeholder\'></div>').insertAfter(elem.parent());
                            return $container;
                        }
                        $container = elem.parent().find('.error-placeholder');
                        if ($container.length === 0) {
                            $container = $('<div class=\'error-placeholder\'></div>').insertAfter(elem);
                        }
                        return $container;
                    }
                }
            });
            thisForm.parsley('validate');
            if (thisForm.parsley('isValid')) {
                container.removeClass('invalid');
            } else {
                container.addClass('invalid');
            }
        }
        function submitForm(thisForm, container) {
            var e = jQuery.Event('submit');
            $el.trigger(e);
            if (e.isDefaultPrevented()) {
                return false;
            }
            validate(thisForm, container);
            if (thisForm.parsley('isValid')) {
                $('.autoform-remove-name').each(function () {
                    $(this).attr('name', null);
                });
                var action = container.attr('data-action');
                var method = container.attr('data-method');
                thisForm.attr('action', action);
                if (!method) {
                    method = 'GET';
                }
                thisForm.attr('method', method);
                thisForm.attr('action', action);
                if (thisForm.attr('method').toLowerCase() == 'get') {
                    $('input[type=password]').each(function () {
                        $(this).val('');
                    });
                }
                $(thisForm).submit();
                return true;
            } else {
                $('.autoform-remove-required').each(function () {
                    $(this).addClass('required');
                });
                return false;
            }
        }
    };
});
define('framework/resize', [
    'jquery',
    'framework/exports'
], function ($, FW) {
    return function () {
        if ($(window).data('resize-installed') == true)
            return;
        $(window).data('resize-installed', true);
        $(window).bind('resize', FW.debounce(function (e) {
            $(document).trigger('framework.resize');
        }, 250, false));
    };
});
;
window.Modernizr = function (a, b, c) {
    function x(a) {
        j.cssText = a;
    }
    function y(a, b) {
        return x(prefixes.join(a + ';') + (b || ''));
    }
    function z(a, b) {
        return typeof a === b;
    }
    function A(a, b) {
        return !!~('' + a).indexOf(b);
    }
    function B(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!A(e, '-') && j[e] !== c)
                return b == 'pfx' ? e : !0;
        }
        return !1;
    }
    function C(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c)
                return d === !1 ? a[e] : z(f, 'function') ? f.bind(d || b) : f;
        }
        return !1;
    }
    function D(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + ' ' + n.join(d + ' ') + d).split(' ');
        return z(b, 'string') || z(b, 'undefined') ? B(e, b) : (e = (a + ' ' + o.join(d + ' ') + d).split(' '), C(e, b, c));
    }
    var d = '2.8.3', e = {}, f = !0, g = b.documentElement, h = 'modernizr', i = b.createElement(h), j = i.style, k, l = {}.toString, m = 'Webkit Moz O ms', n = m.split(' '), o = m.toLowerCase().split(' '), p = {}, q = {}, r = {}, s = [], t = s.slice, u, v = {}.hasOwnProperty, w;
    !z(v, 'undefined') && !z(v.call, 'undefined') ? w = function (a, b) {
        return v.call(a, b);
    } : w = function (a, b) {
        return b in a && z(a.constructor.prototype[b], 'undefined');
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != 'function')
            throw new TypeError();
        var d = t.call(arguments, 1), e = function () {
                if (this instanceof e) {
                    var a = function () {
                    };
                    a.prototype = c.prototype;
                    var f = new a(), g = c.apply(f, d.concat(t.call(arguments)));
                    return Object(g) === g ? g : f;
                }
                return c.apply(b, d.concat(t.call(arguments)));
            };
        return e;
    }), p.cssanimations = function () {
        return D('animationName');
    }, p.csstransitions = function () {
        return D('transition');
    };
    for (var E in p)
        w(p, E) && (u = E.toLowerCase(), e[u] = p[E](), s.push((e[u] ? '' : 'no-') + u));
    return e.addTest = function (a, b) {
        if (typeof a == 'object')
            for (var d in a)
                w(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c)
                return e;
            b = typeof b == 'function' ? b() : b, typeof f != 'undefined' && f && (g.className += ' ua-' + (b ? '' : 'no-') + a), e[a] = b;
        }
        return e;
    }, x(''), i = k = null, e._version = d, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) {
        return B([a]);
    }, e.testAllProps = D, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + (f ? ' ua-js ua-' + s.join(' ua-') : ''), e;
}(this, this.document);
define('framework/modernizr.custom', [], function () {
    return;
});
define('framework/useragent', [
    'jquery',
    'framework/modernizr.custom'
], function ($, m) {
    function is_touch_device() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    function is_retina() {
        if (window.devicePixelRatio >= 2) {
            return true;
        } else {
            return false;
        }
    }
    function checkBreakpoints() {
        var $html = $('html');
        var currClass = '';
        if ($html.hasClass('ua-desktop')) {
            currClass = 'ua-desktop';
        } else if ($html.hasClass('ua-tablet')) {
            currClass = 'ua-tablet';
        } else if ($html.hasClass('ua-mobile')) {
            currClass = 'ua-mobile';
        }
        var finalClass = 'ua-desktop';
        var w = $(window).width();
        if (w < 650) {
            finalClass = 'ua-mobile';
        } else if (w < 920) {
            finalClass = 'ua-tablet';
        }
        if (currClass == finalClass) {
            return;
        }
        $html.removeClass('ua-desktop ua-tablet ua-mobile');
        if (finalClass == 'ua-desktop') {
            $html.removeClass('ua-tablet ua-mobile');
        } else if (finalClass == 'ua-tablet') {
            $html.removeClass('ua-desktop ua-mobile');
        } else if (finalClass == 'ua-mobile') {
            $html.removeClass('ua-desktop ua-tablet');
        }
        if (!$html.hasClass(finalClass)) {
            $html.addClass(finalClass);
            if (currClass) {
                $(document).trigger('framework.breakpoint');
            }
        }
    }
    return function () {
        var $html = $('html');
        $html.addClass('ua-js');
        if ($html.data('useragent-installed') == true)
            return;
        $html.data('useragent-installed', true);
        if (is_touch_device())
            $html.addClass('ua-touch');
        else
            $html.addClass('ua-no-touch');
        if (is_retina())
            $html.addClass('ua-retina');
        else
            $html.addClass('ua-not-retina');
        $(document).bind('framework.resize', checkBreakpoints);
        checkBreakpoints();
    };
});
define('framework/hover', ['jquery'], function ($) {
    return function (el) {
        var $el = $(el);
        if ($el.data('hover-installed') == true)
            return;
        $el.data('hover-installed', true);
        $el.on({
            mouseenter: function () {
                console.info('enter');
                $el.find('.hover-sync').addClass('hover').filter('a').addClass('u');
            },
            mouseleave: function () {
                console.info('exit');
                $el.find('.hover-sync').removeClass('hover').filter('a').removeClass('u');
            }
        }, '.hover-sync');
    };
});
define('framework/popover', ['jquery'], function ($) {
    function showPopover($container, $target, $content) {
        $container.addClass('popover-active');
        $content.fadeIn('fast');
    }
    function hidePopover($container) {
        $container.removeClass('popover-active');
        $('.popover-content', $container).fadeOut('fast');
    }
    return function (el) {
        var $el = $(el);
        if ($el.data('popover-installed') == true)
            return;
        $el.data('popover-installed', true);
        var config = {
            over: function () {
                var $content = $(this).next('.popover-content');
                if ($content.size() == 0) {
                    $content = $(this).find('.popover-content');
                }
                hidePopover($el);
                showPopover($el, $(this), $content);
            },
            out: function () {
                hidePopover($el);
            },
            interval: 20,
            sensitivity: 10
        };
        $('.popover-toggle', $el).hoverIntent(config);
    };
});
define('framework/lazy', ['jquery'], function ($) {
    (function ($, window, document, undefined) {
        var $window = $(window);
        $.fn.lazyload = function (options) {
            var elements = this;
            var $container;
            var settings = {
                threshold: 0,
                failure_limit: 0,
                event: 'scroll',
                effect: 'show',
                container: document.getElementById('s4-workspace') || window,
                data_attribute: 'original',
                skip_invisible: true,
                appear: null,
                load: null
            };
            function update() {
                var counter = 0;
                elements.each(function () {
                    var $this = $(this);
                    if (settings.skip_invisible && !$this.is(':visible')) {
                        return;
                    }
                    if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {
                    } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                        $this.trigger('appear');
                        counter = 0;
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });
            }
            if (options) {
                if (undefined !== options.failurelimit) {
                    options.failure_limit = options.failurelimit;
                    delete options.failurelimit;
                }
                if (undefined !== options.effectspeed) {
                    options.effect_speed = options.effectspeed;
                    delete options.effectspeed;
                }
                $.extend(settings, options);
            }
            $container = settings.container === undefined || settings.container === window ? $window : $(settings.container);
            if (0 === settings.event.indexOf('scroll')) {
                $container.bind(settings.event, function (event) {
                    return update();
                });
            }
            this.each(function () {
                var self = this;
                var $self = $(self);
                self.loaded = false;
                $self.one('appear', function () {
                    if (!this.loaded) {
                        if (settings.appear) {
                            var elements_left = elements.length;
                            settings.appear.call(self, elements_left, settings);
                        }
                        $('<img />').bind('load', function () {
                            $self.hide().attr('src', $self.data(settings.data_attribute))[settings.effect](settings.effect_speed);
                            self.loaded = true;
                            var temp = $.grep(elements, function (element) {
                                return !element.loaded;
                            });
                            elements = $(temp);
                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        }).attr('src', $self.data(settings.data_attribute));
                    }
                });
                if (0 !== settings.event.indexOf('scroll')) {
                    $self.bind(settings.event, function (event) {
                        if (!self.loaded) {
                            $self.trigger('appear');
                        }
                    });
                }
            });
            $window.bind('resize', function (event) {
                update();
            });
            $(document).bind('framework.domupdate', function (event) {
                update();
            });
            if (/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)) {
                $window.bind('pageshow', function (event) {
                    if (event.originalEvent.persisted) {
                        elements.each(function () {
                            $(this).trigger('appear');
                        });
                    }
                });
            }
            $(window).load(function () {
                update();
            });
            return this;
        };
        $.belowthefold = function (element, settings) {
            var fold;
            if (settings.container === undefined || settings.container === window) {
                fold = $window.height() + $window.scrollTop();
            } else {
                fold = $(settings.container).offset().top + $(settings.container).height();
            }
            return fold <= $(element).offset().top - settings.threshold;
        };
        $.rightoffold = function (element, settings) {
            var fold;
            if (settings.container === undefined || settings.container === window) {
                fold = $window.width() + $window.scrollLeft();
            } else {
                fold = $(settings.container).offset().left + $(settings.container).width();
            }
            return fold <= $(element).offset().left - settings.threshold;
        };
        $.abovethetop = function (element, settings) {
            var fold;
            if (settings.container === undefined || settings.container === window) {
                fold = $window.scrollTop();
            } else {
                fold = $(settings.container).offset().top;
            }
            return fold >= $(element).offset().top + settings.threshold + $(element).height();
        };
        $.leftofbegin = function (element, settings) {
            var fold;
            if (settings.container === undefined || settings.container === window) {
                fold = $window.scrollLeft();
            } else {
                fold = $(settings.container).offset().left;
            }
            return fold >= $(element).offset().left + settings.threshold + $(element).width();
        };
        $.inviewport = function (element, settings) {
            return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
        };
        $.extend($.expr[':'], {
            'below-the-fold': function (a) {
                return $.belowthefold(a, { threshold: 0 });
            },
            'above-the-top': function (a) {
                return !$.belowthefold(a, { threshold: 0 });
            },
            'right-of-screen': function (a) {
                return $.rightoffold(a, { threshold: 0 });
            },
            'left-of-screen': function (a) {
                return !$.rightoffold(a, { threshold: 0 });
            },
            'in-viewport': function (a) {
                return $.inviewport(a, { threshold: 0 });
            },
            'above-the-fold': function (a) {
                return !$.belowthefold(a, { threshold: 0 });
            },
            'right-of-fold': function (a) {
                return $.rightoffold(a, { threshold: 0 });
            },
            'left-of-fold': function (a) {
                return !$.rightoffold(a, { threshold: 0 });
            }
        });
    }(jQuery, window, document));
    return function (el) {
        var $el = $(el);
        if ($el.data('lazy-installed') == true)
            return;
        $el.data('lazy-installed', true);
        if (!$el.data('src'))
            return;
        if ($el.hasClass('lazy-fadein')) {
            $el.lazyload({
                data_attribute: 'src',
                effect: 'fadeIn',
                effectspeed: '250'
            });
        } else if ($el.hasClass('defer')) {
            $(window).load(function () {
                $el.attr('src', $el.data('src'));
            });
        } else if ($el.hasClass('ondemand')) {
            $el.bind('appear', function () {
                var src = $(this).data('src');
                this.src = src;
            });
        } else {
            $el.lazyload({ data_attribute: 'src' });
        }
    };
});
define('framework/iframe', ['jquery'], function ($) {
    return function (el) {
        var $el = $(el);
        if ($(el).data('iframe-installed') == true)
            return;
        $(el).data('iframe-installed', true);
        var src = $(el).find('a').attr('href');
        $(el).find('a').remove();
        var iframe = document.createElement('iframe');
        iframe.src = src;
        var style = $(el).attr('style');
        console.info(style);
        $(iframe).attr('style', style);
        $(iframe).attr('scrolling', 'no');
        $(iframe).css('width', '100%');
        $(iframe).attr('frameborder', '0');
        $el.append(iframe);
    };
});
define('framework/randomize', ['jquery'], function ($) {
    function shuffle(items) {
        var c = [];
        return items.each(function () {
            c.push($(this).clone(true));
        }).each(function (a, b) {
            $(b).replaceWith(c[a = Math.floor(Math.random() * c.length)]);
            c.splice(a, 1);
        });
    }
    return function (el) {
        var $el = $(el);
        var num = 4;
        if ($(el).data('random-installed') == true)
            return;
        $(el).data('random-installed', true);
        if (/random-(\d+)/.test($el.attr('class'))) {
            num = parseInt(RegExp.$1);
        }
        var $items = $el.find('.random-item');
        shuffle($items);
        for (var i = 0; i < num; i++) {
            $el.find('.random-item').eq(i).show();
        }
        $el.find('.random-item:hidden').remove();
    };
});
define('framework/scroll-lock', ['jquery'], function ($) {
    var ScrollSneak = function (prefix, wait) {
        if (typeof wait == 'undefined' && prefix === true)
            prefix = null, wait = true;
        prefix = (typeof prefix == 'string' ? prefix : window.location.host).split('_').join('');
        var pre_name;
        this.scroll = function () {
            if (window.name.search('^' + prefix + '_(\\d+)_(\\d+)_') == 0) {
                var name = window.name.split('_');
                if (document.getElementById('s4-workspace')) {
                    window.setTimeout(function () {
                        $('#s4-workspace').animate({ scrollTop: name[2] }, 1);
                    }, 1000);
                } else {
                    $(document).ready(function () {
                        window.scroll(name[1], name[2]);
                    });
                }
                window.name = name.slice(3).join('_');
            }
        };
        if (!wait)
            this.scroll();
        this.sneak = function () {
            if (typeof pre_name == 'undefined')
                pre_name = window.name;
            var top = 0, left = 0;
            if (typeof window.pageYOffset == 'number') {
                top = window.pageYOffset, left = window.pageXOffset;
            } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
                top = document.body.scrollTop, left = document.body.scrollLeft;
            } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
                top = document.documentElement.scrollTop, left = document.documentElement.scrollLeft;
            }
            if (document.getElementById('s4-workspace')) {
                top = $('#s4-workspace').scrollTop();
            }
            if (top || left)
                window.name = prefix + '_' + left + '_' + top + '_' + pre_name;
            return true;
        };
    };
    window.sneaky = new ScrollSneak();
    return function (el) {
        var $el = $(el);
        if ($el.data('noscroll-installed') === true)
            return;
        $el.data('noscroll-installed', true);
        $el.click(window.sneaky.sneak);
    };
});
define('framework/in-viewport', ['jquery'], function ($) {
    function update($el) {
        var settings = {};
        if ($el.is(':in-viewport')) {
            $el.addClass('in-viewport').trigger('framework.in-viewport');
        } else {
            $el.removeClass('in-viewport');
        }
    }
    return function (el) {
        var $el = $(el);
        if ($el.data('in-viewport-installed') == true)
            return;
        $el.data('in-viewport-installed', true);
        var $container = $(document.getElementById('s4-workspace') || window);
        $container.bind('scroll', function (event) {
            return update($el);
        });
    };
});
define('framework/styledfields', ['jquery'], function ($) {
    function styledCheckboxButtons($el, $zone) {
        if ($el.hasClass('field-checkbox')) {
            fixCheckbox = function ($el) {
                if ($el.find('input:checked').size() > 0) {
                    $el.addClass('field-checkbox-checked');
                } else {
                    $el.removeClass('field-checkbox-checked');
                }
                window.setTimeout(function () {
                    if ($el.find('input:focus').size() > 0) {
                        $el.addClass('field-checkbox-focus');
                    } else {
                        $el.removeClass('field-checkbox-focus');
                    }
                }, 1);
            };
            $el.on('change focus blur', 'input', function () {
                fixCheckbox($el);
            });
            fixCheckbox($el);
        }
    }
    function styledSelect($el, $zone) {
        if ($el.hasClass('field-select')) {
            $el.on('focus', 'select', function () {
                $el.addClass('field-select-focus');
            });
            $el.on('blur', 'select', function () {
                $el.removeClass('field-select-focus');
            });
        }
        function installSelectBoxIt(s) {
            s.selectBoxIt({ autoWidth: false });
            s.bind('touchstart', function () {
                $('.back-to-top').remove();
            });
            $(document).bind('framework.domupdate', function () {
                if (s && s.data && s.data('selectBox-selectBoxIt')) {
                    s.data('selectBox-selectBoxIt').refresh();
                }
            });
        }
        if ($el.hasClass('field-select2')) {
            var s = $el.find('select');
            if (s.is(':visible')) {
                installSelectBoxIt(s);
            } else {
                (function (s) {
                    s.interval = window.setInterval(function () {
                        if (s.is(':visible')) {
                            installSelectBoxIt(s);
                            window.clearInterval(s.interval);
                        }
                    }, 500);
                }(s));
            }
        }
    }
    function styledRadioButtons($el, $zone) {
        if ($el.hasClass('field-radio')) {
            fixRadio = function ($el) {
                if ($el.find('input:checked').size() > 0) {
                    $el.addClass('field-radio-checked');
                } else {
                    $el.removeClass('field-radio-checked');
                }
                window.setTimeout(function () {
                    if ($el.find('input:focus').size() > 0) {
                        $el.addClass('field-radio-focus');
                    } else {
                        $el.removeClass('field-radio-focus');
                    }
                }, 1);
            };
            fixAllRadio = function () {
                $('.field-radio').each(function () {
                    fixRadio($(this));
                });
            };
            $el.on('change focus blur', 'input', function () {
                fixAllRadio($el, this);
            });
            fixRadio($el);
        }
    }
    return function (zone, el) {
        var $el = $(el);
        var $zone = $(zone);
        if ($el.data('styledfields-installed') == true)
            return;
        $el.data('styledfields-installed', true);
        styledRadioButtons($el, $zone);
        styledCheckboxButtons($el, $zone);
        styledSelect($el, $zone);
    };
});
define('framework/imgcontroller', ['jquery'], function ($) {
    return function (el) {
        window.imgZoomresizeDialog = function (img) {
            if (img.naturalWidth)
                $('#framework-modal .container').css('max-width', img.naturalWidth);
        };
        $(el).off('.img-zoom').on('click.img-zoom', '.img-zoom', function (e) {
            console.info('HERE');
            var dlg = new framework.Dialog({
                body: $('<img class="fluid" onload="window.imgZoomresizeDialog(this)"/>').attr('src', this.href),
                backgroundColor: 'black',
                textColor: 'white',
                width: '800px'
            });
            dlg.open();
            e.preventDefault();
        });
        function isImageOk(img) {
            if (!img.complete) {
                return false;
            }
            if (typeof img.naturalWidth != 'undefined' && img.naturalWidth == 0) {
                return false;
            }
            return true;
        }
        $(window).load(function () {
            $('img', el).each(function () {
                var $el = $(this);
                if ($el.data('imgcontroller-installed') == true)
                    return;
                $el.data('imgcontroller-installed', true);
                if (!isImageOk(this)) {
                    $(this).addClass('broken-image');
                    this.style.visibility = 'hidden';
                }
            });
        });
    };
});
define('framework/timeago', ['jquery'], function ($) {
    return function (el) {
        var timestamp = $(el).data('timestamp');
        function parse(iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d+/, '');
            s = s.replace(/-/, '/').replace(/-/, '/');
            s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2');
            return new Date(s);
        }
        function distance(date) {
            return new Date().getTime() - date.getTime();
        }
        function inWords(distanceMillis) {
            var $l = {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: '',
                suffixFromNow: 'from now',
                seconds: '1 minute ago',
                minute: '1 minute ago',
                minutes: '%d minutes ago',
                hour: '1 hour ago',
                hours: '%d hours ago',
                day: 'yesterday',
                days: '%d days ago',
                month: '1 month ago',
                months: '%d months ago',
                year: '1 year ago',
                years: '%d years ago',
                wordSeparator: ' ',
                numbers: []
            };
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            var seconds = Math.abs(distanceMillis) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;
            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = $l.numbers && $l.numbers[number] || number;
                return string.replace(/%d/i, value);
            }
            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) || seconds < 90 && substitute($l.minute, 1) || minutes < 45 && substitute($l.minutes, Math.round(minutes)) || minutes < 90 && substitute($l.hour, 1) || hours < 24 && substitute($l.hours, Math.round(hours)) || hours < 42 && substitute($l.day, 1) || days < 30 && substitute($l.days, Math.round(days)) || days < 45 && substitute($l.month, 1) || days < 365 && substitute($l.months, Math.round(days / 30)) || years < 1.5 && substitute($l.year, 1) || substitute($l.years, Math.round(years));
            var separator = $l.wordSeparator === undefined ? ' ' : $l.wordSeparator;
            return $.trim([
                prefix,
                words,
                suffix
            ].join(separator));
        }
        $(el).html(inWords(distance(parse(timestamp))));
    };
});
jQuery.fn.isChildOverflowing = function (child) {
    var p = jQuery(this).get(0);
    var el = jQuery(child).get(0);
    return el.offsetTop < p.offsetTop || el.offsetLeft < p.offsetLeft || (el.offsetTop + el.offsetHeight > p.offsetTop + p.offsetHeight || el.offsetLeft + el.offsetWidth > p.offsetLeft + p.offsetWidth);
};
define('framework/overflow', ['jquery'], function ($) {
    function fadeCheck(el) {
        var $element = $(el);
        var $overflow = $(el).parent();
        var $wrap = $overflow.parent();
        if ($element.outerWidth(true) > $overflow.width()) {
            $wrap.addClass('fade-container-active');
        } else {
            $wrap.removeClass('fade-container-active');
        }
    }
    function liFadeCheck(el) {
        var $element = $(el);
        var $overflow = $(el).parent().parent();
        var $lastli = $element.find('li:last-child');
        if ($lastli != undefined) {
            var state = $element.isChildOverflowing($lastli);
            if (state) {
                $overflow.addClass('fade-container-active');
            } else {
                $overflow.removeClass('fade-container-active');
            }
        }
    }
    return function (el) {
        if ($(el).data('overflow-installed') == true)
            return;
        $(el).data('overflow-installed', true);
        $(el).wrap('<div class="fade-container"><div class="overflow-x"></div></div>');
        $(document).bind('framework.resize', function () {
            fadeCheck(el);
            if ($(el).hasClass('liFadeChecker') == true) {
                liFadeCheck(el);
            }
        });
        fadeCheck(el);
        if ($(el).hasClass('liFadeChecker') == true) {
            liFadeCheck(el);
        }
    };
});
define('framework/slider', ['jquery'], function ($) {
    return function (el) {
        var $el = $(el);
        if ($(el).data('slider-installed') == true)
            return;
        $(el).data('slider-installed', true);
        $('.slider-open', $el).click(function (e) {
            if ($(this).hasClass('inherit-bg')) {
                var c = $(this).removeClass('inherit-bg').parents('.slider-container');
                c.addClass('slider-closing').removeClass('slider-open');
                window.setTimeout(function () {
                    c.removeClass('slider-closing');
                }, 400);
            } else {
                $('.slider-open', $el).removeClass('inherit-bg');
                $(this).addClass('inherit-bg');
                var target = $(this).data('target');
                $('.slider-targets', $el).hide();
                $(document.getElementById(target)).show();
                $(this).parents('.slider-container').addClass('slider-open');
            }
            e.preventDefault();
        });
        $('.slider-close', $el).click(function (e) {
            $('.slider-open', $el).removeClass('inherit-bg');
            var c = $(this).parents('.slider-container').addClass('slider-closing');
            c.addClass('slider-closing').removeClass('slider-open');
            window.setTimeout(function () {
                c.removeClass('slider-closing');
            }, 400);
            e.preventDefault();
        });
        $('.slider-backdrop', $el).click(function (e) {
            $(this).parents('.slider-container').removeClass('slider-open');
            e.preventDefault();
        });
    };
});
define('framework/autorender', ['jquery'], function ($) {
    function flyoutHTML() {
        var h = '<button class="flyout-panel-button slider-backdrop-above slider-close btn-glass white"><i class="icon24-close"></i></button>';
        h += '<div class="slider-targets" id="flyout-navigation">';
        var siteheader = $('.site-header h1').eq(0).text();
        var siteHeaderLink = $('.site-header h1 a').eq(0).attr('href');
        h += '   <h2 class="gamma-uc"><a class="white" href="' + siteHeaderLink + '">' + siteheader + '</a></h2>';
        var links = [];
        $('.navbar a').each(function () {
            links.push(this);
        });
        if (links.length) {
            h += '   <div class="hr"></div>';
            h += '<ul class="epsilon-uc unbulleted">';
            $(links).each(function (i, a) {
                h += '<li>' + a.outerHTML + '</li>';
            });
            h += '</ul>';
        }
        var toolbar = [];
        $('.toolbar a').each(function () {
            toolbar.push(this);
        });
        if (toolbar.length) {
            h += '<div class="hr"></div>';
            h += '<ul class="kappa-uc unbulleted">';
            $(toolbar).each(function (i, a) {
                h += '<li>' + a.outerHTML + '</li>';
            });
            h += '</ul>';
        }
        h += '<div class="hr"></div>';
        h += '<ul class="kappa-uc unbulleted">';
        h += '<li><a href="http://www.hbs.edu/maps/">Map / Directions</a></li>';
        h += '<li><a href="http://www.hbs.edu/siteindex/">Site Map</a></li>';
        h += '</ul>';
        h += '</div>';
        h += '<div class="search-container slider-targets hidden" id="flyout-search">';
        h += '<h2 class="gamma-uc white">Search</h2>';
        h += '<div class="hr"></div>';
        h += '<table class="search-box">';
        h += '   <tr>';
        h += '      <td><input type="text" class="universal-site-search-query" name="qt" value=""></td>';
        h += '      <td><input type="submit" class="universal-site-search-button" value="Go"></td>';
        h += '  </tr>';
        h += '</table>';
        h += '<div class="hr"></div>';
        h += '</div>';
        return h;
    }
    return function (el) {
        var $el = $(el);
        if ($(el).data('autorender-installed') == true)
            return;
        $(el).data('autorender-installed', true);
        if ($el.hasClass('responsive-filters-inject')) {
            var stickyFilterHTML = '<div class="smoke-bg filter-sticky" style="padding-top:16px; padding-bottom:16px; visibility:hidden;">' + '<div class="container  tablet-container mobile-container">' + '<a href="#filter-top" class="black epsilon nosmooth">Filter Results: <span class="hbsred">' + $('.responsive-filters-total').first().text() + '</span>' + '<i class="icon24-filter-open xtoggle-hide"></i>' + '</a>' + '</div>' + '</div>';
            $('.responsive-filters-inject').prepend(stickyFilterHTML);
        }
        if ($el.hasClass('responsive-facet-inject')) {
            $('.desktop-visible .facets').clone().appendTo('.responsive-facet-inject');
            $('.responsive-facet-inject-target').clone().appendTo('.responsive-facet-inject');
        }
        if ($el.hasClass('slider-inject')) {
            $el.addClass('slider-right-220 slider-container');
            $el.wrapInner('<div class="slider-content responsive-type"></div>');
            $el.prepend('<div class="slider-menu inherit-bg responsive-type"><div class="flyout-panel">' + flyoutHTML() + '</div></div>');
            $el.find('.slider-content').append('<div class="slider-backdrop"></div>');
            var v = $('.universal-site-search-query').val();
            $('.universal-site-search-query').val(v);
        }
        if ($el.hasClass('h1-responsive-nav')) {
            $el.find('h1,h2').each(function () {
                var h = '<div class="responsive-local-navigation toggle-container mobile-visible tablet-visible">';
                h += '<a href="#" class="toggle-button white">' + this.outerHTML;
                h += '</a>';
                h += '<div class="toggle-show has-slide">';
                h += '<ul class="kappa-uc">';
                var li = '';
                var label = $(this).text();
                var found = false;
                $el.find('.responsive-breadcrumb .dropdown-container').each(function () {
                    var text = $(this).find('.dropdown-toggle').text();
                    var title = $(this).find('.dropdown-toggle').attr('title');
                    if (text.toLowerCase() == label.toLowerCase() || title && title.toLowerCase() == label.toLowerCase()) {
                        found = true;
                        $(this).find('.dropdown-menu a:gt(0)').each(function () {
                            li += '<li>' + this.outerHTML + '</li>';
                        });
                    }
                });
                h += li;
                h += '</ul>';
                h += '</div>';
                h += '</div>';
                if (!found)
                    return;
                $(this).addClass('mobile-hidden tablet-hidden');
                $(this).after(h);
                $el.find('.responsive-local-navigation a').removeClass('inherit-color white');
                $el.find('.responsive-local-navigation a.active').addClass('white').parent().addClass('white');
            });
            var button = '<span class="toggle-hide"><i class="icon24-open"></i></span>';
            button += '<span class="toggle-show"><i class="icon24-close"></i></span>';
            $('.responsive-local-navigation h1,.responsive-local-navigation h2', el).append(button);
        }
    };
});
define('framework/cover', ['jquery'], function ($) {
    function resize($container) {
        var $img = $('.cover-img img', $container);
        var height = $container.height();
        $('.cover-body,.cover-img', $container).css('height', height);
        $img.css('width', $container.width());
        $img.css('height', 'auto');
        if ($img.height() < $container.height()) {
            $img.css('width', 'auto');
            $img.css('height', $container.height());
        }
        var bottom = -height;
        var left = 0;
        if ($container.hasClass('cover-right')) {
            left = $container.width() - $img.width();
        } else if ($container.hasClass('cover-left')) {
            left = 0;
        } else {
            left = ($container.width() - $img.width()) / 2;
        }
        $('.cover-img', $container).css('margin-bottom', bottom).css('margin-left', left).css('visibility', 'visible');
    }
    return function (el) {
        var $el = $(el);
        if ($el.data('cover-installed') == true)
            return;
        $el.data('cover-installed', true);
        $(window).load(function () {
            resize($el);
        });
        $(document).bind('framework.resize', function () {
            resize($el);
        });
    };
});
define('framework/map', ['jquery'], function ($) {
    function renderMap($el) {
        console.info(google, google.maps);
        var style = [
            {
                stylers: [
                    { saturation: '-10' },
                    { xlightness: '20' }
                ]
            },
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                stylers: [{ visibility: 'on' }]
            },
            {
                featureType: 'road',
                stylers: [
                    { lightness: '50' },
                    { visibility: 'on' }
                ]
            },
            {
                featureType: 'landscape',
                stylers: [{ xlightness: '50' }]
            }
        ];
        if ($el.length > 0) {
            var mapElement = $el.find('.map:first');
            var options = {
                zoom: mapElement.data('zoom') ? mapElement.data('zoom') : 7,
                minZoom: mapElement.data('min-zoom') ? mapElement.data('min-zoom') : 2,
                maxZoom: mapElement.data('max-zoom') ? mapElement.data('max-zoom') : 18,
                scrollwheel: false,
                center: new google.maps.LatLng(42.3601983, -71.127229),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: false
            };
            if (mapElement.data('center')) {
                if (mapElement.data('center').indexOf(',') == -1)
                    return;
                var lat = parseFloat(mapElement.data('center').split(',')[0]);
                var lon = parseFloat(mapElement.data('center').split(',')[1]);
                options.center = new google.maps.LatLng(lat, lon);
            }
            var bounds = new google.maps.LatLngBounds();
            var map = new google.maps.Map(mapElement[0], options);
            map.setOptions({ styles: style });
            var infowindow = new google.maps.InfoWindow({});
            console.info($el.find('ul.pins').html());
            $el.find('ul.pins > li').each(function () {
                var title = $(this).attr('title');
                if ($(this).data('latlon').indexOf(',') == -1)
                    return;
                var lat = parseFloat($(this).data('latlon').split(',')[0]);
                var lon = parseFloat($(this).data('latlon').split(',')[1]);
                var html = $(this).html();
                var myLatlng = new google.maps.LatLng(lat, lon);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillOpacity: 0.9,
                        fillColor: '#368db9',
                        strokeColor: '#a41034',
                        strokeOpacity: 0,
                        scale: 4
                    },
                    title: title
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(html);
                    infowindow.open(map, marker);
                });
                bounds.extend(marker.position);
            });
            if (mapElement.data('fitbounds'))
                map.fitBounds(bounds);
            var listener = google.maps.event.addListener(map, 'idle', function () {
                google.maps.event.removeListener(listener);
            });
        }
    }
    return function (el) {
        var $el = $(el);
        if ($el.data('map-installed') === true)
            return;
        $el.data('map-installed', true);
        console.info('init', $el.find('.pins').html());
        if (window.google && window.google.maps) {
            renderMap($el);
        } else {
            var num = parseInt(Math.random(0, 10000) * 100000000);
            window['framework_map_init'] = window['framework_map_init'] || [];
            window['framework_map_init'].push(function () {
                renderMap($el);
            });
            window.framework_map_init_all = function () {
                for (var i = 0; i < window.framework_map_init.length; i++) {
                    window.framework_map_init[i]();
                }
                window.framework_map_init_all = function () {
                };
            };
            var libs = ['https://maps.googleapis.com/maps/api/js?&callback=framework_map_init_all'];
            require(libs, function () {
            });
        }
    };
});
!function (a) {
    function b(b) {
        this.el = void 0, this.opts = a.extend(!0, {}, this.defaults, b), this.noMasksCache = b && void 0 !== b.definitions, this.userOptions = b || {}, e(this.opts.alias, b, this.opts);
    }
    function c(a) {
        var b = document.createElement('input'), c = 'on' + a, d = c in b;
        return d || (b.setAttribute(c, 'return;'), d = 'function' == typeof b[c]), b = null, d;
    }
    function d(a) {
        var b = 'text' == a || 'tel' == a || 'password' == a;
        if (!b) {
            var c = document.createElement('input');
            c.setAttribute('type', a), b = 'text' === c.type, c = null;
        }
        return b;
    }
    function e(b, c, d) {
        var f = d.aliases[b];
        return f ? (f.alias && e(f.alias, void 0, d), a.extend(!0, d, f), a.extend(!0, d, c), !0) : (void 0 == d.mask && (d.mask = b), !1);
    }
    function f(b, c, d) {
        var f = a(b), g = f.data('inputmask');
        if (g && '' != g)
            try {
                g = g.replace(new RegExp('\'', 'g'), '"');
                var h = a.parseJSON('{' + g + '}');
                a.extend(!0, d, h);
            } catch (i) {
            }
        for (var j in c) {
            var k = f.data('inputmask-' + j.toLowerCase());
            void 0 != k && (k = 'boolean' == typeof k ? k : k.toString(), 'mask' == j && 0 == k.indexOf('[') ? (d[j] = k.replace(/[\s[\]]/g, '').split('\',\''), d[j][0] = d[j][0].replace('\'', ''), d[j][d[j].length - 1] = d[j][d[j].length - 1].replace('\'', '')) : d[j] = k);
        }
        return d.alias ? e(d.alias, d, c) : a.extend(!0, c, d), c;
    }
    function g(c, d) {
        function e(b) {
            function d(a, b, c, d) {
                this.matches = [], this.isGroup = a || !1, this.isOptional = b || !1, this.isQuantifier = c || !1, this.isAlternator = d || !1, this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function e(b, d, e) {
                var f = c.definitions[d], g = 0 == b.matches.length;
                if (e = void 0 != e ? e : b.matches.length, f && !m) {
                    f.placeholder = a.isFunction(f.placeholder) ? f.placeholder.call(this, c) : f.placeholder;
                    for (var h = f.prevalidator, i = h ? h.length : 0, j = 1; j < f.cardinality; j++) {
                        var k = i >= j ? h[j - 1] : [], l = k.validator, n = k.cardinality;
                        b.matches.splice(e++, 0, {
                            fn: l ? 'string' == typeof l ? new RegExp(l) : new function () {
                                this.test = l;
                            }() : new RegExp('.'),
                            cardinality: n ? n : 1,
                            optionality: b.isOptional,
                            newBlockMarker: g,
                            casing: f.casing,
                            def: f.definitionSymbol || d,
                            placeholder: f.placeholder,
                            mask: d
                        });
                    }
                    b.matches.splice(e++, 0, {
                        fn: f.validator ? 'string' == typeof f.validator ? new RegExp(f.validator) : new function () {
                            this.test = f.validator;
                        }() : new RegExp('.'),
                        cardinality: f.cardinality,
                        optionality: b.isOptional,
                        newBlockMarker: g,
                        casing: f.casing,
                        def: f.definitionSymbol || d,
                        placeholder: f.placeholder,
                        mask: d
                    });
                } else
                    b.matches.splice(e++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: b.isOptional,
                        newBlockMarker: g,
                        casing: null,
                        def: d,
                        placeholder: void 0,
                        mask: d
                    }), m = !1;
            }
            for (var f, g, h, i, j, k, l = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, m = !1, n = new d(), o = [], p = []; f = l.exec(b);)
                switch (g = f[0], g.charAt(0)) {
                case c.optionalmarker.end:
                case c.groupmarker.end:
                    if (h = o.pop(), o.length > 0) {
                        if (i = o[o.length - 1], i.matches.push(h), i.isAlternator) {
                            j = o.pop();
                            for (var q = 0; q < j.matches.length; q++)
                                j.matches[q].isGroup = !1;
                            o.length > 0 ? (i = o[o.length - 1], i.matches.push(j)) : n.matches.push(j);
                        }
                    } else
                        n.matches.push(h);
                    break;
                case c.optionalmarker.start:
                    o.push(new d(!1, !0));
                    break;
                case c.groupmarker.start:
                    o.push(new d(!0));
                    break;
                case c.quantifiermarker.start:
                    var r = new d(!1, !1, !0);
                    g = g.replace(/[{}]/g, '');
                    var s = g.split(','), t = isNaN(s[0]) ? s[0] : parseInt(s[0]), u = 1 == s.length ? t : isNaN(s[1]) ? s[1] : parseInt(s[1]);
                    if (('*' == u || '+' == u) && (t = '*' == u ? 0 : 1), r.quantifier = {
                            min: t,
                            max: u
                        }, o.length > 0) {
                        var v = o[o.length - 1].matches;
                        if (f = v.pop(), !f.isGroup) {
                            var w = new d(!0);
                            w.matches.push(f), f = w;
                        }
                        v.push(f), v.push(r);
                    } else {
                        if (f = n.matches.pop(), !f.isGroup) {
                            var w = new d(!0);
                            w.matches.push(f), f = w;
                        }
                        n.matches.push(f), n.matches.push(r);
                    }
                    break;
                case c.escapeChar:
                    m = !0;
                    break;
                case c.alternatormarker:
                    o.length > 0 ? (i = o[o.length - 1], k = i.matches.pop()) : k = n.matches.pop(), k.isAlternator ? o.push(k) : (j = new d(!1, !1, !1, !0), j.matches.push(k), o.push(j));
                    break;
                default:
                    if (o.length > 0) {
                        if (i = o[o.length - 1], i.matches.length > 0 && !i.isAlternator && (k = i.matches[i.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, c.groupmarker.start, 0), e(k, c.groupmarker.end))), e(i, g), i.isAlternator) {
                            j = o.pop();
                            for (var q = 0; q < j.matches.length; q++)
                                j.matches[q].isGroup = !1;
                            o.length > 0 ? (i = o[o.length - 1], i.matches.push(j)) : n.matches.push(j);
                        }
                    } else
                        n.matches.length > 0 && (k = n.matches[n.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, c.groupmarker.start, 0), e(k, c.groupmarker.end))), e(n, g);
                }
            return n.matches.length > 0 && (k = n.matches[n.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, c.groupmarker.start, 0), e(k, c.groupmarker.end)), p.push(n)), p;
        }
        function f(f, g) {
            if (void 0 == f || '' == f)
                return void 0;
            if (1 == f.length && 0 == c.greedy && 0 != c.repeat && (c.placeholder = ''), c.repeat > 0 || '*' == c.repeat || '+' == c.repeat) {
                var h = '*' == c.repeat ? 0 : '+' == c.repeat ? 1 : c.repeat;
                f = c.groupmarker.start + f + c.groupmarker.end + c.quantifiermarker.start + h + ',' + c.repeat + c.quantifiermarker.end;
            }
            var i;
            return void 0 == b.prototype.masksCache[f] || d === !0 ? (i = {
                mask: f,
                maskToken: e(f),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: g
            }, d !== !0 && (b.prototype.masksCache[f] = i)) : i = a.extend(!0, {}, b.prototype.masksCache[f]), i;
        }
        function g(a) {
            if (a = a.toString(), c.numericInput) {
                a = a.split('').reverse();
                for (var b = 0; b < a.length; b++)
                    a[b] == c.optionalmarker.start ? a[b] = c.optionalmarker.end : a[b] == c.optionalmarker.end ? a[b] = c.optionalmarker.start : a[b] == c.groupmarker.start ? a[b] = c.groupmarker.end : a[b] == c.groupmarker.end && (a[b] = c.groupmarker.start);
                a = a.join('');
            }
            return a;
        }
        var h = void 0;
        if (a.isFunction(c.mask) && (c.mask = c.mask.call(this, c)), a.isArray(c.mask)) {
            if (c.mask.length > 1) {
                c.keepStatic = void 0 == c.keepStatic ? !0 : c.keepStatic;
                var i = '(';
                return a.each(c.mask, function (b, c) {
                    i.length > 1 && (i += ')|('), i += g(void 0 == c.mask || a.isFunction(c.mask) ? c : c.mask);
                }), i += ')', f(i, c.mask);
            }
            c.mask = c.mask.pop();
        }
        return c.mask && (h = void 0 == c.mask.mask || a.isFunction(c.mask.mask) ? f(g(c.mask), c.mask) : f(g(c.mask.mask), c.mask)), h;
    }
    function h(e, f, g) {
        function h(a, b, c) {
            b = b || 0;
            var d, e, f, g = [], h = 0;
            do {
                if (a === !0 && i().validPositions[h]) {
                    var j = i().validPositions[h];
                    e = j.match, d = j.locator.slice(), g.push(c === !0 ? j.input : H(h, e));
                } else
                    f = r(h, d, h - 1), e = f.match, d = f.locator.slice(), g.push(H(h, e));
                h++;
            } while ((void 0 == ea || ea > h - 1) && null != e.fn || null == e.fn && '' != e.def || b >= h);
            return g.pop(), g;
        }
        function i() {
            return f;
        }
        function n(a) {
            var b = i();
            b.buffer = void 0, b.tests = {}, a !== !0 && (b._buffer = void 0, b.validPositions = {}, b.p = 0);
        }
        function o(a, b) {
            var c = i(), d = -1, e = c.validPositions;
            void 0 == a && (a = -1);
            var f = d, g = d;
            for (var h in e) {
                var j = parseInt(h);
                e[j] && (b || null != e[j].match.fn) && (a >= j && (f = j), j >= a && (g = j));
            }
            return d = -1 != f && a - f > 1 || a > g ? f : g;
        }
        function p(b, c, d) {
            if (g.insertMode && void 0 != i().validPositions[b] && void 0 == d) {
                var e, f = a.extend(!0, {}, i().validPositions), h = o();
                for (e = b; h >= e; e++)
                    delete i().validPositions[e];
                i().validPositions[b] = c;
                var j, k = !0, l = i().validPositions;
                for (e = j = b; h >= e; e++) {
                    var m = f[e];
                    if (void 0 != m)
                        for (var n = j, p = -1; n < C() && (null == m.match.fn && l[e] && (l[e].match.optionalQuantifier === !0 || l[e].match.optionality === !0) || null != m.match.fn);) {
                            if (null == m.match.fn || !g.keepStatic && l[e] && (void 0 != l[e + 1] && u(e + 1, l[e].locator.slice(), e).length > 1 || void 0 != l[e].alternation) ? n++ : n = D(j), t(n, m.match.def)) {
                                k = A(n, m.input, !0, !0) !== !1, j = n;
                                break;
                            }
                            if (k = null == m.match.fn, p == n)
                                break;
                            p = n;
                        }
                    if (!k)
                        break;
                }
                if (!k)
                    return i().validPositions = a.extend(!0, {}, f), !1;
            } else
                i().validPositions[b] = c;
            return !0;
        }
        function q(a, b, c, d) {
            var e, f = a;
            i().p = a;
            for (e = f; b > e; e++)
                void 0 != i().validPositions[e] && (c === !0 || 0 != g.canClearPosition(i(), e, o(), d, g)) && delete i().validPositions[e];
            for (n(!0), e = f + 1; e <= o();) {
                for (; void 0 != i().validPositions[f];)
                    f++;
                var h = i().validPositions[f];
                f > e && (e = f + 1);
                var j = i().validPositions[e];
                void 0 != j && void 0 == h ? (t(f, j.match.def) && A(f, j.input, !0) !== !1 && (delete i().validPositions[e], e++), f++) : e++;
            }
            var k = o(), l = C();
            for (c !== !0 && void 0 != i().validPositions[k] && i().validPositions[k].input == g.radixPoint && delete i().validPositions[k], e = k + 1; l >= e; e++)
                i().validPositions[e] && delete i().validPositions[e];
            n(!0);
        }
        function r(a, b, c) {
            var d = i().validPositions[a];
            if (void 0 == d)
                for (var e = u(a, b, c), f = o(), h = i().validPositions[f] || u(0)[0], j = void 0 != h.alternation ? h.locator[h.alternation].toString().split(',') : [], k = 0; k < e.length && (d = e[k], !(d.match && (g.greedy && d.match.optionalQuantifier !== !0 || (d.match.optionality === !1 || d.match.newBlockMarker === !1) && d.match.optionalQuantifier !== !0) && (void 0 == h.alternation || h.alternation != d.alternation || void 0 != d.locator[h.alternation] && z(d.locator[h.alternation].toString().split(','), j)))); k++);
            return d;
        }
        function s(a) {
            return i().validPositions[a] ? i().validPositions[a].match : u(a)[0].match;
        }
        function t(a, b) {
            for (var c = !1, d = u(a), e = 0; e < d.length; e++)
                if (d[e].match && d[e].match.def == b) {
                    c = !0;
                    break;
                }
            return c;
        }
        function u(b, c, d, e) {
            function f(c, d, e, g) {
                function j(e, g, n) {
                    if (h > 10000)
                        return alert('jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. ' + i().mask), !0;
                    if (h == b && void 0 == e.matches)
                        return k.push({
                            match: e,
                            locator: g.reverse()
                        }), !0;
                    if (void 0 != e.matches) {
                        if (e.isGroup && n !== !0) {
                            if (e = j(c.matches[m + 1], g))
                                return !0;
                        } else if (e.isOptional) {
                            var o = e;
                            if (e = f(e, d, g, n)) {
                                var p = k[k.length - 1].match, q = 0 == a.inArray(p, o.matches);
                                if (!q)
                                    return !0;
                                l = !0, h = b;
                            }
                        } else if (e.isAlternator) {
                            var r, s = e, t = [], u = k.slice(), v = g.length, w = d.length > 0 ? d.shift() : -1;
                            if (-1 == w || 'string' == typeof w) {
                                var x = h, y = d.slice(), z = [];
                                'string' == typeof w && (z = w.split(','));
                                for (var A = 0; A < s.matches.length; A++) {
                                    if (k = [], e = j(s.matches[A], [A].concat(g), n) || e, e !== !0 && void 0 != e && z[z.length - 1] < s.matches.length) {
                                        var B = c.matches.indexOf(e) + 1;
                                        c.matches.length > B && (e = j(c.matches[B], [B].concat(g.slice(1, g.length)), n), e && (z.push(B.toString()), a.each(k, function (a, b) {
                                            b.alternation = g.length - 1;
                                        })));
                                    }
                                    r = k.slice(), h = x, k = [];
                                    for (var C = 0; C < y.length; C++)
                                        d[C] = y[C];
                                    for (var D = 0; D < r.length; D++) {
                                        var E = r[D];
                                        E.alternation = E.alternation || v;
                                        for (var F = 0; F < t.length; F++) {
                                            var G = t[F];
                                            if (E.match.mask == G.match.mask && ('string' != typeof w || -1 != a.inArray(E.locator[E.alternation].toString(), z))) {
                                                r.splice(D, 1), D--, G.locator[E.alternation] = G.locator[E.alternation] + ',' + E.locator[E.alternation], G.alternation = E.alternation;
                                                break;
                                            }
                                        }
                                    }
                                    t = t.concat(r);
                                }
                                'string' == typeof w && (t = a.map(t, function (b, c) {
                                    if (isFinite(c)) {
                                        var d, e = b.alternation, f = b.locator[e].toString().split(',');
                                        b.locator[e] = void 0, b.alternation = void 0;
                                        for (var g = 0; g < f.length; g++)
                                            d = -1 != a.inArray(f[g], z), d && (void 0 != b.locator[e] ? (b.locator[e] += ',', b.locator[e] += f[g]) : b.locator[e] = parseInt(f[g]), b.alternation = e);
                                        if (void 0 != b.locator[e])
                                            return b;
                                    }
                                })), k = u.concat(t), h = b, l = k.length > 0;
                            } else
                                e = s.matches[w] ? j(s.matches[w], [w].concat(g), n) : !1;
                            if (e)
                                return !0;
                        } else if (e.isQuantifier && n !== !0)
                            for (var H = e, I = d.length > 0 && n !== !0 ? d.shift() : 0; I < (isNaN(H.quantifier.max) ? I + 1 : H.quantifier.max) && b >= h; I++) {
                                var J = c.matches[a.inArray(H, c.matches) - 1];
                                if (e = j(J, [I].concat(g), !0)) {
                                    var p = k[k.length - 1].match;
                                    p.optionalQuantifier = I > H.quantifier.min - 1;
                                    var q = 0 == a.inArray(p, J.matches);
                                    if (q) {
                                        if (I > H.quantifier.min - 1) {
                                            l = !0, h = b;
                                            break;
                                        }
                                        return !0;
                                    }
                                    return !0;
                                }
                            }
                        else if (e = f(e, d, g, n))
                            return !0;
                    } else
                        h++;
                }
                for (var m = d.length > 0 ? d.shift() : 0; m < c.matches.length; m++)
                    if (c.matches[m].isQuantifier !== !0) {
                        var n = j(c.matches[m], [m].concat(e), g);
                        if (n && h == b)
                            return n;
                        if (h > b)
                            break;
                    }
            }
            var g = i().maskToken, h = c ? d : 0, j = c || [0], k = [], l = !1;
            if (e === !0 && i().tests[b])
                return i().tests[b];
            if (void 0 == c) {
                for (var m, n = b - 1; void 0 == (m = i().validPositions[n]) && n > -1 && (!i().tests[n] || void 0 == (m = i().tests[n][0]));)
                    n--;
                void 0 != m && n > -1 && (h = n, j = m.locator.slice());
            }
            for (var o = j.shift(); o < g.length; o++) {
                var p = f(g[o], j, [o]);
                if (p && h == b || h > b)
                    break;
            }
            return (0 == k.length || l) && k.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: ''
                },
                locator: []
            }), i().tests[b] = a.extend(!0, [], k), i().tests[b];
        }
        function v() {
            return void 0 == i()._buffer && (i()._buffer = h(!1, 1)), i()._buffer;
        }
        function w() {
            return void 0 == i().buffer && (i().buffer = h(!0, o(), !0)), i().buffer;
        }
        function x(a, b, c) {
            if (c = c || w().slice(), a === !0)
                n(), a = 0, b = c.length;
            else
                for (var d = a; b > d; d++)
                    delete i().validPositions[d], delete i().tests[d];
            for (var d = a; b > d; d++)
                c[d] != g.skipOptionalPartCharacter && A(d, c[d], !0, !0);
        }
        function y(a, b) {
            switch (b.casing) {
            case 'upper':
                a = a.toUpperCase();
                break;
            case 'lower':
                a = a.toLowerCase();
            }
            return a;
        }
        function z(b, c) {
            for (var d = g.greedy ? c : c.slice(0, 1), e = !1, f = 0; f < b.length; f++)
                if (-1 != a.inArray(b[f], d)) {
                    e = !0;
                    break;
                }
            return e;
        }
        function A(b, c, d, e) {
            function f(b, c, d, e) {
                var f = !1;
                return a.each(u(b), function (h, j) {
                    for (var k = j.match, l = c ? 1 : 0, m = '', r = (w(), k.cardinality); r > l; r--)
                        m += F(b - (r - 1));
                    if (c && (m += c), f = null != k.fn ? k.fn.test(m, i(), b, d, g) : c != k.def && c != g.skipOptionalPartCharacter || '' == k.def ? !1 : {
                            c: k.def,
                            pos: b
                        }, f !== !1) {
                        var s = void 0 != f.c ? f.c : c;
                        s = s == g.skipOptionalPartCharacter && null === k.fn ? k.def : s;
                        var t = b, u = w();
                        if (void 0 != f.remove && (a.isArray(f.remove) || (f.remove = [f.remove]), a.each(f.remove.sort(function (a, b) {
                                return b - a;
                            }), function (a, b) {
                                q(b, b + 1, !0);
                            })), void 0 != f.insert && (a.isArray(f.insert) || (f.insert = [f.insert]), a.each(f.insert.sort(function (a, b) {
                                return a - b;
                            }), function (a, b) {
                                A(b.pos, b.c, !0);
                            })), f.refreshFromBuffer) {
                            var v = f.refreshFromBuffer;
                            if (d = !0, x(v === !0 ? v : v.start, v.end, u), void 0 == f.pos && void 0 == f.c)
                                return f.pos = o(), !1;
                            if (t = void 0 != f.pos ? f.pos : b, t != b)
                                return f = a.extend(f, A(t, s, !0)), !1;
                        } else if (f !== !0 && void 0 != f.pos && f.pos != b && (t = f.pos, x(b, t), t != b))
                            return f = a.extend(f, A(t, s, !0)), !1;
                        return 1 != f && void 0 == f.pos && void 0 == f.c ? !1 : (h > 0 && n(!0), p(t, a.extend({}, j, { input: y(s, k) }), e) || (f = !1), !1);
                    }
                }), f;
            }
            function h(b, c, d, e) {
                for (var f, h, j, k, l = a.extend(!0, {}, i().validPositions), m = o(); m >= 0 && (k = i().validPositions[m], !k || void 0 == k.alternation || (f = m, h = i().validPositions[f].alternation, r(f).locator[k.alternation] == k.locator[k.alternation])); m--);
                if (void 0 != h) {
                    f = parseInt(f);
                    for (var p in i().validPositions)
                        if (p = parseInt(p), k = i().validPositions[p], p >= f && void 0 != k.alternation) {
                            var q = i().validPositions[f].locator[h].toString().split(','), s = k.locator[h] || q[0];
                            s.length > 0 && (s = s.split(',')[0]);
                            for (var t = 0; t < q.length; t++)
                                if (s < q[t]) {
                                    for (var u, v, w = p; w >= 0; w--)
                                        if (u = i().validPositions[w], void 0 != u) {
                                            v = u.locator[h], u.locator[h] = parseInt(q[t]);
                                            break;
                                        }
                                    if (s != u.locator[h]) {
                                        for (var x = [], y = 0, z = p + 1; z < o() + 1; z++) {
                                            var B = i().validPositions[z];
                                            B && (null != B.match.fn ? x.push(B.input) : b > z && y++), delete i().validPositions[z], delete i().tests[z];
                                        }
                                        for (n(!0), g.keepStatic = !g.keepStatic, j = !0; x.length > 0;) {
                                            var C = x.shift();
                                            if (C != g.skipOptionalPartCharacter && !(j = A(o() + 1, C, !1, !0)))
                                                break;
                                        }
                                        if (u.alternation = h, u.locator[h] = v, j) {
                                            for (var D = o(b) + 1, E = 0, z = p + 1; z < o() + 1; z++) {
                                                var B = i().validPositions[z];
                                                B && null == B.match.fn && b > z && E++;
                                            }
                                            b += E - y, j = A(b > D ? D : b, c, d, e);
                                        }
                                        if (g.keepStatic = !g.keepStatic, j)
                                            return j;
                                        n(), i().validPositions = a.extend(!0, {}, l);
                                    }
                                }
                            break;
                        }
                }
                return !1;
            }
            function j(b, c) {
                for (var d = i().validPositions[c], e = d.locator, f = e.length, g = b; c > g; g++)
                    if (!B(g)) {
                        var h = u(g), j = h[0], k = -1;
                        a.each(h, function (a, b) {
                            for (var c = 0; f > c; c++)
                                b.locator[c] && z(b.locator[c].toString().split(','), e[c].toString().split(',')) && c > k && (k = c, j = b);
                        }), p(g, a.extend({}, j, { input: j.match.def }), !0);
                    }
            }
            d = d === !0;
            for (var k = w(), l = b - 1; l > -1 && !i().validPositions[l]; l--);
            for (l++; b > l; l++)
                void 0 == i().validPositions[l] && ((!B(l) || k[l] != H(l)) && u(l).length > 1 || k[l] == g.radixPoint || '0' == k[l] && a.inArray(g.radixPoint, k) < l) && f(l, k[l], !0);
            var m = b, s = !1, t = a.extend(!0, {}, i().validPositions);
            if (m < C() && (s = f(m, c, d, e), (!d || e) && s === !1)) {
                var v = i().validPositions[m];
                if (!v || null != v.match.fn || v.match.def != c && c != g.skipOptionalPartCharacter) {
                    if ((g.insertMode || void 0 == i().validPositions[D(m)]) && !B(m))
                        for (var E = m + 1, G = D(m); G >= E; E++)
                            if (s = f(E, c, d, e), s !== !1) {
                                j(m, E), m = E;
                                break;
                            }
                } else
                    s = { caret: D(m) };
            }
            if (s === !1 && g.keepStatic && P(k) && (s = h(b, c, d, e)), s === !0 && (s = { pos: m }), a.isFunction(g.postValidation) && 0 != s && !d) {
                n(!0);
                var I = g.postValidation(w(), g);
                if (!I)
                    return n(!0), i().validPositions = a.extend(!0, {}, t), !1;
            }
            return s;
        }
        function B(a) {
            var b = s(a);
            if (null != b.fn)
                return b.fn;
            if (!g.keepStatic && void 0 == i().validPositions[a]) {
                for (var c = u(a), d = !0, e = 0; e < c.length; e++)
                    if ('' != c[e].match.def && (void 0 == c[e].alternation || c[e].locator[c[e].alternation].length > 1)) {
                        d = !1;
                        break;
                    }
                return d;
            }
            return !1;
        }
        function C() {
            var a;
            ea = da.prop('maxLength'), -1 == ea && (ea = void 0);
            var b, c = o(), d = i().validPositions[c], e = void 0 != d ? d.locator.slice() : void 0;
            for (b = c + 1; void 0 == d || null != d.match.fn || null == d.match.fn && '' != d.match.def; b++)
                d = r(b, e, b - 1), e = d.locator.slice();
            var f = s(b - 1);
            return a = '' != f.def ? b : b - 1, void 0 == ea || ea > a ? a : ea;
        }
        function D(a) {
            var b = C();
            if (a >= b)
                return b;
            for (var c = a; ++c < b && !B(c) && (g.nojumps !== !0 || g.nojumpsThreshold > c););
            return c;
        }
        function E(a) {
            var b = a;
            if (0 >= b)
                return 0;
            for (; --b > 0 && !B(b););
            return b;
        }
        function F(a) {
            return void 0 == i().validPositions[a] ? H(a) : i().validPositions[a].input;
        }
        function G(b, c, d, e, f) {
            if (e && a.isFunction(g.onBeforeWrite)) {
                var h = g.onBeforeWrite.call(b, e, c, d, g);
                if (h) {
                    if (h.refreshFromBuffer) {
                        var i = h.refreshFromBuffer;
                        x(i === !0 ? i : i.start, i.end, h.buffer), n(!0), c = w();
                    }
                    d = h.caret || d;
                }
            }
            b._valueSet(c.join('')), void 0 != d && M(b, d), f === !0 && (ha = !0, a(b).trigger('input'));
        }
        function H(a, b) {
            if (b = b || s(a), void 0 != b.placeholder)
                return b.placeholder;
            if (null == b.fn) {
                if (!g.keepStatic && void 0 == i().validPositions[a]) {
                    for (var c, d = u(a), e = !1, f = 0; f < d.length; f++) {
                        if (c && '' != d[f].match.def && d[f].match.def != c.match.def && (void 0 == d[f].alternation || d[f].alternation == c.alternation)) {
                            e = !0;
                            break;
                        }
                        1 != d[f].match.optionality && 1 != d[f].match.optionalQuantifier && (c = d[f]);
                    }
                    if (e)
                        return g.placeholder.charAt(a % g.placeholder.length);
                }
                return b.def;
            }
            return g.placeholder.charAt(a % g.placeholder.length);
        }
        function I(b, c, d, e) {
            function f() {
                var a = !1, b = v().slice(j, D(j)).join('').indexOf(h);
                if (-1 != b && !B(j)) {
                    a = !0;
                    for (var c = v().slice(j, j + b), d = 0; d < c.length; d++)
                        if (' ' != c[d]) {
                            a = !1;
                            break;
                        }
                }
                return a;
            }
            var g = void 0 != e ? e.slice() : b._valueGet().split(''), h = '', j = 0;
            if (n(), i().p = D(-1), c && b._valueSet(''), !d) {
                var k = v().slice(0, D(-1)).join(''), l = g.join('').match(new RegExp('^' + J(k), 'g'));
                l && l.length > 0 && (g.splice(0, l.length * k.length), j = D(j));
            }
            a.each(g, function (c, e) {
                var g = a.Event('keypress');
                g.which = e.charCodeAt(0), h += e;
                var k = o(void 0, !0), l = i().validPositions[k], m = r(k + 1, l ? l.locator.slice() : void 0, k);
                if (!f() || d) {
                    var n = d ? c : null == m.match.fn && m.match.optionality && k + 1 < i().p ? k + 1 : i().p;
                    V.call(b, g, !0, !1, d, n), j = n + 1, h = '';
                } else
                    V.call(b, g, !0, !1, !0, k + 1);
            }), c && G(b, w(), a(b).is(':focus') ? D(o(0)) : void 0, a.Event('checkval'));
        }
        function J(a) {
            return b.escapeRegex(a);
        }
        function K(b) {
            if (b[0].inputmask && !b.hasClass('hasDatepicker')) {
                var c = [], d = i().validPositions;
                for (var e in d)
                    d[e].match && null != d[e].match.fn && c.push(d[e].input);
                var f = (fa ? c.reverse() : c).join(''), h = (fa ? w().slice().reverse() : w()).join('');
                return a.isFunction(g.onUnMask) && (f = g.onUnMask.call(b, h, f, g) || f), f;
            }
            return b[0]._valueGet();
        }
        function L(a) {
            if (fa && 'number' == typeof a && (!g.greedy || '' != g.placeholder)) {
                var b = w().length;
                a = b - a;
            }
            return a;
        }
        function M(b, c, d) {
            var e, f = b.jquery && b.length > 0 ? b[0] : b;
            if ('number' != typeof c)
                return f.setSelectionRange ? (c = f.selectionStart, d = f.selectionEnd) : window.getSelection ? (e = window.getSelection().getRangeAt(0), (e.commonAncestorContainer.parentNode == f || e.commonAncestorContainer == f) && (c = e.startOffset, d = e.endOffset)) : document.selection && document.selection.createRange && (e = document.selection.createRange(), c = 0 - e.duplicate().moveStart('character', -100000), d = c + e.text.length), {
                    begin: L(c),
                    end: L(d)
                };
            if (c = L(c), d = L(d), d = 'number' == typeof d ? d : c, a(f).is(':visible')) {
                var h = a(f).css('font-size').replace('px', '') * d;
                if (f.scrollLeft = h > f.scrollWidth ? h : 0, k || 0 != g.insertMode || c != d || d++, f.setSelectionRange)
                    f.selectionStart = c, f.selectionEnd = d;
                else if (window.getSelection) {
                    if (e = document.createRange(), void 0 == f.firstChild) {
                        var i = document.createTextNode('');
                        f.appendChild(i);
                    }
                    e.setStart(f.firstChild, c < f._valueGet().length ? c : f._valueGet().length), e.setEnd(f.firstChild, d < f._valueGet().length ? d : f._valueGet().length), e.collapse(!0);
                    var j = window.getSelection();
                    j.removeAllRanges(), j.addRange(e);
                } else
                    f.createTextRange && (e = f.createTextRange(), e.collapse(!0), e.moveEnd('character', d), e.moveStart('character', c), e.select());
            }
        }
        function N(b) {
            var c, d, e = w(), f = e.length, g = o(), h = {}, j = i().validPositions[g], k = void 0 != j ? j.locator.slice() : void 0;
            for (c = g + 1; c < e.length; c++)
                d = r(c, k, c - 1), k = d.locator.slice(), h[c] = a.extend(!0, {}, d);
            var l = j && void 0 != j.alternation ? j.locator[j.alternation] : void 0;
            for (c = f - 1; c > g && (d = h[c], (d.match.optionality || d.match.optionalQuantifier || l && (l != h[c].locator[j.alternation] && null != d.match.fn || null == d.match.fn && d.locator[j.alternation] && z(d.locator[j.alternation].toString().split(','), l.split(',')) && '' != u(c)[0].def)) && e[c] == H(c, d.match)); c--)
                f--;
            return b ? {
                l: f,
                def: h[f] ? h[f].match : void 0
            } : f;
        }
        function O(a) {
            for (var b = N(), c = a.length - 1; c > b && !B(c); c--);
            return a.splice(b, c + 1 - b), a;
        }
        function P(b) {
            if (a.isFunction(g.isComplete))
                return g.isComplete.call(da, b, g);
            if ('*' == g.repeat)
                return void 0;
            {
                var c = !1, d = N(!0), e = E(d.l);
                o();
            }
            if (void 0 == d.def || d.def.newBlockMarker || d.def.optionality || d.def.optionalQuantifier) {
                c = !0;
                for (var f = 0; e >= f; f++) {
                    var h = r(f).match;
                    if (null != h.fn && void 0 == i().validPositions[f] && h.optionality !== !0 && h.optionalQuantifier !== !0 || null == h.fn && b[f] != H(f, h)) {
                        c = !1;
                        break;
                    }
                }
            }
            return c;
        }
        function Q(a, b) {
            return fa ? a - b > 1 || a - b == 1 && g.insertMode : b - a > 1 || b - a == 1 && g.insertMode;
        }
        function R(c) {
            var d = a._data(c).events, e = !1;
            a.each(d, function (c, d) {
                a.each(d, function (a, c) {
                    if ('inputmask' == c.namespace && 'setvalue' != c.type) {
                        var d = c.handler;
                        c.handler = function (a) {
                            if (!(this.disabled || this.readOnly && !('keydown' == a.type && a.ctrlKey && 67 == a.keyCode || a.keyCode == b.keyCode.TAB))) {
                                switch (a.type) {
                                case 'input':
                                    if (ha === !0 || e === !0)
                                        return ha = !1, a.preventDefault();
                                    break;
                                case 'keydown':
                                    ga = !1, e = !1;
                                    break;
                                case 'keypress':
                                    if (ga === !0)
                                        return a.preventDefault();
                                    ga = !0;
                                    break;
                                case 'compositionstart':
                                    e = !0;
                                    break;
                                case 'compositionupdate':
                                    ha = !0;
                                    break;
                                case 'compositionend':
                                    e = !1;
                                }
                                return d.apply(this, arguments);
                            }
                            a.preventDefault();
                        };
                    }
                });
            });
        }
        function S(b) {
            function c(b) {
                if (void 0 == a.valHooks[b] || 1 != a.valHooks[b].inputmaskpatch) {
                    var c = a.valHooks[b] && a.valHooks[b].get ? a.valHooks[b].get : function (a) {
                            return a.value;
                        }, d = a.valHooks[b] && a.valHooks[b].set ? a.valHooks[b].set : function (a, b) {
                            return a.value = b, a;
                        };
                    a.valHooks[b] = {
                        get: function (b) {
                            a(b);
                            if (b.inputmask) {
                                if (b.inputmask.opts.autoUnmask)
                                    return b.inputmask.unmaskedvalue();
                                var d = c(b), e = b.inputmask.maskset, f = e._buffer;
                                return f = f ? f.join('') : '', d != f ? d : '';
                            }
                            return c(b);
                        },
                        set: function (b, c) {
                            var e, f = a(b);
                            return e = d(b, c), b.inputmask && f.triggerHandler('setvalue.inputmask'), e;
                        },
                        inputmaskpatch: !0
                    };
                }
            }
            function d() {
                a(this);
                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : g.call(this) != v().join('') ? g.call(this) : '' : g.call(this);
            }
            function e(b) {
                h.call(this, b), this.inputmask && a(this).triggerHandler('setvalue.inputmask');
            }
            function f(b) {
                a(b).bind('mouseenter.inputmask', function (b) {
                    var c = a(this), d = this, e = d._valueGet();
                    '' != e && e != w().join('') && c.triggerHandler('setvalue.inputmask');
                });
                var c = a._data(b).events, d = c.mouseover;
                if (d) {
                    for (var e = d[d.length - 1], f = d.length - 1; f > 0; f--)
                        d[f] = d[f - 1];
                    d[0] = e;
                }
            }
            var g, h;
            if (!b._valueGet) {
                var i;
                Object.getOwnPropertyDescriptor && void 0 == b.value ? (g = function () {
                    return this.textContent;
                }, h = function (a) {
                    this.textContent = a;
                }, Object.defineProperty(b, 'value', {
                    get: d,
                    set: e
                })) : ((i = Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(b, 'value')) && i.configurable, document.__lookupGetter__ && b.__lookupGetter__('value') ? (g = b.__lookupGetter__('value'), h = b.__lookupSetter__('value'), b.__defineGetter__('value', d), b.__defineSetter__('value', e)) : (g = function () {
                    return b.value;
                }, h = function (a) {
                    b.value = a;
                }, c(b.type), f(b))), b._valueGet = function (a) {
                    return fa && a !== !0 ? g.call(this).split('').reverse().join('') : g.call(this);
                }, b._valueSet = function (a) {
                    h.call(this, fa ? a.split('').reverse().join('') : a);
                };
            }
        }
        function T(c, d, e, f) {
            function h() {
                if (g.keepStatic) {
                    n(!0);
                    var b, d = [], e = a.extend(!0, {}, i().validPositions);
                    for (b = o(); b >= 0; b--) {
                        var f = i().validPositions[b];
                        if (f && (null != f.match.fn && d.push(f.input), delete i().validPositions[b], void 0 != f.alternation && f.locator[f.alternation] == r(b).locator[f.alternation]))
                            break;
                    }
                    if (b > -1)
                        for (; d.length > 0;) {
                            i().p = D(o());
                            var h = a.Event('keypress');
                            h.which = d.pop().charCodeAt(0), V.call(c, h, !0, !1, !1, i().p);
                        }
                    else
                        i().validPositions = a.extend(!0, {}, e);
                }
            }
            if ((g.numericInput || fa) && (d == b.keyCode.BACKSPACE ? d = b.keyCode.DELETE : d == b.keyCode.DELETE && (d = b.keyCode.BACKSPACE), fa)) {
                var j = e.end;
                e.end = e.begin, e.begin = j;
            }
            if (d == b.keyCode.BACKSPACE && (e.end - e.begin < 1 || 0 == g.insertMode) ? (e.begin = E(e.begin), void 0 == i().validPositions[e.begin] || i().validPositions[e.begin].input != g.groupSeparator && i().validPositions[e.begin].input != g.radixPoint || e.begin--) : d == b.keyCode.DELETE && e.begin == e.end && (e.end = B(e.end) ? e.end + 1 : D(e.end) + 1, void 0 == i().validPositions[e.begin] || i().validPositions[e.begin].input != g.groupSeparator && i().validPositions[e.begin].input != g.radixPoint || e.end++), q(e.begin, e.end, !1, f), f !== !0) {
                h();
                var k = o(e.begin);
                k < e.begin ? (-1 == k && n(), i().p = D(k)) : i().p = e.begin;
            }
        }
        function U(d) {
            var e = this, f = a(e), h = d.keyCode, k = M(e);
            h == b.keyCode.BACKSPACE || h == b.keyCode.DELETE || j && 127 == h || d.ctrlKey && 88 == h && !c('cut') ? (d.preventDefault(), 88 == h && (aa = w().join('')), T(e, h, k), G(e, w(), i().p, d, aa != w().join('')), e._valueGet() == v().join('') ? f.trigger('cleared') : P(w()) === !0 && f.trigger('complete'), g.showTooltip && f.prop('title', i().mask)) : h == b.keyCode.END || h == b.keyCode.PAGE_DOWN ? setTimeout(function () {
                var a = D(o());
                g.insertMode || a != C() || d.shiftKey || a--, M(e, d.shiftKey ? k.begin : a, a);
            }, 0) : h == b.keyCode.HOME && !d.shiftKey || h == b.keyCode.PAGE_UP ? M(e, 0, d.shiftKey ? k.begin : 0) : (g.undoOnEscape && h == b.keyCode.ESCAPE || 90 == h && d.ctrlKey) && d.altKey !== !0 ? (I(e, !0, !1, aa.split('')), f.click()) : h != b.keyCode.INSERT || d.shiftKey || d.ctrlKey ? 0 != g.insertMode || d.shiftKey || (h == b.keyCode.RIGHT ? setTimeout(function () {
                var a = M(e);
                M(e, a.begin);
            }, 0) : h == b.keyCode.LEFT && setTimeout(function () {
                var a = M(e);
                M(e, fa ? a.begin + 1 : a.begin - 1);
            }, 0)) : (g.insertMode = !g.insertMode, M(e, g.insertMode || k.begin != C() ? k.begin : k.begin - 1)), g.onKeyDown.call(this, d, w(), M(e).begin, g), ia = -1 != a.inArray(h, g.ignorables);
        }
        function V(c, d, e, f, h) {
            var j = this, k = a(j), l = c.which || c.charCode || c.keyCode;
            if (!(d === !0 || c.ctrlKey && c.altKey) && (c.ctrlKey || c.metaKey || ia))
                return !0;
            if (l) {
                46 == l && 0 == c.shiftKey && ',' == g.radixPoint && (l = 44);
                var m, o = d ? {
                        begin: h,
                        end: h
                    } : M(j), q = String.fromCharCode(l), r = Q(o.begin, o.end);
                r && (i().undoPositions = a.extend(!0, {}, i().validPositions), T(j, b.keyCode.DELETE, o, !0), o.begin = i().p, g.insertMode || (g.insertMode = !g.insertMode, p(o.begin, f), g.insertMode = !g.insertMode), r = !g.multi), i().writeOutBuffer = !0;
                var s = fa && !r ? o.end : o.begin, t = A(s, q, f);
                if (t !== !1) {
                    if (t !== !0 && (s = void 0 != t.pos ? t.pos : s, q = void 0 != t.c ? t.c : q), n(!0), void 0 != t.caret)
                        m = t.caret;
                    else {
                        var v = i().validPositions;
                        m = !g.keepStatic && (void 0 != v[s + 1] && u(s + 1, v[s].locator.slice(), s).length > 1 || void 0 != v[s].alternation) ? s + 1 : D(s);
                    }
                    i().p = m;
                }
                if (e !== !1) {
                    var y = this;
                    if (setTimeout(function () {
                            g.onKeyValidation.call(y, t, g);
                        }, 0), i().writeOutBuffer && t !== !1) {
                        var z = w();
                        G(j, z, d ? void 0 : g.numericInput ? E(m) : m, c, d !== !0), d !== !0 && setTimeout(function () {
                            P(z) === !0 && k.trigger('complete');
                        }, 0);
                    } else
                        r && (i().buffer = void 0, i().validPositions = i().undoPositions);
                } else
                    r && (i().buffer = void 0, i().validPositions = i().undoPositions);
                if (g.showTooltip && k.prop('title', i().mask), d && a.isFunction(g.onBeforeWrite)) {
                    var B = g.onBeforeWrite.call(this, c, w(), m, g);
                    if (B && B.refreshFromBuffer) {
                        var C = B.refreshFromBuffer;
                        x(C === !0 ? C : C.start, C.end, B.buffer), n(!0), B.caret && (i().p = B.caret);
                    }
                }
                c.preventDefault();
            }
        }
        function W(b) {
            var c = this, d = a(c), e = c._valueGet(!0), f = M(c);
            if ('propertychange' == b.type && c._valueGet().length <= C())
                return !0;
            if ('paste' == b.type) {
                var h = e.substr(0, f.begin), i = e.substr(f.end, e.length);
                h == v().slice(0, f.begin).join('') && (h = ''), i == v().slice(f.end).join('') && (i = ''), window.clipboardData && window.clipboardData.getData ? e = h + window.clipboardData.getData('Text') + i : b.originalEvent && b.originalEvent.clipboardData && b.originalEvent.clipboardData.getData && (e = h + b.originalEvent.clipboardData.getData('text/plain') + i);
            }
            var j = e;
            if (a.isFunction(g.onBeforePaste)) {
                if (j = g.onBeforePaste.call(c, e, g), j === !1)
                    return b.preventDefault(), !1;
                j || (j = e);
            }
            return I(c, !1, !1, fa ? j.split('').reverse() : j.split('')), G(c, w(), void 0, b, !0), d.click(), P(w()) === !0 && d.trigger('complete'), !1;
        }
        function X(b) {
            var c = this;
            I(c, !0, !1), P(w()) === !0 && a(c).trigger('complete'), b.preventDefault();
        }
        function Y(a) {
            var b = this;
            aa = w().join(''), ('' == ca || 0 != a.originalEvent.data.indexOf(ca)) && (ba = M(b));
        }
        function Z(b) {
            var c = this, d = M(c);
            0 == b.originalEvent.data.indexOf(ca) && (n(), d = ba);
            var e = b.originalEvent.data;
            M(c, d.begin, d.end);
            for (var f = 0; f < e.length; f++) {
                var h = a.Event('keypress');
                h.which = e.charCodeAt(f), ga = !1, ia = !1, V.call(c, h);
            }
            setTimeout(function () {
                var a = i().p;
                G(c, w(), g.numericInput ? E(a) : a);
            }, 0), ca = b.originalEvent.data;
        }
        function $(a) {
        }
        function _(c) {
            da = a(c), g.showTooltip && da.prop('title', i().mask), ('rtl' == c.dir || g.rightAlign) && da.css('text-align', 'right'), ('rtl' == c.dir || g.numericInput) && (c.dir = 'ltr', da.removeAttr('dir'), c.inputmask.isRTL = !0, fa = !0), da.unbind('.inputmask'), (da.is(':input') && d(da.attr('type')) || c.isContentEditable) && (da.closest('form').bind('submit', function (a) {
                aa != w().join('') && da.change(), g.clearMaskOnLostFocus && da[0]._valueGet && da[0]._valueGet() == v().join('') && da[0]._valueSet(''), g.removeMaskOnSubmit && da.inputmask('remove');
            }).bind('reset', function () {
                setTimeout(function () {
                    da.triggerHandler('setvalue.inputmask');
                }, 0);
            }), da.bind('mouseenter.inputmask', function () {
                var b = a(this), c = this;
                !b.is(':focus') && g.showMaskOnHover && c._valueGet() != w().join('') && G(c, w());
            }).bind('blur.inputmask', function (b) {
                var c = a(this), d = this;
                if (d.inputmask) {
                    var e = d._valueGet(), f = w().slice();
                    ja = !0, aa != f.join('') && setTimeout(function () {
                        c.change(), aa = f.join('');
                    }, 0), '' != e && (g.clearMaskOnLostFocus && (e == v().join('') ? f = [] : O(f)), P(f) === !1 && (c.trigger('incomplete'), g.clearIncomplete && (n(), f = g.clearMaskOnLostFocus ? [] : v().slice())), G(d, f, void 0, b));
                }
            }).bind('focus.inputmask', function (b) {
                var c = (a(this), this), d = c._valueGet();
                g.showMaskOnFocus && (!g.showMaskOnHover || g.showMaskOnHover && '' == d) ? c._valueGet() != w().join('') && G(c, w(), D(o())) : M(c, D(o())), aa = w().join('');
            }).bind('mouseleave.inputmask', function () {
                var b = a(this), c = this;
                if (g.clearMaskOnLostFocus) {
                    var d = w().slice(), e = c._valueGet();
                    b.is(':focus') || e == b.attr('placeholder') || '' == e || (e == v().join('') ? d = [] : O(d), G(c, d));
                }
            }).bind('click.inputmask', function () {
                var b = a(this), c = this;
                if (b.is(':focus')) {
                    var d = M(c);
                    if (d.begin == d.end)
                        if (g.radixFocus && '' != g.radixPoint && -1 != a.inArray(g.radixPoint, w()) && (ja || w().join('') == v().join('')))
                            M(c, a.inArray(g.radixPoint, w())), ja = !1;
                        else {
                            var e = L(d.begin), f = D(o(e));
                            f > e ? M(c, B(e) ? e : D(e)) : M(c, f);
                        }
                }
            }).bind('dblclick.inputmask', function () {
                var a = this;
                setTimeout(function () {
                    M(a, 0, D(o()));
                }, 0);
            }).bind(m + '.inputmask dragdrop.inputmask drop.inputmask', W).bind('cut.inputmask', function (c) {
                ha = !0;
                var d = this, e = a(d), f = M(d);
                T(d, b.keyCode.DELETE, f), G(d, w(), i().p, c, aa != w().join('')), d._valueGet() == v().join('') && e.trigger('cleared'), g.showTooltip && e.prop('title', i().mask);
            }).bind('complete.inputmask', g.oncomplete).bind('incomplete.inputmask', g.onincomplete).bind('cleared.inputmask', g.oncleared), da.bind('keydown.inputmask', U).bind('keypress.inputmask', V), l || da.bind('compositionstart.inputmask', Y).bind('compositionupdate.inputmask', Z).bind('compositionend.inputmask', $), 'paste' === m && da.bind('input.inputmask', X)), da.bind('setvalue.inputmask', function () {
                var b = this, c = b._valueGet();
                b._valueSet(a.isFunction(g.onBeforeMask) ? g.onBeforeMask.call(b, c, g) || c : c), I(b, !0, !1), aa = w().join(''), (g.clearMaskOnLostFocus || g.clearIncomplete) && b._valueGet() == v().join('') && b._valueSet('');
            }), S(c);
            var e = a.isFunction(g.onBeforeMask) ? g.onBeforeMask.call(c, c._valueGet(), g) || c._valueGet() : c._valueGet();
            I(c, !0, !1, e.split(''));
            var f = w().slice();
            aa = f.join('');
            var h;
            try {
                h = document.activeElement;
            } catch (j) {
            }
            P(f) === !1 && g.clearIncomplete && n(), g.clearMaskOnLostFocus && (f.join('') == v().join('') ? f = [] : O(f)), G(c, f), h === c && M(c, D(o())), R(c);
        }
        var aa, ba, ca, da, ea, fa = !1, ga = !1, ha = !1, ia = !1, ja = !0;
        if (void 0 != e)
            switch (e.action) {
            case 'isComplete':
                return el = e.el, da = a(el), f = el.inputmask.maskset, g = el.inputmask.opts, P(e.buffer);
            case 'unmaskedvalue':
                return el = e.el, da = a(el), f = el.inputmask.maskset, g = el.inputmask.opts, fa = el.inputmask.isRTL, K(da);
            case 'mask':
                aa = w().join(''), _(e.el);
                break;
            case 'format':
                da = a({}), da[0].inputmask = new b(), da[0].inputmask.opts = g, da[0].inputmask.el = da[0], da[0].inputmask.maskset = f, da[0].inputmask.isRTL = g.numericInput, g.numericInput && (fa = !0);
                var ka = (a.isFunction(g.onBeforeMask) ? g.onBeforeMask.call(da, e.value, g) || e.value : e.value).split('');
                return I(da, !1, !1, fa ? ka.reverse() : ka), a.isFunction(g.onBeforeWrite) && g.onBeforeWrite.call(this, void 0, w(), 0, g), e.metadata ? {
                    value: fa ? w().slice().reverse().join('') : w().join(''),
                    metadata: da.inputmask('getmetadata')
                } : fa ? w().slice().reverse().join('') : w().join('');
            case 'isValid':
                da = a({}), da[0].inputmask = new b(), da[0].inputmask.opts = g, da[0].inputmask.el = da[0], da[0].inputmask.maskset = f, da[0].inputmask.isRTL = g.numericInput, g.numericInput && (fa = !0);
                var ka = e.value.split('');
                I(da, !1, !0, fa ? ka.reverse() : ka);
                for (var la = w(), ma = N(), na = la.length - 1; na > ma && !B(na); na--);
                return la.splice(ma, na + 1 - ma), P(la) && e.value == la.join('');
            case 'getemptymask':
                return el = e.el, da = a(el), f = el.inputmask.maskset, g = el.inputmask.opts, v();
            case 'remove':
                el = e.el, da = a(el), f = el.inputmask.maskset, g = el.inputmask.opts, el._valueSet(K(da)), da.unbind('.inputmask'), el.inputmask = void 0;
                var oa;
                Object.getOwnPropertyDescriptor && (oa = Object.getOwnPropertyDescriptor(el, 'value')), oa && oa.get ? el._valueGet && Object.defineProperty(el, 'value', {
                    get: el._valueGet,
                    set: el._valueSet
                }) : document.__lookupGetter__ && el.__lookupGetter__('value') && el._valueGet && (el.__defineGetter__('value', el._valueGet), el.__defineSetter__('value', el._valueSet));
                try {
                    delete el._valueGet, delete el._valueSet;
                } catch (pa) {
                    el._valueGet = void 0, el._valueSet = void 0;
                }
                break;
            case 'getmetadata':
                if (el = e.el, da = a(el), f = el.inputmask.maskset, g = el.inputmask.opts, a.isArray(f.metadata)) {
                    for (var qa, ra = o(), sa = ra; sa >= 0; sa--)
                        if (i().validPositions[sa] && void 0 != i().validPositions[sa].alternation) {
                            qa = i().validPositions[sa].alternation;
                            break;
                        }
                    return void 0 != qa ? f.metadata[i().validPositions[ra].locator[qa]] : f.metadata[0];
                }
                return f.metadata;
            }
    }
    b.prototype = {
        defaults: {
            placeholder: '_',
            optionalmarker: {
                start: '[',
                end: ']'
            },
            quantifiermarker: {
                start: '{',
                end: '}'
            },
            groupmarker: {
                start: '(',
                end: ')'
            },
            alternatormarker: '|',
            escapeChar: '\\',
            mask: null,
            oncomplete: a.noop,
            onincomplete: a.noop,
            oncleared: a.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            aliases: {},
            alias: null,
            onKeyDown: a.noop,
            onBeforeMask: void 0,
            onBeforePaste: void 0,
            onBeforeWrite: void 0,
            onUnMask: void 0,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: a.noop,
            skipOptionalPartCharacter: ' ',
            showTooltip: !1,
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: '',
            groupSeparator: '',
            radixFocus: !1,
            nojumps: !1,
            nojumpsThreshold: 0,
            keepStatic: void 0,
            definitions: {
                9: {
                    validator: '[0-9]',
                    cardinality: 1,
                    definitionSymbol: '*'
                },
                a: {
                    validator: '[A-Za-zА-яЁёÀ-ÿµ]',
                    cardinality: 1,
                    definitionSymbol: '*'
                },
                '*': {
                    validator: '[0-9A-Za-zА-яЁёÀ-ÿµ]',
                    cardinality: 1
                }
            },
            ignorables: [
                8,
                9,
                13,
                19,
                27,
                33,
                34,
                35,
                36,
                37,
                38,
                39,
                40,
                45,
                46,
                93,
                112,
                113,
                114,
                115,
                116,
                117,
                118,
                119,
                120,
                121,
                122,
                123
            ],
            isComplete: void 0,
            canClearPosition: a.noop,
            postValidation: void 0
        },
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        },
        masksCache: {},
        mask: function (a) {
            var c = a.jquery && a.length > 0 ? a[0] : a;
            f(a, this.opts, this.userOptions);
            var d = g(this.opts, this.noMasksCache);
            return void 0 != d && (c.inputmask = new b(), c.inputmask.opts = this.opts, c.inputmask.noMasksCache = this.noMasksCache, c.inputmask.el = c, c.inputmask.maskset = d, c.inputmask.isRTL = !1, h({
                action: 'mask',
                el: c
            }, d, this.opts)), a;
        },
        unmaskedvalue: function () {
            return this.el ? h({
                action: 'unmaskedvalue',
                el: this.el
            }) : void 0;
        },
        remove: function () {
            return this.el ? (h({
                action: 'remove',
                el: this.el
            }), this.el.inputmask = void 0, this.el) : void 0;
        },
        getemptymask: function () {
            return this.el ? h({
                action: 'getemptymask',
                el: this.el
            }) : void 0;
        },
        hasMaskedValue: function () {
            return !this.opts.autoUnmask;
        },
        isComplete: function () {
            return this.el ? h({
                action: 'isComplete',
                buffer: this.el._valueGet().split(''),
                el: this.el
            }) : void 0;
        },
        getmetadata: function () {
            return this.el ? h({
                action: 'getmetadata',
                el: this.el
            }) : void 0;
        }
    }, b.extendDefaults = function (c) {
        a.extend(b.prototype.defaults, c);
    }, b.extendDefinitions = function (c) {
        a.extend(b.prototype.defaults.definitions, c);
    }, b.extendAliases = function (c) {
        a.extend(b.prototype.defaults.aliases, c);
    }, b.format = function (c, d, f) {
        var i = a.extend(!0, {}, b.prototype.defaults, d);
        return e(i.alias, d, i), h({
            action: 'format',
            value: c,
            metadata: f
        }, g(i, d && void 0 !== d.definitions), i);
    }, b.isValid = function (c, d) {
        var f = a.extend(!0, {}, b.prototype.defaults, d);
        return e(f.alias, d, f), h({
            action: 'isValid',
            value: c
        }, g(f, d && void 0 !== d.definitions), f);
    }, b.escapeRegex = function (a) {
        var b = [
            '/',
            '.',
            '*',
            '+',
            '?',
            '|',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '\\',
            '$',
            '^'
        ];
        return a.replace(new RegExp('(\\' + b.join('|\\') + ')', 'gim'), '\\$1');
    }, b.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91
    };
    var i = navigator.userAgent, j = null !== i.match(new RegExp('iphone', 'i')), k = (null !== i.match(new RegExp('android.*safari.*', 'i')), null !== i.match(new RegExp('android.*chrome.*', 'i'))), l = null !== i.match(new RegExp('android.*firefox.*', 'i')), m = (/Kindle/i.test(i) || /Silk/i.test(i) || /KFTT/i.test(i) || /KFOT/i.test(i) || /KFJWA/i.test(i) || /KFJWI/i.test(i) || /KFSOWI/i.test(i) || /KFTHWA/i.test(i) || /KFTHWI/i.test(i) || /KFAPWA/i.test(i) || /KFAPWI/i.test(i), c('paste') ? 'paste' : c('input') ? 'input' : 'propertychange');
    return window.inputmask = b, b;
}(jQuery), function (a) {
    return void 0 === a.fn.inputmask && (a.fn.inputmask = function (b, c) {
        var d;
        if ('string' == typeof b)
            switch (b) {
            case 'mask':
                return d = new inputmask(c), this.each(function () {
                    d.mask(this);
                });
            case 'unmaskedvalue':
                var e = this.jquery && this.length > 0 ? this[0] : this;
                return e.inputmask ? e.inputmask.unmaskedvalue() : a(e).val();
            case 'remove':
                return this.each(function () {
                    this.inputmask && this.inputmask.remove();
                });
            case 'getemptymask':
                var e = this.jquery && this.length > 0 ? this[0] : this;
                return e.inputmask ? e.inputmask.getemptymask() : '';
            case 'hasMaskedValue':
                var e = this.jquery && this.length > 0 ? this[0] : this;
                return e.inputmask ? e.inputmask.hasMaskedValue() : !1;
            case 'isComplete':
                var e = this.jquery && this.length > 0 ? this[0] : this;
                return e.inputmask ? e.inputmask.isComplete() : !0;
            case 'getmetadata':
                var e = this.jquery && this.length > 0 ? this[0] : this;
                return e.inputmask ? e.inputmask.getmetadata() : void 0;
            default:
                return c = c || {}, c.alias = b, d = new inputmask(c), this.each(function () {
                    d.mask(this);
                });
            }
        else {
            if ('object' == typeof b)
                return d = new inputmask(b), this.each(function () {
                    d.mask(this);
                });
            if (void 0 == b)
                return this.each(function () {
                    d = new inputmask(), d.mask(this);
                });
        }
    }), a.fn.inputmask;
}(jQuery), function (a) {
    return inputmask.extendDefinitions({
        h: {
            validator: '[01][0-9]|2[0-3]',
            cardinality: 2,
            prevalidator: [{
                    validator: '[0-2]',
                    cardinality: 1
                }]
        },
        s: {
            validator: '[0-5][0-9]',
            cardinality: 2,
            prevalidator: [{
                    validator: '[0-5]',
                    cardinality: 1
                }]
        },
        d: {
            validator: '0[1-9]|[12][0-9]|3[01]',
            cardinality: 2,
            prevalidator: [{
                    validator: '[0-3]',
                    cardinality: 1
                }]
        },
        m: {
            validator: '0[1-9]|1[012]',
            cardinality: 2,
            prevalidator: [{
                    validator: '[01]',
                    cardinality: 1
                }]
        },
        y: {
            validator: '(19|20)\\d{2}',
            cardinality: 4,
            prevalidator: [
                {
                    validator: '[12]',
                    cardinality: 1
                },
                {
                    validator: '(19|20)',
                    cardinality: 2
                },
                {
                    validator: '(19|20)\\d',
                    cardinality: 3
                }
            ]
        }
    }), inputmask.extendAliases({
        'dd/mm/yyyy': {
            mask: '1/2/y',
            placeholder: 'dd/mm/yyyy',
            regex: {
                val1pre: new RegExp('[0-3]'),
                val1: new RegExp('0[1-9]|[12][0-9]|3[01]'),
                val2pre: function (a) {
                    var b = inputmask.escapeRegex.call(this, a);
                    return new RegExp('((0[1-9]|[12][0-9]|3[01])' + b + '[01])');
                },
                val2: function (a) {
                    var b = inputmask.escapeRegex.call(this, a);
                    return new RegExp('((0[1-9]|[12][0-9])' + b + '(0[1-9]|1[012]))|(30' + b + '(0[13-9]|1[012]))|(31' + b + '(0[13578]|1[02]))');
                }
            },
            leapday: '29/02/',
            separator: '/',
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function (a, b, c) {
                if (isNaN(a))
                    return !1;
                var d = parseInt(a.concat(b.toString().slice(a.length))), e = parseInt(a.concat(c.toString().slice(a.length)));
                return (isNaN(d) ? !1 : d >= b && c >= d) || (isNaN(e) ? !1 : e >= b && c >= e);
            },
            determinebaseyear: function (a, b, c) {
                var d = new Date().getFullYear();
                if (a > d)
                    return a;
                if (d > b) {
                    for (var e = b.toString().slice(0, 2), f = b.toString().slice(2, 4); e + c > b;)
                        e--;
                    var g = e + f;
                    return a > g ? a : g;
                }
                return d;
            },
            onKeyDown: function (b, c, d, e) {
                var f = a(this);
                if (b.ctrlKey && b.keyCode == inputmask.keyCode.RIGHT) {
                    var g = new Date();
                    f.val(g.getDate().toString() + (g.getMonth() + 1).toString() + g.getFullYear().toString()), f.triggerHandler('setvalue.inputmask');
                }
            },
            getFrontValue: function (a, b, c) {
                for (var d = 0, e = 0, f = 0; f < a.length && '2' != a.charAt(f); f++) {
                    var g = c.definitions[a.charAt(f)];
                    g ? (d += e, e = g.cardinality) : e++;
                }
                return b.join('').substr(d, e);
            },
            definitions: {
                1: {
                    validator: function (a, b, c, d, e) {
                        var f = e.regex.val1.test(a);
                        return d || f || a.charAt(1) != e.separator && -1 == '-./'.indexOf(a.charAt(1)) || !(f = e.regex.val1.test('0' + a.charAt(0))) ? f : (b.buffer[c - 1] = '0', {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            },
                            pos: c,
                            c: a.charAt(0)
                        });
                    },
                    cardinality: 2,
                    prevalidator: [{
                            validator: function (a, b, c, d, e) {
                                var f = a;
                                isNaN(b.buffer[c + 1]) || (f += b.buffer[c + 1]);
                                var g = 1 == f.length ? e.regex.val1pre.test(f) : e.regex.val1.test(f);
                                if (!d && !g) {
                                    if (g = e.regex.val1.test(a + '0'))
                                        return b.buffer[c] = a, b.buffer[++c] = '0', {
                                            pos: c,
                                            c: '0'
                                        };
                                    if (g = e.regex.val1.test('0' + a))
                                        return b.buffer[c] = '0', c++, { pos: c };
                                }
                                return g;
                            },
                            cardinality: 1
                        }]
                },
                2: {
                    validator: function (a, b, c, d, e) {
                        var f = e.getFrontValue(b.mask, b.buffer, e);
                        -1 != f.indexOf(e.placeholder[0]) && (f = '01' + e.separator);
                        var g = e.regex.val2(e.separator).test(f + a);
                        if (!d && !g && (a.charAt(1) == e.separator || -1 != '-./'.indexOf(a.charAt(1))) && (g = e.regex.val2(e.separator).test(f + '0' + a.charAt(0))))
                            return b.buffer[c - 1] = '0', {
                                refreshFromBuffer: {
                                    start: c - 1,
                                    end: c
                                },
                                pos: c,
                                c: a.charAt(0)
                            };
                        if (e.mask.indexOf('2') == e.mask.length - 1 && g) {
                            var h = b.buffer.join('').substr(4, 4) + a;
                            if (h != e.leapday)
                                return !0;
                            var i = parseInt(b.buffer.join('').substr(0, 4), 10);
                            return i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return g;
                    },
                    cardinality: 2,
                    prevalidator: [{
                            validator: function (a, b, c, d, e) {
                                isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]);
                                var f = e.getFrontValue(b.mask, b.buffer, e);
                                -1 != f.indexOf(e.placeholder[0]) && (f = '01' + e.separator);
                                var g = 1 == a.length ? e.regex.val2pre(e.separator).test(f + a) : e.regex.val2(e.separator).test(f + a);
                                return d || g || !(g = e.regex.val2(e.separator).test(f + '0' + a)) ? g : (b.buffer[c] = '0', c++, { pos: c });
                            },
                            cardinality: 1
                        }]
                },
                y: {
                    validator: function (a, b, c, d, e) {
                        if (e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)) {
                            var f = b.buffer.join('').substr(0, 6);
                            if (f != e.leapday)
                                return !0;
                            var g = parseInt(a, 10);
                            return g % 4 === 0 ? g % 100 === 0 ? g % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return !1;
                    },
                    cardinality: 4,
                    prevalidator: [
                        {
                            validator: function (a, b, c, d, e) {
                                var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                                if (!d && !f) {
                                    var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + '0').toString().slice(0, 1);
                                    if (f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear))
                                        return b.buffer[c++] = g.charAt(0), { pos: c };
                                    if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + '0').toString().slice(0, 2), f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear))
                                        return b.buffer[c++] = g.charAt(0), b.buffer[c++] = g.charAt(1), { pos: c };
                                }
                                return f;
                            },
                            cardinality: 1
                        },
                        {
                            validator: function (a, b, c, d, e) {
                                var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                                if (!d && !f) {
                                    var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2);
                                    if (f = e.isInYearRange(a[0] + g[1] + a[1], e.yearrange.minyear, e.yearrange.maxyear))
                                        return b.buffer[c++] = g.charAt(1), { pos: c };
                                    if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2), e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) {
                                        var h = b.buffer.join('').substr(0, 6);
                                        if (h != e.leapday)
                                            f = !0;
                                        else {
                                            var i = parseInt(a, 10);
                                            f = i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1;
                                        }
                                    } else
                                        f = !1;
                                    if (f)
                                        return b.buffer[c - 1] = g.charAt(0), b.buffer[c++] = g.charAt(1), b.buffer[c++] = a.charAt(0), {
                                            refreshFromBuffer: {
                                                start: c - 3,
                                                end: c
                                            },
                                            pos: c
                                        };
                                }
                                return f;
                            },
                            cardinality: 2
                        },
                        {
                            validator: function (a, b, c, d, e) {
                                return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            },
                            cardinality: 3
                        }
                    ]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        'mm/dd/yyyy': {
            placeholder: 'mm/dd/yyyy',
            alias: 'dd/mm/yyyy',
            regex: {
                val2pre: function (a) {
                    var b = inputmask.escapeRegex.call(this, a);
                    return new RegExp('((0[13-9]|1[012])' + b + '[0-3])|(02' + b + '[0-2])');
                },
                val2: function (a) {
                    var b = inputmask.escapeRegex.call(this, a);
                    return new RegExp('((0[1-9]|1[012])' + b + '(0[1-9]|[12][0-9]))|((0[13-9]|1[012])' + b + '30)|((0[13578]|1[02])' + b + '31)');
                },
                val1pre: new RegExp('[01]'),
                val1: new RegExp('0[1-9]|1[012]')
            },
            leapday: '02/29/',
            onKeyDown: function (b, c, d, e) {
                var f = a(this);
                if (b.ctrlKey && b.keyCode == inputmask.keyCode.RIGHT) {
                    var g = new Date();
                    f.val((g.getMonth() + 1).toString() + g.getDate().toString() + g.getFullYear().toString()), f.triggerHandler('setvalue.inputmask');
                }
            }
        },
        'yyyy/mm/dd': {
            mask: 'y/1/2',
            placeholder: 'yyyy/mm/dd',
            alias: 'mm/dd/yyyy',
            leapday: '/02/29',
            onKeyDown: function (b, c, d, e) {
                var f = a(this);
                if (b.ctrlKey && b.keyCode == inputmask.keyCode.RIGHT) {
                    var g = new Date();
                    f.val(g.getFullYear().toString() + (g.getMonth() + 1).toString() + g.getDate().toString()), f.triggerHandler('setvalue.inputmask');
                }
            }
        },
        'dd.mm.yyyy': {
            mask: '1.2.y',
            placeholder: 'dd.mm.yyyy',
            leapday: '29.02.',
            separator: '.',
            alias: 'dd/mm/yyyy'
        },
        'dd-mm-yyyy': {
            mask: '1-2-y',
            placeholder: 'dd-mm-yyyy',
            leapday: '29-02-',
            separator: '-',
            alias: 'dd/mm/yyyy'
        },
        'mm.dd.yyyy': {
            mask: '1.2.y',
            placeholder: 'mm.dd.yyyy',
            leapday: '02.29.',
            separator: '.',
            alias: 'mm/dd/yyyy'
        },
        'mm-dd-yyyy': {
            mask: '1-2-y',
            placeholder: 'mm-dd-yyyy',
            leapday: '02-29-',
            separator: '-',
            alias: 'mm/dd/yyyy'
        },
        'yyyy.mm.dd': {
            mask: 'y.1.2',
            placeholder: 'yyyy.mm.dd',
            leapday: '.02.29',
            separator: '.',
            alias: 'yyyy/mm/dd'
        },
        'yyyy-mm-dd': {
            mask: 'y-1-2',
            placeholder: 'yyyy-mm-dd',
            leapday: '-02-29',
            separator: '-',
            alias: 'yyyy/mm/dd'
        },
        datetime: {
            mask: '1/2/y h:s',
            placeholder: 'dd/mm/yyyy hh:mm',
            alias: 'dd/mm/yyyy',
            regex: {
                hrspre: new RegExp('[012]'),
                hrs24: new RegExp('2[0-4]|1[3-9]'),
                hrs: new RegExp('[01][0-9]|2[0-4]'),
                ampm: new RegExp('^[a|p|A|P][m|M]'),
                mspre: new RegExp('[0-5]'),
                ms: new RegExp('[0-5][0-9]')
            },
            timeseparator: ':',
            hourFormat: '24',
            definitions: {
                h: {
                    validator: function (a, b, c, d, e) {
                        if ('24' == e.hourFormat && 24 == parseInt(a, 10))
                            return b.buffer[c - 1] = '0', b.buffer[c] = '0', {
                                refreshFromBuffer: {
                                    start: c - 1,
                                    end: c
                                },
                                c: '0'
                            };
                        var f = e.regex.hrs.test(a);
                        if (!d && !f && (a.charAt(1) == e.timeseparator || -1 != '-.:'.indexOf(a.charAt(1))) && (f = e.regex.hrs.test('0' + a.charAt(0))))
                            return b.buffer[c - 1] = '0', b.buffer[c] = a.charAt(0), c++, {
                                refreshFromBuffer: {
                                    start: c - 2,
                                    end: c
                                },
                                pos: c,
                                c: e.timeseparator
                            };
                        if (f && '24' !== e.hourFormat && e.regex.hrs24.test(a)) {
                            var g = parseInt(a, 10);
                            return 24 == g ? (b.buffer[c + 5] = 'a', b.buffer[c + 6] = 'm') : (b.buffer[c + 5] = 'p', b.buffer[c + 6] = 'm'), g -= 12, 10 > g ? (b.buffer[c] = g.toString(), b.buffer[c - 1] = '0') : (b.buffer[c] = g.toString().charAt(1), b.buffer[c - 1] = g.toString().charAt(0)), {
                                refreshFromBuffer: {
                                    start: c - 1,
                                    end: c + 6
                                },
                                c: b.buffer[c]
                            };
                        }
                        return f;
                    },
                    cardinality: 2,
                    prevalidator: [{
                            validator: function (a, b, c, d, e) {
                                var f = e.regex.hrspre.test(a);
                                return d || f || !(f = e.regex.hrs.test('0' + a)) ? f : (b.buffer[c] = '0', c++, { pos: c });
                            },
                            cardinality: 1
                        }]
                },
                s: {
                    validator: '[0-5][0-9]',
                    cardinality: 2,
                    prevalidator: [{
                            validator: function (a, b, c, d, e) {
                                var f = e.regex.mspre.test(a);
                                return d || f || !(f = e.regex.ms.test('0' + a)) ? f : (b.buffer[c] = '0', c++, { pos: c });
                            },
                            cardinality: 1
                        }]
                },
                t: {
                    validator: function (a, b, c, d, e) {
                        return e.regex.ampm.test(a + 'm');
                    },
                    casing: 'lower',
                    cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {
            mask: '1/2/y h:s t\\m',
            placeholder: 'dd/mm/yyyy hh:mm xm',
            alias: 'datetime',
            hourFormat: '12'
        },
        'hh:mm t': {
            mask: 'h:s t\\m',
            placeholder: 'hh:mm xm',
            alias: 'datetime',
            hourFormat: '12'
        },
        'h:s t': {
            mask: 'h:s t\\m',
            placeholder: 'hh:mm xm',
            alias: 'datetime',
            hourFormat: '12'
        },
        'hh:mm:ss': {
            mask: 'h:s:s',
            placeholder: 'hh:mm:ss',
            alias: 'datetime',
            autoUnmask: !1
        },
        'hh:mm': {
            mask: 'h:s',
            placeholder: 'hh:mm',
            alias: 'datetime',
            autoUnmask: !1
        },
        date: { alias: 'dd/mm/yyyy' },
        'mm/yyyy': {
            mask: '1/y',
            placeholder: 'mm/yyyy',
            leapday: 'donotuse',
            separator: '/',
            alias: 'mm/dd/yyyy'
        }
    }), inputmask;
}(jQuery), function (a) {
    return inputmask.extendDefinitions({
        A: {
            validator: '[A-Za-zА-яЁёÀ-ÿµ]',
            cardinality: 1,
            casing: 'upper'
        },
        '#': {
            validator: '[0-9A-Za-zА-яЁёÀ-ÿµ]',
            cardinality: 1,
            casing: 'upper'
        }
    }), inputmask.extendAliases({
        url: {
            mask: 'ir',
            placeholder: '',
            separator: '',
            defaultPrefix: 'http://',
            regex: {
                urlpre1: new RegExp('[fh]'),
                urlpre2: new RegExp('(ft|ht)'),
                urlpre3: new RegExp('(ftp|htt)'),
                urlpre4: new RegExp('(ftp:|http|ftps)'),
                urlpre5: new RegExp('(ftp:/|ftps:|http:|https)'),
                urlpre6: new RegExp('(ftp://|ftps:/|http:/|https:)'),
                urlpre7: new RegExp('(ftp://|ftps://|http://|https:/)'),
                urlpre8: new RegExp('(ftp://|ftps://|http://|https://)')
            },
            definitions: {
                i: {
                    validator: function (a, b, c, d, e) {
                        return !0;
                    },
                    cardinality: 8,
                    prevalidator: function () {
                        for (var a = [], b = 8, c = 0; b > c; c++)
                            a[c] = function () {
                                var a = c;
                                return {
                                    validator: function (b, c, d, e, f) {
                                        if (f.regex['urlpre' + (a + 1)]) {
                                            var g, h = b;
                                            a + 1 - b.length > 0 && (h = c.buffer.join('').substring(0, a + 1 - b.length) + '' + h);
                                            var i = f.regex['urlpre' + (a + 1)].test(h);
                                            if (!e && !i) {
                                                for (d -= a, g = 0; g < f.defaultPrefix.length; g++)
                                                    c.buffer[d] = f.defaultPrefix[g], d++;
                                                for (g = 0; g < h.length - 1; g++)
                                                    c.buffer[d] = h[g], d++;
                                                return { pos: d };
                                            }
                                            return i;
                                        }
                                        return !1;
                                    },
                                    cardinality: a
                                };
                            }();
                        return a;
                    }()
                },
                r: {
                    validator: '.',
                    cardinality: 50
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: 'i[i[i]].i[i[i]].i[i[i]].i[i[i]]',
            definitions: {
                i: {
                    validator: function (a, b, c, d, e) {
                        return c - 1 > -1 && '.' != b.buffer[c - 1] ? (a = b.buffer[c - 1] + a, a = c - 2 > -1 && '.' != b.buffer[c - 2] ? b.buffer[c - 2] + a : '0' + a) : a = '00' + a, new RegExp('25[0-5]|2[0-4][0-9]|[01][0-9][0-9]').test(a);
                    },
                    cardinality: 1
                }
            }
        },
        email: {
            mask: '*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]',
            greedy: !1,
            onBeforePaste: function (a, b) {
                return a = a.toLowerCase(), a.replace('mailto:', '');
            },
            definitions: {
                '*': {
                    validator: '[0-9A-Za-z!#$%&\'*+/=?^_`{|}~-]',
                    cardinality: 1,
                    casing: 'lower'
                }
            }
        }
    }), inputmask;
}(jQuery), function (a) {
    return inputmask.extendAliases({
        numeric: {
            mask: function (a) {
                function b(b) {
                    for (var c = '', d = 0; d < b.length; d++)
                        c += a.definitions[b[d]] ? '\\' + b[d] : b[d];
                    return c;
                }
                if (0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat), a.repeat = 0, a.groupSeparator == a.radixPoint && ('.' == a.radixPoint ? a.groupSeparator = ',' : ',' == a.radixPoint ? a.groupSeparator = '.' : a.groupSeparator = ''), ' ' === a.groupSeparator && (a.skipOptionalPartCharacter = void 0), a.autoGroup = a.autoGroup && '' != a.groupSeparator, a.autoGroup && ('string' == typeof a.groupSize && isFinite(a.groupSize) && (a.groupSize = parseInt(a.groupSize)), isFinite(a.integerDigits))) {
                    var c = Math.floor(a.integerDigits / a.groupSize), d = a.integerDigits % a.groupSize;
                    a.integerDigits = parseInt(a.integerDigits) + (0 == d ? c - 1 : c);
                }
                a.placeholder.length > 1 && (a.placeholder = a.placeholder.charAt(0)), a.radixFocus = a.radixFocus && '0' == a.placeholder, a.definitions[';'] = a.definitions['~'], a.definitions[';'].definitionSymbol = '~';
                var e = b(a.prefix);
                return e += '[+]', e += '~{1,' + a.integerDigits + '}', void 0 != a.digits && (isNaN(a.digits) || parseInt(a.digits) > 0) && (e += a.digitsOptional ? '[' + (a.decimalProtect ? ':' : a.radixPoint) + ';{' + a.digits + '}]' : (a.decimalProtect ? ':' : a.radixPoint) + ';{' + a.digits + '}'), '' != a.negationSymbol.back && (e += '[-]'), e += b(a.suffix), a.greedy = !1, e;
            },
            placeholder: '',
            greedy: !1,
            digits: '*',
            digitsOptional: !0,
            radixPoint: '.',
            radixFocus: !0,
            groupSize: 3,
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            negationSymbol: {
                front: '-',
                back: ''
            },
            integerDigits: '+',
            prefix: '',
            suffix: '',
            rightAlign: !0,
            decimalProtect: !0,
            min: void 0,
            max: void 0,
            postFormat: function (b, c, d, e) {
                var f = !1;
                b.length >= e.suffix.length && b.join('').indexOf(e.suffix) == b.length - e.suffix.length && (b.length = b.length - e.suffix.length, f = !0), c = c >= b.length ? b.length - 1 : c < e.prefix.length ? e.prefix.length : c;
                var g = !1, h = b[c];
                if ('' == e.groupSeparator || -1 != a.inArray(e.radixPoint, b) && c > a.inArray(e.radixPoint, b) || new RegExp('[' + inputmask.escapeRegex(e.negationSymbol.front) + '+]').test(h)) {
                    if (f)
                        for (var i = 0, j = e.suffix.length; j > i; i++)
                            b.push(e.suffix.charAt(i));
                    return { pos: c };
                }
                var k = b.slice();
                h == e.groupSeparator && (k.splice(c--, 1), h = k[c]), d ? h != e.radixPoint && (k[c] = '?') : k.splice(c, 0, '?');
                var l = k.join(''), m = l;
                if (l.length > 0 && e.autoGroup || d && -1 != l.indexOf(e.groupSeparator)) {
                    var n = inputmask.escapeRegex(e.groupSeparator);
                    g = 0 == l.indexOf(e.groupSeparator), l = l.replace(new RegExp(n, 'g'), '');
                    var o = l.split(e.radixPoint);
                    if (l = '' == e.radixPoint ? l : o[0], l != e.prefix + '?0' && l.length >= e.groupSize + e.prefix.length)
                        for (var p = new RegExp('([-+]?[\\d?]+)([\\d?]{' + e.groupSize + '})'); p.test(l);)
                            l = l.replace(p, '$1' + e.groupSeparator + '$2'), l = l.replace(e.groupSeparator + e.groupSeparator, e.groupSeparator);
                    '' != e.radixPoint && o.length > 1 && (l += e.radixPoint + o[1]);
                }
                g = m != l, b.length = l.length;
                for (var i = 0, j = l.length; j > i; i++)
                    b[i] = l.charAt(i);
                var q = a.inArray('?', b);
                if (-1 == q && h == e.radixPoint && (q = a.inArray(e.radixPoint, b)), d ? b[q] = h : b.splice(q, 1), !g && f)
                    for (var i = 0, j = e.suffix.length; j > i; i++)
                        b.push(e.suffix.charAt(i));
                return {
                    pos: q,
                    refreshFromBuffer: g,
                    buffer: b
                };
            },
            onBeforeWrite: function (b, c, d, e) {
                if (b && 'blur' == b.type) {
                    var f = c.join(''), g = f.replace(e.prefix, '');
                    if (g = g.replace(e.suffix, ''), g = g.replace(new RegExp(inputmask.escapeRegex(e.groupSeparator), 'g'), ''), ',' === e.radixPoint && (g = g.replace(inputmask.escapeRegex(e.radixPoint), '.')), isFinite(g) && isFinite(e.min) && parseFloat(g) < parseFloat(e.min))
                        return a.extend(!0, {
                            refreshFromBuffer: !0,
                            buffer: (e.prefix + e.min).split('')
                        }, e.postFormat((e.prefix + e.min).split(''), 0, !0, e));
                    var h = '' != e.radixPoint ? c.join('').split(e.radixPoint) : [c.join('')], i = h[0].match(e.regex.integerPart(e)), j = 2 == h.length ? h[1].match(e.regex.integerNPart(e)) : void 0;
                    !i || i[0] != e.negationSymbol.front + '0' && i[0] != e.negationSymbol.front && '+' != i[0] || void 0 != j && !j[0].match(/^0+$/) || c.splice(i.index, 1);
                    var k = a.inArray(e.radixPoint, c);
                    if (-1 != k && isFinite(e.digits) && !e.digitsOptional) {
                        for (var l = 1; l <= e.digits; l++)
                            (void 0 == c[k + l] || c[k + l] == e.placeholder.charAt(0)) && (c[k + l] = '0');
                        return {
                            refreshFromBuffer: !0,
                            buffer: c
                        };
                    }
                }
                if (e.autoGroup) {
                    var m = e.postFormat(c, d - 1, !0, e);
                    return m.caret = d <= e.prefix.length ? m.pos : m.pos + 1, m;
                }
            },
            regex: {
                integerPart: function (a) {
                    return new RegExp('[' + inputmask.escapeRegex(a.negationSymbol.front) + '+]?\\d+');
                },
                integerNPart: function (a) {
                    return new RegExp('[\\d' + inputmask.escapeRegex(a.groupSeparator) + ']+');
                }
            },
            signHandler: function (a, b, c, d, e) {
                if (!d && e.allowMinus && '-' === a || e.allowPlus && '+' === a) {
                    var f = b.buffer.join('').match(e.regex.integerPart(e));
                    if (f && f[0].length > 0)
                        return b.buffer[f.index] == ('-' === a ? '+' : e.negationSymbol.front) ? '-' == a ? '' != e.negationSymbol.back ? {
                            pos: f.index,
                            c: e.negationSymbol.front,
                            remove: f.index,
                            caret: c,
                            insert: {
                                pos: b.buffer.length - e.suffix.length - 1,
                                c: e.negationSymbol.back
                            }
                        } : {
                            pos: f.index,
                            c: e.negationSymbol.front,
                            remove: f.index,
                            caret: c
                        } : '' != e.negationSymbol.back ? {
                            pos: f.index,
                            c: '+',
                            remove: [
                                f.index,
                                b.buffer.length - e.suffix.length - 1
                            ],
                            caret: c
                        } : {
                            pos: f.index,
                            c: '+',
                            remove: f.index,
                            caret: c
                        } : b.buffer[f.index] == ('-' === a ? e.negationSymbol.front : '+') ? '-' == a && '' != e.negationSymbol.back ? {
                            remove: [
                                f.index,
                                b.buffer.length - e.suffix.length - 1
                            ],
                            caret: c - 1
                        } : {
                            remove: f.index,
                            caret: c - 1
                        } : '-' == a ? '' != e.negationSymbol.back ? {
                            pos: f.index,
                            c: e.negationSymbol.front,
                            caret: c + 1,
                            insert: {
                                pos: b.buffer.length - e.suffix.length,
                                c: e.negationSymbol.back
                            }
                        } : {
                            pos: f.index,
                            c: e.negationSymbol.front,
                            caret: c + 1
                        } : {
                            pos: f.index,
                            c: a,
                            caret: c + 1
                        };
                }
                return !1;
            },
            radixHandler: function (b, c, d, e, f) {
                if (!e && b === f.radixPoint && f.digits > 0) {
                    var g = a.inArray(f.radixPoint, c.buffer), h = c.buffer.join('').match(f.regex.integerPart(f));
                    if (-1 != g && c.validPositions[g])
                        return c.validPositions[g - 1] ? { caret: g + 1 } : {
                            pos: h.index,
                            c: h[0],
                            caret: g + 1
                        };
                    if (!h || '0' == h[0] && h.index + 1 != d)
                        return c.buffer[h ? h.index : d] = '0', { pos: (h ? h.index : d) + 1 };
                }
                return !1;
            },
            leadingZeroHandler: function (b, c, d, e, f) {
                var g = c.buffer.join('').match(f.regex.integerNPart(f)), h = a.inArray(f.radixPoint, c.buffer);
                if (g && !e && (-1 == h || h >= d))
                    if (0 == g[0].indexOf('0')) {
                        d < f.prefix.length && (d = g.index);
                        var i = a.inArray(f.radixPoint, c._buffer), j = c._buffer && c.buffer.slice(h).join('') == c._buffer.slice(i).join('') || 0 == parseInt(c.buffer.slice(h + 1).join('')), k = c._buffer && c.buffer.slice(g.index, h).join('') == c._buffer.slice(f.prefix.length, i).join('') || '0' == c.buffer.slice(g.index, h).join('');
                        if (-1 == h || j && k)
                            return c.buffer.splice(g.index, 1), d = d > g.index ? d - 1 : g.index, {
                                pos: d,
                                remove: g.index
                            };
                        if (g.index + 1 == d || '0' == b)
                            return c.buffer.splice(g.index, 1), d = g.index, {
                                pos: d,
                                remove: g.index
                            };
                    } else if ('0' === b && d <= g.index && g[0] != f.groupSeparator)
                        return !1;
                return !0;
            },
            postValidation: function (a, b) {
                var c = !0, d = a.join(''), e = d.replace(b.prefix, '');
                return e = e.replace(b.suffix, ''), e = e.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator), 'g'), ''), ',' === b.radixPoint && (e = e.replace(inputmask.escapeRegex(b.radixPoint), '.')), e = e.replace(new RegExp('^' + inputmask.escapeRegex(b.negationSymbol.front)), '-'), e = e.replace(new RegExp(inputmask.escapeRegex(b.negationSymbol.back) + '$'), ''), isFinite(e) && isFinite(b.max) && (c = parseFloat(e) <= parseFloat(b.max)), c;
            },
            definitions: {
                '~': {
                    validator: function (b, c, d, e, f) {
                        var g = f.signHandler(b, c, d, e, f);
                        if (!g && (g = f.radixHandler(b, c, d, e, f), !g && (g = e ? new RegExp('[0-9' + inputmask.escapeRegex(f.groupSeparator) + ']').test(b) : new RegExp('[0-9]').test(b), g === !0 && (g = f.leadingZeroHandler(b, c, d, e, f), g === !0)))) {
                            var h = a.inArray(f.radixPoint, c.buffer);
                            g = -1 != h && f.digitsOptional === !1 && d > h && !e ? {
                                pos: d,
                                remove: d
                            } : { pos: d };
                        }
                        return g;
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                '+': {
                    validator: function (a, b, c, d, e) {
                        var f = e.signHandler(a, b, c, d, e);
                        return !f && (d && e.allowMinus && a === e.negationSymbol.front || e.allowMinus && '-' == a || e.allowPlus && '+' == a) && (f = '-' == a ? '' != e.negationSymbol.back ? {
                            pos: c,
                            c: '-' === a ? e.negationSymbol.front : '+',
                            caret: c + 1,
                            insert: {
                                pos: b.buffer.length,
                                c: e.negationSymbol.back
                            }
                        } : {
                            pos: c,
                            c: '-' === a ? e.negationSymbol.front : '+',
                            caret: c + 1
                        } : !0), f;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ''
                },
                '-': {
                    validator: function (a, b, c, d, e) {
                        var f = e.signHandler(a, b, c, d, e);
                        return !f && d && e.allowMinus && a === e.negationSymbol.back && (f = !0), f;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ''
                },
                ':': {
                    validator: function (a, b, c, d, e) {
                        var f = e.signHandler(a, b, c, d, e);
                        if (!f) {
                            var g = '[' + inputmask.escapeRegex(e.radixPoint) + ']';
                            f = new RegExp(g).test(a), f && b.validPositions[c] && b.validPositions[c].match.placeholder == e.radixPoint && (f = { caret: c + 1 });
                        }
                        return f;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: function (a) {
                        return a.radixPoint;
                    }
                }
            },
            insertMode: !0,
            autoUnmask: !1,
            unmaskAsNumber: !1,
            onUnMask: function (a, b, c) {
                var d = a.replace(c.prefix, '');
                return d = d.replace(c.suffix, ''), d = d.replace(new RegExp(inputmask.escapeRegex(c.groupSeparator), 'g'), ''), c.unmaskAsNumber ? (d = d.replace(inputmask.escapeRegex.call(this, c.radixPoint), '.'), Number(d)) : d;
            },
            isComplete: function (a, b) {
                var c = a.join(''), d = a.slice();
                if (b.postFormat(d, 0, !0, b), d.join('') != c)
                    return !1;
                var e = c.replace(b.prefix, '');
                return e = e.replace(b.suffix, ''), e = e.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator), 'g'), ''), ',' === b.radixPoint && (e = e.replace(inputmask.escapeRegex(b.radixPoint), '.')), isFinite(e);
            },
            onBeforeMask: function (a, b) {
                if ('' != b.radixPoint && isFinite(a))
                    a = a.toString().replace('.', b.radixPoint);
                else {
                    var c = a.match(/,/g), d = a.match(/\./g);
                    d && c ? d.length > c.length ? (a = a.replace(/\./g, ''), a = a.replace(',', b.radixPoint)) : c.length > d.length ? (a = a.replace(/,/g, ''), a = a.replace('.', b.radixPoint)) : a = a.indexOf('.') < a.indexOf(',') ? a.replace(/\./g, '') : a = a.replace(/,/g, '') : a = a.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator), 'g'), '');
                }
                return 0 == b.digits && (-1 != a.indexOf('.') ? a = a.substring(0, a.indexOf('.')) : -1 != a.indexOf(',') && (a = a.substring(0, a.indexOf(',')))), a;
            },
            canClearPosition: function (b, c, d, e, f) {
                var g = b.validPositions[c].input, h = g != f.radixPoint && isFinite(g) || c == d || g == f.groupSeparator || g == f.negationSymbol.front || g == f.negationSymbol.back;
                if (h && isFinite(g)) {
                    var i;
                    if (!e && b.buffer) {
                        i = b.buffer.join('').substr(0, c).match(f.regex.integerNPart(f));
                        var j = c + 1, k = null == i || 0 == parseInt(i[0].replace(new RegExp(inputmask.escapeRegex(f.groupSeparator), 'g'), ''));
                        if (k)
                            for (; b.validPositions[j] && (b.validPositions[j].input == f.groupSeparator || '0' == b.validPositions[j].input);)
                                delete b.validPositions[j], j++;
                    }
                    var l = [];
                    for (var m in b.validPositions)
                        l.push(b.validPositions[m].input);
                    i = l.join('').match(f.regex.integerNPart(f));
                    var n = a.inArray(f.radixPoint, b.buffer);
                    if (i && (-1 == n || n >= c))
                        if (0 == i[0].indexOf('0'))
                            h = i.index != c || -1 == n;
                        else {
                            var o = parseInt(i[0].replace(new RegExp(inputmask.escapeRegex(f.groupSeparator), 'g'), ''));
                            -1 != n && 10 > o && (b.validPositions[c].input = '0', b.p = f.prefix.length + 1, h = !1);
                        }
                }
                return h;
            }
        },
        currency: {
            prefix: '$ ',
            groupSeparator: ',',
            alias: 'numeric',
            placeholder: '0',
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: { alias: 'numeric' },
        integer: {
            alias: 'numeric',
            digits: '0',
            radixPoint: ''
        }
    }), inputmask;
}(jQuery), function (a) {
    return inputmask.extendAliases({
        phone: {
            url: 'phone-codes/phone-codes.js',
            countrycode: '',
            mask: function (b) {
                b.definitions['#'] = b.definitions[9];
                var c = [];
                return a.ajax({
                    url: b.url,
                    async: !1,
                    dataType: 'json',
                    success: function (a) {
                        c = a;
                    },
                    error: function (a, c, d) {
                        alert(d + ' - ' + b.url);
                    }
                }), c = c.sort(function (a, b) {
                    return (a.mask || a) < (b.mask || b) ? -1 : 1;
                });
            },
            keepStatic: !1,
            nojumps: !0,
            nojumpsThreshold: 1,
            onBeforeMask: function (a, b) {
                var c = a.replace(/^0/g, '');
                return (c.indexOf(b.countrycode) > 1 || -1 == c.indexOf(b.countrycode)) && (c = '+' + b.countrycode + c), c;
            }
        },
        phonebe: {
            alias: 'phone',
            url: 'phone-codes/phone-be.js',
            countrycode: '32',
            nojumpsThreshold: 4
        }
    }), inputmask;
}(jQuery), function (a) {
    return inputmask.extendAliases({
        Regex: {
            mask: 'r',
            greedy: !1,
            repeat: '*',
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function (a, b) {
                return new RegExp(b.regex).test(a.join(''));
            },
            definitions: {
                r: {
                    validator: function (b, c, d, e, f) {
                        function g(a, b) {
                            this.matches = [], this.isGroup = a || !1, this.isQuantifier = b || !1, this.quantifier = {
                                min: 1,
                                max: 1
                            }, this.repeaterPart = void 0;
                        }
                        function h() {
                            var a, b, c = new g(), d = [];
                            for (f.regexTokens = []; a = f.tokenizer.exec(f.regex);)
                                switch (b = a[0], b.charAt(0)) {
                                case '(':
                                    d.push(new g(!0));
                                    break;
                                case ')':
                                    var e = d.pop();
                                    d.length > 0 ? d[d.length - 1].matches.push(e) : c.matches.push(e);
                                    break;
                                case '{':
                                case '+':
                                case '*':
                                    var h = new g(!1, !0);
                                    b = b.replace(/[{}]/g, '');
                                    var i = b.split(','), j = isNaN(i[0]) ? i[0] : parseInt(i[0]), k = 1 == i.length ? j : isNaN(i[1]) ? i[1] : parseInt(i[1]);
                                    if (h.quantifier = {
                                            min: j,
                                            max: k
                                        }, d.length > 0) {
                                        var l = d[d.length - 1].matches;
                                        if (a = l.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e;
                                        }
                                        l.push(a), l.push(h);
                                    } else {
                                        if (a = c.matches.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e;
                                        }
                                        c.matches.push(a), c.matches.push(h);
                                    }
                                    break;
                                default:
                                    d.length > 0 ? d[d.length - 1].matches.push(b) : c.matches.push(b);
                                }
                            c.matches.length > 0 && f.regexTokens.push(c);
                        }
                        function i(b, c) {
                            var d = !1;
                            c && (k += '(', m++);
                            for (var e = 0; e < b.matches.length; e++) {
                                var f = b.matches[e];
                                if (1 == f.isGroup)
                                    d = i(f, !0);
                                else if (1 == f.isQuantifier) {
                                    var g = a.inArray(f, b.matches), h = b.matches[g - 1], j = k;
                                    if (isNaN(f.quantifier.max)) {
                                        for (; f.repeaterPart && f.repeaterPart != k && f.repeaterPart.length > k.length && !(d = i(h, !0)););
                                        d = d || i(h, !0), d && (f.repeaterPart = k), k = j + f.quantifier.max;
                                    } else {
                                        for (var l = 0, o = f.quantifier.max - 1; o > l && !(d = i(h, !0)); l++);
                                        k = j + '{' + f.quantifier.min + ',' + f.quantifier.max + '}';
                                    }
                                } else if (void 0 != f.matches)
                                    for (var p = 0; p < f.length && !(d = i(f[p], c)); p++);
                                else {
                                    var q;
                                    if ('[' == f.charAt(0)) {
                                        q = k, q += f;
                                        for (var r = 0; m > r; r++)
                                            q += ')';
                                        var s = new RegExp('^(' + q + ')$');
                                        d = s.test(n);
                                    } else
                                        for (var t = 0, u = f.length; u > t; t++)
                                            if ('\\' != f.charAt(t)) {
                                                q = k, q += f.substr(0, t + 1), q = q.replace(/\|$/, '');
                                                for (var r = 0; m > r; r++)
                                                    q += ')';
                                                var s = new RegExp('^(' + q + ')$');
                                                if (d = s.test(n))
                                                    break;
                                            }
                                    k += f;
                                }
                                if (d)
                                    break;
                            }
                            return c && (k += ')', m--), d;
                        }
                        null == f.regexTokens && h();
                        var j = c.buffer.slice(), k = '', l = !1, m = 0;
                        j.splice(d, 0, b);
                        for (var n = j.join(''), o = 0; o < f.regexTokens.length; o++) {
                            var g = f.regexTokens[o];
                            if (l = i(g, g.isGroup))
                                break;
                        }
                        return l;
                    },
                    cardinality: 1
                }
            }
        }
    }), inputmask;
}(jQuery);
define('framework/jquery.inputmask', [], function () {
    return;
});
define('framework/inputmask', [
    'jquery',
    'framework/jquery.inputmask'
], function ($) {
    return function (el) {
        var $el = $(el);
        var mask = $(el).data('mask');
        if (mask == 'email') {
            $el.inputmask({
                alias: 'email',
                'placeholder': ''
            });
        } else if (mask == 'integer') {
            $el.inputmask({
                alias: 'integer',
                rightAlign: false
            });
        } else if (mask == 'date') {
            $el.inputmask('mm/dd/yyyy');
        }
    };
});
define('framework/filtering', [
    'jquery',
    'framework/exports'
], function ($, FW) {
    function filter(el, str) {
        if (str == $(this).data('current-filter'))
            return;
        $(this).data('current-filter', str);
        var li = $(el).data('li');
        if (!li || li.length == 0) {
            console.info('loading');
            li = $('.filtering-list>li', el);
            $(el).data('li', li);
        }
        li.hide();
        li.each(function () {
            var txt = $(this).data('text');
            if (!txt) {
                txt = $(this).text().toLowerCase();
                $(this).data('text', txt);
            }
            if (!str || txt.indexOf(str) > -1) {
                $(this).show();
            }
        });
    }
    return function (el) {
        if ($(el).data('filtering-installed') == true)
            return;
        $(el).data('filtering-installed', true);
        $('.filtering-input', el).bind('keyup', FW.debounce(function (e) {
            filter(el, $(this).val());
        }, 150, false));
        $('.filtering-input', el).bind('change', function () {
            filter(el, $(this).val());
        });
    };
});
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('bloodhound', ['jquery'], function (a0) {
            return root['Bloodhound'] = factory(a0);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root['Bloodhound'] = factory(jQuery);
    }
}(this, function ($) {
    var _ = function () {
        'use strict';
        return {
            isMsie: function () {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function (str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function (str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            },
            isString: function (obj) {
                return typeof obj === 'string';
            },
            isNumber: function (obj) {
                return typeof obj === 'number';
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function (obj) {
                return typeof obj === 'undefined';
            },
            isElement: function (obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function (obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? '' : s + '';
            },
            bind: $.proxy,
            each: function (collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function (obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function (key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function (obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function (key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function (x) {
                return x;
            },
            clone: function (obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function () {
                var counter = 0;
                return function () {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function (fn) {
                setTimeout(fn, 0);
            },
            debounce: function (func, wait, immediate) {
                var timeout, result;
                return function () {
                    var context = this, args = arguments, later, callNow;
                    later = function () {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function (func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function () {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function () {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function (val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function () {
            }
        };
    }();
    var VERSION = '0.11.1';
    var tokenizers = function () {
        'use strict';
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function (k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function () {
        'use strict';
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function (node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function () {
        'use strict';
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem('~~~', '!');
            LOCAL_STORAGE.removeItem('~~~');
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [
                '__',
                namespace,
                '__'
            ].join('');
            this.ttlKey = '__ttl__';
            this.keyMatcher = new RegExp('^' + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function (key) {
                return this.prefix + key;
            },
            _ttlKey: function (key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function () {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function (key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === 'QuotaExceededError') {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function (key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function (key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function (key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function () {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--;) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function (key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ''));
                }
            }
            return keys;
        }
    }();
    var Transport = function () {
        'use strict';
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function (o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function (o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? { url: o } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function () {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function () {
        'use strict';
        var CHILDREN = 'c', IDS = 'i';
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error('datumTokenizer and queryTokenizer are both required');
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function (data) {
                var that = this;
                data = _.isArray(data) ? data : [data];
                _.each(data, function (datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function (token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split('');
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function (id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function (token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split('');
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function (id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function (token) {
                return !!token;
            });
            tokens = _.map(tokens, function (token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function () {
        'use strict';
        var keys;
        keys = {
            data: 'data',
            protocol: 'protocol',
            thumbprint: 'thumbprint'
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: 'GET',
                    dataType: 'json'
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function (cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function () {
        'use strict';
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: 'GET',
                    dataType: 'json'
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || '';
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function () {
        'use strict';
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error('datumTokenizer is required');
            !o.queryTokenizer && $.error('queryTokenizer is required');
            sorter = o.sorter;
            o.sorter = sorter ? function (x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1000,
                cache: true,
                cacheKey: null,
                thumbprint: '',
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? { url: o } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error('prefetch requires url to be set');
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: 'debounce',
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? { url: o } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error('remote requires url to be set');
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function () {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function () {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function () {
        'use strict';
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function (r) {
                        !_.some(local, function (l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('typeahead.js', ['jquery'], function (a0) {
            return factory(a0);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function ($) {
    var _ = function () {
        'use strict';
        return {
            isMsie: function () {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function (str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function (str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            },
            isString: function (obj) {
                return typeof obj === 'string';
            },
            isNumber: function (obj) {
                return typeof obj === 'number';
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function (obj) {
                return typeof obj === 'undefined';
            },
            isElement: function (obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function (obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? '' : s + '';
            },
            bind: $.proxy,
            each: function (collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function (obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function (key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function (obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function (key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function (x) {
                return x;
            },
            clone: function (obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function () {
                var counter = 0;
                return function () {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function (fn) {
                setTimeout(fn, 0);
            },
            debounce: function (func, wait, immediate) {
                var timeout, result;
                return function () {
                    var context = this, args = arguments, later, callNow;
                    later = function () {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function (func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function () {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function () {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function (val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function () {
            }
        };
    }();
    var WWW = function () {
        'use strict';
        var defaultClassNames = {
            wrapper: 'twitter-typeahead',
            input: 'tt-input',
            hint: 'tt-hint',
            menu: 'tt-menu',
            dataset: 'tt-dataset',
            suggestion: 'tt-suggestion',
            selectable: 'tt-selectable',
            empty: 'tt-empty',
            open: 'tt-open',
            cursor: 'tt-cursor',
            highlight: 'tt-highlight'
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function (o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function (v, k) {
                selectors[k] = '.' + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: 'relative',
                    display: 'inline-block'
                },
                hint: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    borderColor: 'transparent',
                    boxShadow: 'none',
                    opacity: '1'
                },
                input: {
                    position: 'relative',
                    verticalAlign: 'top',
                    backgroundColor: 'transparent'
                },
                inputWithNoHint: {
                    position: 'relative',
                    verticalAlign: 'top'
                },
                menu: {
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    zIndex: '100',
                    display: 'none'
                },
                ltr: {
                    left: '0',
                    right: 'auto'
                },
                rtl: {
                    left: 'auto',
                    right: ' 0'
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, { backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)' });
            }
            return css;
        }
    }();
    var EventBus = function () {
        'use strict';
        var namespace, deprecationMap;
        namespace = 'typeahead:';
        deprecationMap = {
            render: 'rendered',
            cursorchange: 'cursorchanged',
            select: 'selected',
            autocomplete: 'autocompleted'
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error('EventBus initialized without el');
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function (type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function (type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger('before' + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function (type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function () {
        'use strict';
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, 'async', types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, 'sync', types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [type].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function () {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function () {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function () {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function (doc) {
        'use strict';
        var defaults = {
            node: null,
            pattern: null,
            tagName: 'strong',
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [o.pattern];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? '\\b(' + escapedPatterns.join('|') + ')\\b' : '(' + escapedPatterns.join('|') + ')';
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, 'i');
        }
    }(window.document);
    var Input = function () {
        'use strict';
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: 'tab',
            27: 'esc',
            37: 'left',
            39: 'right',
            13: 'enter',
            38: 'up',
            40: 'down'
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error('input is missing');
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function (str) {
            return _.toStr(str).replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger('blurred');
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger('focused');
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + 'Keyed', $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                case 'up':
                case 'down':
                    preventDefault = !withModifier($e);
                    break;
                default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                case 'tab':
                    trigger = !withModifier($e);
                    break;
                default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css('direction') || 'ltr').toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr('dir', dir);
                    this.trigger('langDirChanged', dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger('queryChanged', this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger('whitespaceChanged', this.query);
                }
            },
            bind: function () {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on('blur.tt', onBlur).on('focus.tt', onFocus).on('keydown.tt', onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on('input.tt', onInput);
                } else {
                    this.$input.on('keydown.tt keypress.tt cut.tt paste.tt', function ($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || '';
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint('');
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(':focus');
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function () {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart('character', -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off('.tt');
                this.$input.off('.tt');
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $('<div>');
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: 'absolute',
                visibility: 'hidden',
                whiteSpace: 'pre',
                fontFamily: $input.css('font-family'),
                fontSize: $input.css('font-size'),
                fontStyle: $input.css('font-style'),
                fontVariant: $input.css('font-variant'),
                fontWeight: $input.css('font-weight'),
                wordSpacing: $input.css('word-spacing'),
                letterSpacing: $input.css('letter-spacing'),
                textIndent: $input.css('text-indent'),
                textRendering: $input.css('text-rendering'),
                textTransform: $input.css('text-transform')
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function () {
        'use strict';
        var keys, nameGenerator;
        keys = {
            val: 'tt-selectable-display',
            obj: 'tt-selectable-object'
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error('missing source');
            }
            if (!o.node) {
                $.error('missing node');
            }
            if (o.name && !isValidName(o.name)) {
                $.error('invalid dataset name: ' + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + '-' + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || '',
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger('rendered', this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger('rendered', this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + ' ' + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({ _query: query }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger('asyncCanceled', query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger('asyncRequested', query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        rendered += suggestions.length;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        that.async && that.trigger('asyncReceived', query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger('cleared');
            },
            isEmpty: function isEmpty() {
                return this.$el.is(':empty');
            },
            destroy: function destroy() {
                this.$el = $('<div>');
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $('<div>').text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function () {
        'use strict';
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error('node is required');
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $('<div>').appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger('selectableClicked', $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger('datasetRendered', dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger('datasetCleared');
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css('paddingTop'), 10) + parseInt(this.$node.css('paddingBottom'), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function () {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on('click.tt', this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function (dataset) {
                    dataset.onSync('asyncRequested', that._propagate, that).onSync('asyncCanceled', that._propagate, that).onSync('asyncReceived', that._propagate, that).onSync('rendered', that._onRendered, that).onSync('cleared', that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr('dir', dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off('.tt');
                this.$node = $('<div>');
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function () {
        'use strict';
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === 'ltr' ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css('display', 'block');
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function () {
        'use strict';
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error('missing input');
            }
            if (!o.menu) {
                $.error('missing menu');
            }
            if (!o.eventBus) {
                $.error('missing event bus');
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync('selectableClicked', this._onSelectableClicked, this).onSync('asyncRequested', this._onAsyncRequested, this).onSync('asyncCanceled', this._onAsyncCanceled, this).onSync('asyncReceived', this._onAsyncReceived, this).onSync('datasetRendered', this._onDatasetRendered, this).onSync('datasetCleared', this._onDatasetCleared, this);
            onFocused = c(this, 'activate', 'open', '_onFocused');
            onBlurred = c(this, 'deactivate', '_onBlurred');
            onEnterKeyed = c(this, 'isActive', 'isOpen', '_onEnterKeyed');
            onTabKeyed = c(this, 'isActive', 'isOpen', '_onTabKeyed');
            onEscKeyed = c(this, 'isActive', '_onEscKeyed');
            onUpKeyed = c(this, 'isActive', 'open', '_onUpKeyed');
            onDownKeyed = c(this, 'isActive', 'open', '_onDownKeyed');
            onLeftKeyed = c(this, 'isActive', 'isOpen', '_onLeftKeyed');
            onRightKeyed = c(this, 'isActive', 'isOpen', '_onRightKeyed');
            onQueryChanged = c(this, '_openIfActive', '_onQueryChanged');
            onWhitespaceChanged = c(this, '_openIfActive', '_onWhitespaceChanged');
            this.input.bind().onSync('focused', onFocused, this).onSync('blurred', onBlurred, this).onSync('enterKeyed', onEnterKeyed, this).onSync('tabKeyed', onTabKeyed, this).onSync('escKeyed', onEscKeyed, this).onSync('upKeyed', onUpKeyed, this).onSync('downKeyed', onDownKeyed, this).onSync('leftKeyed', onLeftKeyed, this).onSync('rightKeyed', onRightKeyed, this).onSync('queryChanged', onQueryChanged, this).onSync('whitespaceChanged', onWhitespaceChanged, this).onSync('langDirChanged', this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $('<div>');
                $menu = this.menu.$node || $('<div>');
                $input.on('blur.tt', function ($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function () {
                            $input.focus();
                        });
                    }
                });
                $menu.on('mousedown.tt', function ($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger('render', suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger('asyncrequest', query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger('asynccancel', query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger('asyncreceive', query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger('change', this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable);
                } else if ($selectable = this.menu.getTopSelectable()) {
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === 'rtl' && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === 'ltr' && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || '';
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before('active')) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger('active');
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before('idle')) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger('idle');
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before('open')) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger('open');
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before('close')) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger('close');
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before('select', data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger('select', data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before('autocomplete', data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger('autocomplete', data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before('cursorchange', payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger('cursorchange', payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function () {
                var args = [].slice.call(arguments);
                _.each(methods, function (method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function () {
        'use strict';
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: 'tt-www',
            attrs: 'tt-attrs',
            typeahead: 'tt-typeahead'
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function (d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val('');
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({ el: $input });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function (t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function (t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function (t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function (t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function (t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function (t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function (t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function (t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function (t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function (t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function (t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function (t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function (t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function (t) {
                        t.setVal(newVal);
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function (typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function (method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function () {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop('readonly', true).removeAttr('id name placeholder required').attr({
                autocomplete: 'off',
                spellcheck: 'false',
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr('dir'),
                autocomplete: $input.attr('autocomplete'),
                spellcheck: $input.attr('spellcheck'),
                style: $input.attr('style')
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: 'off',
                spellcheck: false
            });
            try {
                !$input.attr('dir') && $input.attr('dir', 'auto');
            } catch (e) {
            }
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css('background-attachment'),
                backgroundClip: $el.css('background-clip'),
                backgroundColor: $el.css('background-color'),
                backgroundImage: $el.css('background-image'),
                backgroundOrigin: $el.css('background-origin'),
                backgroundPosition: $el.css('background-position'),
                backgroundRepeat: $el.css('background-repeat'),
                backgroundSize: $el.css('background-size')
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function (val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    }());
}));
define('framework/jquery.typeahead', [], function () {
    return;
});
define('framework/typeahead', [
    'jquery',
    'framework/jquery.typeahead'
], function ($, typeahead) {
    function substringMatcher(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            cb(matches);
        };
    }
    ;
    return function (el) {
        var $el = $(el);
        if ($el.data('typeahead-installed') == true)
            return;
        $el.data('typeahead-installed', true);
        require([
            'typeahead.js',
            'bloodhound'
        ], function (typeahead, Bloodhound) {
            var configs = [{
                    hint: $el.data('typeahead-hint') ? true : false,
                    highlight: true,
                    minLength: 1
                }];
            for (var i = -1; i < 10; i++) {
                var d = $el.data('typeahead-set' + i + '-values');
                if (i == -1)
                    d = $el.data('typeahead-values');
                if (d) {
                    var values = [];
                    $.each(d.split('|'), function () {
                        values.push($.trim(this));
                    });
                    var c = { source: substringMatcher(values) };
                    var label = $el.data('typeahead-set' + i + '-label');
                    if (label)
                        c['templates'] = { header: '<h3 class="mu-uc">' + label + '</h3>' };
                    configs.push(c);
                }
            }
            var endpoint = $el.data('typeahead-endpoint');
            var prefetch = $el.data('typeahead-prefetch');
            if (endpoint || prefetch) {
                var opts = {};
                opts.datumTokenizer = Bloodhound.tokenizers.obj.whitespace('value');
                opts.queryTokenizer = Bloodhound.tokenizers.whitespace;
                if (prefetch)
                    opts.prefetch = {
                        url: prefetch,
                        transform: function (response) {
                            var results = [];
                            $.each(response, function () {
                                results.push({ 'value': this.t || this.title });
                            });
                            return results;
                        }
                    };
                if (endpoint)
                    opts.remote = {
                        url: endpoint,
                        wildcard: '%QUERY',
                        transform: function (response) {
                            var results = [];
                            $.each(response, function () {
                                results.push({ 'value': this.t || this.title });
                            });
                            return results;
                        }
                    };
                var dataset = new Bloodhound(opts);
                var c = {
                    display: 'value',
                    source: dataset,
                    limit: 5
                };
                configs.push(c);
            }
            if (configs.length > 1) {
                $el.find('input').each(function () {
                    var t = null;
                    if (configs.length == 2)
                        t = $(this).typeahead(configs[0], configs[1]);
                    if (configs.length == 3)
                        t = $(this).typeahead(configs[0], configs[1], configs[2]);
                    t.on('typeahead:select', function (e, data) {
                        $el.trigger('select', { val: t.val() });
                    });
                    t.on('keypress', function (e) {
                        var code = e.keyCode ? e.keyCode : e.which;
                        if (code === 13) {
                            e.preventDefault();
                            $el.trigger('enter', { val: t.val() });
                        }
                    });
                });
            }
        });
    };
});
define('framework/filterSticky', ['jquery'], function ($) {
    return function (el) {
        $(window).scroll(function (event) {
            var filterSticky = $('.filter-sticky');
            var filter = $('.filter-top');
            if (filter.length == 0)
                return;
            var top = filter.offset().top - parseFloat(filter.css('marginTop')) + 5;
            var ypos = $(this).scrollTop();
            if (ypos >= top && !$('.filter-top > div > div.toggled').length) {
                filterSticky.addClass('fixed');
            } else {
                filterSticky.removeClass('fixed');
                filterSticky.css('opacity', '0');
                filterSticky.css('visibility', 'hidden');
            }
        });
        $('.responsive-filters .filter-sticky').click(function () {
            $('.filter-top .toggle-container:not(.toggled) a.toggle-button').eq(0).click();
        });
    };
});
require([
    'jquery',
    'framework/smoothscroll',
    'framework/tabs',
    'framework/choice',
    'framework/megamenu',
    'framework/links',
    'framework/slideshow',
    'framework/obfuscate',
    'framework/expandable',
    'framework/backtotop',
    'framework/dropdown',
    'framework/toggle',
    'framework/datepicker',
    'framework/carousel',
    'framework/placeholder',
    'framework/trim',
    'framework/formcontainer',
    'framework/resize',
    'framework/useragent',
    'framework/hover',
    'framework/popover',
    'framework/lazy',
    'framework/iframe',
    'framework/randomize',
    'framework/scroll-lock',
    'framework/in-viewport',
    'framework/styledfields',
    'framework/imgcontroller',
    'framework/timeago',
    'framework/overflow',
    'framework/slider',
    'framework/autorender',
    'framework/cover',
    'framework/map',
    'framework/inputmask',
    'framework/filtering',
    'framework/typeahead',
    'framework/filterSticky'
], function ($, smoothscroll, tabs, choice, megamenu, links, slideshow, obfuscate, expandable, backtotop, dropdown, toggle, datepicker, carousel, placeholder, trim, formcontainer, resize, useragent, hover, popover, lazy, iframe, randomize, scrolllock, inview, styledfields, imgcontroller, timeago, overflow, slider, autorender, cover, map, inputmask, filtering, typeahead, filterSticky) {
    var oldJQuery = typeof $.fn.on == 'undefined';
    function main() {
        if ($('.ms-rtestate-write').size() > 0)
            return;
        useragent();
        resize();
        $('.js-framework').each(function () {
            var $zone = $(this);
            $('.dropdown-container,.dropdown-container2,.dropdown-container3', this).each(function () {
                dropdown(this);
            });
            if (oldJQuery)
                return;
            $('.random-container', this).each(function () {
                randomize(this);
            });
            $(this).on('click', 'a[href*=\'#\']', function (e, args) {
                smoothscroll(this, e, args == 'mock');
                return true;
            });
            $('.slider-inject,.h1-responsive-nav,.responsive-facet-inject,.responsive-filters-inject', this).each(function () {
                autorender(this);
            });
            $('.nav-tabs', this).each(function () {
                tabs(this);
            });
            $('.megamenu-container', this).each(function () {
                megamenu(this);
            });
            $('.hover-container', this).each(function () {
                hover(this);
            });
            $('.to', this).each(function () {
                obfuscate(this);
            });
            $('.filtering-container', this).each(function () {
                filtering(this);
            });
            $('.in-viewport-trigger', this).each(function () {
                inview(this);
            });
            $('.table-overflow', this).each(function () {
                overflow(this);
            });
            $('.typeahead-container', this).each(function () {
                typeahead(this);
            });
            $('.plusminus, .accordian, .mobile-accordion, .mobile-accordion2, .mobile-expandable-headings', this).each(function () {
                expandable(this);
            });
            $('.lazy,.defer,.ondemand', this).each(function () {
                lazy(this);
            });
            $('.slider-container', this).each(function () {
                slider(this);
            });
            $('.map-container', this).each(function () {
                map(this);
            });
            $('input[placeholder].field', this).each(function () {
                placeholder(this);
            });
            $('input[data-mask]', this).each(function () {
                inputmask(this);
            });
            $('.back-to-top', this).each(function () {
                backtotop(this);
            });
            $('.trim-container', this).each(function () {
                trim(this);
            });
            $('.scroll-lock', this).each(function () {
                scrolllock(this);
            });
            $('.iframe-container', this).each(function () {
                iframe(this);
            });
            $('.choice-container', this).each(function () {
                choice(this);
            });
            $('.link-controller', this).each(function () {
                links(this);
            });
            $('.img-controller', this).each(function () {
                imgcontroller(this);
            });
            $('.toggle-container', this).each(function () {
                toggle(this);
            });
            $('.timeago', this).each(function () {
                timeago(this);
            });
            $('.datepicker,.datepicker-container', this).each(function () {
                datepicker(this);
            });
            $('.popover-container', this).each(function () {
                popover(this);
            });
            $('.cover-container', this).each(function () {
                cover(this);
            });
            $('.filter-sticky', this).each(function () {
                filterSticky(this);
            });
            $('.slideshow-container', this).each(function () {
                slideshow(this);
            });
            $('.carousel-container', this).each(function () {
                carousel(this);
            });
            $('.field-checkbox,.field-radio,.field-select,.field-select2', this).each(function () {
                styledfields($zone, this);
            });
            $('.form-container', this).each(function () {
                formcontainer(this);
            });
            $('.responsive-breadcrumb > li:last-child .txt-arrow').hide();
        });
    }
    $(document).bind('framework.domupdate', main);
    $(document).ready(function () {
        $(document).keyup(function (e) {
            if (e.keyCode === 27)
                $(document).trigger('esc');
        });
        if (typeof window._onload === 'object') {
            for (var i = 0; i < window._onload.length; i++) {
                $(window).load(window._onload[i]);
            }
            window._onload = [];
        }
        if (typeof window._domready === 'object') {
            for (var i = 0; i < window._domready.length; i++) {
                $(document).ready(window._domready[i]);
            }
            window._domready = [];
        }
        $(document).trigger('framework.domupdate');
        if (window.analytics && window.analytics.rebind) {
            $(document).bind('framework.domupdate', function () {
                window.window.analytics.rebind();
            });
        }
    });
});
var _analytics = window._analytics || [];
_analytics.push(function () {
    if (window.analytics && analytics.warn) {
        analytics.warn(function () {
            return $('.responsive-framework').length == 0 ? 'non-responsive' : '';
        });
        analytics.warn(function () {
            return $('.type-framework').length == 0 ? 'off-brand' : '';
        });
        analytics.warn(function () {
            var result = '';
            $('.widget-video-popup,.widget-video-inline,.widget-video-embed').each(function () {
                if (this.href && this.href.indexOf('/videos/') > -1) {
                    result = 'legacy-videos';
                }
            });
            return result;
        });
    }
});
define('framework/js-framework', [
    'jquery',
    'framework/smoothscroll',
    'framework/tabs',
    'framework/choice',
    'framework/megamenu',
    'framework/links',
    'framework/slideshow',
    'framework/obfuscate',
    'framework/expandable',
    'framework/backtotop',
    'framework/dropdown',
    'framework/toggle',
    'framework/datepicker',
    'framework/carousel',
    'framework/placeholder',
    'framework/trim',
    'framework/formcontainer',
    'framework/resize',
    'framework/useragent',
    'framework/hover',
    'framework/popover',
    'framework/lazy',
    'framework/iframe',
    'framework/randomize',
    'framework/scroll-lock',
    'framework/in-viewport',
    'framework/styledfields',
    'framework/imgcontroller',
    'framework/timeago',
    'framework/overflow',
    'framework/slider',
    'framework/autorender',
    'framework/cover',
    'framework/map',
    'framework/inputmask',
    'framework/filtering',
    'framework/typeahead',
    'framework/filterSticky'
], function () {
    return;
});