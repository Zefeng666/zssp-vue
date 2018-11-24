<template>
  <div>
    <Table :loading="orderListLoading" :columns='orderColumns' :data='orderData' size='large'></Table>
    <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
  </div>
</template>

<script>
export default {
  name: 'upgrade_order_page',
  data () {
    return {
      totalCount: 0,
      orderListLoading: true,
      orderColumns: [
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
          title: '申请数量',
          key: 'applicationNumber',
          render: (h, params) => {
            return h('div', params.row.order.quantity)
          }
        },
        {
          title: '支付金额',
          key: 'applicationMoney',
          render: (h, params) => {
            return h('div', params.row.order.paidFee)
          }
        },
        {
          title: '申请时间',
          key: 'applicationTime',
          render: (h, params) => {
            return h('div', params.row.order.createTime.substring(0, 10) + ' ' + params.row.order.createTime.substring(11, 16))
          }
        },
        {
          title: '申请代理地区',
          key: 'agencyDistrict',
          render: (h, params) => {
            return h('div', params.row.order.address)
          }
        },
        {
          title: '收货人',
          key: 'contact',
          render: (h, params) => {
            return h('div', params.row.userAddress.contact)
          }
        },
        {
          title: '联系电话',
          key: 'phone',
          render: (h, params) => {
            return h('div', params.row.userAddress.mobile)
          }
        },
        {
          title: '发货地址',
          key: 'deliveryAddress',
          width: 200,
          render: (h, params) => {
            return h('div', params.row.userAddress.province + params.row.userAddress.city + params.row.userAddress.area + params.row.userAddress.detail)
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
                      this.auditUpgradeOrder(params.row.order.id, 1)
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
                          this.auditUpgradeOrder(params.row.order.id, 2)
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
      orderData: []
    }
  },
  created () {
    this.queryUpgradeOrder()
  },
  methods: {
    queryUpgradeOrder (page) {
      this.$api
        .queryUpgradeOrder({
          pageNo: page || 1,
          pageSize: 10
        })
        .then(data => {
          if (data.code === 200) {
            this.orderData = data.data.items
            this.totalCount = data.data.totalCount
            this.orderListLoading = false
          } else {
            console.log(data)
          }
        })
    },
    auditUpgradeOrder (id, audit) {
      this.$api
        .auditUpgradeOrder({
          id: id,
          audit: audit
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('处理成功')
            this.queryUpgradeOrder()
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.orderListLoading = true
      this.queryUpgradeOrder(page)
    }
  }
}
</script>

<style>

</style>
