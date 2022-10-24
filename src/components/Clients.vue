<template>
    <div class="clients">
        <h2 class="heading heading-main">{{$t('clients')}}<span class="orange-color">:</span></h2>
        <swiper :options="swiperOption" ref="clientsSwiper">
            <swiper-slide class="d-flex align-items-center" v-for="(group, groupIndex) in clients" :key="groupIndex">
                <div v-for="(logo, index) in group" :key="index" class="slider-item d-flex">
                    <div><img v-lazy="logo.imageUrl" :alt="logo.title" :title="logo.title"/></div>
                </div>
            </swiper-slide>
            <div v-if="showControls" class="swiper-button-prev" slot="button-prev" v-html="arrowSvg"></div>
            <div
                    class="swiper-pagination"
                    slot="pagination"
                    ref="pagination"
                    :data-before="activeIndex"
                    :data-after="afterIndex"
                    v-if="showControls"
            ></div>
            <div v-if="showControls" class="swiper-button-next" slot="button-next" v-html="arrowSvg"></div>
        </swiper>
    </div>
</template>

<script>
  import Footer from './Footer';
  import {i18n} from "../i18n";

  import arrowSvg from '../assets/img/arrow-grey.svg';
  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";

  // helpers
  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  export default {
    name: 'Clients',

    components: {
      Footer
    },

    data() {
      return {
        clients: [],
        clientsData: [],
        lang: i18n.locale,
        arrowSvg,
        activeIndex: '01',
        afterIndex: '02',
        showControls: true,
        prevChunkNumber: 0,
        chunkNumber: 0,
      }
    },

    created: async function () {
      this.clientsData = await this.getClients();

      this.setChunkNumber();

      // init for the first time to avoid re-render
      this.prevChunkNumber = this.chunkNumber;

      this.loadSlider();
      this.swiper.on('slideChange', () => this.onSwipe(this));
      this.addClientsAnimation();

      const {afterIndex} = this.onSliderSwipe(0, this.clients);

      this.afterIndex = afterIndex;
    },

    methods: {
      initSlider(clients, chunkNumber) {
        this.clients = [...chunks(clients, chunkNumber)];
        this.showControls = this.clients.length > 1;
      },
      getClients() {
        return this.$http.get(`wp/v2/clients?lang=${this.lang}&per_page=100`).then(response => {
          if (response.data.length) {
            response.data.sort((a, b) => {
              return parseInt(a['title']['rendered']) - parseInt(b['title']['rendered']);
            });
          }

          return this.transformResponseData(response.data);
        }, error => console.log(error));
      },
      addClientsAnimation() {
        const controller = new ScrollMagic.Controller(),
          clientAnimation = new TimelineMax()
            .fromTo($('.clients'), 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, delay: 0.8});

        new ScrollMagic.Scene({
          triggerElement: ".clients",
          triggerHook: "onEnter",
          duration: '80%'
        })
          .setTween(clientAnimation)
          .addTo(controller);
      },
      onSwipe(value) {
        const index = value.swiper.activeIndex;
        const {activeIndex, afterIndex} = this.onSliderSwipe(index, this.clients);

        this.activeIndex = activeIndex;
        this.afterIndex = afterIndex;
      },
      setChunkNumber() {
        const outW = $(window).outerWidth();
        const isTablet = outW >= 767.98 && outW <= 991.98;

        this.chunkNumber = isTablet ? 4 : 6;
      },
      loadSlider() {
        this.initSlider(this.clientsData, this.chunkNumber);
      }
    },

    computed: {
      swiper() {
        return this.$refs.clientsSwiper.swiper;
      }
    },

    async mounted() {
      window.addEventListener('resize', () => {
        this.setChunkNumber();

        if (this.chunkNumber !== this.prevChunkNumber) {
          // set to current chunkNumber
          this.prevChunkNumber = this.chunkNumber;

          this.loadSlider();
        }
      });
    }
  }
</script>

<style scoped lang="scss">
    .clients {
        min-height: 400px;
        position: relative;
        margin: 0 auto;
        padding-top: 50px;
        padding-bottom: 50px;

        img {
            position: relative;
            z-index: 1;
            object-position: top;
            object-fit: cover;
        }

        .swiper-slide {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding-bottom: 100px;
            background-color: transparent !important;
            justify-content: space-between !important;
            height: 300px;
            display: flex;
            align-items: center;
        }

        .swiper-button-prev,
        .swiper-button-next,
        .swiper-container-horizontal > .swiper-pagination-progressbar {
            top: 90%;
        }

        .swiper-button-prev {
            left: 3px;
        }

        .swiper-button-next {
            right: 3px;
        }
    }

    .bio .clients {
        padding-bottom: 100px;
    }

    @include media-max-width($lg-max) {
        .clients {
            img {
                max-width: 140px;
            }
        }
    }

    @include media-max-width($md-max) {
        .clients {
            .heading-main {
                font-size: 40px;
                line-height: 40px;
                padding-bottom: 10px;
                padding-left: 0;
            }
        }
    }

    @include media-max-width($sm-max) {
        .clients {
            padding-top: 100px;

            .heading-main {
                font-size: 36px;
                padding-left: 0;
                padding-bottom: 40px;
            }

            .swiper-slide {
                flex-wrap: wrap;
                height: 350px;
            }

            .slider-item {
                flex: 50%;
                width: 50%;
                max-width: 50%;
                margin-bottom: 25px;
            }

            .swiper-button-prev {
                left: 0;
            }

            .swiper-button-next {
                right: 0;
            }

            img {
                max-width: 150px;
                /*padding-left: 2px;*/
            }
        }
    }
</style>
