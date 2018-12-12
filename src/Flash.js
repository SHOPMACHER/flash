/**
 * Flash message that can be initialized with a DOM element.
 *
 * @property {HTMLElement} $root
 */
class Flash {
    /**
     * Creates a new instance of the Flash class using a reference to the
     * root element inside the DOM.
     *
     * @param $root {HTMLElement} DOM root element
     */
    constructor($root) {
        this.$root = $root;

        if (this.$root.getAttribute('data-closable') === 'true') {
            const $closeIcon = document.createElement('div');
            $closeIcon.classList.add('close-icon');
            this.$root.appendChild($closeIcon);

            $closeIcon.addEventListener('click', this.hide.bind(this));
        }

        const hideAfterAttribute = this.$root.getAttribute('data-hide-after');
        if (hideAfterAttribute) {
            const hideAfter = parseInt(
                this.$root.getAttribute('data-hide-after'),
                10,
            );

            if (!isNaN(hideAfter)) {
                setTimeout(this.hide.bind(this), hideAfter);
            } else {
                throw new TypeError(
                    `data-hide-after has to be of type number, but has value '${hideAfter}'`,
                );
            }
        }

        this.$root.addEventListener('show', this.show.bind(this));
        this.$root.addEventListener('hide', this.hide.bind(this));

        this.show();
    }

    /**
     * Shows the flash message.
     */
    show() {
        window.requestAnimationFrame(() => {
            this.$root.classList.add('visible');
        });
    }

    /**
     * Hides the flash message.
     */
    hide() {
        window.requestAnimationFrame(() => {
            this.$root.classList.remove('visible');
        });
    }

    /**
     * Returns the DOM root element of the flash instance.
     *
     * @returns {HTMLElement} DOM root element
     */
    getRef() {
        return this.$root;
    }

    /**
     * Initializes all elements with the class `.sm-flash` as a Flash instance
     * and returns all instances as an array.
     *
     * @returns {Flash[]} Array of Flash messages
     */
    static init() {
        const $flashes = document.querySelectorAll('.sm-flash');
        return Array.prototype.map.call($flashes, $flash => new Flash($flash));
    }

    /**
     * Creates a new flash instance programatically.
     *
     * @typedef {object} FlashOptions
     * @property {bool} [closable]
     * @property {number} [hideAfter]
     * @property {HTMLElement} [appendTo]
     *
     * @param {string} message
     * @param {FlashOptions} options
     * @returns {Flash} Flash message instance
     */
    static create(message, options = {}) {
        const $flashElement = document.createElement('div');
        $flashElement.classList.add('sm-flash');

        const $innerWrapper = document.createElement('div');
        $innerWrapper.classList.add('inner-wrapper');
        $innerWrapper.innerHTML = message;
        $flashElement.appendChild($innerWrapper);

        if (options.closable) {
            $flashElement.setAttribute('data-closable', 'true');
        }

        if (options.hideAfter) {
            $flashElement.setAttribute(
                'data-hide-after',
                options.hideAfter.toString(),
            );
        }

        if (options.appendTo instanceof HTMLElement) {
            options.appendTo.appendChild($flashElement);
        }

        return new Flash($flashElement);
    }
}

export default Flash;
