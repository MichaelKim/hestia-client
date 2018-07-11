const hestia = (function() {
  let loaded = false;
  let appBox;

  function hestiaSetup(socket) {
    socket.on('player-joined', name => {
      joinedApp(name);
    });

    socket.on('player-left', name => {
      leftApp(name);
    });

    socket.on('app-joined', path => {
      appBox.style.display = 'block';
      setApp(path);
    });

    socket.on('app-left', () => {
      appBox.style.display = 'none';
      setApp('#');
    });

    socket.on('data-app-server', (eventName, args) => {
      executeApp(eventName, args);
    });
  }

  function setupAppWindow() {
    window.addEventListener(
      'message',
      event => {
        // TODO: Make event origin dynamic
        // if (event.origin.indexOf('http://localhost:5000') === -1) {
        //   return;
        // }

        if (event.data.type === 'emit') {
          const eventName = event.data.eventName;
          const args = event.data.args;
          socket.emit('dataApp', eventName, args);
        }
      },
      false
    );
  }

  function executeApp(eventName, args) {
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
    appBox.contentWindow.postMessage(
      {
        type: 'joined',
        args: name
      },
      '*'
    );
  }

  function leftApp(name) {
    appBox.contentWindow.postMessage(
      {
        type: 'left',
        args: name
      },
      '*'
    );
  }

  function setApp(appPath) {
    appBox.src = appPath;
  }

  return function(socket, appDiv) {
    hestiaSetup(socket);
    if (!loaded) {
      loaded = true;

      appBox = document.createElement('iframe');
      appBox.style.width = '100vw';
      appBox.style.height = '100vh';
      appBox.style.border = 'none';
      appBox.style.display = 'none';
      appBox.style.position = 'fixed';
      appDiv.appendChild(appBox);
      setupAppWindow();
    }
  };
})();
