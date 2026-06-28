# std::execution::upon_stopped

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto upon_stopped( execution::sender auto input,
std::invocable auto function );
```

### Parâmetros

- **input** — sender que, ao receber um "stop token", notificará o novo nó para executar a função
- **function** — invocable a ser chamado caso um sinal de "stopped" seja enviado ao sender de entrada

### Valor de retorno

Retorna um sender que descreve o grafo de tarefas descrito pelo sender de entrada, com um nó adicional para invocar a função fornecida caso o sinal de "stopped" seja enviado ao sender de entrada.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo