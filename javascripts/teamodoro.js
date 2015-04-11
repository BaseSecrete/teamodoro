Teamodoro = {
  start: function() {
    SVG("canvas").clock("100%").start();
  },

  timeCallback: function(response) {
    this.timeDifference = new Date - new Date(response.datetime);
  }
}
