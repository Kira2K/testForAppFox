<template>
  <div class="form">
    <h1 class="form__title">Выбрать категорию</h1>
    <ul class="form__category-list">
      <Category
        v-for="index in getCategoryListLength"
        :key="index"
        class="form__category-item"
        :categoryNumber="index"
      ></Category>
    </ul>
    <button class="form__button">
      <p class="form__button-text" @click="save()">Сохранить</p>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Category from "./Category.vue";

export default {
  name: "Form",
  components: {
    Category,
  },

  computed: {
    ...mapGetters(["getCategoryListLength", "getCategoryList"]),
  },
  methods: {
    save() {
      this.$emit("saveForm", this.getCategoryList);
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  min-width: 800px;
  display: flex;
  flex-direction: column;
  &__title {
    font-size: 30px;
  }
  &__category-list {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &__category-item {
    font-size: 20px;
  }
  &__button {
    margin-top: 20px;
    margin-left: auto;
    max-width: 150px;
    background-color: #0b76ef;
    padding: 10px 15px;
  }
  &__button-text {
    color: white;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>
