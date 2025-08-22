// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import the views you want to route to
import AddItem from '../pages/AddItem.vue'
import AddPhotos from '@/pages/AddPhotos.vue'
import Home from '@/pages/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/addItem/:id',
        name: 'addItem',
        component: AddItem,
        props: true
    },
    {
        path: '/addPhotos/:id',
        name: 'addPhoto',
        component: AddPhotos,
        props: true
    }
]

const router = createRouter({
  history: createWebHistory(),  // or createWebHashHistory() if you prefer # URLs
  routes
})

export default router
