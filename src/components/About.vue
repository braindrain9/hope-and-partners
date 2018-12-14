<template><div>about</div></template>

<script>
  import bus from '../bus';

  export default {
    name: 'About',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>