<template>
  <div>
    <h2>{{ isEdit ? "Edit Item" : "Add Item" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="id">ID Barang:</label>
        <input type="text" v-model="item.id" id="id" :disabled="isEdit" required />
      </div>
      <div>
        <label for="name">Nama Barang:</label>
        <input type="text" v-model="item.name" id="name" required />
      </div>
      <div>
        <label for="quantity">Quantity:</label>
        <input type="number" v-model="item.quantity" id="quantity" required />
      </div>
      <div>
        <label for="expDate">Exp. Date:</label>
        <input type="date" v-model="item.expDate" id="expDate" required />
      </div>
      <button type="submit">{{ isEdit ? "Update" : "Add" }}</button>
      <button type="button" @click="resetForm">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    initialItem: {
      type: Object,
      default: () => ({ id: "", name: "", quantity: 1, expDate: "" }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      item: { ...this.initialItem },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.item);
      this.resetForm();
    },
    resetForm() {
      this.item = { id: "", name: "", quantity: 1, expDate: "" };
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan Anda */
</style>
