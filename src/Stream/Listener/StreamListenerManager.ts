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

import StreamListener from "./StreamListener";
import StreamMessageParser from "../Message/StreamMessageParser";

/**
 * Manager class for all Stream API listeners.
 */
export default class StreamListenerManager {
	/**
	 * All currently registered listeners.
	 */
	protected listeners: StreamListener[];

	/**
	 * Parser instance used for parsing incoming messages.
	 */
	protected parser: StreamMessageParser;

	constructor() {
		this.listeners = [];
		this.parser = new StreamMessageParser();
	}

	/**
	 * All currently registered listeners.
	 */
	public getListeners(): StreamListener[] {
		return this.listeners;
	}

	/**
	 * Parser instance used for parsing incoming messages.
	 */
	public getParser(): StreamMessageParser {
		return this.parser;
	}

	/**
	 * Registers a listener, that will be fed incoming messages.
	 * @param listener The listener to be registered.
	 */
	public registerListener(listener: StreamListener): void {
		if (this.listeners.includes(listener)) return;

		this.listeners.push(listener);
	}

	/**
	 * Handles a message string, if successful, it will be passed to all registered listeners.
	 * @param rawMessage The message string to handle.
	 */
	public handleMessage(rawMessage: string): void {
		const message = this.parser.parse(rawMessage);
		if (message === null || message.getName() === "StreamMessage") return;

		const functionName = "on" + message.getName();
		this.listeners.forEach(listener => {
			if (functionName in listener) {
				listener[functionName](message);
			}
		});
	}
}