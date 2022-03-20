(() => {
  let cursorScale = 1
  const lastMousePos = {
    x: 0,
    y: 0
  }
  const MathUtils = {
    lineEq: (y2, y1, x2, x1, currentVal) => {
      // y = mx + b
      const m = (y2 - y1) / (x2 - x1); const b = y1 - m * x1
      return m * currentVal + b
    },
    lerp: (a, b, n) => (1 - n) * a + n * b,
    getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
  }

  let nodeSelectors
  let cursorBounds
  let cursorLastScale = 1
  let winsize = {
    width: window.innerWidth, height: window.innerHeight
  }

  let mousepos = {
    x: winsize.width / 2,
    y: winsize.height / 2
  }

  function getMousePos (e) {
    let posx = 0
    let posy = 0
    if (!e) { e = window.event }

    if (e.pageX || e.pageY) {
      posx = e.clientX
      posy = e.clientY
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }

    return { x: posx, y: posy }
  }

  function calcWinsize () {
    winsize = {
      width: window.innerWidth, height: window.innerHeight
    }
  }

  function setNodeSelectors () {
    nodeSelectors = {
      cursor: document.querySelector('[js-cursor="cursor"]'),
      cursorContent: document.querySelector('[js-cursor="cursorContent"]'),
      hoverSections: document.querySelectorAll('[js-cursor="section"]')
    }
  }

  function mouseMoveEventHandler () {
    if (mousepos.y <= 0 || mousepos.x <= 0 || (mousepos.x >= window.innerWidth || mousepos.y >= window.innerHeight)) {
      cursorScale = 0

      nodeSelectors.cursor.style.transform = `translate(${(mousepos.x)}px, ${mousepos.y}px) scale(${cursorLastScale})`
      return
    }

    cursorScale = 1
    nodeSelectors.cursor.style.transform = `translate(${(mousepos.x)}px, ${mousepos.y}px) scale(${cursorLastScale})`
  }

  function addEventListeners () {
    window.addEventListener('resize', calcWinsize)

    window.addEventListener('mousemove', (event) => {
      setCursorBounds()
      mousepos = getMousePos(event)
      mouseMoveEventHandler()
    })

    window.addEventListener('mousedown', () => {
      cursorScale = 0.7
    })

    window.addEventListener('mouseup', () => {
      cursorScale = 1
    })

    hoverSectionsEventListeners()
  }

  function hoverSectionsEventListeners () {
    if (nodeSelectors.hoverSections.length === 0) { return }

    [...nodeSelectors.hoverSections].forEach((item) => {
      item.addEventListener('mouseover', (event) => {
        const { cursorMessage } = event.currentTarget.dataset
        nodeSelectors.cursor.classList.add('is-active')
        nodeSelectors.cursorContent.innerText = cursorMessage
      })

      item.addEventListener('mouseleave', () => {
        nodeSelectors.cursor.classList.remove('is-active')
        nodeSelectors.cursorContent.innerText = ''
      })
    })
  }

  function appendCursorToDom () {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="cursor" js-cursor="cursor">
        <div class="cursor__content" js-cursor="cursorContent"></div>
      </div>
    `)
  }

  function setCursorBounds () {
    cursorBounds = nodeSelectors.cursor.getBoundingClientRect()
  }

  function renderMouseMoveAnimation () {
    lastMousePos.x = MathUtils.lerp(lastMousePos.x, mousepos.x - cursorBounds.width / 2, 0.2)
    lastMousePos.y = MathUtils.lerp(lastMousePos.y, mousepos.y - cursorBounds.height / 2, 0.2)
    cursorLastScale = MathUtils.lerp(cursorLastScale, cursorScale, 0.15)
    nodeSelectors.cursor.style.transform = `translate(${(lastMousePos.x)}px, ${lastMousePos.y}px) scale(${cursorLastScale})`

    requestAnimationFrame(() => renderMouseMoveAnimation())
  }

  function init () {
    if ('ontouchstart' in window) {
      return
    }

    appendCursorToDom()
    setNodeSelectors()
    setCursorBounds()
    addEventListeners()
    requestAnimationFrame(() => renderMouseMoveAnimation())
  }

  init()
})()
