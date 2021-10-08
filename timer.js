class Timer {
  constructor(hourInput, minuteInput, secondInput, playBtn, resetBtn, callbacks) {
    // storing the html element into some timer properties
    this.hourInput = hourInput;
    this.minuteInput = minuteInput;
    this.secondInput = secondInput;
    this.playBtn = playBtn;
    this.resetBtn = resetBtn;

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.currentSecond = 0;
    this.totalDuration = 0;

    this.displayHour = 0;
    this.displayMin = 0;
    this.displaySecond = 0;
    this.started = false;
    this.intervalId = null;

    this.hasEntered = false;

    // storing all the inputs into an array
    this.inputs = [this.hourInput, this.minuteInput, this.secondInput];

    // checking the 'callbacks' object is empty or not
    if (callbacks) {
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onReset = callbacks.onReset;
    }

    // event listeners
    this.inputs.forEach((input) => {
      
      input.addEventListener("change", () => {
        this.hours = isNaN(parseInt(this.hourInput.value)) ? 0 : parseInt(this.hourInput.value * 3600);
        this.minutes = isNaN(parseInt(this.minuteInput.value)) ? 0 : parseInt(this.minuteInput.value * 60);
        this.seconds =  isNaN(parseInt(this.secondInput.value)) ? 0 : parseInt(this.secondInput.value); 

        this.currentSecond = parseInt(this.hours + this.minutes + this.seconds);
      });
    });

    this.playBtn.addEventListener("click", this.checkIfPlay);
    document.addEventListener('keydown', (e) => {
      if (e.code === "Space") {
        this.checkIfPlay();
      }
    })
    this.resetBtn.addEventListener('click', this.resetTimer);
  }
  checkIfPlay = () => {
    if (this.playBtn.classList.contains("fa-play")) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  };

  startTimer = () => {
    this.playBtn.classList.replace("fa-play", "fa-pause");
    this.totalDuration = this.timeSum();

    if (!this.hourInput.value.length || !this.minuteInput.value.length || !this.secondInput.value.length) {
      alert("pls the numbers and make sure you enter all the inputs");
      this.playBtn.classList.replace('fa-pause', 'fa-play');
      return;
    }
    
    if (!this.started) {
        this.isRunning = false;
        this.tickTimer();
        this.intervalId = setInterval(this.tickTimer, 50);
        this.started = true;
        this.inputs.forEach(input => input.disabled = true);
    }
  };

  tickTimer = () => {
    this.isRunning = true;
      this.displayHour = parseInt(Math.floor(this.currentSecond / 3600));
      this.displayMin = parseInt(Math.floor(this.currentSecond / 60) % 60);
      this.displaySecond = parseInt(Math.floor(this.currentSecond % 60));
    
      if (this.displayHour < 0 && this.displayMin < 0 && this.displaySecond < 0) {
        this.pauseTimer();
        this.onComplete();
        return;
      }

      this.hourInput.value = this.displayHour;
      this.minuteInput.value = this.displayMin;
      this.secondInput.value = this.displaySecond;

      this.onTick();
      this.currentSecond = (this.currentSecond - 0.05).toFixed(2);
  }

  pauseTimer = () => {
    if (this.started) {
        this.playBtn.classList.replace("fa-pause", "fa-play");
        clearInterval(this.intervalId);
        this.started = false;
        this.inputs.forEach((input) => (input.disabled = false));
    }
  };

  resetTimer = () => {
       this.displayHour = parseInt(Math.floor(this.totalDuration / 3600));
       this.displayMin = parseInt(Math.floor(this.totalDuration / 60) % 60);
       this.displaySecond = parseInt(Math.floor(this.totalDuration % 60));

       this.hourInput.value = this.displayHour;
       this.minuteInput.value = this.displayMin;
       this.secondInput.value =this.displaySecond;

      this.currentSecond = this.totalDuration;
      document.querySelector('circle').setAttribute('stroke-dashoffset', 0);
      document.querySelector('circle').style.transition = 'stroke-dashoffset 0.3s linear';
      this.onReset();
      this.pauseTimer();
  }

  timeSum() {
    return this.minutes + this.seconds + this.hours;
  }
} 

