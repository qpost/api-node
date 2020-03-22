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

import BaseObject from "../../BaseObject";
import StreamMessage from "./StreamMessage";
import StreamMessageCode from "./StreamMessageCode";
import AuthorizationRequestMessage from "./AuthorizationRequestMessage";

export default class StreamMessageParser {
	public parse(message: string): StreamMessage | null {
		const genericMessage = BaseObject.convertObject(StreamMessage, message);

		let type = StreamMessage;
		switch (genericMessage.getCode()) {
			case StreamMessageCode.AUTHORIZATION_REQUEST:
				type = AuthorizationRequestMessage;
				break;
			default:
				return null;
		}

		return BaseObject.convertObject(type, message);
	}
}