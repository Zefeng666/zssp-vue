<template>
  <div>
     <Form :model="formItem" :label-width="80">
        <FormItem label="商品名称">
            <Input v-model="formItem.name" placeholder="Enter something..." style="width: 300px" />
        </FormItem>
        <FormItem label="商品图片">
            <Upload
                :before-upload="handleUpload"
                action="http://upload.qiniup.com/"
                :data="{token: qnToken}"
                :on-success="uploadSuccess">
                <Button icon="ios-cloud-upload-outline">选择图片</Button>
            </Upload>
            <img v-show="formItem.url" class="goods-img" :src="formItem.url">
        </FormItem>
        <!-- <FormItem label="商品价格">
            VIP价格:
            <Input v-model="formItem.vipPrice" placeholder="" style="width: 100px" /> 元/件 &nbsp;&nbsp;
            经销商价格:
            <Input v-model="formItem.dealerPrice" placeholder="" style="width: 100px" /> 元/件 &nbsp;&nbsp;
            总代理价格:
            <Input v-model="formItem.proxyPrice" placeholder="" style="width: 100px" /> 元/件
        </FormItem> -->
        <FormItem label="商品简介">
            <Input v-model="formItem.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click.native="submit">提交</Button>
            <Button v-show="!formItem.productId" style="margin-left: 8px" @click.native="clearForm">重置</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'goods_edit_page',
  data () {
    return {
      qnToken: '',
      formItem: {
        name: '',
        url: '',
        detail: ''
      }
    }
  },
  created () {
    this.getQnToken()
    if (this.$route.query.productId) {
      this.formItem = this.$route.query
    }
  },
  mounted () {
  },
  methods: {
    getQnToken () {
      this.$api
        .getQnToken({})
        .then(data => {
          if (data.code === 200) {
            this.qnToken = data.data.token
          } else {
          }
        })
    },
    insertProduct () {
      this.$api
        .insertProduct(this.formItem)
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('编辑成功')
            this.$router.push({
              name: 'goods_list_page'
            })
          } else {
            this.$Message.error(data.message)
          }
        })
    },
    alterProduct () {
      this.$api
        .alterProduct(this.formItem)
        .then(data => {
          if (data.code === 200) {
            this.$Message.success('编辑成功')
            this.$router.push({
              name: 'goods_list_page'
            })
          } else {
            this.$Message.error(data.message)
          }
        })
    },
    handleUpload (file) {},
    uploadSuccess (response, file, fileList) {
      this.formItem.url = 'http://image.tlong.tv/' + response.key
    },
    submit () {
      if (this.$route.query.productId) {
        this.alterProduct()
      } else {
        this.insertProduct()
      }
    },
    clearForm () {
      this.formItem = {}
    }
  }
}
</script>

 <style lang="less" scoped>
.goods-img {
    width: 400px;
}
</style>
