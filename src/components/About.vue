<template>
	<div class="about">
		<div class="d-flex align-items-start">
			<img class="about-img" src="../assets/img/about.png" alt="About me image"/>
			<div class="bio-container">
				<h1 class="heading">
					мене звати Надя,<br/>
					я консультант із комунікацій<span class="orange-color">.</span>
				</h1>
				<p class="description">
					Тут має бути текст про досягнення, написаний копірайтерами, з назвами гучних компаній і проектів.
					Так дійсно легше для сприйняття. Проте моя робота не про легкі, швидкі й готові рішення, їх достатньо на ринку.
					Я допомагаю проектам самотужки долати виклики у комунікації – бренду, PR та репутації.

					<br />
					<br />

					За освітою я психолог, зробила кар’єру в креативних рекламних агентствах, потім перейшла всередину бізнесу як маркетолог.
					Згодом з партнерами відкрили першу власну справу PR Bar, де звісно самі займалися усім.
					Після цього розумію бізнес-комунікації на 360 градусів.
					Зараз усвідомлено розвиваю агентство Нope&Partners, викладаю і виступаю як бізнес-спікер.

					<br />
					<br />
					Маю надію, мій досвід стане вам корисним!
				</p>
				<p class="bio-link">
					<span class="horizontal-white"></span>
					<span>повне біо <router-link to="/bio">тут</router-link></span>
				</p>
			</div>
		</div>
		<Event />
	</div>
</template>

<script>
  import bus from '../bus';
  import Event from './Event';

  export default {
    name: 'About',

    created: function () {
      bus.$emit('toggleLoading', false);
    },

		components: {
      Event
		}
  }
</script>

<style scoped lang="scss">
	.about {
		> div {
			margin-bottom: 200px;
		}

		.about-img {
			max-width: 50%;
		}

		.bio-container {
			margin-left: -110px;
			margin-top: 200px;
		}

		.bio-link {
			font-weight: 500;
			line-height: 32px;
			font-size: 24px;
			letter-spacing: $base-spacing;
			color: $white;

			a {
				font-weight: bold;
				color: $orange;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.horizontal-white {
			width: 40%;
			height: 1.1px;
			background-color: $white;
			display: inline-block;
			vertical-align: middle;
			margin-right: 20px;
		}
	}
</style>