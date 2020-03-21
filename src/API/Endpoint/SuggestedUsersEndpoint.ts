/*
 * Copyright (C) 2018-2020 Gigadrive - All rights reserved.
 * https://gigadrivegroup.com
 * https://qpostapp.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://gnu.org/licenses/>
 */

import User from "../../Entity/User";
import BaseObject from "../../BaseObject";
import APIEndpoint from "./APIEndpoint";

export default class SuggestedUsersEndpoint extends APIEndpoint {
	private path: string = "/user/suggested";

	/**
	 * Gets the currently logged in user's suggestions.
	 */
	public get(): Promise<User[]> {
		return new Promise<User[]>((resolve, reject) => {
			return this.api.handleRequestWithPromise(this.path, "GET").then(value => {
				resolve(BaseObject.convertArray(User, value));
			}).catch(reason => {
				reject(reason);
			});
		});
	}
}