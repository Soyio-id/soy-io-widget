import { it, expect, describe, beforeEach } from 'vitest';
import { mountIframeToDOM } from '../src/widget';
import { DEVELOPMENT_WIDGET_URL, IFRAME_ID } from '../src/constants';

describe('widget', () => {
  describe('when iframe does not exists', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });
    it('Throw error', () => {
      expect(() => mountIframeToDOM()).toThrowError('Iframe does not exist');
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
  });
});
