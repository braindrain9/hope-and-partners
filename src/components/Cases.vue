<template><div class="cases">cases</div></template>

<script>
	import bus from '../bus';

  export default {
    name: 'Cases',

    created: function () {
			bus.$emit('toggleLoading', false);
    }
  }
</script>

<style scoped lang="scss">
	.cases {
		height: $home-block-height;
	}
</style>