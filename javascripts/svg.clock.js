/* Clock.svg v0.1 (c) 2013 Wout Fierens - Svg.js is licensed under the terms of the MIT License */
SVG.Clock = function(size, options) {
  var i, settings
  
  /* set defaults */
  settings = {
    plate:    'transparent'
  , marks:    'rgba(255,255,255,.1)'
  , pomodoro: '#EF2B59'
  , breakcol: '#9FD356'
  , label:    '#342E37'
  , minutes:  '#fff'
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
  this.plate = this.ellipse(100, 100)
    .fill(settings.plate)

  /* bar every five minutes */
  for (i = 59; i >= 0; i--)
    this.rect(1, 3)
      .move(50, 3)
      .fill(settings.marks)
      .rotate(i * 30, 50, 50)

  /* small bar every minute */
  for (i = 59; i >= 0; i--)
    if (i % 5 != 0)
      this.rect(1, 1)
        .move(50, 3)
        .fill(settings.marks)
        .rotate(i * 6, 50, 50)
        
  /* pomodoro1 */
  for (i = 149; i >= 0; i--)
    this.rect(1, 3)
      .move(50.5, 0)
      .fill(settings.pomodoro)
      .rotate(i * 1, 50, 50)
          
  /* pomodoro2 */
  for (i = 329; i >= 180; i--)
    this.rect(1, 3)
      .move(50.5, 0)
      .fill(settings.pomodoro)
      .rotate(i * 1, 50, 50)  
  
  /* break1 */
  for (i = 359; i >= 330; i--)
    this.rect(1, 3)
      .move(50.5, 0)
      .fill(settings.breakcol)
      .rotate(i * 1, 50, 50)
  
  /* break2 */
  for (i = 179; i >= 150; i--)
    this.rect(1, 3)
      .move(50.5, 0)
      .fill(settings.breakcol)
      .rotate(i * 1, 50, 50)
      
/* add Focus label */
var focuslabel = this.focuslabel = this.text('Focus')
  .move(50, 20)
  .fill(settings.pomodoro)
  .font({
    anchor: 'middle'
  , size:   6
  , family: 'Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
  , weight: '300'
  })
  
var focustime =  this.focustime = this.text('23:28')
  .move(50, 38)
  .fill(settings.pomodoro)
  .font({
    anchor: 'middle'
    , size:   18
  , family: 'Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
  , weight: '300'
  })


/* add Focus label */
var breaklabel = this.breaklabel = this.text('Break')
  .move(50, 20)
  .fill(settings.breakcol)
  .font({
    anchor: 'middle'
  , size:   6
  , family: 'Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
  , weight: '300'
  })
  
var breaktime =  this.breaktime = this.text('02:18')
  .move(50, 38)
  .fill(settings.breakcol)
  .font({
    anchor: 'middle'
    , size:   18
  , family: 'Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
  , weight: '300'
  })
  
  /* add clock label */
  var label = this.label = this.text('minutes left')
    .move(50, 70)
    .fill(settings.label)
    .font({
      anchor: 'middle'
    , size:   6
    , family: 'Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
    , weight: '300'
    })
  
  /* draw minute pointer */
  this.minutes = this.circle(3)
    .move(49,0)
    .fill(settings.minutes)
  
  /* set pointers without animation */
  this.update(0)
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
  }
  // Update time
, update: function(duration) {
    /* get current time */
    var time = new Date()
    
    /* ensure duration */
    if (duration == null)
      duration = 300
    
    /* set all pointers */
    this
      .setMinutes(time.getMinutes(), duration)
    return this
  }
  // Set minute
, setMinutes: function(minutes, duration) {
    if (minutes == this.time.minutes)
      return this
    
    /* store minutes */
    this.time.minutes = minutes
    
    /* register a full circle */
    if (minutes == 0)
      this.full.minutes++
    
    /* calculate rotation */
    var deg = this.full.minutes * 360 + 360 / 60 * minutes
    
    /* animate if duration is given */
    if (duration)
      this.minutes
        .rotate(deg, 50, 50)
    else
      this.minutes
        .rotate(deg, 50, 50)
    
    return this
  }
  
})

// Extend SVG container
SVG.extend(SVG.Container, {
  // Add clock method 
  clock: function(size) {
    return this.put(new SVG.Clock(size))
  }
  
})
