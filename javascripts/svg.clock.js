/* Clock.svg v0.1 (c) 2013 Wout Fierens - Svg.js is licensed under the terms of the MIT License */
SVG.Clock = function(size, options) {
  var i, settings

  /* set defaults */
  settings = {
    plate:    'transparent',
    marks:    'rgba(255,255,255,.1)',
    pomodoro: '#EF2B59',
    breakcol: '#9FD356',
    label:    '#342E37',
    minutes:  '#fff',
    font: 'Helvetcia Neue, Helvetcia, Arial',
  }

  /* merge options */
  options = options || {}
  for (i in options)
    settings[i] = options[i]

  /* store full rotations */
  this.full = {
    minutes:  0
  }

  /* store current time */
  this.time = {
    minutes:  0
  }

  /* create nested svg element */
  this.constructor.call(this, SVG.create('svg'))

  /* set attributes */
  this.viewbox(0, 0, 100, 100)
  this.size(size, size)

  /* create base plate */
  this.plate = this.ellipse(100, 100).fill(settings.plate)

  /* bar every five minutes */
  for (i = 59; i >= 0; i--)
    this.rect(1, 3).move(50, 3).fill(settings.marks).rotate(i * 30, 50, 50)

  /* small bar every minute */
  for (i = 59; i >= 0; i--)
    if (i % 5 != 0)
      this.rect(1, 1).move(50, 3).fill(settings.marks).rotate(i * 6, 50, 50)

  /* pomodoro1 */
  for (i = 149; i >= 0; i--)
    this.rect(1, 3).move(50.5, 0).fill(settings.pomodoro).rotate(i * 1, 50, 50)

  /* pomodoro2 */
  for (i = 329; i >= 180; i--)
    this.rect(1, 3).move(50.5, 0).fill(settings.pomodoro).rotate(i * 1, 50, 50)

  /* break1 */
  for (i = 359; i >= 330; i--)
    this.rect(1, 3).move(50.5, 0).fill(settings.breakcol).rotate(i * 1, 50, 50)

  /* break2 */
  for (i = 179; i >= 150; i--)
    this.rect(1, 3).move(50.5, 0).fill(settings.breakcol).rotate(i * 1, 50, 50)

  this.focuslabel = this.text('Focus').move(50, 20).fill(settings.pomodoro).
    font({anchor: 'middle', size: 6, family: 'Helvetcia Neue, Helvetcia, Arial', weight: '300'})

  this.focustime = this.text('23:28').move(50, 38).fill(settings.pomodoro)
    .font({anchor: 'middle', size: 18, family: 'Helvetcia Neue, Helvetcia, Arial', weight: '300'})

  this.breaklabel = this.text('Break').move(50, 20).fill(settings.breakcol)
    .font({anchor: 'middle', size: 6, family: 'Helvetcia Neue, Helvetcia, Arial', weight: '300'});

  this.breaktime = this.text('02:18').move(50, 38).fill(settings.breakcol)
    .font({anchor: 'middle', size:   18, family: 'Helvetcia Neue, Helvetcia, Arial', weight: '300'});

  this.label = this.text('minutes left').move(50, 70).fill(settings.label)
    .font({anchor: 'middle', size: 6, family: 'Helvetcia Neue, Helvetcia, Arial', weight: '300'});

  /* draw minute pointer */
  this.minutes = this.circle(3).move(49,0).fill(settings.minutes);
}

SVG.Clock.prototype = new SVG.Container

// Add time management methods to clock
SVG.extend(SVG.Clock, {
  // Start ticking
  start: function() {
    var self = this

    setInterval(function() {
      self.update()
    }, 1000)

    return this
  },

  update: function(date) {
    this.setMinutes(date.getMinutes());
    return this;
  },

  setMinutes: function(minutes) {
    var deg = this.full.minutes * 360 + 360 / 60 * minutes
    this.minutes.rotate(deg, 50, 50);

    if ((minutes >= 25 && minutes <= 29) || (minutes >= 55 && minutes <= 59))
      this.drawBreakLabels();
    else
      this.drawFocusLabels();
    return this;
  },

  drawFocusLabels: function() {
    this.breaklabel.hide();
    this.breaktime.hide();
    this.focustime.show();
    this.focuslabel.show();
  },

  drawBreakLabels: function() {
    this.breaklabel.show();
    this.breaktime.show();
    this.focustime.hide();
    this.focuslabel.hide();
  }
})

// Extend SVG container
SVG.extend(SVG.Container, {
  // Add clock method
  clock: function(size) {
    return this.put(new SVG.Clock(size))
  }

})
