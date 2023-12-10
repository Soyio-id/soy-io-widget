# soy-io-widget
This is the library for include a soyio widget.

This library contemplate that an iframe with the ID: soyio-widget-iframe should be created before instantiate the widget.

## How to work

For frontend frameworks, this should be imported as follows.

``` VUE
<script>
import Widget from '@soyio/soyio-widget'

// Vue syntax
onMounted(() => {
  const widget = new Widget()
})
</script>
<template>
  <iframe id="soyio-widget-iframe"></iframe>
</template>

```

The widget class receive the following object:

```JS
{
  userEmail?: string
}
```

And if there is an email this is sended to the iframe.