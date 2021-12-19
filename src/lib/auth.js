import createAuth0Client from "@auth0/auth0-spa-js";

const config = {
    domain: "poiw.eu.auth0.com",
    clientId: "QaQQ0JqXFg7DCLbTvrMlYO9JPryOK45r"
};

let auth = {
    async createClient() {
        let auth0Client = await createAuth0Client({
            domain: config.domain,
            client_id: config.clientId,
            audience: 'https://api.poiw.org',
            redirect_uri: process.env.NODE_ENV == 'production' ? "https://meta.poiw.org/auth" :"http://localhost:3000/auth",
            cacheLocation: 'localstorage',
            scope: "openid email"
        });

        return auth0Client;
    },
    async login(client) {
        return (await this.createClient()).loginWithRedirect();
    },
    async logout() {
        return (await this.createClient()).logout({
            // @ts-ignore
            redirect_uri: "https://warehouse.poiw.org"
        });
    },
    async register() {
        return (await this.createClient()).loginWithRedirect({
            screen_hint: "signup"
        });
    },
    async checkSession() {

    },
    async isAuthenticated() {
        return (await this.createClient()).isAuthenticated()
    },
    async getUser() {
        return (await this.createClient()).getUser()
    },
    async getToken(){
        return (await this.createClient()).getTokenSilently()
    }
}

export default auth