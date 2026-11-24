function isFramed() {
  try {
    return window.self !== window.top || Boolean(window.frameElement);
  } catch (e) {
    // Accessing window.top throws a SecurityError inside a cross-origin iframe
    return true;
  }
}

if (isFramed()) {
  window.location.replace("about:blank");
}
