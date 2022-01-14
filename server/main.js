import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { FeedsCollection } from "/imports/api/FeedsCollection";

const insertFeed = (feedText, user) =>
	FeedsCollection.insert({
		text: feedText,
		userId: user._id,
		createdAt: new Date(),
	});

const SEED_USERNAME = "discussionBoard";
const SEED_PASSWORD = "password123";
const SEED_EMAIL = "zip123@gmail.com";

Meteor.startup(() => {
	if (!Accounts.findUserByUsername(SEED_USERNAME)) {
		Accounts.createUser({
			username: SEED_USERNAME,
			password: SEED_PASSWORD,
			email: SEED_EMAIL,
		});
	}

	const user = Accounts.findUserByUsername(SEED_USERNAME);

	if (FeedsCollection.find().count() === 0) {
		["Default Feed 1", "Default Feed 2", "Default Feed 3"].forEach(
			(feedText) => insertFeed(feedText, user)
		);
	}
});
