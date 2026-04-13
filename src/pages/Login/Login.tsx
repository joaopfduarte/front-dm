import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography, Card, Space } from 'antd';
import { userService } from '../../services';
import { useOnlineStatus } from '../../components/userStatus/status';

const { Title, Text } = Typography;

function Login() {
  const isOnline = useOnlineStatus()
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleFinish(values: { email: string; password: string }) {
    
    if(!isOnline){
      setApiError('Você está offline. Faça login quando tiver conexão com a internet.');
      return;
    }
    setApiError('');
    setSubmitting(true);

    try {
      await userService.login({ email: values.email.trim(), password: values.password });
      navigate('/');
    } catch (err: any) {
        setApiError(
          err.status == 422 ?
             'Dados inválidos. Verifique os campos e tente novamente.'
            : err.message || 'Erro ao entrar. Tente novamente mais tarde.'
        );
      
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', padding: '2rem 1rem' }}>
      <Card
        style={{ width: '100%', maxWidth: 420 }}
        styles={{ body: { padding: '2.5rem 2rem' } }}
      >
        <Space direction="vertical" size="small" style={{ width: '100%', textAlign: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: '2.2rem' }}>🌿</span>
          <Title level={2} style={{ marginBottom: 4 }}>Entrar</Title>
          <Text type="secondary">Bem-vindo de volta!</Text>
        </Space>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
          size="large"
        >
          {apiError && (
            <Form.Item>
              <Alert message={apiError} type="error" showIcon />
            </Form.Item>
          )}

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: 'O e-mail é obrigatório' },
              { type: 'email', message: 'Informe um e-mail válido' },
            ]}
          >
            <Input
              id="login-email"
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: 'A senha é obrigatória' },
              { min: 6, message: 'A senha deve ter pelo menos 6 caracteres' },
            ]}
          >
            <Input.Password
              id="login-password"
              placeholder="Sua senha"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={submitting}
              id="login-submit-btn"
              style={{
                height: 48,
                fontWeight: 700,
                fontSize: '1.05rem',
                background: 'linear-gradient(135deg, #4A5D23 0%, #6B7F3A 100%)',
              }}
            >
              {submitting ? 'Entrando…' : 'Entrar'}
            </Button>
          </Form.Item>

          <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
            Não tem uma conta? <Link to="/register" style={{ fontWeight: 700 }}>Cadastrar</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
