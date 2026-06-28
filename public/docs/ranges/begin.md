# std::ranges::begin

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ begin = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr std::input_or_output_iterator auto begin( T&& t );
```

Retorna um iterator para o primeiro elemento do argumento.

Se o argumento for um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> for true, então uma chamada para `ranges::begin` é [expression-equivalent](<#/doc/language/expressions>) a:

  1. t + 0 se t tiver um tipo array.
     * Se [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)<[std::remove_reference_t](<#/doc/types/remove_reference>)<T>> for incompleto, então a chamada para `ranges::begin` é malformada, sem diagnóstico requerido.
  2. Caso contrário, [`_decay-copy_`](<#/doc/standard_library/decay-copy>)(t.begin())(até C++23)auto(t.begin())(desde C++23), se essa expressão for válida e seu tipo modelar [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>).
  3. Caso contrário, [`_decay-copy_`](<#/doc/standard_library/decay-copy>)(begin(t))(até C++23)auto(begin(t))(desde C++23), se `T` for um tipo de classe ou enumeração, essa expressão for válida e seu tipo modelar [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>), onde o significado de `begin` é estabelecido como se por realizar [argument-dependent lookup](<#/doc/language/adl>) apenas.

Em todos os outros casos, uma chamada para `ranges::begin` é malformada, o que pode resultar em [substitution failure](<#/doc/language/sfinae>) quando a chamada aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::begin` denota um _objeto de ponto de customização_ , que é um `function object` `const` de um tipo de classe `literal` [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-unqualified de seu tipo é denotada como `___begin_fn_`.

Todas as instâncias de `___begin_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___begin_fn_` nos mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é exigida para ser invocável). Assim, `ranges::begin` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::begin` acima, `___begin_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__begin_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __begin_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__begin_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __begin_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___begin_fn_` participa da resolução de sobrecarga.

### Notas

Se o argumento for um rvalue (ou seja, `T` é um tipo de objeto) e [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> for false, a chamada para `ranges::begin` é malformada, o que também resulta em substitution failure.

O tipo de retorno modela [std::input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>) em todos os casos.

O padrão C++20 exige que, se a chamada de função `begin` subjacente retornar um prvalue, o valor de retorno seja move-constructed a partir do objeto temporário materializado. Todas as implementações retornam diretamente o prvalue. O requisito é corrigido pela proposta pós-C++20 [P0849R8](<https://wg21.link/P0849R8>) para corresponder às implementações.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    #include <vector>
    
    int main() 
    {
        std::vector v{3, 1, 4};
        auto vi = std::ranges::begin(v);
        auto vci = std::ranges::cbegin(v);
        assert(*vi == 3 and *vi == *vci);
        ++vi;
        ++vci; // OK: vci é um objeto modificável
        *vi = 42; // OK: vi aponta para um elemento mutável
        // *vci = 13; // Erro: vci aponta para um elemento imutável
    
        int a[]{-5, 10, 15};
        auto ai = std::ranges::begin(a); // funciona com arrays C também
        assert(*ai == -5);
        *ai = 42; // OK
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2602R2](<https://wg21.link/P2602R2>) | C++20 | existe um mecanismo para proibir certos `begin` não-membros encontrados por [ADL](<#/doc/language/adl>) | removido tal mecanismo

### Veja também

[ ranges::cbegin](<#/doc/ranges/cbegin>)(C++20) | retorna um iterator para o início de um range somente leitura
(objeto de ponto de customização)
[ begin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)