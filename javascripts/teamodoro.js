Teamodoro = {
  timeDifference: 0,

  start: function() {
    this.clock = SVG("canvas").clock("100%");
    this.updateClock();
    this.displayRandomGifWhileInBreak();
    setInterval(this.updateClock.bind(this), 500);
    setInterval(this.displayRandomGifWhileInBreak.bind(this), 30 * 1000);

    document.getElementById('about').addEventListener('click',function() {
      document.getElementById('why').style.display = 'block';
    });
    document.getElementById('close').addEventListener('click',function() {
      document.getElementById('why').style.display = 'none';
    });
  },

  updateClock: function() {
    this.clock.update(this.getDate());
  },

  timeCallback: function(response) {
    this.timeDifference = new Date - new Date(response.datetime);
  },

  getMinutes: function() {
    return new Date(new Date() + this.timeDifference).getSeconds();
  },

  getDate: function() {
    return new Date(new Date() + this.timeDifference);
  },

  displayRandomGif: function() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=fail", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var gifUrl = JSON.parse(request.responseText).data.image_url;
        document.getElementById("break-gif").style["background-image"] = "URL(" + gifUrl+ ")";
        document.getElementById("break-gif").style.display = "block";
      }
    };
    request.send();
  },

  displayRandomGifWhileInBreak: function() {
    this.inBreak() ? this.displayRandomGif() : document.getElementById("break-gif").style.display = "none";
  },

  inBreak: function() {
    var minutes = this.getDate().getMinutes();
    return (minutes >= 20 && minutes <= 29) || (minutes >= 55 && minutes <= 59);
  },
}
