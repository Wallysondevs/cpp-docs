# std::experimental::packaged_task (concurrency TS)

_Esta página é sobre a versão modificada de [std::packaged_task](<#/doc/thread/packaged_task>) fornecida pela concurrency TS que suporta as melhorias de `std::future` feitas por essa TS. Para a versão de `packaged_task` com suporte a alocador com tipo apagado fornecida pelas Library Fundamentals TSes, veja [`std::experimental::fundamentals_v2::packaged_task`](<#/doc/experimental/lib_extensions/packaged_task>)._

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class > class packaged_task; //not defined
template< class R, class ...Args >
class packaged_task<R(Args...)>;
```

`std::experimental::concurrency_v1::packaged_task` é uma versão modificada de [std::packaged_task](<#/doc/thread/packaged_task>) fornecida pela concurrency TS que funciona com std::experimental::future.

A única mudança em relação a [std::packaged_task](<#/doc/thread/packaged_task>) é que a função membro `get_future()` retorna um(a) [std::experimental::future](<#/doc/experimental/future>)&lt;R&gt;.