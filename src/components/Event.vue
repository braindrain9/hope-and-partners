<template>
    <div class="event">
        <div class="event-container">
            <div class="description">
                <div class="category-title">наступна зустріч</div>
                <div class="text light-grey-color">projector - 05 жовтня</div>
                <span class="text">
					поговоримо про те, як перезапускати успішні продукти
					з великою базою користувачів у догодити всім.<br/>
					Реєстрація: <a href="http://bit.ly/2PFuA4S">http://bit.ly/2PFuA4S</a>
				</span>
            </div>
        </div>
    </div>
</template>

<script>
  import bus from '../bus';

  export default {
    name: 'Event',

    created: function () {
      bus.$emit('toggleLoading', false);
    }
  }
</script>

<style scoped lang="scss">
    .event {
        padding: 140px 0 40px;
        margin: 0 auto;

        .event-container {
            margin: 0 auto;
            max-width: 900px;
        }

        .description {
            .category-title {
                font-weight: 500;
                line-height: 21px;
                letter-spacing: $base-spacing;
                font-size: $small-font-size;
                color: $white;
            }

            .text {
                font-weight: 500;
                font-size: 32px;
            }
        }
    }

    @include media-max-width($lg-max) {
        .event {
            .event-container {
                max-width: 700px;
            }

            .description {
                .text {
                    font-size: 24px;
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .event {
            padding: 60px 0 20px;

            .event-container {
                max-width: 500px;
            }

            .description {
                .category-title {
                    font-size: 12px;
                }
                .text {
                    font-size: 18px;
                }
            }
        }
    }

    @include media-max-width($xs-max) {
        .event {
            padding: 30px 0 0px;

            .event-container {
                max-width: 100%;
                padding: 0 15px;
            }

            .description {
                .category-title {
                    font-size: 10px;
                }
                .text {
                    font-size: 16px;
                }
            }
        }
    }
</style>