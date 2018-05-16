import { SteemSmartvotes, smartvotes_ruleset, smartvotes_voteorder, SteemOperationNumber } from "steem-smartvotes";
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
                const smartvotes = new SteemSmartvotes("username-not-required", "wif-not-requiored");
                smartvotes.getRulesetsOfUser(delegator,
                        (error: Error | undefined, rulesets: smartvotes_ruleset []): void => {
                    if (error) reject(error);
                    else {
                        if (rulesets.length === 0) reject(new Error("Delegator (@" + delegator + ") has no rulesets."));
                        else {
                            const rulesetsForVoter = [];
                            for (let i = 0; i < rulesets.length; i ++) {
                                if (rulesets[i].voter === voter) {
                                    rulesetsForVoter.push(rulesets[i]);
                                }
                            }
                            if (rulesetsForVoter.length === 0) reject(new Error(
                                "Delegator (@" + delegator + ") has no rulesets for this voter (@" + voter + ")."));
                            else resolve(rulesetsForVoter);
                        }
                    }
                });
            });
        };
    }

    public static validateVoteorder(voter: string, voteorder: smartvotes_voteorder,
                                    proggressCallback: (msg: string, proggress: number) => void):
                                    Promise<void> {
        return new Promise((resolve, reject) => {
            const smartvotes = new SteemSmartvotes("username-not-required", "wif-not-requiored");
            smartvotes.validateVoteOrder(voter, voteorder, SteemOperationNumber.FUTURE,
                (error: Error | undefined, result: boolean): void => {
                    if (error) reject(error);
                    else if (result) {
                        resolve();
                    } else reject(new Error("Inconsistent state: invalid, but no error thrown"));
            }, proggressCallback);
        });
    }
}
