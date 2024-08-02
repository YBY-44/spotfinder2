import { zodResolver } from '@hookform/resolvers/zod';
import { SlotType } from '@spotfinder2/network/src/gql/generated';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { ReactNode } from 'react';
export const formschemaCreateAddress = z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().min(1),
});
export const formschemaCreateSlot = z.object({
    height: z.number(),
    width: z.number(),
    length: z.number(),
    pricePerHour: z.number(),
    count: z.number().min(1).max(10, {message: 'Max 10 slots allowed'}),
    type: z.nativeEnum(SlotType),
});
export const formschemaCreateGarage = z.object({
    disPlayName: z.string().min(1),
    description:z.string().min(1),
    images:z.any(),
    location:formschemaCreateAddress,
    slotTypes: z.array(formschemaCreateSlot),
})

export type FormTypeCreateGarage = z.infer<typeof formschemaCreateGarage>;

export const useFormCreateGarage = () => {
    return (useForm<FormTypeCreateGarage>(
        {
            resolver: zodResolver(formschemaCreateGarage),
            defaultValues:{ slotTypes: []}
        }
    ));
}

export const FormProviderCreateGarage = ({children}: {children: ReactNode}) => {
    const methods = useFormCreateGarage();
    return (
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    );
}