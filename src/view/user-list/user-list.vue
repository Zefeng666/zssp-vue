<template>
  <div>
    <Table :columns='columns1' :data='data1' size='large'></Table>
  </div>
</template>

<script>
export default {
  name: 'user_list_page',
  data () {
    return {
      columns1: [
        {
          title: '头像',
          key: 'avator'
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '会员等级',
          key: 'level'
        },
        {
          title: '积分',
          key: 'point'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '创建时间',
          key: 'date'
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
                      // this.show(params.index);
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
                      // this.remove(params.index);
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data1: [
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
    }
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
