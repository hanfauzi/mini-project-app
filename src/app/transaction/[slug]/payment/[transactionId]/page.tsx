import PaymentClient from "./PaymentClient";

export default function PaymentPage({
  params,
}: {
  params: { transactionId: string };
}) {
  return <PaymentClient transactionId={params.transactionId} />;
}
