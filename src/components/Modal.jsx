import { useEffect, useRef } from 'react';

export default function Modal({ children, open, onClose, className }) {
    const dialog = useRef();

    useEffect(() => {
        const currentDialog = dialog.current;
        if (currentDialog) {
            if (open) {
                currentDialog.showModal();
            } else {
                currentDialog.close();
            }
        }

        return () => {
            if (currentDialog) {
                currentDialog.close();
            }
        };
    }, [open]);

    return (
        <dialog ref={dialog} onClose={onClose} className={`modal ${className}`}>
            {children}
        </dialog>
    );
}