"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[733],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return m}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(a),m=r,h=c["".concat(s,".").concat(m)]||c[m]||d[m]||i;return a?n.createElement(h,l(l({ref:t},u),{},{components:a})):n.createElement(h,l({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},1302:function(e,t,a){a.r(t),a.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return d}});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),l=["components"],o={sidebar_position:1},s="Call and Arguments",p={unversionedId:"useTable/call-and-arguments",id:"useTable/call-and-arguments",title:"Call and Arguments",description:"When calling the useTable hook, you'll need to provide an object as argument. This object will contain 3 properties (1 is optional with default values) :",source:"@site/docs/useTable/call-and-arguments.md",sourceDirName:"useTable",slug:"/useTable/call-and-arguments",permalink:"/React-TS-dataTable/docs/useTable/call-and-arguments",editUrl:"https://github.com/Allandrow/React-TS-dataTable/docs/useTable/call-and-arguments.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/React-TS-dataTable/docs/intro"},next:{title:"Internal logic",permalink:"/React-TS-dataTable/docs/useTable/internal-logic"}},u={},d=[{value:"Properties details",id:"properties-details",level:2},{value:"Columns",id:"columns",level:3},{value:"Example",id:"example",level:4},{value:"Data",id:"data",level:3},{value:"Example",id:"example-1",level:4},{value:"PageSizingOptions",id:"pagesizingoptions",level:3}],c={toc:d};function m(e){var t=e.components,a=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"call-and-arguments"},"Call and Arguments"),(0,i.kt)("p",null,"When calling the ",(0,i.kt)("inlineCode",{parentName:"p"},"useTable")," hook, you'll need to provide an object as argument. This object will contain 3 properties (1 is optional with default values) :"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const instance = useTable({ columns, data, pageSizingOptions })\n")),(0,i.kt)("h2",{id:"properties-details"},"Properties details"),(0,i.kt)("p",null,"To properly build the table, the arrays you'll provide will need to respect a specific structure as described below :"),(0,i.kt)("h3",{id:"columns"},"Columns"),(0,i.kt)("p",null,"The columns array represent the information regarding each column of your table. Each item in the array will be an object (the column information) and will need to contain these properties :"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"interface DefaultColumn {\n  id: string\n  displayText: string\n  sortMethod?: string | Function\n}\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"id")," : the identifier for the column. This is the value that is used to match a value in your data rows to a specific column."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"displayText")," : the text that will be displayed in the headers of the table"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"sortMethod")," ",(0,i.kt)("em",{parentName:"li"},"(optional)")," : by default your column values will be compared as if they are strings. If this behaviour isn't what you intend for this column you can alter it by :",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"providing a new string value that is one of the built-in sort methods included in the hook (more info on internal-logic/sorting page)"),(0,i.kt)("li",{parentName:"ul"},"providing your own callback function that will be applied to the sort method of this column.")))),(0,i.kt)("h4",{id:"example"},"Example"),(0,i.kt)("p",null,"This is an example of a columns array that is used in the demo example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const columns = [\n  { id: 'firstName', displayText: 'First Name' },\n  { id: 'lastName', displayText: 'Last Name' },\n  { id: 'startDate', displayText: 'Start Date', sortMethod: 'sortDateISO' },\n  { id: 'department', displayText: 'Department' },\n  { id: 'dateOfBirth', displayText: 'Date of Birth', sortMethod: 'sortDateISO' },\n  { id: 'street', displayText: 'Street' },\n  { id: 'city', displayText: 'City' },\n  { id: 'state', displayText: 'State' },\n  { id: 'zipCode', displayText: 'Zip Code' },\n]\n")),(0,i.kt)("h3",{id:"data"},"Data"),(0,i.kt)("p",null,"The data array represents your raw data values. Each item in your data will be an object(a row in the table) and will need to respect this structe :"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typscript"},"  type DataProps = Record<string, unknown>\n\n  interface Data extends DataProps {\n    key: string\n  }\n")),(0,i.kt)("p",null,"Here, the ",(0,i.kt)("inlineCode",{parentName:"p"},"key")," property will be used for the key value of React Lists. For the other properties, if you want it to be displayed in the table you'll need to have a key that matches the id of a column, otherwise the value will not be picked up by the table."),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Be aware that in its current form this library doesn't handle nested values. Using data types other than primitives may end up causing issues."))),(0,i.kt)("h4",{id:"example-1"},"Example"),(0,i.kt)("p",null,"This is an example of an object inside the data array that is used in the demo example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const data = [\n  {\n    key: '0224353f-726b-497f-9e46-97dfd516d673',\n    firstName: 'Bernie',\n    lastName: 'Swindin',\n    department: 'Services',\n    dateOfBirth: '03/10/1988',\n    startDate: '08/18/2018',\n    street: '6 Schiller Drive',\n    city: 'Memphis',\n    state: 'TN',\n    zipCode: '38143',\n  },\n  // \u2026\n]\n")),(0,i.kt)("p",null,"Here you can notice that the only property that doesn't match a column id is the ",(0,i.kt)("strong",{parentName:"p"},"key")," property, thus it won't appear in the table and won't be used as a filterable value either."),(0,i.kt)("h3",{id:"pagesizingoptions"},"PageSizingOptions"),(0,i.kt)("p",null,"Optional array that allows you to specify the list of options for the number of rows displayed in a page.\nBy default the values are ",(0,i.kt)("inlineCode",{parentName:"p"},"[10, 20, 50, 100]")))}m.isMDXComponent=!0}}]);