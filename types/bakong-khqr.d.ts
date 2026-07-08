declare module "bakong-khqr" {
  export const khqrData: {
    currency: {
      usd: string;
      khr: string;
    };
  };

  export class IndividualInfo {
    constructor(
      accountId: string | undefined,
      accountName: string | undefined,
      city: string,
      optionalData?: {
        currency?: string;
        amount?: number;
        expirationTimestamp?: number;
      }
    );
  }

  export class BakongKHQR {
    generateIndividual(info: IndividualInfo): unknown;
  }
}
