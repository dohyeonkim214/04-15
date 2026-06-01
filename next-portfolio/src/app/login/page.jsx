"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient, supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("auth");

  const clearFeedback = () => {
    setError("");
    setMessage("");
  };

  useEffect(() => {
    const requestedMode = searchParams.get("mode");
    if (requestedMode === "forgot" || requestedMode === "reset") {
      setMode(requestedMode);
      return;
    }

    if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
      setMode("reset");
    }
  }, [searchParams]);

  useEffect(() => {
    async function checkExistingSession() {
      try {
        const inResetFlow =
          searchParams.get("mode") === "reset" ||
          (typeof window !== "undefined" && window.location.hash.includes("type=recovery"));

        if (inResetFlow) {
          return;
        }

        const client = supabase ?? getSupabaseClient();
        const { data, error } = await client.auth.getSession();
        if (error) return;
        if (data?.session) {
          router.replace("/profile");
        }
      } catch {
        // Ignore session check errors and keep login page interactive.
      }
    }

    checkExistingSession();
  }, [router, searchParams]);

  const handleSignUp = async () => {
    clearFeedback();

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "signup",
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result?.error || "회원가입에 실패했습니다.");
        return;
      }

      setMessage(result?.message || "가입 성공! 이메일을 확인해주세요.");
    } catch (err) {
      setError(err?.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    clearFeedback();

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result?.error || "로그인에 실패했습니다.");
        return;
      }

      const session = result?.session;
      const accessToken = session?.access_token;
      const refreshToken = session?.refresh_token;

      if (accessToken && refreshToken) {
        const client = supabase ?? getSupabaseClient();
        const { error: sessionError } = await client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          setError(sessionError.message || "세션 설정에 실패했습니다.");
          return;
        }
      }

      setMessage(result?.message || "로그인 성공!");
      router.replace("/profile");
      router.refresh();
    } catch (err) {
      setError(err?.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    clearFeedback();

    if (!email) {
      setError("비밀번호 재설정 이메일을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "forgot",
          email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result?.error || "비밀번호 재설정 메일 전송에 실패했습니다.");
        return;
      }

      setMessage(result?.message || "비밀번호 재설정 링크를 이메일로 보냈습니다.");
    } catch (err) {
      setError(err?.message || "비밀번호 재설정 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    clearFeedback();

    if (!newPassword || !confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);

    try {
      const client = supabase ?? getSupabaseClient();
      const { data: sessionData } = await client.auth.getSession();

      if (!sessionData?.session) {
        setError("재설정 링크를 통해 다시 접속해주세요.");
        return;
      }

      const { error: updateError } = await client.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message || "비밀번호 변경에 실패했습니다.");
        return;
      }

      setMessage("비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.");
      setMode("auth");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err?.message || "비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const isAuthMode = mode === "auth";
  const isForgotMode = mode === "forgot";
  const isResetMode = mode === "reset";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
            {isAuthMode ? "로그인 / 회원가입" : isForgotMode ? "비밀번호 찾기" : "비밀번호 재설정"}
          </h1>
          <p className="mb-6 text-center text-sm text-slate-500">
            {isAuthMode
              ? "이메일과 비밀번호를 입력해 계정에 접속하세요."
              : isForgotMode
                ? "가입한 이메일을 입력하면 재설정 링크를 보내드립니다."
                : "새 비밀번호를 입력해 계정을 다시 활성화하세요."}
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                disabled={loading}
              />
            </div>

            {isAuthMode ? (
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                  disabled={loading}
                />
              </div>
            ) : null}

            {isResetMode ? (
              <>
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    새 비밀번호
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호를 입력하세요"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    새 비밀번호 확인
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호를 다시 입력하세요"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                    disabled={loading}
                  />
                </div>
              </>
            ) : null}
          </div>

          {isAuthMode ? (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "처리 중..." : "로그인"}
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "처리 중..." : "회원가입"}
              </button>
            </div>
          ) : null}

          {isForgotMode ? (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "처리 중..." : "재설정 링크 보내기"}
              </button>
            </div>
          ) : null}

          {isResetMode ? (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "처리 중..." : "새 비밀번호 저장"}
              </button>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            {isAuthMode ? (
              <button
                type="button"
                onClick={() => {
                  clearFeedback();
                  setMode("forgot");
                }}
                className="font-medium text-slate-700 underline-offset-2 hover:underline"
              >
                Forgot password?
              </button>
            ) : null}

            {!isAuthMode ? (
              <button
                type="button"
                onClick={() => {
                  clearFeedback();
                  setMode("auth");
                }}
                className="font-medium text-slate-700 underline-offset-2 hover:underline"
              >
                로그인 화면으로 돌아가기
              </button>
            ) : null}
          </div>

          {error ? (
            <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
          ) : null}
          {message ? (
            <p className="mt-2 text-sm font-medium text-emerald-600">{message}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
