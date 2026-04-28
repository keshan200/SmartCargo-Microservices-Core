import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Eureka } from 'eureka-js-client';
import * as ip from 'ip';

@Injectable()

export class EurekaService implements OnModuleInit , OnModuleDestroy {
    private client : Eureka;
  

    constructor() {
        this.client =  new Eureka({
            instance: {
                app: 'shipment-service',
                hostName: 'localhost',
                ipAddr: ip.address(),
                port: {
                       '$': 3002,
                       '@enabled': true,
                },
                vipAddress: 'shipment-service',
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                },
            },
            eureka: {
                host: 'localhost',
                port: 8761,
                servicePath: '/eureka/apps/',

        }
        });
    }
  
    onModuleInit() {
        this.client.start((error) => {
      console.log('Eureka registration complete');
        });  
    }

    onModuleDestroy() {
        this.client.stop();
    }





}