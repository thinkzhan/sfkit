# REACT SSR

## Usage

开发

`http://0.0.0.0:8000`

```
npm run dev
```

调试

`http://0.0.0.0:8000`

```
npm run debug
```

启动

`http://0.0.0.0:8000`

```
npm run build
npm run start
```

## Structure

```
- build
- config
- public
    - client        // dist for client
    - server        // dist for server
    assets.json     // assets map
- server
    - controller
    - decorator
    - extend
    - middleware
    - *service
    - app.js
    - start.dev.js   // local development entry
    - start.js       // production entry
- template
    - index.html     // csr template
    - index.ejs      // ssr template
- web
    - page
        - page1
            csr.js   // csr entry
            ssr.js   // ssr entry
```
