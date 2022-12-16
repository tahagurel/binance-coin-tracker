<template>
  <b-container class="p-3">
    <b-card>
      <template #header>
        <h3 class="mb-0">Binance Coin Tracker</h3>
      </template>
      <b-card-text>
        <LoadingAlert v-if="getLoading" />
        <div v-else>
          <b-button variant="primary" @click="showCoinProcessModal" class="me-3">
            {{coinModalCustomText}}
          </b-button>
          <b-button @click="refreshPortfolios" variant="primary ">Refresh</b-button>
        </div>
        <hr>
        <b-row>
          <b-col class="border-end ">
            <div v-if="getPortfolios.length">
              <stock-item class="mb-3" isAwgPriceShow :key="index"
                v-for="(portfolio,index) in getPortfolios" :coin="portfolio" />
            </div>
            <b-alert v-else variant="danger" show>There is not found any coin in your portfolio!
            </b-alert>
          </b-col>
          <b-col>
            <PieChart :labels="chartLabels" :datas="chartData" />
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
    <CoinProcessModalVue></CoinProcessModalVue>
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

import CoinProcessModalVue from './components/CoinProcessModal.vue';
import StockItem from './components/StockItem.vue';
import LoadingAlert from './components/LoadingAlert.vue';
import PieChart from './components/PieChart.vue';

export default {
  name: 'App',
  components: {
    CoinProcessModalVue,
    StockItem,
    PieChart,
    LoadingAlert,
  },
  mounted() {
    this.autoRefresh();
  },
  methods: {
    ...mapActions(['getCoinListFn', 'refreshPortfoliosFn']),
    showCoinProcessModal() {
      if (!this.getCoinList.length) {
        this.getCoinListFn();
      }
      this.$bvModal.show('coinProcess');
    },
    refreshPortfolios() {
      this.refreshPortfoliosFn();
      this.autoRefresh();
    },
    autoRefresh() {
      const time = 20 * 60 * 1000; // get 20 minutes
      setTimeout(this.refreshPortfolios, time);
    },
  },
  computed: {
    ...mapGetters(['getPortfolios', 'getLoading', 'getCoinList']),
    chartLabels() {
      return this.getPortfolios.map((item) => item.symbol);
    },
    chartData() {
      return this.getPortfolios.map((item) => item.quantity);
    },
    coinModalCustomText() {
      return this.getPortfolios.length ? 'Add / Update' : 'Add Stock';
    },
  },
};
</script>
