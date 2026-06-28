# std::execution::ensure_started

Definido no cabeçalho `<execution>`

```c
execution::sender auto ensure_started( execution::sender auto sender );
```

### Parâmetros

- **sender** — sender de entrada cujo canal parado é mapeado para `err`

### Valor de retorno

Retorna um sender que é concluído quando o sender fornecido é concluído e envia valores equivalentes aos do sender fornecido.

### Notas

  * Uma vez que `ensure_started` retorna, sabe-se que o sender fornecido foi conectado e `start` foi chamado no estado de operação resultante. Em outras palavras, o trabalho descrito pelo sender fornecido foi submetido para execução nos recursos de execução apropriados.

  * Se o sender retornado for destruído antes que `execution::connect()` seja chamado, ou se `execution::connect()` for chamado mas o operation-state retornado for destruído antes que `execution::start()` seja chamado, então uma solicitação de parada é enviada para a operação lançada ansiosamente e a operação é desanexada e será executada até a conclusão em segundo plano.

  * Nesse caso, o resultado da operação será descartado quando ela for eventualmente concluída.

  * Note que a aplicação precisará garantir que os recursos sejam mantidos vivos caso a operação se desanexe (por exemplo, mantendo um [std::shared_ptr](<#/doc/memory/shared_ptr>) para esses recursos).
