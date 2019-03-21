<template>
    <div id="app">
        <Loader/>

        <div id="wrapper">
            <Header/>

            <router-view role="main"/>
        </div>

        <div id="mouse-icon">
            <div class="icon">
                <div class="inner-icon"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import Footer from './components/Footer';
  import Loader from './components/Loader';
  import Header from './components/Header';

  import {TimelineMax, TweenLite, Linear, Power4} from 'gsap/TweenMax';
  import anime from 'animejs';

  import {i18n} from "./i18n";

  export default {
    name: 'App',

    components: {
      Header,
      Footer,
      Loader
    },

    data() {
      return {
        lang: i18n.locale
      }
    },

    methods: {
      getGeneralContent() {
        this.$http.get(`wp/v2/general?lang=${this.lang}`).then(response => {
          const general = this.transformResponseData(response.data)[0] || {};
          document.title = ((this.$route.name === 'bio' || this.$route.name === 'bioEng')
            ? general.bioPageTitle
            : general.mainPageTitle
            ) || 'Hope & Partners';

          this.$store.commit('updateGeneralContent', general);
        }, error => console.log(error));
      },
      setMouseAnimation() {
        let left, top;

        if (!this.isTouchDevice()) {
          const mouseIcon = $("#mouse-icon");

          document.addEventListener('mousemove', function (event) {
            left = event.pageX;
            top = event.pageY;
            mouseIcon.css({top, left});
          });

          $(document).on("mouseover", 'a, .language-chooser span', function () {
            mouseIcon.css({opacity: 1}).addClass("hover")
          });

          $(document).on("mouseleave", 'a', function () {
            mouseIcon.css({opacity: 0}).removeClass("hover")
          });
        }
      },
      setLinkBehaviour() {
        const body = $('html, body');

        $(document).on('click', 'a[data-link]', function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();

          const preloaderAnimation = new TimelineMax(),
                preloader = $('.page-preloader'),
                hash = $.attr(this, 'data-link'),
                target = $(hash);

          // set scroll behavior in order do not slowly scroll to target
          body.css({"scroll-behavior": "auto"});

          preloaderAnimation.set(preloader, {
            className: '-=is-hidden'
          })
          .to(preloader, 0.7, {
            yPercent: 0,
            ease: Power4.easeInOut
          });

          location.href = (i18n.locale === 'en' ? '/en' : '/') + hash;

          setTimeout(function () {
            body.animate({
              scrollTop: target.offset().top
            }, 0);
          }, 600);

          preloaderAnimation
            .to(preloader, 0.7, {
              yPercent: 100,
              ease: Power4.easeInOut
            })
            .set(preloader, {
              className: '+=is-hidden'
            });
        });
      },
      targetToHash() {
        let existHash;

        if (location.hash) {
          existHash = !!this.footerNavLinks.find(link => link.path === location.hash);
        }

        // go to hash or to top
        if (existHash) {
          const target = $(location.hash),
                body = $('html, body');

          // do not scroll slowly to target
          body.css({"scroll-behavior": "auto"});
          setTimeout(function () {
            if (target && target.offset()) {
              body.animate({scrollTop: target.offset().top}, 0);
            }
          }, 600);
        } else {
          $(document).scrollTop(0);
        }
      },
      initLoading() {
        const progressTimeline = new TimelineMax({
          paused: true,
          onComplete: () => {
            this.targetToHash();

            setTimeout(() => {
              hideLoader();
              initAnimations();
            }, 600);
          }
        });

        let loadingProgress = 0;

        loading();

        //  helpers
        function loading() {
          loadingProgress++;

          // progress bar
          TweenLite.to(progressTimeline, 0.7, {progress: loadingProgress, ease: Linear.easeNone});

          // loader animation
          progressTimeline
            .insert(new TweenLite($('.page-preloader img'), .1, {opacity : 1, ease: Linear.easeNone}))
            .insert(new TweenLite($('.preloader-bar'), 1, {width: "100%", ease: Linear.easeNone}));
        }
        function hideLoader() {
          new TimelineMax()
            .to($('.preloader-bar'), 0.3, {autoAlpha: 0, ease: Linear.easeIn})
            .set($('.page-preloader'), {className: '+=is-hidden'})
            .set($('.page-preloader img'), {className: '+=is-hidden'});
        }
        function initAnimations() {
          TweenLite.to($('#wrapper'), 1, {autoAlpha: 1});

          // hero loading animations
          if ($('.hero').length) {
            const heroHeading = $('.hero .heading-main');

            TweenLite.to($('.hero-section'), 1, {opacity: 1.0});
            TweenLite.fromTo(heroHeading, 1.5, {opacity: 0, y: 50}, {
              opacity: 1.0,
              y: 0,
              delay: 0.5
            });
            TweenLite.fromTo($('.hero .hero-content .details-link'), 1.5, {opacity: 0, x: 100}, {
              opacity: 1.0,
              x: 0,
              delay: 2
            });

            heroHeading.html(heroHeading.text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
            TweenLite.fromTo($('.footer'), 1.5, {opacity: 0}, {opacity: 1, delay: 1});

            anime.timeline().add({
              targets: '.hero .heading-main .letter',
              opacity: [0, 1],
              easing: "easeInOutQuad",
              duration: 1700,
              delay: function (el, i) {
                return 100 * (i + 1)
              }
            });
          }

          // bio loading animations
          if ($('.bio').length) {
            $(document).scrollTop(0);

            TweenLite.to($('.bio'), 1, {opacity: 1});
            TweenLite.fromTo($('.bio .bio-info'), 1, {y: 100}, {y: 0});
            TweenLite.fromTo($('.bio .heading-block'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});
            TweenLite.fromTo($('.bio .heading-main'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});
          }
        }
      }
    },

    created: function () {
      this.getGeneralContent();
    },

    mounted() {
      this.initLoading();
      this.setMouseAnimation();
      this.setLinkBehaviour();
    }
  }
</script>

<style lang="scss">
    @import "assets/scss/_base.scss";

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #wrapper {
        opacity: 0;
        margin: 0 auto;
        min-height: 400px;
    }

    #mouse-icon {
        opacity: 0;
        position: absolute;
        left: -1em;
        top: -1em;
        z-index: 99999999999;
        pointer-events: none;
        width: 60px;
        height: 60px;
        transform: translate(-50%, -50%);
        background-color: transparent;
        border: 1px solid transparent;
    }

    #mouse-icon .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: transparent;
        border: 1px solid transparent;
        transition: all .7s
    }

    #mouse-icon .icon .inner-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        content: '';
        width: 10px;
        height: 10px;
        background-color: $orange;
        border-radius: 50%;
        transition: all .7s
    }

    #mouse-icon.hover .icon {
        width: 60px;
        height: 60px;
        border: 2px solid $orange;
    }

    #mouse-icon.hover .icon .inner-icon {
        background-color: rgba(223, 130, 130, 0.25)
    }

    @include media-min-width($xs) {
        a {
            cursor: none !important;
        }

        #app {
            cursor: url(./assets/img/cursor.png), auto !important;
        }
    }
</style>