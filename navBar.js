function topBarAnimation() {
  window.addEventListener('resize', topBarAnimationMain)
  topBarAnimationMain()
  const menuToggle = document.getElementById('menu-toggle')
  const navbar = document.getElementById('navbar')

  menuToggle.addEventListener('click', function () {
    navbar.classList.toggle('active')
  })
}

function topBarAnimationMain() {
  const topBar = document.getElementById('top-bar')
  const navLinks = document.querySelectorAll('.nav-a')
  let currentScrollPos = window.scrollY
  topBar.style.transform = 'translateY(-100%)'
  topBar.offsetHeight
  topBar.style.transition = 'transform 1s ease'
  topBar.style.transform = 'translateY(20%)'
  topBar.classList.remove('with-shadow')
  navLinks.forEach(function (navLink) {
    navLink.style.backgroundColor = '#011826'
  })
  if (window.innerWidth <= 625) {
    topBar.style.transform = 'translateY(0%)'
  }
  if (window.innerWidth > 625) {
    if (currentScrollPos > 35) {
      topBar.style.backgroundColor = 'transparent'
      topBar.style.backdropFilter = 'blur(5px)'
      topBar.style.transform = 'translateY(0%)'
      topBar.classList.add('with-shadow')
      navLinks.forEach(function (navLink) {
        navLink.style.backgroundColor = 'transparent'
      })
    }
    let prevScrollPos = window.scrollY
    window.onscroll = function () {
      topBar.style.transition = 'transform 0.3s ease'
      let currentScrollPos = window.scrollY
      if (currentScrollPos > 35) {
        topBar.classList.add('with-shadow')
        topBar.style.backgroundColor = 'transparent'
        topBar.style.backdropFilter = 'blur(5px)'
        navLinks.forEach(function (navLink) {
          navLink.style.backgroundColor = 'transparent'
        })
        if (prevScrollPos > currentScrollPos) {
          topBar.style.transform = 'translateY(0%)'
        }
        if (prevScrollPos < currentScrollPos) {
          topBar.style.transform = 'translateY(-100%)'
        }
      }
      if (currentScrollPos <= 30) {
        topBar.style.backgroundColor = 'transparent'
        topBar.style.backdropFilter = 'blur(0px)'
        topBar.style.transform = 'translateY(20%)'
        topBar.classList.remove('with-shadow')
        navLinks.forEach(function (navLink) {
          navLink.style.backgroundColor = '#011826'
        })
      }
      prevScrollPos = currentScrollPos
    }
  }
}
