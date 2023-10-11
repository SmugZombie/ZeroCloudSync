'use strict';
// Version 1.0
const axios = require('axios');
var config = require('../config/config');

module.exports = class ZeroTier {

    static async getNetworks(){
        try{    

            let axios_config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://api.zerotier.com/api/v1/network',
                headers: { 
                    'Accept': 'application/json', 
                    'Authorization': `token ${config.zerotier.authToken}`
                }
            };

            return await axios.request(axios_config)
            .then((response) => {
                let networks = [];
                //console.log(JSON.stringify(response.data));

                for (let index = 0; index < response.data.length; index++) {
                    const network = response.data[index];
                    networks.push({network_id: network.id, network_name: network.config.name})
                }

                return networks;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });

        }catch(e){
            // Catch the uhohs
            throw(e);
        }
    }

    static async getNetworkMembers(network_id, network_name){
        try{
            let axios_config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.zerotier.com/api/v1/network/${network_id}/member`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `token ${config.zerotier.authToken}`
                }
            };

            return await axios.request(axios_config)
            .then((response) => {
                let members = [];
                //console.log(JSON.stringify(response.data));
                for(let i = 0; i < response.data.length; i++){
                    let member = response.data[i];
                    //console.log(member.id, member.name, member.config.ipAssignments.join())
                    let cloudflare_record = `${member.name}.${network_name}`;
                    members.push({member_id: member.id, member_name: member.name, member_ips: member.config.ipAssignments, authorized: member.config.authorized, cloudflare_record: cloudflare_record})
                }

                return members;

            })
            .catch((error) => {
                console.log(error);
                return [];
            });
        }catch(e){
            // Catch the uhohs
            throw(e);
        }
    }

}