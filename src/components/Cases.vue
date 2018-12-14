<template><div>cases</div></template>

<script>
	import bus from '../bus';

  export default {
    name: 'Cases',

    created: function () {
			bus.$emit('toggleLoading', false);
    }
  }
</script>