"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const uploadToCloudinary = (fileBuffer, folder, resourceType) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder,
            resource_type: resourceType,
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result?.secure_url || "");
            }
        });
        streamifier_1.default.createReadStream(fileBuffer).pipe(stream);
    });
};
exports.default = uploadToCloudinary;
