import { JSDOM } from 'jsdom';

const { window } = new JSDOM(`
  <div class="sm-flash" data-hide-after="2000">
    <div class="inner-wrapper">
      This is a flash message.
    </div>
  </div>
`);

export default () => window;
