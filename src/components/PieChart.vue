<template>
    <Pie :chart-options="chartOptions" :data="chartData" chart-id="chartId" dataset-id-key="label" />
</template>

<script>
import {
  Pie,
} from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
export default {
  name: 'PieChart',
  components: {
    Pie,
  },
  props: {
    datas: Array,
    labels: Array,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    chartData() {
      if (this.labels.length) {
        return {
          labels: this.labels,
          datasets: [{
            backgroundColor: this.randomColors,
            data: this.datas,
          }],
        };
      }
      return {
        labels: [''],
        datasets: [{
          backgroundColor: ['lightgray'],
          data: [100],
        }],
      };
    },
    randomColors() {
      return this.labels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`);
    },
  },
};

</script>
