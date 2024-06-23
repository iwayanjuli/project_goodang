<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ isEdit ? "Edit Item" : "Add New Item" }}</h5>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input v-model="item.name" type="text" class="form-control" id="name" required />
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input v-model.number="item.quantity" type="number" class="form-control" id="quantity" required />
        </div>
        <div class="mb-3">
          <label for="expDate" class="form-label">Expiration Date</label>
          <input v-model="item.expDate" type="date" class="form-control" id="expDate" required />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Image</label>
          <input type="file" class="form-control" id="image" accept="image/*" @change="handleFileUpload" />
        </div>
        <div v-if="item.imageUrl" class="mb-3">
          <img :src="item.imageUrl" alt="Item Image" class="img-fluid" style="max-height: 200px" />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">{{ isEdit ? "Update" : "Add" }}</button>
          <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  initialItem: {
    type: Object,
    required: true,
  },
  isEdit: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["submit", "cancel"]);
const item = ref({ ...props.initialItem });

watch(
  () => props.initialItem,
  (newVal) => {
    item.value = { ...newVal };
  }
);

const handleSubmit = () => {
  emit("submit", item.value);
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      item.value.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.card {
  margin-top: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.card-title {
  text-align: center;
  color: #343a40;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
