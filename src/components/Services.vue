<template>
	<div class="services">
		<canvas id="canvas"></canvas>
		<b-container class="section-container padding-section">
			<h1 class="heading heading-main">послуги<span class="orange-color">:</span></h1>

			<div class="services-slider">
				<div class="slide fp-auto-height" v-for="(service, index) in services" :key="index">
					<div class="slider-item d-flex justify-content-end align-items-center">
						<div class="text-block">
							<span class="letter d-none">{{service.letter}}</span>
								<div class="bg-number">{{index + 1}}</div>
								<p>{{service.title}}</p>
								<div class="description" v-html="service.description"></div>
							</div>
						</div>
					</div>
				</div>

			<div class="progress-container">
			<div class="progress services-progress progress-bar-vertical">
				<div
						class="progress-bar"
						role="progressbar"
						:style="{height: (1 / services.length * 100) + '%'}"
						:aria-valuenow="(1 / services.length * 100) + '%'"
						aria-valuemin="0"
						aria-valuemax="100"
				></div>
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
		height: calc(100vh - 150px);

		.heading {
			padding-left: 100px;
			position: relative;
			z-index: 1;
		}

		.services-slider {
			height: calc(100% - 100px);
			padding-right: 100px;
			width: 100%;

			.text-block {
				color: $white;
				max-width: 500px;
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

	.progress-container {
		position: absolute;
		height: 100%;
		width: 20px;
		right: 0;
		top: 30vh;
	}

	.progress-bar-vertical {
		width: 2px;
		background: $grey;
		min-height: 100px;
		height: 265px;
		margin-right: 20px;
		float: left;
		display: -webkit-box;  /* OLD - iOS 6-, Safari 3.1-6, BB7 */
		display: -ms-flexbox;  /* TWEENER - IE 10 */
		display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
		display: flex;         /* NEW, Spec - Firefox, Chrome, Opera */
		align-items: flex-end;
		-webkit-align-items: flex-end; /* Safari 7.0+ */
	}

	.progress-bar-vertical .progress-bar {
		width: 2px;
		background: $orange;
		-webkit-transition: all 0.7s ease;
		-o-transition: all 0.7s ease;
		transition: all 0.7s ease;
	}
</style>