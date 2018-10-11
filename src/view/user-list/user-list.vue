<template>
  <div>
    <Table :loading="userListLoading" :columns='userListColumns' :data='userList' size='large'></Table>
    <Page style="margin-top: 10px;" :total="queryObj.totalCount" show-total @on-change="changePage" />
    <Modal
        title="查看用户"
        v-model="modalFlag"
        :mask-closable="false"
        width="800"
        cancel-text=''>
        <Tabs type="card">
            <TabPane label="用户地址">
              <Table :columns='addressColumns' :data='addressData' size='small'></Table>
            </TabPane>
            <TabPane label="银行卡">
              <Table :columns='cardColumns' :data='cardData' size='small'></Table>
            </TabPane>
        </Tabs>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'user_list_page',
  data () {
    return {
      modalFlag: false,
      userListLoading: true,
      userList: [],
      queryObj: {},
      viewUserObj: {},
      userListColumns: [
        {
          title: '序号',
          key: 'index',
          render: (h, params) => {
            return h('div', params.row._index + 1)
          }
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '会员等级',
          key: 'vipLevel',
          render: (h, params) => {
            if (params.row.vipLevel === 0) {
              return h('div', 'VIP')
            } else if (params.row.vipLevel === 1) {
              return h('div', '总代理')
            } else if (params.row.vipLevel === 2) {
              return h('div', 'CEO')
            } else if (params.row.vipLevel === -1) {
              return h('div', '普通用户')
            }
          }
        },
        {
          title: '代理地区',
          key: 'proxyArea'
        },
        {
          title: '余额',
          key: 'withdrawAmount'
        },
        {
          title: '剩余库存',
          key: 'lastQuantity'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('div', {}, params.row.createTime.substr(0, 10))
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
                      this.queryUserByUid(params.row.uid)
                      this.modalFlag = true
                    }
                  }
                },
                '查看'
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
                        content: '确定要删除吗？',
                        onOk: () => {
                          this.deleteUser(params.row.uid)
                        }
                      })
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      addressColumns: [
        {
          title: '联系人',
          key: 'contact',
          width: 150
        },
        {
          title: '联系电话',
          key: 'mobile',
          width: 150
        },
        {
          title: '地址',
          key: 'address',
          render: (h, params) => {
            return h('div', {}, params.row.province + params.row.city + params.row.area + params.row.detail)
          }
        },
        {
          title: '是否默认',
          key: 'default',
          width: 100,
          render: (h, params) => {
            return h('div', {}, params.row.isDefault === 1 ? '是' : '否')
          }
        }
      ],
      addressData: [],
      cardColumns: [
        {
          title: '所属银行',
          key: 'cardKind'
        },
        {
          title: '卡号',
          key: 'cardId'
        },
        {
          title: '持卡人',
          key: 'cardHolder'
        },
        {
          title: '是否默认',
          key: 'default',
          width: 100,
          render: (h, params) => {
            return h('div', {}, params.row.isDefault === 1 ? '是' : '否')
          }
        }
      ],
      cardData: []
    }
  },
  methods: {
    showModal () {
      this.modalVisible = true
    },
    queryUser (page) {
      this.$api
        .queryUser({
          pageNo: page || 1
        })
        .then(data => {
          if (data.code === 200) {
            this.userList = data.data.items
            this.queryObj = data.data
            this.userListLoading = false
          } else {
            console.log(data)
          }
        })
    },
    queryUserByUid (uid) {
      this.$api
        .queryUserByUid({
          uid: uid
        })
        .then(data => {
          if (data.code === 200) {
            this.viewUserObj = data.data.userInfo
            this.addressData = data.data.userInfo.userAddress
            this.cardData = data.data.userInfo.userBankCard
          } else {
            console.log(data)
          }
        })
    },
    deleteUser (uid) {
      this.$api
        .deleteUser({
          uid: uid
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('删除成功!')
            this.queryUser()
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.userListLoading = true
      this.queryUser(page)
    }
  },
  created () {
    this.queryUser()
  }
}
</script>

<style>
.intro-con {
  min-height: 140px;
}
.draggable-btn {
  margin-top: 20px;
}
.code-con {
  width: 400px;
  background: #f9f9f9;
  padding-top: 10px;
}
</style>
