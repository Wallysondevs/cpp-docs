# std::ranges::rend

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ rend = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr std::sentinel_for<
decltype(ranges::rbegin(std::declval<T>()))> auto rend( T&& t );
```

Retorna um sentinel indicando o fim de um range invertido.

Se `T` é um tipo array e [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;> está incompleto, então a chamada para `ranges::rend` é malformada, sem diagnóstico requerido.

Se o argumento é um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> é verdadeiro, então uma chamada para `ranges::rend` é [expression-equivalent](<#/doc/language/expressions>) a:

  1. [`_decay-copy_`](<#/doc/standard_library/decay-copy>)(t.rend())(até C++23)auto(t.rend())(desde C++23), se essa expressão é válida e seu tipo modela [std::sentinel_for](<#/doc/iterator/sentinel_for>)<decltype([ranges::rbegin](<#/doc/ranges/rbegin>)([std::declval](<#/doc/utility/declval>)&lt;T&gt;()))>.
  2. Caso contrário, [`_decay-copy_`](<#/doc/standard_library/decay-copy>)(rend(t))(até C++23)auto(rend(t))(desde C++23), se `T` é um tipo de classe ou enumeração, essa expressão é válida e seu tipo modela [std::sentinel_for](<#/doc/iterator/sentinel_for>)<decltype([ranges::rbegin](<#/doc/ranges/rbegin>)([std::declval](<#/doc/utility/declval>)&lt;T&gt;()))>, onde o significado de `rend` é estabelecido como se por realizar apenas a pesquisa dependente de argumento ([argument-dependent lookup](<#/doc/language/adl>)).
  3. Caso contrário, [std::make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)([ranges::begin](<#/doc/ranges/begin>)(t)) se ambos [ranges::begin](<#/doc/ranges/begin>)(t) e [ranges::end](<#/doc/ranges/end>)(t) são expressões válidas, têm o mesmo tipo, e esse tipo modela [std::bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>).

Em todos os outros casos, uma chamada para `ranges::rend` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando ranges::rend(t) aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::rend` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [`semiregular`](<#/doc/concepts/semiregular>) [literal](<#/doc/named_req/LiteralType>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___rend_fn_`.

Todas as instâncias de `___rend_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___rend_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é exigida ser invocável). Assim, `ranges::rend` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atendem aos requisitos para argumentos de `ranges::rend` acima, `___rend_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__rend_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __rend_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__rend_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __rend_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___rend_fn_` participa da resolução de sobrecarga.

### Notas

Se o argumento é um rvalue (ou seja, `T` é um tipo de objeto) e [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> é falso, ou se é de um tipo array de limite desconhecido, a chamada para `ranges::rend` é malformada, o que também resulta em falha de substituição.

Se ranges::rend([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t)) é válido, então decltype(ranges::rend([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t))) e decltype([ranges::begin](<#/doc/ranges/begin>)([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t))) modelam [std::sentinel_for](<#/doc/iterator/sentinel_for>) em todos os casos, enquanto `T` modela [std::ranges::range](<#/doc/ranges/range>).

O padrão C++20 exige que, se a chamada de função `rend` subjacente retorna um prvalue, o valor de retorno é construído por movimento a partir do objeto temporário materializado. Todas as implementações retornam diretamente o prvalue. O requisito é corrigido pela proposta pós-C++20 [P0849R8](<https://wg21.link/P0849R8>) para corresponder às implementações.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {3, 1, 4};
        namespace ranges = std::ranges;
        if (ranges::find(ranges::rbegin(v), ranges::rend(v), 5) != ranges::rend(v))
            std::cout << "found a 5 in vector v!\n";
    
        int a[] = {5, 10, 15};
        if (ranges::find(ranges::rbegin(a), ranges::rend(a), 5) != ranges::rend(a))
            std::cout << "found a 5 in array a!\n";
    }
```

Saída:
```
    found a 5 in array a!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2602R2](<https://wg21.link/P2602R2>) | C++20 | existe um mecanismo para proibir certas funções `rend` não-membro encontradas por [ADL](<#/doc/language/adl>) | mecanismo removido

### Veja também

[ ranges::crend](<#/doc/ranges/crend>)(C++20) | retorna um reverse end iterator para um range somente leitura
(objeto de ponto de customização)
[ ranges::rbegin](<#/doc/ranges/rbegin>)(C++20) | retorna um reverse iterator para um range
(objeto de ponto de customização)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)