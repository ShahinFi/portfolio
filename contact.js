function contact() {
  setTimeout(() => {
    topBarAnimationMain()
    animateGrid()
    contactContainerSizes()
    document.getElementById('pageHTML').classList.add('show')
    document.getElementById('pageHTML').classList.remove('hide')
    window.addEventListener('resize', contactContainerSizes)
    console.log('contact')
  }, 100)
}

function leave_contact() {
  document.removeEventListener('mousemove', window.handleGridAnimation)
  const styleSheet = document.styleSheets[0]
  styleSheet.deleteRule(3)
  styleSheet.deleteRule(2)
  styleSheet.deleteRule(1)
  styleSheet.deleteRule(0)
  document.getElementById('pageHTML').classList.add('hide')
  document.getElementById('pageHTML').classList.remove('show')
  window.removeEventListener('resize', contactContainerSizes)
  console.log('leave contact')
}

function contactContainerSizes() {
  const contactContainer = document.getElementById('contact-container')
  const rowContainer = document.getElementById('row-container')
  const rowTop = rowContainer.getBoundingClientRect().top
  const topPosition = window.innerHeight - rowTop
  contactContainer.style.bottom = `${topPosition}px`
  contactContainer.style.top = `${120}px`

  if (window.innerWidth <= 625) {
    contactContainer.style.bottom = `${topPosition}px`
    contactContainer.style.top = `${80}px`
  }
}
