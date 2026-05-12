// src/components/AuthPromptModal.jsx
import { useNavigate } from 'react-router-dom';
import Modal from './ui/Modal';
import Button from './ui/Button';

export default function AuthPromptModal({ isOpen, onClose, message = "Join PopWatch to continue" }) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="You're watching as a Guest">
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-text-secondary">{message}</p>
        <div className="flex w-full gap-3 mt-2">
          <Button variant="ghost" className="flex-1" onClick={() => navigate('/login')}>Sign In</Button>
          <Button variant="primary" className="flex-1" onClick={() => navigate('/register')}>Create Account</Button>
        </div>
      </div>
    </Modal>
  );
}