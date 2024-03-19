import { ComingSoon } from "@/app/components/ComingSoon";

interface Props {
  params: {
    accountId: string;
  };
}

export default function AccountPage({ params }: Props) {
  return <ComingSoon />;
}
