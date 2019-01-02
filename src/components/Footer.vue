<template>
	<footer>
		<div
			v-if="isFinalMode"
			class="bordered footer-content d-flex justify-content-between align-items-end"
		>
			<div>&copy; дві тисячі дев'ятнадцятий. hope & partners</div>
			<div>Made in Cosmos Studio</div>
		</div>
		<div v-else class="footer-content d-flex justify-content-between align-items-end">
		<div>
			<a v-on:click="goToSection(currentLink.path)" class="menu-link">
				<span class="divider d-inline-block"></span>
				<span class="link-text grey-color-link d-inline-block">{{currentLink.title}}</span>
			</a>
		</div>
		<slot name="progress-bar"></slot>
		<div>hello@hopeandpartners.com</div>
	</div>
	</footer>
</template>

<script>
  export default {
    name: 'Footer',

    props: ['link', 'isFinalMode', 'isFullWidthMode'],

		data() {
      return {
        currentLink: undefined
      }
		},

    created() {
      // init on load
			this.currentLink = _.find(this.footerNavLinks, {name: this.link}) || this.footerNavLinks[0];
    },

    watch: {
      '$route' () {
        // update on route change
        if (this.$route.name === 'bio') {
          this.currentLink = _.find(this.footerNavLinks, {name: 'services'});
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  footer {
		width: 100%;
		margin: 40px 0 60px;
		font-size: $tiny-font-size;
		position: relative;
		z-index: 10;

		.footer-content {
			height: 50px;

			&.bordered {
				border-top: 1px solid $dark-grey;
			}
		}

		.menu-link {
			font-size: $small-font-size;
			line-height: 20px;
			color: $grey;

			&:hover {
				text-decoration: none;

				.divider {
					height: 40px;
				}
			}

			.divider {
				height: 20px;
				width: 4px;
				background: $white;
				margin-right: 10px;
				margin-bottom: 1px;
				transition: height 1s ease-out;
			}

			.link-text {
				max-width: 60px;
			}
		}
  }
</style>
