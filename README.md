# soy-io-widget

This is the library for include a soyio widget.

This library contemplate that a div element with ID: `soyio-widget-iframe-container` should be created before instantiate the widget.

## How to work

For frontend frameworks, this should be imported as follows.

```html
<script>
  const flow = '<flow>' // Can only take the values of 'register' or 'authenticate'

  const configProps = {
    companyId: '<company id>',           // Starts with 'com_'
    userReference?: '<user identifier of company>' // Optional
    flowTemplateId: '<flow template id', // Starts with 'vft_' only needed in 'register' flow
    identityId: '<identity id>'          // Starts with 'id_' only needed in 'authenticate' flow
  }

  const onEvent = (data) => {
    console.log('APPLICATION: EVENT!');
    console.log(data);
  }

  // Create widget when needed. In this example, widget is created when page is loaded.
  document.addEventListener('DOMContentLoaded', function() {
    new Widget(flow, configProps, onEvent)
  });
</script>

<body>
  <div id="soyio-widget-iframe-container"></div>
</body>
```
