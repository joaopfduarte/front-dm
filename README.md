# Amigos da Fauna

O projeto **Amigos da Fauna** é uma aplicação web voltada para a conscientização e educação ambiental, focando nas espécies da nossa fauna (Mata Atlântica). O sistema permite que os usuários aprendam sobre diferentes animais, vejam onde habitam e testem seus conhecimentos através de quizzes interativos.

## Descrição das Funcionalidades

- **Autenticação de Usuários:** Cadastro estruturado e login seguro com suporte a feedback de conectividade e alertas.
- **Catálogo de Animais:** Listagem interativa e paginada de animais (incluindo imagens, características, altura e peso).
- **Busca em Tempo Real:** Pesquisa dinâmica filtrando as espécies pelo nome.
- **Mapa de Localização:** Mapeamento visual das espécies (integração via Leaflet/OpenStreetMap) para visualização global das áreas de ocupação.
- **Quiz Educativo:** Sistema de perguntas e respostas sobre atributos e hábitos específicos de cada animal listado, pontuando os acertos e erros.
- **Aplicação PWA (Progressive Web App):** Tratamento de conectividade offline com detecção e alertas embutidos (`OfflineBanner`).
- **Compartilhamento:** Funcionalidade nativa para compartilhamento dos links de cada animal para as redes ou aplicativos de mensagem.

## Tecnologias Utilizadas

- **Core Engine:** React, TypeScript
- **Build Tool:** Vite
- **Roteamento:** React Router DOM
- **UI/UX e Componentes:** Ant Design (antd)
- **Mapas e Geolocalização:** Leaflet (via React Leaflet)
- **Notificação e Feedback:** Sonner (Toast notifications)
- **Offline / Caching:** `vite-plugin-pwa`

## Instruções de Execução

Siga os passos abaixo para preparar e executar a aplicação no seu ambiente de desenvolvimento:

1. **Acesse o diretório raiz do projeto:**
   Abra seu terminal e garanta que você está na pasta do frontend:
   ```bash
   cd dm-web
   ```

2. **Instale as dependências:**
   Instale as bibliotecas e pacotes do React com seu gerenciador de pacotes:
   ```bash
   npm install
   ```

3. **Configuração de Variáveis de Ambiente (Opcional):**
   O projeto irá consumir a API oficial `https://api-dm-69db35e2f2d0.herokuapp.com/` por padrão, caso necessite, crie ou altere no arquivo `.env` as configurações de ambiente requisitadas pelo sistema.

4. **Inicie o Servidor de Desenvolvimento:**
   Rode a aplicação localmente de forma rápida com Hot-Module-Replacement:
   ```bash
   npm run dev
   ```

5. **Acesse o Projeto:**
   Após a compilação local, o Vite abrirá as conexões na porta (usualmente `http://localhost:5173`). Acesse via navegador!

> *Projeto mantido com foco nas boas práticas de acessibilidade, tipagem estática e UX dinâmica focada na educação ambiental* 🌿
