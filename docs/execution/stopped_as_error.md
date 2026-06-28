# std::execution::stopped_as_error

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
template< std::move_constructible Error >
execution::sender auto stopped_as_error( execution::sender auto snd, Error err );
```

### Parâmetros

- **snd** — sender de entrada cujo canal de parada é mapeado para err
- **err** — erro para o qual o canal de parada é mapeado

### Valor de retorno

Retorna um sender que mapeia o canal de parada para um erro de err.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo