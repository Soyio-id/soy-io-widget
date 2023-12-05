import { it, expect, describe, beforeEach } from 'vitest';
import { mountIframeToDOM } from '../src/widget';
import { DEVELOPMENT_WIDGET_URL, IFRAME_ID } from '../src/constants';

describe('widget', () => {
  describe('when iframe does not exists', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    it('mounts iframe to DOM', () => {
      const iframe = mountIframeToDOM();
      expect(iframe).not.toBe(null);
    });
    it('adds iframe source', () => {
      const iframe = mountIframeToDOM();
      expect(iframe?.src).toBe(DEVELOPMENT_WIDGET_URL);
    });
    it('adds iframe id', () => {
      const iframe = mountIframeToDOM();
      expect(iframe?.id).toBe(IFRAME_ID);
    });
  });

  describe('when iframe exists', () => {
    beforeEach(() => {
      document.body.innerHTML = `<iframe id="${IFRAME_ID}"></iframe>`;
    });
    it('does not mount iframe', () => {
      mountIframeToDOM();
      const createdIframes = document.querySelectorAll('iframe');
      expect(createdIframes.length).toBe(1);
    });
    it('adds iframe source', () => {
      const iframe = mountIframeToDOM();
      expect(iframe.src).toBe(DEVELOPMENT_WIDGET_URL);
    });
    it('adds iframe id', () => {
      const iframe = mountIframeToDOM();
      expect(iframe.id).toBe(IFRAME_ID);
    });
  });
});
