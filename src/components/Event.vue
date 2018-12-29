<template>
	<div class="description">
		<div class="category-title">наступна зустріч</div>
		<div class="text light-grey-color">projector - 05 жовтня</div>
		<span class="text">
				поговоримо про те, як перезапускати успішні продукти
				з великою базою користувачів у догодити всім.<br/>
				Реєстрація: <a href="http://bit.ly/2PFuA4S">http://bit.ly/2PFuA4S</a>
			</span>
	</div>
</template>

<script>
  import bus from '../bus';

  export default {
    name: 'Event',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>

<style scoped lang="scss">
	.description {
		.category-title {
			font-weight: 500;
			line-height: 21px;
			letter-spacing: $base-spacing;
			font-size: $small-font-size;
			color: $white;
		}

		.text {
			font-weight: 500;
			font-size: 32px;
		}
	}
</style>