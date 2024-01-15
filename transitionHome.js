const minSpeedRows = -3
const maxSpeedRows = -18
const finalSpeedRows = -0.1

async function transitionHome(transitionTimeIn, transitionTimeOut) {
  const destination = 'home'
  fetch(destination + '.html')
    .then((response) => response.text())
    .then((html) => {
      transitionMain(html, destination, transitionTimeIn, transitionTimeOut)
    })
    .catch((error) => console.error('Error fetching page:', error))
}

function transitionMain(
  html,
  destination,
  transitionTimeIn,
  transitionTimeOut
) {
  removeTopBar()
  window['leave_' + currentLocation]()
  initializeTransitionGridAnimation()
  setTimeout(() => {
    loadFiles(html, destination)
    startHomeFunctions()
    setTimeout(() => {
      startWormholeContraction(transitionTimeIn - 200)
    }, 100)
  }, 800)

  let startTime = Date.now()
  const interval_In = setInterval(function () {
    speedRowsUp(transitionTimeIn, startTime)
    if (Date.now() - startTime >= transitionTimeIn) {
      clearInterval(interval_In)
      startTime = Date.now()
      const interval_Out = setInterval(function () {
        slowRowsDown(transitionTimeOut, startTime)
        if (Date.now() - startTime >= transitionTimeOut) {
          clearInterval(interval_Out)
          deleteAllAnimationRules()
          manageLinks(destination)
          setWormholeBackground()
          topBarAnimationMain()
          animateGrid()
          parallaxWormhole(4)
        }
      }, transitionTimeOut / 20)
    }
  }, transitionTimeIn / 20)
}

function setWormholeBackground() {
  const layer0 = document.getElementById('layer0')
  const layer1 = document.getElementById('layer1')
  const layer3 = document.getElementById('layer3')
  layer0.style.backgroundImage = 'url(Images/wormhole/deepField.jpg)'
  layer1.style.backgroundImage = 'url(Images/wormhole/Layer1.png)'
  layer3.style.backgroundImage = 'url(Images/wormhole/Layer3.png)'
}

function startHomeFunctions() {
  starryWormhole(4)
  const layer0 = document.getElementById('layer0')
  const layer1 = document.getElementById('layer1')
  // const layer2 = document.getElementById('layer2')
  const layer3 = document.getElementById('layer3')
  layer0.style.backgroundImage = 'none'
  layer1.style.backgroundImage = 'none'
  // layer2.style.backgroundImage = 'none'
  layer3.style.backgroundImage = 'none'
  wormholeSizes()
  writingSizes()
  myP5 = new p5(mySketch)
  photoSizes()
  window.addEventListener('resize', wormholeSizes)
  window.addEventListener('resize', writingSizes)
  window.addEventListener('resize', photoSizes)
  console.log('home')
}

function initializeTransitionGridAnimation() {
  const styleSheet = document.styleSheets[0]
  const keyframesRows = `
      @keyframes transformMeshRows {
        0% {
          transform: rotateX(60deg) rotateY(0) translateY(0px);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateY(0%);
        }
      }`
  const animationRows = `#row-container {
      animation: transformMeshRows 5s linear infinite;
    }`
  styleSheet.insertRule(animationRows, 0)
  styleSheet.insertRule(keyframesRows, 1)
}

function removeTopBar() {
  const navbar = document.getElementById('navbar')
  if (navbar.classList.contains('active')) {
    navbar.classList.remove('active')
  }
  const topBar = document.getElementById('top-bar')
  topBar.style.transition = 'transform 1s ease'
  topBar.style.transform = 'translateY(-100%)'
}

function startWormholeContraction(transitionTime) {
  const styleSheet = document.styleSheets[0]
  animationTransitionWormhole = `#wormhole {
      animation: zoomIn-wormhole ${transitionTime / 1000}s ease-out forwards;
    }`

  keyframesTransitionWormhole = `
      @keyframes zoomIn-wormhole {
  0% {
    transform: translateX(-50%) rotateZ(45deg) scale(7);
  }
  100% {
    transform: translateX(-50%) rotateZ(45deg) scale(1);
  }
  }`
  styleSheet.insertRule(animationTransitionWormhole, 2)
  styleSheet.insertRule(keyframesTransitionWormhole, 3)
  document.getElementById('pageHTML').classList.add('show')
  document.getElementById('pageHTML').classList.remove('hide')
}

function updateRowsMotion(duration) {
  let antiAliasingRows = 0
  let pageBottom = window.innerHeight
  const rowContainer = document.getElementById('row-container')
  let topPosition = rowContainer.getBoundingClientRect().top
  const completeCyclePercent = 6.73
  const completeCyclePosition = 0.1033282286 * (pageBottom - topPosition)
  const startPosition = getTransformValues(rowContainer).translateY
  const startPositionFixed = startPosition % completeCyclePosition
  const startPercent =
    completeCyclePercent * (startPositionFixed / completeCyclePosition) +
    antiAliasingRows
  let remainingPercent =
    ((completeCyclePercent - 2 * startPercent) / completeCyclePercent) * 100
  let keyframesRows = `
      @keyframes transformMeshRows {
        0% {
          transform: rotateX(60deg) rotateY(0) translateY(${2 * startPercent}%);
        }
        ${remainingPercent - 0.00001}% {
          transform: rotateX(60deg) rotateY(0) translateY(${completeCyclePercent}%);
        }
        ${remainingPercent}% {
          transform: rotateX(60deg) rotateY(0) translateY(0%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateY(${2 * startPercent}%);
        }
      }`
  if (remainingPercent <= 0.00001 || remainingPercent >= 100 - 0.00001) {
    keyframesRows = `
      @keyframes transformMeshRows {
        0% {
          transform: rotateX(60deg) rotateY(0) translateY(0%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateY(${completeCyclePercent}%);
        }
      }`
  }
  if (duration < 0) {
    remainingPercent = ((2 * startPercent) / completeCyclePercent) * 100
    keyframesRows = `
      @keyframes transformMeshRows {
        0% {
          transform: rotateX(60deg) rotateY(0) translateY(${2 * startPercent}%);
        }
        ${remainingPercent - 0.00001}% {
          transform: rotateX(60deg) rotateY(0) translateY(0%);
        }
        ${remainingPercent}% {
          transform: rotateX(60deg) rotateY(0) translateY(${completeCyclePercent}%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateY(${2 * startPercent}%);
        }
      }`
    if (remainingPercent <= 0.00001 || remainingPercent >= 100 - 0.00001) {
      keyframesRows = `
      @keyframes transformMeshRows {
        0% {
          transform: rotateX(60deg) rotateY(0) translateY(${completeCyclePercent}%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateY(0%);
        }
      }`
    }
  }
  const animationRows = `#row-container {
      animation: transformMeshRows ${Math.abs(duration)}s linear infinite;
    }`
  const styleSheet = document.styleSheets[0]
  styleSheet.deleteRule(1)
  styleSheet.deleteRule(0)
  styleSheet.insertRule(animationRows, 0)
  styleSheet.insertRule(keyframesRows, 1)
  rowContainer.style.animation = 'none'
  void rowContainer.offsetHeight
  rowContainer.style.animation = null
  antiAliasingRows = 0.1 / duration
}

function getTransformValues(element) {
  const style = window.getComputedStyle(element)
  const matrix = new DOMMatrix(style.transform)
  const translateX = matrix.m41
  const translateY = matrix.m42
  const rotateX = Math.asin(-matrix.m23)
  const rotateY = Math.atan2(matrix.m13, matrix.m33)
  const rotateZ = Math.atan2(matrix.m21, matrix.m22)
  return { translateX, translateY, rotateX, rotateY, rotateZ }
}

function loadFiles(html, destination) {
  const stylesElement = document.getElementById('pageStyles')
  stylesElement.href = destination + '.css'
  const htmlElement = document.getElementById('pageHTML')
  htmlElement.innerHTML = html
}

function deleteAllAnimationRules() {
  const styleSheet = document.styleSheets[0]
  styleSheet.deleteRule(3)
  styleSheet.deleteRule(2)
  styleSheet.deleteRule(1)
  styleSheet.deleteRule(0)
}

function speedRowsUp(transitionTimeIn, startTime) {
  let speedRows =
    (maxSpeedRows - minSpeedRows) *
      ((Date.now() - startTime) / transitionTimeIn) +
    minSpeedRows
  let durationRows = 1 / speedRows
  updateRowsMotion(durationRows)
}

function slowRowsDown(transitionTimeOut, startTime) {
  speedRows =
    (finalSpeedRows - maxSpeedRows) *
      ((Date.now() - startTime) / transitionTimeOut) +
    maxSpeedRows
  durationRows = 1 / speedRows
  updateRowsMotion(durationRows)
}
