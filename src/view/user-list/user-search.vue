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
    <!-- <Page style="margin-top: 10px;" :total="queryObj.totalCount" show-total @on-change="changePage" /> -->
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
          <Select v-model="city" style="width:200px">
            <Option v-for="(value, key) in addressList[this.province]" :value="key" :key="key">{{ value }}</Option>
          </Select>
          选填
        </p>
        <p style="margin-bottom: 10px">
          区：
          <Select v-model="area" style="width:200px">
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
        </Tabs>
    </Modal>
  </div>
</template>

<script>
import ChinaAddressData from '@/assets/js/addressData.js'
export default {
  name: 'user_search_page',
  data () {
    return {
      addressList: ChinaAddressData,
      searchContent: '',
      searchType: '用户名',
      modalCityFlag: false,
      modalFlag: false,
      userListLoading: false,
      userList: [],
      queryObj: {},
      province: '',
      city: '',
      area: '',
      viewUserObj: {},
      userListColumns: [
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
              return h('div', '总代理·')
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
          title: '积分',
          key: 'withdrawAmount'
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
  computed: {
    cityList: function () {
      return this.addressList[this.province]
    },
    areaList: function () {
      return this.addressList[this.city]
    }
  },
  watch: {
    province: function (val) {
      this.city = ''
      this.area = ''
    },
    city: function (val) {
      this.area = ''
    }
  },
  methods: {
    showModal () {
      this.modalVisible = true
    },
    queryUserSearch (type) {
      this.userListLoading = true
      let queryObj = {}
      if (type === 2) {
        queryObj.username = ''
        queryObj.province = this.addressList['86'][this.province]
        queryObj.city = this.addressList[this.province][this.city]
        queryObj.area = this.addressList[this.city][this.area]
      } else if (this.searchType === '用户名') {
        queryObj.username = this.searchContent
      } else if (this.searchType === '手机号') {
        queryObj.phone = this.searchContent
      }
      this.$api
        .queryUserSearch(queryObj)
        .then(data => {
          if (data.code === 200) {
            if (data.data.user === null) {
              this.$Message.warning('用户不存在')
            } else {
              this.userList.push(data.data.user)
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
            this.userList = []
          } else {
            console.log(data)
          }
        })
    },
    changePage (page) {
      this.userListLoading = true
      this.queryUser(page)
    },
    cancelCity () {
    },
    showType (name) {
      console.log(name)
      this.searchType = name
    }
  },
  created () {
  }
}
</script>

<style lang="less">

/* .intro-con {
  min-height: 140px;
}
.draggable-btn {
  margin-top: 20px;
}
.code-con {
  width: 400px;
  background: #f9f9f9;
  padding-top: 10px;
} */
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
