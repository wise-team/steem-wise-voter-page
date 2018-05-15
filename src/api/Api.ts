import { SteemSmartvotes, smartvotes_ruleset } from "steem-smartvotes";
import { Promise } from "bluebird";
import * as steem from "steem";

export class Api {
    public static validateAccountsExistence(delegator: string, voter: string): Promise<void> {
        return new Promise((resolve, reject) => {
            steem.api.lookupAccountNames([delegator, voter], (error: Error | undefined, response: any []) => {
                if (error) reject(error);
                else {
                    if (response.length < 2) reject(new Error("Too short response"));
                    else {
                        if (!response[0]) reject(new Error("Delegator (@" + delegator + ") account does not exist"));
                        else if (!response[1]) reject(new Error("Voter (@" + voter + ") account does not exist"));
                        else resolve();
                    }
                }
            });
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
