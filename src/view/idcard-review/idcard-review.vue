<template>
  <div>
    <Table :loading="orderListLoading" :columns='orderColumns' :data='orderData' size='large'></Table>
    <Page style="margin-top: 10px;" :total="totalCount" show-total @on-change="changePage" />
    <Modal title="查看身份证" v-model="visible">
        <img :src="showLargeImgSrc" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'idcard_review_page',
  data () {
    return {
      totalCount: 0,
      orderListLoading: true,
      visible: false,
      showLargeImgSrc: '',
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
          key: 'username',
          align: 'center'
        },
        {
          title: '身份证正面',
          key: 'frontPhoto',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.frontPhoto
                  },
                  style: {
                    height: '50px',
                    width: '80px',
                    marginTop: '8px',
                    border: '1px solid #ccc'
                  },
                  on: {
                    click: () => {
                      this.showLargeImgSrc = params.row.frontPhoto
                      this.visible = true
                    }
                  }
                }
              )
            ])
          }
        },
        {
          title: '身份证背面',
          key: 'agencyDistrict',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.reversePhoto
                  },
                  style: {
                    height: '50px',
                    width: '80px',
                    marginTop: '8px',
                    border: '1px solid #ccc'
                  },
                  on: {
                    click: () => {
                      this.showLargeImgSrc = params.row.reversePhoto
                      this.visible = true
                    }
                  }
                }
              )
            ])
          }
        },
        {
          title: '申请时间',
          key: 'applyTime',
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.createTime.substr(0, 10))
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
                      this.reviewIdCard(params.row.id, 1)
                    }
                  }
                },
                '通过'
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
                          this.reviewIdCard(params.row.id, 2)
                        }
                      })
                    }
                  }
                },
                '不通过'
              )
            ])
          }
        }
      ],
      orderData: []
    }
  },
  created () {
    this.queryUnReviewIdCard()
  },
  methods: {
    queryUnReviewIdCard (page) {
      this.$api
        .queryUnReviewIdCard({
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
    reviewIdCard (id, audit) {
      this.$api
        .reviewIdCard({
          id: id,
          audit: audit
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('处理成功')
            this.queryUnReviewIdCard()
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.orderListLoading = true
      this.queryUnReviewIdCard(page)
    }
  }
}
</script>

<style>

</style>
