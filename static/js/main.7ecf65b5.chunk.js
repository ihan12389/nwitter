(this.webpackJsonpnwitter=this.webpackJsonpnwitter||[]).push([[0],{50:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(32),s=n.n(c),i=n(7),o=n(22),u=n(6),l=n(10),j=n.n(l),b=n(17),d=n(12),p=n(23),f=n(24);n(45),n(52),n(53);f.a.initializeApp({apiKey:"AIzaSyB7-jd-_VfwiBXESzO-PUU_FOR7aRtD48w",authDomain:"nwitter-79fb0.firebaseapp.com",databaseURL:"https://nwitter-79fb0.firebase.io.com",projectId:"nwitter-79fb0",storageBucket:"nwitter-79fb0.appspot.com",messagingSenderId:"755424085291",appId:"1:755424085291:web:d3b15de812656adf63316e"});var O=f.a,h=f.a.auth(),m=f.a.firestore(),x=f.a.storage(),g=n(1),v=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),o=s[0],u=s[1],l=Object(a.useState)(!0),d=Object(i.a)(l,2),p=d[0],f=d[1],O=Object(a.useState)(""),m=Object(i.a)(O,2),x=m[0],v=m[1],w=function(e){var t=e.target,n=t.name,a=t.value;"email"===n?r(a):"password"===n&&u(a)},y=function(){var e=Object(b.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!p){e.next=8;break}return e.next=5,h.createUserWithEmailAndPassword(n,o);case 5:a=e.sent,e.next=11;break;case 8:return e.next=10,h.signInWithEmailAndPassword(n,o);case 10:a=e.sent;case 11:console.log(a),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),v(e.t0.message);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("form",{onSubmit:y,className:"container",children:[Object(g.jsx)("input",{name:"email",type:"email",placeholder:"Email",required:!0,value:n,onChange:w,className:"authInput"}),Object(g.jsx)("input",{name:"password",type:"password",placeholder:"Password",required:!0,value:o,className:"authInput",onChange:w}),Object(g.jsx)("input",{type:"submit",className:"authInput authSubmit",value:p?"Create Account":"Sign In"}),x&&Object(g.jsx)("span",{className:"authError",children:x})]}),Object(g.jsx)("span",{onClick:function(){return f((function(e){return!e}))},className:"authSwitch",children:p?"Sign In":"Create Account"})]})},w=function(){var e=function(){var e=Object(b.a)(j.a.mark((function e(t){var n,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"google"===(n=t.target.name)?a=new O.auth.GoogleAuthProvider:"github"===n&&(a=new O.auth.GithubAuthProvider),e.next=4,h.signInWithPopup(a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{className:"authContainer",children:[Object(g.jsx)(d.a,{icon:p.c,color:"#04AAFF",size:"3x",style:{marginBottom:30}}),Object(g.jsx)(v,{}),Object(g.jsxs)("div",{className:"authBtns",children:[Object(g.jsxs)("button",{onClick:e,name:"google",className:"authBtn",children:["Continue with Google ",Object(g.jsx)(d.a,{icon:p.b})]}),Object(g.jsxs)("button",{onClick:e,name:"github",className:"authBtn",children:["Continue with Github ",Object(g.jsx)(d.a,{icon:p.a})]})]})]})},y=n(34),N=n(54),S=n(19),k=function(e){var t=e.userObj,n=e.nweetObj,r=e.isOwner,c=Object(a.useState)(!1),s=Object(i.a)(c,2),o=s[0],u=s[1],l=Object(a.useState)(n.text),p=Object(i.a)(l,2),f=p[0],O=p[1],h=Object(a.useState)(n.attachmentUrl),v=Object(i.a)(h,2),w=v[0],y=v[1],k=Object(a.useState)(""),I=Object(i.a)(k,2),U=I[0],C=I[1],F=function(){var e=Object(b.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you wnat to delete this nweet?")){e.next=7;break}return e.next=4,m.doc("nweets/".concat(n.id)).delete();case 4:if(""===n.attachmentUrl){e.next=7;break}return e.next=7,x.refFromURL(n.attachmentUrl).delete();case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){return u((function(e){return!e}))},_=function(){var e=Object(b.a)(j.a.mark((function e(a){var r,c,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r="",a.preventDefault(),""===w){e.next=6;break}return console.log("storage delete"),e.next=6,x.refFromURL(n.attachmentUrl).delete();case 6:if(""===U){e.next=18;break}return console.log("newAttachment is there"),c=x.ref().child("".concat(t.uid,"/").concat(Object(N.a)())),e.next=11,c.putString(U,"data_url");case 11:return s=e.sent,e.next=14,s.ref.getDownloadURL();case 14:r=e.sent,y(r),e.next=21;break;case 18:console.log("newAttachment is not"),console.log(r),y("");case 21:return e.next=23,m.doc("nweets/".concat(n.id)).update({text:f,attachmentUrl:r});case 23:u(!1),C("");case 25:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsx)("div",{className:"nweet",children:o?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("form",{onSubmit:_,className:"container nweetEdit",children:[Object(g.jsx)("input",{type:"text",placeholder:"Edit your nweet",value:f,required:!0,autoFocus:!0,onChange:function(e){var t=e.target.value;O(t)},className:"formInput"}),Object(g.jsx)("input",{type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onloadend=function(e){var t=e.currentTarget.result;C(t)},null!==t?(console.log("theFile is not null"),n.readAsDataURL(t)):(console.log("theFile is null"),C(""))},className:"formInput"}),Object(g.jsx)("input",{type:"submit",value:"Update Nweet",className:"formBtn"})]}),Object(g.jsx)("span",{onClick:A,className:"formBtn cancelBtn",children:"Cancel"})]}):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h4",{children:n.text}),n.attachmentUrl&&Object(g.jsx)("img",{src:n.attachmentUrl}),r&&Object(g.jsxs)("div",{class:"nweet__actions",children:[Object(g.jsx)("span",{onClick:F,children:Object(g.jsx)(d.a,{icon:S.d})}),Object(g.jsx)("span",{onClick:A,children:Object(g.jsx)(d.a,{icon:S.a})})]})]})})},I=function(e){var t=e.userObj,n=Object(a.useState)(""),r=Object(i.a)(n,2),c=r[0],s=r[1],o=Object(a.useState)(""),u=Object(i.a)(o,2),l=u[0],p=u[1],f=Object(a.useRef)(),O=function(){var e=Object(b.a)(j.a.mark((function e(n){var a,r,i,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==c){e.next=2;break}return e.abrupt("return");case 2:if(n.preventDefault(),a="",""===l){e.next=12;break}return r=x.ref().child("".concat(t.uid,"/").concat(Object(N.a)())),e.next=8,r.putString(l,"data_url");case 8:return i=e.sent,e.next=11,i.ref.getDownloadURL();case 11:a=e.sent;case 12:return o={text:c,createAt:Date.now(),creatorId:t.uid,attachmentUrl:a},e.next=15,m.collection("nweets").add(o);case 15:s(""),p(""),f.current.value="";case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("form",{onSubmit:O,className:"factoryForm",children:[Object(g.jsxs)("div",{className:"factoryInput__container",children:[Object(g.jsx)("input",{className:"factoryInput__input",value:c,onChange:function(e){var t=e.target.value;s(t)},type:"text",placeholder:"What's on your mind?",maxLength:120}),Object(g.jsx)("input",{type:"submit",value:"\u2192",className:"factoryInput__arrow"})]}),Object(g.jsxs)("label",{for:"attach-file",className:"factoryInput__label",children:[Object(g.jsx)("span",{children:"Add photos"}),Object(g.jsx)(d.a,{icon:S.b})]}),Object(g.jsx)("input",{id:"attach-file",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onloadend=function(e){var t=e.currentTarget.result;p(t)},null!=t?n.readAsDataURL(t):p("")},style:{opacity:0}}),l&&Object(g.jsxs)("div",{className:"factoryForm__attachment",children:[Object(g.jsx)("img",{src:l,style:{backgroundImage:l}}),Object(g.jsxs)("div",{className:"factoryForm__clear",onClick:function(){return p("")},children:[Object(g.jsx)("span",{children:"Remove"}),Object(g.jsx)(d.a,{icon:S.c})]})]})]})},U=function(e){var t=e.userObj,n=Object(a.useState)([]),r=Object(i.a)(n,2),c=r[0],s=r[1];return Object(a.useEffect)((function(){m.collection("nweets").orderBy("createAt","desc").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(y.a)({id:e.id},e.data())}));s(t),console.log(t)}))}),[]),Object(g.jsxs)("div",{className:"container",children:[Object(g.jsx)(I,{userObj:t}),Object(g.jsx)("div",{style:{marginTop:30},children:c.map((function(e){return Object(g.jsx)(k,{nweetObj:e,isOwner:e.creatorId===t.uid,userObj:t},e.id)}))})]})},C=function(e){e.refreshUser;var t=e.userObj,n=Object(u.f)(),r=Object(a.useState)(t.displayName),c=Object(i.a)(r,2),s=c[0],o=c[1],l=function(){var e=Object(b.a)(j.a.mark((function e(n){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),t.displayName===s){e.next=4;break}return e.next=4,t.updateProfile({displayName:s});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{className:"container",children:[Object(g.jsxs)("form",{onSubmit:l,className:"profileForm",children:[Object(g.jsx)("input",{onChange:function(e){var t=e.target.value;o(t)},type:"text",autoFocus:!0,placeholder:"Display name",value:s,className:"formInput"}),Object(g.jsx)("input",{type:"submit",value:"Update Profile",className:"formBtn",style:{marginTop:10}})]}),Object(g.jsx)("span",{className:"formBtn cancelBtn logOut",onClick:function(){h.signOut(),n.push("/")},children:"Log Out"})]})},F=function(e){var t=e.userObj;return Object(g.jsx)("nav",{children:Object(g.jsxs)("ul",{style:{display:"flex",justifyContent:"center",marginTop:50},children:[Object(g.jsx)("li",{children:Object(g.jsx)(o.b,{to:"/",style:{marginRight:10},children:Object(g.jsx)(d.a,{icon:p.c,color:"#04AAFF",size:"2x"})})}),Object(g.jsx)("li",{children:Object(g.jsxs)(o.b,{to:"/profile",style:{marginLeft:10,display:"flex",flexDirection:"column",alignItems:"center",fontSize:12},children:[Object(g.jsx)(d.a,{icon:S.e,color:"#04AAFF",size:"2x"}),Object(g.jsx)("span",{style:{marginTop:10},children:t.displayName?"".concat(t.displayName,"\uc758 Profile"):"Profile"})]})})]})})},A=function(e){var t=e.refreshUser,n=e.isLoggedIn,a=e.userObj;return Object(g.jsxs)(o.a,{children:[n&&Object(g.jsx)(F,{userObj:a}),Object(g.jsx)(u.c,{children:n?Object(g.jsxs)("div",{style:{maxWidth:890,width:"100%",margin:"0 auto",marginTop:80,display:"flex",justifyContent:"center"},children:[Object(g.jsx)(u.a,{exact:!0,path:"/",children:Object(g.jsx)(U,{userObj:a})}),Object(g.jsx)(u.a,{exact:!0,path:"/profile",children:Object(g.jsx)(C,{userObj:a,refreshUser:t})})]}):Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(u.a,{exact:!0,path:"/",children:Object(g.jsx)(w,{})})})})]})};var _=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),s=Object(i.a)(c,2),o=s[0],u=s[1];return Object(a.useEffect)((function(){h.onAuthStateChanged((function(e){u(e?{displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)}}:null),r(!0)}))}),[]),Object(g.jsx)(g.Fragment,{children:n?Object(g.jsx)(A,{refreshUser:function(){var e=h.currentUser;u({displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)}})},isLoggedIn:Boolean(o),userObj:o}):"Initializing..."})};n(50);s.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(_,{})}),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.7ecf65b5.chunk.js.map