<template>
  <div>
    <Row style="margin-bottom: 10px;" :gutter="10">
        <i-col span="12" class="padding-left-10">
          <Card @click.native="goTo('/user_list/user_list_page')">
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              用户数
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="indexDate.userCount || 0" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;人</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
        <i-col span="12" class="padding-left-10">
          <Card @click.native="goTo('/user_list/user_new_page')">
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              新升级用户
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="indexDate.newUserCount || 0" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;人</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
    </Row>
    <Row style="" :gutter="10">
        <i-col span="6" class="padding-left-10">
          <Card @click.native="goTo('/shipping_application/shipping_application_page')">
            <p slot="title">
              <!-- <Icon type="paintbucket"></Icon> -->
              发货申请待处理
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="indexDate.shipCount || 0" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;个</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
        <i-col span="6" class="padding-left-10">
          <Card @click.native="goTo('/upgrade_order/upgrade_order_page')">
            <p slot="title">
              <!-- <Icon type="paintbucket"></Icon> -->
              报单审核待处理
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="indexDate.shipCount || 0" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;个</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
        <i-col span="6" class="padding-left-10">
          <Card @click.native="goTo('/withdrawal_application/withdrawal_application_page')">
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              提现申请待处理
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="indexDate.withdrawCount || 0" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;个</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
        <i-col span="6" class="padding-left-10">
          <Card @click.native="goTo('/idcard_review/idcard_review_page')">
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              身份证待审核
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="indexDate.idCardCount || 0" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;个</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      indexDate: {}
    }
  },
  mounted () {
    this.queryIndex()
  },
  methods: {
    queryIndex () {
      this.$api
        .queryIndex({})
        .then(data => {
          if (data.code === 200) {
            this.indexDate = data.data.index
            console.log(this.indexDate)
          } else {
            console.log(data)
          }
        })
    },
    goTo (path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="less">
@baseColor: ~"#dc9387";
// .count-style{
//   font-size: 50px;
// }
.countto-page-row{
  height: 200px;
}
.count-to-con{
  display: block;
  width: 100%;
  text-align: center;
}
.count-text{
  font-size: 50px;
  color: @baseColor;
}
.slot-text{
  font-size: 22px;
}
.unit-class{
  font-size: 30px;
  color: @baseColor;
}
</style>
