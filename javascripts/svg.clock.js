/* Clock.svg v0.1 (c) 2013 Wout Fierens - Svg.js is licensed under the terms of the MIT License */
SVG.Clock = function(size, options) {
  this.date = new Date;

  var i;
  var red = "#F8333C";
  var green = "#20BF55";
  var font = "Signika, sans-serif";

  /* create nested svg element */
  this.constructor.call(this, SVG.create('svg'));

  /* set attributes */
  this.viewbox(0, 0, 100, 100);
  this.size(size, size);

  /* create base plate */
  this.plate = this.ellipse(100, 100).fill("transparent")

  /* small bar every minute */
    for (i = 59; i >= 0; i--)
      if (i % 5 != 0)
        this.rect(1, 1).move(50, 4).fill("rgba(255,255,255,.1)").rotate(i * 6, 50, 50)
  /* bar every five minutes */
    for (i = 59; i >= 0; i--)
      this.rect(1, 3).move(50, 4).fill("rgba(255,255,255,.1)").rotate(i * 30, 50, 50)



  /* pomodoro1 */
  for (i = 149; i >= 0; i--)
    this.rect(1, 4).move(50, 0).fill(red).rotate(i * 1, 50, 50)

  /* pomodoro2 */
  for (i = 329; i >= 180; i--)
    this.rect(1, 4).move(50, 0).fill(red).rotate(i * 1, 50, 50)

  /* break1 */
  for (i = 359; i >= 330; i--)
    this.rect(1, 4).move(50, 0).fill(green).rotate(i * 1, 50, 50)

  /* break2 */
  for (i = 179; i >= 150; i--)
    this.rect(1, 4).move(50, 0).fill(green).rotate(i * 1, 50, 50)



  /* draw minute pointer */
  this.minutes = this.circle(4).move(49, 0).fill("#fff").stroke("#181A21");

  this.focusLabel = this.text('FOCUS').move(50, 25).fill(red).
    font({anchor: 'middle', size: 6, family: font, weight: '300', length: '50px'});

  this.focusTime = this.text("").move(50, 35).fill(red).
    font({anchor: 'middle', size: 24, family: font, weight: '700'});

  this.breakLabel = this.text('BREAK').move(50, 25).fill(green)
    .font({anchor: 'middle', size: 6, family: font, weight: '300'});

  this.breakTime = this.text("").move(50, 35).fill(green)
    .font({anchor: 'middle', size: 24, family: font, weight: '700'});
}

SVG.Clock.prototype = new SVG.Container

SVG.extend(SVG.Clock, {
  update: function(date) {
    this.date = date;
    this.drawMinutesPointer();
    var minutes = this.date.getMinutes();
    (minutes >= 25 && minutes <= 29) || (minutes >= 55 && minutes <= 59) ? this.drawbreakLabels() : this.drawfocusLabels();
  },

  drawMinutesPointer: function() {
    this.minutes.rotate(360 + 360 / 60 * this.date.getMinutes(), 50, 50);
  },

  drawfocusLabels: function() {
    this.focusTime.text(this.timeLeftToString());
    this.focusLabel.show();
    this.focusTime.show();
    this.breakLabel.hide();
    this.breakTime.hide();
  },

  drawbreakLabels: function() {
    this.breakTime.text(this.timeLeftToString());
    this.breakLabel.show();
    this.breakTime.show();
    this.focusLabel.hide();
    this.focusTime.hide();
  },

  timeLeftToString: function() {
    return this.formatTime(this.minutesLeft(), 59 - this.date.getSeconds());
  },

  minutesLeft: function() {
    var minutes = this.date.getMinutes();
    if (minutes < 25)
      return 24 - minutes;
    else if (minutes < 30)
      return 29 - minutes;
    else if (minutes < 55)
      return 54 - minutes;
    else
      return 59 - minutes;
  },

  formatTime: function(minutes, seconds) {
    if (minutes < 10)
      minutes = "0" + minutes;

    if (seconds < 10)
      seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }
})

// Extend SVG container
SVG.extend(SVG.Container, {
  // Add clock method
  clock: function(size) {
    return this.put(new SVG.Clock(size))
  }

})
