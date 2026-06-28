# std::experimental::ranges::next

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
namespace {
constexpr /* unspecified */ next = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< Iterator I >
constexpr I next( I i );
template< Iterator I >
constexpr I next( I i, ranges::difference_type_t<I> n );
template< Iterator I, Sentinel<I> S >
constexpr I next( I i, S bound );
template< Iterator I, Sentinel<I> S >
constexpr I next( I i, ranges::difference_type_t<I> n, S bound );
```

Avança o iterador i n vezes, ou até que bound seja alcançado, o que ocorrer primeiro, e retorna o iterador avançado.

1) Equivalente a `++i; return i;`.

2) Equivalente a `[ranges::advance](<#/doc/iterator/ranges/advance>)(i, n); return i;`.

3) Equivalente a `[ranges::advance](<#/doc/iterator/ranges/advance>)(i, bound); return i;`.

4) Equivalente a `[ranges::advance](<#/doc/iterator/ranges/advance>)(i, n, bound); return i;`.

### Objetos de ponto de customização

O nome `ranges::next` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) (denotado, para fins de exposição, como `NextT`). Todas as instâncias de `NextT` são iguais. Assim, `ranges::next` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::next` acima, `NextT` satisfará `ranges::Invocable<const NextT, Args...>`. Caso contrário, nenhum operador de chamada de função de `NextT` participa da resolução de sobrecarga.

Em cada unidade de tradução na qual `ranges::next` é definido, ele se refere à mesma instância do objeto de ponto de customização. (Isso significa que ele pode ser usado livremente em coisas como funções inline e modelos de função sem violar a [regra de uma definição](<#/doc/language/definition>).)

### Valor de retorno

O iterador avançado.

### Observações

Embora omitir n para a sobrecarga (2) se comporte como se n fosse 1, omitir n para a sobrecarga (4) se comporta efetivamente como se n fosse infinito (sempre avança até bound).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ next](<#/doc/iterator/next>)(C++11) | incrementa um iterador
(modelo de função)
[ advance](<#/doc/experimental/ranges/iterator/advance>) | avança um iterador por uma distância dada
(modelo de função)
[ prev](<#/doc/experimental/ranges/iterator/prev>) | decrementa um iterador
(modelo de função)
[ distance](<#/doc/experimental/ranges/iterator/distance>) | retorna a distância entre um iterador e um sentinel, ou entre o início e o fim de um range
(modelo de função)