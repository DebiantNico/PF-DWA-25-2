import Image from "next/image";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";

export default function Header() {
    return (
        <div className="w-screen h-[10vh] bg-[#F7E9DE] flex flex-row items-center">
            <Link href="/" className="mx-4 flex flex-row items-center">
                <Image
                    src="/Chihuahuenios_logo.png"
                    alt="Logo de la empresa"
                    priority
                    width={50}
                    height={0}
                    draggable={false}
                    className="w-auto h-[7vh] mr-3"
                />
                <h1 className="font-semibold text-[5vh] font-['Inter',sans-serif] py-2 select-none">
                    Chihuahueños
                </h1>
            </Link>
            <Link href="/carrito" className="fixed right-4">
                <LuShoppingCart className="h-[6vh] w-auto" />
            </Link>
        </div>
    );
}