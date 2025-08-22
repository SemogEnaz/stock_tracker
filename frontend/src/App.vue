<template>
  <h1>Hello App!</h1>
  <main>
     <router-link :to="{ name: 'addItem', params: { id: 0 } }">
      Go to Add Item
    </router-link>

    <router-link :to="{ name: 'addPhoto', params: { id: 0 } }">
      Go to Add Photos
    </router-link>
    <br></br>
    <router-view />
  </main>
</template>