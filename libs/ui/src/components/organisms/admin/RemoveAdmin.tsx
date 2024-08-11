import { useMutation } from "@apollo/client";
import { Button } from "@spotfinder2/ui/src/components/atoms/Button";
import {
  RemoveAdminDocument,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Dialog } from "../../atoms/Dialog";
import { toast } from "../../molecules/Toast";
export const RemoveAdmin = ({ uid }: { uid: string }) => {
  const [removeAdmin, { loading }] = useMutation(RemoveAdminDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.Admins],
    onCompleted: (data) => {
      toast.success(
        "Admin " + data.removeAdmin.uid + " removed successfully !",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        varient={"text"}
        onClick={() => setOpen(true)}
        loading={loading}
        size="none"
      >
        <IconTrash className="w-8 h-8 p-2 bg-red-50 rounded-md" />
      </Button>
      <Dialog open={open} setOpen={setOpen} title={"Delete"}>
        <div>
          <div>
            Are you sure you want to delete this admin from the admin realm?
          </div>
          <div className="my-2 text-xs text-gray">{uid}</div>
          <div className="grid w-full grid-cols-2 gap-2 mt-4">
            <Button
              varient="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              No.
            </Button>
            <Button
              loading={loading}
              onClick={async () => {
                return await removeAdmin({ variables: { where: { uid } } });
              }}
            >
              Yes.
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
