import { it, expect, describe, beforeEach } from 'vitest';
import { mountIframeToDOM } from '../src/widget';
import { DEVELOPMENT_WIDGET_URL, CONTAINER_ID } from '../src/constants';

describe('widget', () => {
  describe('when div does not exists', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });
    it('Throw error', () => {
      expect(() => mountIframeToDOM()).toThrowError('Iframe container does not exist');
    });
  });

  describe('when div exists', () => {
    beforeEach(() => {
      document.body.innerHTML = `<div id="${CONTAINER_ID}"></div>`;
    });
    it('does mount iframe', () => {
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
