import { cn } from '@/libs/util';

export function Ranking({ className, number }: { className?: string; number: number }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded w-5 h-5 text-xs',
        number === 1 && 'text-white bg-red-500',
        number === 2 && 'text-white bg-orange-500',
        number === 3 && 'text-white bg-amber-500',
        number > 3 && 'bg-gray-200',
        className,
      )}
    >
      {number}
    </span>
  );
}
