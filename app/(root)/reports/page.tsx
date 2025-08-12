import Reports from '@/components/reports/Reports';
import { twMerge } from 'tailwind-merge';

const ReportsPage = () => {
  return (
    <section
      className={twMerge(
        ' max-w-[1536px] mx-auto w-full p-2.5 h-full overflow-hidden bg-base-white',
      )}
    >
      <Reports />
    </section>
  );
};

export default ReportsPage;
