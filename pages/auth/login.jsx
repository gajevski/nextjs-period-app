import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log('Logged in!');
                router.push("/periods/current");
            } else {
                const data = await response.json();
                setPasswordError(data.passwordError || "");
                console.log('Login error!')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div className="relative">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Wprowadź email"
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="sr-only">Hasło</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${
                            passwordError ? "border-red-500" : ""
                        }`}
                        placeholder="Wprowadź hasło"
                    />
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <p className="text-sm text-gray-500">
                            Nie masz konta?
                        </p>
                        <Link href="/auth/register" className="text-sm text-gray-500 underline">
                            Zarejestruj się
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Zaloguj się
                    </button>
                </div>
            </form>
        </div>
    );
}
