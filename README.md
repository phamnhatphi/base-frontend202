# 認証基盤システム

各末端システムが共通で利用する認証基盤システムです。
顧客のユーザー情報を登録し、各末端システムを利用する際の認証および認可をおこないます。

## Requirements:

- OS: RHEL9、AlmaLinux9
- Apache: 2.4
- MariaDB: 10.5
- PHP: 8.2
- Laravel: 12
- Node.js: 22

## Installation

1. Prerequisite

    * To ensure the commands below work properly, please changing your directory to the root of the source code.
        ```bash
        cd /path/to/auth-infrastructure-system
        ```

2. Install dependencies

    * On production environment
        ```bash
        # Install php libraries 
        $ composer install --no-dev

        # Install js libraries
        $ yarn install --production
        ```
    
    * On development environment
        ```bash
        # Install php libraries 
        $ composer install

        # Install js libraries
        $ yarn install
        ```

3. Create `.env` by copying `/.env.sample` to `/.env` and set required information properly

4. Generate `APP_KEY`  
    ```bash
    php artisan key:generate
    ```

5. Create database & migration
    * Create new database 
        ```sql
        CREATE DATABASE IF NOT EXISTS `auth-infrastructure-system` DEFAULT CHARACTER SET utf8mb4    COLLATE utf8mb4_general_nopad_ci;
        ```
    * Correct the database information in `.env`
    * Migrate database tables  
        ```bash
        php artisan migrate
        ```

## Create super admin user

Execute bellow command and following the interactive prompt to input the valid values

```bash
php artisan create_super_admin
```
## Dump config file for frontend app

Execute bellow command every time there is update in `.env` or `config/xxxx.php`

```bash
php artisan dump_frontend_config
```

## Generate screens' assets

Generate assets for screens of both module admin_frontend and oauth
Run every time there is update in source of assets.

```bash
yarn generate
```

## Grant the Read & Write permission of directory `storage` to web user

NOTE: The following command is just a sample. Adjust it to match your specific environment.

```bash
# Replace the <username> with the correct username value.
chown <username>: -R storage

# Or if you are on development environment, simply do this.
# ATTENTION: DO NOT execute below command on a production environment!
chmod 777 -R storage
```

## Serve App under Apache (production)

Sample of Apache configuration:  
```bash
<VirtualHost *:443>
    # Basically, only need to change following fields' value
    Define folder /path/to/auth-infrastructure-system
    
    DocumentRoot "${folder}/public"
    DirectoryIndex index.html index.php

    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/localhost.crt
    SSLCertificateKeyFile /etc/pki/tls/private/localhost.key

    ErrorLog ${folder}/storage/logs/apache-error.log
    TransferLog ${folder}/storage/logs/apache-access.log
    LogLevel warn

    <Directory "${folder}">
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## Configure Laravel Scheduler

Add a single cron configuration entry to the server that runs the `schedule:run` command every minute.
```bash
* * * * * cd /path/to/auth-infrastructure-system && php artisan schedule:run >> /dev/null 2>&1
```

## Server Setup Notes
<details><summary>Below is the memo for setting up the server.</summary>

#### Middlewares Installation

The memo of commands for installing required middlewares in AlmaLinux9.

```bash
# Install Apache 2.4
dnf groupinstall "Development Tools"
dnf install httpd mod_ssl openssl openssl-devel

# Install MariaDB 10.5
dnf install mariadb-server mariadb-common

# Install PHP8.2 & required extensions
dnf module reset php
dnf module enable php:8.2
dnf install php php-common php-xml php-mbstring php-pdo php-mysqlnd php-cli php-json php-zip php-gd php-intl

# Install Node.js 22 & yarn
dnf module -y reset nodejs
dnf module -y enable nodejs:22
dnf install -y nodejs npm
npm install -g yarn

# Install Composer
dnf install -y zip
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

#### Server Configuration

- **HTTP TRACE method is required to be disabled** on the web server. This helps mitigate potential risks such as Cross-Site Tracing (XST) attacks. This is typically configured in Apache **httpd.conf** config file:  
    ```
    TraceEnable Off
    ```

</details>

## Development Notes

<details><summary>Below is the memo for development.</summary>

### Clear all cached data of backend

> **WARNING**: 
> Running below command will also wipe all program-level cache.
> This can impact system behavior, including request throttling and login attempt tracking.
> DO NOT execute this command in production environments.

```bash
composer run-script clear-all-cache
```

### Connecting Your Local SPA to Real APIs

To develop your Single-Page Application (SPA) locally while using actual backend APIs, you'll need to configure a proxy.
This allows your local development server to forward API requests to the real backend server.

**Here's how to set it up:**

1. Configure Environment Variables (`.env`):

   * Set the Backend API URL:
        * Add the following to your `.env` file, replacing `https://your-domain.com` with the base URL of your real API server:

            ```bash
            PROXY_TARGET_BASE_URL=https://your-domain.com
            ```

   * Disable SSL Verification (if necessary):
        * If your real API server uses a self-signed SSL certificate, you'll need to disable SSL verification in Node. This is generally **not recommended for production**, but it's acceptable for local development. Add this line to your `.env` file:

            ```bash
            NODE_TLS_REJECT_UNAUTHORIZED=0
            ```

2. Configure API Proxy Paths (`config/shared.json`):

    * Update the `base_path` values:
        * Modify your `config/shared.json` file to define the proxy paths for your different API modules. This tells your SPA which local paths should be forwarded to the real API server. For example:

            ```json
            {
                "system": {
                    "app_url": "http://localhost:3000",
                    "modules": {
                        "admin_frontend": {
                            "base_path": "admin"
                        },
                        "admin_api": {
                            "base_path": "admin/proxy-admin-api"
                        },
                        "oauth": {
                            "base_path": "admin/proxy-oauth"
                        },
                        "external_api": {
                            "base_path": "admin/proxy-external-api"
                        }
                    }
                },
                // Other configuration settings...
            }
            ```

    * Explanation:
        * When your SPA running on `http://localhost:3000/admin` makes a request to `http://localhost:3000/admin/proxy-admin-api/some-endpoint`, 
        * the proxy will forward that request to `https://your-domain.com/admin/api/v1/some-endpoint` (assuming the proxy configuration is set up correctly).  
            The `/proxy-admin-api` part is removed by the proxy.

### Run unit test

1. Backend (PHP/Laravel):
    ```bash
    # simply run all the test cases
    composer run-script test

    # test and generate coverage report
    composer run-script coverage
    ```

1. Frontend (Javascript): 
    ```bash
    yarn test

    # silent console output
    yarn test --run --silent

    # test and generate coverage report
    yarn coverage
    ```

NOTE:
1. The report of coverage will be outputted to directory: `/.coverage-report`

### Auditing the library

Scan for vulnerabilities in dependencies.

1. Frontend (Javascript): 
    ```bash
    yarn audit
    ```

2. Backend (PHP):
    ```bash
    composer audit
    ```

</details>