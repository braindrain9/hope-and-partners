<template>
    <div class="bio">
        <div class="container">
            <div class="row">
                <div class="heading-block col-sm-12 offset-sm-0 col-md-7 offset-md-5">
                    <a href="#about" class="bio-link horizontal-grey-link">
                        <span></span>
                        <span class="d-inline-block strike"><span>назад</span></span>
                    </a>
                    <h1 class="heading heading-main">
                        Моя<br/>
                        повна <span class="orange-color">біографія</span>
                    </h1>
                    <div class="tiny-font-size white-color">останній апдейт 20.12.2018</div>
                </div>
            </div>
        </div>
        <div class="bio-info">
            <div class="container">
                <div class="row">
                    <div class="photo-block col-md-5 col-sm-12 d-none d-md-block">
                        <div class="photo" :class="'photo-' + (i + 1)" v-for="(photo, i) in 4"></div>
                    </div>
                    <div class="photo-block col-sm-12 d-md-none">
                        <div class="photo photo-1"></div>
                    </div>
                    <div class="description-block col-md-7 col-sm-12">
                        <div class="description description-dark">
                            <div>
                                Я спеціаліст зв’язків з реальністю, це жарт наполовину.
                                Бо допомагаю проектам розібратися в комунікаціях – маркетингу,
                                брендингу та піарі самотужки, показати реальний стан справ.
                            </div>

                            <div>
                                <h4>Громадсько-політична сфера</h4>
                                <div>
                                    З початку кар’єри займалася соціальними й громадськими проектами, деколи паралельно
                                    з бізнесовими.
                                    Найвагоміші з них:
                                    <br/>
                                    <br/>
                                    З 2015 й до сьогодні консультант у проекті
                                    <a href="https://www.facebook.com/InvisibleBattalion/" target="_blank">«Невидимий
                                        Батальйон»</a>.
                                    Це правозахисний рух жінок-військових. У результаті його діяльності
                                    в тому числі прийнято рамковий Закон України «Щодо забезпечення рівних прав і
                                    можливостей жінок
                                    і чоловіків під час проходження військової служби у Збройних Силах України»,
                                    09.09.2018.
                                    <br/>
                                    <br/>
                                    Національний викладач у <a href="https://www.facebook.com/ualeadershipacademy/"
                                                               target="_blank">Українська Академія Лідерства</a>
                                    (навчальний заклад формату «школа лідерів»,
                                    де вчаться випускники підлітки, відібрані на конкурсній основі) та
                                    куратор проекту Академії стажування молоді у органах влади
                                    <a href="https://www.facebook.com/derzhavotvorets/"
                                       target="_blank">«Державотворець»</a>
                                    (спільно з USAID).
                                    <br/>
                                    <br/>
                                    2016-2017 керівник комунікації київського представництва партії «Самопоміч»,
                                    включаючи депутатський корпус у Київраді (22 депутати).
                                </div>
                            </div>

                            <div class="photo photo-2 d-md-none"></div>

                            <div>
                                <h4>Освіта</h4>

                                <div>
                                    Я усвідомлений викладач, який кайфує від своєї роботи. Намагаюся вчити думати, а не
                                    копіювати чужі історії успіху.
                                    <br/>
                                    <br/>
                                    З 2017 до сьогодні – автор і викладач курсу комунікацій у бізнес-школі
                                    <a href="https://prjctr.com.ua/marketing-communications.html" target="_blank">Projector</a>.
                                    <br/>
                                    <br/>

                                    2017 – ментор інкубатору для соціальних стартапів
                                    <a href="http://www.1991.vc/about/" target="_blank">1991 Open Data Incubator</a>
                                    (реалізується за підтримки міжнародних організацій WNISEF, USAID і Уряду України) і
                                    <a href="http://selab.chasopys.ua/" target="_blank">SELab школи соціального
                                        підприємництва</a>
                                    (реалізується за підтримки Social Entrepreneurship Eco System, Швеція).
                                    <br/>
                                    <br/>

                                    З 2017 й до сьогодні – друг і радник наукової платформи Nobilitet (все про
                                    Нобелівську премію й не тільки)
                                    <br/>
                                    <br/>

                                    2013 – 2016 член команди організаторів міжнародної конференції <a
                                        href="https://tedxkyiv.com/" target="_blank">TEDxKyiv</a>
                                    <br/>
                                    <br/>

                                    Ініціювала проведення в Україні саме жіночої гілки конференції
                                    <a href="https://www.youtube.com/watch?v=7pGseTL2sp0" target="_blank">TEDxWomen</a>
                                    й виступила там як
                                    <a href="https://www.youtube.com/watch?v=7pGseTL2sp0" target="_blank">спікер</a>
                                    (2017).
                                </div>
                            </div>

                            <div class="photo photo-3 d-md-none"></div>

                            <div>
                                <h4>Бізнес</h4>
                                <div>
                                    Пункти вище стали можливі в тому числі завдяки кар’єрі в креативних індустріях та
                                    власній справі:
                                    <br/>
                                    <br/>
                                    2018 – заснувала консалтингове бюро Hope&Partners
                                    <br/>
                                    <br/>
                                    2016 – 2018 засновниця і співвласниця закладу <a
                                        href="https://www.facebook.com/prbarkyiv" target="_blank">PR Bar</a>
                                    <br/>
                                    <br/>
                                    2015 – маркетинг-директор Сім’ї ресторанів <a href="https://borysov.com.ua/"
                                                                                  target="_blank">Діми Борисова</a>
                                    <br/>
                                    <br/>
                                    2011–2013, координатор проектів рекламно-маркетингової агенції <a
                                        href="https://borysov.com.ua/" target="_blank">FEDORIV</a>.
                                    <br/>
                                    <br/>
                                    2009-2011, фрілансер, культурні й соціальні проекти.
                                    <br/>
                                    <br/>
                                    2007–2009, PR менеджер міжнародного рекламного агенства <a
                                        href="http://havaswwukraine.com.ua/" target="_blank">Havas Worldwide Ukraine</a>.
                                    <br/>
                                    <br/>
                                </div>
                            </div>

                            <div class="photo photo-4 d-md-none"></div>

                            <div>
                                <h4>Відзнаки</h4>
                                <div>
                                    Шорт-лист <a
                                        href="http://diplomat.media/2018/10/02/european-women-expert-awards-2018/"
                                        target="_blank">European Women Expert Awards 2018</a>
                                    <br/>
                                    <br/>

                                    <a href="https://womanpress.jimdo.com/top-woman-500/business-services-1/"
                                       target="_blank">ТОП 500 «найвпливовіших жінок України»</a>
                                    за версією видання WOMAN у категорії «бізнес».
                                    <br/>
                                    <br/>

                                    Випускниця <a href="http://aspeninstitutekyiv.org/" target="_blank">Аспен Інститут
                                    Київ</a>, семінар 11.2018
                                    <br/>
                                    <br/>

                                    Кращий ментор табору для підприємців
                                    <a href="http://startupukraine.kiev.ua/campowners" target="_blank">Startup Ukraine
                                        2017</a>
                                </div>
                            </div>
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
  import {TimelineMax, TweenLite} from "gsap/TweenMax";

  export default {
    name: 'Bio',

    mounted() {
      document.title = 'Hope & Partners / Bio';

      $(document).ready(function () {
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

        $.each($('.bio .row .description-block .description div'), function (index, elem) {
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
      });
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

                &.photo-1 {
                    background-image: url(../assets/bio/bio1.png);
                }

                &.photo-2 {
                    background-image: url(../assets/bio/1.jpg);
                }

                &.photo-3 {
                    background-image: url(../assets/bio/3.jpg);
                }

                &.photo-4 {
                    background-image: url(../assets/bio/4.jpg);
                }
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

                    h4 {
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
                        h4 {
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
                    margin-top: 20px;

                    .description {
                        h4 {
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