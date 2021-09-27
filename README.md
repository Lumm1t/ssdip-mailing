<div align="center">
  <h1>ssdip-mailing</h1>

  <h5>
    Webscrap emails from <a href="https://ssdip.bip.gov.pl/search/graphsubjects/">SSDIP</a> and send massive messages
  </h5>
</div>

## Overview

###### \*click for larger images size\*

Server is scraping data from [ssdip.bip.gov.pl](https://ssdip.bip.gov.pl/search/graphsubjects/) based on client-side form
[<img width="800" src="https://i.imgur.com/d3BxQxr.png" alt="ssdip-mailing-location-form">](https://i.imgur.com/d3BxQxr.png)

Scraped emails are provided to `recipients select`
[<img width="800" src="https://i.imgur.com/vnA15JL.png" alt="ssdip-mailing-recipients">](https://i.imgur.com/vnA15JL.png)

User can fill email topic and body - HTML format is supported!
[<img width="800" src="https://i.imgur.com/pfWmULW.png" alt="ssdip-mailing-emails-form">](https://i.imgur.com/pfWmULW.png)

Server is sending emails, user can see response
[<img width="800" src="https://i.imgur.com/63NCzMX.png" alt="ssdip-mailing-emails-info">](https://i.imgur.com/63NCzMX.png)

##### It was made using:

- [Node](https://nodejs.org/)
- [Koa](https://koajs.com/) - back-end/server
- [Nightmare](https://github.com/segmentio/nightmare) - webscrap
- [Vue, Nuxt](https://nuxtjs.org/) - front-end
- [Vuetify](https://vuetifyjs.com/) - UI Library
- [Nodemailer](https://nodemailer.com/) - node module for sending emails
- [TipTap-Vuetify](https://github.com/iliyaZelenko/tiptap-vuetify) - WYSIWYG editor for Vuetify
- [TypeScript](https://www.typescriptlang.org/)

### Prerequisites to build

- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/)

### Getting Started

```bash
# Clone repo
git clone https://github.com/Lumm1t/ssdip-mailing.git
cd ssdip-mailing/
yarn # or npm install
```

Change environment variables:

1. Rename `.env.example` to `.env`
2. Fill required data

### Run back-end

```bash
yarn server # or npm run server
```

### Run front-end

#### Development

```bash
yarn dev # or npm run dev
```

#### Production

```bash
yarn build # or npm run build
yarn start # or npm run start
```

### Contributing

Just contribute!

### License

[This project is licensed under the MIT License.](https://choosealicense.com/licenses/mit/)
