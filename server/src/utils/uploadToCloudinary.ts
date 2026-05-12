import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

const uploadToCloudinary = (fileBuffer: Buffer, folder: string, 
     resourceType: "image" | "video"
): Promise<string> => { 
    return new Promise ((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,    
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result?.secure_url || "");
                }
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

export default uploadToCloudinary;
