<template>
    <div class="page-preloader d-flex align-items-center justify-content-center">
        <span class="preloader-bar"></span>
        <img :src="imageUrl" alt="loader image">
    </div>
</template>

<script>
  export default {
    name: 'Loader',

    data() {
      return {
        imageUrl: this.$store.state.content_endpoint + 'dist/src/assets/img/loader.gif'
      }
    }
  }
</script>

<style scoped lang="scss">
    .page-preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $base-black;
        z-index: 999;
        text-align: center;

        img {
            opacity: 0;
            display: block;
        }
    }

    .preloader-bar {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 5px;
        background: $orange;
        -webkit-box-shadow: 0 2px 5px rgba(94, 86, 86, .05);
        box-shadow: 0 2px 5px rgba(94, 86, 86, .05)
    }

    .is-hidden {
        visibility: hidden;
        opacity: 0;
    }
</style>
