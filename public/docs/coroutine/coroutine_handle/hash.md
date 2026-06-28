# std::hash&lt;std::coroutine_handle&gt;

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
template< class Promise >
struct hash<std::coroutine_handle<Promise>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>) permite aos usuários obter hashes de objetos do tipo [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)&lt;P&gt;.

`operator()` da especialização é noexcept.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)