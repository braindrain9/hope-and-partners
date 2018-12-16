<template>
	<b-container>
		<footer :class="{bordered: $route.name === 'contacts'}">
			<div v-if="$route.name === 'contacts'" class="d-flex justify-content-between align-items-end">
				<div>&copy; 2018. hope & partners</div>
				<div>Made in Cosmos Studio</div>
			</div>
			<div v-else class="d-flex justify-content-between align-items-end">
				<div>
					<router-link :to="currentLink.path" class="menu-link">
						<span class="divider d-inline-block"></span>
						<span class="link-text grey-color-link d-inline-block">{{currentLink.title}}</span>
					</router-link>
				</div>
				<div>hello@hopeandpartners.com</div>
			</div>
		</footer>
	</b-container>
</template>

<script>
  export default {
    name: 'Footer',

		data() {
      return {
        currentLink: undefined
      }
		},

    created() {
      // init on load
      this.currentLink = _.find(this.footerNavLinks, {prevRoute: this.$route.name}) || this.footerNavLinks[0];
    },

    watch: {
      '$route' (to) {
        // update on route change
        this.currentLink = _.find(this.footerNavLinks, {prevRoute: to.name}) || this.footerNavLinks[0];
      }
    }
  }
</script>

<style scoped lang="scss">
  footer {
		height: 40px;
		margin: 40px 0;
		font-size: $tiny-font-size;
		padding-top: 20px;

		&.bordered {
			border-top: 1px solid $dark-grey;
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
