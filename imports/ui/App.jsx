import { Meteor } from "meteor/meteor";
import React, { Fragment, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { FeedsCollection } from "/imports/api/FeedsCollection";
import { Feed } from "./Feed";
import { FeedForm } from "./FeedForm";
import { LoginForm } from "./LoginForm";

const toggleChecked = ({ _id, isChecked }) => {
	FeedsCollection.update(_id, {
		$set: {
			isChecked: !isChecked,
		},
	});
};

const deleteFeed = ({ _id }) => FeedsCollection.remove(_id);

export const App = () => {
	const user = useTracker(() => Meteor.user());

	const [hideFeed, setHideFeed] = useState(false);

	const hideFeedFilter = { isChecked: { $ne: true } };

	const userFilter = user ? { userId: user._id } : {};

	const pendingOnlyFilter = { ...hideFeedFilter, ...userFilter };

	const feeds = useTracker(() => {
		if (!user) {
			return [];
		}

		return FeedsCollection.find(hideFeed ? pendingOnlyFilter : userFilter, {
			sort: { createdAt: -1 },
		}).fetch();
	});

	const logout = () => {
		Meteor.logout();
	};

	return (
		<div className="app">
			<header>
				<div className="app-bar">
					<div className="app-header">
						<h1>
							Welcome to Discussion Board!
							{feeds.length > 0 ? " (" + feeds.length + ")	" : ""}
						</h1>
					</div>
				</div>
			</header>

			<div className="main">
				{user ? (
					<Fragment>
						<div className="user">
							<p>
								{user.username} <span onClick={logout}>🚪</span>
							</p>
						</div>

						<FeedForm user={user} />

						<div className="container">
							<p className="mainFeed">
								This is the main feed. You can enter the
								comments below!
								<span className="showEmail">
									{user.emails[0].address}
								</span>
							</p>
						</div>

						<div className="filter">
							<button onClick={() => setHideFeed(!hideFeed)}>
								{hideFeed ? "Show All" : "Hide Comments"}
							</button>
						</div>

						<ul className="feeds">
							{feeds.map((feed) => (
								<Feed
									key={feed._id}
									feed={feed}
									onCheckboxClick={toggleChecked}
									onDeleteClick={deleteFeed}
								/>
							))}
						</ul>
					</Fragment>
				) : (
					<LoginForm />
				)}
			</div>
		</div>
	);
};
