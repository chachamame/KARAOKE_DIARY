<template>
  <div class="column">
    <div class="title">
      <router-link :to="{
         name: 'artists'}">
        <span class="icon is-medium has-text-primary">
          <i class="fas fa-arrow-circle-left"></i>
        </span>
      </router-link>
      <span class="has-text-grey">
        {{ $route.params.name }}
      </span>
      <register-song-modal :artist-id="+$route.params.id" @registered="reload"></register-song-modal>
    </div>
    <div v-if="!isLoading" class="tile is-ancestor">
      <div v-for="song in songs" class="tile is-parent is-4 song">
        <button class="delete dltbtn" @click="deleteSong(song)"></button>
        <router-link :to="{
          name: 'song_detail',
          params:{
            id: song.id ,
            artist_id : $route.params.id ,
            song_name: song.name ,
            artist_name: $route.params.name ,
          }
        }" class="tile is-child notification is-primary box">
          <p class="title">{{song.name}}</p>
        </router-link>
      </div>
    </div>
    <loading-display-modal v-if="isLoading"></loading-display-modal>
  </div>
</template>

<script>
  import LoadingDisplayModal from './LoadingDisplayModal.vue'

  export default {
      data: function(){
        return{
          songs: [] ,
          isLoading : false ,
        }
      },
      components:{
        RegisterSongModal ,
        LoadingDisplayModal ,
      } ,
      created(){
        this.getSongs();
      },
      computed:{
        songs_count: function() {
            return this.songs.length
        }
      },
      methods : {
        getSongs: function(){
          this.isLoading = true
          axios.get('/api/artists/'+ this.$route.params.id )
          .then( (res) => {
            this.songs = res.data.data ;
            this.isLoading = false ;
          });
        },
        reload: function(){
          this.getSongs()
        },
      }
  }
</script>

<style media="screen">
.song{
  position: relative;
}
</style>
