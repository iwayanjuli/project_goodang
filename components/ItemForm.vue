<template>
  <div>
    <h2>{{ isEdit ? "Edit Item" : "Add Item" }}</h2>
    <form @submit.prevent="handleSubmit" class="item-form">
      <div class="form-group">
        <label for="name">Nama Barang:</label>
        <input type="text" v-model="item.name" id="name" required />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <input type="number" v-model="item.quantity" id="quantity" required />
      </div>
      <div class="form-group">
        <label for="expDate">Exp. Date:</label>
        <input type="date" v-model="item.expDate" id="expDate" required />
      </div>
      <div class="form-group">
        <label for="image">Gambar:</label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" />
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="Preview" class="preview-image" />
      </div>
      <div class="button-group">
        <button type="submit">{{ isEdit ? "Update" : "Add" }}</button>
        <button type="button" @click="resetForm">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    initialItem: {
      type: Object,
      default: () => ({ name: "", quantity: 1, expDate: "", imageUrl: "" }),
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
      this.item = { name: "", quantity: 1, expDate: "", imageUrl: "" };
      this.$emit("cancel");
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.item.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.item.imageUrl = "";
      }
    },
  },
};
</script>

<style scoped>
.item-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="date"],
input[type="file"] {
  width: calc(100% - 20px);
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.button-group {
  text-align: right;
  margin-top: 15px;
}

.preview-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
