import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  mutations: {
    toggleProduct(state, value) {
      const { name, boolean, categoryName } = value;

      for (let indexCat in state.categoryList) {
        const category = state.categoryList[indexCat];

        if (category.name == categoryName) {
          for (let indexProd in category.values) {
            if (category.values[indexProd].name == name) {
              state.categoryList[indexCat].values[indexProd].isChosen = boolean;

              break;
            }
          }
        }
      }
    },
    toggleCategory(state, value) {
      const { name, boolean } = value;
      for (let indexCat in state.categoryList) {
        const category = state.categoryList[indexCat];
        console.log(name);
        if (category.name == name) {
          // console.log(category.values);
          for (let indexProd in category.values) {
            console.log(
              state.categoryList[indexCat].values[indexProd].name,
              state.categoryList[indexCat].values[indexProd].isChosen
            );
            state.categoryList[indexCat].values[indexProd].isChosen = !boolean;
            console.log(
              state.categoryList[indexCat].values[indexProd].name,
              state.categoryList[indexCat].values[indexProd].isChosen
            );
            // const product = category.values[indexProd];
            // product.isChosen = !boolean;
          }
          break;
        }
      }
    },
  },
  state: {
    categoryList: [
      {
        name: "Овощи",
        values: [
          { name: "Огурцы", isChosen: true },
          { name: "Морковь", isChosen: false },
          { name: "Помидоры", isChosen: false },
        ],
      },
      {
        name: "Фрукты",
        values: [
          { name: "Бананы", isChosen: true },
          { name: "Яблоки", isChosen: true },
          { name: "Груши", isChosen: true },
        ],
      },
      {
        name: "Ягоды",
        values: [
          { name: "Малина", isChosen: false },
          { name: "Клубника", isChosen: false },
          { name: "Черника", isChosen: false },
        ],
      },
    ],
  },

  getters: {
    getCategoryList(state) {
      return state.categoryList;
    },
    getCategoryListLength(state) {
      return state.categoryList.length;
    },
  },
});
