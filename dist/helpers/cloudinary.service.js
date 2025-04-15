"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
class CloudinaryService {
    static async uploadImages(imagePaths, options = {}) {
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
                const absoluteImagePath = path_1.default.resolve(imagePath);
                if (!fs_1.default.existsSync(absoluteImagePath)) {
                    throw new Error(`El archivo ${absoluteImagePath} no existe`);
                }
                const result = await cloudinary_config_1.default.uploader.upload(absoluteImagePath, defaultOptions);
                this.safeDeleteLocalFile(absoluteImagePath);
                return result.secure_url;
            });
            return await Promise.all(uploadPromises);
        }
        catch (error) {
            imagePaths.forEach((filePath) => this.safeDeleteLocalFile(filePath));
            console.error("Error detallado de carga en Cloudinary:", error);
            throw error;
        }
    }
    static async uploadImage(imagePath, options = {}) {
        const urls = await this.uploadImages([imagePath], options);
        return urls[0];
    }
    static async deleteImages(imageUrls) {
        const deletePromises = imageUrls
            .filter((url) => url)
            .map(async (imageUrl) => {
            try {
                const publicId = this.extractPublicIdFromUrl(imageUrl);
                if (publicId) {
                    const result = await cloudinary_config_1.default.uploader.destroy(publicId);
                }
            }
            catch (error) {
                console.error(`No se pudo eliminar la imagen ${imageUrl} de Cloudinary`, error);
            }
        });
        await Promise.all(deletePromises);
    }
    static async deleteImage(imageUrl) {
        await this.deleteImages([imageUrl]);
    }
    static extractPublicIdFromUrl(url) {
        try {
            const parsedUrl = new url_1.URL(url);
            const pathSegments = parsedUrl.pathname.split("/");
            const publicIdWithVersion = pathSegments[pathSegments.length - 1];
            const publicId = publicIdWithVersion.split(".")[0];
            return publicId;
        }
        catch (error) {
            console.error(`Error extrayendo PublicID de ${url}:`, error);
            return "";
        }
    }
    static safeDeleteLocalFile(filePath) {
        try {
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
            }
        }
        catch (unlinkError) {
            console.warn(`No se pudo eliminar el archivo ${filePath}:`, unlinkError);
        }
    }
}
exports.CloudinaryService = CloudinaryService;
exports.default = CloudinaryService;
