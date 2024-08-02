import { ReactNode } from 'react';
import { LoadingPage } from '../molecules/Loader';
import { Pagination } from '@mui/material';
import { AlertSection } from '../molecules/AlertSection';
import { NoResults } from '../molecules/NoResults';
interface ShowDataProps {
  error?: string;
  loading?: boolean;
  pagination: {
    setSkip: (skip: number) => void;
    setTake: (take: number) => void;
    skip: number;
    take: number;
    resultCount?: number;
    totalCount?: number;
  };
  title?: React.ReactNode;
  children?: React.ReactNode;
}
export const ShowData = ({
  error,
  loading,
  pagination,
  title,
  children,
}: ShowDataProps) => {
  const { setSkip, setTake, skip, take, resultCount, totalCount } = pagination;
  console.log('resultCount', resultCount);
  const handlePageChange = (event: React.MouseEvent<unknown>, page: number) => {
    setSkip((page - 1) * take);
  };
  const totalPages = Math.ceil((totalCount || 0) / take);
  return (
    <div>
      <h2 className='text-lg mb-1 font-semibold mt-2'>{title}</h2>
      {loading && <LoadingPage text='' />}
      {!loading && !error && resultCount === 0 && <NoResults />}
      {error && (
        <AlertSection>
          Sorry, something went wrong. Please try again later.{' '}
          <span className='text-xs'>PSST. {error}</span>
        </AlertSection>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {children}
      </div>
      <div className='flex justify-center mt-8'>
        <Pagination count={totalPages} showFirstButton showLastButton page={skip / take + 1} />
      </div>
    </div>
  );
};
