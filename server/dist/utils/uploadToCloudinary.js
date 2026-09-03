"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploadToCloudinary = (fileStream, folder, resourceType) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder,
            resource_type: resourceType,
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result?.secure_url || "");
        });
        fileStream.pipe(stream);
    });
};
// // Uploads a file buffer to Cloudinary and returns the secure URL of the uploaded file
// const uploadToCloudinary = (fileBuffer: Buffer, folder: string, 
//      resourceType: "image" | "video"
// ): Promise<string> => { 
//     return new Promise ((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//             {
//                 folder,
//                 resource_type: resourceType,    
//             },
//             (error, result) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result?.secure_url || "");
//                 }
//             }
//         );
//         streamifier.createReadStream(fileBuffer).pipe(stream);
//     });
// };
exports.default = uploadToCloudinary;
