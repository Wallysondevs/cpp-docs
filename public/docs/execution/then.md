# std::execution::then

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto then( execution::sender auto input,
std::invocable</*values-sent-by*/(input)...> function );
```

### Parâmetros

- **input** — sender que, uma vez executado, envia os valores sobre os quais a função é executada
- **function** — invocável a ser chamado pelo novo sender encadeado ao sender de entrada

### Valor de retorno

Retorna um sender que descreve o grafo de tarefas descrito pelo sender de entrada, com um nó adicionado de invocação da função fornecida com os valores enviados pelo sender de entrada como argumentos.

`then` tem a garantia de não iniciar a execução da função até que o sender retornado seja iniciado.

### Exemplo

Uso possível de `execution::then`.
```cpp
    execution::sender auto input = get_input();
    execution::sender auto snd = execution::then(input, 
    {
        std::print(args...);
    });
    // snd descreve o trabalho descrito por pred
    // seguido pela impressão de todos os valores enviados por pred
```