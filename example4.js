if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
  const allowedOrigins = ["https://your-trusted-site.com"];
  const parentOrigin = window.location.ancestorOrigins[0];

  if (!allowedOrigins.includes(parentOrigin)) {
    document.body.remove();
    alert("Unauthorized iframe embedding detected.");
  }
}
