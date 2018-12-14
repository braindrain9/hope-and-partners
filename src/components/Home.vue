<template>
	<div class="home d-flex justify-content-around align-items-center">
		<div>
			animation ...
		</div>
		<h1 class="main-heading">
			налагоджуємо <br/>
			зв<span class="orange-color">’</span>язки з реальністю</h1>
	</div>
</template>

<script>
  import bus from '../bus';

  export default {
    name: 'Home',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>

<style lang="scss">
	.home {
		height: 75vh;
	}

	.main-heading {
		color: $white;
		font-size: $header-font-size;
		font-weight: bold;
		letter-spacing: $base-spacing;
	}
</style>