import cloudinary from "../config/cloudinary";
// import streamifier from "streamifier";
import { Readable } from "stream";


const uploadToCloudinary = (
    fileStream: Readable,
    folder: string,
    resourceType: "image" | "video"
) : Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result?.secure_url || "");
            }
        );

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

export default uploadToCloudinary;
