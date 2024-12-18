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

Integrate the widget into your frontend framework using the script below. Ensure to replace placeholders (e.g., \<request>, \<company id>) with actual values relevant to your implementation.

## Browser compatibility notes

**Important Safari Limitation**: In Safari browsers, the widget can only be opened as a result of a direct user interaction (like a click event). This is due to Safari's security policies regarding popup windows. Always ensure the widget initialization is triggered by a user action when supporting Safari browsers.

### 1. Disclosure Request

A **`disclosure_request`** is a process that a user goes through where they are verified, and then they share the necessary data as required by each company.
This verification can happen in one of the following two ways:

1. **Validation**: Through document validation and facial video. This occurs when a user has never been verified before with Soyio.

2. **Authentication**: Through an access key (passkey) or facial video. This can occur when a user has already been validated previously with Soyio.

To instantiate this process in the code, you have two options

#### 1.a Disclosure requests on-the-fly

This doesn't require any previous setup. Given your company and disclosure template IDs, you can create disclosure requests freely when the user starts the widget.

```html
<button id="start-disclosure-request">Start disclosure request</button>

<script>
  import { SoyioWidget } from "@soyio/soyio-widget";

  // Widget configuration
  const widgetConfig = {
    request: "disclosure",
    configProps: {
      companyId: "<company id>",
      userReference: "<user identifier of company>",
      userEmail: "<user email>",
      templateId: "<template id>",
      forceError: "<error type>",
      customColor: "<custom color>",
    },
    onEvent: (data) => console.log(data),
    isSandbox: true,
  };

  // Function to create the widget
  function initWidget() {
    new SoyioWidget(widgetConfig);
  }

  // Add event listener to the button to create the widget on click
  document
    .getElementById("start-disclosure-request")
    .addEventListener("click", initWidget);
</script>
```

Optional props:

- `userEmail`
- `forceError`
- `customColor`.

#### 1.b Created disclosure request

You can alternatively create a disclosure request beforehand with some **matchers** to make sure the person completing the request matches the one that your application thinks it is.

For more details about the use case, please refer to [the documentation](https://docs.soyio.id/).

To use this option, simply specify the disclosure request ID along with any optional parameters:

```html
<button id="start-disclosure-request">Start disclosure request</button>

<script>
  import { SoyioWidget } from "@soyio/soyio-widget";

  // Widget configuration
  const widgetConfig = {
    request: "disclosure",
    configProps: {
      disclosureRequestId: "<disclosure request id>",
      forceError: "<error type>",
      customColor: "<custom color>",
    },
    onEvent: (data) => console.log(data),
    isSandbox: true,
  };

  // Function to create the widget
  function initWidget() {
    new SoyioWidget(widgetConfig);
  }

  // Add event listener to the button to create the widget on click
  document
    .getElementById("start-disclosure-request")
    .addEventListener("click", initWidget);
</script>
```

Optional properties:

- `forceError`
- `customColor`

Note: User and template properties are not specified here because they must be specified when creating the disclosure request beforehand.

### 2. Signature attempt

The **`signature_attempt`** is a process where, using a previously created `signature_attempt_id`, a request is initiated in which a user can digitally sign a document. To sign the document, the user must be authenticated. This authentication can occur either through an access key or facial video. It's important to note that for this request, the user must have been previously verified with Soyio.

```html
<button id="start-signature-attempt">Start signature attempt</button>

<script>
  import { SoyioWidget } from "@soyio/soyio-widget";

  // Widget configuration
  const widgetConfig = {
    request: "signature",
    configProps: {
      signatureAttemptId: "<signature attempt id>",
      forceError: "<error type>",
      customColor: "<custom color>",
    },
    onEvent: (data) => console.log(data),
    isSandbox: true,
  };

  // Function to create the widget
  function initWidget() {
    new SoyioWidget(widgetConfig);
  }

  // Add event listener to the button to create the widget on click
  document
    .getElementById("start-signature-attempt")
    .addEventListener("click", initWidget);
</script>
```

Optional props:

- `forceError`
- `customColor`.

### 3. Auth Request

The **`auth_request`** is a process where, using a previously created `auth_request_id`, a request is initiated in which a user can authenticate. This authentication can occur either through an access key or facial video. It's important to note that for this request, the user must have been previously verified with Soyio.

```html
<button id="start-auth-request">Start auth request</button>

<script>
  import { SoyioWidget } from "@soyio/soyio-widget";

  // Widget configuration
  const widgetConfig = {
    request: "authentication",
    configProps: {
      authRequestId: "<auth request id>",
      customColor: "<custom color>",
    },
    onEvent: (data) => console.log(data),
    isSandbox: true,
  };

  // Function to create the widget
  function initWidget() {
    new SoyioWidget(widgetConfig);
  }

  // Add event listener to the button to create the widget on click
  document
    .getElementById("start-auth-request")
    .addEventListener("click", initWidget);
</script>
```

Optional props:

- `customColor`.

### Attribute Descriptions

- **`companyId`**: The unique identifier for the company, must start with `'com_'`.
- **`userReference`**: A reference identifier provided by the company for the user engaging with the widget. This identifier is used in events (`onEvent` and `webhooks`) to inform the company which user the events are associated with.
- **`userEmail`**: The user's email address. If not provided, Soyio will prompt the user to enter their email.
- **`templateId`**: Identifier of template. Specifies the order and quantity of documents requested from the user, as well as the mandatory data that the user is asked to share with the company. It must start with `'dtpl_'`.
- **`disclosureRequestId`**: If created beforehand, you can target a specific disclosure request that the user must complete. It is useful if you need to match some data between the disclosure process and your database records. It must start with `'dreq_'`
- **`signatureAttemptId`**: Identifier of signature attempt obtained when creating the `SignatureAttempt`. It must start with `'sa_'`.
- **`authRequestId`**: Identifier of auth request obtained when creating the `AuthRequest`. It must start with `'authreq_'`.
- **`identityId`**: This identifier must start with `'id_'` and signifies the user's identity.
- **`isSandbox`**: Indicates if the widget should operate in sandbox mode, defaulting to `false`.
- **`forceError`**: Triggers specific errors for testing or debugging. Used to simulate failure scenarios. Only works in `sandbox` mode.
- **`onEvent`**: A callback function triggered upon event occurrences, used for capturing and logging event-related data.
- **`customColor`**: A hex code string that specifies the base color of the interface.

### Events

The `onEvent` callback is designed to handle various events that occur during widget interaction. Specifically, it receives detailed information upon the successful completion of user request. Here are the events it handles:

- **`DISCLOSURE_REQUEST_SUCCESSFUL`**: This event occurs when a user successfully completes a `disclosure_request`. The identity verification could have been a `validation` or `authentication`.

  - `eventName`: The name of the event, in this case, `'DISCLOSURE_REQUEST_SUCCESSFUL'`.
  - `verificationMethod`: Takes the values of `authentication` or `validation`.
  - `identityId`: The unique identifier for the verified identity.
  - `userReference`: The reference identifier for the user, facilitating the association of the event with the user within the company's context.

- **`IDENTITY_SIGNATURE`**: This event occurs when a user successfully completes a signature attempt. The event object includes:

  - `eventName`: The name of the event, in this case, `'IDENTITY_SIGNATURE'`.
  - `userReference`: The reference identifier for the user, facilitating the association of the event with the user within the company's context.

- **`DENIED_CAMERA_PERMISSION`**: Event triggered when user denies camera permissions. It closes the widget.
- **`UNEXPECTED_ERROR`**: Event triggered when user exits because of an unexpected error.

- **`REJECTED_SIGNATURE`**: Event triggered when user clicks the "reject" button in the signature attempt. The event object includes:

  - `identityId`: The unique identifier for the identity.
  - `userReference`: The userReference used in the validation attempt for the identity.

- **`WIDGET_CLOSED`**: This event occurs when the user closes the `Soyio` pop up. The event object is as follows:

  - `{ eventName: 'WIDGET_CLOSED' }`.

- **`WIDGET_OPENED`**: This event occurs when the user closes the `Soyio` pop up. The event object is as follows:
  - `{ eventName: 'WIDGET_CLOSED' }`.

#### Force error types

The `forceError` parameter can simulate the following error conditions:

- `'facial_validation_error'`: Simulates a failure in the facial video liveness test, indicating the system could not verify the user's live presence.
- `'document_validation_error'`: Indicates an issue with validating the photos of the documents provided by the user.
- `'unknown_error'`: Generates a generic error, representing an unspecified problem.
- `'expiration_error'`: Occurs when there is an issue with the identity provider that prevents the validation of one or both documents provided by the user, due to unspecified problems in the validation process.
- `'camera_permission_error'`: Happens when the user does not grant the necessary permissions to access the camera, preventing the completion of the disclosure or signature request.

#### Typescript

The `SoyioTypes` module from the `@soyio/soyio-widget` package provides TypeScript type definitions that you can use to integrate the SoyioWidget more seamlessly into your TypeScript projects.

To use the `SoyioTypes` in your project, import it directly from the `@soyio/soyio-widget` package:

```javascript
import type { SoyioTypes } from "@soyio/soyio-widget";
```
