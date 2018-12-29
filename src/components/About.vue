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
					моя робота не про легкі, готові рішення.
					як терапевт, допомагаю вам долати виклики у комунікації – бренду, його піарі та репутації.
					аби ви були впливовими у своїх сферах, а не лише популярними.
					були, а не здавалися. усвідомлено розвиваю агенство Нope&Partners, викладаю і виступаю як бізнес-спікер.
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
				text-decoration: underline;
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