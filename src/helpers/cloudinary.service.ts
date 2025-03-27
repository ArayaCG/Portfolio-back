import cloudinaryV2 from "../config/cloudinary.config";
import fs from "fs";
import path from "path";

export interface CloudinaryUploadOptions {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
    gravity?: string;
    fetchFormat?: string;
}

export class CloudinaryService {
    /**
     * Sube múltiples imágenes a Cloudinary
     * @param imagePaths Rutas de las imágenes a subir
     * @param options Opciones de transformación de imagen
     * @returns URLs seguras de las imágenes en Cloudinary
     */
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
                // Asegurarse de que la ruta sea absoluta
                const absoluteImagePath = path.resolve(imagePath);

                // Verificar si el archivo existe antes de intentar subirlo
                if (!fs.existsSync(absoluteImagePath)) {
                    throw new Error(`El archivo ${absoluteImagePath} no existe`);
                }

                const result = await cloudinaryV2.uploader.upload(absoluteImagePath, defaultOptions);

                // Eliminar archivo local de manera segura
                this.safeDeleteLocalFile(absoluteImagePath);

                return result.secure_url;
            });

            return await Promise.all(uploadPromises);
        } catch (error) {
            // Intentar eliminar los archivos locales
            imagePaths.forEach((filePath) => this.safeDeleteLocalFile(filePath));

            console.error("Error detallado de carga en Cloudinary:", error);
            throw error;
        }
    }

    /**
     * Sube una imagen a Cloudinary (método individual para compatibilidad)
     * @param imagePath Ruta de la imagen a subir
     * @param options Opciones de transformación de imagen
     * @returns URL segura de la imagen en Cloudinary
     */
    static async uploadImage(imagePath: string, options: CloudinaryUploadOptions = {}): Promise<string> {
        const urls = await this.uploadImages([imagePath], options);
        return urls[0];
    }

    /**
     * Elimina múltiples imágenes de Cloudinary
     * @param imageUrls URLs de las imágenes a eliminar
     */
    static async deleteImages(imageUrls: string[]): Promise<void> {
        const deletePromises = imageUrls
            .filter((url) => url) // Filtrar URLs vacías o nulas
            .map(async (imageUrl) => {
                try {
                    const publicId = this.extractPublicIdFromUrl(imageUrl);
                    if (publicId) {
                        await cloudinaryV2.uploader.destroy(publicId);
                    }
                } catch (error) {
                    console.warn(`No se pudo eliminar la imagen ${imageUrl} de Cloudinary`, error);
                }
            });

        await Promise.all(deletePromises);
    }

    /**
     * Elimina una imagen de Cloudinary (método individual para compatibilidad)
     * @param imageUrl URL de la imagen a eliminar
     */
    static async deleteImage(imageUrl: string): Promise<void> {
        await this.deleteImages([imageUrl]);
    }

    /**
     * Extrae el Public ID de una URL de Cloudinary
     * @param url URL de la imagen
     * @returns Public ID de la imagen
     */
    static extractPublicIdFromUrl(url: string): string {
        // Lógica para extraer el public_id de la URL de Cloudinary
        const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
        return matches ? matches[1] : "";
    }

    /**
     * Elimina un archivo local de manera segura
     * @param filePath Ruta del archivo a eliminar
     */
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
