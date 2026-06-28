# std::execution::let_stopped

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto let_stopped( execution::sender auto input,
std::invocable auto function );
```

  
### Parâmetros

input  |  \-  |  sender que, uma vez parado, envia o "stop token" para executar a função   
---|---|---
function  |  \-  |  invocable a ser chamado com erros caso um erro ocorra pelo sender de entrada   
  
### Valor de retorno

Retorna um sender que descreve o grafo de tarefas descrito pelo sender de entrada, com um nó adicionado invocado quando o sinal de "stopped" é enviado. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   