import Flash from './Flash';

import createBasicMarkup from './__fixtures__/basic.markup';

describe('Flash class', () => {
    let instance = null;

    beforeAll(() => {
        const { document } = createBasicMarkup();
        const $root = document.querySelector('.sm-flash');
        instance = new Flash($root);
    });

    afterAll(() => {
        instance = null;
    });

    it('exposes static init method', () => {
        expect(typeof Flash.init).toBe('function');
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
});

describe('No parameters', () => {
    let $root = null;
    let instance = null;

    beforeEach(() => {
        const { document } = createBasicMarkup();
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
        instance.show();
        const contains = $root.classList.contains('visible');
        expect(contains).toBe(true);
    });

    it('removes `visible` class, when `hide` is called', () => {
        instance.hide();
        const contains = $root.classList.contains('visible');
        expect(contains).toBe(false);
    });
});
