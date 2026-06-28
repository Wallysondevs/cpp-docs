# std::ranges::end

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ end = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr std::sentinel_for<ranges::iterator_t<T>> auto end( T&& t );
```

Retorna um sentinel indicando o fim de um range.

Se o argumento for um lvalue ou `[ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)<T>>` for true, então uma chamada para `ranges::end` é [expressão-equivalente](<#/doc/language/expressions>) a:

  1. `t + [std::extent_v](<#/doc/types/extent>)<T>` se `t` tiver um tipo de array de limite conhecido.
     * Se `[std::remove_all_extents_t](<#/doc/types/remove_all_extents>)<[std::remove_reference_t](<#/doc/types/remove_reference>)<T>>` for incompleto, então a chamada para `ranges::end` é malformada, [sem diagnóstico requerido](<#/doc/language/ndr>).
  2. Caso contrário, `_decay-copy_`(t.end())(até C++23)auto(t.end())(desde C++23), se essa expressão for válida, e seu tipo modelar `[std::sentinel_for](<#/doc/iterator/sentinel_for>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)<T>>`.
  3. Caso contrário, `_decay-copy_`(end(t))(até C++23)auto(end(t))(desde C++23), se `T` for um tipo de classe ou enumeração, essa expressão for válida e seu tipo convertido modelar `[std::sentinel_for](<#/doc/iterator/sentinel_for>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)<T>>`, onde o significado de `end` é estabelecido como se fosse por meio de uma [busca dependente de argumento](<#/doc/language/adl>) apenas.

Em todos os outros casos, uma chamada para `ranges::end` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando a chamada para `ranges::end` aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::end` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão sem qualificador cv de seu tipo é denotada como `___end_fn_`.

Todas as instâncias de `___end_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___end_fn_` nos mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `ranges::end` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se `[std::declval](<#/doc/utility/declval>)<Args>()...` atender aos requisitos para argumentos de `ranges::end` acima, `___end_fn_` modela

  * `[std::invocable](<#/doc/concepts/invocable>)<__end_fn, Args...>`,
  * `[std::invocable](<#/doc/concepts/invocable>)<const __end_fn, Args...>`,
  * `[std::invocable](<#/doc/concepts/invocable>)<__end_fn&, Args...>`, e
  * `[std::invocable](<#/doc/concepts/invocable>)<const __end_fn&, Args...>`.

Caso contrário, nenhum operador de chamada de função de `___end_fn_` participa da resolução de sobrecarga.

### Notas

Se o argumento for um rvalue (ou seja, `T` é um tipo de objeto) e `[ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)<T>>` for false, ou se for de um tipo de array de limite desconhecido, a chamada para `ranges::end` é malformada, o que também resulta em falha de substituição.

Se `ranges::end([std::forward](<#/doc/utility/forward>)<T>(t))` for válido, então `decltype(ranges::end([std::forward](<#/doc/utility/forward>)<T>(t)))` e `decltype([ranges::begin](<#/doc/ranges/begin>)([std::forward](<#/doc/utility/forward>)<T>(t)))` modelam `[std::sentinel_for](<#/doc/iterator/sentinel_for>)` em todos os casos, enquanto `T` modela `[std::ranges::range](<#/doc/ranges/range>)`.

O padrão C++20 exige que, se a chamada de função `end` subjacente retornar um prvalue, o valor de retorno seja construído por movimento a partir do objeto temporário materializado. Todas as implementações retornam diretamente o prvalue. O requisito é corrigido pela proposta pós-C++20 [P0849R8](<https://wg21.link/P0849R8>) para corresponder às implementações.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        std::vector<int> vec{3, 1, 4};
        if (std::ranges::find(vec, 5) != std::ranges::end(vec))
            std::cout << "found a 5 in vector vec!\n";
    
        int arr[]{5, 10, 15};
        if (std::ranges::find(arr, 5) != std::ranges::end(arr))
            std::cout << "found a 5 in array arr!\n";
    }
```

Saída:
```
    found a 5 in array arr!
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2602R2](<https://wg21.link/P2602R2>) | C++20 | existe um mecanismo para proibir certos `end` não-membros encontrados por [ADL](<#/doc/language/adl>) | mecanismo removido

### Veja também

[ ranges::cend](<#/doc/ranges/cend>)(C++20) | retorna um sentinel indicando o fim de um range somente leitura
(objeto de ponto de customização)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)