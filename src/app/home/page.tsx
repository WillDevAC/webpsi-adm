import { StatisticsClient } from "@/components/client/statistics";
import { NavigationType, RootTemplate } from "@/components/layout/root";

export default function HomePage() {
  return (
    <>
      <RootTemplate type={NavigationType.Home}>
        <main className="container mt-5">
        <StatisticsClient />

        </main>
      </RootTemplate>
    </>
  );
}
