import { InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {
    const data = new Date().getFullYear()

    return (
        <div className="flex justify-center bg-[#E6A4B4] text-[#2F3E46]">
            <div className="container flex flex-col items-center py-6 gap-2">
                <p className="text-xl font-bold">Floravida 🌸 | Copyright {data}</p>
                <p className="text-lg">Acesse nossas redes sociais</p>
                <div className="flex gap-4 text-[#9DC3A6]">
                    <a href="https://www.linkedin.com/in/seu_usuario" target="_blank">
                        <LinkedinLogoIcon size={36} weight="fill" />
                    </a>
                    <a href="https://www.instagram.com/seu_usuario" target="_blank">
                        <InstagramLogoIcon size={36} weight="fill" />
                    </a>
                    
                </div>
            </div>
        </div>
    )
}

export default Footer
