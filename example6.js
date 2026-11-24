if (window.self !== window.top) {
  document.body.innerHTML = "Unauthorized embed.";
  while (true) {
    // Freezes the embedded frame's execution thread
  }
}
