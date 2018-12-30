<template>
	<div class="services">
		<canvas id="canvas"></canvas>
		<b-container class="section-container services-section">
			<h1 class="heading heading-main">послуги<span class="orange-color">:</span></h1>
				<div class="services-slider">
					<div class="slide fp-auto-height" v-for="(item, index) in services" :key="index">
						<div class="slider-item d-flex justify-content-end align-items-center">
							<div class="text-block">
								<span class="letter d-none">{{item.letter}}</span>
									<div class="bg-number">{{index + 1}}</div>
									<p>{{item.title}}</p>
									<div class="description" v-html="item.description"></div>
								</div>
							</div>
						</div>
					</div>
				<Footer link="partners"/>
			</b-container>
	</div>
</template>

<script>
  import bus from '../bus';
  import Footer from './Footer';

  export default {
    name: 'Services',

		props: ['services'],

    created: function () {
      bus.$emit('toggleLoading', false);
    },

    mounted() {
      this.animateServices('canvas');
    },

    components: {
      Footer
    }
  }
</script>

<style scoped lang="scss">
	.services {
		height: calc(100vh - 200px);

		.heading {
			padding-left: 100px;
			position: relative;
			z-index: 1;
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