import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
    return (
        <div className="min-h-screen bg-white text-ink">
            <Header />
            <main className="pt-[72px]">{/* offset de header sticky */}
                <Outlet />
            </main>
        </div>
    );
}
