<template>
  <div
    class="max-w-4xl mx-auto px-9 py-20 lg:px-20 2xl:px-0 lg:py-48 font-sans container display-section"
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
      titleString: 'Occasionally, we offer perspectives on the direct-to-consumer landscape, retail innovations, happenings aroundpact and the odd creative experiment.'
    }
  },
  mounted () {
    this.getSpansLinePosition()

    window.addEventListener('resize', this.getSpansLinePosition)
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
      })
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/scss/components/DisplaySection.scss";
</style>
