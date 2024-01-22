function links() {
  const linkAbout = document.getElementById('link-about')
  const linkSkills = document.getElementById('link-skills')
  const linkPortfolio = document.getElementById('link-portfolio')
  const linkContact = document.getElementById('link-contact')

  window.homeEvent = function () {
    transitionHome(2000, 2000)
  }

  window.aboutEvent = function () {
    transition(2000, 2000, 'about')
  }

  window.skillsEvent = function () {
    transition(2000, 2000, 'skills')
  }

  window.portfolioEvent = function () {
    transition(2000, 2000, 'portfolio')
  }

  window.contactEvent = function () {
    transition(2000, 2000, 'contact')
  }

  linkAbout.addEventListener('click', aboutEvent)
  linkSkills.addEventListener('click', skillsEvent)
  linkPortfolio.addEventListener('click', portfolioEvent)
  linkContact.addEventListener('click', contactEvent)
}

function manageLinks(nextLocation) {
  const linkHome = document.getElementById('link-home')
  const linkAbout = document.getElementById('link-about')
  const linkSkills = document.getElementById('link-skills')
  const linkPortfolio = document.getElementById('link-portfolio')
  const linkContact = document.getElementById('link-contact')
  if (nextLocation == 'home') {
    linkHome.removeEventListener('click', homeEvent)
  }
  if (nextLocation == 'about') {
    linkAbout.removeEventListener('click', aboutEvent)
  }
  if (nextLocation == 'skills') {
    linkSkills.removeEventListener('click', skillsEvent)
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
  if (currentLocation == 'skills') {
    linkSkills.addEventListener('click', skillsEvent)
  }
  if (currentLocation == 'portfolio') {
    linkPortfolio.addEventListener('click', portfolioEvent)
  }
  if (currentLocation == 'contact') {
    linkContact.addEventListener('click', contactEvent)
  }
  currentLocation = nextLocation
}
