import HomePageHeader from "./Header";
import Hero from "./Hero";
import { Footer } from "./Footer";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <header className="sticky top-0 z-50 w-full bg-[#fafafa]">
                <div className="mx-auto lg:px-60">
                    <HomePageHeader />
                </div>
            </header>

            <main className="mx-auto space-y-12 pb-20 lg:px-60">
                <Hero />
            </main>

            <Footer />
        </div>
    );
}