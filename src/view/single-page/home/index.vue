<template>
  <div>
    <!-- <Row :gutter="20">
      <i-col span="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row> -->
    <Row style="padding:20px">
        <Col span="11">
            <Card :bordered="false">
              <div style="text-align:center">
                  <count-to :end="200" count-class="count-style"/>
                  <h3>新增用户</h3>
              </div>
            </Card>
        </Col>
        <Col span="11" offset="2">
            <Card :bordered="false">
              <div style="text-align:center">
                  <count-to :end="200" count-class="count-style"/>
                  <h3>新增用户</h3>
              </div>
            </Card>
        </Col>
    </Row>
    <Row style="padding:20px">
        <Col span="11">
            <Card :bordered="false">
              <div style="text-align:center">
                  <count-to :end="200" count-class="count-style"/>
                  <h3>新增用户</h3>
              </div>
            </Card>
        </Col>
        <Col span="11" offset="2">
            <Card :bordered="false">
              <div style="text-align:center">
                  <count-to :end="200" count-class="count-style"/>
                  <h3>新增用户</h3>
              </div>
            </Card>
        </Col>
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
.count-style{
  font-size: 50px;
}
</style>
