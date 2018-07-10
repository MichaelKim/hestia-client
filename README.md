# hestia.io-client

This is the client library of [Hestia.io](https://github.com/LenKagamine/Hestia).

## Usage

The client library consists of two files

- `hestia.js` (`index.js`): Communicate with Hestia server
  - The client of the Hestia server must include this file
- `appHeader.js`: Communicate with server app
  - The client-side app must include this file

Both files are served automatically by Hestia as `/hestia.js` and `/appHeader.js`. They're also available in `/dist` of this repo.

```html
<script src="/hestia.js"></script>
<script>
// Pass in root element where app’s iframe should be created
const socket = hestia(document.getElementById('root'));

socket.emit('start', 'Dingus');
socket.on('confirm', () => {
  console.log('Hello Dingus!');
});
</script>
```

`app.js`:

```html
<script src="/appHeader.js"></script>
<script>
  app.on('foo', () => {
    app.emit('bar');
  });
</script>
```

## Documentation

Full documentation coming soon!

## License

[MIT](https://github.com/LenKagamine/Hestia/blob/master/LICENSE)
