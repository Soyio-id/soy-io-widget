# soy-io-widget

This is the library for include a soyio widget.

This library contemplate that a div element with ID: `soyio-widget-iframe-container` should be created before instantiate the widget.

## How to work

For frontend frameworks, this should be imported as follows.

```html
<script>
  const widgetConfig = {
    flow: '<flow>' // Can only take the values of 'register' or 'authenticate'
    configProps = {
      companyId: '<company id>',           // Starts with 'com_'
      userReference: '<user identifier of company>' // Optional
      userEmail: '<user email>'            // If not provided, Soyio will prompt the user to enter an email.
      flowTemplateId: '<flow template id', // Starts with 'vft_' only needed in 'register' flow
      identityId: '<identity id>'          // Starts with 'id_' only needed in 'authenticate' flow
    }
    onEvent: (data) => console.log('Data: ', data),
    isSandbox: true // Optional. Default is false.
  }

  // Create widget when needed. In this example, widget is created when page is loaded.
  document.addEventListener('DOMContentLoaded', function() {
    new Widget(widgetConfig)
  });
</script>

<body>
  <div id="soyio-widget-iframe-container"></div>
</body>
```
