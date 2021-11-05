(function () {
    'use strict';
    window.addEventListener('load', () => {
        const forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, form => {
            form.addEventListener('submit', event => {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                const mandatoryFields = form.getElementsByClassName('need-required');
                Array.prototype.filter.call(mandatoryFields, field => {
                    if (!field.getElementsByClassName('form-control')[0]?.value && !field.getElementsByClassName('form-select')[0]?.value) {
                        field.getElementsByTagName('label')[0].classList.add('required');
                    }
                });
            }, false);
        });
    }, false);
})();