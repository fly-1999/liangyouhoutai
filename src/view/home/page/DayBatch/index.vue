<template>
  <div class="day-batch">
    <BlueChart 
      type="value" 
      title="当天批次数量"
      :columns="['时间', '批次数量']"
      :data="batch.day"
    />
  </div>
</template>

<script>
import BlueChart from "../components/BlueChart"
export default {
  name: 'DayBatch',
  props: {
    batch: Object
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

