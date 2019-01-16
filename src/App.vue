<template>
    <div id="app" v-aos>
        <Loading/>

        <!--<TopBar-->
        <!--@showUpdater="showUpdater = true"-->
        <!--/>-->

        <div id="wrapper">
            <Header/>

            <!--<Updater-->
            <!--v-if="showUpdater"-->
            <!--:error="error"-->
            <!--@close="showUpdater = false"-->
            <!--/>-->

            <router-view/>

        </div>

        <!--<b-container>-->
        <!--<Footer :link="this.$route.name === 'bio' ? 'partners' : 'home'"/>-->
        <!--</b-container>-->
    </div>
</template>

<script>
  import bus from './bus';
  import Footer from './components/Footer';
  import Loading from './components/Loading';
  import Updater from './components/Updater';
  import TopBar from './components/TopBar';
  import Header from './components/Header';

  import {TimelineMax, TweenLite, Linear, Power4} from 'gsap/TweenMax';
  import anime from 'animejs';

  export default {
    name: 'App',

    data() {
      return {
        error: '',
        loadingOn: true,
        loadingMessage: 'Hope & Partners',
        loadingWheel: true,
        showUpdater: false,
        viewKey: 0
      }
    },

    created: function () {

      this.assignEndpointFromURL();

      bus.$on('toggleLoading', (status = true) => {
        if (typeof status === 'string') {
          this.loadingOn = true;
          this.showWheel = false;
          this.loadingMessage = status;
          return;
        }

        this.loadingMessage = 'Loading...';
        this.loadingWheel = true;
        this.loadingOn = status;
      });

      bus.$on('bumpViewKey', (loadingMessage) => {
        bus.$emit('toggleLoading', loadingMessage);
        this.viewKey = this.viewKey + 1;
      });

      bus.$on('showUpdater', (errorMessage) => {
        this.showUpdater = true;
        this.error = errorMessage;
      });

      bus.$on('clearError', () => {
        this.error = '';
      });
    },

    methods: {
      assignEndpointFromURL: function () {
        let endpoint = this.getQueryString('endpoint');

        if (!endpoint) return;

        this.$store.commit('updateEndpoint', endpoint);
      }
    },

    mounted() {
      const self = this;

      $(document).ready(function () {
          let loadedCount = 0,
            loadingProgress = 0;

          const progressTl = new TimelineMax({
            paused: true,
            onUpdate: progressUpdate,
            onComplete: loadComplete
          });

          loadProgress();

          function loadProgress() {
            loadedCount++;
            loadingProgress = (loadedCount);
            TweenLite.to(progressTl, 0.7, {progress: loadingProgress, ease: Linear.easeNone});
          }

          progressTl
            .insert(new TweenLite($('.preloader-bar'), 1, {width: "100%", ease: Linear.easeNone}), 0,);

          function progressUpdate() {
            loadingProgress = Math.round(progressTl.progress() * 100);
            // $(".percent-count").text(loadingProgress);
          }

          function loadComplete() {
            let existHash;

            if (location.hash) {
              existHash = !!self.footerNavLinks.find(link => link.path === location.hash);
            }

            if (existHash) {
              $('html, body').css({"scroll-behavior": "auto"});

              const target = $(location.hash);

              setTimeout(function () {
                // $(document).scrollTop(target.offset().top);
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 0);
              }, 600);
            } else if ($('.homepage').length) {
              $(document).scrollTop(0);
            }

            setTimeout(function () {
                new TimelineMax()
                  .to($('.preloader-bar'), 0.3, {autoAlpha: 0, ease: Linear.easeIn})
                  .set($('.page-preloader'), {className: '+=is-hidden'});

                TweenLite.to($('#wrapper'), 1, {autoAlpha: 1});
                // hero loading animations
                if ($('.hero').length) {
                  TweenLite.to($('.hero-section'), 1, {opacity: 1.0});
                  TweenLite.fromTo($('.hero .heading-main'), 1.5, {opacity: 0, y: 50}, {
                    opacity: 1.0,
                    y: 0,
                    delay: 0.5
                  });
                  TweenLite.fromTo($('.hero .hero-content .grey-color-link'), 1.5, {opacity: 0, x: 100}, {
                    opacity: 1.0,
                    x: 0,
                    delay: 2
                  });
                  $('.hero .heading-main span').each(function () {
                    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
                  });
                  TweenLite.fromTo($('footer'), 1.5, {opacity: 0}, {opacity: 1, delay: 1});

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

                if ($('.bio').length) {
                  $(document).scrollTop(0);

                  TweenLite.to($('.bio'), 1, {opacity: 1});
                  TweenLite.fromTo($('.bio .bio-info'), 1, {y: 100}, {y: 0});
                  TweenLite.fromTo($('.bio .heading-block'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});
                  TweenLite.fromTo($('.bio .heading-main'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});
                }
              },
              650
            );

            const DsBody = $('html, body');

            // onScroll();
            // $(document).on("scroll", onScroll);

            $(document).on('click', 'a[href^="#"]:not(.scrolled)', function (event) {
              event.preventDefault();
              event.stopImmediatePropagation();
              // $(document).off("scroll");

              // $('a').each(function () {
              //   $(this).removeClass('active');
              // });
              //
              // $(this).addClass('active');

              DsBody.css({"scroll-behavior": "auto"});

              const preloaderLink = new TimelineMax();

              preloaderLink.set($('.page-preloader'), {
                className: '-=is-hidden'
              }).to($('.page-preloader'), 0.7, {
                yPercent: 0,
                ease: Power4.easeInOut
              });

              const target = $($.attr(this, 'href'));

              location.href = '/' + $(this).prop("hash");

              setTimeout(function () {
                DsBody.animate({
                  scrollTop: target.offset().top
                }, 0);
                  // $(document).on("scroll", onScroll);
                // });
              }, 600);

              preloaderLink.to($('.page-preloader'), 0.7, {
                yPercent: 100,
                ease: Power4.easeInOut
              }).set($('.page-preloader'), {
                className: '+=is-hidden'
              });
            });

            // function onScroll(event){
            //   var scrollPos = $(document).scrollTop();
            //
            //   $('#menu a').each(function () {
            //     var currLink = $(this);
            //     var refElement = $(currLink.attr("href"));
            //
            //     if ((refElement.position().top - 200) <= scrollPos && (refElement.position().top + refElement.height()) > scrollPos) {
            //       $('#menu a').removeClass("active");
            //       currLink.addClass("active");
            //     } else {
            //       currLink.removeClass("active");
            //     }
            //   });
            //
            //   $('#mobile-menu-items a').each(function () {
            //     var currLink = $(this);
            //     var refElement = $(currLink.attr("href"));
            //
            //     if ((refElement.position().top - 200) <= scrollPos && (refElement.position().top + refElement.height()) > scrollPos) {
            //       $('#mobile-menu-items a').removeClass("active");
            //       currLink.addClass("active");
            //     } else {
            //       currLink.removeClass("active");
            //     }
            //   });
            // }
          }
        }
      )
      ;
    },

    components: {
      Header,
      Footer,
      Loading,
      Updater,
      TopBar
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
</style>