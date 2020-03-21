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

import {JsonObject, JsonProperty} from "json2typescript";
import User from "./User";
import FeedEntryType from "./FeedEntryType";
import MediaFile from "./MediaFile";

@JsonObject("FeedEntry")
export default class FeedEntry {
	@JsonProperty("id", Number)
	private id: number = undefined;

	@JsonProperty("user", User)
	private user: User = undefined;

	@JsonProperty("text", String, true)
	private text?: string = undefined;

	@JsonProperty("following", User, true)
	private following?: User = undefined;

	@JsonProperty("parent", FeedEntry, true)
	private parent?: FeedEntry = undefined;

	@JsonProperty("type", FeedEntryType)
	private type: FeedEntryType = undefined;

	@JsonProperty("nsfw", Boolean)
	private nsfw: boolean = undefined;

	@JsonProperty("attachments", [MediaFile])
	private attachments: MediaFile[] = undefined;

	@JsonProperty("time", String)
	private time: string = undefined;

	@JsonProperty("replyCount", Number)
	private replyCount: number = undefined;

	@JsonProperty("shareCount", Number)
	private shareCount: number = undefined;

	@JsonProperty("favoriteCount", Number)
	private favoriteCount: number = undefined;

	@JsonProperty("shared", Boolean)
	private shared: boolean = undefined;

	@JsonProperty("favorited", Boolean)
	private favorited: boolean = undefined;

	public getId(): number {
		return this.id;
	}

	public getUser(): User {
		return this.user;
	}

	public getText(): string | undefined {
		return this.text;
	}

	public getFollowing(): User | undefined {
		return this.following;
	}

	public getParent(): FeedEntry | undefined {
		return this.parent;
	}

	public getType(): FeedEntryType {
		return this.type;
	}

	public isNSFW(): boolean {
		return this.nsfw;
	}

	public getAttachments(): MediaFile[] {
		return this.attachments;
	}

	public getTime(): string {
		return this.time;
	}

	public getReplyCount(): number {
		return this.replyCount;
	}

	public getShareCount(): number {
		return this.shareCount;
	}

	public getFavoriteCount(): number {
		return this.favoriteCount;
	}

	public setFavoriteCount(favoriteCount: number): void {
		this.favoriteCount = favoriteCount;
	}

	public isShared(): boolean {
		return this.shared;
	}

	public isFavorited(): boolean {
		return this.favorited;
	}
}