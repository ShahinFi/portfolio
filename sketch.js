let mySketch = function (p) {
  let shine
  let average
  let w
  let h

  p.preload = function () {
    shine = p.loadImage('Images/photo40.png')
  }

  p.setup = function () {
    const size = returnSize()
    let cnv = p.createCanvas(size, size)
    cnv.parent('canvas-container')
    cnv.id('canvas')

    p.frameRate(10)
    p.background(0, 0)
    w = p.width / shine.width
    h = p.height / shine.height
    shine.loadPixels()
  }

  p.draw = function () {
    p.clear()
    for (let i = 0; i < shine.width; i++) {
      for (let j = 0; j < shine.height; j++) {
        const pixelIndex = (i + j * shine.width) * 4
        const r = shine.pixels[pixelIndex]
        const g = shine.pixels[pixelIndex + 1]
        const b = shine.pixels[pixelIndex + 2]
        average = (r + g + b) / 3
        p.noStroke()
        if (average <= 200) {
          p.fill(0, 230, 149)
          p.textSize((p.width / 24) * (1 - average / 230))
          let number = Math.floor(10 * Math.random())
          p.textAlign(p.CENTER, p.CENTER)
          p.text(`${number}`, i * w + 0.5 * w, j * h + 0.5 * h, w)
        }
      }
    }
  }

  p.windowResized = function () {
    const size = returnSize()
    p.resizeCanvas(size, size)
    w = p.width / shine.width
    h = p.height / shine.height
  }

  function returnSize() {
    const photo = document.getElementById('photo')
    const photoWidth = photo.getBoundingClientRect().width
    const photoHeight = photo.getBoundingClientRect().height
    if (window.innerWidth > 740) {
      return Math.min(photoWidth, 0.7 * photoHeight)
    }
    return Math.min(photoWidth, photoHeight)
  }
}
