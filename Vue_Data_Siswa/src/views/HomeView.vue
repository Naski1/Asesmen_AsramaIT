<template>
  <div class="container bg-light p-1 mt-3 shadow" style="border-radius: 10px;">
    <h2 class="mt-4 text-center">Data Siswa SMK Nurul Jadid</h2>

    <!-- Input Search dan Filter Kelas -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <RouterLink to="/post" class="btn btn-primary shadow ms-2">
        <i class="bi bi-plus-square me-2"></i>Add New Siswa
      </RouterLink>

      <div class="d-flex align-items-center">
        <select v-model="selectedKelas" class="form-select shadow-sm me-2" style="max-width: 150px; border-radius: 10px;">
          <option value="">Pilih Kelas</option>
          <option value="RPL">RPL</option>
          <option value="TKJ">TKJ</option>
          <option value="DKV">DKV</option>
          <option value="TPTL">TPTL</option>
        </select>

        <div class="input-group" style="max-width: 300px;">
          <input
            type="text"
            v-model="searchQuery"
            class="form-control shadow-sm"
            placeholder="Cari Nama Siswa..."
            style="border-radius: 10px 0 0 10px; padding: 0.5rem;">
          <button class="btn btn-secondary shadow-sm" type="button" style="border-radius: 0 10px 10px 0;">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Tabel Data Siswa -->
    <table class="table table-striped mt-3 shadow text-center">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">NISN</th>
          <th scope="col">Nama Siswa</th>
          <th scope="col">Alamat</th>
          <th scope="col">Kelas</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedUsers" :key="user.id">
          <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
          <td>{{ user.nisn }}</td>
          <td class="text-start">{{ user.username }}</td>
          <td>{{ user.alamat }}</td>
          <td>{{ user.kelas }}</td>
          <td>
            <RouterLink :to="`/edit/${user.id}`" class="btn btn-warning btn-sm shadow">
              <i class="bi bi-pencil-square me-1"></i>Edit
            </RouterLink>
            <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm ms-2 shadow">
              <i class="bi bi-trash3 me-1"></i>Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Kontrol Paginasi -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center mt-3">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const searchQuery = ref('');
const selectedKelas = ref('');
const currentPage = ref(1);
const itemsPerPage = 7;

// Fetch users from the API
const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Computed property for filtering users based on search query and selected class
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesName = user.username.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesKelas = selectedKelas.value ? user.kelas.includes(selectedKelas.value) : true;
    return matchesName && matchesKelas;
  });
});

// Computed property for paginated users
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage);
});

// Change page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/users/${id}`);
    users.value = users.value.filter(user => user.id !== id);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

onMounted(fetchUsers);
</script>


<style scoped>
.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}
/* Styling tambahan jika diperlukan */
</style>
