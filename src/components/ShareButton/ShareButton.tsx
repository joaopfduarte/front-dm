import { useState } from 'react';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { toast } from 'sonner';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}
const sendSuccess = (message: string, toastId: number) => {
  toast.success(message, {
    style: {
      background: '#346E62',
      color: '#fff'
    },
    id: toastId,
  });
}
const sendError = (message: string, toastId: number) => {
  toast.error(`${message}`, {
    style: {
      background: '#8B0000',
      color: '#fff'
    },
    id: toastId,
  });
}
const ShareButton = ({ title, text, url }: ShareButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleShareClick = async () => {
    if (!navigator.share) {
      navigator.clipboard.writeText(url || window.location.href);
      sendSuccess('URL copiada para a área de transferência!', -1)
      setLoading(false);
      return;
    }

    try {
      await navigator.share({
        title: title || 'Venha ver isso no Amigos da Fauna!',
        text: text || 'Achei esse conteúdo bem interessante!',
        url: url || window.location.href,
      });

      console.log('Compartilhado com sucesso!');
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error('Falha ao compartilhar', error);
        sendError('Ocorreu um erro ao tentar abrir as opções de compartilhamento.', -1)
      }
    }
  };

  return (
    <Button
      type="default"
      icon={<ShareAltOutlined />}
      onClick={handleShareClick}
      loading={loading}
      block
      style={{
        height: 44,
        fontWeight: 600,
        fontSize: '1rem',
        marginTop: 12
      }}
    >
      Compartilhar
    </Button>
  );
};

export default ShareButton;