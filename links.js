function links() {
  const linkAbout = document.getElementById('link-about')
  const linkPortfolio = document.getElementById('link-portfolio')
  const linkContact = document.getElementById('link-contact')

  window.contactEvent = function () {
    transition(2000, 2000, 'contact')
  }

  window.portfolioEvent = function () {
    transition(2000, 2000, 'portfolio')
  }

  window.aboutEvent = function () {
    transition(2000, 2000, 'about')
  }

  window.homeEvent = function () {
    transitionHome(2000, 2000)
  }
  linkContact.addEventListener('click', contactEvent)
  linkPortfolio.addEventListener('click', portfolioEvent)
  linkAbout.addEventListener('click', aboutEvent)
}

function manageLinks(nextLocation) {
  const linkAbout = document.getElementById('link-about')
  const linkPortfolio = document.getElementById('link-portfolio')
  const linkContact = document.getElementById('link-contact')
  const linkHome = document.getElementById('link-home')
  if (nextLocation == 'home') {
    linkHome.removeEventListener('click', homeEvent)
  }
  if (nextLocation == 'about') {
    linkAbout.removeEventListener('click', aboutEvent)
  }
  if (nextLocation == 'portfolio') {
    linkPortfolio.removeEventListener('click', portfolioEvent)
  }
  if (nextLocation == 'contact') {
    linkContact.removeEventListener('click', contactEvent)
  }
  if (currentLocation == 'home') {
    linkHome.addEventListener('click', homeEvent)
  }
  if (currentLocation == 'about') {
    linkAbout.addEventListener('click', aboutEvent)
  }
  if (currentLocation == 'portfolio') {
    linkPortfolio.addEventListener('click', portfolioEvent)
  }
  if (currentLocation == 'contact') {
    linkContact.addEventListener('click', contactEvent)
  }
  currentLocation = nextLocation
}
