<template>
  <div
    class="carousel slider text-white pl-6 pb-20 lg:pl-18 lg:pb-48"
    :class="{
      'is-device': isTouchDevice,
      'is-dragging': dragging
    }"
  >
    <div class="carousel__title-container">
      <h2 class="carousel__title">
        Latest Stories
      </h2>
    </div>
    <div
      ref="wrapper"
      class="carousel__wrapper"
      js-cursor="section"
      data-cursor-message="Drag"
    >
      <div
        ref="carousel"
        class="carousel__container"
        @mousedown="handleMousedown"
        @mouseup="handleMouseup"
        @mouseleave="handleMouseleave"
        @mousemove="handleMousemove"
      >
        <div
          v-for="(slide, index) in getSlides"
          :key="slide.collection + index"
          ref="slides"
          class="carousel__card w-64 lg:w-80"
        >
          <a class="carousel__card-link">
            <div class="carousel__card-image-container">
              <img
                ref="images"
                draggable="false"
                class="carousel__card-image"
                :src="imgUrl(slide.image)"
                alt=""
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
      bounds: {},
      current: 0,
      dragEnd: 0,
      dragging: false,
      dragSpeed: 1.5,
      dragStart: 0,
      ease: 0.1,
      isTouchDevice: false,
      last: 0,
      vs: {}
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
      this.detectDeviceType()
      if (this.isTouchDevice) { return }

      this.initVScroll()
      this.handleResize()
      this.enableVScrollAndGsap()

      window.addEventListener('resize', () => {
        this.handleResize()
      })
    },
    imgUrl (image) {
      return require(`@/assets/images/CarouselSection/${image}`)
    },
    enableVScrollAndGsap () {
      this.vs.on(this.calculateCurrentSliderPosition)
      this.$gsap.ticker.add(this.render)
      this.$gsap.ticker.add(this.smoothScroll)
    },
    setWraperHeight () {
      const slideBounding = this.$refs.slides[0].getBoundingClientRect()
      this.$refs.wrapper.style.height = `${slideBounding.height}px`
    },
    detectDeviceType () {
      this.isTouchDevice = 'ontouchstart' in window
    },
    calculateCurrentSliderPosition (e) {
      this.current += e.deltaY
      this.current = Math.max((this.bounds.width - window.innerWidth) * -1, this.current)
      this.current = Math.min(0, this.current)
    },
    smoothScroll () {
      if (!this.dragging) { return }

      this.last = lerp(this.last, this.current, this.ease)
      this.$refs.carousel.style.transform = `translate3d(${this.last}px, 0, 0)`
    },
    handleResize () {
      this.setWraperHeight()

      this.bounds = this.$refs.carousel.getBoundingClientRect()
      this.last = 0
      this.current = 0
      this.$refs.carousel.style.transform = 'translate3d(0px, 0, 0)'
    },
    initVScroll () {
      this.vs = new VirtualScroll({
        el: this.$refs.carousel,
        mouseMultiplier: 0.45
      })
    },
    render () {
      const last = lerp(this.last, this.current, this.ease)
      const scrollLast = Math.abs(last)

      this.$refs.slides.forEach((item, index) => {
        const bounds = item.getBoundingClientRect()
        const inView = scrollLast + window.innerWidth >= bounds.left && scrollLast < bounds.right

        if (inView) {
          const img = this.$refs.images[index]
          const min = bounds.left - this.bounds.width
          const max = bounds.right
          const percentage = ((scrollLast - min) * 100) / (max - min)
          const newMin = -(window.innerWidth / 12) * 2
          const newMax = 0
          item.x = ((percentage - 0) / (100 - 0)) * (newMax - newMin) + newMin

          img.style.transform = `translate3d(${item.x}px, 0, 0) scale(1.45)`
        }
      })
    },
    handleMousedown (e) {
      this.dragging = true
      this.dragEnd = this.current
      this.dragStart = e.clientX
    },
    handleMouseup () {
      this.dragging = false
      this.dragEnd = this.current
    },
    handleMouseleave () {
      this.dragging = false
      this.dragEnd = this.current
    },
    handleMousemove (e) {
      if (!this.dragging) { return }

      this.current = this.dragEnd + ((e.clientX - this.dragStart) * this.dragSpeed)
      this.current = clamp(this.current, 0, this.getContainerMax())
    },
    getContainerMax () {
      const boundWidth = this.bounds.width
      const wrapperBounds = this.$refs.wrapper.getBoundingClientRect()

      return wrapperBounds.width - boundWidth
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/scss/components/CarouselSection.scss";
</style>
