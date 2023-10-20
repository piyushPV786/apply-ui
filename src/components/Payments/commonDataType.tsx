export interface IPaymentPayload {
  applicationCode: string;
  studentType: string;
  discountCode: string;
}
export enum CommonMessage {
  Discount = "Discount applied successfully",
}

export interface IApplicationUpload {
  files: [
    {
      documentTypeCode: string;
      fileName: string;
      fileType: string;
    }
  ];
  amount: string;
  paymentModeCode: string;
  discountCode: string;
  discountAmount: number;
  feeModeCode: string;
  isDraft: boolean;
  currencyCode: string;
  studentCode: string;
}
