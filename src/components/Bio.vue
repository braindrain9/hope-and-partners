<template>
	<div class="bio">
		<b-container>
			<div class="row">
				<div class="heading-block col-sm-6 offset-sm-6 col-md-7 offset-md-5">
					<a v-on:click="goBack" class="bio-link grey-color-link">
						<span class="horizontal-grey"></span>
						назад
					</a>
					<h1 class="heading heading-main">
						Моя<br/>
						повна <span class="orange-color">біографія</span>
					</h1>
					<div class="tiny-font-size white-color">останній апдейт 20.12.2018</div>
				</div>
			</div>
		</b-container>
		<div class="bio-info">
			<b-container>
				<div class="row">
					<div class="photo-block col-md-5 col-sm-6">
						<div><img src="../assets/img/bio1.png" alt=""></div>
						<div><img src="../assets/img/bio2.png" alt=""></div>
					</div>
					<div class="description-block col-md-7 col-sm-6">
						<div class="description description-dark">
							Тут має бути текст про досягнення, написаний копірайтерами, з назвами гучних компаній і проектів.
							Так дійсно легше для сприйняття.
							Проте моя робота не про легкі, готові рішення.
							Як терапевт, допомагаю вам долати виклики у комунікації – бренду, його піарі та репутації.
							Аби ви були впливовими у своїх сферах, а не лише популярними.
							Були, а не здавалися.
							<br/>
							<br/>
							<br/>

							To his mother’s delight, Tobias has been honored with the net magazine Designer
							of the Year & Awwwards Art Director of the Year awards.
							He also served as a member on the Board of Directors at AIGA NYC and is a supporter,
							advisor and mentor to a variety of programs around the world, including Cannes Lions, HyperIsland, Art Directors Club & the FWA.
							<br/>
							<br/>
							<br/>

							Tobias is the co-founder of Semplice™﻿, a portfolio system and community of the world’s
							leading designers who represent brands such as HUGE, BBDO, Tumblr, Disney, Apple, Firstborn,
							Unit9, R/GA, Razorfish and many more. Since its launch in 2014, Semplice has quickly grown
							into one of the leading portfolio systems for creatives.
						</div>
					</div>
				</div>
			</b-container>
		</div>
	</div>
</template>

<script>
  import bus from '../bus';

  export default {
    name: 'Bio',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>

<style scoped lang="scss">
	.bio {
		padding-top: 180px;

		.heading-block {
			padding-bottom: 100px;

			.bio-link {
				font-size: 24px;

				&:hover {
					.horizontal-grey {
						width: 70px;
						height: 2px;
						background: $orange;
					}
				}
			}

			.heading-main {
				margin-bottom: 20px;
			}

			.horizontal-grey {
				display: inline-block;
				width: 60px;
				background: $grey;
				height: 1.1px;
				vertical-align: middle;
				margin-right: 10px;
				transition: width .5s ease-in;
			}
		}

		.bio-info {
			background: $white;
			padding-bottom: 40px;

			.photo-block {
				display: inline-block;
				margin-top: -250px;

				> div {
					margin-bottom: 40px;
				}
			}

			.description-block {
				margin-top: 50px;

				.description {
					font-weight: 500;
					line-height: 28px;
					font-size: 20px;
				}
			}
		}
	}
</style>