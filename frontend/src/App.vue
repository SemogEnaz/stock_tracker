<template>

  <Home />

  <main>

    <ul class="nav nav-pills nav-fill">
      <li class="nav-item">
          <router-link 
          class="nav-link"
          active-class="active"
            :to="{ name: 'home', params: { id: 0 } }">
            Home
          </router-link>
      </li>
      <li class="nav-item">
          <router-link 
          class="nav-link"
          active-class="active"
            :to="{ name: 'addItem', params: { id: 0 } }">
            Add iPhone
          </router-link>
      </li>
      <li class="nav-item">
          <router-link 
            class="nav-link"
            active-class="active"
            :to="{ name: 'addPhoto', params: { id: 0 } }">
            Add Photos
          </router-link>
      </li>
    </ul>
  
    <br></br>

    <router-view />
    
  </main>
</template>

<script setup>
import Home from './pages/Home.vue';


</script>