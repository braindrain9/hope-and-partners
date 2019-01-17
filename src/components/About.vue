<template>
    <div class="about">
        <div class="about-container d-flex align-items-start">
            <img class="about-img"
                 src="../assets/img/about.png"
                 alt="About me image"
            />
            <div class="bio-container">
                <h1 class="heading">
                    мене звати Надя,<br/>
                    я консультант із комунікацій<span class="orange-color">.</span>
                </h1>
                <p class="description">
                    Тут має бути текст про досягнення, написаний копірайтерами, з назвами гучних компаній і проектів.
                    Так дійсно легше для сприйняття. Проте моя робота не про легкі, швидкі й готові рішення, їх
                    достатньо на ринку.
                    Я допомагаю проектам самотужки долати виклики у комунікації – бренду, PR та репутації.
                    <br/>
                    <br/>
                    Зараз усвідомлено розвиваю агентство Нope&Partners, викладаю і виступаю як бізнес-спікер.
                    <br/>
                    <br/>
                    Маю надію, мій досвід стане вам корисним!
                </p>
                <p class="bio-link">
                    <span>повне біо <router-link to="/bio">тут</router-link></span>
                </p>
            </div>
        </div>
        <Event/>
    </div>
</template>

<script>
  import Event from './Event';
  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";

  export default {
    name: 'About',

    components: {
      Event
    },

    mounted() {
      $(document).ready(function () {
        const controller = new ScrollMagic.Controller();

        const bioInfoAnimation = new TimelineMax()
          .fromTo($('.about img.about-img'), 1, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.2})
          .fromTo($('.about .bio-container'), 1, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0, delay: 0})
        ;

        const eventAnimation = new TimelineMax()
          .fromTo($('.about .event'), 1, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, delay: 0.5});

        const photoAnimation = new TimelineMax()
          .fromTo($('.about .about-image'), 1, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, delay: 0.5});

        const bioInfo = new ScrollMagic.Scene({
          triggerElement: ".about-container",
          triggerHook: "onEnter",
          duration: '100%'
        })
          .setTween(bioInfoAnimation)
          .addTo(controller);

        const event = new ScrollMagic.Scene({
          triggerElement: ".about .event",
          triggerHook: "onEnter",
          duration: '100%'
        })
          .setTween(eventAnimation)
          .addTo(controller);
      });
    }
  }
</script>

<style scoped lang="scss">
    .about {
        > div {
            margin-bottom: 100px;
        }

        .about-img {
            max-width: 50%;
            transition: all .5s ease-in-out;
            position: sticky;
            top: 120px;
        }

        .bio-container {
            margin-left: -110px;
            margin-top: 200px;
            position: relative;

            .heading, .description {
                transition: all 0.5s ease-in-out;
            }
        }

        .bio-link {
            font-weight: 500;
            line-height: 32px;
            font-size: 24px;
            letter-spacing: $base-spacing;
            color: $white;

            a {
                font-weight: bold;
                color: $orange;

                &:hover {
                    text-decoration: underline;
                }
            }

            &:before {
                content: "";
                width: 40%;
                height: 2px;
                background-color: $white;
                display: inline-block;
                vertical-align: middle;
                margin-right: 20px;
            }
        }
    }

    @include media-max-width($lg-max) {
        .about {
            > div {
                margin-bottom: 0;
            }

            .about-img {
                max-width: 40%;
            }

            .bio-container {
                margin-left: 0;
                margin-top: 100px;
            }

            .bio-link {
                font-size: 20px;
            }
        }
    }

    @include media-max-width($sm-max) {
        .about {
            > div {
                flex-direction: column;
            }

            .about-img {
                max-width: 80%;
                margin: 0 auto;
                position: static;
            }

            .bio-container {
                margin-left: 0;
                margin-top: -50px;
            }

            .bio-link {
                &:before {
                    width: 40px;
                }
            }
        }
    }

    @include media-max-width($xs-max) {
        .about {
            .bio-link {
                font-size: 18px;
            }
        }
    }
</style>