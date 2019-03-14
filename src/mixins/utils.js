import bus from '../bus';
import {GeometryUtils} from './three';
import {TweenMax, Linear, Power4, TweenLite, Sine} from 'gsap/TweenMax';
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
            normalSpeed = (defaultAnimationSpeed/200),
            fullSpeed = (morphAnimationSpeed/100),
            animationVars = {
              speed: normalSpeed,
              rotation: -45
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
          createVertices(texts[idx].particles, texts[idx].points);
          enableTrigger(trigger, idx);
        });
      });

      for (let p = 0; p < particleCount; p++) {
        const vertex = new THREE.Vector3();

        vertex.x = 0;
        vertex.y = 0;
        vertex.z = 0;
        particles.vertices.push(vertex);
      }

      const particleSystem = new THREE.Points(particles, pMaterial);

      scene.add(particleSystem);

      animate();

      function createVertices (emptyArray, points) {
        for (let p = 0; p < particleCount; p++) {
          const vertex = new THREE.Vector3();

          vertex.x = points[p]['x'];
          vertex.y = points[p]['y'];
          vertex.z = points[p]['z'];
          emptyArray.vertices.push(vertex);
        }
      }

      function enableTrigger(trigger, idx) {
        bus.$on("animateServicesParticles", index => {
          morphTo(texts[index].particles);
        });

        if (idx === 0) {
          morphTo(texts[idx].particles);
        }
      }

      function animate() {
        particleSystem.rotation.y += animationVars.speed;
        particles.verticesNeedUpdate = true;
        particleSystem.material.color = new THREE.Color(color);

        window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      function morphTo(newParticles) {
        TweenMax.to(animationVars, .1, {
          ease: Power4.easeIn,
          speed: fullSpeed,
          onComplete: slowDown
        });

        TweenMax.to(animationVars, 0, {
          ease: Linear.easeNone
        });

        particles.vertices.forEach((point, i) => {
          TweenMax.to(point, 2.5, {
            ease: Power4.easeInOut,
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
          })
        });
      }

      function slowDown () {
        TweenMax.to(animationVars, 0.3, {ease:
          Power2.easeOut, speed: normalSpeed, delay: 0
        });
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
        normalSpeed = (defaultAnimationSpeed/300),
        fullSpeed = (morphAnimationSpeed/100),
        animationVars = {
          speed: normalSpeed,
          rotation: -45
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
        createVertices(text.particles, text.points);
        morphTo(text.particles);
      });

      for (let p = 0; p < particleCount; p++) {
        const vertex = new THREE.Vector3();

        vertex.x = 0;
        vertex.y = 0;
        vertex.z = 0;
        particles.vertices.push(vertex);
      }

      const particleSystem = new THREE.Points(particles, pMaterial);

      scene.add(particleSystem);

      animate();

      function createVertices (emptyArray, points) {
        for (let p = 0; p < particleCount; p++) {
          const vertex = new THREE.Vector3();

          vertex.x = points[p]['x'];
          vertex.y = points[p]['y'];
          vertex.z = points[p]['z'];
          emptyArray.vertices.push(vertex);
        }
      }

      function animate() {
        particleSystem.rotation.y -= animationVars.speed;
        particles.verticesNeedUpdate = true;
        particleSystem.material.color = new THREE.Color(color);

        window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      function morphTo (newParticles) {
        TweenMax.to(animationVars, .1, {
          ease: Power4.easeIn,
          speed: fullSpeed,
          onComplete: slowDown
        });

        TweenMax.to(animationVars, 2, {
          ease: Linear.easeNone
        });

        particles.vertices.forEach((point, i) => {
          TweenMax.to(point, 2, {
            ease: Elastic.easeOut.config( 0.1, .3),
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
          })
        });
      }

      function slowDown () {
        TweenMax.to(animationVars, 0.3, {ease:
          Power2.easeOut, speed: normalSpeed, delay: 0.2
        });
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
            normalSpeed = (defaultAnimationSpeed/300),
            fullSpeed = (morphAnimationSpeed/100),
            animationVars = {
              speed: normalSpeed,
              rotation: -45
            },
            canvasHeight = window.innerHeight;

      // three.js options
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-hero'), alpha : true}),
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

      // mouse move animation
      const raycaster = new THREE.Raycaster(),
            mouse = new THREE.Vector2();

      let mouseX = 0, mouseY = 0;

      const windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2,
        maxOffset = 8,
        minTime = 2.5,
        maxTime = 4.5;

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
        createVertices(text.particles, text.points);
        morphTo(text.particles);
      });

      for (let p = 0; p < particleCount; p++) {
        const vertex = new THREE.Vector3();

        vertex.x = 0;
        vertex.y = 0;
        vertex.z = 0;
        particles.vertices.push(vertex);
      }

      if (!is_touch_device()) {
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
                x: random(point.x - maxOffset / 2, point.x + maxOffset / 2),
                y: random(point.y - maxOffset / 2, point.y + maxOffset / 2),
                ease: Sine.easeInOut,
                onComplete
              });

              function onComplete() {
                TweenMax.to(point, 1.5, {
                  x: startX,
                  y: startY,
                  ease: Power2.easeOut,
                  speed: normalSpeed,
                  delay: 0.1
                });
              }
            })
          }
        });
      }

      function animateParticles(particles) {
        particles.vertices.forEach((particle) => {
          animateXY().progress(Math.random());

          function animateXY() {
            return TweenLite.to(particle, random(minTime, maxTime), {
              x: random(particle.x - maxOffset, particle.x + maxOffset),
              y: random(particle.y - maxOffset, particle.y + maxOffset),
              ease: Sine.easeInOut,
              onComplete: animateXY
            });
          }
        });
      }

      const particleSystem = new THREE.Points(particles, pMaterial);

      animateParticles(particles);

      particleSystem.rotation.y = 0;
      particleSystem.rotation.x = 0;
      particleSystem.position.y = outW > 768 ? 0 : 4;
      particleSystem.position.x = outW > 1400 ? -10 : outW > 1200 ? -8 : outW > 992 ? -5 : outW > 768 ? -2 : 0;

      scene.add(particleSystem);

      animate();

      function random(min, max) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }
        return min + (max - min) * Math.random();
      }

      function is_touch_device() {
        return (('ontouchstart' in window)
          || (navigator.MaxTouchPoints > 0)
          || (navigator.msMaxTouchPoints > 0));
      }

      function createVertices (emptyArray, points) {
        for (let p = 0; p < particleCount; p++) {
          const vertex = new THREE.Vector3();

          vertex.x = points[p]['x'];
          vertex.y = points[p]['y'];
          vertex.z = points[p]['z'];
          emptyArray.vertices.push(vertex);
        }
      }

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

      function morphTo (newParticles) {
        TweenMax.to(animationVars, .1, {
          ease: Power4.easeIn,
          speed: fullSpeed,
          onComplete: slowDown
        });

        TweenMax.to(animationVars, 2, {
          ease: Linear.easeNone
        });

        particles.vertices.forEach((point, i) => {
          TweenMax.to(point, 2, {
            ease: Elastic.easeOut.config( 0.1, .3),
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
          })
        });

        TweenMax.to(animationVars, 2, {
          ease: Elastic.easeOut.config( 0.1, .3),
          rotation: animationVars.rotation === 45 ? -45 : 45,
        });
      }

      function slowDown () {
        TweenMax.to(animationVars, 0.3, {ease:
          Power2.easeOut, speed: normalSpeed, delay: 0.2
        });
      }
    }
  }
}
