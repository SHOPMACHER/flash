import { JSDOM } from 'jsdom';

export default (beforeParse) => {
    const { window } = new JSDOM(
        `
          <div class="sm-flash">
            <div class="inner-wrapper">
              This is a flash message.
            </div>
          </div>
        `,
        {
            runScripts: 'dangerously',
            beforeParse,
        },
    );

    return window;
};
