import { SteemSmartvotes, smartvotes_ruleset } from "steem-smartvotes";
import { Promise } from "bluebird";

export class Api {
    public static validateAccountsExistence(users: string []): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(); // TODO
            }, 2500);
        });
    }

    public static loadRulesets(delegator: string, voter: string): (() => Promise<smartvotes_ruleset []>) {
        return () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("Not implemented yet"));
                }, 2500);
            });
        };
    }
}
