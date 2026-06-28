# std::experimental::ranges::Writable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class Out, class T >
concept bool Writable =
requires(Out&& o, T&& t) {
*o = std::forward<T>(t);
*std::forward<Out>(o) = std::forward<T>(t);
const_cast<const ranges::reference_t<Out>&&>(*o) =
std::forward<T>(t);
const_cast<const ranges::reference_t<Out>&&>(*std::forward<Out>(o)) =
std::forward<T>(t);
};
/* nenhuma das quatro expressões acima é obrigada a preservar a igualdade */
```

O concept `Writable<Out, T>` especifica os requisitos para escrever um valor cujo tipo e categoria de valor são codificados por `T` no objeto referenciado de um iterator `Out`.

Seja `E` uma expressão tal que `decltype((E))` é `T`, e `o` um objeto desreferenciável do tipo `Out`, então `Writable<Out, T>` é satisfeito somente se:

* Se `Readable<Out> && Same<ranges::value_type_t<Out>, [std::decay_t](<#/doc/types/decay>)<T>>` for satisfeito, então `*o` após qualquer atribuição acima é igual ao valor de `E` antes da atribuição.

`o` não é obrigado a ser desreferenciável após avaliar qualquer uma das expressões de atribuição acima. Se `E` é um xvalue, o estado resultante do objeto que ele denota é válido, mas não especificado.

### Preservação de Igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

* As entradas para uma expressão consistem em seus operandos.
* As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade é ainda obrigada a ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita interveniente desses objetos de entrada.

### Notas

O único uso válido do `operator*` é no lado esquerdo de uma expressão de atribuição. A atribuição através do mesmo valor de um tipo gravável pode ocorrer apenas uma vez.

As expressões requeridas com `const_cast` impedem que objetos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) com tipos `reference` prvalue satisfaçam os requisitos sintáticos de `Writable` por acidente, enquanto permitem que referências proxy continuem a funcionar desde que sua constness seja superficial. Veja [Ranges TS issue 381](<https://github.com/ericniebler/stl2/issues/381>).