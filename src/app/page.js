"use client";
import { useRouter } from "next/navigation";
import Hyperspeed from "../../widgets/Home/Hyperspeed";

export default function Page() {
  const router = useRouter();
  return (
    <div className="pagemaincenter">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-auto z-10" onClick={(e)=>router.replace("/dashboard")}>
        <p className="text-6xl font-bold" >Auto Range</p>
      </div>
      <Hyperspeed />
    </div>
  );
}
