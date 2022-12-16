import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coinList: [],
    loading: false,
    selectedCoin: {},
    portfolios: JSON.parse(localStorage.getItem('portfolios')) || [],
  },
  getters: {
    getLoading: (state) => state.loading,
    getCoinList: (state) => state.coinList,
    getSelectedCoin: (state) => state.selectedCoin,
    getPortfolios: (state) => state.portfolios,
  },
  mutations: {
    setLoading: (state, value) => {
      state.loading = value;
    },
    pushCoinList: (state, coinList) => {
      state.coinList = coinList;
    },
    setSelectedCoin: (state, coin) => {
      state.selectedCoin = coin;
    },
    setPortfolio: (state, coin) => {
      state.portfolios.push(coin);
    },
    updatePortfolio: (state, { symbol, quantity }) => {
      state.portfolios.find((item) => item.symbol === symbol).quantity = quantity;
    },
    removePortfolio: (state, { symbol }) => {
      const removedItemIndex = state.portfolios.findIndex((item) => item.symbol === symbol);
      state.portfolios.splice(removedItemIndex, 1);
    },
    setLocaleStorage: (state) => {
      const stringifyPortfolios = JSON.stringify(state.portfolios);
      localStorage.setItem('portfolios', stringifyPortfolios);
    },
    refreshPortfolios: (state) => {
      const refreshedData = state.portfolios.map((portfolio) => {
        const newData = state.coinList.find((item) => item.symbol === portfolio.symbol);
        return {
          ...newData,
          quantity: portfolio.quantity,
        };
      });
      state.portfolios = refreshedData;
    },

  },
  actions: {
    async getCoinListFn({ commit }) {
      commit('setLoading', true);
      await axios.get('https://api2.binance.com/api/v3/ticker/24hr')
        .then(({ data }) => {
          commit('setLoading', false);
          commit('pushCoinList', data);
        });
    },
    addToSelectedCoinsFn({ commit }, coin) {
      commit('setSelectedCoin', coin);
    },
    addToPortfolioFn({ commit }, coin) {
      commit('setPortfolio', coin);
      commit('setLocaleStorage');
    },
    uptadePortfolioFn({ commit }, coin) {
      commit('updatePortfolio', coin);
      commit('setLocaleStorage');
    },
    removePortfolioFn({ commit }, coin) {
      commit('removePortfolio', coin);
      commit('setLocaleStorage');
    },
    async refreshPortfoliosFn({ commit, dispatch }) {
      await dispatch('getCoinListFn');
      commit('refreshPortfolios');
      commit('setLocaleStorage');
    },

  },
  modules: {
  },
});
