<template>
    <div class="partners" id="partners-container">
        <h1 class="heading heading-main partners-heading" id="partners-header">
            партнери<span class="orange-color">:</span>
        </h1>

        <div id="realcontent">
            <div class="partners-slider">
                <div class="partner-item" v-for="(partner, index) in partners" :key="index">
                    <div class="d-flex">
                        <div class="photo-block">
                            <div class="bg-number">{{index + 1}}</div>
                            <div class="photo"
                                 :style="{'background-image': 'url(static/img/partners/' + partner.imageUrl + ')'}"
                            ></div>
                            <div class="bg-box"></div>
                        </div>
                        <div class="description-block">
                            <h2 class="heading">{{partner.name}}</h2>
                            <div class="occupation">{{partner.occupation}}</div>
                            <div class="description" v-if="partner.description" v-html="partner.description"></div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer class="full-width-footer" link="cases"
            >
                <template slot="progress-bar">
                    <div class="progress-container">
                        <div class="d-flex justify-content-around desc">
                            <a :href="'#partners/' + index"
                               class="grey-color-link"
                               v-for="(partner, index) in partners"
                               :key="index">
                                {{partner.firstName}}
                            </a>
                        </div>
                        <div class="progress">
                            <div id="partners-progress-bar"
                                 class="progress-bar"
                                 role="progressbar"
                            ></div>
                        </div>
                    </div>
                </template>
            </Footer>
        </div>
    </div>
</template>

<script>
    import Footer from './Footer';
    import ScrollMagic from 'scrollmagic';
    import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
    import {TweenMax, TimelineMax, Linear} from "gsap/TweenMax";

    export default {
        name: 'PartnersOld',

        props: ['partners', 'footerWidth'],

        components: {
            Footer
        },

        mounted() {
            $(document).ready(function () {
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
                    triggerElement: "#partners-container",
                    triggerHook: 'onLeave',
                    duration: "700%"
                })
                    .setPin("#partners-container")
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
            })
        }
    }
</script>

<style scoped lang="scss">
    .partners {
        padding-top: 150px;
        height: 100%;
        min-height: 500px;

        .heading-main {
            top: 150px;
            padding-left: 100px;
        }

        .partners-slider {
            width: calc(180% + 44rem);
            height: calc(100vh - 440px);
            display: inline-block;
            opacity: 1; // change from 0
            z-index: 99;
            -o-transition: opacity .3s ease;
            -moz-transition: opacity .3s ease;
            -webkit-transition: opacity .3s ease;
            transition: opacity .3s ease;
            top: 0;
            position: relative;
            padding: 0 0 0 350px;
        }

        .partner-item {
            white-space: normal;
            height: calc(100% - 0rem);
            width: 1000px;
            display: inline-block;
            transform-origin: top;
            -webkit-transform: translate(0, 0);
            transition: all .5s ease;
            -o-transition: all .5s ease;
            -moz-transition: all .5s ease;
            -webkit-transition: all .5s ease;
        }

        .heading {
            margin-bottom: 10px;
        }

        .photo-block {
            width: 450px;
            position: relative;

            .bg-number {
                font-weight: bold;
                line-height: 407px;
                font-size: 288px;
                color: #1E1E1E;
                position: absolute;
                top: -70px;
            }

            .photo {
                position: relative;
                left: 90px;
                z-index: 1;
                width: 265px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                height: 395px;
                transition: all .7s ease;
            }

            .bg-box {
                width: 307px;
                left: 80px;
                background: #1E1E1E;
                height: 354px;
                position: absolute;
                top: 70px;
            }
        }

        .description-block {
            padding-top: 40px;
            height: 450px;

            .occupation {
                line-height: 28px;
                font-size: 18px;
                color: #BCBFC1;
                opacity: 0.7;
            }

            .description {
                margin-top: 40px;
                font-weight: 500;
                line-height: 25px;
                font-size: 14px;
                letter-spacing: 0.01em;
                max-width: 400px;
            }
        }
    }

    .progress-container {
        width: calc(100% - 300px);
        padding-left: 100px;

        .desc {
            font-size: 14px;
            padding-bottom: 5px;
        }
    }

    .progress {
        height: 2px;
        width: 100%;
        margin-bottom: 5px;
        background: #373739;

        .progress-bar {
            background-color: $orange;
            transition: width .3s ease;
        }
    }

    #realcontent {
        padding-top: 50px;
        width: 100%;
        white-space: nowrap;
        color: #fff;

        footer {
            white-space: normal;
        }
    }
</style>