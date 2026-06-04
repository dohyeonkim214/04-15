import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

function getAvatarPathFromUrl(url) {
	if (!url) return null

	try {
		const parsed = new URL(url)
		const marker = "/storage/v1/object/public/avatars/"
		const index = parsed.pathname.indexOf(marker)

		if (index !== -1) {
			return decodeURIComponent(parsed.pathname.slice(index + marker.length))
		}
	} catch {
		// Ignore parse errors and fall through.
	}

	if (typeof url === "string" && url.startsWith("avatars/")) {
		return url.slice("avatars/".length)
	}

	return typeof url === "string" ? url : null
}

function normalizeProfilePayload(body) {
	const email = String(body?.email ?? "").trim()
	const rawAvatarUrl = body?.avatar_url
	const avatarUrl = rawAvatarUrl === undefined ? undefined : String(rawAvatarUrl ?? "").trim()

	const payload = {
		...body,
		email,
	}

	if (avatarUrl !== undefined) {
		payload.avatar_url = avatarUrl || null
	}

	return payload
}

export async function GET(request) {
	try {
		const client = getSupabaseClient()
		const { searchParams } = new URL(request.url)
		const email = String(searchParams.get("email") ?? "").trim()

		let query = client
			.from("profiles")
			.select("*")
			.order("created_at", { ascending: false })
			.limit(1)

		if (email) {
			query = query.eq("email", email)
		}

		const { data, error } = await query.maybeSingle()

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json({ data: data ?? null }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "프로필 조회에 실패했습니다" }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		const body = await request.json()
		const payload = normalizeProfilePayload(body)
		const email = payload.email

		if (!email) {
			return NextResponse.json({ error: "email은 필수입니다" }, { status: 400 })
		}

		const client = getSupabaseClient()
		const cleanPayload = Object.fromEntries(
			Object.entries(payload).filter(([, value]) => value !== undefined)
		)
		const { data, error } = await client
			.from("profiles")
			.upsert([cleanPayload], { onConflict: "id" })
			.select("*")
			.single()

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "프로필 저장에 실패했습니다" }, { status: 500 })
	}
}

export async function DELETE(request) {
	try {
		const body = await request.json()
		const id = body?.id
		const avatarUrl = body?.avatar_url

		if (!id) {
			return NextResponse.json({ error: "id is required" }, { status: 400 })
		}

		const client = getSupabaseClient()
		let avatarPath = getAvatarPathFromUrl(avatarUrl)

		if (!avatarPath) {
			const { data: existingProfile } = await client
				.from("profiles")
				.select("avatar_url")
				.eq("id", id)
				.maybeSingle()

			avatarPath = getAvatarPathFromUrl(existingProfile?.avatar_url)
		}

		if (avatarPath) {
			const { error: storageError } = await client.storage
				.from("avatars")
				.remove([avatarPath])

			if (storageError) {
				return NextResponse.json({ error: storageError.message }, { status: 500 })
			}
		}

		const { data, error } = await client
			.from("profiles")
			.delete()
			.eq("id", id)
			.select("id")
			.maybeSingle()

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json({ data: data ?? { id } }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "프로필 삭제에 실패했습니다" }, { status: 500 })
	}
}
