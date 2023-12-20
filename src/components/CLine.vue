<template>
  <v-chart style="width: 100%; height: 100%" :option="dataList" ref="chart" />
</template>

<script>
import { use,graphic } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import { ref, defineComponent,  computed  } from "vue";

use([CanvasRenderer, TooltipComponent, GridComponent, LineChart]);

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart,
  },
  props: {
    xAxis: {
      type: Array,
      default: () => [],
    },
    series: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const chart = ref();
     const dataList =computed(()=>(
        {
          grid: {
            left: "0",
            right: "0%",
            bottom: "0%",
            top: 0,
            containLabel: true,
          },
          tooltip: {
            itemGap: 20,
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: props.xAxis,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            boundaryGap: false,
            splitLine: {
              show: false,
            },
          },
          yAxis: [
            {
              type: "value",
              min: 0,
              axisLabel: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              splitLine: {
                show: true,
              },
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            {
              type: "line",
              smooth: false, // 是否平滑
              showAllSymbol: false,
              // symbol: 'image://./static/images/guang-circle.png',
              symbol: "circle",
              symbolSize: 2,

              lineStyle: {
                normal: {
                  color: "#1A8BFF",
                },
              },
              itemStyle: {
                color: "#37aee9",
              },
              tooltip: {
                show: true,
              },
              areaStyle: {
                normal: {
                  color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(26, 140, 255, 0.3)",
                    },
                    {
                      offset: 1,
                      color: " rgba(26, 139, 255, 0)",
                    },
                  ]),
                },
              },
              data: props.series,
            },
          ],
        }
     ))

    return {  chart,dataList };
  },
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
