import { mountIframeToDOM } from './widget';

const soyioWidget = {
  create() {
    return mountIframeToDOM();
  },
};

export default soyioWidget;
