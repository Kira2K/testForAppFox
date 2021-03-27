<template>
  <div>
    <input
      v-on:change="isCategory ? changeCategory() : changeProduct()"
      type="checkbox"
      class="checkbox"
      :class="`checkbox_${state}`"
      :id="name"
      :name="name"
      v-model="isChecked"
    />

    <label :for="name">{{ name }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckBox",

  props: {
    state: String,
    name: String,
    isCategory: Boolean,
    categoryName: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    getIsChecked() {
      this.isChecked = this.state == "unchecked" ? false : true;
    },
    changeProduct() {
      this.$emit("product", {
        name: this.name,
        boolean: this.isChecked,
        categoryName: this.categoryName,
      });
    },
    changeCategory() {
      this.$emit("category", { name: this.name, boolean: this.isChecked });
    },
  },
  mounted() {
    console.log(this.categoryName);
    this.getIsChecked();
  },
};
</script>
<style scoped lang="scss">
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  &:checked + label::before {
  }
  &_checked + label::before {
    border-color: #0b76ef;
    background-color: #0b76ef;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
  &_some + label::before {
    border-color: #0b76ef;
    background-color: #0b76ef;
    color: white;
    // content: "—";
    content: "-";

    padding-left: 5px;
  }
  &_unchecked {
  }
}
</style>
