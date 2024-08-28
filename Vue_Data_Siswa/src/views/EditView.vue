<template>
  <div class="container bg-light p-3 mt-3" style="border-radius: 10px;">
    <h2 class="mt-4">Edit Siswa</h2>
    <form @submit.prevent="updateUser">
      <div class="mb-3">
        <label for="nisn" class="form-label">NISN</label>
        <input type="text" id="nisn" v-model="user.nisn" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" v-model="user.username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="alamat" class="form-label">Alamat</label>
        <input type="text" id="alamat" v-model="user.alamat" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="kelas" class="form-label">Kelas</label>
        <select id="kelas" v-model="user.kelas" class="form-select">
          <option value="" disabled>Pilih Kelas</option>
          <!-- Kelas untuk setiap tahun dan jurusan -->
          <option value="X RPL">X RPL</option>
          <option value="X TKJ">X TKJ</option>
          <option value="X DKV">X DKV</option>
          <option value="X TPTL">X TPTL</option>
          <option value="XI RPL">XI RPL</option>
          <option value="XI TKJ">XI TKJ</option>
          <option value="XI DKV">XI DKV</option>
          <option value="XI TPTL">XI TPTL</option>
          <option value="XII RPL">XII RPL</option>
          <option value="XII TKJ">XII TKJ</option>
          <option value="XII DKV">XII DKV</option>
          <option value="XII TPTL">XII TPTL</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
      <button type="button" @click="cancelEdit" class="btn btn-danger ms-2">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const user = ref({
  nisn: '',
  username: '',
  alamat: '',
  kelas: '',
});

const fetchUser = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${route.params.id}`);
    user.value = response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const updateUser = async () => {
  try {
    await axios.put(`http://localhost:3000/users/${route.params.id}`, user.value);
    router.push('/');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const cancelEdit = () => {
  router.push('/'); // Redirect to the home page or another route to cancel editing
};

onMounted(fetchUser);
</script>

<style scoped>
/* Tambahkan styling tambahan jika perlu */
</style>
