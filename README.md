# ZeroCloudSync

ZeroCloudSync is a simple tool that combines the power of ZeroTier with Cloudflare. This is not intended to make your ZeroTier network public, but instead easier for you to access other members of your ZeroTier network via DHCP while on the network.

This tool creates cloudflare entries for each of your ZeroTier members. The dns records will resolve to INTERNAL only ips that will only be resolvable from connected ZeroTier client machines.

Currently the script is designed to run once every <userdefined> milliseconds but can be modified to be a single use script as well.

Requirements:
* Your network in zerotier needs to be named the same as you would like the subdomain structure to be.  IE: "lab.mydomain.com". All hosts within that network will be spun up as subs of that domain host1.lab.mydomain.com, host2.lab.mydomain.com ... etc..

![image](https://github.com/SmugZombie/ZeroCloudSync/assets/11764327/3dcf2b12-34f7-4145-bff8-f6964373359b)

* Your members must be named properly or they will be skipped during the dns creation. IE if they have no name they can't have a dns record.

Sample Run:

![image](https://github.com/SmugZombie/ZeroCloudSync/assets/11764327/14624d9e-cc03-4764-af95-01da4bc8c932)

Future Considerations:
* Removing dns entries for removed members
