export default function Login() {

    return (
        <div>
            <label className="label">
                <span className="label-text">Login</span>
            </label>
            <input type="text" placeholder="Wpisz tutaj..." className="input input-bordered w-full max-w-xs" />
            <label className="label">
                <span className="label-text">Hasło</span>
            </label>
            <input type="text" placeholder="Wpisz tutaj..." className="input input-bordered w-full max-w-xs" />
            <button className="btn btn-active btn-primary">Zaloguj się</button>
        </div>
    );
}
