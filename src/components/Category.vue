<template>
  <li class="category">
    <div class="category__title">
      <CheckBox
        :state="categoryState"
        :name="category.name"
        :isCategory="true"
        v-on:category="changeCategory($event)"
      ></CheckBox>
      <p class="category__text">
        (Выбрано {{ chosenList }} из {{ valuesLength }})
      </p>
    </div>
    <ul class="product">
      <li
        v-for="product in productList"
        :key="product.name"
        class="product__item"
        :product="product"
        :categoryName="category.name"
      >
        <CheckBox
          :name="product.name"
          :isCategory="false"
          :state="product.isChosen ? 'checked' : 'unchecked'"
          :categoryName="category.name"
          v-on:product="changeProduct($event)"
        ></CheckBox>
      </li>
    </ul>
  </li>
</template>

<script>
import CheckBox from "./CheckBox.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Category",
  components: {
    CheckBox,
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
  },
  props: {
    categoryNumber: Number,
  },
  data() {
    return {
      test: false,
      category: {},
      categoryState: "",
      valuesLength: 0,
      chosenList: 0,
      productList: [],
    };
  },

  methods: {
    ...mapMutations(["toggleProduct", "toggleCategory"]),
    async changeCategory(e) {
      console.log(e);
      let { name, boolean } = e;
      await this.toggleCategory({ name, boolean });
      console.log(this.getCategoryList[2].values);
      this.getCategoryState();
    },
    changeProduct(e) {
      console.log(e);
      let { name, boolean, categoryName } = e;
      this.toggleProduct({
        name,
        boolean,
        categoryName,
      });
      this.getCategoryState();
    },
    getCategoryState() {
      this.chosenList = 0;
      this.valuesLength = this.category.values.length;
      this.productList = [];
      for (let i = 0; i < this.valuesLength; i++) {
        const product = this.category.values[i];

        if (product != null) {
          this.productList.push(product);
          if (product.isChosen) this.chosenList++;
        }
      }
      switch (true) {
        case this.chosenList == this.valuesLength:
          this.categoryState = "checked";
          break;
        case this.chosenList < this.valuesLength && this.chosenList != 0:
          this.categoryState = "some";
          break;
        case this.chosenList == 0:
          this.categoryState = "unchecked";
          break;
      }
    },
  },
  mounted() {
    this.category = this.getCategoryList[this.categoryNumber - 1];

    this.getCategoryState();
  },
};
</script>
<style scoped lang="scss">
.category {
  &__title {
    display: flex;
    flex-direction: row;
  }
  &__text {
    margin-left: 5px;
  }
}
.product {
  margin-top: 10px;
  margin-left: 20px;
  &__item {
    margin-top: 5px;
  }
}
</style>
