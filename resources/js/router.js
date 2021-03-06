import VueRouter from 'vue-router' ;

//Routing
const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path:'*' ,
      redirect: '/'
    },
    {
      path: '/' ,
      component: require('./components/ContentMain.vue') ,
      name: 'main'
    },
    {
      path: '/loging' ,
      component: require('./components/LoginWaiting.vue') ,
      name: 'loging'
    },
    {
      path: '/register-song' ,
      component: require('./components/RegisterSong.vue') ,
      name: 'register-song' ,
      meta: { requiresAuth: true }
    },
    {
      path: '/register-artist' ,
      component: require('./components/RegisterArtist.vue') ,
      name: 'register-artist',
      meta: { requiresAuth: true }
    },
    {
      path: '/artists' ,
      component: require('./components/ShowArtists.vue') ,
      name: 'artists' ,
      meta: { requiresAuth: true }
    },
    {
      path: '/artists/songs/:id/:name' ,
      component: require('./components/ShowSongs.vue') ,
      name: 'songs' ,
      meta: { requiresAuth: true }
    },
    {
      path: '/artists/songs/:artist_id/:artist_name/:id/:song_name' ,
      component: require('./components/ShowSongDetails.vue') ,
      name: 'song_detail',
      meta: { requiresAuth: true }
    },
    {
      path: '/artists/songs/:artist_name/:song_name/create' ,
      component: require('./components/CreateSongDetails.vue') ,
      name: 'create_songdetail' ,
      meta: { requiresAuth: true }
    },
    {
      path: '/categories' ,
      component: require('./components/ShowAllCategories.vue') ,
      name: 'categories' ,
      meta: { requiresAuth: true }
    },
    {
      path: '/categories/:category_id/:category_name/songs' ,
      component: require('./components/ShowSongsHaveCategory.vue') ,
      name: 'categories_songs' ,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach( ( to , from , next ) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth )
  if( requiresAuth ){
    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        //認証している場合
        next()
      }else{
        //認証していない場合
        next({
          path: '/' ,
        })
      }
    })
  }else{
    next()
  }
})

export default router
