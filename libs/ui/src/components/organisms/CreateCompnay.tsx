'use clinet';
import { Dialog } from '../atoms/Dialog';
import { useFormCreateCompany } from '@spotfinder2/forms/src/createCompany';
import { useEffect, useState } from 'react';
import { Button } from '../atoms/Button';
import { HtmlLabel } from '../atoms/Label';
import { Form } from '../atoms/Form';
import { HtmlInput } from '../atoms/Input';
import { HtmlTextArea } from '../atoms/HtmlTextArea';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { CreateCompanyDocument, namedOperations } from '@spotfinder2/network/src/gql/generated';
export const CreateCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormCreateCompany();
  const session = useSession();
  const uid = session.data?.user?.uid;
  const uname = session.data?.user?.name;
  const [createCompany, { loading, data }] = useMutation(CreateCompanyDocument);
  useEffect(() => {
    if (uid) {
      setValue('managerId', uid);
    }
    setValue('managerName', uname || '');
  }, [uid, uname]);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Company</Button>
      <Dialog open={open} setOpen={setOpen} title='Create company'>
        <Form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            await createCompany({
              variables: { createCompanyInput: data },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.MyCompany],
            });
          })}
        >
          <HtmlLabel htmlFor='companyName' error={errors.displayName?.message}>
            Company Name
            <HtmlInput
              placeholder='Now, lets give your Company a name.'
              {...register('displayName')}
            />
          </HtmlLabel>
          <HtmlLabel htmlFor='Description' error={errors.description?.message}>
            Description
            <HtmlTextArea
              placeholder='Which can best describes your Company?'
              {...register('description')}
            />
          </HtmlLabel>
          <HtmlLabel htmlFor='Manager ID' error={errors.managerId?.message}>
            OwnerID
            <HtmlInput
              placeholder='Manager ID'
              {...register('managerId')}
              readOnly
            />
          </HtmlLabel>
          <HtmlLabel htmlFor='Manager Name' error={errors.managerName?.message}>
            Manager Name
            <HtmlInput
              placeholder='Manager Name'
              {...register('managerName')}
            />
          </HtmlLabel>
          <Button loading={loading} type='submit'>
            Create Now
          </Button>
        </Form>
      </Dialog>
    </div>
  );
};
