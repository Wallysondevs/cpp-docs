# std::jthread::~jthread

```cpp
~jthread();  // (desde C++20)
```

Destrói o objeto `jthread`.

Se *this tiver uma thread associada (joinable() == true), chama request_stop() e então join().

### Notas

A chamada a request_stop() não tem efeito se a `jthread` já havia sido solicitada para parar anteriormente.

Um objeto `jthread` não tem uma thread associada depois que:

*   ele foi construído por padrão.
*   ele foi movido.
*   join() foi chamado.
*   detach() foi chamado.

Se join() lançar uma exceção (por exemplo, porque um deadlock é detectado), [std::terminate()](<#/doc/error/terminate>) pode ser chamado.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ (destructor)](<#/doc/thread/thread/~thread>) | destrói o objeto thread, a thread subjacente deve ser joinada ou detached
(função membro pública de `std::thread`)