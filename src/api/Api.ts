import * as steemJs from "steem";
import { data as wise } from "../wise-config.gen";
import { Wise, SetRules, DirectBlockchainApi, SendVoteorder, ValidationException, Ruleset, SteemOperationNumber } from "steem-wise-core";

export class Api {
    public static async validateAccountsExistence(delegator: string, voter: string) {
        const steem = new steemJs.api.Steem({ url: wise.config.steem.defaultApiUrl });
        const response = await steem.lookupAccountNamesAsync([delegator, voter]);
        if (response.length < 2) throw new Error("Too short response");
        else if (!response[0]) throw new Error("Delegator (@" + delegator + ") account does not exist");
        else if (!response[1]) throw new Error("Voter (@" + voter + ") account does not exist");
    }

    public static loadRulesets(delegator: string, voter: string): (() => Promise<Ruleset []>) {
        const voterWise = new Wise(voter, new DirectBlockchainApi(Wise.constructDefaultProtocol()));
        return () => voterWise.downloadRulesetsForVoter(delegator, voter)
        .then((rulesets: Ruleset []) => {
            if (rulesets.length === 0)
                throw new Error("Delegator @" + delegator + " has no rulesets for voter @" + voter + ".");
            return rulesets;
        });

    }

    public static validateVoteorder(delegator: string, voter: string, voteorder: SendVoteorder,
                                    proggressCallback: (msg: string, proggress: number) => void):
                                    Promise<void> {
        const voterWise = new Wise(voter, new DirectBlockchainApi(Wise.constructDefaultProtocol()));
        return voterWise.validateVoteorder(delegator, voter, voteorder, SteemOperationNumber.NOW, proggressCallback)
        .then((result: true | ValidationException) => {
            if (result !== true) throw result;
        });
    }

    public static sendVoteorder(voter: string, postingWif: string, delegator: string, voteorder: SendVoteorder,
                                proggressCallback: (msg: string, proggress: number) => void):
                                    Promise<void> {
        const voterWise = new Wise(voter, new DirectBlockchainApi(Wise.constructDefaultProtocol(), postingWif));
        return voterWise.sendVoteorder(delegator, voteorder, proggressCallback)
        .then(() => { /**/ });
    }
    /*tslint:disable align */
    public static generateVoteorderCustomJSON(voter: string, delegator: string, voteorder: SendVoteorder,
            proggressCallback: (msg: string, proggress: number) => void, skipValidation: boolean): Promise<object []> {
        const voterWise = new Wise(voter, new DirectBlockchainApi(Wise.constructDefaultProtocol()));
        return voterWise.generateVoteorderOperations(delegator, voter, voteorder, proggressCallback, skipValidation);
    }

    /**
     * Gets current voting power of a given user.
     * @example
     *          Api.getVotingPower("noisy").then(console.log) // 94.32 [%]
     *
     *          Api.getVotingPower("noisyyydysyd")
     *              .catch(err => console.error(err.message)) // Account noisyyydysyd does not exist!
     */
    public static getVotingPower(user: string): Promise<number> {
        const steem = new steemJs.api.Steem({ url: wise.config.steem.defaultApiUrl });
        return steem.getAccountsAsync([user])
        .then((accounts: Array<{last_vote_time: string; voting_power: number, [K: string]: any}>) => {
            if (accounts[0]) return accounts[0];
            else throw new Error(`Account ${user} does not exist!`);
        })
        .then((account: {last_vote_time: string; voting_power: number, [K: string]: any}) => {
            const lastVoteSecondsAgo = (new Date().getTime() - new Date(account.last_vote_time + "Z").getTime()) / 1000;
            return Math.min(10000, account.voting_power + 10000 * lastVoteSecondsAgo / 432000) / 100;
        });
      }

    public static isWif(key: string): boolean {
        return steemJs.auth.isWif(key);
    }

    public static checkIfDelegatorAlreadyVoted(
        delegator: string,
        voteorder: SendVoteorder,
      ): Promise<boolean> {
        const steem = new steemJs.api.Steem({ url: wise.config.steem.defaultApiUrl });
        return steem
          .getContentAsync(voteorder.author, voteorder.permlink)
          .then(
            (post: {
              active_votes: Array<{
                voter: string;
                [K: string]: any;
              }>;
              [K: string]: any;
            }) => post.active_votes,
          )
          .then((votes: Array<{ voter: string; [K: string]: any }>) =>
            votes.map(vote => vote.voter),
          )
          .then((voters: string[]) => voters.indexOf(delegator) !== -1);
      }
}
