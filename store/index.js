export const state = () => ({
  displayContent: 'Occasionally, we offer perspectives on the direct-to-consumer landscape, retail innovations, happenings around pact and the odd creative experiment.',
  slides: [
    {
      image: '51156e95f300f1e879f858ed0ff37e2d.jpeg',
      collection: 'Category',
      title: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.'
    },
    {
      image: 'd6e415f2f5a22b532358696fdebb6ffb.jpeg',
      collection: 'Category',
      title: 'Praesent commodo cursus magna, vel scelerisque'
    },
    {
      image: 'd5d629bdffe29cba956072e79edb5f3b.jpeg',
      collection: 'Category',
      title: 'Praesent commodo cursus magna, vel scelerisque'
    },
    {
      image: '5a70824943cad2432278b6fae4d65967.jpeg',
      collection: 'Category',
      title: 'Praesent commodo cursus magna, vel scelerisque'
    }
  ]
})

export const getters = {
  getSlides: (state) => {
    return state.slides
  }
}
