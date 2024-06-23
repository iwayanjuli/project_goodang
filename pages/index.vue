<!-- index.vue -->

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">GOODANG</h1>
    <div class="add-button-container">
      <button v-if="!showForm" class="btn btn-primary" @click="handleAddClick">Add New Item</button>
      <input v-model="searchQuery" type="text" class="form-control search-input" placeholder="Search items..." />
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

const { $firestore, $auth } = useNuxtApp();
const items = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const selectedItem = reactive({ id: "", name: "", quantity: 1, expDate: "", imageUrl: "" });
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
  selectedItem.id = "";
  selectedItem.name = "";
  selectedItem.quantity = 1;
  selectedItem.expDate = "";
  selectedItem.imageUrl = "";
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

// Fetch items on component mount
fetchItems();
</script>

<style scoped>
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

.add-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 200px;
  margin-left: auto;
}

.container {
  padding-top: 40px;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mt-5 {
  margin-top: 3rem !important;
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
