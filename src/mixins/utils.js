import bus from '../bus';

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

    goToServicesFirstSlide: function() {
      location.hash = "#services";
    },

    goToSection: function(hash) {
      this.$store.commit('updateSliding', false);
      location.href = hash;
    },

    getQueryString: function( name ) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      let results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },

    animate: function() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      var array = [];

      var temp = document.createElement('canvas');
      var buffer = temp.getContext('2d');
      var fill = new ImageData(1, 1);

      canvas.width = (window.innerWidth > 500) / 2 ? window.innerWidth / 2 : 500;
      canvas.height = window.innerHeight > 700 ? window.innerHeight : 700;

      const center = { x: canvas.width * 0.5, y: canvas.height * 0.5 };

      ctx.fillStyle = '#030301';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.6;

      (function loop() {
        update();
        render();
        requestAnimationFrame(loop);
      })();

      function update() {
        array.forEach(function (point) {
          point.update();
        });
      }

      function render() {
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        array.forEach(function (point) {
          point.render(ctx);
        });
      }

      bus.$on('animate', (key) => {
        init (key);
      });

      function init(key) {
        array = [];
        textToImage(key, 0, 1);
      }

      function textToImage(key, pos, total) {
        buffer.clearRect(0, 0, 60, 60);
        buffer.font = '60px Montserrat';
        buffer.fillStyle = '#000';
        buffer.fillText(key, 8, 52);

        const text = buffer.getImageData(0, 0, 60, 60);

        dataToArray(text, pos, total);
      }

      function dataToArray(text) {
        const temp = { x: 100, y: center.y - 250};

        for (var i = 0; i < text.data.length; i += 4) {
          if (text.data[i + 3] > 0) {
            let x = (i >> 2) % text.width;
            let y = (i >> 2) / text.width;
            let point = new Point({ x: (x << 3) + temp.x, y: (y << 3) + temp.y });
            array.push(point);
          }
        }
      }
      function positionFromRad(rad, length, base) {
        return { x: length * Math.cos(rad) + base.x, y: length * Math.sin(rad) + base.y };
      }

      function Point(base) {
        this.base = base;
        this.chance1 = Math.random() * 0.06 - 0.03;
        this.chance2 = Math.random() * 0.2 - 0.1;
        this.length1 = Math.random() * 20 + 100;
        this.length2 = Math.random() * 10 + 20;
        this.speed1 = Math.random() * 0.5 + 1;
        this.speed2 = Math.random() * 0.1 + 0.5;
        this.dist1 = Math.random() * 4 + 8;
        this.dist2 = Math.random() * 4 + 6;
        this.min1 = Math.random() * -this.dist1;
        this.min2 = Math.random() * -this.dist2;
        this.rad1 = Math.random() * Math.PI * 2 + Math.PI * 2;
        this.rad2 = Math.random() * Math.PI * 2 + Math.PI * 2;

        const temp = positionFromRad(this.rad1, this.length1, this.base);

        this.current = positionFromRad(this.rad2, this.length2, temp);

        this.update = function() {
          this.length1 += this.dist1;
          this.length2 += this.dist2;
          this.dist1 -= this.dist1 < this.min1 ? 0 : this.speed1;
          this.dist2 -= this.dist2 < this.min2 ? 0 : this.speed2;
          this.length1 = this.length1 < 0 ? 2 : this.length1;
          this.length2 = this.length2 < -2 ? 2 : this.length2;
          this.rad1 += this.chance1;
          this.rad2 += this.chance2;

          const temp = positionFromRad(this.rad1, this.length1, this.base);

          this.current = positionFromRad(this.rad2, this.length2, temp);
        };

        this.render = function(ctx) {
          ctx.putImageData(fill, this.current.x, this.current.y);
        };

        return this;
      }
    }
  }
}
