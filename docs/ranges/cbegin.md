# std::ranges::cbegin

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ cbegin = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr /* see below */ auto cbegin( T&& t );
Retorna um iterator para o primeiro elemento do argumento qualificado como const.
Retorna um iterator constante para o primeiro elemento do argumento.
```

Seja `CT`

  * const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;& se o argumento for um lvalue (isto é, `T` é um tipo de referência lvalue),
  * const T caso contrário.

Uma chamada para `ranges::cbegin` é [expression-equivalent](<#/doc/language/expressions>) a [ranges::begin](<#/doc/ranges/begin>)(static_cast<CT&&>(t)). | (ate C++23)
Se o argumento for um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> for true, então uma chamada para `ranges::cbegin` é [expression-equivalent](<#/doc/language/expressions>) a:

  * [std::const_iterator](<#/doc/iterator/const_iterator>)<decltype(U)>(U) para alguma expressão U equivalente a [ranges::begin](<#/doc/ranges/begin>)(`_[possibly-const-range](<#/doc/ranges>)_`(t).

Em todos os outros casos, uma chamada para `ranges::cbegin` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando a chamada aparece no contexto imediato de uma instanciação de template. | (desde C++23)

O tipo de retorno modela [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>) e [`_constant-iterator_`](<#/doc/ranges/constant_range>)(desde C++23) em todos os casos.

### Objetos de ponto de customização

O nome `ranges::cbegin` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___cbegin_fn_`.

Todas as instâncias de `___cbegin_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___cbegin_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `ranges::cbegin` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `ranges::cbegin` acima, `___cbegin_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__cbegin_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cbegin_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__cbegin_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cbegin_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___cbegin_fn_` participa da resolução de sobrecarga.

### Notas

Para um range lvalue e do tipo T, ranges::cbegin(e) é equivalente a

[ranges::begin](<#/doc/ranges/begin>)([std::as_const](<#/doc/utility/as_const>)(e)). | (ate C++23)
  * [ranges::begin](<#/doc/ranges/begin>)(e) se T modelar [`constant_range`](<#/doc/ranges/constant_range>).
  * Caso contrário, [ranges::begin](<#/doc/ranges/begin>)([std::as_const](<#/doc/utility/as_const>)(e)) se const T modelar [`constant_range`](<#/doc/ranges/constant_range>).
  * Caso contrário, [std::basic_const_iterator](<#/doc/iterator/basic_const_iterator>)([ranges::begin](<#/doc/ranges/begin>)(e)).

| (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        std::vector v{3, 1, 4};
        auto vi = std::ranges::cbegin(v);
        assert(3 == *vi);
        ++vi; // OK, o objeto constant-iterator é mutável
        assert(1 == *vi);
        // *vi = 13; // Erro: constant-iterator aponta para um elemento imutável
    
        int a[]{3, 1, 4};
        auto ai = std::ranges::cbegin(a); // cbegin também funciona com arrays C
        assert(3 == *ai and *(ai + 1) == 1);
        // *ai = 13; // Erro: variável somente leitura não é atribuível
    }
```

### Veja também

[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)