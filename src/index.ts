import { mountIframeToDOM, removeWidget } from './widget';
import * as listeners from './listeners';
import { setReady, setConfig } from './events';

class Widget {
  private iframe: HTMLIFrameElement;
  private flow: Flow;
  private configProps: Partial<ConfigProps>;
  private onEvent: (data: EventData) => void;

  // eslint-disable-next-line max-params
  constructor(
    flow: Flow,
    configProps: ConfigProps,
    onEvent: (data: any) => void,
    developmentUrl?: string,
  ) {
    this.flow = flow;
    this.configProps = configProps;
    this.onEvent = onEvent;

    if (!this.propsAreValid()) {
      throw new Error('Invalid props');
    }

    this.iframe = mountIframeToDOM(flow, configProps, developmentUrl);

    listeners.setListeners({
      configure: this.#initialize.bind(this),
      onEvent: this.#triggerEvent.bind(this),
    });
  }

  #initialize() {
    setReady(this.iframe);
    setConfig(this.iframe, this.configProps);
  }

  propsAreValid() {
    if (this.flow === 'authenticate') {
      return this.configProps.companyId && this.configProps.identityId;
    } else if (this.flow === 'register') {
      return this.configProps.companyId && this.configProps.flowTemplateId;
    }

    return false;
  }

  #triggerEvent(data: EventData) {
    this.onEvent(data);
  }

  close() {
    removeWidget();
  }
}

// eslint-disable-next-line import/no-default-export
export default Widget;
