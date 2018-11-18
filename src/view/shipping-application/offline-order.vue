<template>
  <div>
    <Table :loading="orderListLoading" :columns='orderColumns' :data='orderData' size='large'></Table>
    <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
  </div>
</template>

<script>
export default {
  name: 'offline_order_page',
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
          key: 'paidFee',
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
          title: '联系电话',
          key: 'phone',
          render: (h, params) => {
            return h('div', params.row.userAddress.mobile)
          }
        },
        {
          title: '支付确认',
          key: 'action',
          width: 140,
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
                      this.payFinishOrder(params.row.order.id, 1)
                    }
                  }
                },
                '确认'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.payFinishOrder(params.row.order.id, 2)
                    }
                  }
                },
                '取消'
              )
            ])
          }
        }
      ],
      orderData: []
    }
  },
  created () {
    this.queryOfflineOrder()
  },
  methods: {
    queryOfflineOrder (page) {
      this.$api
        .queryOfflineOrder({
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
    payFinishOrder (id, audit) {
      this.$api
        .payFinishOrder({
          orderId: id,
          audit: audit
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('处理成功')
            this.queryOfflineOrder()
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.orderListLoading = true
      this.queryOfflineOrder(page)
    }
  }
}
</script>

<style>

</style>
