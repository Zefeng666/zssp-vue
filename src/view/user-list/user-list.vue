<template>
  <div>
    <div class="search-box">
        <Dropdown style="margin-right: 10px" @on-click="showType">
            <Button type="primary">
                {{searchType}}
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem name="用户名">用户名</DropdownItem>
                <DropdownItem name="手机号">手机号</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Input class="search-inp" v-model="searchContent" placeholder="请输入" style="width: auto" />
        <Button type="info" class="search-btn" @click="queryUserSearch">搜索</Button>
        <Button type="info" class="search-btn" @click="modalCityFlag = true">按城市搜索</Button>
    </div>
    <Table :loading="userListLoading" :columns='userListColumns' :data='userList' size='large'></Table>
    <Page v-show="isShowPage" style="margin-top: 10px;" :total="queryObj.totalCount" show-total @on-change="changePage" />
    <Modal
        v-model="modalCityFlag"
        title="按城市搜索"
        @on-ok="queryUserSearch(2)"
        @on-cancel="cancelCity">
        <p style="margin-bottom: 10px">
          省：
          <Select v-model="province" style="width:200px" clearable>
            <Option v-for="(value, key) in addressList['86']" :value="key" :key="key">{{ value }}</Option>
          </Select>
          必填
        </p>
        <p style="margin-bottom: 10px">
          市：
          <Select v-model="city" style="width:200px" clearable>
            <Option v-for="(value, key) in addressList[this.province]" :value="key" :key="key">{{ value }}</Option>
          </Select>
          选填
        </p>
        <p style="margin-bottom: 10px">
          区：
          <Select v-model="area" style="width:200px" clearable>
            <Option v-for="(value, key) in addressList[this.city]" :value="key" :key="key">{{ value }}</Option>
          </Select>
          选填
        </p>
    </Modal>
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
            <TabPane label="订单记录">
              <Table :columns='ordersColumns' :data='userOrders' size='small'></Table>
              <Page style="margin-top: 10px;" :total="OrdersTotal" :page-size="8" size="small" show-total @on-change="changeOrderPageSmall" />
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
        cancel-text='取消'>
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
        <p style="margin-bottom: 10px;">
          <span style="display: inline-block; width: 60px;">增减积分:</span>
          <Input v-model="changeAmount" placeholder="Enter something..." style="width: 200px; margin-right: 10px;" :disabled="isEditAmount" />
          <a v-show="isEditAmount" @click="isEditAmount = false">修改</a>
          <a v-show="!isEditAmount" @click="alterUser(2)">保存</a>
        </p>
        <p style="margin-bottom: 10px;">
          <span style="display: inline-block; width: 60px;">设置代理:</span>
          <RadioGroup v-model="whichProxy">
              <Radio label="1" :disabled="isEditProxy">县区代理</Radio>
              <Radio label="2" :disabled="isEditProxy">城市代理</Radio>
          </RadioGroup>
          <a v-show="isEditProxy" @click="isEditProxy = false">修改</a>
          <a v-show="!isEditProxy" @click="alterUser(3)">保存</a>
        </p>
        <p>
          省：
          <Select v-model="proxyProvince" style="width:120px" clearable :disabled="isEditProxy">
            <Option v-for="(value, key) in addressList['86']" :value="key" :key="key">{{ value }}</Option>
          </Select>&nbsp;&nbsp;
          市：
          <Select v-model="proxyCity" style="width:120px" clearable :disabled="isEditProxy">
            <Option v-for="(value, key) in addressList[this.proxyProvince]" :value="key" :key="key">{{ value }}</Option>
          </Select>&nbsp;&nbsp;
          区：
          <Select v-model="proxyArea" style="width:120px" clearable :disabled="isEditProxy || whichProxy == '2'">
            <Option v-for="(value, key) in addressList[this.proxyCity]" :value="key" :key="key">{{ value }}</Option>
          </Select>
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
      searchContent: '',
      province: '',
      city: '',
      area: '',
      proxyProvince: '',
      proxyCity: '',
      proxyArea: '',
      whichProxy: '1',
      searchType: '用户名',
      modalCityFlag: false,
      modalFlag: false,
      editModalFlag: false,
      isEditUsername: true,
      isEditPhone: true,
      isEditAmount: true,
      isEditProxy: true,
      userListLoading: true,
      userList: [],
      queryObj: {},
      viewUserObj: {},
      viewUserTree: {},
      editUserObj: {},
      changeAmount: 0,
      isShowPage: true,
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
              return h('div', 'VIP')
            } else if (params.row.vipLevel === 1) {
              return h('div', '经销商')
            } else if (params.row.vipLevel === 2) {
              return h('div', '总代理')
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
          title: '经销商',
          key: 'recentDealer'
        },
        {
          title: '总代理',
          key: 'recentProxy'
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
      ordersColumns: [
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
          title: '申请数量',
          width: 100,
          key: 'applicationNumber',
          render: (h, params) => {
            return h('div', params.row.order.quantity + '件')
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
        //     if (params.row.order.auditTime)
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
            if (params.row.order.isAudit === 1) {
              return h('div', '同意')
            } else {
              return h('div', '未同意')
            }
          }
        }
      ],
      userIntegrals: [],
      integralsTotal: 0,
      userOrders: [],
      OrdersTotal: 0
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
    queryUserSearch (type) {
      this.userListLoading = true
      this.isShowPage = false
      let queryObj = {}
      if (type === 2) {
        queryObj.province = this.addressList['86'][this.province]
        queryObj.city = this.addressList[this.province][this.city] || ''
        this.city ? queryObj.area = this.addressList[this.city][this.area] : queryObj.area = ''
      } else if (this.searchType === '用户名') {
        queryObj.username = this.searchContent
      } else if (this.searchType === '手机号') {
        queryObj.mobile = this.searchContent
      }
      this.$api
        .queryUserSearch(queryObj)
        .then(data => {
          if (data.code === 200) {
            if (JSON.stringify(data.data.users) === '[]') {
              this.$Message.warning('用户不存在')
            } else {
              this.userList = data.data.users
              console.log(this.userList)
            }
            this.userListLoading = false
          } else {
            this.$Message.warning(data.message)
            this.userListLoading = false
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
            this.queryOrderByUid()
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
    queryOrderByUid (page) {
      this.$api
        .queryOrderByUid({
          uid: this.viewUserObj.user.uid,
          pageNo: page || 1,
          pageSize: 8
        })
        .then(data => {
          if (data.code === 200) {
            this.userOrders = data.data.items
            this.OrdersTotal = data.data.totalCount
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
      } else if (type === 3) {
        if (this.whichProxy === '2') {
          if (this.proxyProvince === '' || this.proxyCity === '') {
            return this.$Message.warning('请填写完整的代理地区')
          }
          text = this.proxyProvince + '-' + this.proxyCity
        } else {
          if (this.proxyProvince === '' || this.proxyCity === '' || this.proxyArea === '') {
            return this.$Message.warning('请填写完整的代理地区')
          }
          text = this.proxyProvince + '-' + this.proxyCity + '-' + this.proxyArea
        }
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
    },
    changeOrderPageSmall (page) {
      this.queryOrderByUid(page)
    },
    cancelCity () {
    },
    showType (name) {
      this.searchType = name
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
.search-box {
  margin-bottom: 15px;
}
.search-inp {
  margin-right: 15px;
}
.search-btn {
  margin-right: 15px;
}
</style>
