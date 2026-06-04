"use client";

import { useRef, useState } from "react";
import { getSupabaseClient, supabase } from "@/lib/supabase";

export default function AvatarUpload({ url, size = 96, onUpload }) {
	const inputRef = useRef(null);
	const [uploading, setUploading] = useState(false);

	const openFilePicker = () => {
		if (uploading) return;
		inputRef.current?.click();
	};

	const uploadAvatar = async (file) => {
		const client = supabase ?? getSupabaseClient();
		const { data: userData, error: userError } = await client.auth.getUser();

		if (userError) {
			throw userError;
		}

		const userId = userData?.user?.id;
		if (!userId) {
			throw new Error("로그인이 필요합니다.");
		}

		const extension = file.name.split(".").pop()?.toLowerCase() || "png";
		const fileName = `${userId}-${Math.random().toString(36).slice(2)}.${extension}`;

		const { error: uploadError } = await client.storage
			.from("avatars")
			.upload(fileName, file, {
				cacheControl: "0",
				upsert: false,
			});

		if (uploadError) {
			throw uploadError;
		}

		const { data } = client.storage.from("avatars").getPublicUrl(fileName);
		return {
			publicUrl: data.publicUrl,
			path: fileName,
		};
	};

	const handleFileChange = async (event) => {
		const file = event.target.files?.[0];

		if (!file) return;

		setUploading(true);

		try {
			const { publicUrl, path } = await uploadAvatar(file);
			onUpload?.(publicUrl, path);
		} catch (error) {
			console.error(error);
			alert(error?.message || "아바타 업로드에 실패했습니다.");
		} finally {
			setUploading(false);
			if (inputRef.current) {
				inputRef.current.value = "";
			}
		}
	};

	return (
		<div className="inline-flex flex-col items-center gap-2">
			<button
				type="button"
				onClick={openFilePicker}
				className="relative overflow-hidden rounded-full border border-border bg-muted transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
				style={{ width: size, height: size }}
				disabled={uploading}
				aria-label="아바타 업로드"
			>
				{url ? (
					<img
						src={url}
						alt="avatar"
						className={`h-full w-full rounded-full object-cover ${uploading ? "opacity-50" : "opacity-100"}`}
					/>
				) : (
					<div className={`h-full w-full rounded-full bg-gray-300 ${uploading ? "opacity-50" : "opacity-100"}`} />
				)}

				{uploading ? (
					<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-xs font-medium text-white">
						업로드 중...
					</div>
				) : null}
			</button>

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={handleFileChange}
			/>
		</div>
	);
}
