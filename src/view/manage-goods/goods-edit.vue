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
        <FormItem label="商品价格">
            VIP价格:
            <Input v-model="price1" placeholder="" style="width: 100px" /> 元
            经销商价格:
            <Input v-model="price2" placeholder="" style="width: 100px" /> 元
            总代理价格:
            <Input v-model="price3" placeholder="" style="width: 100px" /> 元
        </FormItem>
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
      price1: '',
      price2: '',
      price3: '',
      formItem: {
        name: '',
        url: '',
        detail: '',
        vipPriceDetail: ''
      }
    }
  },
  created () {
    this.getQnToken()
    if (this.$route.query.productId) {
      this.formItem = this.$route.query
      let priceArr = this.formItem.vipPriceDetail.split(';')
      this.price1 = priceArr[0].split(':')[1]
      this.price2 = priceArr[1].split(':')[1]
      this.price3 = priceArr[2].split(':')[1]
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
      this.formItem.url = 'http://7xwip7.com1.z0.glb.clouddn.com/' + response.key
    },
    submit () {
      this.formItem.vipPriceDetail = '0:' + this.price1 + ';1:' + this.price2 + ';2:' + this.price3
      if (this.$route.query.productId) {
        this.alterProduct()
      } else {
        this.insertProduct()
      }
    },
    clearForm () {
      this.formItem = {}
      this.price1 = ''
      this.price2 = ''
      this.price3 = ''
    }
  }
}
</script>

 <style lang="less" scoped>
.goods-img {
    width: 400px;
}
</style>
