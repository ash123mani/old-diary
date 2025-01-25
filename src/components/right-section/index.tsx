import {useState} from "react";
import {Modal} from "../../common/modal/modal.tsx";

export function RightSection() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section>
      <button onClick={() => setIsModalOpen(true)}>
        + section
      </button>
      <button onClick={() => setIsModalOpen(true)}>+ page</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Modal Title</h2>
        <p>This is a modal content area. Add your content here.</p>
      </Modal>

    </section>
  )
}