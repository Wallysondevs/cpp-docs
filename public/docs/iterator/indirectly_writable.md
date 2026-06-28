# std::indirectly_writable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Out, class T >
concept indirectly_writable =
requires(Out&& o, T&& t) {
*o = std::forward<T>(t);
*std::forward<Out>(o) = std::forward<T>(t);
const_cast<const std::iter_reference_t<Out>&&>(*o) = std::forward<T>(t);
const_cast<const std::iter_reference_t<Out>&&>(*std::forward<Out>(o)) =
std::forward<T>(t);
};
/* nenhuma das quatro expressões acima é exigida para preservar a igualdade */
```

  
O concept `indirectly_writable<Out, T>` especifica os requisitos para escrever um valor cujo tipo e categoria de valor são codificados por `T` no objeto referenciado de um iterator `Out`.

### Requisitos semânticos

Seja `e` uma expressão tal que `decltype((e))` é `T`, e `o` um objeto desreferenciável do tipo `Out`, então `indirectly_writable<Out, T>` é modelado somente se: 

  * Se [std::indirectly_readable](<#/doc/iterator/indirectly_readable>)&lt;Out&gt; é modelado e [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;Out&gt; é do mesmo tipo que [std::decay_t](<#/doc/types/decay>)&lt;T&gt;, então `*o` após qualquer atribuição acima é igual ao valor de `e` antes da atribuição. 

`o` não é exigido ser desreferenciável após avaliar qualquer uma das expressões de atribuição acima. Se `e` é um xvalue, o estado resultante do objeto que ele denota é válido, mas não especificado. 

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas para serem [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma). 

### Notas

O único uso válido do `operator*` é no lado esquerdo de uma expressão de atribuição. A atribuição através do mesmo valor de um tipo indiretamente gravável pode ocorrer apenas uma vez. 

As expressões exigidas com `const_cast` impedem que objetos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) com tipos de `reference` prvalue satisfaçam os requisitos sintáticos de `indirectly_writable` por acidente, enquanto permitem que referências proxy continuem a funcionar desde que sua constness seja superficial. Veja [Ranges TS issue 381](<https://github.com/ericniebler/stl2/issues/381>). 