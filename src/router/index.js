import Vue from 'vue'
import Router from 'vue-router'
import ImagensEmocao from '@/components/ImagensEmocao'
import TesteLayout from '@/components/TesteLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ImagensEmocao',
      component: ImagensEmocao
    },
    {
      path: '/teste',
      name: 'TesteLayout',
      component: TesteLayout
    }
  ]
})
