<template>
  <!-- <div class="container mt-5"> -->
    <title>GOODANG</title>
    <h1 class="text-center mb-4">
      <span class="g">G</span><span class="o">O</span><span class="o">O</span><span class="d">D</span><span class="a">A</span><span class="n">N</span><span class="g">G</span>
    </h1>
    <div class="add-button-container mb-4">
        <button v-if="!showForm" class="btn btn-primary centered-btn" @click="handleAddClick">
          <span class="circle" aria-hidden="true">
            <span class="fas fa-plus"></span>
          </span>
          <span class="button-text">Tambah Barang</span> 
        </button>
        <div class="search-container">
        <input v-model="searchQuery" type="text" class="form-control search-input" placeholder="Search items..." />
        <i class="fas fa-search search-icon"></i>
      </div>
    </div>
    <ItemForm v-if="showForm" :initial-item="selectedItem" :is-edit="isEdit" @submit="handleFormSubmit" @cancel="handleFormCancel" />
    <ItemList :items="filteredItems" @edit="handleEditClick" @delete="handleDeleteClick" />
  <!-- </div> -->
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

// Fetch items on component mount
fetchItems();
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

/* Custom Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #7A85B8;
   /* rgba(255, 185, 255, 0.8); Ungu dengan 80% opacity */
  }

h1 {
  color: #343a40;
  font-weight: bold;
  text-align: center;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #7A85B8;
  /* rgba(255, 185, 255, 0.8); Ungu dengan 80% opacity */
}

.add-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-primary {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline-end: 20%;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  height: 5vh;
}

.fa-plus {
  padding-left: 20px;
}

.btn-primary:hover {
  background-color: #5966A6;
  /* rgba(214, 31, 214, 0.8); */
  color: #f8f9fa
}

.centered-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.centered-btn .button-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap; 
}

.search-container {
  position: relative;
  padding-right: 5%;
  flex-grow: 1;
  margin-left: 3%;
 
}

.search-input {
  width: 100%;
  padding-left: 50px;
  height: 4.3vh;
  font-size: large;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 0vh;
  transform: translateY(-50%);
  color: #6c757d;
  size: large;
  padding-left: 2vh;
}

/* .mt-5 {
  margin-top: 3rem !important;
} */

.mb-4 {
  margin-bottom: 1.5rem !important;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.g {
  color: #4285F4; /* Blue */
  font-size: 10vh;
}
.o {
  color: #EA4335; /* Red */
  font-size: 10vh;
}
.d {
  color: #FBBC05; /* Yellow */
  font-size: 10vh;
}
.a {
  color: #34A853; /* Green */
  font-size: 10vh;
}
.n {
  color: #EA4335; /* Red */
  font-size: 10vh;
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
