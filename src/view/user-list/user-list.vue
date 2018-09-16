<template>
  <div>
    <Table :columns='columns1' :data='userList' size='large'></Table>
    <Page style="margin-top: 10px;" :total="queryObj.totalCount" show-total />
    <Modal
        title="哈哈哈哈"
        v-model="modalFlag"
        :mask-closable="false"
        width="800"
        cancel-text=''>
        <Tabs type="card">
            <TabPane label="用户地址">
              <Table :columns='columns2' :data='data2' size='small'></Table>
              <Page style="margin-top: 10px;" :total="100" show-total size='small'/>
            </TabPane>
            <TabPane label="银行卡">
              <Table :columns='columns2' :data='data2' size='small'></Table>
              <Page style="margin-top: 10px;" :total="100" show-total size='small'/>
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
      userList: [],
      queryObj: {},
      columns1: [
        {
          title: '头像',
          key: 'avator'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '会员等级',
          key: 'vipLevel'
        },
        {
          title: '积分',
          key: 'integral'
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
                          this.$Message.success('删除成功！')
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
      columns2: [
        {
          title: '联系人',
          key: 'name',
          width: 150
        },
        {
          title: '联系电话',
          key: 'phone',
          width: 150
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '是否默认',
          key: 'default',
          width: 100
        }
      ],
      data2: [
        {
          avator: '',
          name: 'John Brown',
          level: 'ceo',
          point: 18,
          phone: '17888888888',
          date: '2016-10-03'
        },
        {
          avator: '',
          name: 'Jim Green',
          level: 'ceo',
          point: 24,
          phone: '17666666666',
          date: '2016-10-01'
        }
      ]
    }
  },
  methods: {
    showModal () {
      this.modalVisible = true
    },
    queryUser () {
      this.$api
        .queryUser({})
        .then(data => {
          if (data.code === 200) {
            this.userList = data.data.items
            this.queryObj = data.data
          } else {
            console.log(data)
          }
        })
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
