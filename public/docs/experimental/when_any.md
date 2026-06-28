# std::experimental::when_any

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class Sequence >
struct when_any_result {
std::size_t index;
Sequence futures;
};
template< class InputIt >
auto when_any( InputIt first, InputIt last )
-> future<when_any_result<std::vector<typename std::iterator_traits<InputIt>::value_type>>>;
template< class... Futures >
auto when_any( Futures&&... futures )
-> future<when_any_result<std::tuple<std::decay_t<Futures>...>>>;
```

Cria um objeto future que se torna pronto quando pelo menos um dos `future`s de entrada e `shared_future`s se torna pronto. O comportamento é indefinido se qualquer `future` ou `shared_future` de entrada for inválido.

Em particular, seja `Sequence` um [std::vector](<#/doc/container/vector>)<typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type> para (1) e [std::tuple](<#/doc/utility/tuple>)<[std::decay_t](<#/doc/types/decay>)&lt;Futures&gt;...> para (2). Este function template cria um estado compartilhado contendo `when_any_result<Sequence>` e retorna um future que se refere ao estado compartilhado. Cada `future` de entrada é movido para o objeto correspondente no membro `futures` de `when_any_result<Sequence>` no estado compartilhado, e cada `shared_future` de entrada é copiado para o objeto correspondente no membro `futures` de `when_any_result<Sequence>` no estado compartilhado. A ordem dos objetos na `Sequence` corresponde à ordem dos argumentos.

1) Esta função não participa da resolução de sobrecarga a menos que o tipo de valor de `InputIt` (ou seja, typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type) seja um std::experimental::future ou std::experimental::shared_future.

2) Esta função não participa da resolução de sobrecarga a menos que cada argumento seja um std::experimental::shared_future (possivelmente cv-qualified) ou um std::experimental::future cv-unqualified. (Formalmente, para cada tipo `Fn` em `Futures`, ou [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;Fn&gt; é [std::experimental::future](<#/doc/experimental/future>)&lt;Rn&gt;, ou [std::decay_t](<#/doc/types/decay>)&lt;Fn&gt; é [std::experimental::shared_future](<#/doc/experimental/shared_future>)&lt;Rn&gt;.)

Após esta chamada, cada `future` de entrada não é mais válido; cada `shared_future` de entrada permanece válido.

### Valor de retorno

Um `future` que se refere ao estado compartilhado criado pela chamada. O future é sempre valid(), e ele se torna pronto quando pelo menos um dos `future`s e `shared_future`s de entrada da chamada estão prontos. O membro `index` de `when_any_result` contém a posição do `future` ou `shared_future` pronto no membro futures.

1) Se o range estiver vazio (ou seja, first == last), o `future` retornado fica pronto imediatamente; o campo `futures` de `when_any_result` é um vetor vazio, e o campo `index` é size_t(-1).

2) Se nenhum argumento for fornecido, o `future` retornado fica pronto imediatamente; o campo `futures` de `when_any_result` é uma tupla vazia, e o campo `index` é size_t(-1).