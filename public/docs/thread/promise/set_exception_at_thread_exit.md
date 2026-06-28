# std::promise&lt;R&gt;::set_exception_at_thread_exit

void set_exception_at_thread_exit( [std::exception_ptr](<#/doc/error/exception_ptr>) p ); | | (desde C++11)

Armazena o ponteiro de exceção p no estado compartilhado sem tornar o estado pronto imediatamente. O estado é tornado pronto quando a thread atual é encerrada, depois que todas as variáveis com duração de armazenamento thread-local forem destruídas.

A operação se comporta como se [set_value](<#/doc/thread/promise/set_value>), [set_exception](<#/doc/thread/promise/set_exception>), [set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>), e `set_exception_at_thread_exit` adquirissem um único mutex associado ao objeto promise enquanto atualizam o objeto promise.

Uma exceção é lançada se não houver estado compartilhado ou se o estado compartilhado já armazenar um valor ou exceção.

Chamadas a esta função não introduzem data races com chamadas a [get_future](<#/doc/thread/promise/get_future>) (portanto, elas não precisam se sincronizar entre si).

### Parâmetros

- **p** — ponteiro de exceção a ser armazenado. O comportamento é indefinido se p for nullptr

### Valor de retorno

(nenhum)

### Exceções

[std::future_error](<#/doc/thread/future_error>) nas seguintes condições:

*   *this não possui estado compartilhado. O código de erro é definido como [`no_state`](<#/doc/thread/future_errc>).

*   O estado compartilhado já armazena um valor ou exceção. O código de erro é definido como [`promise_already_satisfied`](<#/doc/thread/future_errc>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ set_exception](<#/doc/thread/promise/set_exception>) | define o resultado para indicar uma exceção
(função membro pública)