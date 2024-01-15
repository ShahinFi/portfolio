function transition(transitionTime, transitionTime2, destination) {
  fetch(destination + '.html')
    .then((response) => response.text())
    .then((html) => {
      transitionMain(html)
    })
    .catch((error) => console.error('Error fetching page:', error))

  function transitionMain(html) {
    const minSpeedRows = 3
    const maxSpeedRows = 18
    const finalSpeedRows = 0.1
    let animationRows
    let keyframesRows
    let antiAliasingRows = 0

    const rowContainer = document.getElementById('row-container')
    const styleSheet = document.styleSheets[0]
    let pageBottom = window.innerHeight
    let topPosition = rowContainer.getBoundingClientRect().top

    removeTopBar()
    window['leave_' + currentLocation]()
    initializeTransitionGridAnimation()

    animationTransitionWormhole = `#wormhole {
      animation: zoomIn-wormhole ${transitionTime / 1000}s ease-in forwards;
    }`

    keyframesTransitionWormhole = `
      @keyframes zoomIn-wormhole {
  0% {
    transform: translateX(-50%) rotateZ(45deg) scale(1);
  }
  100% {
    transform: translateX(-50%) rotateZ(45deg) scale(7);
  }
  }`
    styleSheet.insertRule(animationTransitionWormhole, 2)
    styleSheet.insertRule(keyframesTransitionWormhole, 3)

    let startTime = Date.now()
    const interval = setInterval(function () {
      let speedRows =
        (maxSpeedRows - minSpeedRows) *
          ((Date.now() - startTime) / transitionTime) +
        minSpeedRows
      let durationRows = 1 / speedRows
      updateRowsMotion(durationRows)

      if (Date.now() - startTime >= transitionTime) {
        clearInterval(interval)
        startTime = Date.now()
        const interval2 = setInterval(function () {
          speedRows =
            (finalSpeedRows - maxSpeedRows) *
              ((Date.now() - startTime) / transitionTime2) +
            maxSpeedRows
          durationRows = 1 / speedRows
          updateRowsMotion(durationRows)

          if (Date.now() - startTime >= transitionTime2) {
            clearInterval(interval2)
            styleSheet.deleteRule(3)
            styleSheet.deleteRule(2)
            styleSheet.deleteRule(1)
            styleSheet.deleteRule(0)
            const stylesElement = document.getElementById('pageStyles')
            stylesElement.href = destination + '.css'
            const htmlElement = document.getElementById('pageHTML')
            htmlElement.innerHTML = html
            manageLinks(destination)
            window[destination]()
          }
        }, transitionTime2 / 20)
      }
    }, transitionTime / 20)

    function updateRowsMotion(duration) {
      const completeCyclePercent = 6.73
      const completeCyclePosition = 0.1033282286 * (pageBottom - topPosition)
      const startPosition = getTransformValues(rowContainer).translateY
      const startPositionFixed = startPosition % completeCyclePosition
      const startPercent =
        completeCyclePercent * (startPositionFixed / completeCyclePosition) +
        antiAliasingRows
      let remainingPercent =
        ((completeCyclePercent - 2 * startPercent) / completeCyclePercent) * 100
      keyframesRows = `
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
      animationRows = `#row-container {
      animation: transformMeshRows ${Math.abs(duration)}s linear infinite;
    }`

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

    function initializeTransitionGridAnimation() {
      keyframesRows = `
      @keyframes transformMeshRows {
        0% {
          transform: rotateX(60deg) rotateY(0) translateY(0px);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateY(0%);
        }
      }`
      animationRows = `#row-container {
      animation: transformMeshRows 5s linear infinite;
    }`
      styleSheet.insertRule(animationRows, 0)
      styleSheet.insertRule(keyframesRows, 1)
    }
  }
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
