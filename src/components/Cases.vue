<template>
	<div class="cases">
		<h1 class="heading heading-main">кейси<span class="orange-color">:</span></h1>
		<swiper :options="swiperOption" ref="horizontalSwiper">
			<swiper-slide>
				<div class="d-flex align-items-center justify-content-center">
					<div class="photo-block">
						<img src="../assets/img/case.png" alt="">
						<div class="bg-image"></div>
					</div>
					<div class="text-block">
						<h2>окко</h2>
						<p class="description">
							на підтримку нової стратегії ми розробили рекламну кампанію.
							вона про те, що який складний не видався б день,
							заїхати на смачну каву, хот-дог чи просто посидіти
							потупити у вікно – це завжди гарна ідея.
						</p>
						<div class="horizontal-line"></div>
						<div class="comment d-flex">
							<div class="photo">
								<img src="../assets/img/comment.png" alt="">
							</div>
							<div class="text">
								<h3>Анатолій - СТО</h3>
								<p>дякую проект мені зайшов на всі 100% заробив багато%)</p>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center justify-content-center">
					<div class="photo-block">
						<img src="../assets/img/case.png" alt="">
						<div class="bg-image"></div>
					</div>
					<div class="text-block">
						<h2>окко</h2>
						<p class="description">
							на підтримку нової стратегії ми розробили рекламну кампанію.
							вона про те, що який складний не видався б день,
							заїхати на смачну каву, хот-дог чи просто посидіти
							потупити у вікно – це завжди гарна ідея.
						</p>
						<div class="horizontal-line"></div>
						<div class="comment d-flex">
							<div class="photo">
								<img src="../assets/img/comment.png" alt="">
							</div>
							<div class="text">
								<h3>Анатолій - СТО</h3>
								<p>дякую проект мені зайшов на всі 100% заробив багато%)</p>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center justify-content-center">
					<div class="photo-block">
						<img src="../assets/img/case.png" alt="">
						<div class="bg-image"></div>
					</div>
					<div class="text-block">
						<h2>окко</h2>
						<p class="description">
							на підтримку нової стратегії ми розробили рекламну кампанію.
							вона про те, що який складний не видався б день,
							заїхати на смачну каву, хот-дог чи просто посидіти
							потупити у вікно – це завжди гарна ідея.
						</p>
						<div class="horizontal-line"></div>
						<div class="comment d-flex">
							<div class="photo">
								<img src="../assets/img/comment.png" alt="">
							</div>
							<div class="text">
								<h3>Анатолій - СТО</h3>
								<p>дякую проект мені зайшов на всі 100% заробив багато%)</p>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center justify-content-center">
					<div class="photo-block">
						<img src="../assets/img/case.png" alt="">
						<div class="bg-image"></div>
					</div>
					<div class="text-block">
						<h2>окко</h2>
						<p class="description">
							на підтримку нової стратегії ми розробили рекламну кампанію.
							вона про те, що який складний не видався б день,
							заїхати на смачну каву, хот-дог чи просто посидіти
							потупити у вікно – це завжди гарна ідея.
						</p>
						<div class="horizontal-line"></div>
						<div class="comment d-flex">
							<div class="photo">
								<img src="../assets/img/comment.png" alt="">
							</div>
							<div class="text">
								<h3>Анатолій - СТО</h3>
								<p>дякую проект мені зайшов на всі 100% заробив багато%)</p>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center justify-content-center">
					<div class="photo-block">
						<img src="../assets/img/case.png" alt="">
						<div class="bg-image"></div>
					</div>
					<div class="text-block">
						<h2>окко</h2>
						<p class="description">
							на підтримку нової стратегії ми розробили рекламну кампанію.
							вона про те, що який складний не видався б день,
							заїхати на смачну каву, хот-дог чи просто посидіти
							потупити у вікно – це завжди гарна ідея.
						</p>
						<div class="horizontal-line"></div>
						<div class="comment d-flex">
							<div class="photo">
								<img src="../assets/img/comment.png" alt="">
							</div>
							<div class="text">
								<h3>Анатолій - СТО</h3>
								<p>дякую проект мені зайшов на всі 100% заробив багато%)</p>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
			<div class="swiper-button-prev" slot="button-prev" v-html="arrowSvg"></div>
			<div
				class="swiper-pagination"
				slot="pagination"
				ref="pagination"
				:data-before="activeIndex"
				:data-after="afterIndex"
			></div>
			<div class="swiper-button-next" slot="button-next" v-html="arrowSvg"></div>
		</swiper>
	</div>
</template>

<script>
	import bus from '../bus';
	import arrowSvg from '../assets/img/arrow-grey.svg';

  export default {
    name: 'Cases',

    data() {
      return {
        arrowSvg,
        activeIndex: '00',
        afterIndex: '02',
        swiperOption: {
          speed: 1000,
          parallax: true,
					pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },

    created: function () {
			bus.$emit('toggleLoading', false);
    },

		methods: {
      onSwipe(value) {
        const index = value.swiper.activeIndex;

				this.activeIndex = index < 10 ? '0' + index : index;
				this.afterIndex = (index + 2) < 10 ? '0' + (index + 2) : (index + 2);
      }
		},

		computed: {
      swiper() {
        return this.$refs.horizontalSwiper.swiper;
      }
		},

    mounted() {
      this.swiper.on('slideChange', () => this.onSwipe(this));
    }
  }
</script>

<style lang="scss">
	.cases {
		height: $home-block-height;
		position: relative;
		margin: 0 auto;
		padding-top: 40px;

		.heading {
			padding-left: 100px;
		}

		.photo-block {
			position: relative;

			// to compensate bg-image indent
			margin-right: 35px;
			margin-bottom: 20px;

			img {
				position: relative;
				z-index: 1;
				width: 400px;
			}

			.bg-image {
				background: #1E1E1E;
				width: 105%;
				height: 250px;
				position: absolute;
				bottom: -20px;
				left: 20px;
			}
		}

		.text-block {
			color: $white;
			width: 50%;
			max-width: 400px;
			padding-left: 50px;

			h2 {
				font-weight: bold;
				line-height: 34px;
				font-size: 24px;
				margin-bottom: 15px;
			}

			.description {
				font-weight: 500;
				line-height: 24px;
				font-size: 14px;
				margin-bottom: 20px;
			}
		}

		.horizontal-line {
			border-bottom: 2px solid $white;
			width: 40px;
		}

		.comment {
			margin-top: 30px;

			.photo {
				width: 40%;
				min-width: 65px;

				img {
					border-radius: 50%;
					height: 60px;
					width: 60px;
				}
			}

			.text {
				h3 {
					font-weight: 500;
					line-height: 20px;
					font-size: 14px;
					margin-bottom: 5px;
				}

				p {
					line-height: 20px;
					font-size: 14px;
					color: #BCBFC1;

					&:before,
					&:after {
						content: '"';
					}
				}
			}
		}

		.tns-outer {
			width: 100%;
		}
	}

	/* Slider styles*/
	.swiper-slide {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding-bottom: 100px;
		background-color: transparent !important;
		justify-content: space-around !important;
	}

	.swiper-button-prev,
	.swiper-button-next {
		background: none;
		top: 94%;
	}

	.swiper-button-prev {
		left: 15%;
	}

	.swiper-button-next {
		right: 15%;
		transform: rotate(-180deg);
	}

	.swiper-container-horizontal > .swiper-pagination-progressbar {
		width: 40%;
		height: 2px;
		top: 94%;
		border-bottom: 1px solid #373739;
		left: 30%;

		&:before {
			content: attr(data-before);
			width: 0;
			position: absolute;
			left: -30px;
			top: -10px;
		}

		&:after {
			content: attr(data-after);
			position: absolute;
			width: 0;
			right: -10px;
			top: -10px;
		}

		> .swiper-pagination-progressbar-fill {
			background: $orange;
		}
	}
</style>