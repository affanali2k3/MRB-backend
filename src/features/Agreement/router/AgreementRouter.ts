import multer from "multer";
import BaseRoutes from "../../../router/base/BaseRouter";
import AgreementController from "../controller/AgreementController";
import fs from "fs";

// Configuration for storing uploaded images using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const agreementId: number = req.body.id;
    const destinationPath = `./storage/agreements/${agreementId}/signatures/`;

    // Create the directory if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const randomString = Math.random().toString(36).substring(2, 15);

    // Generate a unique filename for the uploaded image
    const uniqueFileName = `${randomString}.jpg`;

    cb(null, uniqueFileName);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

class AgreementRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/create", AgreementController.createAgreement);
    this.router.patch("/update-by-sender", upload.single("signature"), AgreementController.updateAgreementBySender);
    this.router.patch("/update-by-receiver", upload.single("signature"), AgreementController.updateAgreementByReceiver);
    this.router.patch("/sender-broker-sign", upload.single("signature"), AgreementController.senderBrokerSignAgreement);
    this.router.patch("/receiver-broker-sign", upload.single("signature"), AgreementController.receiverBrokerSignAgreement);
    // this.router.patch("/accept-by-sender", AgreementController.acceptAgreementBySender);
    // this.router.patch("/accept-by-receiver", AgreementController.acceptAgreementByReceiver);
    this.router.patch("/start", AgreementController.startAgreement);
  }
}

export default new AgreementRouter().router;
