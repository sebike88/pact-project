<template>
  <div class="carousel slider container text-white max-w-4xl mx-auto px-6 py-20 lg:px-20 2xl:px-0 lg:py-48">
    <div class="carousel__title-container">
      <h2 class="carousel__title">
        Latest Stories
      </h2>
    </div>
    <div
      ref="carousel"
      class="carousel__container"
      @mousedown="handleMousedown"
      @mouseup="handleMouseup"
      @mouseleave="handleMouseleave"
      @mousemove="handleMousemove"
    >
      <div
        v-for="slide in getSlides"
        :key="slide.title"
        ref="slides"
        class="carousel__card"
      >
        <a class="carousel__card-link">
          <div class="carousel__card-image-container">
            <img
              class="carousel__card-image"
              :src="imgUrl(slide.image)"
              alt=""
              ref="images"
            >
          </div>
          <div class="carousel__card-footer">
            <span class="carousel__card-subtitle" v-text="slide.collection" />
            <span class="carousel__card-title" v-text="slide.title" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VirtualScroll from 'virtual-scroll'
import { lerp, clamp } from '~/plugins/math'

export default {
  name: 'CarouselSection',
  data () {
    return {
      vs: {},
      bounds: {},
      dragEnd: 0,
      dragStart: 0,
      current: 0,
      last: 0,
      ease: 0.1,
      dragSpeed: 1.5,
      dragging: false
    }
  },
  computed: {
    ...mapGetters([
      'getSlides'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.handleResize()
      this.setVirtualScroll()
      this.$gsap.ticker.add(this.smooth)
      this.$gsap.ticker.add(this.render)

      document.addEventListener('resize', () => {
        this.handleResize()
      })
    },
    calc (e) {
      this.current += e.deltaY
      this.current = Math.max((this.bounds.width - window.innerWidth) * -1, this.current)
      this.current = Math.min(0, this.current)
    },
    smooth () {
      this.last = lerp(this.last, this.current, this.ease)
      this.$refs.carousel.style.transform = `translate3d(${this.last}px, 0, 0)`
    },
    handleResize () {
      this.bounds = this.$refs.carousel.getBoundingClientRect()
    },
    setVirtualScroll () {
      this.vs = new VirtualScroll({
        el: this.$refs.carousel,
        mouseMultiplier: 0.45
      })
    },
    imgUrl (image) {
      return require(`@/assets/images/CarouselSection/${image}`)
    },
    render () {
      const last = lerp(this.last, this.current, this.ease)
      const scrollLast = Math.abs(last)

      this.$refs.slides.forEach((item, index) => {
        const bounds = item.getBoundingClientRect()
        const inView = scrollLast + window.innerWidth >= bounds.left && scrollLast < bounds.right

        if (inView) {
          const img = this.$refs.images[index]
          const min = bounds.left - window.innerWidth
          const max = bounds.right
          const percentage = ((scrollLast - min) * 100) / (max - min)
          const newMin = -(window.innerWidth / 12) * 3
          const newMax = 0
          item.x = ((percentage - 0) / (100 - 0)) * (newMax - newMin) + newMin

          img.style.transform = `translate3d(${item.x}px, 0, 0) scale(1.75)`
        }
      })
    },
    handleMousedown (e) {
      this.dragging = true

      this.dragEnd = this.current
      this.dragStart = e.clientX

      document.body.classList.add('is-dragging')
    },
    handleMouseup () {
      this.dragging = false
      this.dragEnd = this.current

      document.body.classList.remove('is-dragging')
    },
    handleMouseleave () {
      this.dragging = false
      this.dragEnd = this.current

      document.body.classList.remove('is-dragging')
    },
    handleMousemove (e) {
      if (!this.dragging) { return }

      this.current = this.dragEnd + ((e.clientX - this.dragStart) * this.dragSpeed)
      this.current = clamp(this.current, 0, -this.bounds.width + window.innerWidth)
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/scss/components/CarouselSection.scss";
</style>
