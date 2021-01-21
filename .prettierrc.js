module.exports = {
    trailingComma: 'es5',
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    printWidth: 100,
    overrides: [
        {
            files: '.mock',
            options: { parser: 'json' },
        },
    ],
    jsxBracketSameLine: false,
}