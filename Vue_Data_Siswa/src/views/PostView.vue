<template>
  <div class="container bg-light p-3 mt-3 shadow" style="border-radius: 10px;">
    <h2 class="mt-4 text-center">Add New Siswa</h2>
    <form @submit.prevent="addUser">
      <div class="mb-3">
        <label for="nisn" class="form-label">NISN</label>
        <input type="text" id="nisn" v-model="newUser.nisn" class="form-control" placeholder="Masukkan NISN" />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" v-model="newUser.username" class="form-control" placeholder="Masukkan Username" />
      </div>
      <div class="mb-3">
        <label for="alamat" class="form-label">Alamat</label>
        <input type="text" id="alamat" v-model="newUser.alamat" class="form-control" placeholder="Masukkan Alamat" />
      </div>
      <div class="mb-3">
  <label for="kelas" class="form-label">Kelas</label>
  <select id="kelas" v-model="newUser.kelas" class="form-select">
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
      <button type="submit" class="btn btn-primary"><i class="bi bi-plus-square me-2"></i>Add</button>
       <button type="button" @click="cancelEdit" class="btn btn-danger ms-2">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const newUser = ref({
  nisn: '',
  username: '',
  alamat: '',
  kelas: '',
});

const addUser = async () => {
  try {
    await axios.post('http://localhost:3000/users', newUser.value);
    router.push('/');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

const cancelEdit = () => {
  router.push('/'); // Redirect to the home page or another route to cancel editing
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika perlu */
</style>
