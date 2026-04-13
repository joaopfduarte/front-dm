import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

function NotFound() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Result
        status="404"
        title="404"
        subTitle="A página que você buscou não existe."
        extra={
          <Link to="/">
            <Button type="primary">← Voltar para página inicial</Button>
          </Link>
        }
      />
    </div>
  );
}

export default NotFound;
