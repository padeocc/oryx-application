# Oryx By Padeo

* <https://www.oryxchange.com>
* <https://www.padeo.fr>

## Technical Stack

* [Next.js (app router)](https://nextjs.org/)
* [SuperTokens](https://github.com/supertokens)
* [Next-intl](https://next-intl-docs.vercel.app/)
* [Zustand](https://github.com/pmndrs/zustand)
* [Strapi](https://strapi.io/) (pending)
* [Mongoose](https://mongoosejs.com/) (pending)


## Environment Variables (.env file to create)

```
NEXT_PUBLIC_AUTH_APPINFO_NAME="Oryx"
NEXT_PUBLIC_AUTH_APPINFO_APIDOMAIN='' #http://localhost:3000
NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN='' #http://localhost:3000
NEXT_PUBLIC_AUTH_APPINFO_APIBASEPATH='/api/auth'  
NEXT_PUBLIC_AUTH_APPINFO_WEBSITEBASEPATH='signup'  
NEXT_PUBLIC_AUTH_APPINFO_API_GETUSER_ENDPOINT='' #'http://localhost:3000/api/user'  
AUTH_APPINFO_CONNECTIONURL='' #SuperTokens private connection url  
AUTH_APPINFO_CONNECTIONKEY='' #SuperTokens private key
```