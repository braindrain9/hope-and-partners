<template>
	<div class="partners">
		<b-container class="section-container padding-section">
			<h1 class="heading heading-main">партнери<span class="orange-color">:</span></h1>
			<div class="partners-slider">
				<div class="slide fp-auto-height" v-for="(partner, index) in partners" :key="index">
					<div class="d-flex">
							<div class="photo-block">
								<div class="bg-number">{{index + 1}}</div>
								<div class="photo" :style="{'background-image': 'url(src/assets/partners/' + partner.imageUrl + ')'}"></div>
								<div class="bg-box"></div>
							</div>
							<div class="description-block">
								<h2 class="heading">{{partner.name}}</h2>
								<div class="occupation">{{partner.occupation}}</div>
								<div class="description" v-if="partner.description" v-html="partner.description"></div>
							</div>
						</div>
				</div>
			</div>
			<Footer link="cases">
				<template slot="progress-bar">
					<div class="progress-container">
						<div class="d-flex justify-content-around desc">
							<a :href="'#partners/' + index" class="grey-color-link" v-for="(partner, index) in partners" :key="index">
								{{partner.firstName}}
							</a>
						</div>
						<div class="progress">
							<div
									class="progress-bar"
									role="progressbar"
									:style="{width: (1 / partners.length * 100) + '%'}"
									:aria-valuenow="(1 / partners.length * 100) + '%'"
									aria-valuemin="0"
									aria-valuemax="100"
							></div>
						</div>
					</div>
				</template>
			</Footer>
		</b-container>
	</div>
</template>

<script>
  import bus from '../bus';
  import Footer from '../components/Footer';

	export default {
	  name: 'Partners',

		props: ['partners'],

    created: function () {
      bus.$emit('toggleLoading', false);
    },

		components: {
      Footer
		}
	}
</script>

<style scoped lang="scss">
	.partners {
		height: calc(100vh - 150px);

		.heading-main {
			padding-left: 100px;
		}

		.partners-slider {
			height: calc(100% - 100px);
			width: 100%;
			padding: 50px 0 0 120px;
		}

		.heading {
			margin-bottom: 10px;
		}

		.photo-block {
			width: 450px;
			position: relative;

			.bg-number {
				font-weight: bold;
				line-height: 407px;
				font-size: 288px;
				color: #1E1E1E;
				position: absolute;
				top: -70px;
			}

			.photo {
				position: relative;
				left: 90px;
				z-index: 1;
				width: 320px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				height: 400px;
				transition: all .7s ease;
				/*-webkit-box-shadow: 13px 30px 0px 6px rgba(30,30,30,1);*/
				/*-moz-box-shadow: 13px 30px 0px 6px rgba(30,30,30,1);*/
				/*box-shadow: 13px 30px 0px 6px rgba(30,30,30,1);*/

				&:hover {
					-webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
					filter: grayscale(100%);
				}
			}

			.bg-box {
				width: 307px;
				left: 80px;
				background: #1E1E1E;
				height: 354px;
				position: absolute;
				top: 70px;
			}
		}

		.description-block {
			padding-top: 40px;
			
			.occupation {
				line-height: 28px;
				font-size: 18px;
				color: #BCBFC1;
				opacity: 0.7;
			}

			.description {
				margin-top: 40px;
				font-weight: 500;
				line-height: 25px;
				font-size: 14px;
				letter-spacing: 0.01em;
				max-width: 400px;
			}
		}
	}

	.progress-container {
		width: calc(100% - 300px);

		.desc {
			font-size: 12px;
			padding-bottom: 5px;
		}
	}

	.progress {
		height: 2px;
		width: 100%;
		margin-bottom: 5px;
		background: #373739;

		.progress-bar {
			background-color: $orange;
		}
	}
</style>