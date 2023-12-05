export interface SellerData {
    companyName: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    contactDetails: {
      phone: string;
      email: string;
    };
  }
