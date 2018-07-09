const hestia = (function() {
  let loaded = false;

  function hestiaSetup(socket) {
    socket.on('player-joined', function(name) {
      joinedApp(name);
    });

    socket.on('player-left', function(name) {
      leftApp(name);
    });

    socket.on('data-app-server', function(eventName, args) {
      executeApp(eventName, args);
    });
  }

  function setupAppWindow() {
    window.addEventListener(
      'message',
      function(event) {
        if (event.origin.indexOf('http://localhost:5000') === -1) {
          return;
        }

        if (event.data.type === 'emit') {
          var eventName = event.data.eventName;
          var args = event.data.args;
          socket.emit('dataApp', eventName, args);
        }
      },
      false
    );
  }

  function executeApp(eventName, args) {
    const appBox = document.getElementById('app-box');
    appBox.contentWindow.postMessage(
      {
        type: 'on',
        eventName: eventName,
        args: args
      },
      '*'
    );
  }

  function joinedApp(name) {
    const appBox = document.getElementById('app-box');
    appBox.contentWindow.postMessage(
      {
        type: 'joined',
        args: name
      },
      '*'
    );
  }

  function leftApp(name) {
    const appBox = document.getElementById('app-box');
    appBox.contentWindow.postMessage(
      {
        type: 'left',
        args: name
      },
      '*'
    );
  }

  return function(socket, appDiv) {
    hestiaSetup(socket);
    if (!loaded) {
      loaded = true;

      const appBox = document.createElement('iframe');
      appDiv.appendChild(appBox);
      setupAppWindow();
    }
  };
})();
