import cloudinaryV2 from "../config/cloudinary.config";
import fs from "fs";
import path from "path";
import { URL } from "url";

export interface CloudinaryUploadOptions {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
    gravity?: string;
    fetchFormat?: string;
}

export class CloudinaryService {
    static async uploadImages(imagePaths: string[], options: CloudinaryUploadOptions = {}): Promise<string[]> {
        try {
            const defaultOptions = {
                fetch_format: "auto",
                quality: "auto",
                crop: "scale",
                gravity: "center",
                width: 1000,
                height: 1000,
                ...options,
            };

            const uploadPromises = imagePaths.map(async (imagePath) => {
                const absoluteImagePath = path.resolve(imagePath);

                if (!fs.existsSync(absoluteImagePath)) {
                    throw new Error(`El archivo ${absoluteImagePath} no existe`);
                }

                const result = await cloudinaryV2.uploader.upload(absoluteImagePath, defaultOptions);

                this.safeDeleteLocalFile(absoluteImagePath);

                return result.secure_url;
            });

            return await Promise.all(uploadPromises);
        } catch (error) {
            imagePaths.forEach((filePath) => this.safeDeleteLocalFile(filePath));

            console.error("Error detallado de carga en Cloudinary:", error);
            throw error;
        }
    }

    static async uploadImage(imagePath: string, options: CloudinaryUploadOptions = {}): Promise<string> {
        const urls = await this.uploadImages([imagePath], options);
        return urls[0];
    }

    static async deleteImages(imageUrls: string[]): Promise<void> {
        const deletePromises = imageUrls
            .filter((url) => url)
            .map(async (imageUrl) => {
                try {
                    const publicId = this.extractPublicIdFromUrl(imageUrl);
                    if (publicId) {
                        const result = await cloudinaryV2.uploader.destroy(publicId);
                    }
                } catch (error) {
                    console.error(`No se pudo eliminar la imagen ${imageUrl} de Cloudinary`, error);
                }
            });

        await Promise.all(deletePromises);
    }

    static async deleteImage(imageUrl: string): Promise<void> {
        await this.deleteImages([imageUrl]);
    }

    static extractPublicIdFromUrl(url: string): string {
        try {
            const parsedUrl = new URL(url);

            const pathSegments = parsedUrl.pathname.split("/");

            const publicIdWithVersion = pathSegments[pathSegments.length - 1];

            const publicId = publicIdWithVersion.split(".")[0];

            return publicId;
        } catch (error) {
            console.error(`Error extrayendo PublicID de ${url}:`, error);
            return "";
        }
    }

    private static safeDeleteLocalFile(filePath: string): void {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (unlinkError) {
            console.warn(`No se pudo eliminar el archivo ${filePath}:`, unlinkError);
        }
    }
}

export default CloudinaryService;
