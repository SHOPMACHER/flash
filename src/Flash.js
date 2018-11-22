export default class Flash {
    constructor($root) {
        this.$root = $root;

        if (this.$root.getAttribute('data-closable') === 'true') {
            const $closeIcon = document.createElement('div');
            $closeIcon.classList.add('close-icon');
            this.$root.appendChild($closeIcon);

            $closeIcon.addEventListener('click', this.hide.bind(this));
        }

        const hideAfter = parseInt(this.$root.getAttribute('data-hide-after'), 10);
        if (!Number.isNaN(hideAfter)) {
            setTimeout(this.hide.bind(this), hideAfter);
        } else {
            throw new TypeError(`data-hide-after has to be of type number, but has value '${hideAfter}'`);
        }

        this.$root.addEventListener('show', this.show.bind(this));
        this.$root.addEventListener('hide', this.hide.bind(this));

        this.show();
    }

    show() {
        this.$root.classList.add('visible');
    }

    hide() {
        this.$root.classList.remove('visible');
    }

    static init() {
        const $flashes = document.querySelectorAll('.sm-flash');

        return Array.prototype.map.call($flashes, $flash => {
            return new Flash($flash);
        });
    }
}
