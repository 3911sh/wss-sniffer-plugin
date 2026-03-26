(function() {
  const OriginalWebSocket = window.WebSocket;

  window.WebSocket = function(url, protocols) {
    const ws = new OriginalWebSocket(url, protocols);

    console.log("[WSS OPEN]", url);

    ws.addEventListener("message", function(event) {
      try {
        console.log("[WSS IN]", JSON.parse(event.data));
      } catch (e) {
        console.log("[WSS IN RAW]", event.data);
      }
    });

    const originalSend = ws.send;
    ws.send = function(data) {
      try {
        console.log("[WSS OUT]", JSON.parse(data));
      } catch (e) {
        console.log("[WSS OUT RAW]", data);
      }
      return originalSend.apply(this, arguments);
    };

    return ws;
  };

  console.log("installed");
})();