import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Spin, Result, Progress, Space, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { quizService } from '../../services';
import type { QuizQuestion, QuizOption } from '../../services';
import { toast } from 'sonner';
import { useOnlineStatus } from '../../components/userStatus/status';

const { Title, Text } = Typography;

interface ParsedQuestion extends Omit<QuizQuestion, 'options'> {
  parsedOptions: QuizOption[];
}

function Quiz() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [hits, setHits] = useState(0);
  const [fails, setFails] = useState(0);
  const [finished, setFinished] = useState(false);
  const isOnline = useOnlineStatus()
  const [submitting, setSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<'correct' | 'incorrect' | null>(null);
  const [counter, setCounter] = useState<number>(-1);
  const [answerDetails, setAnswerDetails] = useState<string>('');

  const navigate = useNavigate();

  const sendError = (message:string,toastId:number) => {
    toast.error(`${message}`, {
      style: {
        background: '#8B0000',
        color: '#fff'
      },
      id: toastId,
    });
  }

  useEffect(() => {
    async function loadQuiz() {
    if(!isOnline){
      sendError("É necessário conexão com a internet para jogar o quiz.",-1)
      navigate('/')
      return;
    }
      if (!id) return;
      try {
        setLoading(true);
        const data = await quizService.getQuizByAnimalId(Number(id));

        const parsed = data.map((q) => {
          let parsedOptions: QuizOption[] = [];
          try {
            parsedOptions = JSON.parse(q.options);
          } catch {
            console.error('Failed to parse options for question', q.code);
          }
          return { ...q, parsedOptions };
        });

        setQuestions(parsed);
      } catch (err: any) {
        if(err.status == 401 || err.status == 422){
          sendError("É necessário fazer login para jogar o quiz.",-1)
          navigate('/login')
        }else{
          setError(err.message || 'Erro ao carregar o quiz.');
        }
      
        
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [id]);

  const handleAnswer = async (optionId: number) => {
    if (submitting || answerResult) return;

    setSelectedOption(optionId);
    setSubmitting(true);

    const currentQuestion = questions[currentIndex];
    let n: number = 4000;
    try {
      const response = await quizService.submitAnswer({
        questionCode: currentQuestion.code,
        userAnswer: optionId,
      });

      const isCorrect = response?.isAnswerRight === true;

      if (isCorrect) {
        setHits((h) => h + 1);
        setAnswerResult('correct');
      } else {
        setFails((f) => f + 1);
        setAnswerResult('incorrect');
        setAnswerDetails(
          response.answerDetails ? `Detalhes da resposta: ${response.answerDetails}` : ''
        );
        n = 10000;
      }
      counterDown(Math.floor(n / 1000));
      changeToNextQuestion(n);
    } catch {
      setFails((f) => f + 1);
      setAnswerResult('incorrect');
      counterDown(n);
      changeToNextQuestion(n);
    }
  };

  const changeToNextQuestion = (n: number) => {
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((c) => c + 1);
        setAnswerResult(null);
        setSelectedOption(null);
      } else {
        setFinished(true);
      }
      setSubmitting(false);
      setAnswerDetails('');
    }, n);
  };

  const counterDown = (start: number) => {
    setCounter(start);
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const defineMessageCounter = () => {
    if (currentIndex === questions.length - 1 && counter !== -1) {
      return `Resultados em ${counter}`;
    } else if (counter > 0) {
      return `Próxima pergunta em ${counter}`;
    } else if (answerDetails) {
      return '';
    }
    return '';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <Space direction="vertical" align="center">
          <Spin size="large" />
          <Text strong>Carregando quiz...🌿</Text>
        </Space>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <Result
          status="error"
          title="Erro"
          subTitle={error}
          extra={
            <Link to="/">
              <Button type="primary">Voltar para Home</Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <Result
          status="info"
          title="Nenhuma pergunta encontrada"
          subTitle="Aguarde novas perguntas."
          extra={
            <Link to="/">
              <Button type="primary">Voltar para Home</Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (finished) {
    const total = hits + fails;
    const hitPercentage = total > 0 ? Math.round((hits / total) * 100) : 0;

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '2rem' }}>
         
        <Card style={{ width: '100%', maxWidth: 700, textAlign: 'center' }}>
          <Title level={2} style={{ color: '#5D4037', marginBottom: 24 }}>
            Resultado do Quiz
          </Title>

          <Progress
            type="circle"
            percent={hitPercentage}
            size={150}
            strokeColor="#4A5D23"
            trailColor="#D38345"
            format={(p) => <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#5D4037' }}>{p}%</span>}
          />

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '24px 0' }}>
            <Tag color="green" style={{ fontSize: '0.95rem', padding: '4px 12px' }}>
              Acertos: {hits}
            </Tag>
            <Tag color="orange" style={{ fontSize: '0.95rem', padding: '4px 12px' }}>
              Erros: {fails}
            </Tag>
          </div>

          <Text strong style={{ fontSize: '1.1rem', color: '#5D4037' }}>
            {hitPercentage >= 70
              ? 'Ótimo trabalho! Você conhece bem nossa fauna!'
              : 'Continue aprendendo sobre nossos animais!'}
          </Text>

          <div style={{ marginTop: 24 }}>
            <Link to="/">
              <Button type="primary" size="large">
                Voltar para a página inicial
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 4 }}>
        É hora de praticar!
      </Title>
      
      <Text
        strong
        style={{ display: 'block', textAlign: 'center', marginBottom: 16, color: '#5D4037', fontSize: '1.1rem' }}
      >
        {defineMessageCounter()}
      </Text>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
        <Card style={{ width: '100%', maxWidth: 700, textAlign: 'center', border: '2px solid #5D4037' }}>
          <Text strong style={{ color: '#D38345', fontSize: '1.1rem' }}>
            Pergunta {currentIndex + 1} de {questions.length}
          </Text>

          <Title level={3} style={{ color: '#5D4037', margin: '16px 0 24px' }}>
            {currentQuestion.statement}
          </Title>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {currentQuestion.parsedOptions.map((option) => {
              const isSelected = selectedOption === option.id;

              let btnType: 'default' | 'primary' = 'default';
              let btnStyle: React.CSSProperties = {
                height: 'auto',
                padding: '1rem 1.5rem',
                fontSize: '1.05rem',
                fontWeight: 600,
                textAlign: 'left' as const,
                whiteSpace: 'normal' as const,
                borderColor: '#FBC02D',
                borderWidth: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              };

              if (isSelected && answerResult === 'correct') {
                btnStyle = { ...btnStyle, background: '#4A5D23', color: '#fff', borderColor: '#4A5D23' };
                btnType = 'primary';
              } else if (isSelected && answerResult === 'incorrect') {
                btnStyle = { ...btnStyle, background: '#D38345', color: '#fff', borderColor: '#D38345' };
                btnType = 'primary';
              }

              return (
                <Button
                  key={option.id}
                  type={btnType}
                  block
                  onClick={() => handleAnswer(option.id)}
                  disabled={submitting || answerResult !== null}
                  style={btnStyle}
                >
                  {option.value}
                  {isSelected && answerResult === 'correct' && (
                    <CheckCircleOutlined style={{ fontSize: '1.3rem', marginLeft: 8 }} />
                  )}
                  {isSelected && answerResult === 'incorrect' && (
                    <CloseCircleOutlined style={{ fontSize: '1.3rem', marginLeft: 8 }} />
                  )}
                </Button>
              );
            })}
          </Space>
        </Card>
      </div>

      {answerDetails && (
        <Text
          strong
          style={{ display: 'block', textAlign: 'center', marginTop: 20, color: '#5D4037', fontSize: '1.1rem', padding: 10 }}
        >
          {answerDetails}
        </Text>
      )}
    </div>
  );
}

export default Quiz;
