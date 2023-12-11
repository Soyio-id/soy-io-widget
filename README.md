# soy-io-widget
This is the library for include a soyio widget.

This library contemplate that an iframe with the ID: soyio-widget-iframe should be created before instantiate the widget.

## How to work

For frontend frameworks, this should be imported as follows.

``` html
<script>
// insert setup of your framework here!! 
document.addEventListener('DOMContentLoaded', function() {
  new Widget({ userEmail: 'example@email.com'})
});
</script>
<body>
  <iframe id="soyio-widget-iframe"></iframe>
</body>

```

The widget class receive the following object when is initialized:

```JS
{
  userEmail?: string
}
```

And if there is an email this is sended to the iframe.