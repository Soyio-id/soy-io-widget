import { mountIframeToDOM, removeWidget } from './widget';
import * as listeners from './listeners';
import { setReady, setConfig } from './events';

class Widget {
  private iframe: HTMLIFrameElement;
  private flow: Flow;
  private configProps: Partial<ConfigProps>;
  private onEvent: (data: EventData) => void;
  private isSandbox: boolean;

  // eslint-disable-next-line max-params
  constructor(options: WidgetConfig) {
    this.flow = options.flow;
    this.configProps = options.configProps;
    this.onEvent = options.onEvent;
    this.isSandbox = options.isSandbox ?? false;

    this.validateProps();

    this.iframe = mountIframeToDOM(
      this.flow,
      this.configProps,
      this.isSandbox,
      options.developmentUrl,
    );

    listeners.setListeners({
      configure: this.#initialize.bind(this),
      onEvent: this.#triggerEvent.bind(this),
    });
  }

  #initialize() {
    setReady(this.iframe);
    setConfig(this.iframe, this.configProps);
  }

  // eslint-disable-next-line complexity
  validateProps() {
    if (this.flow === 'authenticate') {
      if (!this.configProps.identityId) throw new Error('identityId is required');
      if (!this.configProps.companyId) throw new Error('companyId is required');
    } else if (this.flow === 'register') {
      if (!this.configProps.flowTemplateId) throw new Error('flowTemplateId is required');
      if (!this.configProps.companyId) throw new Error('companyId is required');
    }

    return;
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
