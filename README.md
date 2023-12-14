# soy-io-widget
This is the library for include a soyio widget.

This library contemplate that a div element with ID: `soyio-widget-iframe-container` should be created before instantiate the widget.

## How to work

For frontend frameworks, this should be imported as follows.

``` html
<script>
// insert setup of your framework here!! 
document.addEventListener('DOMContentLoaded', function() {
  new Widget({ userEmail: 'example@email.com', companyName: 'Company name'})
});
</script>
<body>
  <div id="soyio-widget-iframe-container"></div>
</body>

```

The widget class receive the following object when is initialized:

```JS
{
  userEmail?: string
  companyName?: string
}
```

And if there is an email this is sended to the iframe.