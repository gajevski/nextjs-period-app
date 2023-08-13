export default function Register() {

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
            <button className="btn btn-active btn-primary">Zarejestruj się</button>
        </div>
    );
}
