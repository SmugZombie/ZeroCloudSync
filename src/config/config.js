try{
    module.exports = {
        app: {
            wait: process.env.APPWAIT
        },
        zerotier: {
            authToken: process.env.ZT_TOKEN
        },
        cloudflare: {
            authEmail: process.env.CF_EMAIL,
            authToken: process.env.CF_TOKEN,
            zoneId: process.env.CF_ZONE
        }
    }
}
catch(error){
    console.log("Configuration issue detected.")
    console.log(error);
    return process.exit(22);
} 

