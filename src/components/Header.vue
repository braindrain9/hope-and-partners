<template>
	<header :class="{'dark-bg': setDarkBg()}">
		<b-container>
			<b-navbar toggleable="md" type="dark">
				<b-nav-toggle target="nav_collapse"></b-nav-toggle>

				<b-collapse is-nav id="nav_collapse">
					<b-navbar-nav id="menu">
						<li
							class="nav-item"
							:data-menuanchor="link.name"
							v-for="link in filteredNavLinks"
						>
							<a v-on:click="goToSection(link.path)" :key="link.id" class="nav-link" active-class="active">
								{{link.title}}
							</a>
						</li>
					</b-navbar-nav>

					<div class="language-chooser">
						<b-link class="active">укр</b-link>
						<b-link>eng</b-link>
					</div>
				</b-collapse>

				<b-navbar-brand href="/" right>
					<div v-html="logoSvg"></div>
				</b-navbar-brand>
			</b-navbar>
		</b-container>
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

    methods: {
      setDarkBg: function() {
        return this.$route.hash.startsWith('#about')
          || this.$route.hash.startsWith('#partners')
          || this.$route.hash.startsWith('#cases')
          || this.$route.name === 'bio';
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
		width: 100%;
		position: fixed;
		padding: 20px 0;
		z-index: 1;

		&.dark-bg {
			background: $base-black;
		}

		.navbar {
			padding: 0;

			.navbar-brand {
				margin-right: 0;
			}

			.nav-item {
				transition: color .5s ease-out;

				&:not(:first-child) {
					margin: 0 15px;
				}

				.nav-link {
					color: $grey;
					letter-spacing: $base-spacing;

					&:hover {
						color: $white;
						cursor: pointer;
					}
				}

				&.active {
					.nav-link {
						color: $white;
						font-weight: bold;
					}
				}
			}

			.language-chooser {
				margin-left: 50px;
				margin-bottom: 2px; // compensate border-bottom height

				a {
					color: $grey;
					border-bottom: 2px solid transparent;
					padding-bottom: 5px;
					margin: 0 10px;

					&:hover {
						text-decoration: none;
						color: $white;
						font-weight: bold;
					}

					&.active {
						border-bottom-color: $orange;
					}
				}
			}
		}

		@include media-max-width($menu-breakpoint) {
			.nav-item:first-child {
				margin: 0 15px;
			}
		}
	}
</style>