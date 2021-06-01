Teamodoro = {
  lastState: null,
  lastMinute: null,
  timeDifference: 0,

  start: function() {
    this.clock = SVG("canvas").clock("100%");
    this.updateClock();
    setInterval(this.updateClock.bind(this), 500);
    setInterval(this.displayRandomGif.bind(this), 30 * 1000);

    if (this.inBreak())
      this.displayRandomGif();

    document.getElementById('about').addEventListener('click',function() {
      document.getElementById('why').style.display = 'block';
    });
    document.getElementById('close').addEventListener('click',function() {
      document.getElementById('why').style.display = 'none';
    });
  },

  updateClock: function() {
    this.updateIcon();
    this.beepOnStateChange();
    this.clock.update(this.getDate());
    this.displayRandomGifWhileInBreak();
    this.lastState = this.inBreak() ? "break" : "focus";
  },

  timeCallback: function(response) {
    this.timeDifference = new Date() - new Date(response.datetime);
  },

  getMinutes: function() {
    return new Date(new Date() + this.timeDifference).getSeconds();
  },

  getDate: function() {
    return new Date((new Date()).valueOf() + this.timeDifference);
  },

  displayRandomGif: function() {
    if (!this.inBreak())
      return;

    var request = new XMLHttpRequest();
    request.open("GET", "https://api.giphy.com/v1/gifs/random?api_key=l41lOAgtfPWzS35sY&tag=relax&rate=g", true);

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
    document.getElementById("break-gif").style.display = this.inBreak() ? "block" : "none";
  },

  inBreak: function() {
    var minutes = this.getDate().getMinutes();
    return (minutes >= 25 && minutes <= 29) || (minutes >= 55 && minutes <= 59);
  },

  beepOnStateChange: function() {
    if (this.inBreak() && this.lastState == "focus")
      document.getElementById("beep").play();
    else if (!this.inBreak() && this.lastState == "break")
      document.getElementById("beep").play();
  },

  updateIcon: function() {
    var minutesLeft = this.clock.minutesLeft() + 1;
    if (this.lastMinute != minutesLeft) {
      var path = "/images/countdown/";
      path += this.inBreak() ? "break/" : "focus/";
      favicon.change(path + minutesLeft + ".png");
      this.lastMinute = minutesLeft;
    }
  },
};
