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

			<div class="section">
				<Hero/>
			</div>

			<div>
				<b-container class="section-container overflow-container">
					<About />
					<Footer link="services"/>
				</b-container>
			</div>

			<div class="section">
				<Services/>
			</div>

			<div class="gallery"></div>

			<div class="section">
				<b-container class="section-container">
					<Cases />
					<Footer link="contacts"/>
				</b-container>
			</div>

			<div class="section">
				<Contacts />
			</div>
	</div>

	<div class="scroll-pause" data-anchor-target=".gallery" data-100p-top-top="transform:translateY(100%);"
			 data-top-top="transform:translateY(0%)" data--150p-top-top="" data--300p-top-top="transform:translateY(-100%)">

		<div class="row" data-anchor-target=".gallery" data-top-top="transform: translateX(0%);" data--150p-top-top="transform: translateX(-50%);">
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

    created: function () {
      bus.$emit('toggleLoading', false);
    },

		mounted() {
      Scrollr.init();
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
              this.goToServicesFirstSlide();
            }
          }
				}

				if(destination) {
					if (destination.anchor === 'services') {
						bus.$emit('animateServices', $('.services-slider .slide.active .letter').text());
						this.$store.commit('updateSliding', true);
					}

					if (destination.anchor === 'hero') {
						bus.$emit('animateHero', '&');
					}

					if (destination.anchor === 'contacts') {
						bus.$emit('animateContacts', '@');
					}
				}
      },
      afterSlideLoad: function() {
        console.log('slide loaded');
        bus.$emit('animateServices', $('.services-slider .slide.active .letter').text());
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
		min-height: 4500px;
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