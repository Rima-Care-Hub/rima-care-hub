import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="page container">
                <Card title="RimaCare Hub">
                    <p>Connects home care agencies, independent nurses/caregivers, and clients.</p>
                    <p>Use the navigation to explore the settings and style guide.</p>
                </Card>
            </main>
        </>
    );
}
