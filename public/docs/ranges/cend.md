# std::ranges::cend

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ cend = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr /* see below */ auto cend( T&& t );
```

Retorna uma sentinela para o iterador constante (desde C++23) indicando o fim de um range qualificado como const (até C++23).

Seja `CT`

  * const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;& se o argumento for um lvalue (ou seja, `T` é um tipo de referência lvalue),
  * const T caso contrário.

Uma chamada para `ranges::cend` é [expression-equivalent](<#/doc/language/expressions>) a [ranges::end](<#/doc/ranges/end>)(static_cast<CT&&>(t)). | (até C++23)
Se o argumento for um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> for true, então uma chamada para `ranges::cend` é [expression-equivalent](<#/doc/language/expressions>) a:

  * [std::const_sentinel](<#/doc/iterator/basic_const_iterator>)<decltype(U)>(U) para alguma expressão U equivalente a [ranges::end](<#/doc/ranges/end>)(`_[possibly-const-range](<#/doc/ranges>)_`(t)).

Em todos os outros casos, uma chamada para `ranges::cend` é malformada, o que pode resultar em [substitution failure](<#/doc/language/sfinae>) quando a chamada aparece no contexto imediato de uma instanciação de template. | (desde C++23)

Se ranges::cend(e) for válido para uma expressão e, onde decltype((e)) é `T`, então `CT` modela [std::ranges::range](<#/doc/ranges/range>), e (até C++23) [std::sentinel_for](<#/doc/iterator/sentinel_for>)<S, I> é true em todos os casos, onde `S` é decltype(ranges::cend(e)), e `I` é decltype([ranges::cbegin](<#/doc/ranges/cbegin>)(e)). Adicionalmente, `S` modela [`_constant-iterator_`](<#/doc/ranges/constant_range>) se modelar [`input_iterator`](<#/doc/iterator/input_iterator>). (desde C++23)

### Objetos de ponto de customização

O nome `ranges::cend` denota um _customization point object_ , que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___cend_fn_`.

Todas as instâncias de `___cend_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___cend_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `ranges::cend` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::cend` acima, `___cend_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__cend_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cend_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__cend_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cend_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___cend_fn_` participa da resolução de sobrecarga.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        std::vector<int> vec{3, 1, 4};
        int arr[]{5, 10, 15};
    
        assert(std::ranges::find(vec, 5) == std::ranges::cend(vec));
        assert(std::ranges::find(arr, 5) != std::ranges::cend(arr));
    }
```

### Veja também

[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna uma sentinela indicando o fim de um range
(objeto de ponto de customização)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterador para o fim de um container ou array
(modelo de função)