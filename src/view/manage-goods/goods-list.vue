<template>
  <div>
    <Button type="warning"  @click="toInsert" style="margin-bottom: 16px;">新增商品</Button>
    <Table :loading="orderListLoading" :columns='orderColumns' :data='orderData' size='large'></Table>
    <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
    <Modal title="查看图片" v-model="visible">
        <img :src="showLargeImgSrc" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'goods_list_page',
  data () {
    return {
      totalCount: 0,
      orderListLoading: true,
      visible: false,
      showLargeImgSrc: '',
      orderColumns: [
        {
          title: '序号',
          key: 'id',
          width: 70,
          align: 'center'
        },
        {
          title: '商品名',
          key: 'name',
          align: 'center'
        },
        {
          title: '图片',
          key: 'photo',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.url
                  },
                  style: {
                    height: '50px',
                    width: '80px',
                    marginTop: '8px',
                    border: '1px solid #ccc'
                  },
                  on: {
                    click: () => {
                      this.showLargeImgSrc = params.row.url
                      this.visible = true
                    }
                  }
                }
              )
            ])
          }
        },
        {
          title: '简介',
          key: 'detail'
        },
        {
          title: '拿货价格',
          key: 'price',
          render: (h, params) => {
            return h('div', [
              h(
                'p',
                {
                  style: {
                  },
                  on: {
                    click: () => {
                      this.showLargeImgSrc = params.row.url
                      this.visible = true
                    }
                  }
                },
                'VIP：' + params.row.vipPriceDetail.split(';')[0].split(':')[1]
              ),
              h(
                'p',
                {
                  style: {
                  },
                  on: {
                    click: () => {
                      this.showLargeImgSrc = params.row.url
                      this.visible = true
                    }
                  }
                },
                '经销商：' + params.row.vipPriceDetail.split(';')[1].split(':')[1]
              ),
              h(
                'p',
                {
                  style: {
                  },
                  on: {
                    click: () => {
                      this.showLargeImgSrc = params.row.url
                      this.visible = true
                    }
                  }
                },
                '总代理：' + params.row.vipPriceDetail.split(';')[2].split(':')[1]
              )
            ])
          }
        },
        {
          title: '操作',
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
                      console.log(params.row)
                      this.$router.push({
                        name: 'goods_edit_page',
                        query: params.row
                      })
                    }
                  }
                },
                '编辑'
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
                        content: '确定下架此商品吗？',
                        onOk: () => {
                          this.cancelProduct(params.row.productId)
                        }
                      })
                    }
                  }
                },
                '下架'
              )
            ])
          }
        }
      ],
      orderData: []
    }
  },
  created () {
    this.queryAllProducts()
  },
  methods: {
    queryAllProducts (page) {
      this.$api
        .queryAllProducts({
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
    cancelProduct (id) {
      this.$api
        .cancelProduct({
          productId: id
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('操作成功')
            this.queryAllProducts()
          } else {
            this.$Message.error(data.message)
          }
        })
    },
    changePage (page) {
      this.orderListLoading = true
      this.queryAllProducts(page)
    },
    toInsert () {
      this.$router.push({
        name: 'goods_edit_page'
      })
    }
  }
}
</script>

<style>

</style>
