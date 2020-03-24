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
import User from "../../Entity/User";

/**
 * Sent from the server to the client as a response to {@link AuthorizationRequestMessage}.
 */
@JsonObject("AuthorizationResponseMessage")
export default class AuthorizationResponseMessage extends StreamMessage {
	/**
	 * Whether or not the authorization process was successful.
	 */
	@JsonProperty("ok", Boolean)
	public ok: boolean = undefined;

	/**
	 * A message containing details about the authorization process.
	 */
	@JsonProperty("message", String)
	public message: string = undefined;

	/**
	 * The user, that the client was authenticated as, if available.
	 */
	@JsonProperty("user", User, true)
	public user: User = undefined;

	constructor() {
		super();

		this.code = StreamMessageCode.AUTHORIZATION_REQUEST;
		this.name = "AuthorizationRequestMessage";
	}
}