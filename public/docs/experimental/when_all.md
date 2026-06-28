# std::experimental::when_all

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class InputIt >
auto when_all( InputIt first, InputIt last )
-> future<std::vector<typename std::iterator_traits<InputIt>::value_type>>;
template< class... Futures >
auto when_all( Futures&&... futures )
-> future<std::tuple<std::decay_t<Futures>...>>;
```

  
Cria um objeto `future` que se torna pronto quando todos os `future`s e `shared_future`s de entrada se tornam prontos. O comportamento é indefinido se qualquer `future` ou `shared_future` de entrada for inválido.

Em particular, seja `Sequence` um [std::vector](<#/doc/container/vector>)<typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type> para (1) e [std::tuple](<#/doc/utility/tuple>)<[std::decay_t](<#/doc/types/decay>)&lt;Futures&gt;...> para (2). Este template de função cria um estado compartilhado contendo `Sequence` e retorna um `future` referenciando o estado compartilhado. Cada `future` de entrada é movido para o objeto correspondente na `Sequence` no estado compartilhado, e cada `shared_future` de entrada é copiado para o objeto correspondente na `Sequence` no estado compartilhado. A ordem dos objetos na `Sequence` corresponde à ordem dos argumentos.

1) Esta função não participa da resolução de sobrecarga a menos que o tipo de valor de `InputIt` (isto é, typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type) seja um `std::experimental::future` ou `std::experimental::shared_future`.

2) Esta função não participa da resolução de sobrecarga a menos que cada argumento seja um `std::experimental::shared_future` (possivelmente cv-qualificado) ou um `std::experimental::future` não cv-qualificado. (Formalmente, para cada tipo `Fn` em `Futures`, ou [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;Fn&gt; é [std::experimental::future](<#/doc/experimental/future>)&lt;Rn&gt;, ou [std::decay_t](<#/doc/types/decay>)&lt;Fn&gt; é [std::experimental::shared_future](<#/doc/experimental/shared_future>)&lt;Rn&gt;.)

Após esta chamada, cada `future` de entrada não é mais válido; cada `shared_future` de entrada permanece válido.

### Valor de retorno

Um `future` referenciando o estado compartilhado criado pela chamada. O `future` é sempre `valid()`, e se torna pronto quando todos os `future`s e `shared_future`s de entrada da chamada estão prontos.

1) Se o range estiver vazio (isto é, `first == last`), o `future` retornado contém um vetor vazio e está pronto imediatamente.

2) Se nenhum argumento for fornecido, um `future<std::tuple<>>` é retornado e está imediatamente pronto.