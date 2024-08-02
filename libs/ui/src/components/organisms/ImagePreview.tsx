import { BaseComponent } from '@spotfinder2/util/types';
import { IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
export interface ImageUploadProps extends BaseComponent {
  srcs: FileList;
  clearImage: () => void;
}
export const ImagePerview = ({
  srcs,
  clearImage,
  children,
}: ImageUploadProps) => {
  if (srcs && srcs?.length > 0) {
    return (
      <div className='grid grid-cols-2 gap-2 relative'>
        <button
          onClick={() => clearImage()}
          className='absolute z-10 p-2 text-white bg-red/80 flex gap-2 items-center rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md'
        >
          <IconTrash /> Clear All
        </button>
        {Array.from(srcs).map((file, index) => {
          return (
          <Image key={index} className="object-cover h-full w-full aspect-square rounded-md"
          alt=""
          height={300}
          width={300}
          src={URL.createObjectURL(file)}/>);
        })}
      </div>
    );
  }
  return (
    <div className='flex items-center justify-center w-full h-full min-h-36'>
        {children}
    </div>
  )
};
