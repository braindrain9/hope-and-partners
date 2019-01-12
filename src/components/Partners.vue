<template>
    <section class="partners">
        <div id="partners-container">
            <div class="partners-title-wrapper">
                <div class="container">
                    <h2 class="heading heading-main">партнери<span class="orange-color">:</span></h2>
                </div>
            </div>
            <div id="partners-slider-container">
                <div class="partners-progress-container">
                    <div id="partners">
                        <div class="partner" v-for="(partner, index) in partners" :key="index"
                             :id="'partner' + (index + 1)">
                            <div class="partner-item">
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
                                        <div class="description" v-if="partner.description"
                                             v-html="partner.description"></div>
                                    </div>
                                </div>
                                <div class="progress-name text-center">{{partner.firstName}}</div>
                            </div>
                        </div>
                    </div>

                    <div class="position-relative timeline-progressbar-container">
                        <div class="progress-line">
                            <div class="progress-line-fill" id="progress-line-fill"></div>
                        </div>
                    </div>

                    <Footer class="partners-footer" link="cases"></Footer>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ScrollMagic from 'scrollmagic';
    import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
    import {TimelineMax} from "gsap/TweenMax";
    import Footer from './Footer';

    export default {
        name: 'Partners',

        props: ['partners'],

        components: {
            Footer
        },

        mounted() {
            $(document).ready(function () {
                partnersInit();
            });


            function partnersInit() {
                const controller = new ScrollMagic.Controller(),
                    slideCount = $('.partner').length,
                    slideWidth = document.getElementById("partner1").clientWidth,
                    offsetLeft = $('#mainMenu')[0].offsetLeft,
                    maxWidth = offsetLeft + (slideWidth * (slideCount - 1)),
                    progWrap = $('.partners-progress-container'),
                    progWrapWidth = maxWidth + offsetLeft;

                const wipeAnimation = new TimelineMax()
                    .to("#partners-slider-container", 1, {
                        x: '' + offsetLeft + 'px'
                    }, 0)
                    .to(".progress-line-fill", 1, {
                        width: progWrapWidth + 'px'
                    }, 0)
                    .to(".partners-progress-container", 1, {
                        x: -progWrapWidth + 'px'
                    }, 0);

                const scene = new ScrollMagic.Scene({
                    triggerElement: "#partners-container",
                    triggerHook: "onLeave",
                    duration: slideCount * 100 + "%"
                })
                    .setPin("#partners-container")
                    .setTween(wipeAnimation)
                    .addTo(controller);

                // set width and position
                $('.partner').css("width", 100 / slideCount + "%");

                progWrap.css({
                    "left": offsetLeft,
                    "width": progWrapWidth
                });

                $('.timeline-progressbar-container').css({"left": "200px"});

                // set data position to triger opacity on enter
                const YPosition = parseFloat(progWrap.width() / slideCount);

                $('.partner').each(function (index) {
                    $(this).attr("data-position", YPosition / 3 + index * YPosition);
                });
            }

            let lnPosition, selected;
            $(window).scroll(function () {
                const lineWidth = parseFloat(document.getElementById("progress-line-fill").offsetWidth);

                $('.partner').each(function () {
                    lnPosition = $(this).data('position');
                    selected = '#' + $(this).data('partner');
                    if ((lineWidth + 500) >= lnPosition) {
                        $(this).addClass('fill');
                    } else {
                        $(this).removeClass('fill');
                    }
                });
            });

            window.addEventListener('resize', function () {
                const offsetLeft = $('#mainMenu')[0].offsetLeft;

                $('.partners-progress-container').css({
                    "left": offsetLeft
                });
            });
        }
    }
</script>

<style scoped lang="scss">
    .partners {
        .heading-main {
            padding-left: 125px;
        }

        .partner-item {
            width: 1000px;
            display: inline-block;
            padding: 0 0 0 150px;
            transition: all .5s ease-in-out;
            opacity: 1;
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
                transition: all .5s ease;
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

        .progress-name {
            font-size: 18px;
            margin-top: 50px;
            color: white;
        }

        .partners-footer {
            margin: 0;
            position: absolute;
            width: calc(100% + 500px);
            left: 0;
            bottom: -8px;
        }

        #partners {
            height: 550px;

            .partner {
                float: left;
                width: 1200px;
                padding: 0 0 0 150px;

                &:not(.fill) {
                    .partner-item {
                        opacity: 0.2;

                        .photo-block {
                            .photo {
                                filter: grayscale(100%);
                                transition: all .2s ease-in-out;
                            }
                        }

                        .description-block {
                            h2, .description {
                                color: $grey;
                            }
                        }
                    }
                }
            }
        }

        #partners-container {
            padding-top: 100px;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            perspective: 1000;
            margin-bottom: 185px;
            position: relative;

            .partners-title-wrapper {
                position: absolute;
                top: 200px;
                width: 100%;
                z-index: 5;
            }

            #partners-slider-container {
                width: 500%;
                height: 100%;

                .partners-progress-container {
                    position: absolute;
                    bottom: 50px;
                    left: 0;
                    width: 100%;
                    z-index: 4
                }

                .progress-line {
                    position: relative;
                    height: 3px;
                    width: 100%;
                    background-color: $grey;
                    z-index: 4
                }

                .progress-line-fill {
                    height: 3px;
                    position: absolute;
                    top: 0;
                    width: 0;
                    background-color: $orange;
                    z-index: 4
                }
            }
        }
    }
</style>