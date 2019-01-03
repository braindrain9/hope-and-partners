<template>
	<!--<full-page ref="fullpage" :options="options" id="fullpage">-->
			<!--<div class="section">-->
				<!--<Hero/>-->
			<!--</div>-->
			<!--<div class="section">-->
				<!--<b-container class="section-container overflow-container">-->
					<!--<About />-->
					<!--<Footer link="services"/>-->
				<!--</b-container>-->
			<!--</div>-->
			<!--<div class="section">-->
				<!--<Services/>-->
			<!--</div>-->
			<!--<div class="section partners-container">-->
				<!--<Partners />-->
			<!--</div>-->
			<!--<div class="section">-->
				<!--<b-container class="section-container">-->
					<!--<Cases />-->
					<!--<Footer link="contacts"/>-->
				<!--</b-container>-->
			<!--</div>-->
			<!--<div class="section">-->
				<!--<Contacts />-->
			<!--</div>-->
		<!--</full-page>-->
	<div>

		<div id="skrollr-body">

			<div class="section position-relative">
				<Hero/>
			</div>

			<div>
				<b-container class="section-container overflow-container">
					<About />
					<Footer link="services"/>
				</b-container>
			</div>

			<div class="section position-relative">
				<Services :services="services"/>
			</div>

			<div class="gallery"></div>

			<div class="section">
				<b-container class="section-container">
					<Cases />
					<Footer link="contacts"/>
				</b-container>
			</div>

			<div class="section position-relative">
				<Contacts />
			</div>
	</div>

	<div class="scroll-pause" data-anchor-target=".gallery"
			 data-100p-top-top="transform:translateY(100%);"
			 data-75p-top-top="transform:translateY(75%);"
			 data-50p-top-top="transform:translateY(50%);"
			 data-25p-top-top="transform:translateY(20%);"
			 data-0p-top-top="transform:translateY(0%)"
			 data--150p-top-top=""
			 data--300p-top-top="transform:translateY(-100%)"
			 style="transform:translateY(0%)"
	>

		<div class="row" data-anchor-target=".gallery"
				 data-top-top="transform: translateX(0%);"
				 data--150p-top-top="transform: translateX(-100%);">
			<Partners />
		</div>


		<!--<div class="row" data-anchor-target=".gallery" data-top-top="transform: translateX(-50%);" data&#45;&#45;150p-top-top="transform: translateX(0);">-->

			<!--<div>amigo</div>-->
			<!--<div>amigo</div>-->
			<!--<div>amigo</div>-->
			<!--<div>amigo</div>-->
			<!--<div>amigo</div>-->
			<!--<div>amigo</div>-->
			<!--<div>amigo</div>-->
			<!--<div>amigo</div>-->

		<!--</div>-->

	</div>

	</div>
</template>

<script>
  import bus from '../bus';
  import Hero from './Hero';
  import About from './About';
  import Partners from './Partners';
  import Services from './Services';
  import Cases from './Cases';
  import Contacts from './Contacts';
  import Footer from './Footer';

  import Scrollr from 'skrollr';
  // import * as Three from 'three';
  // import {TweenMax, Power2, Elastic} from "gsap/TweenMax";

  export default {
    name: 'Home',

		data() {
      return {
        loaded: false,
        services: [],
        partners: [],
        options: {
          menu: '#menu',
          anchors: ['hero', 'about', 'services', 'partners', 'cases', 'contacts'],
          scrollOverflow: true,
          scrollingSpeed: 600,
          controlArrows: false,
					onLeave: this.onLeave,
          afterLoad: this.afterLoad,
          onSlideLeave: this.onSlideLeave,
          afterSlideLoad: this.afterSlideLoad
        }
			}
		},

    beforeRouteEnter (to, from, next) {
      document.title = 'Hope & Partners';

      $.getJSON('/static/json/services.json', function (services) {
        $.getJSON('/static/json/partners.json', function (partners) {
          next(vm => {
            vm.services = services;
            vm.partners = partners;
            vm.loaded = true;
          })
        })
      });
    },

    created: function () {
      bus.$emit('toggleLoading', false);
    },

		mounted() {
      Scrollr.init({
        smoothScrolling: true
			});
		},

		methods: {
      onLeave: function(origin, destination, direction) {
				if(origin.anchor === 'services' && this.$store.state.sliding) {
          if(direction === 'down') {
            fullpage_api.moveSlideRight();
            this.$store.commit('updateSliding', true);
            return false;
          } else if (direction === 'up') {
            fullpage_api.moveSlideLeft();
            this.$store.commit('updateSliding', true);
            return false;
          }
        }
      },
      onSlideLeave: function(section, origin, destination, direction) {
        if(section.anchor === 'services') {
          if(origin.isLast && direction === 'right') {
            this.$store.commit('updateSliding', false);
            fullpage_api.moveSectionDown();
          } else if (origin.isFirst && direction === 'left') {
            this.$store.commit('updateSliding', false);
            fullpage_api.moveSectionUp();
          }
        }
      },
      afterLoad: function(origin, destination, direction) {
        if(origin) {
          if(origin.anchor === 'about') {
            if(direction === 'down') {
              fullpage_api.moveTo('services', 0);
            }
          }
          if(origin.anchor === 'services') {
            if(direction === 'down') {
              fullpage_api.moveTo('partners', 0);
            }
          }
				}

				if(destination) {
					if (destination.anchor === 'services') {
            const text = $('.services-slider .slide.active .letter');

            if(text) {
              bus.$emit('animateServices', text.text());
            }

						this.$store.commit('updateSliding', true);
					}

          if (destination.anchor === 'partners') {
            this.$store.commit('updateSlidingPartners', true);
          }

					if (destination.anchor === 'contacts') {
						bus.$emit('animateContacts', '@');
					}
				}
      },
      afterSlideLoad: function(section, origin, destination) {
        const text = $('.services-slider .slide.active .letter');

        if (text) {
          bus.$emit('animateServices', text.text());
				}

        if(section && section.anchor === 'partners' && destination) {
          $(".progress-bar").css("width", ((destination.index + 1) / this.partners.length) * 100 + '%');
				}
			}
		},

		components: {
      About,
			Hero,
			Partners,
			Services,
			Cases,
			Contacts,
      Footer
		}
  }
</script>

<style lang="scss">
	.skrollable {
		position:fixed;
		z-index:100;
	}
	.skrollr-mobile .skrollable {
		position:absolute;
	}
	.skrollable .skrollable {
		position:absolute;
	}

	.skrollable .skrollable .skrollable {
		position:static;
	}

	.section {
		background: $base-black;
		height: 100vh;
	}

	.section-container {
		padding-top: 100px; // compensate fixed header
		position: relative;
		z-index: 1;

		&.services-section {
			padding-top: 150px;
			height: 100%;
		}
	}

	.overflow-container {
		// switch to new section does not allow to see a footer
		padding-bottom: 100px;
	}

	.services-slider {
		.fp-slidesContainer {
			transition: all 900ms ease 0s !important;
		}
	}

	.skrollr-desktop body {
		height:100% !important;
	}

	#skrollr-body {
		height:100%;
		position:relative;
		overflow: hidden;
	}

	.no-skrollr .parallax-image-wrapper {
		display:none !important;
	}

	.parallax-image-wrapper {
		position:fixed;
		left:0;
		width:100%;
		overflow:hidden;

		height:80vh;
		top:-80vh;
	}


	.parallax-image {
		display:none;
		position:absolute;
		bottom:0;
		left:0;
		width:100%;
		background-repeat:no-repeat;
		background-position:center;
		background-size:cover;

		height:100vh;
		top:0;
	}


	.parallax-image.skrollable-between {
		display:block;
	}

	.no-skrollr .parallax-image-wrapper {
		display:none !important;
	}

	/*  End of scrollr styles   */

	/*Body Text*/

	/*Gallery*/


	.gallery{
		color: #221f51;
		font: normal 24px sans-serif;
		min-height: 1900px;
		text-align: center;
		overflow: hidden;
	}

	.scroll-pause{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		/*padding-top: 20vh;*/
		/*background: transparent;*/
	}


	.scroll-pause .row{
		/*width: 200vw;*/
		/*height: 30vh;*/
		/*overflow: hidden;*/
	}

	.scroll-pause .row div{
		/*width: 11.5%;*/
		/*height: 90%;*/
		/*float: left;*/
		/*background-repeat: no-repeat;*/
		/*background-position: center;*/
		/*background-size: cover;*/
		/*margin: 0.5%;*/
		/*border-radius: 10px;*/
	}

	.scroll-pause .row div:first-child{
		/*margin-left: 0.4%;*/
	}

	.scroll-pause .row div:last-child{
		/*margin-right: 0.4%;*/
	}
</style>