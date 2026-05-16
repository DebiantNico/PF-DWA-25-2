'use client';

import comprar from "@/actions/carrito/comprar";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ButtonComprar() {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [error, setError] = useState(false);

    const compra = async () => {
        onOpen();
        setError(await comprar());
    };

    const redir = () => router.push("/");

    return (
        <>
            <Button color="warning" onPress={compra} className="w-full">
                Comprar
            </Button>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <h1 className="text-center text-xl mt-6">
                                    {error ? "Hubo un error en la compra" : "Compra exitosa"}
                                </h1>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                {!error && (
                                    <Button color="warning" onPress={redir}>
                                        Ir a inicio
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}