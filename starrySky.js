function starrySky() {
  const numStars = 300
  const nightSky = document.getElementById('night-sky')

  for (let i = 0; i < numStars; i++) {
    createStar()
  }

  function createStar() {
    const star = document.createElement('div')
    star.className = 'star'
    positionStar(star)
    nightSky.appendChild(star)
  }

  function positionStar(star) {
    const screenWidth = nightSky.clientWidth
    const screenHeight = nightSky.clientHeight

    const x = Math.random() * 100
    const y = Math.random() * 100

    star.style.left = `${x}%`
    star.style.top = `${y}%`
    const size = 0.003 * window.innerWidth * Math.random()
    star.style.width = `${size}px`
    star.style.height = `${size}px`
  }
}
