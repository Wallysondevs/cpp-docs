# std::atomic_flag::operator=

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
atomic_flag& operator=( const atomic_flag& ) = delete;
atomic_flag& operator=( const atomic_flag& ) volatile = delete;
```

`[std::atomic_flag](<#/doc/atomic/atomic_flag>)` não é atribuível, seus operadores de atribuição são deletados.