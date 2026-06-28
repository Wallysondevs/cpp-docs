# std::weak_order

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ weak_order = /* unspecified */;
}
Assinatura da chamada
template< class T, class U >
requires /* veja abaixo */
constexpr std::weak_ordering weak_order(T&& t, U&& u) noexcept(/* veja abaixo */);
```

Compara dois valores usando comparação de 3 vias e produz um resultado do tipo [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>).

Sejam t e u expressões e `T` e `U` denotem decltype((t)) e decltype((u)) respectivamente, std::weak_order(t, u) é [expressão-equivalente](<#/doc/language/expressions>) a:

  * Se [std::is_same_v](<#/doc/types/is_same>)<[std::decay_t](<#/doc/types/decay>)&lt;T&gt;, [std::decay_t](<#/doc/types/decay>)&lt;U&gt;> for verdadeiro:
    * [std::weak_ordering](<#/doc/utility/compare/weak_ordering>)(weak_order(t, u)), se for uma expressão bem-formada com resolução de sobrecarga realizada em um contexto que não inclua uma declaração de `std::weak_order`,
    * caso contrário, se `T` for um tipo de ponto flutuante:
      * se [std::numeric_limits](<#/doc/types/numeric_limits>)<T>::is_iec559 for verdadeiro, realiza a comparação de ordenação fraca de valores de ponto flutuante (veja abaixo) e retorna esse resultado como um valor do tipo [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>),
      * caso contrário, produz um valor do tipo [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>) que é consistente com a ordenação observada pelos operadores de comparação de `T`,
    * caso contrário, [std::weak_ordering](<#/doc/utility/compare/weak_ordering>)([std::compare_three_way](<#/doc/utility/compare/compare_three_way>)()(t, u)), se for bem-formado,
    * caso contrário, [std::weak_ordering](<#/doc/utility/compare/weak_ordering>)([std::strong_order](<#/doc/utility/compare/strong_order>)(t, u)), se for bem-formado.
  * Em todos os outros casos, a expressão é mal-formada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando aparece no contexto imediato de uma instanciação de template.

### Objetos de Ponto de Customização

O nome `std::weak_order` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___weak_order_fn_`.

Todas as instâncias de `___weak_order_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___weak_order_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `std::weak_order` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `std::weak_order` acima, `___weak_order_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__weak_order_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __weak_order_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__weak_order_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __weak_order_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___weak_order_fn_` participa da resolução de sobrecarga.

#### Ordem fraca estrita de tipos de ponto flutuante IEEE

Sejam x e y valores do mesmo tipo de ponto flutuante IEEE, e weak_order_less(x, y) seja o resultado booleano indicando se x precede y na ordem fraca estrita definida pelo padrão C++.

  * Se nem x nem y for NaN, então weak_order_less(x, y) == true se e somente se x < y, ou seja, todas as representações de valor de ponto flutuante igual são equivalentes;
  * Se x for NaN negativo e y não for NaN negativo, então weak_order_less(x, y) == true;
  * Se x não for NaN positivo e y for NaN positivo, então weak_order_less(x, y) == true;
  * Se ambos x e y forem NaNs com o mesmo sinal, então (weak_order_less(x, y) || weak_order_less(y, x)) == false, ou seja, todos os NaNs com o mesmo sinal são equivalentes.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ weak_ordering](<#/doc/utility/compare/weak_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e não é substituível
(classe)
[ strong_order](<#/doc/utility/compare/strong_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`
(objeto de ponto de customização)
[ partial_order](<#/doc/utility/compare/partial_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::partial_ordering`
(objeto de ponto de customização)
[ compare_weak_order_fallback](<#/doc/utility/compare/compare_weak_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`, mesmo que operator<=> esteja indisponível
(objeto de ponto de customização)