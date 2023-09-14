import { generateApiKey } from 'generate-api-key';

console.log(generateApiKey({ method: 'uuidv4', length: 43 }));
