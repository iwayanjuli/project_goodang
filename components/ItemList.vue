<template>
  <div class="list-container">
    <div class="header-container">
      <h2>Daftar Barang</h2>
      <h2>Total Barang: {{ totalQuantity }}</h2>
    </div>
    
    <div class="item-list">
      <div class="item-card" v-for="item in items" :key="item.id">
        <img :src="item.imageUrl" alt="Gambar" class="item-image" v-if="item.imageUrl" />
        <div class="item-details">
          <p><strong>Nama Barang:</strong> {{ item.name }}</p>
          <p><strong>Quantity:</strong> {{ item.quantity }}</p>
          <p><strong>Exp. Date:</strong> {{ item.expDate }}</p>
        </div>
        <div class="item-actions">
          <button @click="$emit('edit', item)" class="btn btn-primary btn-sm">Edit</button>
          <button @click="$emit('delete', item.id)" class="btn btn-danger btn-sm">Delete</button>
        </div>
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
  computed: {
    totalQuantity() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.list-container{
  margin-left: 20%;
  margin-right: 20%;
  font-family: 'Poppins', sans-serif;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #5966A6;
   /* #e85fec; */
  color: white;
  border-bottom: 1px solid #ccc;
}

.header-container h2 {
  margin: 0;
}


.item-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Mengatur 3 kolom dengan lebar yang sama */
  flex-direction: column;
  gap: 10px;
  font-family: 'Poppins', sans-serif;
}

.item-card:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.item-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  max-width: 100px;
  height: auto;
  margin-right: 15px;
  border-radius: 8px;
}

.item-details {
  flex-grow: 1;
}

.item-details p {
  margin: 5px 0;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
}

.btn {
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
