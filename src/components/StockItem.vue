<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center">
      <span class="w-50 d-grid">
        <strong class="h5">{{coin.symbol}}</strong>
        <small> <strong>Last Price: </strong>{{coin.lastPrice}}</small>
        <small v-if=" isAwgPriceShow">
          <strong>Awg Price: </strong>{{coin.weightedAvgPrice}}
        </small>
      </span>
      <div class="d-flex justify-content-between ">
        <b-form-input size="sm" type="number" v-model="quantity" min="1" class="w-25">
        </b-form-input>
        <div v-if="isCoinExist" class=" d-flex">
          <b-button @click="uptadePortfolio" :disabled="coin.quantity===newQuantity" size="sm"
            variant="primary" class="me-1">Update</b-button>
          <b-button @click="removePortfolioItem" size="sm" variant="danger">Remove</b-button>
        </div>
        <div v-else class="d-flex w-50">
          <b-button @click="addToPortfolio" class="w-100" size="sm" variant="success">Add</b-button>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import {
  mapActions,
  mapGetters,
}
  from 'vuex';

export default {
  name: 'StockItem',
  data() {
    return {
      newQuantity: 0,
    };
  },
  props: {
    coin: Object,
    isAwgPriceShow: Boolean,
  },
  mounted() {
    this.newQuantity = this.coin.quantity;
  },
  watch: {
    coin() {
      this.newQuantity = this.coin.quantity;
    },
  },
  computed: {
    ...mapGetters(['getPortfolios']),
    isCoinExist() {
      return this.getPortfolios.find((item) => item.symbol === this.coin.symbol);
    },
    quantity: {
      get() {
        return this.coin.quantity;
      },
      set(newValue) {
        this.newQuantity = newValue;
      },
    },

  },
  methods: {
    ...mapActions(['addToPortfolioFn', 'addToSelectedCoinsFn', 'uptadePortfolioFn',
      'removePortfolioFn',
    ]),
    addToPortfolio() {
      this.coin.quantity = this.newQuantity;
      this.addToPortfolioFn(this.coin);
      this.cleanSelectedItem();
    },
    cleanSelectedItem() {
      this.addToSelectedCoinsFn({});
      this.$bvModal.hide('coinProcess');
    },
    uptadePortfolio() {
      this.coin.quantity = this.newQuantity;
      this.uptadePortfolioFn(this.coin);
      this.cleanSelectedItem();
    },
    removePortfolioItem() {
      this.removePortfolioFn(this.coin);
      this.cleanSelectedItem();
    },
  },
};
</script>
