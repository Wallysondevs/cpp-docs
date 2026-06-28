# std::ranges::iter_swap

Definido no cabeçalho `<iterator>`

```c
namespace ranges {
inline namespace /* unspecified */ {
inline constexpr /* unspecified */
iter_swap = /* unspecified */;
}
}
(objeto de ponto de customização)
Assinatura da chamada
template< class I1, class I2 >
constexpr void iter_swap( I1&& i1, I2&& i2 ) noexcept(/* see below */);
Função auxiliar
template< class X, class Y >
constexpr std::iter_value_t<X>
iter-exchange-move( X&& x, Y&& y )
noexcept(noexcept(std::iter_value_t<X>(std::ranges::iter_move(x))) &&
noexcept(*x = std::ranges::iter_move(y)));
```

Troca os valores denotados por dois iteradores.

O efeito da função auxiliar `_iter-exchange-move_`, apenas para exposição, é equivalente a
```
    std::iter_value_t<X> old(std::ranges::iter_move(x));
    *x = std::ranges::iter_move(y);
    return old;
```

`ranges::iter_swap(i1, i2)` é [equivalente em expressão](<#/doc/language/expressions>) a:

  1. `(void)iter_swap(i1, i2)`, se `i1` ou `i2` tiver um tipo de classe ou enumeração e a expressão for bem-formada, onde a [resolução de sobrecarga](<#/doc/language/overload_resolution>) de `iter_swap` é realizada com o candidato adicional `void iter_swap(auto, auto) = delete;`[1](<#/doc/iterator/ranges/iter_swap>), excluindo o próprio `std::ranges::iter_swap`.
     * Se a sobrecarga selecionada não trocar o valor denotado por `i1` e `i2`, o programa é mal-formado, nenhum diagnóstico exigido.
  2. Caso contrário, `[ranges::swap](<#/doc/utility/ranges/swap>)(*i1, *i2)` se ambos `I1` e `I2` modelarem [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) e se `[std::iter_reference_t](<#/doc/iterator/iter_t>)<I1>` e `[std::iter_reference_t](<#/doc/iterator/iter_t>)<I2>` modelarem [`swappable_with`](<#/doc/concepts/swappable>).
  3. Caso contrário, `(void)(*i1 =` ` _iter-exchange-move_`(i2, i1))`, se `[std::indirectly_movable_storable](<#/doc/iterator/indirectly_movable_storable>)<I1, I2>` e `[std::indirectly_movable_storable](<#/doc/iterator/indirectly_movable_storable>)<I2, I1>` forem ambos modelados, exceto que `i1` é avaliado apenas uma vez.
  4. Caso contrário, `ranges::iter_swap(i1, i2)` é mal-formado, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando `ranges::iter_swap(i1, i2)` aparece no contexto imediato de uma instanciação de template.

  1. [↑](<#/doc/iterator/ranges/iter_swap>) Isso impede a chamada irrestrita de `[std::iter_swap](<#/doc/algorithm/iter_swap>)`.

### Objetos de ponto de customização

O nome `ranges::iter_swap` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___iter_swap_fn_`.

Todas as instâncias de `___iter_swap_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___iter_swap_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como `const` ou não (no entanto, uma instância qualificada como `volatile` não é exigida para ser invocável). Assim, `ranges::iter_swap` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se `[std::declval](<#/doc/utility/declval>)<Args>()...` atender aos requisitos para argumentos de `ranges::iter_swap` acima, `___iter_swap_fn_` modela

  * `[std::invocable](<#/doc/concepts/invocable>)<__iter_swap_fn, Args...>`,
  * `[std::invocable](<#/doc/concepts/invocable>)<const __iter_swap_fn, Args...>`,
  * `[std::invocable](<#/doc/concepts/invocable>)<__iter_swap_fn&, Args...>`, e
  * `[std::invocable](<#/doc/concepts/invocable>)<const __iter_swap_fn&, Args...>`.

Caso contrário, nenhum operador de chamada de função de `___iter_swap_fn_` participa da resolução de sobrecarga.

### Exemplo

| Esta seção está incompleta
Motivo: nenhum exemplo

### Veja também

[ iter_swap](<#/doc/iterator/reverse_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iteradores subjacentes ajustados
(modelo de função)
[ iter_swap](<#/doc/iterator/move_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iteradores subjacentes
(modelo de função)
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iteradores
(modelo de função)