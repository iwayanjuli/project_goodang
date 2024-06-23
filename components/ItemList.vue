<template>
  <div>
    <div v-for="item in items" :key="item.id" class="item">
      <div class="item-content">
        <div class="item-image-container">
          <img :src="item.imageUrl" alt="Item Image" class="item-image" />
        </div>
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-details">
            <div>Quantity: {{ item.quantity }}</div>
            <div>Expires on: {{ item.expDate }}</div>
          </div>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-warning" @click="$emit('edit', item)">Edit</button>
        <button class="btn btn-danger" @click="$emit('delete', item.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
}

.item-content {
  display: flex;
  align-items: center;
  flex: 1;
  /* Mengisi ruang yang tersedia */
}

.item-image-container {
  width: 100px; /* Atur lebar gambar sesuai kebutuhan */
  height: 100px; /* Atur tinggi gambar sesuai kebutuhan */
  overflow: hidden;
  margin-right: 20px;
}

.item-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.item-info {
  flex: 1; /* Mengisi ruang yang tersedia */
}

.item-name {
  font-weight: bold;
  color: #343a40;
  margin-bottom: 5px;
}

.item-details {
  color: #6c757d;
}

.item-actions {
  display: flex;
  gap: 10px;
}
</style>
