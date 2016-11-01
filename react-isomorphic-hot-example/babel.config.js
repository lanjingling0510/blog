module.exports = {
    dev_client: {
        "presets": [
            ["es2015", {
                "modules": false
            }], "stage-0", "react"
        ],
        "plugins": [
            "react-hot-loader/babel",
            "transform-decorators-legacy",
        ],
    },

    dev_server: {
        "presets": ["react"],
        "plugins": [
            "transform-async-to-generator",
            "transform-export-extensions",
            "transform-es2015-modules-commonjs",
            "transform-object-rest-spread",
            "transform-class-properties",
            "transform-decorators-legacy",
        ],
    },

    production_client: {
        'presets': [
            ["es2015", {
                "modules": false
            }], "stage-0", "react"
        ],
        "plugins": ["transform-decorators-legacy"],
    },

    production_server: {
        "presets": ["react"],
        "plugins": [
            "transform-async-to-generator",
            "transform-export-extensions",
            "transform-es2015-modules-commonjs",
            "transform-object-rest-spread",
            "transform-class-properties",
            "transform-decorators-legacy",
        ],
    }
};
