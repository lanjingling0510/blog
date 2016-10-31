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
            [
                "async-function-time", {
                    "report": "(durning) => console.log('%sms', durning)",
                    "promise": ["fetchGet"]
                }
            ]
        ],
        "ignore": [
            "src/client/js/noParse/*.js"
        ]
    },

    dev_server: {
        "presets": ["stage-0", "react"],
        "plugins": [
            "transform-es2015-modules-commonjs",
            "transform-object-rest-spread",
            "transform-class-properties",
            "transform-decorators-legacy",
        ],
        "ignore": [
            "src/client/js/noParse/*.js"
        ]
    },

    production_client: {
        'presets': [
            ["es2015", {
                "modules": false
            }], "stage-0", "react"
        ],
        "plugins": ["transform-decorators-legacy"],
        "ignore": [
            "src/client/js/noParse/*.js"
        ]
    },

    production_server: {
        "presets": ["stage-0", "react"],
        "plugins": [
            "transform-es2015-modules-commonjs",
            "transform-object-rest-spread",
            "transform-class-properties",
            "transform-decorators-legacy",
        ],
        "ignore": [
            "src/client/js/noParse/*.js"
        ]
    }
};
