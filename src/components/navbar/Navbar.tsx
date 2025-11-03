import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="w-full flex justify-center py-4 bg-[#E6A4B4] text-[#2F3E46] shadow-md">
            <div className="container flex justify-between items-center text-lg mx-8 font-semibold">
                <Link to='/home' className="text-2xl font-bold">Floravida 🌸</Link>

                <div className="flex gap-6">
                    <a href="#" className="hover:text-[#9DC3A6] transition-colors">Produtos</a>
                    <a href="#" className="hover:text-[#9DC3A6] transition-colors">Carrinho</a>
                    <a href="#" className="hover:text-[#9DC3A6] transition-colors">Categorias</a>
                    <a href="#" className="hover:text-[#9DC3A6] transition-colors">Perfil</a>
                    <a href="#" className="hover:text-[#9DC3A6] transition-colors">Sair</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar
