import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const createdAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (createdAccount) {
                return await this.login(email, password);
            }

            return null;

        } catch (error) {
            console.log("Appwrite createAccount error:", error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite Service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
