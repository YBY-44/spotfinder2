import { useMutation } from "@apollo/client";
import {
  CreateVerificationDocument,
  namedOperations,
  AdminsDocument,
} from "@spotfinder2/network/src/gql/generated";
import { Button } from "@spotfinder2/ui/src/components/atoms/Button";
import { toast } from "@spotfinder2/ui/src/components/molecules/Toast";
export const CreateVerificationButton = ({ garage }: { garage: number }) => {
  const [CreateVerification, { loading }] = useMutation(
    CreateVerificationDocument,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        namedOperations.Query.Garages,
        namedOperations.Query.Admins,
      ],
      onCompleted: () => {
        toast.success("Verification Successful.");
      },
      onError: () => {
        toast.error("Failed to verification.");
      },
    },
  );
  return (
    <Button
      size="sm"
      loading={loading}
      className="font-semibold"
      onClick={async () => {
        await CreateVerification({
          variables: {
            createVerificationInput: {
              garageId: garage,
              verified: true,
            },
          },
        });
      }}
    >
      Verify
    </Button>
  );
};
