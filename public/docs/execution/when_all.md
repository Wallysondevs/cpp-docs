# std::execution::when_all

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto when_all( execution::sender auto... inputs );
```

### Parâmetros

- **inputs** — senders nos quais a conclusão de `when_all` é bloqueada. Pode incluir apenas senders que podem ser concluídos com um único conjunto de valores.

### Valor de retorno

Retorna um sender que é concluído assim que todos os senders de entrada tiverem sido concluídos. Os valores enviados por este sender são os valores enviados por cada um dos senders de entrada, na ordem dos argumentos passados para `when_all`.

### Notas

* O sender retornado por `when_all` é concluído inline no recurso de execução no qual o último sender de entrada é concluído, a menos que `stop` seja solicitado antes de `when_all` ser iniciado, caso em que ele é concluído inline dentro da chamada para start.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ when_all](<#/doc/experimental/when_all>)(concurrency TS) | produz uma future que se torna pronta quando todas as futures ou `shared_futures` fornecidas estão prontas
(modelo de função)