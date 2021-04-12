<template>
  <div class="day-batch">
    <BlueChart 
      type="name" 
      title="本月批次次数"
      :columns="['日期', '预测次数']"
      :data="batch.month"
    />
  </div>
</template>

<script>
import BlueChart from "../components/BlueChart"
export default {
  name: 'MonthBatch',
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

