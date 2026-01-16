<h1 align="center">Soyio Widget</h1>

<p align="center">
    <em>
        Our SDK for web based integrations
    </em>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@soyio/soyio-widget" target="_blank">
    <img src="https://img.shields.io/npm/v/@soyio/soyio-widget?label=version&logo=nodedotjs&logoColor=%23fff&color=306998" alt="NPM - Version">
</a>
</p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
- [Consent Request Box](#consent-request-box)
- [Privacy Center](#privacy-center)
- [Disclosure Request](#disclosure-request)
- [Signature Attempt](#signature-attempt)
- [Auth Request](#auth-request)
- [Appearance](#appearance)
- [TypeScript](#typescript)
- [JSON Schema Validation](#json-schema-validation)
- [Server Side Rendering (SSR)](#server-side-rendering-ssr)


## Installation

Install using npm! (or your favorite package manager)

```sh
# Using npm
npm install @soyio/soyio-widget

# Using yarn
yarn add @soyio/soyio-widget

# Using pnpm
pnpm add @soyio/soyio-widget
```

## Usage

Integrate the widget into your frontend framework using the script below. Ensure to replace placeholders (e.g., \<request>, \<company id>) with actual values relevant to your implementation.

---

## Modules

The Soyio Widget provides several modules that you can integrate into your application:

- **Consent Request Box**: Embed consent requests directly within your webpage
- **Privacy Center**: Embed the Privacy Center inside your page with customizable features
- **Disclosure Request**: Verify users and collect required data through validation or authentication
- **Signature Attempt**: Enable users to digitally sign documents after authentication
- **Auth Request**: Authenticate users using access keys or facial video

## Consent Request Box

> 📖 [Integration Guide](https://docs.soyio.id/docs/integration-guide/consent/introduction)

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
  isSelected: boolean,
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

> 📖 [Integration Guide](https://docs.soyio.id/docs/integration-guide/privacy-center/introduction)

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

    // Request reference (optional)
    // Will be attached to data subject requests
    requestReference: "<reference>", // e.g. some uuid or id to match our created records with your frontend flows

    // Limit consent view to specific data subjects (optional)
    dataSubjects: ["customer", "employee"],

    // File upload configuration (optional)
    fileRequisites: {
      allowedExtensions: ["pdf", "png", "jpeg", "jpg"],
      maxFileSize: 5 * 1024 * 1024, // 5MB
    },

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
- `requestReference`: Optional string, intended to be a reference of the current session. It will be attached to created data subject requests.
- `dataSubjects`: Optional array of data subject categories. When present, the consent management view only shows consent for the specified categories. Supported values include: `"anonymous_user"`, `"citizen_voter"`, `"commuter"`, `"consultant"`, `"customer"`, `"employee"`, `"job_applicant"`, `"next_of_kin"`, `"passenger"`, `"patient"`, `"prospect"`, `"shareholder"`, `"supplier_vendor"`, `"trainee"`, `"visitor"`.
- `fileRequisites`: Optional object to configure file upload constraints.
  - `allowedExtensions`: Array of allowed file extensions (e.g. `['pdf', 'jpg']`). Default: `['pdf', 'png', 'jpeg', 'jpg']`.
  - `maxFileSize`: Maximum file size in bytes. Default: `5 * 1024 * 1024` (5MB).
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

## Disclosure Request

> 📖 [Integration Guide](https://docs.soyio.id/docs/integration-guide/disclosure/introduction)

> [!NOTE]
> In Safari browsers, disclosure requests can only be opened as a result of a direct user interaction (like a click event). This is due to Safari's security policies regarding popup windows. Always ensure the disclosure request initialization is triggered by a user action when supporting Safari browsers.

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

> 📖 [Integration Guide](https://docs.soyio.id/docs/integration-guide/signature/introduction)

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

> 📖 [Integration Guide](https://docs.soyio.id/docs/integration-guide/authentication/introduction)

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

## Appearance

Customize the look and feel of Soyio UI components by passing an `appearance` object to the configuration. The appearance object supports themes, CSS variables, and CSS rules for granular control over the styling.

### Structure

The appearance object consists of four main sections:

```javascript
const appearance = {
  theme: string,
  variables: Variables,
  rules: Rules,
  config: Config,
};
```

### Themes

Built-in themes provide pre-configured color palettes and component styles:

| Theme | Description |
| ----- | ----------- |
| `"soyio"` | Default light theme with Soyio brand colors (purple/indigo), uppercase titles |
| `"night"` | Dark mode theme with deep blues, muted colors, and subtle borders |
| `"flat"` | Minimal theme with square corners, normal-case titles, thicker borders |

**Theme style differences:**

- **soyio**: Standard styling with rounded corners and uppercase card titles
- **night**: Dark backgrounds, lighter text, borders using theme variables
- **flat**: No border radius, sentence-case titles (no uppercase), 2px borders, lighter font weights

**Example:**
```javascript
const appearance = {
  theme: "night", // Use the dark theme
  variables: {
    // You can still override specific variables
    colorPrimary: "#FF6B6B",
  },
  rules: {
    // You can also override theme rules
    ".CardTitle": { fontWeight: "700" },
  },
};
```

Theme variables and rules are applied first, then your custom overrides take precedence.

### Config

The `config` object allows you to adjust component behavior settings.

```javascript
interface Config {
  helperTextPosition?: 'top' | 'bottom';
  hintIcon?: string;
  icon?: {
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
    size?: number;
  };
  iconRules?: Record<string, { weight?: IconWeight; size?: number }>;
  mainPageColumns?: 1 | 2 | 3 | 4;
  brandTheme?: 'default' | 'dark' | 'light';
}
```

| Property | Description | Default |
| -------- | ----------- | ------- |
| `helperTextPosition` | Position of helper/description text relative to form inputs | `"bottom"` |
| `hintIcon` | Icon name for hint/help tooltips on input labels (see available icons below) | `"Question"` |
| `icon.weight` | Global icon weight/style variant (see below) | `"regular"` |
| `icon.size` | Global default icon size in pixels | `24` |
| `iconRules` | Per-component icon style overrides | `{}` |
| `mainPageColumns` | Number of columns in the main page feature cards grid (1-4) | `2` |
| `brandTheme` | Theme variant for branded elements like the footer (`default`, `dark`, `light`) | `"default"` |

#### Icons

Soyio uses [Phosphor Icons](https://phosphoricons.com/), a flexible icon family with multiple weight variants. You can customize the icon appearance globally using the `config.icon` settings, or override icons for specific components using `config.iconRules`.

**Available icon weights:**

| Weight | Description |
| ------ | ----------- |
| `thin` | Thinnest stroke width |
| `light` | Light stroke width |
| `regular` | Default stroke width |
| `bold` | Bold stroke width |
| `fill` | Filled/solid icons |
| `duotone` | Two-tone icons with opacity |

**Global icon example:**

```javascript
const appearance = {
  config: {
    icon: {
      weight: "bold",
      size: 20,
    },
  },
};
```

**Per-component icon overrides:**

Use `iconRules` to customize icons for specific components. The key is the component name (e.g., `Alert`, `Switch`) or a variant-specific key (e.g., `Alert.error`):

> **Note:** For variant-specific icon rules, use dot notation (`Alert.error`) rather than the CSS double-dash syntax (`Alert--error`).

```javascript
const appearance = {
  config: {
    icon: {
      weight: "regular", // Global default
    },
    iconRules: {
      Alert: { weight: "fill" },           // All alerts use filled icons
      Switch: { weight: "bold", size: 16 }, // Switch icons are bold and smaller
      "Alert.error": { weight: "fill" },    // Error alerts specifically
    },
  },
};
```

**Hint icon customization:**

The hint icon appears next to input labels when a tooltip/hint is available. You can change which icon is displayed using `hintIcon`:

| Icon Name | Description |
| --------- | ----------- |
| `Question` | Question mark in circle (default) |
| `Info` | Information "i" icon |
| `QuestionMark` | Simple question mark |
| `Warning` | Warning/exclamation icon |

```javascript
const appearance = {
  config: {
    hintIcon: "Info", // Use info icon instead of question mark
  },
};
```

You can also style the hint icon using the `.HintIcon` rule (see [Supported rules](#supported-rules)).

### Variables

Use variables to adjust common visual attributes across all components.

```javascript
interface Variables {
  fontFamily?: string;
  fontFamilyBody?: string;
  fontFamilyTitle?: string;
  fontSizeBase?: string;
  colorPrimary?: string;
  colorPrimarySurface?: string;
  colorSecondary?: string;
  colorBackground?: string;
  colorSurface?: string;
  colorSurfaceMuted?: string;
  colorSurfaceStrong?: string;
  colorBorder?: string;
  colorBorderMuted?: string;
  colorSwitchBorder?: string;
  colorText?: string;
  colorTextSecondary?: string;
  colorTextSubtle?: string;
  colorTextInverted?: string;
  colorTextTitle?: string;
  colorLink?: string;
  colorInputFocus?: string;
  colorInputErrorFocus?: string;
  colorSelectArrow?: string;
  colorInfo?: string;
  colorInfoBg?: string;
  colorSuccess?: string;
  colorSuccessBg?: string;
  colorWarning?: string;
  colorWarningBg?: string;
  colorDanger?: string;
  colorDangerBg?: string;
  colorOverlay?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
}
```

#### Available Variables

| Variable          | Description                              | Default                   |
| ----------------- | ---------------------------------------- | ------------------------- |
| `fontFamily`          | Base font stack (fallback for body and title)          | `"system-ui, sans-serif"` |
| `fontFamilyBody`      | Font stack for body/paragraph text (falls back to `fontFamily`) | `var(--fontFamily)` |
| `fontFamilyTitle`     | Font stack for titles and headings (falls back to `fontFamily`) | `var(--fontFamily)` |
| `fontSizeBase`        | Base font size for text                                 | `"1rem"`                  |
| `colorPrimary`        | Primary color for interactive elements                  | `"#0570DE"`               |
| `colorPrimarySurface` | Background color for primary elements (e.g. active tab) | `"#EEF2FF"`               |
| `colorSecondary`      | Secondary color for interactive elements                | `"#A180F0"`               |
| `colorBackground`     | Background color                                        | `"#FFFFFF"`               |
| `colorSurface`        | Surface color for cards and sections                    | `"#F9FAFB"`               |
| `colorSurfaceMuted`   | Muted surface color                                     | `"#F3F4F6"`               |
| `colorSurfaceStrong`  | Strong surface color                                    | `"#E5E7EB"`               |
| `colorBorder`         | Border color                                            | `"#D1D5DB"`               |
| `colorBorderMuted`    | Muted border color                                      | `"#E5E7EB"`               |
| `colorSwitchBorder`   | Border color for Switch component (unchecked)           | `"#000000"`               |
| `colorText`           | Main text color                                         | `"#1E1B4B"`               |
| `colorTextSecondary`  | Secondary text color                                    | `"#6B7280"`               |
| `colorTextSubtle`     | Subtle text color                                       | `"#9CA3AF"`               |
| `colorTextInverted`   | Inverted text color                                     | `"#FFFFFF"`               |
| `colorTextTitle`      | Title/heading text color (falls back to `colorText`)    | `var(--colorText)`        |
| `colorLink`           | Color for link elements                                 | `"#0570DE"`               |
| `colorInputFocus`     | Focus border/ring color for input elements              | `"#0570DE"`               |
| `colorInputErrorFocus`| Focus border/ring color for input elements in error state | `"#EF4444"`             |
| `colorSelectArrow`    | Color for select dropdown arrow icon                    | `"#6B7280"`               |
| `colorInfo`           | Info status color                                       | `"#1E40AF"`               |
| `colorInfoBg`         | Info status background color                            | `"#E0E7FF"`               |
| `colorSuccess`        | Success status color                                    | `"#15803D"`               |
| `colorSuccessBg`      | Success status background color                         | `"#DCFCE7"`               |
| `colorWarning`        | Warning status color                                    | `"#B45309"`               |
| `colorWarningBg`      | Warning status background color                         | `"#FEF3C7"`               |
| `colorDanger`         | Danger status color                                     | `"#EF4444"`               |
| `colorDangerBg`       | Danger status background color                          | `"#FEF2F2"`               |
| `colorOverlay`        | Overlay color                                           | `"rgba(0, 0, 0, 0.5)"`    |
| `borderRadius`        | Base border radius (scales proportionally for different sizes) | `"0.25rem"`               |
| `borderWidth`         | Border width for elements                               | `"1px"`                   |
| `borderStyle`         | Border style for elements                               | `"solid"`                 |

> **Note on Border Radius:** The `borderRadius` variable serves as a base unit. Larger components (like Inputs and Buttons) use a multiple of this value (typically 2x), while smaller elements use a fraction or the base value itself. This ensures consistent scaling across all UI elements.

### Rules

The `rules` object allows you to apply custom CSS to specific elements. Soyio supports styling for various components including inputs, buttons, switches, and more.

#### Supported rules

The rules are grouped by component category. Most rules support **pseudo-classes** and **pseudo-elements** that can be appended to style different states:

**Supported pseudo-classes:**
- `:hover` - When the element is hovered
- `:focus` - When the element is focused
- `:active` - When the element is active/pressed
- `:disabled` - When the element is disabled
- `:autofill` - When the input is autofilled
- `:focus-visible` - When focused via keyboard navigation

**Supported pseudo-elements:**
- `::placeholder` - Placeholder text in inputs
- `::selection` - Selected text

**Example usage:**
```javascript
rules: {
  ".Button": { backgroundColor: "blue" },           // Base style
  ".Button:hover": { backgroundColor: "darkblue" }, // Hover state
  ".Button:disabled": { opacity: "0.5" },           // Disabled state
  ".Input::placeholder": { color: "gray" },         // Placeholder text
  ".RadioCard:hover": { borderColor: "var(--colorPrimary)" }, // Card hover
}
```

##### Layout
- `.MainContainer` - The main container.
- `.Card` - Card containers.
- `.CardTitle` - Card title text.
- `.Dialog` - Dialog containers.
- `.DialogOverlay` - Dialog overlays.
- `.DialogContent` - Dialog content areas.

##### Typography
- `.Title` - Title text (base class for all titles).
- `.StepTitle` - Step indicator title text (also inherits from `.Title`).
- `.Description` - Description text.

##### Inputs
- `.Input` - Input fields.
- `.Input--error` - Input fields in error state.
- `.Label` - Labels.
- `.HintIcon` - Hint/help icons next to input labels.
- `.TextArea` - Text area inputs.
- `.Select` - Select dropdowns.
- `.Combobox` - Combobox inputs.
- `.NinInput` - Styles the input field for national identity numbers.
- `.TrackingCodeInput` - Styles the tracking code input component.
- `.TrackingCodeInputCell` - Styles individual cells in the tracking code input.
- `.TrackingCodeInputSeparator` - Styles the separator between tracking code cells.

##### Buttons & Links
- `.Button` - The button component.
- `.Link` - Links.

##### Selection Controls

**Checkbox**
![Checkbox Appearance](https://soyio-public-assets.s3.us-east-1.amazonaws.com/checkbox-appearance.webp)

- `.Checkbox` - The checkbox container.
- `.CheckboxInput` - The styled checkbox element (supports `borderRadius`, `borderColor`, `backgroundColor`).
- `.CheckboxLabel` - The checkbox label.
- `.CheckboxCheck` - The checkmark icon inside the checkbox.
- `.CheckboxInput--checked` - The checked state of the checkbox.


**Radio**
- `.Radio` - Radio button containers.
- `.RadioButton` - The radio button element (the clickable circle).
- `.RadioButton--checked` - Checked state of the radio button.
- `.RadioIndicator` - The inner indicator point of the radio button.
- `.RadioIndicator--checked` - Checked state of the radio indicator (visible when selected).
- `.RadioLabel` - Radio button labels.

**Switch**
- `.Switch` - Switch toggles (wrapper).
- `.SwitchRoot` - Switch control (track).
- `.SwitchThumb` - Switch thumb (circle).
- `.SwitchIcon` - Switch icons (check/cross).
- `.SwitchRoot--checked` - Checked state of the switch track
- `.SwitchThumb--checked` - Checked state of the switch thumb

**Radio Card**
- `.RadioCard` - Styles the wrapper card element of a radio card item.
- `.RadioCard--checked` - Checked state of the radio card.
- `.RadioCardButton` - The radio button element inside a radio card.
- `.RadioCardButton--checked` - Checked state of the radio card button.
- `.RadioCardIndicator` - The inner indicator point inside a radio card.
- `.RadioCardIndicator--checked` - Checked state of the radio card indicator.
- `.RadioCardTitle` - The title text inside a radio card (also inherits from `.CardTitle`).

> **Note:** `.RadioCardTitle` elements also have the `.CardTitle` class, so you can style all card titles together with `.CardTitle` and override specifically for radio cards with `.RadioCardTitle`.

##### Step Indicator

The step indicator shows progress through multi-step forms.

- `.StepIndicatorContainer` - The container wrapping all step indicators.
- `.StepIndicator` - Individual step indicator item.
- `.StepIndicator--active` - The currently active step.
- `.StepIndicator--completed` - Steps that have been completed.
- `.StepIndicator--pending` - Steps that are not yet reached.
- `.StepIndicatorLine` - The connecting line between steps.
- `.StepIndicatorLine--top` - The line segment above a step indicator.
- `.StepIndicatorLine--bottom` - The line segment below a step indicator.
- `.StepIndicatorIcon` - Icon displayed inside a step indicator (for completed steps).
- `.StepIndicatorDot` - The dot marker in a step indicator.
- `.StepIndicatorNumber` - The step number displayed in the indicator.

##### Feedback
- `.Loader` - Loading indicators.
- `.ErrorMessage` - Error message text.
- `.TooltipContent` - Styles the content popover of a tooltip.

**Alert**
- `.Alert` - Alert boxes.
- `.Alert--error` - Error alert variant.
- `.Alert--warning` - Warning alert variant.
- `.Alert--info` - Information alert variant.
- `.Alert--success` - Success alert variant.
- `.AlertIcon` - The icon inside an alert.
- `.AlertContent` - The content/text area inside an alert.

**Chip**
- `.Chip` - Chips/Tags.
- `.Chip--info` - Info chip variant.
- `.Chip--green` - Green chip variant.
- `.Chip--red` - Red chip variant.
- `.Chip--amber` - Amber chip variant.

##### Consent Components

The following rules are specific to the **Consent Box** widget and allow customization of consent-related UI elements:

- `.CategoryTag` - Data use category identifier (e.g., "Compartir datos con terceros"). Appears above category descriptions in expanded consent views.
- `.Badge` - Optional/required label badge appearing on consent items.

> **Note:** These consent-specific rules are only available in the `ConsentBox` widget and will have no effect in other widgets like `PrivacyCenterBox`.

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
    ".SwitchRoot": {
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
      boxShadow: "none", // Remove default shadow
    },
    ".SwitchRoot--checked": {
      backgroundColor: "var(--colorPrimary)",
    },
    ".SwitchThumb": {
      backgroundColor: "white",
      borderRadius: "9999px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    ".SwitchIcon": {
      display: "none", // Hide the check/cross icons
    },
  },
  config: {
    helperTextPosition: "top", // Position helper text above inputs
  },
};
```

## TypeScript

The `SoyioTypes` module from the `@soyio/soyio-widget` package provides TypeScript type definitions that you can use to integrate the SoyioWidget more seamlessly into your TypeScript projects.

To use the `SoyioTypes` in your project, import it directly from the `@soyio/soyio-widget` package:

```javascript
import type { SoyioTypes } from "@soyio/soyio-widget";
```

## JSON Schema Validation

The package includes JSON Schemas for validating configuration objects. This is useful for:
- **IDE Autocomplete**: Get IntelliSense in your editor when writing configurations
- **Runtime Validation**: Validate user-provided configurations before passing to the widget
- **Documentation**: Use schemas to generate API documentation

### Available Schemas

#### Appearance Schema
Validates appearance customization objects (theme, variables, rules, config):

```javascript
// Import the schema
import appearanceSchema from "@soyio/soyio-widget/schemas/appearance";

// Use with a validator like Ajv
import Ajv from "ajv";
const ajv = new Ajv();
const validate = ajv.compile(appearanceSchema);

const appearance = {
  theme: "night",
  variables: {
    colorPrimary: "#007bff",
    borderRadius: "8px"
  }
};

if (validate(appearance)) {
  console.log("✅ Valid appearance config");
} else {
  console.error("❌ Invalid:", validate.errors);
}
```

#### Config Schema
Validates complete widget configuration including Privacy Center and Consent Box options:

```javascript
import configSchema from "@soyio/soyio-widget/schemas/config";

const validate = ajv.compile(configSchema);
const config = {
  companyId: "com_example",
  appearance: { /* ... */ },
  onEvent: (event) => console.log(event)
};

if (validate(config)) {
  const privacyCenter = new PrivacyCenterBox(config);
  privacyCenter.mount("#container");
}
```

### Using Schemas with Monaco Editor

Perfect for building configuration editors:

```javascript
import * as monaco from "monaco-editor";
import configSchema from "@soyio/soyio-widget/schemas/config";

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas: [{
    uri: "https://soyio.id/widget-config.json",
    fileMatch: ["*"],
    schema: configSchema
  }]
});
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

## Development

To run the widget customization smoke test locally:

```sh
yarn run smoke
```

The smoke test configuration is loaded from `smoke-test/.env.development`. You can modify this file to change the default values:

```bash
VITE_COMPANY_ID=com_test
VITE_PRIVACY_CENTER_URL=http://localhost:5173
VITE_CONSENT_URL=http://localhost:5173
VITE_CONSENT_TEMPLATE_ID=constpl_test
```

### Presets Management

The smoke test includes preset management functionality that allows you to save, load, and share widget configurations:

- **Save Presets**: Save your current widget configuration with a custom name
- **Load Presets**: Quickly switch between saved configurations
- **Export Presets**: Download all presets as a JSON file for backup or sharing
- **Import Presets**: Load presets from a previously exported JSON file

All presets are automatically saved to your browser's localStorage. Use the export feature to persist presets to disk and share them with your team. See [smoke-test/PRESETS.md](./smoke-test/PRESETS.md) for detailed documentation.
