"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[671],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),f=r,m=d["".concat(s,".").concat(f)]||d[f]||p[f]||i;return n?a.createElement(m,o(o({ref:t},c),{},{components:n})):a.createElement(m,o({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9881:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return p}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1},s="Introduction",u={unversionedId:"intro",id:"intro",title:"Introduction",description:"React-TS-dataTable is a simple headless library that allows you to create and interact with tables. In its current form it gives you access to two functions:",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/React-TS-dataTable/docs/intro",editUrl:"https://github.com/Allandrow/React-TS-dataTable/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Call and Arguments",permalink:"/React-TS-dataTable/docs/useTable/call-and-arguments"}},c={},p=[{value:"Getting Started",id:"getting-started",level:2},{value:"Installation",id:"installation",level:3},{value:"Usage",id:"usage",level:2},{value:"useTable",id:"usetable",level:3},{value:"paginationWithSuspend",id:"paginationwithsuspend",level:3}],d={toc:p};function f(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"React-TS-dataTable is a simple headless library that allows you to create and interact with tables. In its current form it gives you access to two functions:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"one ",(0,i.kt)("strong",{parentName:"li"},"custom hook")," ",(0,i.kt)("inlineCode",{parentName:"li"},"useTable")," that will create an instance of a table and its interactible values/handlers"),(0,i.kt)("li",{parentName:"ul"},"one ",(0,i.kt)("strong",{parentName:"li"},"helper function")," ",(0,i.kt)("inlineCode",{parentName:"li"},"paginationWithSuspend")," that offers you more properties to customize your pagination components, coming in with overridable defaults.")),(0,i.kt)("p",null,"Built with TypeScript, it will provide you clear type definitions for your inputs and the different properties returned by the functions."),(0,i.kt)("h2",{id:"getting-started"},"Getting Started"),(0,i.kt)("h3",{id:"installation"},"Installation"),(0,i.kt)("p",null,"Via npm :"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"npm install react-ts-datatable\n")),(0,i.kt)("p",null,"Or Yarn :"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add react-ts-datatable\n")),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("p",null,"Here we'll briefly demonstrate how to use the different functions available, for more details consult the specific page for each function."),(0,i.kt)("h3",{id:"usetable"},"useTable"),(0,i.kt)("p",null,"To create a new table instance, simply call the custom hook while giving it an object containing at least two arrays (your columns and your data)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const instance = useTable({ columns, data })\n")),(0,i.kt)("p",null,"The call can also include a number array called ",(0,i.kt)("inlineCode",{parentName:"p"},"pageSizingOptions")," that is setup by default with ",(0,i.kt)("inlineCode",{parentName:"p"},"[10,20,50,100]")," values. If you want to change this behaviour, add the ",(0,i.kt)("inlineCode",{parentName:"p"},"pageSizingOptions")," property inside the argument object and give it a new number array as value."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const instance = useTable({ columns, data, pageSizingOptions: [10, 15, 20, 25, 30] })\n")),(0,i.kt)("h3",{id:"paginationwithsuspend"},"paginationWithSuspend"),(0,i.kt)("p",null,"This helper function will setup a new object with information regarding the pages to display, if you need suspension in the pagination and, if so, if the suspension happens before/after your page list."),(0,i.kt)("p",null,"To call the function you'll need to provide the pagination object that you will receive from the ",(0,i.kt)("inlineCode",{parentName:"p"},"useTable")," hook, or provide an object that shares the same structure. You can also provide a second object as argument that will allow you to override the default values."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const paginationRenderValues = paginationWithSuspend(pagination, userOptions)\n")))}f.isMDXComponent=!0}}]);