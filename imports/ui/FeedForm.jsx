import React, { useState } from "react";
import { FeedsCollection } from "/imports/api/FeedsCollection";

export const FeedForm = ({ user }) => {
	const [text, setText] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!text) return;

		FeedsCollection.insert({
			text: text.trim(),
			createdAt: new Date(),
			userId: user._id,
		});

		setText("");
	};

	return (
		<form className="feed-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Type to add new comments"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button type="submit">Add Comments</button>
		</form>
	);
};
