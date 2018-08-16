import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Anuncios from '@/components/Anuncios'
import Mangas from '@/components/Mangas'
import NovoAnuncio from '@/components/NovoAnuncio'
import NovoManga from '@/components/NovoManga'
import Login from '@/components/Login'
import VueCookie from 'vue-cookie'


Vue.use(Router)
Vue.use(VueCookie);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { 
        requiresAuth: false,
        is_admin : false
      }
    },
    {
      path: '/Anuncios',
      name: 'Anuncios',
      component: Anuncios,
      meta: { 
        requiresAuth: true,
        is_admin : false
      }
    },
    {
      path: '/Mangas',
      name: 'Mangas',
      component: Mangas,
      meta: { 
        requiresAuth: true,
        is_admin : false
      }
    },
    {
      path: '/NovoManga',
      name: 'NovoManga',
      component: NovoManga,
      meta: { 
        requiresAuth: true,
        is_admin : false
      }
    },
    {
      path: '/NovoAnuncio',
      name: 'NovoAnuncio',
      component: NovoAnuncio,
      meta: { 
        requiresAuth: true,
        is_admin : false
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { 
        requiresAuth: false,
        is_admin : false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (Vue.cookie.get("user-token") == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
              next()
          
      }
   
  }else{
    next()
  }
})

export default router