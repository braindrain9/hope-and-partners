<template>
	<div class="hero d-flex justify-content-around align-items-center">
		<div>
			animation ...
		</div>
		<div>
			<h1
					class="heading heading-main"
					data-aos="fade-zoom-in"
					data-aos-easing="ease-in-back"
					data-aos-offset="0"
					data-aos-duration="900"
			>
				налагоджуємо <br/>
				зв<span class="orange-color">’</span>язки з реальністю
			</h1>
			<a href="#about" class="grey-color-link">
				<span class="horizontal-divider"></span>
				детальніше
			</a>
		</div>
	</div>
</template>

<script>
  import bus from '../bus';

	export default {
	  name: 'Hero',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
	}
</script>

<style scoped lang="scss">
	.hero {
		height: $home-block-height;

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
	}
</style>