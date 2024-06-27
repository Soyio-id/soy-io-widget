import * as listeners from './listeners';
import * as SoyioTypes from './types';
import { showPopUp } from './widget';

class SoyioWidget {
  private onEvent: (data: SoyioTypes.EventData) => void;

  constructor(options: SoyioTypes.AttemptConfig) {
    this.onEvent = options.onEvent;

    showPopUp(options);

    listeners.setListeners({
      onEvent: this.#triggerEvent.bind(this),
    });
  }

  #triggerEvent(data: SoyioTypes.EventData) {
    this.onEvent(data);
  }
}

export default SoyioWidget;
export { SoyioWidget, SoyioTypes };
