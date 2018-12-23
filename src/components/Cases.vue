<template>
	<div class="cases">
		<h1 class="heading">кейси<span class="orange-color">:</span></h1>
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide>
				<div class="d-flex align-items-center">
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
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center">
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
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center">
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
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center">
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
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center">
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
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="d-flex align-items-center">
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
					</div>
				</div>
			</swiper-slide>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div
				class="swiper-pagination"
				slot="pagination"
				ref="pagination"
				:data-before="activeIndex"
				:data-after="afterIndex"
			></div>
			<div class="swiper-button-next" slot="button-next"></div>
		</swiper>
	</div>
</template>

<script>
	import bus from '../bus';

  export default {
    name: 'Cases',

    data() {
      return {
        activeIndex: '00',
        afterIndex: '02',
        swiperOption: {
          speed: 600,
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
      onSwipe(varuable) {
        const index = varuable.swiper.activeIndex;

				this.activeIndex = index < 10 ? '0' + index : index;
				this.afterIndex = (index + 2) < 10 ? '0' + (index + 2) : (index + 2);
      }
		},

		computed: {
      swiper() {
        console.log(this.$refs.mySwiper);
        return this.$refs.mySwiper.swiper
      }
		},

    mounted() {
      console.log('this is current swiper instance object', this.swiper);
      console.log('active? ',this.swiper.activeIndex);
      this.swiper.on('slideChange', () => {
        this.onSwipe(this);
      });
    }
  }
</script>

<style lang="scss">
	.cases {
		height: $home-block-height;
		position: relative;
		max-width: 800px;
		margin: 0 auto;

		.photo-block {
			position: relative;
			margin-right: 30px;

			img {
				position: relative;
				z-index: 1;
				width: 400px;
			}

			.bg-image {
				background: $grey;
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
			}

			.description {
				font-weight: 500;
				line-height: 24px;
				font-size: 14px;
			}
		}

		.tns-outer {
			width: 100%;
		}
	}

	.swiper-slide {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		/*padding: 40px 60px;*/
		padding-bottom: 80px;
		background-color: transparent !important;
		justify-content: space-around !important;
	}

	.swiper-button-prev,
	.swiper-button-next {
		top: 94%;
	}

	.swiper-container-horizontal > .swiper-pagination-progressbar {
		width: 60%;
		height: 2px;
		top: 94%;
		border-bottom: 1px solid #373739;
		left: 20%;

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