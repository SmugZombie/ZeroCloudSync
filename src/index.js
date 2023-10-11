require('dotenv').config();
const axios = require('axios');
const ZeroTier = require('./lib/zerotier');
const CloudFlare = require('./lib/cloudflare');
var config = require('./config/config');

async function main(){
  
  let networks = await ZeroTier.getNetworks()
  console.log(networks);

  for (let index = 0; index < networks.length; index++) {
    const network = networks[index];
    let members = await ZeroTier.getNetworkMembers(network.network_id, network.network_name);
    await CloudFlare.updateDNSRecords(members);
  }

  setTimeout(function(){ main(); }, config.app.wait);
}

main();

