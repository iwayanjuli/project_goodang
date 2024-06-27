<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">GOODANG</h1>
    <div class="add-button-container mb-4">
      <button v-if="!showForm" class="btn btn-primary" @click="handleAddClick">
        <i class="fas fa-plus"></i> Tambah Barang
      </button>
      <div class="search-container">
        <input v-model="searchQuery" type="text" class="form-control search-input" placeholder="Search items..." />
        <i class="fas fa-search search-icon"></i>
      </div>
    </div>
    <ItemForm v-if="showForm" :initial-item="selectedItem" :is-edit="isEdit" @submit="handleFormSubmit" @cancel="handleFormCancel" />
    <ItemList :items="filteredItems" @edit="handleEditClick" @delete="handleDeleteClick" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useNuxtApp } from "#app";
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import ItemForm from "~/components/ItemForm.vue";
import ItemList from "~/components/ItemList.vue";

const { $firestore } = useNuxtApp();
const items = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const selectedItem = reactive({ name: "", quantity: 1, expDate: "", imageUrl: "" });
const searchQuery = ref("");

const itemsCollection = collection($firestore, "goodang");

const fetchItems = async () => {
  try {
    const querySnapshot = await getDocs(itemsCollection);
    items.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching items: ", error);
  }
};

const handleAddClick = () => {
  Object.assign(selectedItem, { name: "", quantity: 1, expDate: "", imageUrl: "" });
  isEdit.value = false;
  showForm.value = true;
};

const handleEditClick = (item) => {
  Object.assign(selectedItem, item);
  isEdit.value = true;
  showForm.value = true;
};

const handleDeleteClick = async (id) => {
  try {
    await deleteDoc(doc(itemsCollection, id));
    items.value = items.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
};

const handleFormSubmit = async (item) => {
  try {
    if (isEdit.value) {
      await updateDoc(doc(itemsCollection, item.id), item);
      const index = items.value.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        items.value.splice(index, 1, item);
      }
    } else {
      const docRef = await addDoc(itemsCollection, item);
      item.id = docRef.id;
      items.value.push(item);
    }
    showForm.value = false;
  } catch (error) {
    console.error("Error submitting form: ", error);
  }
};

const handleFormCancel = () => {
  showForm.value = false;
};

// Computed property to filter items based on the search query
const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return items.value;
  }
  return items.value.filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// Computed property to calculate total quantity
const totalQuantity = computed(() => {
  return items.value.reduce((total, item) => total + item.quantity, 0);
});

// Fetch items on component mount
fetchItems();
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

/* Custom Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

h1 {
  color: #343a40;
  font-weight: bold;
  text-align: center;
}

h2 {
  color: #343a40;
  font-weight: bold;
  text-align: center;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-primary {
  display: flex;
  align-items: center;
}

.btn-primary i {
  margin-right: 8px;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.search-container {
  position: relative;
  flex-grow: 1;
  margin-left: 10px;
}

.search-input {
  width: 100%;
  padding-right: 30px;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #6c757d;
}

.mt-5 {
  margin-top: 3rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

@media (max-width: 576px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
