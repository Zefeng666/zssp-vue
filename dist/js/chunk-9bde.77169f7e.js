(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9bde"],{"42c5":function(t,r,e){"use strict";var i=e("cdf4"),n=e.n(i);n.a},"7a0c":function(t,r,e){"use strict";e.r(r);var i=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[e("Table",{attrs:{loading:t.withdrawListLoading,columns:t.withdrawColumns,data:t.withdrawData,size:"large"}}),e("Page",{staticStyle:{"margin-top":"10px"},attrs:{total:t.totalCount,"show-total":""},on:{"on-change":t.changePage}})],1)},n=[],a={name:"withdrawal_record_page",data:function(){return{totalCount:0,withdrawListLoading:!0,withdrawColumns:[{title:"序号",key:"index",render:function(t,r){return t("div",r.row._index+1)}},{title:"用户名",key:"name",width:120,render:function(t,r){return t("div",r.row.user.username)}},{title:"提现积分",width:100,key:"applicationNumber",render:function(t,r){return t("div",r.row.withdraws.quantity)}},{title:"申请时间",key:"applyTime",render:function(t,r){var e=new Date(r.row.withdraws.createTime);return t("div",e.toLocaleString())}},{title:"银行",key:"point",render:function(t,r){return t("div",r.row.userBankCard[0].cardKind)}},{title:"银行卡号",key:"point",render:function(t,r){return t("div",r.row.userBankCard[0].cardId)}},{title:"持卡人",key:"cardHolder",render:function(t,r){return t("div",r.row.userBankCard[0].cardHolder)}},{title:"审核",key:"agree",width:80,render:function(t,r){return 1===r.row.withdraws.isAudit?t("div","同意"):t("div","未同意")}}],withdrawData:[]}},created:function(){this.queryWithdrawHistory()},methods:{queryWithdrawHistory:function(t){var r=this;this.$api.queryWithdrawHistory({pageNo:t||1,pageSize:10}).then(function(t){200===t.code?(r.withdrawData=t.data.items,r.totalCount=t.data.totalCount,r.withdrawListLoading=!1):console.log(t)})},changePage:function(t){this.withdrawListLoading=!0,this.queryWithdrawHistory(t)}}},d=a,o=(e("42c5"),e("2877")),u=Object(o["a"])(d,i,n,!1,null,null,null);u.options.__file="withdrawal-record.vue";r["default"]=u.exports},cdf4:function(t,r,e){}}]);