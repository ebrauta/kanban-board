import { useEffect, type FC, type ReactNode } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const Portal = (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4" onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
    useEffect(() => {
        if (!isOpen) return
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null
    return createPortal(Portal, document.body)
}

export default Modal