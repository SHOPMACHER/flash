import { JSDOM } from 'jsdom';

const { window } = new JSDOM(
    `
  <div class="sm-flash">
    <div class="inner-wrapper">
      This is a flash message.
    </div>
  </div>
`,
    { runScripts: 'dangerously' },
);

export default () => window;
