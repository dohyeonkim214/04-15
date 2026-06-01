import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

function normalizeCredentials(body) {
  const action = String(body?.action ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");

  return { action, email, password };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, password } = normalizeCredentials(body);
    const origin = new URL(request.url).origin;

    if (!action) {
      return NextResponse.json(
        { error: "action은 필수입니다." },
        { status: 400 },
      );
    }

    if ((action === "login" || action === "signup") && (!email || !password)) {
      return NextResponse.json(
        { error: "action, email, password는 필수입니다." },
        { status: 400 },
      );
    }

    const client = getSupabaseClient();

    if (action === "signup") {
      const { data, error } = await client.auth.signUp({
        email,
        password,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(
        {
          message: "가입 성공! 이메일을 확인해주세요.",
          user: data.user ?? null,
        },
        { status: 200 },
      );
    }

    if (action === "login") {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }

      return NextResponse.json(
        {
          message: "로그인 성공!",
          user: data.user ?? null,
          session: data.session ?? null,
        },
        { status: 200 },
      );
    }

    if (action === "forgot") {
      if (!email) {
        return NextResponse.json({ error: "email은 필수입니다." }, { status: 400 });
      }

      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/login?mode=reset`,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(
        {
          message: "비밀번호 재설정 링크를 이메일로 보냈습니다.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "지원하지 않는 action입니다. (login | signup | forgot)" },
      { status: 400 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "인증 처리 중 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}