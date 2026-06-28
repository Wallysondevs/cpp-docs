# std::partial_order

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ partial_order = /* unspecified */;
}
Assinatura da chamada
template< class T, class U >
requires /* see below */
constexpr std::partial_ordering
partial_order( T&& t, U&& u ) noexcept(/* see below */);
```

Compara dois valores usando comparação de 3 vias e produz um resultado do tipo [`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>).

Sejam t e u expressões e `T` e `U` denotem decltype((t)) e decltype((u)) respectivamente, std::partial_order(t, u) é [expressão-equivalente](<#/doc/language/expressions>) a:

  * Se [std::is_same_v](<#/doc/types/is_same>)<[std::decay_t](<#/doc/types/decay>)&lt;T&gt;, [std::decay_t](<#/doc/types/decay>)&lt;U&gt;> for verdadeiro:
    * [std::partial_ordering](<#/doc/utility/compare/partial_ordering>)(partial_order(t, u)), se for uma expressão bem-formada com resolução de sobrecarga realizada em um contexto que não inclui uma declaração de `std::partial_order`,
    * caso contrário, [std::partial_ordering](<#/doc/utility/compare/partial_ordering>)([std::compare_three_way](<#/doc/utility/compare/compare_three_way>)()(t, u)), se for bem-formada,
    * caso contrário, [std::partial_ordering](<#/doc/utility/compare/partial_ordering>)([std::weak_order](<#/doc/utility/compare/weak_order>)(t, u)), se for bem-formada.
  * Em todos os outros casos, a expressão é mal-formada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `std::partial_order` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___partial_order_fn_`.

Todas as instâncias de `___partial_order_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___partial_order_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada por const ou não (no entanto, uma instância qualificada por volatile não é exigida para ser invocável). Assim, `std::partial_order` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `std::partial_order` acima, `___partial_order_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__partial_order_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __partial_order_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__partial_order_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __partial_order_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___partial_order_fn_` participa da resolução de sobrecarga.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) | o tipo de resultado da comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis
(classe)
[ strong_order](<#/doc/utility/compare/strong_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`
(objeto de ponto de customização)
[ weak_order](<#/doc/utility/compare/weak_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`
(objeto de ponto de customização)
[ compare_partial_order_fallback](<#/doc/utility/compare/compare_partial_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::partial_ordering`, mesmo que operator<=> não esteja disponível
(objeto de ponto de customização)