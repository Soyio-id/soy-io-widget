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

## Browser Compatibility Notes

**Important Safari Limitation**: In Safari browsers, the widget can only be opened as a result of a direct user interaction (like a click event). This is due to Safari's security policies regarding popup windows. Always ensure the widget initialization is triggered by a user action when supporting Safari browsers.

## Disclosure Request

A **`disclosure_request`** is a process that a user goes through where they are verified, and then they share the necessary data as required by each company.
This verification can happen in one of the following two ways:

1. **Validation**: Through document validation and facial video. This occurs when a user has never been verified before with Soyio.

2. **Authentication**: Through an access key (passkey) or facial video. This can occur when a user has already been validated previously with Soyio.

To instantiate this process in the code, you have two options:

### 1. Disclosure Requests On-the-fly

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
- `customColor`.

### 2. Created Disclosure Request

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

- `customColor`

Note: User and template properties are not specified here because they must be specified when creating the disclosure request beforehand.

### Disclosure Request Events

The `onEvent` callback is designed to handle various events that occur during widget interaction. Specifically, it receives detailed information upon the successful completion of user request. Here are the events it handles:

- **`DISCLOSURE_REQUEST_SUCCESSFUL`**: This event occurs when a user successfully completes a `disclosure_request`. The identity verification could have been a `validation` or `authentication`.

  - `eventName`: The name of the event, in this case, `'DISCLOSURE_REQUEST_SUCCESSFUL'`.
  - `verificationMethod`: Takes the values of `authentication` or `validation`.
  - `identityId`: The unique identifier for the verified identity.
  - `userReference`: The reference identifier for the user, facilitating the association of the event with the user within the company's context.

- **`DENIED_CAMERA_PERMISSION`**: Event triggered when user denies camera permissions. It closes the widget.
- **`UNEXPECTED_ERROR`**: Event triggered when user exits because of an unexpected error.

- **`WIDGET_CLOSED`**: This event occurs when the user closes the `Soyio` pop up. The event object is as follows:

  - `{ eventName: 'WIDGET_CLOSED' }`.

- **`WIDGET_OPENED`**: This event occurs when the user closes the `Soyio` pop up. The event object is as follows:
  - `{ eventName: 'WIDGET_CLOSED' }`.

### Disclosure Request Attribute Descriptions

- **`companyId`**: The unique identifier for the company, must start with `'com_'`.
- **`userReference`**: A reference identifier provided by the company for the user engaging with the widget. This identifier is used in events (`onEvent` and `webhooks`) to inform the company which user the events are associated with.
- **`userEmail`**: The user's email address. If not provided, Soyio will prompt the user to enter their email.
- **`templateId`**: Identifier of template. Specifies the order and quantity of documents requested from the user, as well as the mandatory data that the user is asked to share with the company. It must start with `'dtpl_'`.
- **`disclosureRequestId`**: If created beforehand, you can target a specific disclosure request that the user must complete. It is useful if you need to match some data between the disclosure process and your database records. It must start with `'dreq_'`
- **`identityId`**: This identifier must start with `'id_'` and signifies the user's identity.
- **`isSandbox`**: Indicates if the widget should operate in sandbox mode, defaulting to `false`.
- **`onEvent`**: A callback function triggered upon event occurrences, used for capturing and logging event-related data.
- **`customColor`**: A hex code string that specifies the base color of the interface.

## Signature Attempt

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

- `customColor`.

### Signature Attempt Events

- **`IDENTITY_SIGNATURE`**: This event occurs when a user successfully completes a signature attempt. The event object includes:

  - `eventName`: The name of the event, in this case, `'IDENTITY_SIGNATURE'`.
  - `userReference`: The reference identifier for the user, facilitating the association of the event with the user within the company's context.

- **`REJECTED_SIGNATURE`**: Event triggered when user clicks the "reject" button in the signature attempt. The event object includes:

  - `identityId`: The unique identifier for the identity.
  - `userReference`: The userReference used in the validation attempt for the identity.

### Signature Attempt Attribute Descriptions

- **`signatureAttemptId`**: Identifier of signature attempt obtained when creating the `SignatureAttempt`. It must start with `'sa_'`.
- **`isSandbox`**: Indicates if the widget should operate in sandbox mode, defaulting to `false`.
- **`onEvent`**: A callback function triggered upon event occurrences, used for capturing and logging event-related data.
- **`customColor`**: A hex code string that specifies the base color of the interface.

## Auth Request

The **`auth_request`** is a process where, using a previously created `auth_request_id`, a request is initiated in which a user can authenticate. This authentication can occur either through an access key or facial video. It's important to note that for this request, the user must have been previously verified with Soyio.

```html
<button id="start-auth-request">Start auth request</button>

<script>
  import { SoyioWidget } from "@soyio/soyio-widget";

  // Widget configuration
  const widgetConfig = {
    request: "authentication_request",
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

### Auth Request Attribute Descriptions

- **`authRequestId`**: Identifier of auth request obtained when creating the `AuthRequest`. It must start with `'authreq_'`.
- **`isSandbox`**: Indicates if the widget should operate in sandbox mode, defaulting to `false`.
- **`onEvent`**: A callback function triggered upon event occurrences, used for capturing and logging event-related data.
- **`customColor`**: A hex code string that specifies the base color of the interface.

## Consent Request Box

The **`ConsentBox`** is a component that allows you to embed a consent request directly within your webpage, rather than opening it in a popup window. This is particularly useful when you want to integrate the consent flow seamlessly into your application's interface.

```html
<!-- Add a container div where the consent request will be mounted -->
<div id="consent-request-box"></div>

<script>
  import { ConsentBox } from "@soyio/soyio-widget";

  // Configuration for the consent request
  const consentOptions = {
    consentTemplateId: "<consent template id>",
    onEvent: (data) => console.log(data),
    isSandbox: true, // Optional
    appearance: {}, // Optional
    actionToken: "<action token>", // Optional
    entityId: "<entity id>", // Optional
    context: "<context>", // Optional
    onReady: () => console.log("ConsentBox is ready"), // Optional
    optionalReconsentBehavior: "notice", // Optional
    mandatoryReconsentBehavior: "notice", // Optional
  };

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Create and mount the consent request box
    const consentBox = new ConsentBox(consentOptions);
    consentBox.mount("#consent-request-box");
  });
</script>
```

### Consent Request Box Events

The `onEvent` follows the following format:

```typescript
{
  eventName: 'CONSENT_CHECKBOX_CHANGE',
  isSelected: boolean
  actionToken: string,
}
```

### Methods

- **`getState()`**: Returns the current state of the consent box. The returned object has the following structure:

```typescript
{
  isSelected: boolean,
  actionToken: string | null,
}

```

### Attribute Descriptions

- **`consentTemplateId`**: Identifier of consent template. It must start with `'constpl_'`.
- **`isSelected`**: Boolean value indicating whether the consent checkbox is selected or not.
- **`actionToken`**: token containing necessary information for creation of the consent commit. [Learn more](https://docs.soyio.id/docs/api/resources/create-consent-request).
- **`appearance`**: Customize the appearance of the iframe. [Learn more](https://docs.soyio.id/docs/integration-guide/modules/consent).
- **`actionToken`**: In case of losing the state of the consent (i.e. page reload), you can use a previously generated `actionToken` to restore the state of the consent.
- **`entityId`**: Identifier of the `entity` associated with a `ConsentAction`. If provided and a consent was previously granted by this entity, the UI will display a message indicating that consent has already been given.
- **`context`**: Additional information that will be saved with the consent. Useful when you want to track the consent from a specific context.
- **`onReady`**: Optional callback that executes when the consent box is ready to use. You can use this to handle logic when the iframe is not mounted yet.
- **`optionalReconsentBehavior`**: What should happen when the consent is initialized with an `entityId` that has already given consent on an optional category.
  - `notice` will show a message letting the user know that they have already given consent,
  - `askAgain` will show the consent as if it wasn't given in the first place,
  - `hide` will not show the consent at all.

  We strongly recommend using `notice` so the user doesn't have to give the consent again and knows what they have already given consent to.
- **`mandatoryReconsentBehavior`**: What should happen when the consent is initialized with an `entityId` that has already given consent on a mandatory category.
  - `notice` will show a message letting the user know that they have already given consent,
  - `askAgain` will show the consent as if it wasn't given in the first place,

  We don't support hiding the mandatory consent, and we strongly recommend using `notice` so the user doesn't have to give the consent again and knows what they have already given consent to.

## Privacy Center

The `PrivacyCenterBox` lets you embed the Privacy Center inside your page. You can scope which features to show and which data subjects are relevant to your interface. For more info check [our docs](https://docs.soyio.id/).

```html
<!-- Add a container div where the Privacy Center will be mounted -->
<div id="privacy-center-box"></div>

<script>
  import { PrivacyCenterBox } from "@soyio/soyio-widget";

  // Configuration for the Privacy Center
  const privacyCenterOptions = {
    // Choose ONE of the following authentication modes:
    // 1) Public mode
    companyId: "<company id>", // e.g. com_...

    // 2) Authenticated mode
    // sessionToken: "<session token>",

    // Feature flags (optional)
    enabledFeatures: ["DataSubjectRequest", "ConsentManagement"],

    // Limit consent view to specific data subjects (optional)
    dataSubjects: ["customer", "employee"],

    // Common options
    onEvent: (event) => console.log(event),
    onReady: () => console.log("PrivacyCenterBox is ready"), // Optional
    isSandbox: true, // Optional
    appearance: {}, // Optional
  };

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    const privacyCenter = new PrivacyCenterBox(privacyCenterOptions);
    privacyCenter.mount("#privacy-center-box");
  });
</script>
```

### Attribute Descriptions

- `sessionToken`: Use this to authenticate a session directly.
- `companyId`: The company identifier. Must start with `com_`. Use this when Privacy Center is mounted in a non authenticated environment.
- `enabledFeatures`: Optional array of features to show. Supported values: `"DataSubjectRequest"`, `"ConsentManagement"`.
- `dataSubjects`: Optional array of data subject categories. When present, the consent management view only shows consent for the specified categories. Supported values include: `"anonymous_user"`, `"citizen_voter"`, `"commuter"`, `"consultant"`, `"customer"`, `"employee"`, `"job_applicant"`, `"next_of_kin"`, `"passenger"`, `"patient"`, `"prospect"`, `"shareholder"`, `"supplier_vendor"`, `"trainee"`, `"visitor"`.
- `isSandbox`: Whether to use the sandbox environment. Defaults to `false`.
- `appearance`: Customize the iframe appearance. See Appearance section below.
- `onEvent`: Callback that receives events from the iframe.
- `onReady`: Optional callback fired when the iframe becomes ready.

Note:
- When `sessionToken` is provided, do not pass `companyId`.

### Privacy Center Events

- **`REQUEST_SUBMITTED`**: This event occurs when a user successfully submits a Data Subject Request. The event object includes:
  - `eventName`: The name of the event, in this case, `'REQUEST_SUBMITTED'`.
  - `kind`: The kind of the Data Subject Request submitted. Supported values are: `access`, `opposition`, `rectification`, `suppression` and `portability`

# Appearance

Customize the look and feel of Soyio UI components by passing an `appearance` object to the configuration. The appearance object supports themes, CSS variables, and CSS rules for granular control over the styling.

## Structure

The appearance object consists of three main sections:

```javascript
const appearance = {
  theme: string,
  variables: Variables,
  rules: Rules,
};
```

## Themes

Currently supported themes:

- `"soyio"` (default) - The standard Soyio theme

## Variables

Use variables to adjust common visual attributes across all components.

```javascript
interface Variables {
  fontFamily?: string;
  colorPrimary?: string;
  colorBackground?: string;
  colorText?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
}
```

### Available Variables

| Variable          | Description                              | Default                   |
| ----------------- | ---------------------------------------- | ------------------------- |
| `fontFamily`      | The font stack to use for text           | `"system-ui, sans-serif"` |
| `colorPrimary`    | Primary color for interactive elements   | `"#0570DE"`               |
| `colorSecondary`  | Secondary color for interactive elements | `"#0570DE"`               |
| `colorBackground` | Background color                         | `"#FFFFFF"`               |
| `colorText`       | Main text color                          | `"#1A1F36"`               |
| `borderRadius`    | Border radius for elements               | `"4px"`                   |
| `borderWidth`     | Border width for elements                | `"1px"`                   |
| `borderStyle`     | Border style for elements                | `"solid"`                 |

## Rules

The `rules` object allows you to apply custom CSS to specific elements. Currently, Soyio supports styling for checkbox components.

### Supported rules

- `.MainContainer` - The main container of the consent request box. Only border CSS properties are allowed to be overridden.
- `.Button` - The button component.
- `.Checkbox` - The checkbox component.
- `.CheckboxInput` - The checkbox input element.
- `.CheckboxLabel` - The checkbox label.

![Checkbox Components](https://soyio-public-assets.s3.us-east-1.amazonaws.com/checkbox-appearance.webp)

### Supported Selectors

- `.CheckboxInput--checked` - The checked state of the checkbox
- `.CheckboxInput:hover` - Hover state of the checkbox
- `.CheckboxInput:focus` - Focus state of the checkbox
- `.CheckboxInput:focus-visible` - Focus-visible state of the checkbox

### Example Configuration

```javascript
const appearance = {
  theme: "soyio",
  variables: {
    fontFamily: "system-ui, sans-serif",
    colorPrimary: "#f54c27",
    colorSecondary: "#f54c27",
    colorBackground: "#ffffff",
    colorText: "#1E1B4B",
    borderRadius: "0.5rem",
    borderWidth: "3px",
    borderStyle: "dashed",
  },
  rules: {
    ".MainContainer": {
      borderWidth: "1px",
      borderColor: "#E5E7EB",
      borderRadius: "0.25rem",
    },
    ".CheckboxInput": {
      appearance: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      width: "1rem",
      height: "1rem",
      borderRadius: "9999px",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "var(--colorPrimary)",
    },
    ".CheckboxInput--checked": {
      borderColor: "var(--colorPrimary)",
      backgroundColor: "var(--colorPrimary)",
    },
    ".CheckboxInput:hover": {
      borderColor: "var(--colorPrimary)",
      boxShadow: "0 0 0 2px var(--colorPrimary)",
    },
    ".CheckboxInput:focus": {
      outline: "none",
      boxShadow: "0 0 0 2px var(--colorPrimary)",
    },
    ".CheckboxInput:focus-visible": {
      outline: "none",
      boxShadow: "0 0 0 2px var(--colorPrimary)",
    },
  },
};
```

## TypeScript

The `SoyioTypes` module from the `@soyio/soyio-widget` package provides TypeScript type definitions that you can use to integrate the SoyioWidget more seamlessly into your TypeScript projects.

To use the `SoyioTypes` in your project, import it directly from the `@soyio/soyio-widget` package:

```javascript
import type { SoyioTypes } from "@soyio/soyio-widget";
```

## Server Side Rendering (SSR)

This package is not directly compatible with SSR because of `post-robot`, but there are workarounds that allow you to use it without disrupting the build process. Below are examples on popular SSR frameworks.

### Next.js


```tsx
'use client'

import { useMemo, useEffect, useState } from "react";

export default function PrivacyCenterBox() {
	const privacyCenterOptions = useMemo(() => ({
		companyId: 'com_lalala',
		// ... other options
		onEvent: () => {}
	}), []);

	const [privacyCenter, setPrivacyCenter] = useState(null);

	useEffect(() => {
		async function mountPrivacyCenter() {
			if (privacyCenter) return;

			const { PrivacyCenterBox } = await import('@soyio/soyio-widget');
			const privacyCenterBox = new PrivacyCenterBox(privacyCenterOptions);
			privacyCenterBox.mount("#privacy-center-box");

			setPrivacyCenter(privacyCenterBox);
		}
		mountPrivacyCenter();

		return () => privacyCenter?.unmount();
	}, [privacyCenterOptions, privacyCenter]);

	return (
		<div>
			<h1>Hello World</h1>
			<div id="privacy-center-box"></div>
		</div>
	);
}

```

### Gatsby

```tsx
// PrivacyCenterBox.tsx

import React, { useEffect, useState, useMemo } from "react";

export default function PrivacyCenterBox({ onReady }) {
	const [privacyCenter, setPrivacyCenter] = useState(null);

	const privacyCenterOptions = useMemo(() => ({
		// other options...
		companyId: process.env.SOYIO_COMPANY_ID || 'com_lalala',
		onEvent: () => {}
	}), [onReady]);

	useEffect(() => {
		async function mountPrivacyCenter() {
			if (privacyCenter) return;

			const { PrivacyCenterBox } = await import('@soyio/soyio-widget');
			const privacyCenterBox = new PrivacyCenterBox(privacyCenterOptions);
			privacyCenterBox.mount("#privacy-center-box");

			setPrivacyCenter(privacyCenterBox);
		}
		mountPrivacyCenter();

		return () => privacyCenter?.unmount();
	}, [privacyCenterOptions, privacyCenter]);

	return (<div id="privacy-center-box"></div>)
}

```

Then use `React.lazy` and `React.Suspense` when declaring that component elsewhere.

```tsx
// AnotherComponent.tsx

import React, { useState, useCallback, useEffect } from "react";

const PrivacyCenterBox = React.lazy(() => import('yourPathTo/PrivacyCenterBox'));

export default function PrivacyCenterContainer() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => setIsClient(true), []);

	const onReady = useCallback(() => setIsPrivacyCenterLoading(false), []);

	return (
		<div>
		  {isClient && 
		  <React.Suspense fallback={
			<div>
				Loading...
			</div>
		  }>
			<PrivacyCenterBox onReady={onReady} />
		  </React.Suspense>
		  }
		</div>
	)
}
```
