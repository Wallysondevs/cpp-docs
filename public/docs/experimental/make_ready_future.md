# std::experimental::make_ready_future

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class T >
future<V /* see below */> make_ready_future( T&& value );
future<void> make_ready_future();
```

  
1) Se [std::decay_t](<#/doc/types/decay>)&lt;T&gt; for [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;X&gt;, então o tipo `V` é `X&`, caso contrário, `V` é [std::decay_t](<#/doc/types/decay>)&lt;T&gt;.

Cria um estado compartilhado do tipo `V` que está imediatamente pronto, com o resultado construído a partir de [std::forward](<#/doc/utility/forward>)&lt;T&gt;(value), então retorna um std::experimental::future associado a esse estado compartilhado.

2) Cria um estado compartilhado do tipo void que está imediatamente pronto, então retorna um std::experimental::future associado a esse estado compartilhado.

### Valor de retorno

Um `std::experimental::future` associado ao estado compartilhado que é criado. 

### Veja também

[ make_exceptional_future](<#/doc/experimental/make_exceptional_future>)(concurrency TS) | produz um future que está imediatamente pronto e contém a exceção fornecida   
(modelo de função)  