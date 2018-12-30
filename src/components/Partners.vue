<template>
	<div class="partners">
		<b-container class="section-container padding-section">
			<h1 class="heading heading-main">партнери<span class="orange-color">:</span></h1>
			<div class="partners-slider">
				<div class="slide fp-auto-height" v-for="(item, index) in [1, 2, 3, 4]" :key="index">
					<div class="d-flex">
							<div class="photo-block">
								<div class="bg-number">1</div>
								<img class="photo" src="../assets/images/12.jpg" alt="">
								<div class="bg-box"></div>
							</div>
							<div class="description-block">
								<h2 class="heading">Нік Данилюк</h2>
								<div class="occupation">політолог</div>
								<div class="description">
									Ph.D Школи управління ім. Джона Ф. Кеннеді при Гарвардському університеті.
									Директор аналітичного центру «Політика», консультант виборчих кампаній та GR.
									Автор книг «Як працює путінська пропаганда» і «Сценарії майбутнього України».
									Cміливий у прогнозах, відвертий щодо справ у реальності. Микола допомагає побачити зв’язок між світовим і
									локальним суспільно-політичним контекстами та їх вплив на ваш проект. Любитель іспанського вина та цинічного гумору.
								</div>
							</div>
						</div>
				</div>
			</div>
			<Footer link="cases">
				<template slot="progress-bar">
					<div class="progress-container">
						<div class="desc">Оленка</div>
						<div class="desc">Оленка</div>
						<div class="desc">Оленка</div>
						<div class="progress">
							<div
									class="progress-bar"
									role="progressbar"
									style="width: 600px;"
									aria-valuenow="25"
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

		data() {
	    return {
        footerPaddingLeft: 50
			}
		},

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
			padding: 50px 0 0 150px;
		}

		.heading {
			margin-bottom: 10px;
		}

		.photo-block {
			width: 400px;
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
				left: 75px;
				z-index: 1;
				/*-webkit-box-shadow: 13px 30px 0px 6px rgba(30,30,30,1);*/
				/*-moz-box-shadow: 13px 30px 0px 6px rgba(30,30,30,1);*/
				/*box-shadow: 13px 30px 0px 6px rgba(30,30,30,1);*/
			}

			.bg-box {
				width: 307px;
				left: 65px;
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

		> .desc {
			text-align: center;
			width: calc((100% - 300px) / 3);
			display: inline-block;
			line-height: 28px;
			font-size: 18px;
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