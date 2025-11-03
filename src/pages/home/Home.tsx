function Home() {
    return (
        <div className="bg-[#FFF9F9] flex justify-center">
            <div className="container grid grid-cols-2 text-[#2F3E46]">
                <div className="flex flex-col gap-4 items-center justify-center py-8 px-6">
                    <h2 className="text-5xl font-bold text-[#E6A4B4]">Seja Bem-Vindo!</h2>
                    <p className="text-xl">Sua saúde merece o melhor cuidado!</p>
                    <button className="mt-4 px-6 py-2 bg-[#9DC3A6] text-white font-semibold rounded-xl hover:bg-[#CBB7D4] transition-all">
                        Ver Produtos
                    </button>
                </div>

                <div className="flex justify-center">
                    <img
                        src="https://i.imgur.com/Xbw6IBs.jpeg"
                        alt="Imagem Página Home"
                        className="w-3/4 rounded-2xl shadow-lg border-4 border-[#E6A4B4]"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
