function skills() {
  setTimeout(() => {
    topBarAnimationMain()
    animateGrid()
    skillsContainerSizes()
    setHexagonAllSizes()
    document.getElementById('pageHTML').classList.add('show')
    document.getElementById('pageHTML').classList.remove('hide')
    window.addEventListener('resize', skillsContainerSizes)
    window.addEventListener('resize', setHexagonAllSizes)
    console.log('skills')
  }, 100)
}

function leave_skills() {
  document.removeEventListener('mousemove', window.handleGridAnimation)
  const styleSheet = document.styleSheets[0]
  styleSheet.deleteRule(3)
  styleSheet.deleteRule(2)
  styleSheet.deleteRule(1)
  styleSheet.deleteRule(0)
  document.getElementById('pageHTML').classList.add('hide')
  document.getElementById('pageHTML').classList.remove('show')
  window.removeEventListener('resize', skillsContainerSizes)
  window.removeEventListener('resize', setHexagonAllSizes)
  console.log('leave skills')
}

function skillsContainerSizes() {
  const skillsContainerBase = document.getElementById('skills-container-base')
  const rowContainer = document.getElementById('row-container')
  const skillsContainer = document.getElementById('skills-container')
  const rowTop = rowContainer.getBoundingClientRect().top
  const topPosition = window.innerHeight - rowTop
  skillsContainerBase.style.bottom = `${topPosition}px`
  skillsContainerBase.style.top = `${120}px`
  const skillsContainerBaseWidth =
    skillsContainerBase.getBoundingClientRect().width
  const skillsContainerBaseHeight =
    skillsContainerBase.getBoundingClientRect().height
  skillsContainer.style.width = `${Math.min(
    skillsContainerBaseWidth / 1,
    1.4 * skillsContainerBaseHeight
  )}px`
  skillsContainer.style.height = `${Math.min(
    skillsContainerBaseWidth / 1,
    1.4 * skillsContainerBaseHeight
  )}px`

  if (window.innerWidth <= 625) {
    skillsContainerBase.style.bottom = `${topPosition}px`
    skillsContainerBase.style.top = `${80}px`
  }
}

function setHexagonAllSizes() {
  const margin = 0.06 //ratio
  const gap = 0.03 //ratio
  const MaxHexagonNumbersInARow = 4
  const { hexagonWidth, hexagonHeight, gapInPixels } = hexagonSizes(
    margin,
    gap,
    MaxHexagonNumbersInARow
  )
  let hexagonNumbersInRow = 4
  let numberOfTheRow = 1
  hexagonAreasSizes(
    gapInPixels,
    hexagonWidth,
    hexagonHeight,
    hexagonNumbersInRow,
    numberOfTheRow
  )
  hexagonNumbersInRow = 3
  numberOfTheRow = 2
  hexagonAreasSizes(
    gapInPixels,
    hexagonWidth,
    hexagonHeight,
    hexagonNumbersInRow,
    numberOfTheRow
  )
  hexagonNumbersInRow = 2
  numberOfTheRow = 3
  hexagonAreasSizes(
    gapInPixels,
    hexagonWidth,
    hexagonHeight,
    hexagonNumbersInRow,
    numberOfTheRow
  )
}

function hexagonAreasSizes(
  gapInPixels,
  hexagonWidth,
  hexagonHeight,
  hexagonNumbersInRow,
  numberOfTheRow
) {
  const rowContainer = document.getElementById(`hexagonArea${numberOfTheRow}`)
  const rowContainerWidth =
    hexagonNumbersInRow * hexagonWidth + (hexagonNumbersInRow - 1) * gapInPixels
  const rowContainerHeight = hexagonHeight
  rowContainer.style.width = `${rowContainerWidth}px`
  rowContainer.style.height = `${rowContainerHeight}px`
}

function hexagonSizes(margin, gap, MaxHexagonNumbersInARow) {
  const skillsContainer = document.getElementById('skills-container')
  const skillsContainerWidth = skillsContainer.getBoundingClientRect().width
  const rowContainerWidth = (1 - 2 * margin) * skillsContainerWidth
  const gapInPixels = gap * rowContainerWidth
  const hexagonWidth =
    (rowContainerWidth - (MaxHexagonNumbersInARow - 1) * gapInPixels) /
    MaxHexagonNumbersInARow
  const hexagonHeight = (2 / Math.sqrt(3)) * hexagonWidth
  const hexagons = document.getElementsByClassName('hexagon')
  for (
    let hexagonCounter = 0;
    hexagonCounter < hexagons.length;
    hexagonCounter++
  ) {
    const hexagon = hexagons[hexagonCounter]
    hexagon.style.width = `${hexagonWidth}px`
    hexagon.style.height = `${hexagonHeight}px`
  }
  return { hexagonWidth, hexagonHeight, gapInPixels }
}
