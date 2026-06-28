# std::execution::let_value

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto
let_value( execution::sender auto input,
std::invocable</*values-sent-by*/(input)...> function );
```

### Parâmetros

- **input** — sender que, uma vez executado, envia os valores sobre os quais a função é executada
- **function** — invocable a ser chamado com os valores do sender de entrada

### Valor de retorno

Retorna um sender que descreve o grafo de tarefas descrito pelo sender de entrada, com um nó adicional de invocação da função fornecida com os valores enviados pelo sender de entrada como argumentos.

`let_value` é semelhante a then, no entanto, onde o sender retornado de `then` envia exatamente o que essa função acaba retornando - `let_value` exige que a função retorne um sender, e o sender retornado por `let_value` envia os valores enviados pelo sender retornado do callback.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo