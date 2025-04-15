export interface CloudinaryUploadOptions {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
    gravity?: string;
    fetchFormat?: string;
}
export declare class CloudinaryService {
    static uploadImages(imagePaths: string[], options?: CloudinaryUploadOptions): Promise<string[]>;
    static uploadImage(imagePath: string, options?: CloudinaryUploadOptions): Promise<string>;
    static deleteImages(imageUrls: string[]): Promise<void>;
    static deleteImage(imageUrl: string): Promise<void>;
    static extractPublicIdFromUrl(url: string): string;
    private static safeDeleteLocalFile;
}
export default CloudinaryService;
