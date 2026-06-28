# std::ranges::crend

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ crend = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr /* see below */ auto crend( T&& t );
```

Retorna um sentinel para o iterator constante(desde C++23) indicando o fim de um range qualificado como const(ate C++23) que é tratado como uma sequência invertida.

Seja `CT`

  * const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;& se o argumento for um lvalue (isto é, `T` é um tipo de referência lvalue),
  * const T caso contrário.

Uma chamada para `ranges::crend` é [expression-equivalent](<#/doc/language/expressions>) a [ranges::rend](<#/doc/ranges/rend>)(static_cast<CT&&>(t)). | (ate C++23)
Se o argumento for um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> for verdadeiro, então uma chamada para `ranges::crend` é [expression-equivalent](<#/doc/language/expressions>) a:

  * [std::const_sentinel](<#/doc/iterator/basic_const_iterator>)<decltype(U)>(U) para alguma expressão U equivalente a [ranges::rend](<#/doc/ranges/rend>)(`_[possibly-const-range](<#/doc/ranges>)_`(t)).

Em todos os outros casos, uma chamada para `ranges::crend` é malformada, o que pode resultar em [substitution failure](<#/doc/language/sfinae>) quando a chamada aparece no contexto imediato de uma instanciação de template. | (desde C++23)

Se ranges::crend(e) for válido para uma expressão e, onde decltype((e)) é `T`, então `CT` modela [std::ranges::range](<#/doc/ranges/range>), e(ate C++23) [std::sentinel_for](<#/doc/iterator/sentinel_for>)<S, I> é verdadeiro em todos os casos, onde `S` é decltype(ranges::crend(e)), e `I` é decltype([ranges::crbegin](<#/doc/ranges/crbegin>)(e)). Além disso, `S` modela [`_constant-iterator_`](<#/doc/ranges/constant_range>) se modelar [`input_iterator`](<#/doc/iterator/input_iterator>).(desde C++23)

### Objetos de ponto de customização

O nome `ranges::crend` denota um _objeto de ponto de customização_ , que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [semiregular](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___crend_fn_`.

Todas as instâncias de `___crend_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___crend_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `ranges::crend` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::crend` acima, `___crend_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__crend_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __crend_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__crend_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __crend_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___crend_fn_` participa da resolução de sobrecarga.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        int a[]{4, 6, -3, 9, 10};
        std::cout << "Array backwards: ";
        namespace ranges = std::ranges;
        ranges::copy(ranges::rbegin(a), ranges::rend(a),
                     std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        std::cout << "Vector backwards: ";
        std::vector v{4, 6, -3, 9, 10};
        ranges::copy(ranges::rbegin(v), ranges::rend(v),
                     std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída:
```
    Array backwards: 10 9 -3 6 4 
    Vector backwards: 10 9 -3 6 4 
```

### Veja também

[ ranges::rend](<#/doc/ranges/rend>)(C++20) | retorna um reverse end iterator para um range
(objeto de ponto de customização)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)