# 🍅 Chronos Pomodoro

Aplicação web de produtividade baseada na Técnica Pomodoro, com cronômetro preciso, ciclos de foco/descanso configuráveis e histórico de tarefas persistido localmente.

## Funcionalidades

- ⏱️ Cronômetro de foco, descanso curto e descanso longo
- 🔁 Ciclos automáticos: a cada 4 ciclos de foco, um descanso longo é sugerido
- ⚙️ Configuração personalizada da duração de cada tipo de ciclo
- 📊 Histórico de tarefas com ordenação por nome, duração e data
- 💾 Persistência de dados via `localStorage` (o progresso não se perde ao recarregar a página)
- 🔔 Notificação sonora ao final de cada ciclo
- 📱 Layout responsivo

## Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (com plugin SWC)
- [React Router v7](https://reactrouter.com/)
- [date-fns](https://date-fns.org/) para manipulação de datas
- [react-toastify](https://fkhadra.github.io/react-toastify/) para notificações
- [lucide-react](https://lucide.dev/) para ícones
- CSS Modules para estilização isolada por componente
- ESLint + typescript-eslint

## Decisões técnicas

- **Web Worker para o cronômetro**: o countdown roda em uma thread separada e é calculado pela diferença entre o timestamp de início e o atual, evitando o drift comum de `setInterval` e mantendo a contagem correta mesmo com a aba em segundo plano.
- **Gerenciamento de estado** com `useReducer` + Context API, seguindo um padrão de actions/reducer.
- **Padrão Adapter** (`showMessage`) para isolar a aplicação da biblioteca de notificações.
- **Padrão Singleton** no gerenciador do Web Worker, garantindo uma única instância ativa.

## Rodando localmente

```bash
npm install
npm run dev
```

Outros scripts disponíveis:

```bash
npm run build    # build de produção
npm run lint      # checagem de lint
npm run preview   # preview do build de produção
```

## Deploy

Aplicação publicada na [Vercel](https://vercel.com/).
