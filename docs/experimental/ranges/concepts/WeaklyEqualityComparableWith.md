Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T, class U >
concept bool WeaklyEqualityComparableWith =
requires(const std::remove_reference_t<T>& t,
const std::remove_reference_t<U>& u) {
{ t == u } -> Boolean&&;
{ t != u } -> Boolean&&;
{ u == t } -> Boolean&&;
{ u != t } -> Boolean&&;
};
```

O concept `WeaklyEqualityComparableWith<T, U>` especifica que um objeto do tipo `T` e um objeto do tipo `U` podem ser comparados quanto à igualdade entre si (em qualquer ordem) usando tanto `==` quanto `!=`, e os resultados das comparações são consistentes. Mais formalmente, `WeaklyEqualityComparableWith<T, U>` é satisfeito apenas se, dados

*   `t`, um lvalue do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e
*   `u`, um lvalue do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;,

o seguinte for verdadeiro:

*   `t == u`, `u == t`, `t != u`, `u != t` possuem o mesmo domínio;
*   `bool(u == t) == bool(t == u)`;
*   `bool(t != u) == !bool(t == u)`; e
*   `bool(u != t) == bool(t != u)`.

### Preservação de igualdade

Uma expressão é _preservadora de igualdade_ se resultar em saídas iguais dadas entradas iguais.

*   As entradas para uma expressão consistem em seus operandos.
*   As saídas de uma expressão consistem em seu resultado e em todos os operandos modificados pela expressão (se houver).

Toda expressão que se exige ser preservadora de igualdade é ainda exigida ser _estável_ : duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e interveniente desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ deve ser preservadora de igualdade e estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Variações de expressão implícitas

Uma _requires-expression_ que usa uma expressão que não modifica para algum operando lvalue constante também exige implicitamente variações adicionais dessa expressão que aceitam um lvalue não-constante ou um rvalue (possivelmente constante) para o operando dado, a menos que tal variação de expressão seja explicitamente exigida com semânticas diferentes. Essas _variações de expressão implícitas_ devem atender aos mesmos requisitos semânticos da expressão declarada. A extensão em que uma implementação valida a sintaxe das variações é não especificada.

### Ver também

[ EqualityComparableEqualityComparableWith](<#/doc/experimental/ranges/concepts/EqualityComparable>) | especifica que o operador == é uma relação de equivalência
(concept)