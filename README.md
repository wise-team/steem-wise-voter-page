# Wise Voter Page

<!--§ data.config.repository.readme.generateDefaultBadges(data) §-->
[![License](https://img.shields.io/github/license/wise-team/steem-wise-voter-page.svg?style=flat-square)](https://github.com/wise-team/steem-wise-voter-page/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Chat](https://img.shields.io/badge/chat%20on%20discord-6b11ff.svg?style=flat-square)](https://discordapp.com/invite/CwxQDbG) [![Wise operations count](https://img.shields.io/badge/dynamic/json.svg?label=wise%20operations%20count&url=http%3A%2F%2Fsql.wise.vote%3A%2Foperations%3Fselect%3Dcount&query=%24%5B0%5D.count&colorB=blue&style=flat-square)](http://sql.wise.vote/operations?select=moment,delegator,voter,operation_type&order=moment.desc)
<!--§§.-->

Vote delegation system for STEEM blockchain: online voting tool available at **[https://wise.vote/](https://wise.vote/)**.

Wise allows you to securely grant other users your voting power under conditions specified by you.

What is WISE? — see [steem-wise-core#how-does-wise-work](https://github.com/wise-team/steem-wise-core#how-does-wise-work) and [Manual](https://wise.vote/introduction).

Important links:

- [Wise home page](https://wise.vote/)
- [Daemon installation](https://wise.vote/installation) — how to delegate
- [Wise manual](https://wise.vote/introduction) — details about wise
- [Wise core library](https://github.com/wise-team/steem-wise-core)
- [Wise cli tool](https://github.com/wise-team/steem-wise-cli)


### Definitions

- **Delegator** — a user who owns the voting power and allows the voter to use it.
- **Voter** — a user who votes using the account of the delegator (with delegator's voting power)
- **Daemon** — a service that is running on delegator's server, that receives vote orders sent by the voter and decides weather to vote as the voter asked, or to reject the voteorder.
- ***Wise platform*** *(planned)* — an alternative to the daemon, which allows a user to be a delegator without setting up the daemon (instead the daemon is operated by us). Wise platform is under development now.
- **Ruleset** — named set of rules under which specified voter can vote with the delegator's account. Ruleset has a name, has a voter defined and has zero or more rules specified.
- **Voteorder** — a request from the voter to the delegator to vote for a given post. Contains name of the ruleset, author and permlink of the post.


## The WISE voter page

Voter page is an online app for voters that allows them to vote on behalf of their delegator's voting power. Below is an instruction on voting using this tool. If you would like to become a delegator please see installation instructions for delegators at [manual/installation](https://wise.vote/installation). To read about each of the rules please go to the [manual/rules](https://wise.vote/rules).


### Voting using voter page

You will find the Voter Page here: **https://wise.vote/voting-page/**.


![step_1](https://wise.vote/assets/images/beginners/voting-using-voter-page/step_1.png)

### 1. Go to https://wise.vote/voting-page/ &uarr;



![step_2](https://wise.vote/assets/images/beginners/voting-using-voter-page/step_2.png)

### 2. Enter your username and username of the person who has delegated you the vote &uarr;



![step_3](https://wise.vote/assets/images/beginners/voting-using-voter-page/step_3.png)

### 3. Click the blue button to load the rules under which you can use the delegation &uarr;



![step_4](https://wise.vote/assets/images/beginners/voting-using-voter-page/step_4.png)

### 4. It will take a moment for the rules to load



![step_5](https://wise.vote/assets/images/beginners/voting-using-voter-page/step_5.png)

### 5. Now choose under which set of rules you will vote

The delegator can delegate you a few rulesets with different allowed weight and different rules. You have to choose which you want to use.



![step_6](https://wise.vote/assets/images/beginners/voting-using-voter-page/step_6.png)

### 6. Paste a steemit (or busy) link and select weight of the vote

1. After pasting the link, it will be converted into format: "@author/permlink"
2. When choosing the weight of the vote, remember that the positive percentage means upvote and the negative is a flag.
3. Click "Validate voteorder" and wait for the rules to be checked. You have to remember that in addition to the rules being checked now — they will be also checked second time by the delegator's daemon.



![step_7](https://wise.vote/assets/images/beginners/voting-using-voter-page/step_7.png)

### 7. Enter YOUR posting key and click on the button.

1. As you can see on this picture, the vote command was correct and all rules were fulfilled. It may also happen that the post you have selected does not meet the criteria or selected weight is disallowed. If such a situation occurs, you will then get an error message.
2. Place your posting key in the field. It is needed because the voice command is placed on the blockchain as custom_json on your behalf. 
3. Click the button and wait for green message of success :)



### 8. Enjoy the well-fulfilled duty of making Steem a better place

Your voteorder has been placed on blockchain using custom_json command. It will be then the processed by the delegator's daemon (on his server / computer). If delegator's daemon is running now — it will be a matter of 3-12 seconds.


<!--§ data.config.repository.readme.generateHelpMd(data) §-->
## Where to get help?

- Feel free to talk with us on our chat: {https://discordapp.com/invite/CwxQDbG} .
- You can read [The Wise Manual]({https://wise.vote/introduction})
- You can also contact Jędrzej at jedrzejblew@gmail.com (if you think that you found a security issue, please contact me quickly).

You can also ask questions as issues in appropriate repository: See [issues for this repository](https://github.com/wise-team/steem-wise-voter-page/issues).

<!--§§.-->

<!--§ data.config.repository.readme.generateHelpUsMd(data) §-->
## Contribute to steem Wise

We welcome warmly:

- Bug reports via [issues](https://github.com/wise-team/steem-wise-voter-page).
- Enhancement requests via via [issues](https://github.com/wise-team/steem-wise-voter-page/issues).
- [Pull requests](https://github.com/wise-team/steem-wise-voter-page/pulls)
- Security reports to _jedrzejblew@gmail.com_.

**Before** contributing please **read [Wise CONTRIBUTING guide](https://github.com/wise-team/steem-wise-core/blob/master/CONTRIBUTING.md)**.

Thank you for developing WISE together!



## Like the project? Let @noisy-witness become your favourite witness!

If you use & appreciate our software — you can easily support us. Just cast a vote for "noisy-witness" on your steem account. You can do it here: [https://steemit.com/~witnesses](https://steemit.com/~witnesses).

<!--§§.-->

<!-- Prayer: Gloria Patri, et Filio, et Spiritui Sancto, sicut erat in principio et nunc et semper et in saecula saeculorum. Amen. In te, Domine, speravi: non confundar in aeternum. -->
