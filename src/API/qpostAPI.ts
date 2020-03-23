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

import BadgeStatusEndpoint from "./Endpoint/BadgeStatusEndpoint";
import BirthdaysEndpoint from "./Endpoint/BirthdaysEndpoint";
import BlockEndpoint from "./Endpoint/BlockEndpoint";
import FavoriteEndpoint from "./Endpoint/FavoriteEndpoint";
import FeedEndpoint from "./Endpoint/FeedEndpoint";
import FollowEndpoint from "./Endpoint/FollowEndpoint";
import FollowersYouKnowEndpoint from "./Endpoint/FollowersYouKnowEndpoint";
import FollowRequestEndpoint from "./Endpoint/FollowRequestEndpoint";
import NotificationsEndpoint from "./Endpoint/NotificationsEndpoint";
import RepliesEndpoint from "./Endpoint/RepliesEndpoint";
import SearchEndpoint from "./Endpoint/SearchEndpoint";
import StatusEndpoint from "./Endpoint/StatusEndpoint";
import ShareEndpoint from "./Endpoint/ShareEndpoint";
import SuggestedUsersEndpoint from "./Endpoint/SuggestedUsersEndpoint";
import TokenEndpoint from "./Endpoint/TokenEndpoint";
import TrendsEndpoint from "./Endpoint/TrendsEndpoint";
import UserEndpoint from "./Endpoint/UserEndpoint";
import nodeFetch from "node-fetch";

export type Method =
	| 'get' | 'GET'
	| 'delete' | 'DELETE'
	| 'head' | 'HEAD'
	| 'options' | 'OPTIONS'
	| 'post' | 'POST'
	| 'put' | 'PUT'
	| 'patch' | 'PATCH'
	| 'link' | 'LINK'
	| 'unlink' | 'UNLINK';

export default class qpostAPI {
	public readonly badgeStatus: BadgeStatusEndpoint = new BadgeStatusEndpoint(this);
	public readonly birthdays: BirthdaysEndpoint = new BirthdaysEndpoint(this);
	public readonly block: BlockEndpoint = new BlockEndpoint(this);
	public readonly favorite: FavoriteEndpoint = new FavoriteEndpoint(this);
	public readonly feed: FeedEndpoint = new FeedEndpoint(this);
	public readonly follow: FollowEndpoint = new FollowEndpoint(this);
	public readonly followersYouKnow: FollowersYouKnowEndpoint = new FollowersYouKnowEndpoint(this);
	public readonly followRequest: FollowRequestEndpoint = new FollowRequestEndpoint(this);
	public readonly notifications: NotificationsEndpoint = new NotificationsEndpoint(this);
	public readonly replies: RepliesEndpoint = new RepliesEndpoint(this);
	public readonly search: SearchEndpoint = new SearchEndpoint(this);
	public readonly share: ShareEndpoint = new ShareEndpoint(this);
	public readonly status: StatusEndpoint = new StatusEndpoint(this);
	public readonly suggestedUsers: SuggestedUsersEndpoint = new SuggestedUsersEndpoint(this);
	public readonly token: TokenEndpoint = new TokenEndpoint(this);
	public readonly trends: TrendsEndpoint = new TrendsEndpoint(this);
	public readonly user: UserEndpoint = new UserEndpoint(this);

	private;
	private baseURL: string = undefined;
	private authToken: string = undefined;

	constructor(baseURL: string, token?: string) {
		this.baseURL = baseURL;
		this.authToken = token;

		qpostAPI.setupFetch();
	}

	private static setupFetch(): void {
		if (global) {
			if (!("fetch" in global)) {
				global["fetch"] = nodeFetch;
			}
		}
	}

	/**
	 * Creates a request to the qpost API server.
	 *
	 * @param url The url to be requested.
	 * @param method The HTTP method to be used.
	 * @param data The request data as an object.
	 * @param callback The callback to be executed on a successful request.
	 * @param errorCallback The callback to be executed if the request fails.
	 * @deprecated
	 */
	public handleRequest(url: string, method?: Method, data?: any, callback?: (data: any) => void, errorCallback?: (error: string) => void): void {
		this.handleRequestWithPromise(url, method, data).then(value => {
			if (callback) {
				callback(value);
			}
		}).catch(reason => {
			if (errorCallback) {
				errorCallback(reason);
			}
		});
	}

	/**
	 * Creates a request to the qpost API server with a Promise return.
	 *
	 * @param url The url to be requested.
	 * @param method The HTTP method to be used.
	 * @param data The request data as an object.
	 */
	public handleRequestWithPromise(url: string, method?: Method, data?: any): Promise<any> {
		let queryString = "";
		if (method === "GET" && data) {
			queryString = "";

			for (let dataKey in data) {
				queryString += (queryString === "" ? "?" : "&") + dataKey + "=" + data[dataKey];
			}
		}

		let headers = {
			"Content-Type": "application/json"
		};

		if (this.authToken) {
			headers["Authorization"] = "Bearer " + this.authToken;
		}

		method = method || "GET";
		data = data || {};

		return new Promise<any>((resolve, reject) => {
			if (!url) {
				return reject("No URL specified.");
			}

			fetch(this.baseURL + url + queryString, {
				body: method !== "GET" ? JSON.stringify(data) : undefined,
				headers,
				method
			}).then(response => {
				response.json().then(value => {
					if (!value) {
						console.error(3, value);
						return reject("An error occurred.");
					}

					console.error(4, value);

					return value.hasOwnProperty("error") ? reject(value.error) : (response.ok ? resolve(value) : reject("An error occurred."));
				}).catch(reason => {
					if (response.ok && method === "DELETE") {
						return resolve();
					}

					return reject("An error occurred.");
				})
			}).catch(error => {
				console.error(1, error);
				return reject("An error occurred.");
			});
		});
	}
}