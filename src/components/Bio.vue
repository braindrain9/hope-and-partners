<template>
    <div class="bio">
        <div class="container">
            <div class="row">
                <div class="heading-block col-sm-12 offset-sm-0 col-md-7 offset-md-5">
                    <a :href="lang === 'en' ? '/en#about' : '/#about'" class="bio-link horizontal-grey-link">
                        <span></span>
                        <span class="d-inline-block strike"><span>{{$t('back')}}</span></span>
                    </a>
                    <h1 class="heading heading-main"v-html="$t('myCompleteBio')"></h1>
                    <div class="tiny-font-size white-color">{{$t('updatedAt')}} {{updated}}</div>
                </div>
            </div>
        </div>
        <div class="bio-info">
            <div class="container">
                <div class="row">
                    <div class="photo-block col-md-5 col-sm-12 d-none d-md-block">
                        <div class="photo"
                             :style="{backgroundImage: 'url(' + photo + ')'}"
                             v-for="(photo, i) in photos"
                             :key="i"></div>
                    </div>
                    <div class="description-block col-md-7 col-sm-12">
                        <div class="description description-dark" v-for="bio in biography" :key="bio.id">
                            <div class="photo d-md-none"
                                 v-if="bio.imageUrl"
                                 :style="{backgroundImage: 'url(' + bio.imageUrl + ')'}"
                            ></div>

                            <h2 v-if="bio.title">{{bio.title}}</h2>

                            <div class="paragraph" v-if="bio.content" v-html="bio.content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Event/>
        <div class="container footer-container">
            <Footer link="partners"/>
        </div>
    </div>
</template>

<script>
  import Event from './Event';
  import Footer from './Footer';
  import ScrollMagic from 'scrollmagic';
  import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
  import {TimelineMax, TweenLite} from "gsap/TweenMax";
  import {i18n} from "../i18n";
  import bus from '../bus';

  export default {
    name: 'Bio',

    data() {
      return {
        biography: [],
        photos: [],
        updated: '',
        lang: i18n.locale
      }
    },

    created() {
      this.getBioData();
    },

    methods: {
      getBioData: function() {
        this.$http.get(`wp/v2/bio?lang=${this.lang}`)
          .then(response => {
            this.biography = this.transformResponseData(response.data);
            this.photos = this.biography.map(bio => bio.imageUrl).filter(image => image);
            this.updated = this.formatDate(this.findLatestDate(response.data));
          }, error => console.log(error))
          .finally(() => {
            this.addBioAnimation();
          });
      },
      findLatestDate: function (dates) {
        if (dates.length === 0) return null;

        let latestDate = dates[0].modified;

        dates.forEach((date) => {
          if (date.modified > latestDate){
            latestDate = date.modified;
          }
        });

        return latestDate;
      },
      formatDate: function(date) {
        if (date) {
          let formattedDate = new Date(date);

          formattedDate = formattedDate.toLocaleDateString(undefined, {day:'2-digit'})
            + '.' + formattedDate.toLocaleDateString(undefined, {month:'2-digit'})
            + '.' + formattedDate.toLocaleDateString(undefined, {year:'numeric'});

          return formattedDate;
        }
      },
      addBioAnimation: function() {
        TweenLite.to($('.bio'), 1, {opacity: 1});
        TweenLite.fromTo($('.bio .bio-info'), 1, {y: 100}, {y: 0});
        TweenLite.fromTo($('.bio .heading-block'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});
        TweenLite.fromTo($('.bio .heading-main'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});

        const controller = new ScrollMagic.Controller();

        const scene = new ScrollMagic.Scene({
          triggerElement: '.bio',
          triggerHook: "0",
          duration: "100%"
        })
          .addTo(controller);

        $.each($('.bio .photo-block .photo'), function (index, elem) {
          const animPhoto = new TimelineMax()
            .fromTo(elem, 1, {y: 20, opacity: index ? 0.5 : 1}, {y: 0, opacity: 1});

          new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: "onEnter",
            duration: "100%"
          })
            .setTween(animPhoto)
            .addTo(controller);
        });

        $.each($('.bio .row .description-block .description'), function (index, elem) {
          const anim = new TimelineMax()
            .fromTo(elem, 1, {y: 50, opacity: 0.5}, {y: 0, opacity: 1});

          new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: "onEnter",
            duration: "100%"
          })
            .setTween(anim)
            .addTo(controller);
        });

        const wipeAnimation2 = new TimelineMax()
          .fromTo($('.bio .event'), 1, {y: 50, opacity: 0}, {y: 0, opacity: 1});

        const scene2 = new ScrollMagic.Scene({
          triggerElement: ".bio .event",
          triggerHook: "onEnter",
          duration: "80%"
        })
          .setTween(wipeAnimation2)
          .addTo(controller);
      }
    },

    components: {
      Event,
      Footer
    }
  }
</script>

<style scoped lang="scss">
    .bio {
        padding-top: 220px;
        opacity: 0;

        a:not(.horizontal-grey-link):hover {
            color: $orange;
            text-decoration: underline;
        }

        .heading-block {
            padding-bottom: 100px;

            .bio-link {
                font-size: 24px;
            }

            .heading-main {
                margin-bottom: 20px;
            }
        }

        .bio-info {
            background: $white;
            padding-bottom: 40px;

            .photo-block {
                display: inline-block;
                margin-top: -275px;
            }

            .photo {
                height: 650px;
                background-position: center;
                background-size: cover;
                margin-bottom: 40px;
            }

            .description-block {
                margin-top: 50px;

                .description {
                    max-width: 600px;

                    div {
                        font-weight: 500;
                        line-height: 27px;
                        font-size: 20px;
                        margin-bottom: 60px;
                    }

                    h2 {
                        font-weight: bold;
                        font-size: 24px;
                        margin-bottom: 15px;
                    }
                }
            }
        }
    }

    @include media-max-width($lg-max) {
        .bio {
            .bio-info {
                .photo {
                    height: 550px;
                }

                .description-block {
                    .description {
                        h2 {
                            font-size: 20px;
                        }
                        div {
                            font-size: 16px;
                            margin-bottom: 40px;
                        }
                    }
                }
            }
        }
    }

    @include media-max-width($md-max) {
        .bio {
            .heading-block {
                .bio-link {
                    font-size: 18px;
                }
            }

            .bio-info {
                .photo-block {
                    margin-top: -235px;
                }

                .photo {
                    height: 380px;
                }

                .description-block {
                    .description {
                        div {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .bio {
            padding-top: 120px;

            .heading-block {
                .bio-link {
                    font-size: 16px;
                }
            }

            .bio-info {
                .photo-block {
                    margin-top: -75px;
                    display: block;
                }

                .photo {
                    height: 600px;
                    max-width: 100%;
                    margin: 0 auto 20px;
                    opacity: 1 !important;
                }

                .description-block {
                    margin-top: -80px;

                    .description {
                        h2 {
                            font-size: 20px;
                        }
                        div {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    @include media-max-width('450px') {
        .bio {
            .bio-info {
                .photo {
                    height: 500px;
                }
            }
        }
    }

    @include media-max-width($mobile-xs) {
        .bio {
            .bio-info {
                .photo {
                    height: 400px;
                }
            }
        }
    }
</style>