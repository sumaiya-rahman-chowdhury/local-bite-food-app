import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="w-[100px] h-[100px] mt-2 rounded-md bg-muted flex items-center justify-center animate-pulse">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
    </div>
  );
}

export default Loading;
