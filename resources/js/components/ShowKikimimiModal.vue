<template>
    <ModalBase @close="closeModal" v-if="modal">
        <div class="video">
          <iframe :src="URL" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      <template slot="submit">
        <button class="button is-primary" @click.prevent="closeModal">閉じる</button>
      </template>
    </ModalBase>
</template>

<script>
import ModalBase from './ModalBase.vue'

export default {
  components: { ModalBase },
  data() {
    return {
      modal: true,
      isLoading: false ,
    }
  },
  props: {
    URL: {
      type: String ,
      required: true ,
    },
  },
  methods: {
    closeModal: function() {
      this.$emit('close')
      this.modal = false
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
