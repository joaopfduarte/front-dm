import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Skeleton, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface StatCard {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

const MOCK_STATS: StatCard[] = [
  { label: 'Users', value: '1,284', trend: 'up' },
  { label: 'Revenue', value: '$12.4k', trend: 'up' },
  { label: 'Sessions', value: '8,942', trend: 'neutral' },
  { label: 'Bounce Rate', value: '24.3%', trend: 'down' },
];

const trendConfig = {
  up: { icon: <ArrowUpOutlined />, color: '#4A5D23' },
  down: { icon: <ArrowDownOutlined />, color: '#C0392B' },
  neutral: { icon: <ArrowRightOutlined />, color: '#7A6A5E' },
};

function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setStats(MOCK_STATS), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <Title level={2}>Dashboard</Title>

      <Row gutter={[20, 20]}>
        {stats.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <Col key={i} xs={24} sm={12} md={6}>
                <Card>
                  <Skeleton active paragraph={{ rows: 1 }} />
                </Card>
              </Col>
            ))
          : stats.map((stat) => (
              <Col key={stat.label} xs={24} sm={12} md={6}>
                <Card hoverable>
                  <Statistic
                    title={stat.label}
                    value={stat.value}
                    prefix={trendConfig[stat.trend].icon}
                    valueStyle={{
                      color: trendConfig[stat.trend].color,
                      fontFamily: "'Montserrat', system-ui, sans-serif",
                    }}
                  />
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
}

export default Dashboard;
