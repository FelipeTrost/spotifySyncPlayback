(this.webpackJsonpregaloisaspotify=this.webpackJsonpregaloisaspotify||[]).push([[0],{13:function(e,t,n){e.exports=n(20)},19:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=19},20:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),l=n.n(c),o=n(2),u=n(3),s=n.n(u),i=n(1),p=n(4),d=n(6),f=n.n(d),b=n(7),m=n.n(b);var y=function(e){var t=Object(a.useState)(!1),n=Object(o.a)(t,2),c=n[0],l=n[1],u=Object(a.useState)(!1),d=Object(o.a)(u,2),b=d[0],y=d[1],O=Object(a.useState)({peerId:null,spotify:null,players:[],sellectedPlayer:null}),j=Object(o.a)(O,2),g=j[0],E=j[1],h=Object(a.useRef)(g);h.current=g;var v=Object(a.useState)(""),k=Object(o.a)(v,2),_=k[0],S=k[1],C=Object(a.useState)(!1),w=Object(o.a)(C,2),P=w[0],x=w[1],I=Object(a.useState)(!1),M=Object(o.a)(I,2),N=M[0],H=M[1];return Object(a.useEffect)((function(){Object(p.a)(s.a.mark((function t(){var n,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=new m.a).setAccessToken(e.credentials.access_token),l(n),n.getMe().then((function(e){return E((function(t){return Object(i.a)(Object(i.a)({},t),{},{spotify:e})}))})).catch((function(e){return E((function(e){return Object(i.a)(Object(i.a)({},e),{},{spotify:{display_name:"Not found"}})}))})),(a=new f.a).on("open",(function(e){console.log("connected"),E((function(t){return Object(i.a)(Object(i.a)({},t),{},{peerId:e})}))})),a.on("connection",(function(e){console.log("rejected"),console.log(e),e.close()})),y(a);case 8:case"end":return t.stop()}}),t)})))()}),[]),g.spotify&&g.peerId&&c&&g.players?r.a.createElement("div",{className:"App"},r.a.createElement("h3",null,"Username: ",g.spotify.display_name),r.a.createElement("br",null),P?r.a.createElement("p",null,"Connected to: ",P.peer," "):r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Connect"),r.a.createElement("input",{value:_,onChange:function(e){return S(e.target.value)}}),r.a.createElement("button",{onClick:function(){var e=b.connect(_);e.on("open",(function(){console.log("Connected to another peer!!"),x(e),e.on("data",function(){var e=Object(p.a)(s.a.mark((function e(t){var n,a,r,l,o,u;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=h.current,console.log("Received",t),H(t.song),0!==n.players.length){e.next=5;break}return e.abrupt("return",null);case 5:return e.next=7,c.getMyCurrentPlaybackState();case 7:if(a=e.sent,r=a.item,l=a.is_playing,o=a.progress_ms,u=a.device,r.uri!==t.song.item.uri||u.id!==n.players[n.sellectedPlayer]){e.next=17;break}return Math.abs(t.song.progress_ms-o)>3e3&&c.seek(t.song.progress_ms),t.song.is_playing!==l&&l&&c.pause(n.players[n.sellectedPlayer].id),t.song.is_playing===l||l||c.play({device_id:n.players[n.sellectedPlayer]}),e.abrupt("return",null);case 17:c.play({device_id:n.players[n.sellectedPlayer].id,uris:[t.song.item.uri],position_ms:o});case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})),e.on("close",(function(){x(!1)}))}}," Connect "),r.a.createElement("br",null)),N&&r.a.createElement("div",null,r.a.createElement("h2",null,"Hosts song"),r.a.createElement("h4",null,N.item.name),r.a.createElement("h4",null,N.progress_ms/1e3,"s"),r.a.createElement("h4",null,N.is_playing?"playing":"paused")),r.a.createElement("h3",null,"Players ",r.a.createElement("button",{onClick:function(){if(!c)return null;E((function(e){return Object(i.a)(Object(i.a)({},e),{},{devices:[]})})),c.getMyDevices().then((function(e){return E((function(t){var n=0!==e.devices.length?0:null;return Object(i.a)(Object(i.a)({},t),{},{players:e.devices,sellectedPlayer:n})}))})).catch((function(e){return console.log("Hubo un error:",e)}))}},"refresh"),"  "),0===g.players.length&&r.a.createElement("h4",null,"No connected devices ",g.sellectedPlayer," "),r.a.createElement("ul",null,g.players.map((function(e){return r.a.createElement("li",{key:e.id}," ",e.name," type:",e.type," ")})))):r.a.createElement("p",null,"...Loading")},O=n(12),j=n(11),g=n(5);var E=function(e){var t=Object(a.useState)(!1),n=Object(o.a)(t,2),c=n[0],l=n[1],u=Object(a.useState)(!1),d=Object(o.a)(u,2),b=(d[0],d[1]),y=Object(a.useState)({peerId:null,spotify:null,players:[]}),E=Object(o.a)(y,2),h=E[0],v=E[1],k=Object(a.useState)({}),_=Object(o.a)(k,2),S=_[0],C=_[1],w=Object(a.useRef)(S);return w.current=S,Object(a.useEffect)((function(){var t=new m.a;t.setAccessToken(e.credentials.access_token),l(t),t.getMyDevices().then((function(e){return v((function(t){return Object(i.a)(Object(i.a)({},t),{},{players:e.devices})}))})).catch((function(e){return console.log("Hubo un error:",e)})),t.getMe().then((function(e){return v((function(t){return Object(i.a)(Object(i.a)({},t),{},{spotify:e})}))})).catch((function(e){return v((function(e){return Object(i.a)(Object(i.a)({},e),{},{spotify:{display_name:"Not found"}})}))}));var n=new f.a;n.on("open",(function(e){console.log("connected"),v((function(t){return Object(i.a)(Object(i.a)({},t),{},{peerId:e})}))})),n.on("connection",(function(e){var t;console.log("Peer connected:",e.peer),e.on("close",(function(){console.log("peer disconnected"),C((function(t){var n=e.peer;t[n];return Object(O.a)(t,[n].map(j.a))}))})),t=e,C((function(e){return console.log("adding",t),Object(i.a)(Object(i.a)({},e),{},Object(g.a)({},t.peer,t))}))})),b(n);var a=setInterval(Object(p.a)(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getMyCurrentPlaybackState();case 2:if(n=e.sent){e.next=5;break}return e.abrupt("return",null);case 5:Object.keys(w.current).forEach((function(e){return w.current[e].send({song:n})}));case 6:case"end":return e.stop()}}),e)}))),1e3);return function(){return clearInterval(a)}}),[]),h.spotify&&c&&h.players?r.a.createElement("div",{className:"App"},r.a.createElement("h3",null,"Username: ",h.spotify.display_name),r.a.createElement("h3",null,"Host id: ",h.peerId),r.a.createElement("br",null),r.a.createElement("h4",null,"Connected Clients:"),r.a.createElement("ul",null,Object.keys(S).map((function(e){return r.a.createElement("li",{key:e}," ",e," ")}))),r.a.createElement("button",{onClick:function(){return Object.keys(S).forEach((function(e){return S[e].send({song:"spotify:track:7khLT5h97FlHyYk79QRHNn"})}))}},"sendSong")):r.a.createElement("p",null,"...Loading")},h=n(10),v=n.n(h);var k=function(){var e=Object(a.useState)({status:!1,credentials:null}),t=Object(o.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(!1),u=Object(o.a)(l,2),s=u[0],i=u[1];return n.status?n.status?s?r.a.createElement(E,{credentials:n.credentials}):r.a.createElement(y,{credentials:n.credentials}):"No se pudo":r.a.createElement(r.a.Fragment,null,r.a.createElement(r.a.StrictMode,null,r.a.createElement(v.a,{clientId:"eff635f26c1c4116bc9cecca8ea22d17",redirectUri:"http://localhost:3000/",scope:["streaming","user-read-email","user-read-private","user-read-playback-state","user-modify-playback-state"],onSuccess:function(e){return c({status:!0,credentials:e})},onFailure:function(e){return c({status:!1,credentials:!1})}})),r.a.createElement("br",null),r.a.createElement("input",{type:"radio",id:"host",name:"role",value:"host",checked:s,onChange:function(e){return i(e.target.checked)}}),r.a.createElement("label",{for:"host"},"Host"),r.a.createElement("br",null),r.a.createElement("input",{type:"radio",id:"user",name:"role",value:"user",checked:!s,onChange:function(e){return i(!e.target.checked)}}),r.a.createElement("label",{for:"user"},"User"),r.a.createElement("br",null),!1===n.credentials&&r.a.createElement("h4",null,"Hubo un problema con el inicio de sesion"))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.05477098.chunk.js.map