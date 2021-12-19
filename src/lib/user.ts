import type {DonationCycle} from "./donationCycle";
import type {AccountStatus} from "./accountStatus";
import type {Occupation} from "$lib/occupation";

export default class User{
    //Basic data
    declare fullName: string|undefined;
    declare email: string;
    declare status: AccountStatus;
    declare occupation: Occupation;

    // Donations
    declare donationCycle: DonationCycle
    declare balance: number;
    declare exemptFromDonations: boolean;

    //Discord
    declare discordID: string|undefined;
    declare exemptFromDiscord: boolean;

    constructor(fullName: string|undefined, email: string, status: AccountStatus, occupation: Occupation, donationCycle: DonationCycle, balance: number, exemptFromDonations: boolean, discordID: string|undefined, exemptFromDiscord: boolean) {
        this.fullName = fullName;
        this.email = email;
        this.status = status;

        this.donationCycle = donationCycle;
        this.balance = balance;
        this.exemptFromDonations = exemptFromDonations;

        this.discordID = discordID;
        this.exemptFromDiscord = exemptFromDiscord;
    }
    static fromJSON(json: any): User{
        return new User(json!.fullName, json!.email, json!.status, json!.occupation, json!.donationCycle, json!.balance, json!.exemptFromDonations, json!.discordID, json!.exemptFromDiscord)
    }

    toJSON(): any{
        return {
            fullName: this.fullName || undefined,
            email: this.email,
            status: this.status,
            occupation: this.occupation,
            donationCycle: this.donationCycle,
            balance: this.balance,
            exemptFromDonations: this.exemptFromDonations,
            discordID: this.discordID || undefined,
            exemptFromDiscord: this.exemptFromDiscord
        }
    }

}