!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.template=t():e.template=t()}("undefined"!=typeof self?self:this,function(){return function(n){function r(e){if(i[e])return i[e].exports;var t=i[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}var i={};return r.m=n,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,n){"use strict";var f=n(6),p=n(2),h=n(22),d=function(e,t){t.onerror(e,t);var n=function(){return"{Template Error}"};return n.mappings=[],n.sourcesContent=[],n},r=function r(e){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};"string"!=typeof e?i=e:i.source=e,e=(i=p.$extend(i)).source,!0===i.debug&&(i.cache=!1,i.minimize=!1,i.compileDebug=!0),i.compileDebug&&(i.minimize=!1),i.filename&&(i.filename=i.resolveFilename(i.filename,i));var t=i.filename,n=i.cache,o=i.caches;if(n&&t){var s=o.get(t);if(s)return s}if(!e)try{e=i.loader(t,i),i.source=e}catch(e){var a=new h({name:"CompileError",path:t,message:"template not found: "+e.message,stack:e.stack});if(i.bail)throw a;return d(a,i)}var u=void 0,c=new f(i);try{u=c.build()}catch(a){if(a=new h(a),i.bail)throw a;return d(a,i)}var l=function(t,n){try{return u(t,n)}catch(e){if(!i.compileDebug)return i.cache=!1,i.compileDebug=!0,r(i)(t,n);if(e=new h(e),i.bail)throw e;return d(e,i)()}};return l.mappings=u.mappings,l.sourcesContent=u.sourcesContent,l.toString=function(){return u.toString()},n&&t&&o.set(t,l),l};r.Compiler=f,e.exports=r},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g,t.matchToToken=function(e){var t={type:"invalid",value:e[0]};return e[1]?(t.type="string",t.closed=!(!e[3]&&!e[4])):e[5]?t.type="comment":e[6]?(t.type="comment",t.closed=!!e[7]):e[8]?t.type="regex":e[9]?t.type="number":e[10]?t.type="name":e[11]?t.type="punctuator":e[12]&&(t.type="whitespace"),t}},function(e,t,n){"use strict";function r(){this.$extend=function(e){return o(e=e||{},e instanceof r?e:this)}}var i=n(10),o=n(12),s=n(13),a=n(14),u=n(15),c=n(16),l=n(17),f=n(18),p=n(19),h=n(21),d={source:null,filename:null,rules:[f,l],escape:!0,debug:!!("undefined"==typeof window)&&"production"!==process.env.NODE_ENV,bail:!0,cache:!0,minimize:!0,compileDebug:!1,resolveFilename:h,include:s,htmlMinifier:p,htmlMinifierOptions:{collapseWhitespace:!0,minifyCSS:!0,minifyJS:!0,ignoreCustomFragments:[]},onerror:a,loader:c,caches:u,root:"/",extname:".art",ignore:[],imports:i};r.prototype=d,e.exports=new r},function(e,t){},function(e,t,n){"use strict";var r=n(5),i=n(0),o=n(23),s=function(e,t){return t instanceof Object?r({filename:e},t):i({filename:e,source:t})};s.render=r,s.compile=i,s.defaults=o,e.exports=s},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r(e,n)(t)}},function(e,t,n){"use strict";function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),i=n(7),b=n(9),w="$data",x="$imports",l="print",k="include",$="extend",f="block",T="$$out",E="$$line",O="$$blocks",p="$$slice",j="$$from",_="$$options",S=function(e,t){return Object.hasOwnProperty.call(e,t)},C=JSON.stringify,o=function(){function a(e){var t,n,r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var i=e.source,o=e.minimize,s=e.htmlMinifier;if(this.options=e,this.stacks=[],this.context=[],this.scripts=[],this.CONTEXT_MAP={},this.ignore=[w,x,_].concat(c(e.ignore)),this.internal=(u(t={},T,"''"),u(t,E,"[0,0]"),u(t,O,"arguments[1]||{}"),u(t,j,"null"),u(t,l,"function(){var s=''.concat.apply('',arguments);$$out+=s;return s}"),u(t,k,"function(src,data){var s="+_+".include(src,data||"+w+",arguments[2]||"+O+","+_+");"+T+"+=s;return s}"),u(t,$,"function(from){$$from=from}"),u(t,p,"function(c,p,s){p=$$out;$$out='';c();s=$$out;$$out=p+s;return s}"),u(t,f,"function(){var a=arguments,s;if(typeof a[0]==='function'){return "+p+"(a[0])}else if("+j+"){if(!"+O+"[a[0]]){"+O+"[a[0]]="+p+"(a[1])}else{"+T+"+="+O+"[a[0]]}}else{s="+O+"[a[0]];if(typeof s==='string'){"+T+"+=s}else{s="+p+"(a[1])}return s}}"),t),this.dependencies=(u(n={},l,[T]),u(n,k,[T,_,w,O]),u(n,$,[j,k]),u(n,f,[p,j,T,O]),n),this.importContext(T),e.compileDebug&&this.importContext(E),o)try{i=s(i,e)}catch(e){}this.source=i,this.getTplTokens(i,e.rules,this).forEach(function(e){e.type===b.TYPE_STRING?r.parseString(e):r.parseExpression(e)})}return r(a,[{key:"getTplTokens",value:function(){return b.apply(void 0,arguments)}},{key:"getEsTokens",value:function(e){return i(e)}},{key:"getVariables",value:function(e){var t=!1;return e.filter(function(e){return"whitespace"!==e.type&&"comment"!==e.type}).filter(function(e){return"name"===e.type&&!t||(t="punctuator"===e.type&&"."===e.value,!1)}).map(function(e){return e.value})}},{key:"importContext",value:function(e){var t=this,n="",r=this.internal,i=this.dependencies,o=this.ignore,s=this.context,a=this.options.imports,u=this.CONTEXT_MAP;S(u,e)||-1!==o.indexOf(e)||(S(r,e)?(n=r[e],S(i,e)&&i[e].forEach(function(e){return t.importContext(e)})):n="$escape"===e||"$each"===e||S(a,e)?x+"."+e:w+"."+e,u[e]=n,s.push({name:e,value:n}))}},{key:"parseString",value:function(e){var t=e.value;if(t){var n=T+"+="+C(t);this.scripts.push({source:t,tplToken:e,code:n})}}},{key:"parseExpression",value:function(e){var t=this,n=e.value,r=e.script,i=r.output,o=this.options.escape,s=r.code;i&&(s=!1===o||i===b.TYPE_RAW?T+"+="+r.code:T+"+=$escape("+r.code+")");var a=this.getEsTokens(s);this.getVariables(a).forEach(function(e){return t.importContext(e)}),this.scripts.push({source:n,tplToken:e,code:s})}},{key:"checkExpression",value:function(e){for(var t=[[/^\s*}[\w\W]*?{?[\s;]*$/,""],[/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/,"$1})"],[/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/,"$1}"]],n=0;n<t.length;){if(t[n][0].test(e)){var r;e=(r=e).replace.apply(r,c(t[n]));break}n++}try{return new Function(e),!0}catch(e){return!1}}},{key:"build",value:function(){var e=this.options,t=this.context,n=this.scripts,o=this.stacks,r=this.source,i=e.filename,s=e.imports,a=[],u=S(this.CONTEXT_MAP,$),c=0,l=function(e,t){var n=t.line,r=t.start,i={generated:{line:o.length+c+1,column:1},original:{line:n+1,column:r+1}};return c+=e.split(/\n/).length-1,i},f=function(e){return e.replace(/^[\t ]+|[\t ]$/g,"")};o.push("function("+w+"){"),o.push("'use strict'"),o.push(w+"="+w+"||{}"),o.push("var "+t.map(function(e){return e.name+"="+e.value}).join(",")),e.compileDebug?(o.push("try{"),n.forEach(function(e){e.tplToken.type===b.TYPE_EXPRESSION&&o.push(E+"=["+[e.tplToken.line,e.tplToken.start].join(",")+"]"),a.push(l(e.code,e.tplToken)),o.push(f(e.code))}),o.push("}catch(error){"),o.push("throw {"+["name:'RuntimeError'","path:"+C(i),"message:error.message","line:$$line[0]+1","column:$$line[1]+1","source:"+C(r),"stack:error.stack"].join(",")+"}"),o.push("}")):n.forEach(function(e){a.push(l(e.code,e.tplToken)),o.push(f(e.code))}),u&&(o.push(T+"=''"),o.push(k+"("+j+","+w+","+O+")")),o.push("return "+T),o.push("}");var p=o.join("\n");try{var h=new Function(x,_,"return "+p)(s,e);return h.mappings=a,h.sourcesContent=[r],h}catch(e){for(var d=0,m=0,v=0,g=void 0;d<n.length;){var y=n[d];if(!this.checkExpression(y.code)){m=y.tplToken.line,v=y.tplToken.start,g=y.code;break}d++}throw{name:"CompileError",path:i,message:e.message,line:m+1,column:v+1,source:r,generated:g,stack:e.stack}}}}]),a}();o.CONSTS={DATA:w,IMPORTS:x,PRINT:l,INCLUDE:k,EXTEND:$,BLOCK:f,OPTIONS:_,OUT:T,LINE:E,BLOCKS:O,SLICE:p,FROM:j,ESCAPE:"$escape",EACH:"$each"},e.exports=o},function(e,t,n){"use strict";var r=n(8),i=n(1).default,o=n(1).matchToToken;e.exports=function(e){return e.match(i).map(function(e){return i.lastIndex=0,o(i.exec(e))}).map(function(e){return"name"===e.type&&r(e.value)&&(e.type="keyword"),e})}},function(e,t,n){"use strict";var r={abstract:!0,await:!0,boolean:!0,break:!0,byte:!0,case:!0,catch:!0,char:!0,class:!0,const:!0,continue:!0,debugger:!0,default:!0,delete:!0,do:!0,double:!0,else:!0,enum:!0,export:!0,extends:!0,false:!0,final:!0,finally:!0,float:!0,for:!0,function:!0,goto:!0,if:!0,implements:!0,import:!0,in:!0,instanceof:!0,int:!0,interface:!0,let:!0,long:!0,native:!0,new:!0,null:!0,package:!0,private:!0,protected:!0,public:!0,return:!0,short:!0,static:!0,super:!0,switch:!0,synchronized:!0,this:!0,throw:!0,transient:!0,true:!0,try:!0,typeof:!0,var:!0,void:!0,volatile:!0,while:!0,with:!0,yield:!0};e.exports=function(e){return r.hasOwnProperty(e)}},function(e,t,n){"use strict";function g(e,t,n){this.type=e,this.value=t,this.script=null,n?(this.line=n.line+n.value.split(/\n/).length-1,this.line===n.line?this.start=n.end:this.start=n.value.length-n.value.lastIndexOf("\n")-1):(this.line=0,this.start=0),this.end=this.start+this.value.length}var r=function(e,t){for(var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},r=[new g("string",e)],i=0;i<t.length;i++)for(var o=t[i],s=o.test.ignoreCase?"ig":"g",a=new RegExp(o.test.source,s),u=0;u<r.length;u++){var c=r[u],l=r[u-1];if("string"===c.type){for(var f=void 0,p=0,h=[],d=c.value;null!==(f=a.exec(d));)f.index>p&&(l=new g("string",d.slice(p,f.index),l),h.push(l)),l=new g("expression",f[0],l),f[0]=(m=l,v=void 0,(v=new String(m.value)).line=m.line,v.start=m.start,v.end=m.end,v),l.script=o.use.apply(n,f),h.push(l),p=f.index+f[0].length;p<d.length&&(l=new g("string",d.slice(p),l),h.push(l)),r.splice.apply(r,[u,1].concat(h)),u+=h.length-1}}var m,v;return r};r.TYPE_STRING="string",r.TYPE_EXPRESSION="expression",r.TYPE_RAW="raw",r.TYPE_ESCAPE="escape",e.exports=r},function(r,e,t){"use strict";(function(e){var t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:{},n=Object.create(t),a=/["&'<>]/;n.$escape=function(e){return function(e){var t=""+e,n=a.exec(t);if(!n)return e;var r="",i=void 0,o=void 0,s=void 0;for(i=n.index,o=0;i<t.length;i++){switch(t.charCodeAt(i)){case 34:s="&#34;";break;case 38:s="&#38;";break;case 39:s="&#39;";break;case 60:s="&#60;";break;case 62:s="&#62;";break;default:continue}o!==i&&(r+=t.substring(o,i)),o=i+1,r+=s}return o!==i?r+t.substring(o,i):r}(function e(t){return"string"!=typeof t&&(t=null==t?"":"function"==typeof t?e(t.call(t)):JSON.stringify(t)),t}(e))},n.$each=function(e,t){if(Array.isArray(e))for(var n=0,r=e.length;n<r;n++)t(e[n],n);else for(var i in e)t(e[i],i)},r.exports=n}).call(e,t(11))},function(Rd,Sd){var Td;Td=function(){return this}();try{Td=Td||Function("return this")()||eval("this")}catch(e){"object"==typeof window&&(Td=window)}Rd.exports=Td},function(e,t,n){"use strict";var a=Object.prototype.toString;e.exports=function e(t,n){var r,i=void 0,o=null===(r=t)?"Null":a.call(r).slice(8,-1);if("Object"===o?i=Object.create(n||{}):"Array"===o&&(i=[].concat(n||[])),i){for(var s in t)Object.hasOwnProperty.call(t,s)&&(i[s]=e(t[s],i[s]));return i}return t}},function(e,t,i){"use strict";e.exports=function(e,t,n,r){return i(0)(r=r.$extend({filename:r.resolveFilename(e,r),bail:!0,source:null}))(t,n)}},function(e,t,n){"use strict";e.exports=function(e){console.error(e.name,e.message)}},function(e,t,n){"use strict";var r={__data:Object.create(null),set:function(e,t){this.__data[e]=t},get:function(e){return this.__data[e]},reset:function(){this.__data={}}};e.exports=r},function(e,t,n){"use strict";var r="undefined"==typeof window;e.exports=function(e){if(r)return n(3).readFileSync(e,"utf8");var t=document.getElementById(e);return t.value||t.innerHTML}},function(e,t,n){"use strict";var d={test:/{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,use:function(n,e,t,r){var i=this.options,o=this.getEsTokens(r),s=o.map(function(e){return e.value}),a={},u=void 0,c=!!e&&"raw",l=t+s.shift(),f=function(e,t){console.warn((i.filename||"anonymous")+":"+(n.line+1)+":"+(n.start+1)+"\nTemplate upgrade: {{"+e+"}} -> {{"+t+"}}")};switch("#"===e&&f("#value","@value"),l){case"set":r="var "+s.join("").trim();break;case"if":r="if("+s.join("").trim()+"){";break;case"else":var p=s.indexOf("if");r=~p?(s.splice(0,p+1),"}else if("+s.join("").trim()+"){"):"}else{";break;case"/if":r="}";break;case"each":(u=d._split(o)).shift(),"as"===u[1]&&(f("each object as value index","each object value index"),u.splice(1,1)),r="$each("+(u[0]||"$data")+",function("+(u[1]||"$value")+","+(u[2]||"$index")+"){";break;case"/each":r="})";break;case"block":(u=d._split(o)).shift(),r="block("+u.join(",").trim()+",function(){";break;case"/block":r="})";break;case"echo":l="print",f("echo value","value");case"print":case"include":case"extend":if(0!==s.join("").trim().indexOf("(")){(u=d._split(o)).shift(),r=l+"("+u.join(",")+")";break}default:if(~s.indexOf("|")){var h=o.reduce(function(e,t){var n=t.value,r=t.type;return"|"===n?e.push([]):"whitespace"!==r&&"comment"!==r&&(e.length||e.push([]),":"===n&&1===e[e.length-1].length?f("value | filter: argv","value | filter argv"):e[e.length-1].push(t)),e},[]).map(function(e){return d._split(e)});r=h.reduce(function(e,t){var n=t.shift();return t.unshift(e),"$imports."+n+"("+t.join(",")+")"},h.shift().join(" ").trim())}c=c||"escape"}return a.code=r,a.output=c,a},_split:function(e){for(var t=0,n=(e=e.filter(function(e){var t=e.type;return"whitespace"!==t&&"comment"!==t})).shift(),r=/\]|\)/,i=[[n]];t<e.length;){var o=e[t];"punctuator"===o.type||"punctuator"===n.type&&!r.test(n.value)?i[i.length-1].push(o):i.push([o]),n=o,t++}return i.map(function(e){return e.map(function(e){return e.value}).join("")})}};e.exports=d},function(e,t,n){"use strict";e.exports={test:/<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,use:function(e,t,n,r){return n={"-":"raw","=":"escape","":!1,"==":"raw","=#":"raw"}[n],t&&(r="/*"+r+"*/",n=!1),{code:r,output:n}}}},function(e,t,s){"use strict";var a="undefined"==typeof window;e.exports=function(e,t){if(a){var n,r=s(20).minify,i=t.htmlMinifierOptions,o=t.rules.map(function(e){return e.test});(n=i.ignoreCustomFragments).push.apply(n,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(o)),e=r(e,i)}return e}},function(e,t){("object"==typeof e&&"object"==typeof e.exports?e.exports:window).noop=function(){}},function(e,t,a){"use strict";var u="undefined"==typeof window,c=/^\.+\//;e.exports=function(e,t){if(u){var n=a(3),r=t.root,i=t.extname;if(c.test(e)){var o=t.filename,s=o&&e!==o?n.dirname(o):r;e=n.resolve(s,e)}else e=n.resolve(r,e);n.extname(e)||(e+=i)}return e}},function(e,t,n){"use strict";var r=function(e){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e.message));return t.name="TemplateError",t.message=function(e){var t=e.name,n=e.source,r=e.path,i=e.line,o=e.column,s=e.generated,a=e.message;if(!n)return a;var u=n.split(/\n/),c=Math.max(i-3,0),l=Math.min(u.length,i+3),f=u.slice(c,l).map(function(e,t){var n=t+c+1;return(n===i?" >> ":"    ")+n+"| "+e}).join("\n");return(r||"anonymous")+":"+i+":"+o+"\n"+f+"\n\n"+t+": "+a+(s?"\n   generated: "+s:"")}(e),Error.captureStackTrace&&Error.captureStackTrace(t,t.constructor),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,Error),n}();e.exports=r},function(e,t,n){"use strict";e.exports=n(2)}])});