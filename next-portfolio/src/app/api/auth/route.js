import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const normalizedSupabaseUrl = supabaseUrl?.replace(/\/rest\/v1\/?$/, "");

  if (!normalizedSupabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase client is not configured");
  }

  return {
    url: normalizedSupabaseUrl,
    key: supabaseAnonKey,
  };
}

async function getRouteHandlerSupabaseClient() {
  const cookieStore = await cookies();
  const { url, key } = getSupabaseConfig();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}

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

    const client = await getRouteHandlerSupabaseClient();

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

    if (action === "logout") {
      const { error } = await client.auth.signOut();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(
        {
          message: "로그아웃 완료",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "지원하지 않는 action입니다. (login | signup | forgot | logout)" },
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