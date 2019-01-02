<template>
	<div class="partners">
		<h1 class="heading heading-main partners-heading">партнери<span class="orange-color">:</span></h1>

		<div id="realcontent">
			<div class="partners-slider">
				<div class="partner-item">
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
				<div class="partner-item">
					<div class="d-flex">
						<div class="photo-block">
							<div class="bg-number">2</div>
							<img class="photo" src="../assets/images/22.jpg" alt="">
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
				<div class="partner-item">
					<div class="d-flex">
						<div class="photo-block">
							<div class="bg-number">3</div>
							<img class="photo" src="../assets/images/32.jpg" alt="">
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

			<Footer
				style="width: 3200px;"
				class="full-width-footer"
				is-full-width-mode="true"
				:style="{paddingLeft: footerPaddingLeft + 'px'}"
				link="cases"
			>
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
		</div>

		<!--<div id="fakecontent"></div>-->
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

    mounted() {
      this.setPartnersFooterPos();
    },

		components: {
      Footer
		}
	}
</script>

<style scoped lang="scss">
	.partners {
		padding-top: 60px;
		height: 100%;
		min-height: 500px;

		.heading-main {
			top: 150px;
			padding-left: 100px;
		}

		.partners-slider {
			width: calc(180% + 44rem);
			height: calc(100vh - 440px);
			display: inline-block;
			opacity: 1; // change from 0
			z-index: 99;
			-o-transition: opacity .3s ease;
			-moz-transition: opacity .3s ease;
			-webkit-transition: opacity .3s ease;
			transition: opacity .3s ease;
			top: 0;
			position: relative;
			padding: 0 0 0 250px;
		}

		.partner-item {
			white-space: normal;
			height: calc(100% - 0rem);
			width: 1000px;
			display: inline-block;
			transform-origin: top;
			-webkit-transform: translate(0,0);
			transition: all .5s ease;
			-o-transition: all .5s ease;
			-moz-transition: all .5s ease;
			-webkit-transition: all .5s ease;
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

	#realcontent {
		padding-top: 150px;
		/*padding-left: 200px;*/
		/*position: fixed;*/
		/*top: 0;*/
		/*height: 877px;*/
		/*left: 0;*/
		width: 100%;
		white-space: nowrap;
		color: #fff;
		/*transition: transform .5s ease,opacity .5s ease;*/

		footer {
			white-space: normal;
		}
	}

	#fakecontent {
		height: 3157px;
	}
</style>