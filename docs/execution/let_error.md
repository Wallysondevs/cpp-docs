# std::execution::let_error

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto
let_error( execution::sender auto input,
std::invocable</*errors-sent-by*/(input)...> function );
```

### Parâmetros

- **input** — sender que, uma vez que um erro ocorre, envia os erros para a function
- **function** — invocable a ser chamada com os erros caso um erro ocorra pelo input sender

### Valor de retorno

Retorna um sender que descreve o grafo de tarefas descrito pelo input sender, com um nó adicionado que invoca a função fornecida com os erros enviados pelo input sender, caso um erro ocorra.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo