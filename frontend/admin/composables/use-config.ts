/**
 * ATTENTION:
 * Do not use the `@admin` or any alias path when import modules in this file.
 * Because this composable is also used in `nuxt.config.js`,
 * where the alias import paths have not been defined yet,
 * and therefore the importing will fail.
 */
import { cloneDeep } from 'lodash-es';

import sharedConfigBase from '../config/shared.json';
import type { ApiEndpoint } from '../models/base';

const sharedConfig = cloneDeep(sharedConfigBase);

type ApiEndpoints = Record<keyof typeof sharedConfig.api_endpoints, ApiEndpoint<string>>;

const removeDomain = (url: string, leadingSlash = true) => (
    url.replace(/^.*\/\/[^/]+\/?/, leadingSlash ? '/' : '')
);

const baseUrl = `${sharedConfig.system.app_url}/${sharedConfig.system.modules.frontend.base_path}`;
const apiBaseUrl = `${sharedConfig.system.app_url}/${sharedConfig.system.modules.backend.base_path}`;
const copyright = `${sharedConfig.system.app_name} Ver.${sharedConfig.system.app_version} © ${sharedConfig.system.copyright_year} ${sharedConfig.system.company_name}`;
const basePath = removeDomain(baseUrl, false);
const sessionCookieName = sharedConfig.system.modules.backend.session_cookie_name;

const config = Object.freeze({
    frontend: {
        basePath,
        baseUrl,
        apiBaseUrl,
        copyright,
        sessionCookieName,
    },
    ...sharedConfig,
    api_endpoints: sharedConfig.api_endpoints as ApiEndpoints,
});

const useConfig = () => config;

export default useConfig;
