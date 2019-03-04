<template>
	<div class="page-not-found d-flex align-items-center justify-content-center">
		<div class="text-center">
			{{$t('notFound')}}<br/>
			<a href="/" class="white-color-link">{{$t('backToHome')}}</a>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'NotFoundPage'
  }
</script>

<style scoped lang="scss">
  .page-not-found {
		padding-top: 100px;
		height: 80vh;
	}
</style>
