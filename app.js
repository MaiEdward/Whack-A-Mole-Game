const cursor = document.querySelector('.cursor')
const holes = document.querySelectorAll('.hole')
const timeLeft = document.querySelector('.time-left span')
const scoreEl = document.querySelector('.score span')


let currentTime = 60
let score = 0
let mole_hole 
let bomb_hole


function run() {
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    mole_hole = i

    if (i != bomb_hole) {
        const img = document.createElement('img')
        img.classList.add('mole')
        img.src = 'assets/mole.png'

        img.addEventListener('click', () => {
        score += 10
        scoreEl.textContent = score
        img.src = 'assets/mole-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
        })

        hole.appendChild(img)

        timer = setTimeout(() => {
            hole.removeChild(img)
            mole_hole = null
            run()
        }, 1500)
    } else {
        run()
    }
}
run()

function bomb(){
    const j = Math.floor(Math.random() * holes.length)
    const hole = holes[j]
    bomb_hole = j


    if ( j != mole_hole) {
        const img = document.createElement('img')
        img.classList.add('bomb')
        img.src = 'assets/bomb.png'

    img.addEventListener('click', () => {
        alert('UH OH! GAME OVER! Your final score is ' + score)
        score = 0
        currentTime = 60
        timeLeft.textContent = currentTime
        scoreEl.textContent = score
    })

    hole.appendChild(img)


    bombtimer = setTimeout(() => {
        hole.removeChild(img)
        bomb()
    }, 1600)

    } else {
        bomb()
    }

}
bomb()


function countdown() {
    currentTime --
    timeLeft.textContent = currentTime
    if (currentTime == 0) {
        alert('GAME OVER! Your final score is ' + score)
        score = 0
        currentTime = 60
        timeLeft.textContent = currentTime
        scoreEl.textContent = score
    }
}

let countDownTimer = setInterval(countdown, 1000)
countdown()




window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})