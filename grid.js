function drawGrid() {
  const numColumns = 39
  const numRows = 15
  const columnContainer = document.getElementById('column-container')
  for (let i = 0; i < numColumns; i++) {
    const column = document.createElement('div')
    column.classList.add('mesh-column')
    columnContainer.appendChild(column)
  }
  const rowContainer = document.getElementById('row-container')
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('div')
    row.classList.add('mesh-row')
    rowContainer.appendChild(row)
  }
}

function animateGrid() {
  const minSpeedRows = 0.1
  const minSpeedColumns = 0.1
  const maxSpeedRows = 8
  const maxSpeedColumns = 4
  let animationColumns
  let animationRows
  let keyframesRows
  let keyframesColumns
  let antiAliasingRows = 0
  let antiAliasingColumns = 0
  const intervalsTime = 100
  const rowContainer = document.getElementById('row-container')
  const columnContainer = document.getElementById('column-container')
  const styleSheet = document.styleSheets[0]
  let mouseX = 0
  let mouseY = 0
  let moveFlag = 0
  let pageBottom = window.innerHeight
  let pageRight = window.innerWidth
  let topPosition = rowContainer.getBoundingClientRect().top
  window.addEventListener('resize', handleResize)
  function handleResize() {
    pageBottom = window.innerHeight
    pageRight = window.innerWidth
    topPosition = rowContainer.getBoundingClientRect().top
  }
  initializeAnimations()

  window.handleGridAnimation = function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
    if (moveFlag == 1) {
      moveFlag = 0
      main()
    }
  }

  document.addEventListener('mousemove', window.handleGridAnimation)

  var interval = setInterval(function () {
    moveFlag = 1
  }, intervalsTime)

  function main() {
    if (mouseY >= topPosition) {
      const speedColumns =
        (maxSpeedColumns - minSpeedColumns) *
          ((mouseX - pageRight / 2) / (pageRight / 2)) +
        minSpeedColumns

      const speedRows =
        (maxSpeedRows - minSpeedRows) *
          ((mouseY - (topPosition + pageBottom) / 2) /
            ((pageBottom - topPosition) / 2)) +
        minSpeedRows

      const durationColumns = 1 / speedColumns
      const durationRows = 1 / speedRows

      updateRowsMotion(durationRows)
      updateColumnsMotion(durationColumns)
    }

    if (mouseY < topPosition) {
      rowContainer.style.animationPlayState = 'paused'
      columnContainer.style.animationPlayState = 'paused'
    }
  }

  function initializeAnimations() {
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

    keyframesColumns = `
      @keyframes transformMeshColumns {
        0% {
          transform: rotateX(60deg) rotateY(0) translateX(0px);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateX(0%);
        }
      }`
    animationColumns = `#column-container {
      animation: transformMeshColumns 5s linear infinite;
    }`
    styleSheet.insertRule(animationColumns, 2)
    styleSheet.insertRule(keyframesColumns, 3)
    console.log('Grid Animation Initialized')
  }

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

  function updateColumnsMotion(duration) {
    const completeCyclePercent = 5.1
    const completeCyclePosition = (2 * (completeCyclePercent * pageRight)) / 100
    const startPosition = getTransformValues(columnContainer).translateX
    const startPositionFixed = startPosition % completeCyclePosition
    const startPercent =
      completeCyclePercent * (startPositionFixed / completeCyclePosition) +
      antiAliasingColumns
    let remainingPercent =
      ((completeCyclePercent - 1 * startPercent) / completeCyclePercent) * 100
    keyframesColumns = `
      @keyframes transformMeshColumns {
        0% {
          transform: rotateX(60deg) rotateY(0) translateX(${1 * startPercent}%);
        }
        ${remainingPercent - 0.00001}% {
          transform: rotateX(60deg) rotateY(0) translateX(${completeCyclePercent}%);
        }
        ${remainingPercent}% {
          transform: rotateX(60deg) rotateY(0) translateX(0%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateX(${1 * startPercent}%);
        }
      }`
    if (remainingPercent <= 0.00001 || remainingPercent >= 100 - 0.00001) {
      keyframesColumns = `
      @keyframes transformMeshColumns {
        0% {
          transform: rotateX(60deg) rotateY(0) translateX(0%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateX(${completeCyclePercent}%);
        }
      }`
    }
    if (duration < 0) {
      remainingPercent = (startPercent / completeCyclePercent) * 100
      keyframesColumns = `
      @keyframes transformMeshColumns {
        0% {
          transform: rotateX(60deg) rotateY(0) translateX(${1 * startPercent}%);
        }
        ${remainingPercent - 0.00001}% {
          transform: rotateX(60deg) rotateY(0) translateX(0%);
        }
        ${remainingPercent}% {
          transform: rotateX(60deg) rotateY(0) translateX(${completeCyclePercent}%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateX(${1 * startPercent}%);
        }
      }`
      if (remainingPercent <= 0.00001 || remainingPercent >= 100 - 0.00001) {
        keyframesColumns = `
      @keyframes transformMeshColumns {
        0% {
          transform: rotateX(60deg) rotateY(0) translateX(${completeCyclePercent}%);
        }
        100% {
          transform: rotateX(60deg) rotateY(0) translateX(0%);
        }
      }`
      }
    }
    animationColumns = `#column-container {
      animation: transformMeshColumns ${Math.abs(duration)}s linear infinite;
    }`

    styleSheet.deleteRule(3)
    styleSheet.deleteRule(2)
    styleSheet.insertRule(animationColumns, 2)
    styleSheet.insertRule(keyframesColumns, 3)

    columnContainer.style.animation = 'none'
    void columnContainer.offsetHeight
    columnContainer.style.animation = null

    antiAliasingColumns = 0.1 / duration
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
}
