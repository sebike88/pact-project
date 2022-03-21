<template>
  <div class="text-banner__container max-w-4xl mx-auto px-6 pb-20 lg:px-18 lg:pb-48 container">
    <div class="text-banner lg:grid content-center px-6 py-12 lg:grid-cols-2 lg:gap-10 lg:p-14 xl:pl-18 2xl:py-36 2xl:px-20 2xl:grid-cols-12">
      <div class="text-banner__title-container pb-5 md:pb-0 2xl:col-span-6">
        <h2
          class="text-banner__title display"
          v-text="getBannerContent.title"
        />
      </div>
      <div class="text-banner__content-container lg:pr-14 xl:pr-18 2xl:pr-0 2xl:col-span-4 2xl:col-start-8">
        <p
          class="text-banner__content body mb-4: lg:mb-8"
          v-text="getBannerContent.content"
        />
        <a
          class="button text-banner__cta"
          :href="getBannerContent.cta.url"
        >
          <span v-text="getBannerContent.cta.text" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'TextBannerSection',
  computed: {
    ...mapGetters([
      'getBannerContent'
    ])
  }
}
</script>
<style lang="scss">
@import "~/assets/scss/components/TextBannerSection.scss";
</style>
