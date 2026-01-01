import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Card from "../components/Card";

export default function StyleGuide() {
    return (
        <>
            <Navbar />
            <main className="page container">
                <h1>Style Guide</h1>

                <section>
                    <h2>Buttons</h2>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="danger">Danger</Button>
                </section>

                <section>
                    <h2>Badges</h2>
                    <Badge color="blue">Info</Badge>
                    <Badge color="green">Success</Badge>
                    <Badge color="gray">Neutral</Badge>
                </section>

                <section>
                    <h2>Cards</h2>
                    <Card title="Card Example">This is a card body.</Card>
                </section>
            </main>
        </>
    );
}
