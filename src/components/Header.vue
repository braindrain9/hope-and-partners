<template>
	<header>
		<b-navbar toggleable="md" type="dark">
			<b-nav-toggle target="nav_collapse"></b-nav-toggle>

			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav>
					<li class="nav-item" v-for="link in filteredNavLinks">
						<router-link :to="link.path" :key="link.id" class="nav-link" active-class="active">{{link.title}}</router-link>
					</li>
				</b-navbar-nav>
			</b-collapse>

			<b-navbar-brand to="/" right>
				<div v-html="logoSvg"></div>
			</b-navbar-brand>
		</b-navbar>
	</header>
</template>

<script>
  import logoSvg from '../assets/img/logo.svg';

  export default {
    name: 'Header',

    data() {
      return {
        logoSvg
      }
    },

    computed: {
      filteredNavLinks: function () {
        return this.navLinks.filter(link => !link.hidden);
      }
    }
  }
</script>

<style scoped lang="scss">
	header {
		margin: 10px -20px;

		.navbar {
			.navbar-brand {
				margin-right: 0;
			}

			.nav-item {
				border-bottom: 2px solid transparent;
				transition: border-bottom-color .5s ease-out;

				&:not(:first-child) {
					padding: 0 15px;
				}

				&:hover {
					border-bottom-color: $orange;
				}

				.nav-link {
					color: $grey;
					letter-spacing: 0.01em;

					&.active {
						color: $white;
						font-weight: bold;
					}
				}
			}
		}

		@include media-max-width($menu-breakpoint) {
			.nav-item:first-child {
				padding: 0 15px;
			}
		}
	}
</style>