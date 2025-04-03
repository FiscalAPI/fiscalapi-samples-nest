
import { FiscalapiClient } from 'fiscalapi' 

export const createFiscalApiClient = () => {    

    console.warn('API URL: ' + process.env.FISCALAPI_API_URL);
    console.warn('API KEY: ' + process.env.FISCALAPI_API_KEY);
    console.warn('TENANT: ' + process.env.FISCALAPI_TENANT);

    return FiscalapiClient.create({
        apiUrl: process.env.FISCALAPI_API_URL || '',
        apiKey: process.env.FISCALAPI_API_KEY || '',
        tenant: process.env.FISCALAPI_TENANT || ''
    });
};