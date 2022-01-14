import React, { useState } from "react";

export const Feed = ({ feed, onCheckboxClick, onDeleteClick }) => {
	return (
		<li>
			<input
				type="checkbox"
				checked={!!feed.isChecked}
				onClick={() => onCheckboxClick(feed)}
				readOnly
			/>
			<span>{feed.text}</span>

			<button onClick={() => onDeleteClick(feed)}>&times;</button>
		</li>
	);
};
