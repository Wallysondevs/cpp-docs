# std::compare_strong_order_fallback

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
inline namespace /* unspecified */ {
inline constexpr /* unspecified */
compare_strong_order_fallback = /* unspecified */;
}
Call signature
template< class T, class U >
requires /* see below */
constexpr std::strong_ordering
compare_strong_order_fallback( T&& t, U&& u ) noexcept(/* see below */);
```

Realiza uma comparação de três vias nas [subexpressões](<#/doc/language/expressions>) t e u e produz um resultado do tipo [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>), mesmo que o operador `<=>` não esteja disponível.

Se [std::decay_t](<#/doc/types/decay>)&lt;T&gt; e [std::decay_t](<#/doc/types/decay>)&lt;U&gt; forem do mesmo tipo, `std::compare_strong_order_fallback(t, u)` é [expressão-equivalente](<#/doc/language/expressions>) a:

  * [std::strong_order](<#/doc/utility/compare/strong_order>)(t, u), se for uma expressão bem-formada;
  * caso contrário, `t == u ? std::strong_ordering::equal : t < u ? std::strong_ordering::less : std::strong_ordering::greater` se as expressões `t == u` e `t < u` forem ambas bem-formadas e cada uma de `decltype(t == u)` e `decltype(t < u)` modelar [`_boolean-testable_`](<#/doc/concepts/boolean-testable>), exceto que t e u são avaliadas apenas uma vez.

Em todos os outros casos, `std::compare_strong_order_fallback(t, u)` é malformado, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando aparece no contexto imediato de uma instanciação de template.

### Customization point objects

O nome `std::compare_strong_order_fallback` denota um _objeto de ponto de customização_ , que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___compare_strong_order_fallback_fn_`.

Todas as instâncias de `___compare_strong_order_fallback_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___compare_strong_order_fallback_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser `const-qualified` ou não (no entanto, uma instância `volatile-qualified` não é obrigada a ser invocável). Assim, `std::compare_strong_order_fallback` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `std::compare_strong_order_fallback` acima, `___compare_strong_order_fallback_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__compare_strong_order_fallback_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __compare_strong_order_fallback_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__compare_strong_order_fallback_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __compare_strong_order_fallback_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___compare_strong_order_fallback_fn_` participa da resolução de sobrecarga.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++20 | o mecanismo de fallback exigia apenas que os tipos de retorno fossem conversíveis para bool | restrições reforçadas

### Veja também

[ strong_order](<#/doc/utility/compare/strong_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`
(objeto de ponto de customização)