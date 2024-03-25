<h1 align="center">Soyio desktop widget</h1>

<p align="center">
    <em>
        Use the Soyio widget within your web application as a Window.
    </em>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@soyio/soyio-widget" target="_blank">
    <img src="https://img.shields.io/npm/v/@soyio/soyio-widget?label=version&logo=nodedotjs&logoColor=%23fff&color=306998" alt="NPM - Version">
</a>
</p>

## Installation

Install using npm! (or your favorite package manager)

```sh
# Using npm
npm install @soyio/soyio-widget

# Using yarn
yarn add @soyio/soyio-widget
```

## Usage

Integrate the widget into your frontend framework using the script below. Ensure to replace placeholders (e.g., <flow>, <company id>) with actual values relevant to your implementation.

```html
<script>
  // Widget configuration
  const widgetConfig = {
    flow: "<flow>",
    configProps: {
      companyId: "<company id>",
      userReference: "<user identifier of company>",
      userEmail: "<user email>",
      flowTemplateId: "<flow template id>",
      identityId: "<identity id>",
    },
    onEvent: (data) => console.log(data),
    isSandbox: true,
  };

  // Create widget when needed. In this example, widget is created when page is loaded.
  document.addEventListener("DOMContentLoaded", function () {
    new Widget(widgetConfig);
  });
</script>
```

#### Attribute Descriptions

- **`flow`**: A string that can only take the values `'register'` or `'authenticate'`. Specifies the workflow of the widget.
- **`companyId`**: The unique identifier for the company, must start with `'com_'`.
- **`userReference`**: (Optional) A reference identifier provided by the company for the user engaging with the widget. This identifier is used in events (`onEvent` and `webhooks`) to inform the company which user the events are associated with.
- **`userEmail`**: The user's email address. This field is optional when the flow is `'register'`, where if not provided, Soyio will prompt the user to enter their email. However, for the `'authenticate'` flow, this field should not be provided.
- **`flowTemplateId`**: : Required only in the `'register'` flow, this identifier specifies the order and quantity of documents requested from the user. It must start with `'vft_'`.
- **`identityId`**: Necessary only in the `'authenticate'` flow, this identifier must start with `'id_'` and signifies the user's identity.
- **`onEvent`**: A callback function triggered upon event occurrences, used for capturing and logging event-related data.
- **`isSandbox`**: (Optional) Indicates if the widget should operate in sandbox mode, defaulting to `false`.

#### Events

The `onEvent` callback is designed to handle various events that occur during widget interaction. Specifically, it receives detailed information upon the successful completion of user flows. Here are the events it handles:

- **`IDENTITY_REGISTERED`**: This event is dispatched when a user successfully completes the registration flow. The event object contains:

  - `eventName`: The name of the event, in this case, `'IDENTITY_REGISTERED'`.
  - `identityId`: The unique identifier for the newly registered identity.
  - `userReference`: The reference identifier for the user, facilitating the association of the event with the user within the company's context.

- **`IDENTITY_AUTHENTICATED`**: This event occurs when a user successfully completes the authentication flow. The event object includes:

  - `eventName`: The name of the event, here `'IDENTITY_AUTHENTICATED'`.
  - `identityId`: The unique identifier for the authenticated identity.
  - `userReference`: The reference identifier for the user, facilitating the association of the event with the user within the company's context.

- **`WIDGET_CLOSED`**: This event occurs when the user closes the `Soyio` pop up. The event object is as follows:

  - `{ eventName: 'WIDGET_CLOSED' }`.

- **`WIDGET_OPENED`**: This event occurs when the user closes the `Soyio` pop up. The event object is as follows:
  - `{ eventName: 'WIDGET_CLOSED' }`.
