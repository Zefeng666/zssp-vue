<template>
    <div>
        <Table :loading="orderListLoading" :columns='orderColumns' :data='orderData' size='large'></Table>
        <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
    </div>
</template>

<script>
export default {
  name: 'shipping_record_page',
  data () {
    return {
      totalCount: 0,
      orderListLoading: true,
      orderColumns: [
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
          width: 100,
          render: (h, params) => {
            return h('div', params.row.user.username)
          }
        },
        // {
        //   title: '积分',
        //   key: 'point',
        //   width: 80,
        //   render: (h, params) => {
        //     return h('div', params.row.user.withdrawAmount)
        //   }
        // },
        {
          title: '申请数量',
          width: 100,
          key: 'applicationNumber',
          render: (h, params) => {
            return h('div', params.row.order.quantity)
          }
        },
        {
          title: '申请时间',
          key: 'applicationTime',
          render: (h, params) => {
            let d = new Date(params.row.order.createTime)
            return h('div', d.toLocaleString())
          }
        },
        {
          title: '审核时间',
          key: 'auditTime',
          render: (h, params) => {
            let d = new Date(params.row.order.auditTime)
            return h('div', d.toLocaleString())
          }
        },
        {
          title: '代理区县',
          key: 'agencyDistrict',
          render: (h, params) => {
            return h('div', params.row.user.proxyArea)
          }
        },
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
            if (params.row.order.isAudit === 1) {
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
    this.queryOrderHistory()
  },
  methods: {
    queryOrderHistory (page) {
      this.$api
        .queryOrderHistory({
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
    changePage (page) {
      this.orderListLoading = true
      this.queryOrderHistory(page)
    }
  }
}
</script>

<style>
</style>
