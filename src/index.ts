import * as listeners from './listeners';
import * as SoyioTypes from './types';
import { showPopUp } from './widget';

class Widget {
  private flow: SoyioTypes.Flow;
  private configProps: SoyioTypes.ConfigProps;
  private onEvent: (data: SoyioTypes.EventData) => void;
  private isSandbox: boolean;

  constructor(options: SoyioTypes.WidgetConfig) {
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
      this.configProps = this.configProps as SoyioTypes.AuthAttemptProps;
      if (!this.configProps.identityId) throw new Error('identityId is required');
      if (!this.configProps.companyId) throw new Error('companyId is required');
    } else if (this.flow === 'register') {
      this.configProps = this.configProps as SoyioTypes.ValidationAttemptProps;
      if (!this.configProps.flowTemplateId) throw new Error('flowTemplateId is required');
      if (!this.configProps.companyId) throw new Error('companyId is required');
    }
  }

  #triggerEvent(data: SoyioTypes.EventData) {
    this.onEvent(data);
  }
}

export default Widget;
export { SoyioTypes };
