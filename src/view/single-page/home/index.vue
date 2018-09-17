<template>
  <div>
    <Row style="padding:20px" :gutter="16">
        <i-col span="6" class="padding-left-10">
          <Card>
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              新增用户
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="2534" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;人</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
        <i-col span="6" class="padding-left-10">
          <Card>
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              发货申请待处理
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="2534" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;个</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
        <i-col span="6" class="padding-left-10">
          <Card>
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              提现申请待处理
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="2534" count-class="count-text" unit-class="unit-class">
                  <!-- <span class="slot-text" slot="left">Total:&nbsp;</span> -->
                  <span class="slot-text" slot="right">&nbsp;个</span>
                </count-to>
              </div>
            </Row>
          </Card>
        </i-col>
        <i-col span="6" class="padding-left-10">
          <Card>
            <p slot="title">
              <Icon type="paintbucket"></Icon>
              身份证待审核
            </p>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              <div class="count-to-con">
                <count-to :end="2534" count-class="count-text" unit-class="unit-class">
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
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 23432, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' }
      ],
      pieData: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
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
