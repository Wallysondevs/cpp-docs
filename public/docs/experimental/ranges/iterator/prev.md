# std::experimental::ranges::prev

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
namespace {
constexpr /* unspecified */ prev = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< Iterator I >
constexpr I prev( I i );
template< Iterator I >
constexpr I prev( I i, ranges::difference_type_t<I> n );
template< Iterator I >
constexpr I prev( I i, ranges::difference_type_t<I> n, I bound );
```

Decrementa o iterator `i` `n` vezes, ou até que `bound` seja alcançado, o que ocorrer primeiro, e retorna o iterator decrementado.

1) Equivalente a `--i; return i;`.

2) Equivalente a `[ranges::advance](<#/doc/iterator/ranges/advance>)(i, -n); return i;`.

3) Equivalente a `[ranges::advance](<#/doc/iterator/ranges/advance>)(i, -n, bound); return i;`.

### Objetos de ponto de customização

O nome `ranges::prev` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) (denotado, para fins de exposição, como `PrevT`). Todas as instâncias de `PrevT` são iguais. Assim, `ranges::prev` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::prev` acima, `PrevT` satisfará `ranges::Invocable<const PrevT, Args...>`. Caso contrário, nenhum operador de chamada de função de `PrevT` participa da resolução de sobrecarga.

Em cada unidade de tradução na qual `ranges::prev` é definido, ele se refere à mesma instância do objeto de ponto de customização. (Isso significa que ele pode ser usado livremente em coisas como funções inline e modelos de função sem violar a [regra de uma definição](<#/doc/language/definition>).)

### Valor de retorno

O iterator decrementado.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ prev](<#/doc/iterator/prev>)(desde C++11) | decrementa um iterator
(modelo de função)
[ advance](<#/doc/experimental/ranges/iterator/advance>) | avança um iterator por uma dada distância
(modelo de função)
[ next](<#/doc/experimental/ranges/iterator/next>) | incrementa um iterator
(modelo de função)
[ distance](<#/doc/experimental/ranges/iterator/distance>) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(modelo de função)