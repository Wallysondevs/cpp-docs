# std::ranges::rbegin

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ rbegin = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr std::input_or_output_iterator auto rbegin( T&& t );
```

Retorna um iterator para o último elemento do argumento.

Se `T` é um tipo array e [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;> está incompleto, então a chamada para `ranges::rbegin` é malformada, sem diagnóstico requerido.

Se o argumento é um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> é true, então uma chamada para `ranges::rbegin` é [expression-equivalent](<#/doc/language/expressions>) a:

  1. [`_decay-copy_`](<#/doc/standard_library/decay-copy>)(t.rbegin())(até C++23)auto(t.rbegin())(desde C++23), se essa expressão é válida e seu tipo modela [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>).
  2. Caso contrário, [`_decay-copy_`](<#/doc/standard_library/decay-copy>)(rbegin(t))(até C++23)auto(rbegin(t))(desde C++23), se `T` é um tipo de classe ou enumeração, essa expressão é válida e seu tipo modela [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>), onde o significado de `rbegin` é estabelecido como se por realizar apenas [argument-dependent lookup](<#/doc/language/adl>).
  3. Caso contrário, [std::make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)([ranges::end](<#/doc/ranges/end>)(t)) se ambos [ranges::begin](<#/doc/ranges/begin>)(t) e [ranges::end](<#/doc/ranges/end>)(t) são expressões válidas, têm o mesmo tipo, e esse tipo modela [std::bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>).

Em todos os outros casos, uma chamada para `ranges::rbegin` é malformada, o que pode resultar em [substitution failure](<#/doc/language/sfinae>) quando ranges::rbegin(t) aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::rbegin` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [`semiregular`](<#/doc/concepts/semiregular>) [literal](<#/doc/named_req/LiteralType>). Para fins de exposição, a versão cv-unqualified de seu tipo é denotada como `___rbegin_fn_`.

Todas as instâncias de `___rbegin_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___rbegin_fn_` nos mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é exigida para ser invocável). Assim, `ranges::rbegin` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atendem aos requisitos para argumentos de `ranges::rbegin` acima, `___rbegin_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__rbegin_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __rbegin_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__rbegin_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __rbegin_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___rbegin_fn_` participa da resolução de sobrecarga.

### Notas

Se o argumento é um rvalue (isto é, `T` é um tipo de objeto) e [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> é false, a chamada para `ranges::rbegin` é malformada, o que também resulta em substitution failure.

O tipo de retorno modela [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>) em todos os casos.

O padrão C++20 exige que, se a chamada de função `rbegin` subjacente retorna um prvalue, o valor de retorno é move-constructed a partir do objeto temporário materializado. Todas as implementações retornam diretamente o prvalue. O requisito é corrigido pela proposta pós-C++20 [P0849R8](<https://wg21.link/P0849R8>) para corresponder às implementações.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <span>
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {3, 1, 4};
        auto vi = std::ranges::rbegin(v);
        std::cout << *vi << '\n';
        *vi = 42; // OK
    
        int a[] = {-5, 10, 15};
        auto ai = std::ranges::rbegin(a);
        std::cout << *ai << '\n';
        *ai = 42; // OK
    
        // auto x_x = std::ranges::rbegin(std::vector{6, 6, 6});
        // ill-formed: the argument is an rvalue (see Notes ↑)
    
        auto si = std::ranges::rbegin(std::span{a}); // OK
        static_assert(std::ranges::enable_borrowed_range<
            std::remove_cv_t<decltype(std::span{a})>>);
        *si = 42; // OK
    }
```

Saída:
```
    4
    15
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2602R2](<https://wg21.link/P2602R2>) | C++20 | existe um mecanismo para proibir certos `rbegin` não-membros encontrados por [ADL](<#/doc/language/adl>) | mecanismo removido

### Ver também

[ ranges::crbegin](<#/doc/ranges/crbegin>)(C++20) | retorna um reverse iterator para um range somente leitura
(objeto de ponto de customização)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)