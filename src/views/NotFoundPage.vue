<template>
    <div class="page-not-found d-flex align-items-center justify-content-center">
        <div class="text-center">
            {{$t('notFound')}}<br/>
            <a :href="lang === 'en' ? '/en' : '/'" class="white-color-link">{{$t('backToHome')}}</a>
        </div>
    </div>
</template>

<script>
  import {i18n} from "../i18n";

  export default {
    name: 'NotFoundPage',

    data() {
      return {
        lang: i18n.locale
      }
    }
  }
</script>

<style scoped lang="scss">
    .page-not-found {
        padding-top: 100px;
        height: $home-block-height;
    }
</style>
