import { Card, Typography, List } from 'antd';

const { Title, Paragraph } = Typography;

const items = [
  'Mapeamento geográfico interativo das localizações dos animais;',
  'Quizzes educativos para testar conhecimentos de forma lúdica;',
  'Catálogo detalhado sobre características ecológicas e habitats;',
  'Abordagem visual voltada para a sustentabilidade e respeito à natureza.',
];

function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#5D4037', fontFamily: "var(--font-heading)" }}>Sobre o projeto Amigos da Fauna</Title>

      <Card style={{ width: '100%', maxWidth: 800, borderColor: '#D38345', borderWidth: 2, background: 'rgba(245, 241, 227, 0.4)' }}>
        <Paragraph style={{ fontSize: '1.1rem', color: '#5D4037' }}>
          O <strong>Amigos da Fauna</strong> é um projeto de conscientização ambiental e educação que busca aproximar as pessoas da rica biodiversidade da fauna brasileira. Através de nossa plataforma, o esforço é promover não apenas o conhecimento, mas o respeito e a valorização do meio ambiente de maneira interativa.
        </Paragraph>
        <Paragraph style={{ fontSize: '1.1rem', color: '#5D4037' }}>
          Para que o aprendizado seja engajador e recompensador, nosso projeto conta com:
        </Paragraph>

        <List
          style={{ marginTop: 16 }}
          dataSource={items}
          renderItem={(item) => (
            <List.Item style={{ borderBottom: 'none', padding: '6px 0', fontSize: '1.05rem', color: '#4A5D23', fontWeight: 600 }}>
              <span style={{ marginRight: 12 }}>🌿</span>
              {item}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default About;
