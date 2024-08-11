import { useMutation } from "@apollo/client";
import {
  RemoveVerificationDocument,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { Button } from "@spotfinder2/ui/src/components/atoms/Button";
import { toast } from "@spotfinder2/ui/src/components/molecules/Toast";
export const RemoveVerificationButton = ({ garage }: { garage: number }) => {
  const [RemoveVerification, { loading }] = useMutation(
    RemoveVerificationDocument,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        namedOperations.Query.Garages,
        namedOperations.Query.Admins,
      ],
      onCompleted: () => {
        toast.success("Verification removed.");
      },
      onError: () => {
        toast.error("Failed to remove verification.");
      },
    },
  );
  return (
    <Button
      size="sm"
      loading={loading}
      className="font-semibold"
      onClick={async () => {
        await RemoveVerification({
          variables: {
            where: {
              garageId: garage,
            },
          },
        });
      }}
    >
      DE-Verity
    </Button>
  );
};
