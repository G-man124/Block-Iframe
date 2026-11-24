# Block Iframe

This repository demonstrates several client-side JavaScript techniques to prevent other websites from embedding your site inside an `<iframe>`.

---

## JavaScript Methods

### 1. Basic Frame-Busting Redirect
Redirects the top-level window to your site's URL if framed.

```javascript
if (window.top !== window.self) {
  window.top.location = window.self.location;
}
```

### 2. CSS Hiding + Fallback Message
Hides the page content immediately via CSS until the script confirms the page is not framed. If breaking out is blocked, it displays an error message.

```html
<style id="antiClickjack">
  body { display: none !important; }
</style>

<script>
  if (self === top) {
    const antiClickjack = document.getElementById("antiClickjack");
    antiClickjack.parentNode.removeChild(antiClickjack);
  } else {
    try {
      top.location = self.location;
    } catch (e) {
      document.body.innerHTML = "<h1>Embedding this site is not allowed.</h1>";
    }
  }
</script>
```

### 3. Clear DOM and Halt Loading
Wipes the HTML document and stops the browser from loading any remaining resources.

```javascript
if (window.frameElement || window.self !== window.top) {
  document.documentElement.innerHTML = "";
  window.stop(); // Halts further page loading
}
```

### 4. Allowlist Specific Parent Origins
Checks `ancestorOrigins` to allow embedding only on trusted domains. *(Note: Supported primarily in Chromium-based browsers).*

```javascript
if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
  const allowedOrigins = ["https://your-trusted-site.com"];
  const parentOrigin = window.location.ancestorOrigins[0];

  if (!allowedOrigins.includes(parentOrigin)) {
    document.body.remove();
    alert("Unauthorized iframe embedding detected.");
  }
}
```

### 5. Cross-Origin Safe Check + Blank Redirect
Safely catches cross-origin `SecurityError` exceptions and replaces the frame content with `about:blank`.

```javascript
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
```

### 6. Freeze Execution Thread
Replaces the page content and locks the frame's JavaScript thread with an infinite loop.

```javascript
if (window.self !== window.top) {
  document.body.innerHTML = "Unauthorized embed.";
  while (true) {
    // Freezes the embedded frame's execution thread
  }
}
```
