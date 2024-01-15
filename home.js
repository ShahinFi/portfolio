function home() {
  setTimeout(() => {
    topBarAnimationMain()
    animateGrid()
    starryWormhole(4)
    parallaxWormhole(4)
    wormholeSizes()
    writingSizes()
    myP5 = new p5(mySketch)
    photoSizes()
    window.addEventListener('resize', wormholeSizes)
    window.addEventListener('resize', writingSizes)
    window.addEventListener('resize', photoSizes)
    document.getElementById('pageHTML').classList.add('show')
    document.getElementById('pageHTML').classList.remove('hide')
  }, 100)
  console.log('home')
}

function leave_home() {
  const layer0 = document.getElementById('layer0')
  const layer1 = document.getElementById('layer1')
  // const layer2 = document.getElementById('layer2')
  const layer3 = document.getElementById('layer3')
  layer0.style.backgroundImage = 'none'
  layer1.style.backgroundImage = 'none'
  // layer2.style.backgroundImage = 'none'
  layer3.style.backgroundImage = 'none'
  document.removeEventListener('mousemove', window.handleWormholeAnimation)
  window.removeEventListener('resize', wormholeSizes)
  window.removeEventListener('resize', writingSizes)
  window.removeEventListener('resize', photoSizes)
  document.removeEventListener('mousemove', window.handleGridAnimation)
  const styleSheet = document.styleSheets[0]
  styleSheet.deleteRule(3)
  styleSheet.deleteRule(2)
  styleSheet.deleteRule(1)
  styleSheet.deleteRule(0)
  myP5.remove()
  setTimeout(() => {
    document.getElementById('pageHTML').classList.add('hide')
    document.getElementById('pageHTML').classList.remove('show')
  }, 1500)
  console.log('leave home')
}

function starryWormhole(numLayers) {
  const numStarsRate = 200
  let layers = []
  const wormhole = document.getElementById('wormhole-content')

  for (let j = 0; j < numLayers; j++) {
    layers[j] = document.createElement('div')
    layers[j].id = `layer${j}`
    layers[j].style.position = 'absolute'
    layers[j].style.width = '130%'
    layers[j].style.height = '130%'
    layers[j].style.zIndex = `${j}`
    // if (j < numLayers - 1) {
    //   for (let i = 0; i < numStarsRate * (numLayers - 1 * j); i++) {
    //     createStar(layers[j], j)
    //   }
    // }
    wormhole.appendChild(layers[j])
  }

  function createStar(nightSky, layerNum) {
    const star = document.createElement('div')
    star.className = 'wormhole-star'
    positionStar(star, layerNum)
    nightSky.appendChild(star)
  }

  function positionStar(star, layerNum) {
    const x = Math.random() * 130
    const y = Math.random() * 130
    star.style.left = `${x}%`
    star.style.top = `${y}%`
    const size = 0.2 * layerNum * Math.random()
    star.style.width = `${size}px`
    star.style.height = `${size}px`
  }
}

function parallaxWormhole(numberOfChildren) {
  const wormhole = document.getElementById('wormhole-content')
  const wormholeContainerBase = document.getElementById(
    'wormhole-container-base'
  )
  let moveFlag = 0

  window.handleWormholeAnimation = function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
    if (moveFlag == 1) {
      moveFlag = 0
      main()
    }
  }

  document.addEventListener('mousemove', window.handleWormholeAnimation)

  var interval = setInterval(function () {
    moveFlag = 1
  }, 20)

  function main() {
    for (let j = 0; j < numberOfChildren + 1; j++) {
      const moveAmountFrameX = 1.5 * (numberOfChildren + 1)
      const moveAmountFrameY = 2.5 * (numberOfChildren + 1)
      const moveRatioXFrame =
        ((mouseX - window.innerWidth / 2) / window.innerWidth) *
        moveAmountFrameX
      const moveRatioYFrame =
        ((mouseY - window.innerHeight / 2) / window.innerHeight) *
        moveAmountFrameY

      const moveAmountX = (window.innerWidth / 220) * (numberOfChildren - j)
      const moveAmountY = (window.innerHeight / 240) * (numberOfChildren - j)
      const moveRatioX =
        -((mouseX - window.innerWidth / 2) / window.innerWidth) * moveAmountX
      const moveRatioY =
        -((mouseY - window.innerHeight / 2) / window.innerHeight) * moveAmountY

      if (j < numberOfChildren) {
        let moveTransform = `translateX(${
          0.707 * moveRatioX + 0.707 * moveRatioY
        }%) translateY(${0.707 * moveRatioY - 0.707 * moveRatioX}%)`
        const container = document.getElementById(`layer${j}`)
        container.style.transform = moveTransform
      }
      if (j >= numberOfChildren) {
        moveTransform = `translateX(${moveRatioXFrame}%) translateY(${moveRatioYFrame}%)`
        wormholeContainerBase.style.transform = moveTransform
      }
    }
  }
}

function wormholeSizes() {
  const wormhole = document.getElementById('wormhole')
  const rowContainer = document.getElementById('row-container')
  const rowTop = rowContainer.getBoundingClientRect().top
  const topPosition = window.innerHeight - rowTop
  const wormholeHeight = wormhole.getBoundingClientRect().height
  wormhole.style.bottom = `${
    topPosition + 0.14 * wormholeHeight - 0.35 * wormholeHeight
  }px`
}

function writingSizes() {
  const writing = document.getElementById('writing')
  const rowContainer = document.getElementById('row-container')
  const rowTop = rowContainer.getBoundingClientRect().top
  const topPosition = window.innerHeight - rowTop
  writing.style.bottom = `${topPosition}px`
}

function photoSizes() {
  const photo = document.getElementById('photo')
  const rowContainer = document.getElementById('row-container')
  const rowTop = rowContainer.getBoundingClientRect().top
  const topPosition = window.innerHeight - rowTop
  photo.style.bottom = `${topPosition}px`
  photo.style.top = `${110}px`

  if (window.innerWidth <= 625) {
    photo.style.bottom = `${topPosition}px`
    photo.style.top = `${80}px`
  }

  if (window.innerWidth <= 470) {
    const wormhole = document.getElementById('wormhole')
    const wormholeHeight = wormhole.getBoundingClientRect().height
    photo.style.bottom = `${topPosition + 0.66 * wormholeHeight}px`
    const description = document.getElementById('description')
    const descriptionBottom = description.getBoundingClientRect().bottom
    photo.style.top = `${1.07 * descriptionBottom}px`
  }
}
