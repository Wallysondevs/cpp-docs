# std::execution::into_variant

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto into_variant( execution::sender auto snd );
```

### Parâmetros

- **snd** — sender de entrada que pode enviar múltiplos conjuntos de valores dependendo das condições de tempo de execução.

### Valor de retorno

Retorna um sender que envia uma variant de tuples de todos os possíveis conjuntos de tipos enviados pelo sender de entrada. A função auxiliar os transforma em um único valor variant.