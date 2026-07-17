# Kanban Board Interativo

🔗 **[Ver projeto publicado](https://ebrauta-kanban-board.vercel.app/)**

## Objetivo do projeto

Projeto de estudo/portfólio com foco em treinar frontend moderno com React. A ideia é construir um painel Kanban funcional e visualmente profissional, praticando conceitos como gerenciamento de estado global, tipagem estática, persistência de dados no navegador e manipulação de drag-and-drop nativa do HTML5 — sem depender de bibliotecas prontas para as partes centrais da lógica.

## Escopo do MVP (v1)

### Essencial
- Criar, editar e excluir cartões de tarefa
- Mover cartões entre colunas (**A fazer**, **Em progresso**, **Concluído**) via drag-and-drop
- Campos de título e descrição em cada cartão

### Intermediário
- Tags/categorias coloridas
- Nível de prioridade (alta/média/baixa) com indicação visual
- Filtro/busca por texto
- Data de vencimento (due date)

### Fora do escopo (planejado para v2)
- Reordenação avançada com animações
- Colunas customizáveis pelo usuário
- Subtarefas/checklist
- Anexos ou links
- Histórico de atividades
- Múltiplos boards
- Modo escuro e atalhos de teclado

## Stack escolhida

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | React + Vite | Ambiente rápido para desenvolvimento e build |
| Linguagem | TypeScript | Tipagem estática, reduz erros e documenta o modelo de dados |
| Estado global | Zustand | Gerenciamento de estado simples, sem boilerplate, bom para treino |
| Estilização | Tailwind CSS | Estilo profissional com baixo esforço de manutenção (Bootstrap como alternativa caso Tailwind gere complexidade desnecessária) |
| Drag-and-drop | HTML5 Drag and Drop API (manual) | Aprendizado mais profundo; biblioteca (ex: dnd-kit) só entra se a implementação manual se mostrar limitada |
| Persistência | localStorage | Ambiente 100% local, sem necessidade de backend nesta fase |
| Utilitários | `uuid`, `clsx` | `uuid` para geração de IDs únicos das tasks; `clsx` para composição condicional de classes Tailwind (variantes de Button/Badge) |

## Modelo de dados

Definido em `src/models/`, separado por conceito (`task.ts`, `priority.ts`, `column.ts`) com reexport via `index.ts`.

```ts
type Priority = "high" | "medium" | "low";
type ColumnId = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  tag: string;
  priority: Priority;
  dueDate: string; // formato "YYYY-MM-DD", sem horário
  column: ColumnId;
}
```

## Decisões técnicas

- **Nomenclatura em inglês**: variáveis, funções, componentes e arquivos em inglês; comentários podem ficar em português.
- **Separação de responsabilidades**: lógica de estado (store Zustand) fica isolada dos componentes de apresentação (`Board`, `Column`, `TaskCard`, `TaskModal`, `FilterBar`).
- **Abstração de persistência**: `services/taskStorage.ts` expõe apenas `getTasks()`/`saveTasks()` (genéricos, sem lógica de negócio). A store chama essas funções manualmente em cada action — optamos por **não** usar o middleware `persist` do Zustand, justamente para manter essa camada de abstração isolada e facilitar a troca futura por uma API.
- **Seed de dados**: a lógica de "usar dados de exemplo quando não há nada salvo" mora na **store**, não no service — o service não deveria saber que seed existe, isso é decisão de aplicação.
- **Modelos de dados** (`models/`): `Task`, `Priority` e `ColumnId` ficam em arquivos separados por conceito dentro de `models/`, com um `index.ts` reexportando tudo.
- **Store**: a interface da store separa `TaskAttributes` (dados) de `TaskMethods` (ações), unidas via `TaskAttributes & TaskMethods`, para deixar claro o que é estado e o que é comportamento.
- **Tratamento de datas**: `dueDate` é `string` no formato `YYYY-MM-DD` (sem horário), manipulada com funções nativas de JS (sem lib externa), com cuidado explícito para evitar bugs de fuso horário ao converter para `Date`.
- **Drag-and-drop manual antes de biblioteca**: prioriza aprendizado dos fundamentos; só se recorre a uma lib externa se a solução manual comprometer a experiência.
- **Nível de polimento**: interface profissional com transições suaves, sombras sutis e responsividade básica — sem efeitos excessivos que aumentem a complexidade sem necessidade.
- **Ambiente de execução**: projeto pensado para rodar localmente (não em sandbox/artifact), justamente para poder usar localStorage do navegador de forma real.
- **Criação de tarefa por coluna**: o botão "+ Adicionar" fica no rodapé de cada coluna e cria a nova tarefa diretamente ali (não sempre em "A fazer"). Decisão alinhada ao padrão de UX consolidado em ferramentas como Trello, Linear e Jira — evita surpreender o usuário criando a tarefa numa coluna diferente da que ele clicou.
- **Aliases de import**: planejados inicialmente (`@components`, `@store`, `@models`, etc.), mas removidos temporariamente por problema de resolução no TypeScript/Vite não solucionado ainda — o projeto usa caminhos relativos por enquanto. Retomar como debt técnico.