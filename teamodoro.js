Teamodoro = {
  pomodoroDuration: 25,
  breakDuration: 5,
  
  // For each hour:
  //  00-25 -> Pomodoro
  //  25-30 -> Break
  //  30-55 -> Pomodoro
  //  55-00 -> Break
  
  start: function() {
    this.countdown = new this.Countdown();
    var minutes = (new Date()).getMinutes() % 30;
    
    if (minutes < this.pomodoroDuration)
      this.startPomodoro(minutes);
    else
      this.startBreak(minutes - this.pomodoroDuration);
  },
  
  startPomodoro: function(offset) {
    this.isPomodoro = true;
    this.countdown.reset(this.pomodoroDuration - (offset || 0), this.refreshPomodoro.bind(Teamodoro));
    $('.pomodoro.countdown').removeClass('hidden');
    $('.break.countdown').addClass('hidden');
  },
  
  startBreak: function(offset) {
    this.isPomodoro = false;
    this.countdown.reset(this.breakDuration - (offset || 0), this.refreshBreak.bind(Teamodoro));
    $('.pomodoro.countdown').addClass('hidden');
    $('.break.countdown').removeClass('hidden');
  },
  
  refreshPomodoro: function(countdown) {
    this.refreshIcon();
    if (countdown.value > 0)
      $('.pomodoro.countdown var')[0].textContent = countdown.value.toString();
    else
      this.startBreak();
  },
  
  refreshBreak: function(countdown) {
    this.refreshIcon();
    if (countdown.value > 0)
      $('.break.countdown var')[0].textContent = countdown.value.toString();
    else
      this.startPomodoro();
  },

  refreshIcon: function() {
    var path = 'images/countdown/'
    path += this.isPomodoro ? 'pomodoro/' : 'break/';
    favicon.change(path + this.countdown.value.toString() + '.png');
  },

  Countdown: function(duration, callback) {
    this.duration = duration;
    this.callback = callback;
    
    this.start = function() {
      this.value = this.duration;
      this.callback(this);
      this.delayDecrement();
    },
    
    this.reset = function(duration, callback) {
      this.duration = duration;
      this.callback = callback;
      this.start();
    }
    
    this.decrement = function() {
      if (--this.value > 0 )
        this.delayDecrement();
      this.callback(this);
    }
    
    this.delayDecrement = function() {
      setTimeout(function(countdown) { countdown.decrement(); }, 1000 * 60, this);
    }
  }
}

$(document).ready(function () { Teamodoro.start(); });
