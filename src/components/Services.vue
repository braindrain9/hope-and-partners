<template>
	<div class="services">
		<h1 class="heading heading-main">послуги<span class="orange-color">:</span></h1>

		<div class="services-slider">
			<div class="slide fp-auto-height" v-for="i in 5" :key="i">
				<div class="slider-item d-flex justify-content-center align-items-center">
					<div>animation...</div>
					<div class="text-block">
						<div class="bg-number">{{i}}</div>
						<p>розробка та проведення автетичних навчальних курсів з комунікації для бізнес-шкіл та освітніх інституцій</p>
						<div class="description">
							нескромно про драйвовість, але маєте шанс переконатися <a href="">тут</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

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

		.heading {
			padding-left: 100px;
		}

		.services-slider {
			height: calc(100% - 100px);
			width: 100%;

			.text-block {
				color: $white;
				max-width: 450px;
				position: relative;
				margin-left: 25px;

				p {
					font-weight: bold;
					line-height: 34px;
					font-size: 24px;
					position: relative;
					margin-bottom: 20px;
				}

				.description {
					line-height: 20px;
					font-size: 14px;
					color: #BCBFC1;
				}

				.bg-number {
					font-weight: bold;
					line-height: 127px;
					font-size: 90px;
					color: #1E1E1E;
					position: absolute;
					left: -25px;
					top: -45px;
				}
			}
		}
	}
</style>