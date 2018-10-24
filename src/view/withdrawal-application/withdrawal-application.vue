<template>
  <div>
    <Table :loading="withdrawListLoading" :columns='withdrawColumns' :data='withdrawData' size='large'></Table>
    <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
  </div>
</template>

<script>
export default {
  name: 'withdrawal_application_page',
  data () {
    return {
      totalCount: 0,
      withdrawListLoading: true,
      withdrawColumns: [
        {
          title: '序号',
          key: 'index',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row._index + 1)
          }
        },
        {
          title: '用户名',
          key: 'name',
          render: (h, params) => {
            return h('div', params.row.user.username)
          }
        },
        {
          title: '手机号',
          key: 'phone',
          render: (h, params) => {
            return h('div', params.row.user.mobile)
          }
        },
        {
          title: '提现积分',
          key: 'applicationNumber',
          render: (h, params) => {
            return h('div', params.row.withdraws.quantity)
          }
        },
        {
          title: '申请时间',
          key: 'applyTime',
          render: (h, params) => {
            return h('div', params.row.withdraws.createTime.substring(0, 10) + ' ' + params.row.withdraws.createTime.substring(11, 16))
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
          title: '编辑',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.auditWithdraw(params.row.withdraws.id, 1)
                    }
                  }
                },
                '同意'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '警告',
                        content: '确定不同意这条申请吗？',
                        onOk: () => {
                          this.auditWithdraw(params.row.withdraws.id, 2)
                        }
                      })
                    }
                  }
                },
                '不同意'
              )
            ])
          }
        }
      ],
      withdrawData: []
    }
  },
  created () {
    this.queryWithdraw()
  },
  methods: {
    queryWithdraw (page) {
      this.$api
        .queryWithdraw({
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
    auditWithdraw (id, audit) {
      this.$api
        .auditWithdraw({
          id: id,
          audit: audit
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('处理成功')
            this.queryWithdraw()
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.withdrawListLoading = true
      this.queryWithdraw(page)
    }
  }
}
</script>

<style>

</style>
