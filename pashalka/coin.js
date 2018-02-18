/**
 * @constructor
 * @src  {string} - img src
 * @timer {integer} (seconds) - timer for end animations
 * @speed {integer} - speed falling coins
 */


export class FallingCoins {
    constructor(src, timer, speed) {
        this.el = document.querySelector('body')
        this.src = src
        this.coins = []
        this.timer = (timer || 2) * 1000
        this.speed = speed || 10
        this.step = (this.timer / 10) |0 ;
    }
    createCanvas() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.canvas.id = 'fallingCoins'
    }
    createCoin() {
        this.coin = new Image()
        this.coin.src = this.src

    }
    run() {
        const self = this

        this.createCanvas()
        this.createCoin()
        this.coin.onload = function() {
            self.el.appendChild(self.canvas)
            self.drawLoop()
        }
    }
    drawStop() {
        return  this.step > ((window.innerHeight / this.speed) +2) ? false : true
    }
    drawLoop() {
        const self = this
        this.interval = setInterval(() => {
            self.step--
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
            if(self.step === 0) {
                clearInterval(self.interval)
                self.remove()
            }
            if (Math.random() > .3 && !self.drawStop() ) {
                self.coins.push({
                    x: Math.random() * self.canvas.width | 0,
                    y: -50,
                    dy: self.speed ,
                    s: Math.random() +0.4,
                    state: Math.random() * 10
                })
            }
            self.coins.forEach((val, i) => {
                const x = self.coins[i].x
                const y = self.coins[i].y
                const s = self.coins[i].s
                const state = self.coins[i].state
                self.coins[i].state = (state > 25) ? 0 : state + 0.1
                self.coins[i].y += self.coins[i].dy
                self.ctx.drawImage(self.coin, 78 * Math.floor(state), 0, 78, 78, x, y, (78 * s) / window.devicePixelRatio, (78 * s) / window.devicePixelRatio)

                if (y > self.canvas.height) self.coins.splice(i, 1);
            })
        },  10)

    }

    remove() {
        this.canvas.parentNode.removeChild(this.canvas)
    }
}