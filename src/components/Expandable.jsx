import { useState } from 'react'

export function Expandable({children, label}) {
    const [isOpen, setIsOpen] = useState(false)

    function toggleOpen() {
        setIsOpen(status => !status)
    }
    
    return (
        <section className={isOpen ? 'button-expanded' : 'button-collapsed'}>
            <button onClick={toggleOpen}>
                {isOpen ? `Hide ${label}` : `Show ${label}`}
            </button>
            {isOpen && <div id="button-open">{children}</div>}
        </section>
    )
}