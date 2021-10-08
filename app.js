// selecting the html elements
const hourInput = document.querySelector("#hour");
const minuteInput = document.querySelector("#minute");
const secondInput = document.querySelector("#second");
const playBtn = document.querySelector(".play-btn");
const resetBtn = document.querySelector(".reset-btn");
const circle = document.querySelector('circle');
const circleTotalLength = Math.floor(circle.getTotalLength());
const alarm = document.querySelector('audio');

circle.setAttribute('stroke-dasharray', circleTotalLength);

const timer = new Timer(hourInput, minuteInput, secondInput, playBtn, resetBtn, {
    onTick() {
        circle.setAttribute('stroke-dashoffset', Math.floor(circleTotalLength * timer.currentSecond / timer.totalDuration - circleTotalLength));
        if (circle.getAttribute("stroke-dashoffset") == -circleTotalLength) {
          circle.setAttribute("stroke-dashoffset", 0);
          circle.style.transition = "stroke-dashoffset 1s linear";
        }
    },
    onComplete() {
      alarm.play();
    },
    onReset() {
      alarm.pause();
    }
});
circle.addEventListener('transitionend', () => {
    console.log('the transition ends for now');
})


