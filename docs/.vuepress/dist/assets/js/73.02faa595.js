(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{346:function(e,t,r){"use strict";r.r(t);var a=r(6),s=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"常见问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常见问题"}},[e._v("#")]),e._v(" 常见问题")]),e._v(" "),t("h2",{attrs:{id:"_1-vue3-0-里为什么要用-proxy-api-替代-defineproperty-api"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-vue3-0-里为什么要用-proxy-api-替代-defineproperty-api"}},[e._v("#")]),e._v(" 1. Vue3.0 里为什么要用 Proxy API 替代 defineProperty API？")]),e._v(" "),t("p",[e._v("Object.defineProperty 只能通过遍历对象属性的方式进行数据劫持，而 Proxy 则直接可以劫持整个对象，相当于我们直接操作这个对象就可以达到相应式目的；除此之外，除此之外 Object.defineProperty API，只能劫持 getter 和 setter，Proxy 除 getter 和 setter 外还可以劫持 "),t("code",[e._v("apply")]),e._v("、"),t("code",[e._v("has")]),e._v(" 等 13 种劫持方法")]),e._v(" "),t("h2",{attrs:{id:"_2-vue3-响应式实现原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-vue3-响应式实现原理"}},[e._v("#")]),e._v(" 2. Vue3 响应式实现原理")]),e._v(" "),t("p",[e._v("通过 Proxy(代理)：拦截对象中任意属性的变化，包括属性值的填写,属性值的添加，删除操作。\n通过 Reflect(反射)：对源对象的属性进行操作")]),e._v(" "),t("h2",{attrs:{id:"_3-ref-和-reative-到底有什么区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-ref-和-reative-到底有什么区别"}},[e._v("#")]),e._v(" 3. ref 和 reative 到底有什么区别？")]),e._v(" "),t("p",[e._v("vue3 利用 proxy 实现响应式，而 proxy 不能代理基础类型，vue3 就只能给他包装成一个对象再进行代理，所以大家可以看到基础类型变成响应式读取值的时候需要.value 啦")])])}),[],!1,null,null,null);t.default=s.exports}}]);