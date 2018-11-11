<template>
  <div>
    <Table :loading="userListLoading" :columns='userListColumns' :data='userList' size='large'></Table>
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
            <TabPane label="收益明细">
              <Table :columns='integralsColumns' :data='userIntegrals' size='small'></Table>
              <Page style="margin-top: 10px;" :total="integralsTotal" :page-size="8" size="small" show-total @on-change="changePageSmall" />
            </TabPane>
            <TabPane label="子级用户">
              <Row>
                  <Col span="11">
                      <Card title="一级用户" :padding="0" shadow style="width: 300px; height: 300px; overflow: scroll;">
                          <CellGroup>
                            <template v-for="(item, index) in viewUserTree.firstUser">
                              <Cell :title="item.username" :key="index" />
                            </template>
                          </CellGroup>
                      </Card>
                  </Col>
                  <Col span="11" offset="2">
                      <Card title="二级用户" :padding="0" shadow style="width: 300px; height: 300px; overflow: scroll;">
                          <CellGroup>
                            <template v-for="(item, index) in viewUserTree.secondUser">
                              <Cell :title="item.username" :key="index" />
                            </template>
                          </CellGroup>
                      </Card>
                  </Col>
              </Row>
            </TabPane>
        </Tabs>
    </Modal>
    <Modal
        title="编辑用户"
        v-model="editModalFlag"
        :mask-closable="false"
        width="800"
        cancel-text='取消'
        @on-ok="alterUser">
        <p style="margin-bottom: 10px;">
          <span style="display: inline-block; width: 60px;">用户名:</span>
          <Input v-model="editUserObj.username" placeholder="Enter something..." style="width: 200px; margin-right: 10px;" :disabled="isEditUsername"/>
          <a v-show="isEditUsername" @click="isEditUsername = false">修改</a>
          <a v-show="!isEditUsername" @click="alterUser(1)">保存</a>
        </p>
        <p style="margin-bottom: 10px;">
          <span style="display: inline-block; width: 60px;">手机号:</span>
          <Input v-model="editUserObj.mobile" placeholder="Enter something..." style="width: 200px; margin-right: 10px;"  :disabled="isEditPhone" />
          <a v-show="isEditPhone" @click="isEditPhone = false">修改</a>
          <a v-show="!isEditPhone" @click="alterUser(0)">保存</a>
        </p>
        <p>
          <span style="display: inline-block; width: 60px;">增减积分:</span>
          <Input v-model="changeAmount" placeholder="Enter something..." style="width: 200px; margin-right: 10px;" :disabled="isEditAmount" />
          <a v-show="isEditAmount" @click="isEditAmount = false">修改</a>
          <a v-show="!isEditAmount" @click="alterUser(2)">保存</a>
        </p>

    </Modal>
  </div>
</template>

<script>
import ChinaAddressData from '@/assets/js/addressData.js'
export default {
  name: 'user_list_page',
  data () {
    return {
      addressList: ChinaAddressData,
      modalFlag: false,
      editModalFlag: false,
      isEditUsername: true,
      isEditPhone: true,
      isEditAmount: true,
      userListLoading: true,
      userList: [],
      viewUserObj: {},
      viewUserTree: {},
      editUserObj: {},
      changeAmount: 0,
      userListColumns: [
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
          key: 'username'
        },
        {
          title: '会员等级',
          key: 'vipLevel',
          render: (h, params) => {
            if (params.row.vipLevel === 0) {
              return h('div', '分享大使')
            } else if (params.row.vipLevel === 1) {
              return h('div', '经销商')
            } else if (params.row.vipLevel === 2) {
              return h('div', '区县合伙人')
            } else if (params.row.vipLevel === 3) {
              return h('div', '城市合伙人')
            } else if (params.row.vipLevel === 4) {
              return h('div', '分公司')
            } else if (params.row.vipLevel === -1) {
              return h('div', '普通用户')
            }
          }
        },
        {
          title: '推荐人',
          key: 'recommendUser'
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
          title: '操作',
          key: 'action',
          width: 180,
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
                      this.queryUnderlingUser(params.row.uid)
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
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.queryUserByUid(params.row.uid)
                      this.editModalFlag = true
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
      cardData: [],
      integralsColumns: [
        {
          title: '类型',
          key: 'changeType'
        },
        {
          title: '积分变化',
          key: 'integralNum'
        },
        {
          title: '详情',
          key: 'changeDetail'
        },
        {
          title: '时间',
          key: 'createTime',
          render: (h, params) => {
            return h('div', params.row.createTime.substring(0, 10) + ' ' + params.row.createTime.substring(11, 16))
          }
        }
      ],
      userIntegrals: [],
      integralsTotal: 0
    }
  },
  methods: {
    showModal () {
      this.modalVisible = true
    },
    queryNewUser (page) {
      this.$api
        .queryNewUser({})
        .then(data => {
          if (data.code === 200) {
            this.userList = data.data.users
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
            this.editUserObj = data.data.userInfo.user
            this.addressData = data.data.userInfo.userAddress
            this.cardData = data.data.userInfo.userBankCard
            this.queryIntegrals()
          } else {
            console.log(data)
          }
        })
    },
    queryUnderlingUser (uid) {
      this.$api
        .queryUnderlingUser({
          uid: uid
        })
        .then(data => {
          if (data.code === 200) {
            this.viewUserTree = data.data
          } else {
            console.log(data)
          }
        })
    },
    queryIntegrals (page) {
      this.$api
        .queryIntegrals({
          uid: this.viewUserObj.user.uid,
          pageNo: page || 1,
          pageSize: 8
        })
        .then(data => {
          if (data.code === 200) {
            this.userIntegrals = data.data.items
            this.integralsTotal = data.data.totalCount
          } else {
            console.log(data)
          }
        })
    },
    alterUser (type) {
      let text = ''
      if (type === 0) {
        text = this.editUserObj.mobile
        this.isEditPhone = true
      } else if (type === 1) {
        text = this.editUserObj.username
        this.isEditUsername = true
      } else if (type === 2) {
        text = this.changeAmount
        this.isEditAmount = true
      }
      this.$api
        .alterUser({
          alterType: type,
          text: text,
          uid: this.editUserObj.uid
        })
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('修改成功!')
          } else {
            this.$Message.error(data.message)
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
    },
    changePageSmall (page) {
      this.queryIntegrals(page)
    }
  },
  created () {
    this.queryNewUser()
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
