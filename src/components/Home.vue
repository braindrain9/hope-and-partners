<template>
    <div>
        <div class="homepage">
            <div class="section position-relative">
                <Hero/>
            </div>

            <div class="about-section">
                <b-container class="section-container">
                    <About/>
                    <Footer link="services"/>
                </b-container>
            </div>

            <div class="position-relative" id="services">
                <Services v-if="services.length" :services="services"/>
            </div>

            <div class="section" id="partners">
                <Partners :partners="partners" :footer-width="7300"/>
            </div>

            <div class="section">
                <b-container class="section-container">
                    <Cases/>
                    <Footer link="contacts"/>
                </b-container>
            </div>

            <div class="section position-relative">
                <Contacts/>
            </div>
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

  // import Scrollr from 'skrollr';
  // import * as Three from 'three';
  import ScrollMagic from 'scrollmagic';
  import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
  import {TweenMax, TimelineMax, Linear} from "gsap/TweenMax";

  export default {
    name: 'Home',

    data() {
      return {
        services: [],
        partners: [],
        progressBar: 600
      }
    },

    beforeRouteEnter(to, from, next) {
      document.title = 'Hope & Partners';

      $.getJSON('/static/json/services.json', function (services) {
        $.getJSON('/static/json/partners.json', function (partners) {
          next(vm => {
            vm.services = services;
            vm.partners = partners;
            bus.$emit('toggleLoading', false);
          })
        })
      });
    },

    mounted() {
      // TITLE ANIMATION WRAPPING
      $(document).ready(function () {
        $(".reveal-title, .slide-content-title h2").each(function () {

          var title = $(this),
            width = title.width();

          title.html(function (i, html) {
            return html.replace(/\s+/g, '*');
          });
          title.find('big').html(function (i, html) {
            return html.replace(/\*/g, ' ');
          });
          let texts = title.html().split("*");
          title.html('<span>' + texts.join('</span> <span>') + '</span>');

          title.find("span").each(function () {
            var span = $(this);
            if ((span.position().left + span.width()) > width) {
              span.before('<br>');
            }
          });

          title.find("span").contents().unwrap();
          let lines = title.html().split("<br>");
          title.html('<span class="reveal-wrap"><span class="reveal">' + lines.join('</span></span><span class="reveal-wrap"><span class="reveal">') + '</span></span>');

        });
      });

      // init controller
      const controller = new ScrollMagic.Controller();

      const tween = new TimelineMax()
        .add([
          TweenMax.fromTo("#realcontent", 1, {transform: "translate(0, 0)"}, {
            transform: "translate(-6200px, 0)",
            ease: Linear.easeNone
          }),
          TweenMax.fromTo("#partners-header", 1, {transform: "translate(0, 0)"}, {
            transform: "translate(0, 0)",
            ease: Linear.easeNone
          }),
          TweenMax.fromTo("#partners-progress-bar", 1, {width: 600}, {width: 7100, ease: Linear.easeNone})
        ]);

      // build scene
      const scene = new ScrollMagic.Scene({
        triggerElement: "#partners",
        triggerHook: 'onLeave',
        duration: "700%"
      })
        .setPin("#partners")
        .setTween(tween)
        .addTo(controller);

      scene.on("change update progress start end enter leave", (event) => {
        if (event.state !== "DURING") {
          if (event.scrollPos < event.startPos) {
            $('#partners-progress-bar').css("width", 600);
          } else {
            $('#partners-progress-bar').css("width", 7100);
          }
        }
      });
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
    .scrollmagic-pin-spacer {
        height: 100vh !important;
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

    .services-slider {
        .fp-slidesContainer {
            transition: all 900ms ease 0s !important;
        }
    }

    @include media-max-width($sm-max) {
        .about-section {
            .section-container {
                padding-top: 60px;
            }
        }
    }
</style>