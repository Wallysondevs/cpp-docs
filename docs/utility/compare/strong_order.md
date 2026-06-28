# std::strong_order

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ strong_order = /* unspecified */;
}
Assinatura da chamada
template< class T, class U >
requires /* see below */
constexpr std::strong_ordering strong_order( T&& t, U&& u ) noexcept(/* see below */);
```

Compara dois valores usando comparação de 3 vias e produz um resultado do tipo [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>).

Sejam t e u expressões e `T` e `U` denotem decltype((t)) e decltype((u)) respectivamente, std::strong_order(t, u) é [expressão-equivalente](<#/doc/language/expressions>) a:

  * Se [std::is_same_v](<#/doc/types/is_same>)<[std::decay_t](<#/doc/types/decay>)&lt;T&gt;, [std::decay_t](<#/doc/types/decay>)&lt;U&gt;> for verdadeiro:
    * [std::strong_ordering](<#/doc/utility/compare/strong_ordering>)(strong_order(t, u)), se for uma expressão bem formada com resolução de sobrecarga realizada em um contexto que não inclui uma declaração de `std::strong_order`,
    * caso contrário, se `T` for um tipo de ponto flutuante:
      * se [std::numeric_limits](<#/doc/types/numeric_limits>)<T>::is_iec559 for verdadeiro, realiza a comparação _totalOrder_ ISO/IEC/IEEE 60559 de valores de ponto flutuante e retorna esse resultado como um valor do tipo std::strong_ordering (nota: esta comparação pode distinguir entre zero positivo e negativo e entre NaNs com diferentes representações),
      * caso contrário, produz um valor do tipo std::strong_ordering que é consistente com a ordenação observada pelos operadores de comparação de `T`,
    * caso contrário, [std::strong_ordering](<#/doc/utility/compare/strong_ordering>)([std::compare_three_way](<#/doc/utility/compare/compare_three_way>)()(t, u)) se for bem formado.
  * Em todos os outros casos, a expressão é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando aparece no contexto imediato de uma instanciação de template.

### Customization point objects

O nome `std::strong_order` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___strong_order_fn_`.

Todas as instâncias de `___strong_order_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___strong_order_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualificada ou não (no entanto, uma instância volatile-qualificada não é obrigada a ser invocável). Assim, `std::strong_order` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `std::strong_order` acima, `___strong_order_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__strong_order_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __strong_order_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__strong_order_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __strong_order_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___strong_order_fn_` participa da resolução de sobrecarga.

#### Ordem total estrita de tipos de ponto flutuante IEEE

Sejam x e y valores do mesmo tipo de ponto flutuante IEEE, e total_order_less(x, y) seja o resultado booleano indicando se x precede y na ordem total estrita definida por _totalOrder_ em ISO/IEC/IEEE 60559.

(total_order_less(x, y) || total_order_less(y, x)) == false se e somente se x e y tiverem o mesmo padrão de bits.

  * se nem x nem y for NaN:
    * se x < y, então total_order_less(x, y) == true;
    * se x > y, então total_order_less(x, y) == false;
    * se x == y,
      * se x for zero negativo e y for zero positivo, total_order_less(x, y) == true,
      * se x não for zero e o campo expoente de x for menor que o de y, então total_order_less(x, y) == (x > 0) (somente significativo para números de ponto flutuante decimais);
  * se x ou y for NaN:
    * se x for NaN negativo e y não for NaN negativo, então total_order_less(x, y) == true,
    * se x não for NaN positivo e y for NaN positivo, então total_order_less(x, y) == true,
    * se ambos x e y forem NaNs com o mesmo sinal e o campo mantissa de x for menor que o de y, então total_order_less(x, y) == ![std::signbit](<#/doc/numeric/math/signbit>)(x).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ strong_ordering](<#/doc/utility/compare/strong_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e é substituível
(classe)
[ weak_order](<#/doc/utility/compare/weak_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`
(objeto de ponto de customização)
[ partial_order](<#/doc/utility/compare/partial_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::partial_ordering`
(objeto de ponto de customização)
[ compare_strong_order_fallback](<#/doc/utility/compare/compare_strong_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`, mesmo que operator<=> não esteja disponível
(objeto de ponto de customização)