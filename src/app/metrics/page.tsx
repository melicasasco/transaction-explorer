import { getTransactions } from "../api/fetchers";
import MetricsClient from "../components/metrics/MetricsClient";

export default async function MetricsPage() {
  const data = await getTransactions();
  return <MetricsClient data={data} />;
}
