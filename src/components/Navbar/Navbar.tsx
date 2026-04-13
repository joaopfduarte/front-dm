import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  EnvironmentOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './Navbar.css';

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Início',
  },
  {
    key: '/map',
    icon: <EnvironmentOutlined />,
    label: 'Mapa',
  },
  {
    key: '/login',
    icon: <UserOutlined />,
    label: 'Perfil',
  },
  {
    key: '/about',
    icon: <InfoCircleOutlined />,
    label: 'Sobre',
  },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = (() => {
    const path = location.pathname;
    if (path === '/') return '/';
    const match = menuItems?.find(
      (item) => item && 'key' in item && path.startsWith(item.key as string) && item.key !== '/'
    );
    return match && 'key' in match ? (match.key as string) : '';
  })();

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <nav className="fauna-navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🌿</span>
        Amigos da fauna
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        items={menuItems}
        className="navbar-menu"
        style={{
          background: 'transparent',
          borderBottom: 'none',
          flex: 1,
          zIndex: 100,
          justifyContent: 'end',
          
        }}
      />
    </nav>
  );
}

export default Navbar;
