export default {
    '*.{js,html,ts,mts,mjs,vue}': [
        'yarn eslint --fix',
    ],
    '*.php': [
        'composer run-script php-cs-fixer-risky -- --dry-run --diff',
        'composer run-script php-cs-fixer',
        'composer run-script phpstan',
    ],
    'docs/api/endpoint-*/*.yml': [
        'npx @redocly/cli@1.x lint',
    ],
};
