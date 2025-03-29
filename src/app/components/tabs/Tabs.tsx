'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const router = useRouter()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/dashboard?tab=${tab}`)
  }

  return (
    <div className="flex justify-center mt-4 ">
      <div>
      <button
        className={`pb-2 px-4 cursor-pointer `}
        onClick={() => handleTabChange("diario")}
      >
        Diario
        {activeTab === "diario" && <div className='mt-4'><Image src="/dot.svg" alt="Active" width={10} height={10} className="block mx-auto " /></div>}
      </button></div>
      <div>
      <button
        className={`pb-2 px-4 cursor-pointer`}
        onClick={() => handleTabChange("semanal")}
      >
        Semanal
        {activeTab === "semanal" &&  <div className='mt-4'><Image src="/dot.svg" alt="Active" width={10} height={10} className="block mx-auto" /></div>}
      </button></div>
      <div>
      <button
        className={`pb-2 px-4 cursor-pointer`}
        onClick={() => handleTabChange("mensual")}
      >
        Mensual
        {activeTab === "mensual" && <div className='mt-4'><Image src="/dot.svg" alt="Active" width={10} height={10} className="block mx-auto" /></div>}
      </button></div>
    </div>
    
  )
} 