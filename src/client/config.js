export const apiUrl = process.env.API_ENDPOINT;
apiUrl? console.log("API Endpoing --> ", apiUrl) : console.warn('API endpoint not defined. Please define API_ENDPOINT env variale');
switch (process.env.APP_ENV) {
    case 'local':
      break;
    case 'development':
      break;
    case 'staging':
      break;
    case 'production':
      break;
    default:
      throw new Error('Unsupported environment:', process.env.APP_ENV);
  }