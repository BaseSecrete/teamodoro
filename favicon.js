// Favicon.js - Change favicon dynamically [http://ajaxify.com/run/favicon].
// Copyright (c) 2006 Michael Mahemoff. Only works in Firefox and Opera.
// Background and MIT License notice at end of file, see the homepage for more.

favicon = {

  // -- "PUBLIC" ----------------------------------------------------------------

  defaultPause: 2000,

  change: function(iconURL, optionalDocTitle) {
    clearTimeout(this.loopTimer);
    if (optionalDocTitle) {
      document.title = optionalDocTitle;
    }
    this.addLink(iconURL, true);
  },

  animate: function(iconSequence, optionalDelay) {
    this.preloadIcons(iconSequence);
    this.iconSequence = iconSequence;
    this.sequencePause = (optionalDelay) ?  optionalDelay : this.defaultPause;
    favicon.index = 0;
    favicon.change(iconSequence[0]);
    this.loopTimer = setInterval(function() {
      favicon.index = (favicon.index+1) % favicon.iconSequence.length;
      favicon.addLink(favicon.iconSequence[favicon.index], false);
    }, favicon.sequencePause);
  },

  // -- "PRIVATE" ---------------------------------------------------------------

  loopTimer: null,

  preloadIcons: function(iconSequence) {
    var dummyImageForPreloading = document.createElement("img");
    for (var i=0; i<iconSequence.length; i++) {
      dummyImageForPreloading.src = iconSequence[i];
    }
  },

  addLink: function(iconURL) {
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = iconURL;
    this.removeLinkIfExists();
    this.docHead.appendChild(link);
  },

  removeLinkIfExists: function() {
    var links = this.docHead.getElementsByTagName("link");
    for (var i=0; i<links.length; i++) {
      var link = links[i];
      if (link.type=="image/x-icon" && link.rel=="shortcut icon") {
        this.docHead.removeChild(link);
        return; // Assuming only one match at most.
      }
    }
  },

  docHead:document.getElementsByTagName("head")[0]
};
