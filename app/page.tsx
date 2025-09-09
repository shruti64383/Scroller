import ScrollImageGallery from "@/components/ScrollImageGallery"

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
       
      <nav className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="text-xl font-medium">Home</div>
      </nav>
             
      <div className="h-20"></div>

       
      <main>
        <ScrollImageGallery />
      </main>

       
      <footer className="h-32 flex items-center justify-center border-t border-gray-800">
        <div className="text-center text-gray-400">Footer</div>
      </footer>
    </div>
  )
}
