# std::experimental::ranges::distance

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
namespace {
constexpr /* unspecified */ distance = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< Iterator I, Sentinel<I> S >
constexpr ranges::difference_type_t<I> distance( I first, S last );
template< Range R >
constexpr ranges::difference_type_t<ranges::iterator_t<R>> distance( R&& r );
template< SizedRange R >
constexpr ranges::difference_type_t<ranges::iterator_t<R>> distance( R&& r );
```

Retorna a distância entre first e last, ou entre o início e o fim do range r.

1) Se `SizedSentinel<S, I>` for satisfeito, equivalente a `return last - first;`. Caso contrário, retorna o número de incrementos necessários para ir de first a last. Se `[`first`, `last`)` não denotar um range, então `I` e `S` devem ser do mesmo tipo e devem modelar [`SizedSentinel`](<#/doc/experimental/ranges/iterator/SizedSentinel>), e `[`last`, `first`)` deve denotar um range. Caso contrário, o comportamento é indefinido.

2) Equivalente a `return [ranges::distance](<#/doc/iterator/ranges/distance>)([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/doc/ranges/end>)(r));`.

3) Equivalente a `return [ranges::size](<#/doc/ranges/size>)(r);`.

A instanciação das sobrecargas (2,3) pode ser malformada se o cabeçalho [`<experimental/ranges/range>`](<#/doc/header/experimental/ranges/range>) não for incluído antes do ponto de instanciação.

### Objetos de ponto de customização

O nome `ranges::distance` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) de um tipo de classe [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) [literal](<#/doc/named_req/LiteralType>) (denotado, para fins de exposição, como `DistanceT`). Todas as instâncias de `DistanceT` são iguais. Assim, `ranges::distance` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `ranges::distance` acima, `DistanceT` satisfará `ranges::Invocable<const DistanceT, Args...>`. Caso contrário, nenhum operador de chamada de função de `DistanceT` participa da resolução de sobrecarga.

Em cada unidade de tradução na qual `ranges::distance` é definido, ele se refere à mesma instância do objeto de ponto de customização. (Isso significa que ele pode ser usado livremente em coisas como funções inline e function templates sem violar a [regra de uma definição](<#/doc/language/definition>).)

### Valor de retorno

A distância entre first e last, ou entre o início e o fim do range r.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iterators
(function template)
[ advance](<#/doc/experimental/ranges/iterator/advance>) | avança um iterator por uma distância dada
(function template)
[ next](<#/doc/experimental/ranges/iterator/next>) | incrementa um iterator
(function template)
[ prev](<#/doc/experimental/ranges/iterator/prev>) | decrementa um iterator
(function template)
[ size](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/range/size&action=edit&redlink=1> "cpp/experimental/ranges/range/size \(page does not exist\)") | obtém o tamanho de um range cujo tamanho pode ser calculado em tempo constante
(objeto de ponto de customização)