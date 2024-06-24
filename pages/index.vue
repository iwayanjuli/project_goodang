<!-- pages/index.vue -->
<template>
  <div>
    <h1>GOODANG</h1>
    <ItemForm v-if="showForm" :initial-item="selectedItem" :is-edit="isEdit" @submit="handleFormSubmit" @cancel="handleFormCancel" />
    <button v-if="!showForm" @click="handleAddClick">Add New Item</button>
    <ItemList :items="items" @edit="handleEditClick" @delete="handleDeleteClick" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useNuxtApp } from "#app";
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import ItemForm from "~/components/ItemForm.vue";
import ItemList from "~/components/ItemList.vue";

const { $firestore, $auth } = useNuxtApp();
const items = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const selectedItem = reactive({ id: "", name: "", quantity: 1, expDate: "" });

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
      await addDoc(itemsCollection, item);
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

// Fetch items on component mount
fetchItems();
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan Anda */
</style>
