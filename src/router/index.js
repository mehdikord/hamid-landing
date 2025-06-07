import { createRouter, createWebHistory } from 'vue-router'
import Forms from "@/views/Landing/Forms.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/landing/forms/:token',
      component : Forms
    }
  ],
})

export default router
