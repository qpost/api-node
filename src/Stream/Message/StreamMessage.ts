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

import StreamMessageCode from "./StreamMessageCode";
import {JsonObject, JsonProperty} from "json2typescript";

/**
 * A message sent through the Stream API.
 */
@JsonObject("StreamMessage")
export default class StreamMessage {
	/**
	 * The message code, unique to this type of message.
	 */
	@JsonProperty("code", Number)
	protected code: StreamMessageCode = undefined;

	/**
	 * The message name, unique to this type of message.
	 */
	protected name: string;

	constructor() {
		this.name = "StreamMessage";
	}

	/**
	 * The message code, unique to this type of message.
	 */
	public getCode(): StreamMessageCode {
		return this.code;
	}

	/**
	 * The message name, unique to this type of message.
	 */
	public getName(): string {
		return this.name;
	}
}