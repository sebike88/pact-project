<template>
  <div
    class="max-w-4xl mx-auto px-6 py-20 lg:px-20 2xl:px-0 lg:py-48 container display-section"
  >
    <h1 class="display-section__title display">
      <span
        v-for="word in splitTitleWords()"
        :key="word"
        ref="word"
        v-text="`${word} `"
      />
    </h1>
  </div>
</template>

<script>
export default {
  name: 'DisplaySection',
  data () {
    return {
      titleString: 'Occasionally, we offer perspectives on the direct-to-consumer landscape, retail innovations, happenings around pact and the odd creative experiment.'
    }
  },
  mounted () {
    this.getSpansLinePosition()
  },
  methods: {
    splitTitleWords () {
      return this.titleString.split(' ')
    },
    getSpansLinePosition () {
      let line = 0
      let wordTopOffset = 0

      this.$refs.word.forEach((word) => {
        const { offsetTop } = word

        if (wordTopOffset !== offsetTop) {
          wordTopOffset = offsetTop
          line += 1
        }

        word.removeAttribute('class')
        word.classList.add(`display-section__title-line-${line}`)
        this.onAnimationEnd(word)
      })
    },
    onAnimationEnd (element) {
      element.addEventListener('transitionend', () => {
        element.classList.add('display-section__title-animated')
      })
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/scss/components/DisplaySection.scss";
</style>
