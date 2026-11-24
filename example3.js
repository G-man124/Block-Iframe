if (window.frameElement || window.self !== window.top) {
  document.documentElement.innerHTML = "";
  window.stop(); // Halts further page loading
}
