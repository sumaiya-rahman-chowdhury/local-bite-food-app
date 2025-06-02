import Image from "next/image";

export default function AboutCard({ image }: { image: string }) {
  return (
    <div className="relative w-[400px] rounded-2xl overflow-hidden shadow-xl border border-green-500">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt="People in group discussion"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="bg-green-600 text-white text-center py-4 px-3">
        <h3 className="text-xl font-bold">Donate Waste Food</h3>
        <p className="text-sm text-orange-300 mt-1">
          Reduce Hunger, Stop Wasting Food
        </p>
      </div>
    </div>
  );
}
