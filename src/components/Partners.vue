<template><div>partners</div></template>

<script>
  import bus from '../bus';

	export default {
	  name: 'Partners',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
	}
</script>