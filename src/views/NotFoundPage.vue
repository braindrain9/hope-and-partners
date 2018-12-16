<template>
	<div class="page-not-found d-flex align-items-center justify-content-center">
		<div class="text-center">
			Cторінка, яку Ви шукаєте, не існує.<br/>
			<b-link to="/" class="white-color-link">Повернутись на головну</b-link>
		</div>
	</div>
</template>

<script>
  import bus from '../bus';

  export default {
    name: 'NotFoundPage',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>

<style scoped lang="scss">
  .page-not-found {
		height: 75vh;
	}
</style>
