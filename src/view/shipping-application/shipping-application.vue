<template>
  <div>
    <Table :columns='columns1' :data='data1' size='large'></Table>
  </div>
</template>

<script>
export default {
  name: 'shipping_application_page',
  data () {
    return {
      columns1: [
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '申请数量',
          key: 'applicationNumber'
        },
        {
          title: '代理区县',
          key: 'agencyDistrict'
        },
        {
          title: '积分',
          key: 'point'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '发货地址',
          key: 'deliveryAddress'
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
                '同意'
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
                '不同意'
              )
            ])
          }
        }
      ],
      data1: [
        {
          name: 'John Brown',
          applicationNumber: 122,
          agencyDistrict: '浙江杭州',
          point: 18,
          phone: '17888888888',
          deliveryAddress: '浙江省杭州市滨江区锯弓街道112号川味科技园2幢'
        },
        {
          name: 'Jim Green',
          applicationNumber: 122,
          agencyDistrict: '浙江杭州',
          point: 24,
          phone: '17666666666',
          deliveryAddress: '浙江省杭州市滨江区'
        }
      ]
    }
  },
  methods: {
    showModal () {
      // this.modalVisible = true;
    }
  }
}
</script>

<style>

</style>
