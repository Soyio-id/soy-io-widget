import * as listeners from './listeners';
import type {
  ConfigProps,
  EventData,
  Flow,
  WidgetConfig,
} from './types';
import { showPopUp } from './widget';

class Widget {
  private flow: Flow;
  private configProps: Partial<ConfigProps>;
  private onEvent: (data: EventData) => void;
  private isSandbox: boolean;

  constructor(options: WidgetConfig) {
    this.flow = options.flow;
    this.configProps = options.configProps;
    this.onEvent = options.onEvent;
    this.isSandbox = options.isSandbox ?? false;

    this.validateProps();

    showPopUp(
      this.flow,
      this.configProps,
      this.isSandbox,
      options.developmentUrl,
    );

    listeners.setListeners({
      onEvent: this.#triggerEvent.bind(this),
    });
  }

  validateProps() {
    if (this.flow === 'authenticate') {
      if (!this.configProps.identityId) throw new Error('identityId is required');
      if (!this.configProps.companyId) throw new Error('companyId is required');
    } else if (this.flow === 'register') {
      if (!this.configProps.flowTemplateId) throw new Error('flowTemplateId is required');
      if (!this.configProps.companyId) throw new Error('companyId is required');
    }
  }

  #triggerEvent(data: EventData) {
    this.onEvent(data);
  }
}

export default Widget;
