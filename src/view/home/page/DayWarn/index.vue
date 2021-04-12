<template>
  <div class="day-batch">
    <BlueChart 
      type="value" 
      title="当天高风险次数"
      :columns="['时间', '高风险次数']"
      :data="warn.day"
    />
  </div>
</template>

<script>
import BlueChart from "../components/BlueChart"
export default {
  name: 'DayWarn',
  props: {
    warn: Object
  },
  components: {
    BlueChart
  }
}
</script>

<style scoped>
  .day-batch {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>

