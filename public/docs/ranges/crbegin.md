# std::ranges::crbegin

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ crbegin = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr /* see below */ auto crbegin( T&& t );
Retorna um iterator para o primeiro elemento do argumento qualificado como const que é tratado como uma sequência invertida.
Retorna um iterator constante para o primeiro elemento do argumento que é tratado como uma sequência invertida.
```

Seja `CT`

* const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;& se o argumento for um lvalue (isto é, `T` é um tipo de referência lvalue),
* const T caso contrário.

Uma chamada para `ranges::crbegin` é [expression-equivalent](<#/doc/language/expressions>) a [ranges::rbegin](<#/doc/ranges/rbegin>)(static_cast<CT&&>(t)). | (até C++23)
Se o argumento for um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> for true, então uma chamada para `ranges::crbegin` é [expression-equivalent](<#/doc/language/expressions>) a:

* [std::const_iterator](<#/doc/iterator/const_iterator>)<decltype(U)>(U) para alguma expressão U equivalente a [ranges::rbegin](<#/doc/ranges/rbegin>)(`_[possibly-const-range](<#/doc/ranges>)_`(t)).

Em todos os outros casos, uma chamada para `ranges::crbegin` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando a chamada aparece no contexto imediato de uma instanciação de template. | (desde C++23)

O tipo de retorno modela [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>) e [`_constant-iterator_`](<#/doc/ranges/constant_range>)(desde C++23) em todos os casos.

### Objetos de Ponto de Customização

O nome `ranges::crbegin` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___crbegin_fn_`.

Todas as instâncias de `___crbegin_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___crbegin_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `ranges::crbegin` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::crbegin` acima, `___crbegin_fn_` modela

* [std::invocable](<#/doc/concepts/invocable>)<__crbegin_fn, Args...>,
* [std::invocable](<#/doc/concepts/invocable>)&lt;const __crbegin_fn, Args...&gt;,
* [std::invocable](<#/doc/concepts/invocable>)<__crbegin_fn&, Args...>, e
* [std::invocable](<#/doc/concepts/invocable>)&lt;const __crbegin_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___crbegin_fn_` participa da resolução de sobrecarga.

### Exemplo

Run this code
```cpp
    #include <cassert>
    #include <iterator>
    #include <span>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{3, 1, 4};
        auto vi = std::ranges::crbegin(v);
        assert(*vi == 4);
        ++vi; // OK, o objeto iterator é mutável
        assert(*vi == 1);
        // *vi = 13; // Erro: o elemento subjacente é somente leitura
    
        int a[]{-5, 10, 15};
        auto ai = std::ranges::crbegin(a);
        assert(*ai == 15);
    
        // auto x_x = std::ranges::crbegin(std::vector<int>{6, 6, 6});
        // malformado: o argumento é um rvalue (ver Notas ↑)
    
        auto si = std::ranges::crbegin(std::span{a}); // OK
        assert(*si == 15);
        static_assert
        (
            std::ranges::enable_borrowed_range<std::remove_cv_t<decltype(std::span{a})>>
        );
    }
```

### Ver também

[ ranges::rbegin](<#/doc/ranges/rbegin>)(C++20) | retorna um reverse iterator para um range
(objeto de ponto de customização)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)