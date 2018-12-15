<template>
	<div class="home d-flex justify-content-around align-items-center">
		<div>
			animation ...
		</div>
		<div>
			<h1 class="main-heading">
				налагоджуємо <br/>
				зв<span class="orange-color">’</span>язки з реальністю
			</h1>
			<router-link :to="'/about'" class="grey-color-link">
				<span class="horizontal-divider"></span>
				детальніше
			</router-link>
		</div>
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
		margin-bottom: 25px;
	}

	.horizontal-divider {
		position: relative;
		width: 30px;
		height: 2px;
		background-color: $orange;
		display: inline-block;
		vertical-align: middle;
		margin-right: 10px;
		margin-left: 15px;

		&:before {
			content: '';
			position: absolute;
			display: inline-block;
			height: 2px;
			width: 8px;
			background: $orange;
			left: -15px;
		}
	}
</style>