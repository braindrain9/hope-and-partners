<template><div class="services">services</div></template>

<script>
  import bus from '../bus';

  export default {
    name: 'Services',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>

<style scoped lang="scss">
	.services {
		height: $home-block-height;
	}
</style>