<template>
    <div>
			<canvas id="canvas-contacts"></canvas>
			<b-container class="section-container">
				<div class="contacts d-flex align-items-center justify-content-end">
					<div class="mail-block">
						<h1>напишіть нам листа</h1>
							<div class="mail-text">
								<div class="mail">hello@hopeandpartners.com <span v-html="arrowSvg"></span></div>
									<div class="horizontal-line">
										<div></div>
									</div>
								</div>
						</div>
					</div>
				<Footer is-final-mode="true"/>
			</b-container>
    </div>
</template>

<script>
  import bus from '../bus';
  import arrowSvg from '../assets/img/arrow.svg';
  import Footer from './Footer';

  export default {
    name: 'Contacts',

		data() {
      return {
        arrowSvg
			}
		},

    created: function () {
      bus.$emit('toggleLoading', false);
    },

    mounted() {
      this.animateContacts('canvas-contacts');
    },

    components: {
      Footer
    }
  }
</script>

<style scoped lang="scss">
	.contacts {
		height: $home-block-height;

		.mail-block {
			h1 {
				font-size: 24px;
				font-weight: bold;
				color: $white;
			}

			.mail-text:hover {
				.horizontal-line > div {
					left: calc(100% - 200px);
				}
			}

			.mail {
				font-size: 46px;
				font-weight: bold;
				color: $orange;
				margin-bottom: 20px;
			}

			.horizontal-line {
				border-bottom: 1px solid $dark-grey;
				position: relative;

				> div {
					position: absolute;
					width: 200px;
					height: 1px;
					background: $orange;
					left: 0;
					transition: all 1s ease;
				}
			}
		}
	}
</style>