(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-084a"],{"8ab2":function(e,r,t){"use strict";var n=t("c86a"),i=t.n(n);i.a},"8dd2":function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("Table",{attrs:{loading:e.orderListLoading,columns:e.orderColumns,data:e.orderData,size:"large"}}),t("Page",{staticStyle:{"margin-top":"10px"},attrs:{total:e.totalCount,"show-total":""},on:{"on-change":e.changePage}})],1)},i=[],o=(t("cadf"),t("551c"),t("097d"),{name:"offline_order_page",data:function(){var e=this;return{totalCount:0,orderListLoading:!0,orderColumns:[{title:"序号",key:"index",width:70,align:"center",render:function(e,r){return e("div",r.row._index+1)}},{title:"用户名",key:"name",render:function(e,r){return e("div",r.row.user.username)}},{title:"申请数量",key:"applicationNumber",render:function(e,r){return e("div",r.row.order.quantity)}},{title:"支付金额",key:"paidFee",render:function(e,r){return e("div",r.row.order.paidFee)}},{title:"申请时间",key:"applicationTime",render:function(e,r){return e("div",r.row.order.createTime.substring(0,10)+" "+r.row.order.createTime.substring(11,16))}},{title:"联系电话",key:"phone",render:function(e,r){return e("div",r.row.userAddress.mobile)}},{title:"支付确认",key:"action",width:140,align:"center",render:function(r,t){return r("div",[r("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.payFinishOrder(t.row.order.id,1)}}},"确认"),r("Button",{props:{type:"error",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.payFinishOrder(t.row.order.id,2)}}},"取消")])}}],orderData:[]}},created:function(){this.queryOfflineOrder()},methods:{queryOfflineOrder:function(e){var r=this;this.$api.queryOfflineOrder({pageNo:e||1,pageSize:10}).then(function(e){200===e.code?(r.orderData=e.data.items,r.totalCount=e.data.totalCount,r.orderListLoading=!1):console.log(e)})},payFinishOrder:function(e,r){var t=this;this.$api.payFinishOrder({orderId:e,audit:r}).then(function(e){200===e.code?(t.$Message.success("处理成功"),t.queryOfflineOrder()):console.log(e)})},changePage:function(e){this.orderListLoading=!0,this.queryOfflineOrder(e)}}}),a=o,d=(t("8ab2"),t("2877")),s=Object(d["a"])(a,n,i,!1,null,null,null);s.options.__file="offline-order.vue";r["default"]=s.exports},c86a:function(e,r,t){}}]);