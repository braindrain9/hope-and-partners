<template>
    <div class="homepage">
        <div class="section position-relative" id="hero">
            <Hero/>
        </div>

        <div class="section" id="about">
            <About/>
        </div>

        <div class="position-relative" id="services" v-if="services.length && partnersLoaded">
            <Services :services="services"/>
        </div>

        <div class="section" id="partners" v-if="partners.length">
            <Partners :partners="partners"/>
        </div>

        <div class="section" id="cases" v-if="cases.length">
            <Cases :cases="cases"/>
        </div>

        <div class="section position-relative" id="contacts">
            <Contacts/>
        </div>
    </div>
</template>

<script>
  import Hero from '../components/Hero';
  import About from '../components/About';
  import Partners from '../components/Partners';
  import Services from '../components/Services';
  import Cases from '../components/Cases';
  import Contacts from '../components/Contacts';
  import Footer from '../components/Footer';

  import {i18n} from "../i18n";

  export default {
    name: 'HomePage',

    components: {
      About,
      Hero,
      Partners,
      Services,
      Cases,
      Contacts,
      Footer
    },

    data() {
      return {
        services: [],
        partners: [],
        cases: [],

        // is needed for services as it depends on this to have appropriate footer
        partnersLoaded: false,
        lang: i18n.locale
      }
    },

    created() {
      this.getServices();
      this.getPartners();
      this.getCases();
    },

    methods: {
      getServices() {
        this.$http.get(`wp/v2/services?lang=${this.lang}&per_page=100`).then(response => {
          if(response.data.length) {
            response.data.sort((a, b) => {
              return parseInt(a['title']['rendered']) - parseInt(b['title']['rendered']);
            });
          }
          this.services = this.transformResponseData(response.data);
        }, error => console.log(error));
      },
      getPartners() {
        this.$http.get(`wp/v2/partners?lang=${this.lang}&per_page=100`)
          .then(response => {
            this.partners = this.transformResponseData(response.data);
          }, error => console.log(error))
          .finally(() => this.partnersLoaded = true);
      },
      getCases() {
        this.$http.get(`wp/v2/cases?lang=${this.lang}&per_page=100`).then(response => {
          this.cases = this.transformResponseData(response.data);
        }, error => console.log(error));
      }
    }
  }
</script>
