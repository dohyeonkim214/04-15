import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

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
		const email = String(body?.email ?? "").trim()

		if (!email) {
			return NextResponse.json({ error: "email은 필수입니다" }, { status: 400 })
		}

		const client = getSupabaseClient()
		const payload = { ...body, email }
		const { data, error } = await client
			.from("profiles")
			.upsert([payload], { onConflict: "id" })
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

		if (!id) {
			return NextResponse.json({ error: "id is required" }, { status: 400 })
		}

		const client = getSupabaseClient()
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
