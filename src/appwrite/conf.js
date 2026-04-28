import { Client, ID, Databases, Storage, Query, bucket } from "appwrite";
import config from "../config/config";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.tableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.tableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.tableId,
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false;
        }
    }

    async getPosts(slug) {
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.tableId,
                slug
            )

        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return false;

        }
    }

    async getAllPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.tableId,
                query
            )
        } catch (error) {
            console.log("Appwrite Service :: getAllPosts :: error", error);
        }
    }

    // other Sevices for file uploads

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.bucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service :: getFilePreview :: error", error);
            return false;

        }
    }


}
const service = new Service();

export default service;