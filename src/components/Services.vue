<template><div>services</div></template>

<script>
  import bus from '../bus';

  export default {
    name: 'Services',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>