import DisclosureRequestBox from './embedded';
import * as Listeners from './listeners';
import { showPopUp } from './popup';
import * as SoyioTypes from './types';

import { isBrowser } from '@/utils';

class SoyioWidget {
  private onEvent: (data: SoyioTypes.EventData) => void;

  constructor(options: SoyioTypes.RequestConfig) {
    this.onEvent = options.onEvent;

    if (isBrowser) {
      showPopUp(options);

      Listeners.setListeners({
        onEvent: this.#triggerEvent.bind(this),
      });
    }
  }

  #triggerEvent(data: SoyioTypes.EventData) {
    this.onEvent(data);
  }
}

export default SoyioWidget;
export { DisclosureRequestBox, SoyioWidget, SoyioTypes };
