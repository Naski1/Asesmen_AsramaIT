<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark fw-bold">
    <div class="container-fluid">
      <RouterLink class="navbar-brand d-flex align-items-center" :to="{ name: 'home' }">
        <img src="/logo.png" alt="Logo" class="me-3 ms-3" style="width: 60px;">
        <h3 class="mb-0">SMK Nurul Jadid</h3>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <div class="navbar-nav ms-auto">
          <RouterLink 
            class="nav-link" 
            :to="{ name: 'home' }" 
            exact-active-class="active"
          >
            Home
          </RouterLink>
          <RouterLink 
            class="nav-link" 
            :to="{ name: 'post' }" 
            exact-active-class="active"
          >
            Post
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>



<style>
</style>

