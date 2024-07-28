export class UpdateReceiverAgreementDto {
  id: number;
  receiverEmail: string; // Will be used against firebase token to verify only this person can modify the agreement
  receiverBrokerName: string;
  receiverBrokerEmail: string;
  signature: string;
}
