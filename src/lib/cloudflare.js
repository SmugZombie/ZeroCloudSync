'use strict';
// Version 1.0
const axios = require('axios');
var config = require('../config/config');

module.exports = class CloudFlare {

    static async getCurrentDNSRecords(){
        try{

            let axios_config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.cloudflare.com/client/v4/zones/${config.cloudflare.zoneId}/dns_records`,
                headers: { 
                    'X-Auth-Email': config.cloudflare.authEmail, 
                    'X-Auth-Key': config.cloudflare.authToken, 
                    'Content-Type': 'application/json', 
                },
            };

            return await axios.request(axios_config)
            .then((response) => {
                let records = [];
                //console.log(JSON.stringify(response.data));
                for (let index = 0; index < response.data.result.length; index++) {
                    const record = response.data.result[index];
                    records.push({record_id: record.id, record_name: record.name, record_content: record.content, record_type: record.type})
                }
                return records;
            })
            .catch((error) => {
                console.log(error);
            });
        }catch(e){
            // Catch the uhohs
            throw(e);
        }
    }

    static async updateDNSRecords(zerotierMembers) {
        try {
            for (const { member_name, cloudflare_record, member_ips } of zerotierMembers) {
              let ip = member_ips[0];
              let domain = cloudflare_record;

              if(member_name){
                // Check if the DNS record already exists
              const existingRecord = await axios.get(
                `https://api.cloudflare.com/client/v4/zones/${config.cloudflare.zoneId}/dns_records`,
                {
                  headers: {
                    'X-Auth-Key': config.cloudflare.authToken,
                    'X-Auth-Email': config.cloudflare.authEmail,
                  },
                  params: {
                    name: domain,
                  },
                }
              );
        
              if (existingRecord.data.result.length > 0) {
                // Update the existing DNS record
                const recordId = existingRecord.data.result[0].id;
                const updatedRecord = {
                  type: 'A',
                  name: domain,
                  content: ip,
                };
        
                await axios.put(
                  `https://api.cloudflare.com/client/v4/zones/${config.cloudflare.zoneId}/dns_records/${recordId}`,
                  updatedRecord,
                  {
                    headers: {
                        'X-Auth-Key': config.cloudflare.authToken,
                        'X-Auth-Email': config.cloudflare.authEmail,
                      },
                  }
                );
        
                console.log(`Updated DNS record for ${domain}`);
              } else {
                // Create a new DNS record
                const newRecord = {
                  type: 'A',
                  name: domain,
                  content: ip,
                };
        
                await axios.post(
                  `https://api.cloudflare.com/client/v4/zones/${config.cloudflare.zoneId}/dns_records`,
                  newRecord,
                  {
                    headers: {
                        'X-Auth-Key': config.cloudflare.authToken,
                        'X-Auth-Email': config.cloudflare.authEmail,
                      },
                  }
                );
        
                console.log(`Added DNS record for ${domain}`);
              }
              }
              
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }
}