<template>
  <div>
    <Table :loading="withdrawListLoading" :columns='withdrawColumns' :data='withdrawData' size='large'></Table>
    <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
  </div>
</template>

<script>
export default {
  name: 'withdrawal_record_page',
  data () {
    return {
      totalCount: 0,
      withdrawListLoading: true,
      withdrawColumns: [
        {
          title: '序号',
          key: 'index',
          render: (h, params) => {
            return h('div', params.row._index + 1)
          }
        },
        {
          title: '用户名',
          key: 'name',
          width: 120,
          render: (h, params) => {
            return h('div', params.row.user.username)
          }
        },
        {
          title: '提现积分',
          width: 100,
          key: 'applicationNumber',
          render: (h, params) => {
            return h('div', params.row.withdraws.quantity)
          }
        },
        {
          title: '申请时间',
          key: 'applyTime',
          render: (h, params) => {
            let d = new Date(params.row.withdraws.createTime)
            return h('div', d.toLocaleString())
          }
        },
        {
          title: '银行',
          key: 'point',
          render: (h, params) => {
            return h('div', params.row.userBankCard[0].cardKind)
          }
        },
        {
          title: '银行卡号',
          key: 'point',
          render: (h, params) => {
            return h('div', params.row.userBankCard[0].cardId)
          }
        },
        {
          title: '持卡人',
          key: 'cardHolder',
          render: (h, params) => {
            return h('div', params.row.userBankCard[0].cardHolder)
          }
        },
        {
          title: '审核',
          key: 'agree',
          width: 80,
          render: (h, params) => {
            if (params.row.withdraws.isAudit === 1) {
              return h('div', '同意')
            } else {
              return h('div', '未同意')
            }
          }
        }
      ],
      withdrawData: []
    }
  },
  created () {
    this.queryWithdrawHistory()
  },
  methods: {
    queryWithdrawHistory (page) {
      this.$api
        .queryWithdrawHistory({
          pageNo: page || 1,
          pageSize: 10
        })
        .then(data => {
          if (data.code === 200) {
            this.withdrawData = data.data.items
            this.totalCount = data.data.totalCount
            this.withdrawListLoading = false
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.withdrawListLoading = true
      this.queryWithdrawHistory(page)
    }
  }
}
</script>

<style>

</style>
