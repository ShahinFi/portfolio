function about() {
  setTimeout(() => {
    topBarAnimationMain()
    animateGrid()
    aboutContainerSizes()
    // fontSizes()
    document.getElementById('pageHTML').classList.add('show')
    document.getElementById('pageHTML').classList.remove('hide')
    window.addEventListener('resize', aboutContainerSizes)
    // window.addEventListener('resize', fontSizes)
    console.log('about')
  }, 100)
}

function leave_about() {
  document.removeEventListener('mousemove', window.handleGridAnimation)
  const styleSheet = document.styleSheets[0]
  styleSheet.deleteRule(3)
  styleSheet.deleteRule(2)
  styleSheet.deleteRule(1)
  styleSheet.deleteRule(0)
  document.getElementById('pageHTML').classList.add('hide')
  document.getElementById('pageHTML').classList.remove('show')
  window.removeEventListener('resize', aboutContainerSizes)
  // window.removeEventListener('resize', fontSizes)
  console.log('leave about')
}

function aboutContainerSizes() {
  const aboutContainer = document.getElementById('about-container')
  const rowContainer = document.getElementById('row-container')
  const rowTop = rowContainer.getBoundingClientRect().top
  const topPosition = window.innerHeight - rowTop
  aboutContainer.style.bottom = `${topPosition}px`
  aboutContainer.style.top = `${120}px`

  if (window.innerWidth <= 625) {
    aboutContainer.style.bottom = `${topPosition}px`
    aboutContainer.style.top = `${80}px`
  }
}

// function fontSizes() {
//   const aboutMeContainer = document.getElementById('about-me-container')
//   const aboutMeContainerWidth = aboutMeContainer.getBoundingClientRect().width
//   const aboutMeContainerHeight = aboutMeContainer.getBoundingClientRect().height
//   aboutMeContainer.style.fontSize = `${
//     6.6 +
//     0.000024 *
//       Math.pow(aboutMeContainerWidth, 1) *
//       Math.pow(aboutMeContainerHeight, 1)
//   }px`
// }
