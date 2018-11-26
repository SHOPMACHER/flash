import Flash from './Flash';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import createBasicMarkup from './__fixtures__/basic.markup';
import createHideAfterMarkup from './__fixtures__/hide-after.markup';

describe('Flash class', () => {
    let window = null;
    let instance = null;

    beforeAll(() => {
        window = createBasicMarkup();
        const { document } = window;

        const flashScript = readFileSync(resolve(__dirname, '../dist/sm-flash.js'));
        const $script = document.createElement('script');
        $script.textContent = flashScript;
        document.head.appendChild($script);

        const $root = document.querySelector('.sm-flash');
        instance = new Flash($root);
    });

    afterAll(() => {
        instance = null;
    });

    it('exposes static init method', () => {
        expect(typeof Flash.init).toBe('function');
    });

    it('creates an array of instances', () => {
        const instances = window.SmFlash.init();
        expect(Array.isArray(instances)).toBe(true);
        expect(instances.shift() instanceof window.SmFlash).toBe(true);
    });

    it('creates a new instance', () => {
        expect(instance instanceof Flash).toBe(true);
    });

    it('exposes instance method `show`', () => {
        expect(typeof instance.show).toBe('function');
    });

    it('exposes instance method `hide`', () => {
        expect(typeof instance.hide).toBe('function');
    });

    it('exposes instance method `getRef`', () => {
        expect(typeof instance.getRef).toBe('function');
    });
});

describe('No parameters', () => {
    let $root = null;
    let window = null;
    let instance = null;

    beforeEach(() => {
        window = createBasicMarkup();
        const { document } = window;
        $root = document.querySelector('.sm-flash');
        instance = new Flash($root);
    });

    afterEach(() => {
        $root = null;
        instance = null;
    });

    it('adds `visible` class to root element', () => {
        const contains = $root.classList.contains('visible');
        expect(contains).toBe(true);
    });

    it('adds `visible` class, when `show` is called', () => {
        $root.classList.remove('visible');

        window.requestAnimationFrame = () => {

        };

        instance.show();

    });

    it('removes `visible` class, when `hide` is called', () => {
        instance.hide();
        const contains = $root.classList.contains('visible');
        expect(contains).toBe(false);
    });
});

describe('Hide after attribute', () => {
    let $root = null;

    beforeEach(() => {
        const { document } = createHideAfterMarkup();
        $root = document.querySelector('.sm-flash');
    });

    afterEach(() => {
        $root = null;
    });

    it('throws TypeError if hide after is not a number', () => {
        $root.setAttribute('data-hide-after', 'test');

        try {
            new Flash($root);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});

describe('Create method', () => {
    let instance = null;
    let configuredInstance = null;

    beforeAll(() => {
        instance = Flash.create('a message');
        configuredInstance = Flash.create('a message', {
            closable: true,
            hideAfter: 2000,
        });
    });

    afterAll(() => {
        instance = null;
    });

    it('returns a new flash instance', () => {
        expect(instance instanceof Flash).toBe(true);
    });

    it('renders a valid DOM root element', () => {
        const $root = instance.getRef();
        const hasFlashClass = $root.classList.contains('sm-flash');
        expect(hasFlashClass).toBe(true);
    });

    it('renders an inner wrapper', () => {
        const $innerWrapper = instance.getRef().querySelector('.inner-wrapper');
        expect($innerWrapper).toBeDefined();
    });

    it('renders a message into the inner wrapper', () => {
        const $innerWrapper = instance.getRef().querySelector('.inner-wrapper');
        expect($innerWrapper.innerHTML).toContain('message');
    });

    it('has a correct attribute for closing', () => {
        const $root = configuredInstance.getRef();
        expect($root.getAttribute('data-closable')).toBe('true');
    });

    it('has a correct attribute for time to hide', () => {
        const $root = configuredInstance.getRef();
        expect($root.getAttribute('data-hide-after')).toBe('2000');
    });
});
