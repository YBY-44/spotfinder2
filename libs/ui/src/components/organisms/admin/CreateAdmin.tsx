import { useState } from "react";
import { CreateAdminDocument } from "@spotfinder2/network/src/gql/generated";
import { useFormUid } from "@spotfinder2/forms/src/createUid";
import { Button } from "../../atoms/Button";
import { Dialog } from "../../atoms/Dialog";
import { HtmlInput } from "../../atoms/Input";
import { HtmlLabel } from "../../atoms/Label";
import { toast } from "../../molecules/Toast";
import { Form } from "../../atoms/Form";
import { useMutation } from "@apollo/client";

export const CreateAdmin = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useFormUid();
  const [createAdmin, { data, loading }] = useMutation(CreateAdminDocument, {
    awaitRefetchQueries: true,
    refetchQueries: ["Admins"],
    onCompleted: (data) => {
      toast.success("Admin created uid: " + data.createAdmin.uid);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Create admin
      </Button>
      <Dialog open={open} setOpen={setOpen} title={"Create admin"}>
        <Form
          onSubmit={handleSubmit(async ({ uid }) => {
            const result = await createAdmin({
              variables: {
                createAdminInput: {
                  uid,
                },
              },
            });
            setOpen(false);
            return result;
          })}
        >
          <HtmlLabel title="uid">
            <HtmlInput placeholder="uid" {...register("uid")} />
          </HtmlLabel>
          <Button loading={loading} type="submit">
            Create
          </Button>
        </Form>
      </Dialog>
    </>
  );
};
