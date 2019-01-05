<template>
	<div class="services">
		<canvas id="canvas"></canvas>
		<b-container class="section-container services-section">
			<h1 class="heading heading-main">послуги<span class="orange-color">:</span></h1>

			<swiper class="services-slider" :options="swiperOption" ref="verticalSwiper">
				<swiper-slide class="d-flex justify-content-end" v-for="(service, index) in services" :key="index">
					<div class="slider-item d-flex align-items-center">
						<div class="text-block">
							<span class="letter d-none">{{service.letter}}</span>
							<div class="bg-number">{{index + 1}}</div>
							<p>{{service.title}}</p>
							<div class="description" v-html="service.description"></div>
						</div>
					</div>
				</swiper-slide>
				<div class="swiper-pagination" data-before="01" :data-after="lastIndex" :data-current="'03'" slot="pagination"></div>
			</swiper>
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

    data() {
      return {
        lastIndex: null,
        swiperOption: {
          direction: 'vertical',
					speed: 1000,
          autoplay: {
            delay: 2500,
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
            clickable: true
          },
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
          disableOnInteraction: false,
          on: {
            init: function () {
              const text = $('.services-slider .swiper-slide-active .letter');
              if(text) {
                // bus.$emit('animateServices', text.text());
              }
            },
          }
        }
      }
    },

    created: function () {
      bus.$emit('toggleLoading', false);
      this.lastIndex = this.services.length > 10 ? this.services.length : '0' + this.services.length;
    },

    methods: {
      onSwipe() {
        const text = $('.services-slider .swiper-slide-active .letter');

        if(text) {
          // bus.$emit('animateServices', text.text());
        }
      }
    },

    computed: {
      swiper() {
        return this.$refs.verticalSwiper.swiper;
      }
    },

    mounted() {
      // this.animateServices('canvas');
      this.swiper.on('slideChange', () => this.onSwipe(this));
    },

    components: {
      Footer
    }
  }
</script>

<style lang="scss">

	.services {
		height: calc(100vh - 150px);

		.swiper-slide {
			justify-content: flex-end !important;
		}

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

	.swiper-container-vertical > .swiper-pagination-progressbar {
		width: 2px;
		height: 65%;
		top: 0;
		background: #373739;
		left: 97%;

		&:before {
			content: attr(data-before);
			position: absolute;
			width: 0;
			left: -25px;
			top: 0;
		}

		&:after {
			content: attr(data-after);
			position: absolute;
			width: 0;
			left: 10px;
			bottom: 0;
		}
	}

	.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
		background: $orange;

		&:before {
			content: attr(data-current);
			position: absolute;
			width: 0;
			left: 10px;
			bottom: 0;
		}
	}
</style>