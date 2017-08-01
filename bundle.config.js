module.exports = {
    bundle: {
        bundle: {
            scripts: [
                './assets/vendor/jquery.min.js',
                './assets/sass/mdl/mdlComponentHandler.js',
                './assets/sass/mdl/layout/layout.js',
                './assets/sass/mdl/button/button.js',
                './assets/sass/mdl/menu/menu.js',
                './assets/vendor/waves/waves.min.js',
                './assets/js/es6.js',
                './assets/js/main.js'
            ],
            styles: [
                './assets/css/bootstrap4/scss/bootstrap-grid.css',
                './assets/vendor/waves/waves.css',
                './assets/css/main.css'
            ],
            options: {
                rev: false
            }
        }
    }
};