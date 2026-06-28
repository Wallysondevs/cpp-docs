# std::promise&lt;R&gt;::get_future

```cpp
std::future<R> get_future();  // (desde C++11)
```

  
Retorna um objeto future associado ao mesmo estado compartilhado que *this.

Uma exceção é lançada se *this não possui estado compartilhado ou se `get_future` já foi chamado. Para obter múltiplos receptores do canal de comunicação promise-future, use [std::future::share](<#/doc/thread/future/share>).

Chamadas a esta função não introduzem data races com chamadas a [set_value](<#/doc/thread/promise/set_value>), [set_exception](<#/doc/thread/promise/set_exception>), [set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>), ou [set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) (portanto, elas não precisam se sincronizar umas com as outras).

### Parâmetros

(nenhum)

### Valor de retorno

Um future que se refere ao estado compartilhado de *this.

### Exceções

[std::future_error](<#/doc/thread/future_error>) nas seguintes condições:

  * *this não possui estado compartilhado. O código de erro é definido como [`no_state`](<#/doc/thread/future_errc>).

  * `get_future()` já foi chamado em uma promise com o mesmo estado compartilhado que *this. O código de erro é definido como [`future_already_retrieved`](<#/doc/thread/future_errc>).