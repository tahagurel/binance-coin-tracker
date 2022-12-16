<template>
  <b-modal content-class="p-3" id="coinProcess" hide-footer size="xl" centered>
    <template #modal-header>
      <div class="d-grid w-100">
        <h3 class="mb-3">Select a Coin</h3>
        <LoadingAlert v-if="getLoading" />
        <v-select placeholder="Search" @option:selected="addToSelectedCoin" v-model="selectedCoin"
          v-else :clearable="false" class="w-100" :getOptionLabel="item=> item.symbol"
          :options="getCoinList">
        </v-select>
      </div>
    </template>
    <StockItem v-if="getSelectedCoin.symbol" :coin="getSelectedCoin" />
  </b-modal>
</template>
<script>
import StockItem from '@/components/StockItem.vue';
import {
  mapActions,
  mapGetters,
} from 'vuex';
import LoadingAlert from './LoadingAlert.vue';

export default {
  name: 'CoinProcessModal',
  components: {
    StockItem,
    LoadingAlert,
  },
  data() {
    return {
      selectedCoin: null,
    };
  },
  methods: {
    ...mapActions(['addToSelectedCoinsFn']),
    addToSelectedCoin() {
      const coinWithQuantity = {
        ...this.selectedCoin,
        quantity: this.isCoinExist(),
      };
      this.addToSelectedCoinsFn(coinWithQuantity);
      this.selectedCoin = null;
    },
    isCoinExist() {
      const isExist = this.getPortfolios.find((item) => item.symbol === this.selectedCoin.symbol);
      return isExist ? isExist.quantity : 1;
    },
  },
  computed: {
    ...mapGetters(['getCoinList', 'getLoading', 'getSelectedCoin', 'getPortfolios']),
  },
};

</script>
