export class UpdateSenderAgreementDto {
  id: number;
  senderEmail: string; // Will be used against firebase token to verify only this person can modify the agreement
  referralFeePercentage: number;
  statusUpdateInterval: number;
  senderBrokerName: string;
  senderBrokerEmail: string;
  signature: string;
}
