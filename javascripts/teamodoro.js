Teamodoro = {
  timeDifference: 0,

  start: function() {
    this.clock = SVG("canvas").clock("100%");
    setInterval(this.updateClock.bind(this), 5000);
  },

  updateClock: function() {
    this.clock.setMinutes(this.getMinutes());
  },

  timeCallback: function(response) {
    this.timeDifference = new Date - new Date(response.datetime);
  },

  getMinutes: function() {
    return new Date(new Date() + this.timeDifference).getMinutes();
  }
}
