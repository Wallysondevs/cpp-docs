# std::execution::sync_wait

Definido no header `[<execution>`](<#/doc/header/execution>)`

```cpp
auto sync_wait( execution::sender auto sender )
requires (/*always-sends-some-values*/(sender))
-> std::optional<std::tuple</*value-sent-by*/(sender)>>;  // (desde C++26)
```

### Parâmetros

- **sender** — o sender no qual a conclusão de sync_wait é bloqueada

### Valor de retorno

Retorna uma tupla opcional de valores que foram enviados pelo sender fornecido na conclusão de seu trabalho.

### Observações

O sender retornado por `sync_wait` é similar a `ensure_started`, exceto que ele bloqueia a [std::thread](<#/doc/thread/thread>) atual ou a thread principal até que o trabalho seja concluído.

### Veja também

[ ensure_started](<#/doc/execution/ensure_started>) | Inicia um sender de forma ansiosa, retornando um sender que entregará os resultados a um receiver ao qual ele está conectado e iniciado, se houver. Quando o sender resultante não está conectado a um receiver, ou se o estado da operação resultante não é iniciado, os resultados são ignorados. Se tal sender for destruído antes que a operação subjacente seja concluída, a operação continua sendo executada de forma desvinculada.
(modelo de função)