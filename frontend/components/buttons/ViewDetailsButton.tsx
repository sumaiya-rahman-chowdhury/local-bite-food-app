import Link from "next/link";

type ViewDetailsButtonProps = {
  foodId: string;
};

export function ViewDetailsButton({ foodId }: ViewDetailsButtonProps) {
  return (
    <Link href={`/food-marketplace/posts/${foodId}`}>
      <button
        className=" my-5 cursor-pointer flex justify-end items-end  w-full
       "
      >
        <span className="flex justify-center items-center bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded">
         Request Donation
        </span>
      </button>
    </Link>
  );
}
