/**
 * Flash message that can be initialized with a DOM element.
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

            if (!Number.isNaN(hideAfter)) {
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
        this.$root.classList.add('visible');
    }

    /**
     * Hides the flash message.
     */
    hide() {
        this.$root.classList.remove('visible');
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
}

export default Flash;
