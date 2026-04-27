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
            const creatAccount = await this.account.create(ID.unique(), email, password, name);
            if (creatAccount) {
                // return default login
                this.login(email, password);
            } else {
                return creatAccount;
            }

        } catch (error) {

        }
    }

    async login(email, password) {
        try {
            await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite Service :: login :: error", error);
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
