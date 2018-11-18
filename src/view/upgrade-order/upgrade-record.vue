<template>
    <div>
        <Table :loading="orderListLoading" :columns='orderColumns' :data='orderData' size='large'></Table>
        <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
    </div>
</template>

<script>
export default {
  name: 'upgrade_record_page',
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
          width: 100,
          render: (h, params) => {
            return h('div', params.row.user.username)
          }
        },
        {
          title: '申请数量',
          width: 100,
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
        // {
        //   title: '审核时间',
        //   key: 'auditTime',
        //   render: (h, params) => {
        //     return h('div', params.row.order.auditTime.substring(0, 10) + ' ' + params.row.order.auditTime.substring(11, 16))
        //   }
        // },
        {
          title: '联系人',
          key: 'contact',
          width: 80,
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
          render: (h, params) => {
            return h(
              'div',
              params.row.userAddress.province +
                params.row.userAddress.city +
                params.row.userAddress.area +
                params.row.userAddress.detail
            )
          }
        },
        {
          title: '审核',
          key: 'agree',
          width: 80,
          render: (h, params) => {
            if (params.row.order.isUpgrade === 1) {
              return h('div', '同意')
            } else {
              return h('div', '未同意')
            }
          }
        }
      ],
      orderData: []
    }
  },
  created () {
    this.queryUpgradeOrderHistory()
  },
  methods: {
    queryUpgradeOrderHistory (page) {
      this.$api
        .queryUpgradeOrderHistory({
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
    auditOrder (id, audit) {
      this.$api
        .auditOrder({
          id: id,
          audit: audit
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('处理成功')
            this.queryOrder()
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.orderListLoading = true
      this.queryUpgradeOrderHistory(page)
    }
  }
}
</script>

<style>
</style>
