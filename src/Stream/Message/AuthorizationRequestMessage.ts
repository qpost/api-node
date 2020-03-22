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

import StreamMessage from "./StreamMessage";
import StreamMessageCode from "./StreamMessageCode";
import {JsonObject, JsonProperty} from "json2typescript";

/**
 * Sent from the client to the server to identify and pass a token.
 * Should be sent right away after connecting, if no valid token has been passed after 5 seconds, the client will be disconnected.
 */
@JsonObject("AuthorizationRequestMessage")
export default class AuthorizationRequestMessage extends StreamMessage {
	/**
	 * The token to use for authentication.
	 */
	@JsonProperty("token", String)
	public token: string;

	/**
	 * The type of authorization.
	 * Use "client", "server" is only for internal usage.
	 */
	@JsonProperty("type", String)
	public type: "client" | "server";

	constructor() {
		super();

		this.code = StreamMessageCode.AUTHORIZATION_REQUEST;
		this.name = "AuthorizationRequestMessage";
	}
}