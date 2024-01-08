function portfolio() {
  setTimeout(() => {
    topBarAnimationMain()
    animateGrid()
    portfolioContainerSizes()
    document.getElementById('pageHTML').classList.add('show')
    document.getElementById('pageHTML').classList.remove('hide')
    window.addEventListener('resize', portfolioContainerSizes)
    console.log('portfolio')
  }, 100)
}

function leave_portfolio() {
  document.removeEventListener('mousemove', window.handleGridAnimation)
  const styleSheet = document.styleSheets[0]
  styleSheet.deleteRule(3)
  styleSheet.deleteRule(2)
  styleSheet.deleteRule(1)
  styleSheet.deleteRule(0)
  document.getElementById('pageHTML').classList.add('hide')
  document.getElementById('pageHTML').classList.remove('show')
  window.removeEventListener('resize', portfolioContainerSizes)
  console.log('leave portfolio')
}

function portfolioContainerSizes() {
  const portfolioContainer = document.getElementById('portfolio-container')
  const rowContainer = document.getElementById('row-container')
  const rowTop = rowContainer.getBoundingClientRect().top
  const topPosition = window.innerHeight - rowTop
  portfolioContainer.style.bottom = `${topPosition}px`
  portfolioContainer.style.top = `${120}px`

  if (window.innerWidth <= 625) {
    portfolioContainer.style.bottom = `${topPosition}px`
    portfolioContainer.style.top = `${80}px`
  }
}
