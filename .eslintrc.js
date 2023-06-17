module.exports = {
    ...require('@lobehub/lint').eslint,
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'no-undef': 0,
                'unicorn/prefer-add-event-listener': 0,
            },
        },
    ],
};
