import { mountIframeToDOM } from './widget';
import { onMounted } from './listeners';
import { setReady, configUser } from './events';

interface WidgetProps {
  userEmail?: string
}
class Widget {
  private iframe: HTMLIFrameElement;
  userEmail?: string;

  constructor({ userEmail }: WidgetProps) {
    this.iframe = mountIframeToDOM();
    this.userEmail = userEmail;

    onMounted(this.initialize.bind(this));
  }

  initialize() {
    if (this.userEmail) configUser(this.iframe, this.userEmail);
    setReady(this.iframe);
  }
}

export default Widget;
