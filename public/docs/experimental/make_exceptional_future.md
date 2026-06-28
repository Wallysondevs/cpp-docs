# std::experimental::make_exceptional_future

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class T >
future<T> make_exceptional_future( std::exception_ptr ex );
template< class T, class E >
future<T> make_exceptional_future( E ex );
```

  
1) Cria um estado compartilhado do tipo `T` que está imediatamente pronto e armazena o ponteiro de exceção ex, então retorna um future associado a esse estado compartilhado, como se por promise&lt;T&gt; p; p.set_exception(ex); return p.get_future();. O comportamento é indefinido se ex for nulo.

2) Cria um estado compartilhado do tipo `T` que está imediatamente pronto e armazena um ponteiro de exceção criado a partir de ex, então retorna um future associado a esse estado compartilhado, como se por promise&lt;T&gt; p; p.set_exception([std::make_exception_ptr](<#/doc/error/make_exception_ptr>)(ex)); return p.get_future();.

### Valor de retorno

Um objeto `future` associado ao estado compartilhado que foi criado. 

### Veja também

[ make_ready_future](<#/doc/experimental/make_ready_future>)(concurrency TS) |  produz um future que está imediatamente pronto e contém o valor fornecido   
(function template)  