'use strict';

class StoreProxy extends Proxy {
  static get ACTION_ADD_TO_BREEZE() { return 'add-to-breeze'; }
  static get APIs() {
    return super.APIs.concat([
      'chrome.management',
      'chrome.webstorePrivate',
    ]);
  }

  constructor() {
    super();
    chrome.runtime.onMessage.addListener(action => this.onMessage_(action));
  }

  static get SCRIPTS() {
    return super.SCRIPTS.concat([
      '/api/app.js',
      '/content/inject/store_page.js',
    ]);
  }

  dispatchAddToBreeze_() {
    try {
      const buttonLabel = document.querySelector(
          '[role=dialog] [role=button] .webstore-test-button-label');
      const button = buttonLabel.closest('[role=button]');
      button.click();
    } catch (e) {
      // if any error then wait for fallback
    }
  }

  onMessage_(action) {
    if (action === this.constructor.ACTION_ADD_TO_BREEZE) {
      this.dispatchAddToBreeze_();
    }
  }
}

new StoreProxy();
