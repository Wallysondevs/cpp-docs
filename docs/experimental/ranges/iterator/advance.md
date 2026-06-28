# std::experimental::ranges::advance

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
namespace {
constexpr /* unspecified */ advance = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< Iterator I >
constexpr void advance( I& i, ranges::difference_type_t<I> n );
template< Iterator I, Sentinel<I> S >
constexpr void advance( I& i, S bound );
template< Iterator I, Sentinel<I> S >
constexpr ranges::difference_type_t<I> advance( I& i, ranges::difference_type_t<I> n, S bound );
```

  
Avança o iterator i n vezes, ou até que bound seja alcançado, o que ocorrer primeiro.

1) Se `I` modela [`RandomAccessIterator`](<#/doc/experimental/ranges/iterator/RandomAccessIterator>), equivalente a i += n. Caso contrário, incrementa (ou decrementa se n for negativo) i n vezes. O comportamento é indefinido se n for negativo e `I` não modelar [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>).

2) Se Assignable<I&, S> for satisfeito, equivalente a i = std::move(bound).

Caso contrário, se `[`i`, `bound`)` não denotar um range, o comportamento é indefinido.

Caso contrário, se SizedSentinel<S, I> for satisfeito, equivalente a [ranges::advance](<#/doc/iterator/ranges/advance>)(i, bound - i).

Caso contrário, incrementa i até que i == bound.

3) Se SizedSentinel<S, I> for satisfeito, equivalente a [ranges::advance](<#/doc/iterator/ranges/advance>)(i, bound) se |n| >= |bound - i|, e [ranges::advance](<#/doc/iterator/ranges/advance>)(i, n) caso contrário.

Caso contrário, incrementa (ou decrementa se n for negativo) i n vezes ou até que i == bound, o que ocorrer primeiro.

Se n > 0, `[`i`, `bound`)` deve denotar um range; se n == 0, ou `[`i`, `bound`)` ou `[`bound`, `i`)` deve denotar um range; se n < 0, `[`bound`, `i`)` deve denotar um range, `I` e `S` devem ser do mesmo tipo, e `I` deve modelar [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>). Caso contrário, o comportamento é indefinido.

### Objetos de ponto de customização 

O nome `ranges::advance` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) (denotado, para fins de exposição, como `AdvanceT`). Todas as instâncias de `AdvanceT` são iguais. Assim, `ranges::advance` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável. 

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::advance` acima, `AdvanceT` satisfará ranges::Invocable&lt;const AdvanceT, Args...&gt;. Caso contrário, nenhum operador de chamada de função de `AdvanceT` participa da resolução de sobrecarga. 

Em cada unidade de tradução na qual `ranges::advance` é definido, ele se refere à mesma instância do objeto de ponto de customização. (Isso significa que ele pode ser usado livremente em coisas como funções inline e function templates sem violar a [regra de uma definição](<#/doc/language/definition>).) 

### Valor de retorno

1,2) (nenhum)

3) O número de incrementos/decrementos não realizados devido ao alcance de bound. Em outras palavras, n - M, onde `M` é a distância da posição inicial de i até a posição final e é negativo se a posição final estiver antes da posição inicial.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ advance](<#/doc/iterator/advance>) |  avança um iterator por uma dada distância   
(function template)  
[ distance](<#/doc/experimental/ranges/iterator/distance>) |  retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range   
(function template)  
[ next](<#/doc/experimental/ranges/iterator/next>) |  incrementa um iterator   
(function template)  
[ prev](<#/doc/experimental/ranges/iterator/prev>) |  decrementa um iterator   
(function template)