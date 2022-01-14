import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const userObject = { username: username, password: password, email: email };

	const submit = (e) => {
		e.preventDefault();

		Meteor.call(
			"findUserByUsernameNew",
			username,
			userObject,
			function (error, result) {
				if (error) {
					console.log(error.reason);
					return;
				}
				console.log(result);
			}
		);

		Meteor.loginWithPassword(username, password, (error) => {
			if (error != null) {
				console.log(error.reason);
			}
		});
	};

	return (
		<form onSubmit={submit} className="login-form">
			<div>
				<label htmlFor="email">Email</label>

				<input
					id="email"
					type="email"
					placeholder="Email"
					name="email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div>
				<label htmlFor="username">Username</label>

				<input
					type="text"
					placeholder="Username"
					name="username"
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div>
				<label htmlFor="password">Password</label>

				<input
					type="password"
					placeholder="Password"
					name="password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div>
				<button type="submit">Log In</button>
			</div>
		</form>
	);
};
