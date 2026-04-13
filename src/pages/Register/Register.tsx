import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography, Card, Space, Result } from 'antd';
import { userService } from '../../services';
import { useOnlineStatus } from '../../components/userStatus/status';

const { Title, Text } = Typography;

function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const isOnline = useOnlineStatus()
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleFinish(values: { name: string; email: string; password: string }) {
    if(!isOnline){
      setApiError('Você está offline. Crie sua conta quando tiver conexão com a internet.');
      return;
    }
    setApiError('');
    setSubmitting(true);

    try {
      await userService.register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
        setApiError(
          err.message || 'Erro ao criar conta. Tente novamente mais tarde.'
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
          <Title level={2} style={{ marginBottom: 4 }}>Criar conta</Title>
          <Text type="secondary">Junte-se aos Amigos da Fauna</Text>
        </Space>

        {success ? (
          <Result
            status="success"
            title="Conta criada com sucesso!"
            subTitle="Redirecionando…"
          />
        ) : (
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
              label="Nome"
              name="name"
              rules={[
                { required: true, message: 'O nome é obrigatório' },
                { min: 3, message: 'O nome deve ter pelo menos 3 caracteres' },
              ]}
            >
              <Input
                id="register-name"
                placeholder="Seu nome completo"
                autoComplete="name"
              />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: 'O e-mail é obrigatório' },
                { type: 'email', message: 'Informe um e-mail válido' },
              ]}
            >
              <Input
                id="register-email"
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
                id="register-password"
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
                id="register-submit-btn"
                style={{
                  height: 48,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  background: 'linear-gradient(135deg, #4A5D23 0%, #6B7F3A 100%)',
                }}
              >
                {submitting ? 'Criando conta…' : 'Cadastrar'}
              </Button>
            </Form.Item>

            <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
              Já tem uma conta? <Link to="/login" style={{ fontWeight: 700 }}>Entrar</Link>
            </Text>
          </Form>
        )}
      </Card>
    </div>
  );
}

export default Register;
