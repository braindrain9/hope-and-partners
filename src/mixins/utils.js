import bus from '../bus';
import {GeometryUtils, ParticleUtils} from './three';
import {TweenMax, Sine} from 'gsap/TweenMax';
require('three/examples/js/controls/OrbitControls.js');

export default {
  data () {
    return {
      navLinks: [
        {
          name: 'about',
          path: '#about',
          title: 'about',
          id: 2
        },
        {
          name: 'services',
          path: '#services',
          title: 'services',
          id: 3
        },
        {
          name: 'partners',
          path: '#partners',
          title: 'partners',
          id: 4
        },
        {
          name: 'cases',
          path: '#cases',
          title: 'cases',
          id: 5
        }
      ],
      footerNavLinks: [
        {
          name: 'home',
          path: '#hero',
          title: 'home'
        },
        {
          name: 'about',
          path: '#about',
          title: 'about'
        },
        {
          name: 'services',
          path: '#services',
          title: 'ourServices'
        },
        {
          name: 'partners',
          path: '#partners',
          title: 'ourPartners'
        },
        {
          name: 'cases',
          path: '#cases',
          title: 'ourCases'
        },
        {
          name: 'contacts',
          title: 'howToFindUs',
          path: '#contacts'
        }
      ],
      typeface: this.$store.state.content_endpoint + 'dist/src/assets/json/Montserrat_Bold.json'
    }
  },

  methods: {
    isTouchDevice: function () {
      return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0))
    },
    transformResponseData: function (data) {
      return data && data.length
        ? data.reduce((arr, item) => {
          arr.push({id: item.id, ...item.acf});
          return arr;
        }, [])
        : [];
    },

    getServicesAnimation: function() {
      // default options
      const particleCount = 2000,
            particleSize = 0.1,
            defaultAnimationSpeed = 1,
            morphAnimationSpeed = 0,
            color = '#FFFFFF',
            triggers = $('.services-slider .slide-content .letter'),
            outW = $(window).outerWidth(),
            canvasHeight = window.innerHeight * 0.75,
            fontConfig = {
              size: 12,
              height: 2
            },
            animationVars = {
              speed: defaultAnimationSpeed/200,
              normalSpeed: defaultAnimationSpeed/200,
              fullSpeed: morphAnimationSpeed/100
            };

      // set canvas width
      let canvasWidth = window.innerWidth / (outW > 1140 ? 3 : outW > 768 ? 2 : 1);

      if (outW > 768 && canvasWidth < 500) {
        canvasWidth = 550;
      }

      // three.js options
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-services'), alpha : true}),
            scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 ),
            light = new THREE.AmbientLight( 0xFFFFFF, 1 );

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasWidth, canvasHeight);

      camera.position.y = 0;
      camera.position.z = 35;

      scene.add(light);

      // set controls
      const controls = new THREE.OrbitControls(camera);

      controls.enablePan = false;
      controls.enableKeys = false;
      controls.enableRotate = outW > 768;
      controls.enableZoom = false;
      controls.update();

      // particles
      const particles = new THREE.Geometry(),
            texts = [],
            pMaterial = new THREE.PointsMaterial({
              size: particleSize,
            }),
            loader = new THREE.FontLoader();

      loader.load(this.typeface, (font) => {
        Array.from(triggers).forEach((trigger, idx) => {
          texts[idx] = {};
          texts[idx].geometry = new THREE.TextGeometry(trigger.textContent, {
            font,
            size: fontConfig.size,
            height: fontConfig.height
          });

          texts[idx].geometry.center();
          texts[idx].particles = new THREE.Geometry();
          texts[idx].points = GeometryUtils.randomPointsInGeometry(texts[idx].geometry, particleCount);
          ParticleUtils.createVertices(particleCount, texts[idx].particles, texts[idx].points);
          enableTrigger(trigger, idx);
        });
      });

      ParticleUtils.fillParticles(particles, particleCount);

      const particleSystem = new THREE.Points(particles, pMaterial);

      scene.add(particleSystem);

      animate();

      function enableTrigger(trigger, idx) {
        bus.$on("animateServicesParticles", index => {
          ParticleUtils.morphToServices(animationVars, particles, texts[index].particles);
        });

        if (idx === 0) {
          ParticleUtils.morphToServices(animationVars, particles, texts[idx].particles);
        }
      }

      function animate() {
        particleSystem.rotation.y += animationVars.speed;
        particles.verticesNeedUpdate = true;
        particleSystem.material.color = new THREE.Color(color);

        window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    },

    getContactsAnimation: function() {
      // default options
      const particleCount = 3000,
        particleSize = 0.1,
        defaultAnimationSpeed = 1,
        morphAnimationSpeed = 0,
        color = '#F44336',
        outW = $(window).outerWidth(),
        canvasHeight = window.innerHeight * 0.75,
        fontConfig = {
          size: 12,
          height: 2
        },
        animationVars = {
          speed: defaultAnimationSpeed/300,
          normalSpeed: defaultAnimationSpeed/300,
          fullSpeed: morphAnimationSpeed/100
        },
        canvasWidth = outW > 768 ? window.innerWidth / 2 : window.innerWidth;

      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-contacts'), alpha : true}),
            scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 ),
            light = new THREE.AmbientLight( 0xFFFFFF, 1 );

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasWidth, canvasHeight);

      camera.position.y = 0;
      camera.position.z = 35;

      scene.add(light);

      // set controls
      const controls = new THREE.OrbitControls(camera);

      controls.enablePan = false;
      controls.enableKeys = false;
      controls.enableRotate = false;
      controls.enableZoom = false;
      controls.update();

      const particles = new THREE.Geometry(),
            text = {},
            pMaterial = new THREE.PointsMaterial({
              size: particleSize,
            }),
            loader = new THREE.FontLoader();

      loader.load(this.typeface, (font) => {
        text.geometry = new THREE.TextGeometry('@', {
          font,
          size: fontConfig.size,
          height: fontConfig.height
        });

        text.geometry.center();
        text.particles = new THREE.Geometry();
        text.points = GeometryUtils.randomPointsInGeometry(text.geometry, particleCount);
        ParticleUtils.createVertices(particleCount, text.particles, text.points);
        ParticleUtils.morphTo(animationVars, particles, text.particles);
      });

      ParticleUtils.fillParticles(particles, particleCount);

      const particleSystem = new THREE.Points(particles, pMaterial);

      scene.add(particleSystem);

      animate();

      function animate() {
        particleSystem.rotation.y -= animationVars.speed;
        particles.verticesNeedUpdate = true;
        particleSystem.material.color = new THREE.Color(color);

        window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    },

    getHeroAnimation: function() {
      const particleCount = 5000,
            particleSize = 0.1,
            defaultAnimationSpeed = 1,
            morphAnimationSpeed = 18,
            color = '#F44336',
            outW = $(window).innerWidth(),
            canvasWidth = window.innerWidth,
            fontConfig = {
              size: outW > 1200 ? 16 : outW > 768 ? 12 : 10,
              height: outW > 768 ? 5 : 2
            },
            animationVars = {
              speed: defaultAnimationSpeed/300,
              normalSpeed: defaultAnimationSpeed/300,
              fullSpeed: morphAnimationSpeed/100
            },
            canvasHeight = window.innerHeight,
            windowHalfX = window.innerWidth / 2,
            windowHalfY = window.innerHeight / 2,
            maxOffset = 8;

      let mouseX = 0, mouseY = 0;

      // three.js options
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-hero'), alpha : true}),
            scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 ),
            light = new THREE.AmbientLight( 0xFFFFFF, 1 ),
            raycaster = new THREE.Raycaster(),
            mouse = new THREE.Vector2();

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasWidth, canvasHeight);

      camera.position.y = 0;
      camera.position.z = 35;

      scene.add(light);

      // set controls
      const controls = new THREE.OrbitControls(camera);

      controls.enablePan = false;
      controls.enableKeys = false;
      controls.enableRotate = false;
      controls.enableZoom = false;
      controls.update();

      // particles
      const particles = new THREE.Geometry(),
        text = {},
        pMaterial = new THREE.PointsMaterial({
          size: particleSize,
        }),
        loader = new THREE.FontLoader();

      loader.load(this.typeface, (font) => {
        text.geometry = new THREE.TextGeometry('&', {
          font,
          size: fontConfig.size,
          height: fontConfig.height
        });
        text.geometry.center();
        text.particles = new THREE.Geometry();
        text.points = GeometryUtils.randomPointsInGeometry(text.geometry, particleCount);
        ParticleUtils.createVertices(particleCount, text.particles, text.points);
        ParticleUtils.morphTo(animationVars, particles, text.particles);
      });

      ParticleUtils.fillParticles(particles, particleCount);

      if (!this.isTouchDevice()) {
        $(document).mousemove(function(e) {
          e.preventDefault();

          mouseX = e.clientX - windowHalfX;
          mouseY = e.clientY - windowHalfY;

          mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
          mouse.y = - (e.clientY / renderer.domElement.clientHeight) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          let intersects = raycaster.intersectObjects(scene.children, true);

          if (intersects.length > 0) {
            intersects = intersects.filter(obj => obj.distanceToRay < 0.8);
            intersects.forEach((obj, i) => {
              const index = intersects[i].index,
                point = particles.vertices[index],
                startX = point.x,
                startY = point.y;

              TweenMax.to(point, 1, {
                x: ParticleUtils.random(point.x - maxOffset / 2, point.x + maxOffset / 2),
                y: ParticleUtils.random(point.y - maxOffset / 2, point.y + maxOffset / 2),
                ease: Sine.easeInOut,
                onComplete
              });

              function onComplete() {
                TweenMax.to(point, 1.5, {
                  x: startX,
                  y: startY,
                  ease: Power2.easeOut,
                  speed: animationVars.normalSpeed,
                  delay: 0.1
                });
              }
            })
          }
        });
      }

      const particleSystem = new THREE.Points(particles, pMaterial);

      ParticleUtils.animateParticles(particles);

      particleSystem.rotation.y = 0;
      particleSystem.rotation.x = 0;
      particleSystem.position.y = outW > 768 ? 0 : 4;
      particleSystem.position.x = outW > 1400 ? -10 : outW > 1200 ? -8 : outW > 992 ? -5 : outW > 768 ? -2 : 0;

      scene.add(particleSystem);

      animate();

      function animate() {
        camera.position.x = particleSystem.position.x + (mouseX - camera.position.x) * 0.005;
        camera.position.y = ( - mouseY - camera.position.y ) * 0.005;
        camera.position.z = 35;

        camera.lookAt(scene.position);
        particles.verticesNeedUpdate = true;
        particleSystem.material.color = new THREE.Color(color);

        window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    }
  }
}
