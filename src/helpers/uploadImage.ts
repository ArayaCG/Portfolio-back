import cloudinaryV2 from "../config/cloudinary.config";
import fs from "fs";
import path from "path";

interface CloudinaryUploadOptions {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
    gravity?: string;
    fetchFormat?: string;
}

export const uploadToCloudinary = async (imagePath: string, options: CloudinaryUploadOptions = {}): Promise<string> => {
    try {
        // Asegurarse de que la ruta sea absoluta
        const absoluteImagePath = path.resolve(imagePath);

        // Verificar si el archivo existe antes de intentar subirlo
        if (!fs.existsSync(absoluteImagePath)) {
            throw new Error(`El archivo ${absoluteImagePath} no existe`);
        }

        const defaultOptions = {
            fetch_format: "auto",
            quality: "auto",
            crop: "scale",
            gravity: "center",
            width: 1000,
            height: 1000,
            ...options,
        };

        const result = await cloudinaryV2.uploader.upload(absoluteImagePath, defaultOptions);

        // Eliminar archivo local de manera segura
        try {
            fs.unlinkSync(absoluteImagePath);
        } catch (unlinkError) {
            console.warn(`No se pudo eliminar el archivo ${absoluteImagePath}:`, unlinkError);
        }

        return result.secure_url;
    } catch (error) {
        console.error("Error detallado de carga en Cloudinary:", error);
        
        // Intentar eliminar el archivo local incluso si falla la carga
        try {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        } catch (unlinkError) {
            console.warn(`No se pudo eliminar el archivo ${imagePath}:`, unlinkError);
        }

        throw error;
    }
};