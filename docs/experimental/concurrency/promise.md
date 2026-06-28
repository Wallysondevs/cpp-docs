# std::experimental::promise (TS de concorrência)

_Esta página é sobre a versão modificada de [std::promise](<#/doc/thread/promise>) fornecida pelo TS de concorrência que suporta as melhorias de `std::future` feitas por esse TS. Para a versão de `promise` com suporte a alocador com tipo apagado fornecida pelos TSes de Fundamentos da Biblioteca, veja [`std::experimental::fundamentals_v2::promise`](<#/doc/experimental/lib_extensions/promise>)._

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class R > class promise;
template< class R > class promise<R&>;
template<> class promise<void>;
```

`std::experimental::concurrency_v1::promise` é uma versão modificada de [std::promise](<#/doc/thread/promise>) fornecida pelo TS de concorrência que funciona com std::experimental::future.

A única mudança em relação a [std::promise](<#/doc/thread/promise>) é que a função membro `get_future()` retorna um [std::experimental::future](<#/doc/experimental/future>).