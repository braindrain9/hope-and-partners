export default {

  data () {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      navLinks: [
        {
          name: 'home',
          title: 'на головну',
          path: '/',
          hidden: true,
          id: 1
        },
        {
          name: 'about',
          path: '/#about',
          title: 'про мене',
          id: 2
        },
        {
          name: 'services',
          path: '/#services',
          title: 'послуги',
          id: 3
        },
        {
          name: 'partners',
          path: '/#partners',
          title: 'партнери',
          id: 4
        },
        {
          name: 'cases',
          path: '/#cases',
          title: 'кейси',
          id: 5
        }
      ],
      footerNavLinks: [
        {
          name: 'home',
          path: '/',
          title: 'на головну'
        },
        {
          name: 'about',
          path: '/#about',
          title: 'про мене'
        },
        {
          name: 'services',
          path: '/#services',
          title: 'наші послуги'
        },
        {
          name: 'services',
          path: '/#services',
          title: 'наші послуги'
        },
        {
          name: 'partners',
          path: '/#partners',
          title: 'наші партнери'
        },
        {
          name: 'cases',
          path: '/#cases',
          title: 'наші кейси'
        },
        {
          name: 'cases',
          path: '/#cases',
          title: 'наші кейси'
        },
        {
          name: 'contacts',
          title: 'де нас знайти?',
          path: '/#contacts'
        }
      ]
    }
  },

  methods: {
    setPartnersFooterPos: function() {
      const headerBlock = $("header .container .navbar"),
            footerBlock = $("footer.full-width-footer"),
            partnersHeading = $(".partners-heading");

      if (footerBlock) {
        const leftHeaderPos  = headerBlock[0].getBoundingClientRect().left;

        footerBlock.css("padding-left", leftHeaderPos);
        partnersHeading.css("padding-left", 100 + leftHeaderPos); // TODO fix
      }
    },
    getFormattedDate: function (time) {
      let date = new Date(time);
      return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },

    goBack: function() {
      this.$router.go(-1);
    },

    getQueryString: function( name ) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      let results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  }
}
