# std::ranges::size

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
Definido no header `<iterator>`
inline namespace /* unspecified */ {
inline constexpr auto size = /* unspecified */;
}  // (desde C++20)
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr auto size( T&& t );  // (desde C++20)
```

Calcula o número de elementos em t em tempo constante.

Dada a [subexpressão](<#/doc/language/expressions>) da qual t denota o objeto de resultado (possivelmente [materializado](<#/doc/language/implicit_cast>)) como E, e o tipo de E como `T`:

*   Se `T` é um array de limite desconhecido, ranges::size(E) é malformado.
*   Caso contrário, se `T` é um tipo array, ranges::size(E) é [expressão-equivalente](<#/doc/language/expressions>) a [`_decay-copy_`](<#/doc/standard_library/decay-copy>) ﻿([std::extent_v](<#/doc/types/extent>)&lt;T&gt;)(até C++23)auto([std::extent_v](<#/doc/types/extent>)&lt;T&gt;)(desde C++23).
*   Caso contrário, se todas as condições a seguir forem satisfeitas, ranges::size(E) é expressão-equivalente a [`_decay-copy_`](<#/doc/standard_library/decay-copy>) ﻿(t.size())(até C++23)auto(t.size())(desde C++23):
    *   [ranges::disable_sized_range](<#/doc/ranges/sized_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)<T>> é falso.
    *   [`_decay-copy_`](<#/doc/standard_library/decay-copy>) ﻿(t.size())(até C++23)auto(t.size())(desde C++23) é uma expressão válida de [tipo inteiro](<#/doc/iterator/is-integer-like>).
*   Caso contrário, se todas as condições a seguir forem satisfeitas, ranges::size(E) é expressão-equivalente a [`_decay-copy_`](<#/doc/standard_library/decay-copy>) ﻿(size(t))(até C++23)auto(size(t))(desde C++23):
    *   `T` é um tipo de classe ou enumeração.
    *   [ranges::disable_sized_range](<#/doc/ranges/sized_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)<T>> é falso.
    *   [`_decay-copy_`](<#/doc/standard_library/decay-copy>) ﻿(size(t))(até C++23)auto(size(t))(desde C++23) é uma expressão válida de tipo inteiro, onde o significado de `size` é estabelecido como se fosse por meio de [argument-dependent lookup](<#/doc/language/adl>) apenas.
*   Caso contrário, se todas as condições a seguir forem satisfeitas, ranges::size(E) é expressão-equivalente a `_[to-unsigned-like](<#/doc/ranges>)_` ﻿([ranges::end](<#/doc/ranges/end>)(t) - [ranges::begin](<#/doc/ranges/begin>)(t)):
    *   `T` modela [`forward_range`](<#/doc/ranges/forward_range>).
    *   Dado o tipo de [ranges::begin](<#/doc/ranges/begin>)(t) como `I` e o tipo de [ranges::end](<#/doc/ranges/end>)(t) como `S`, ambos [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>)<S, I> e [`forward_iterator`](<#/doc/iterator/forward_iterator>)<I> são modelados.
    *   `_[to-unsigned-like](<#/doc/ranges>)_` ﻿([ranges::end](<#/doc/ranges/end>)(t) - [ranges::begin](<#/doc/ranges/begin>)(t)) é uma expressão válida.
*   Caso contrário, ranges::size(E) é malformado.

Casos malformados diagnosticáveis acima resultam em [falha de substituição](<#/doc/language/sfinae>) quando ranges::size(E) aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::size` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___size_fn_`.

Todas as instâncias de `___size_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___size_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `ranges::size` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::size` acima, `___size_fn_` modela

*   [std::invocable](<#/doc/concepts/invocable>)<__size_fn, Args...>,
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __size_fn, Args...&gt;,
*   [std::invocable](<#/doc/concepts/invocable>)<__size_fn&, Args...>, e
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __size_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___size_fn_` participa da resolução de sobrecarga.

### Notas

Sempre que ranges::size(e) é válido para uma expressão e, o tipo de retorno é [tipo inteiro](<#/doc/iterator/is-integer-like>).

O padrão C++20 exige que, se a chamada de função `size` subjacente retornar um prvalue, o valor de retorno seja construído por movimento a partir do objeto temporário materializado. Todas as implementações retornam diretamente o prvalue. O requisito é corrigido pela proposta pós-C++20 [P0849R8](<https://wg21.link/P0849R8>) para corresponder às implementações.

A expressão [ranges::distance](<#/doc/iterator/ranges/distance>)(e) também pode ser usada para determinar o tamanho de um range e. Ao contrário de ranges::size(e), [ranges::distance](<#/doc/iterator/ranges/distance>)(e) funciona mesmo se e for um range sem tamanho, ao custo de ter complexidade linear nesse caso.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <type_traits>
    #include <vector>
    
    int main()
    {
        auto v = std::vector<int>{};
        std::cout << "ranges::size(v) == " << std::ranges::size(v) << '\n';
    
        auto il = {7};     // std::initializer_list
        std::cout << "ranges::size(il) == " << std::ranges::size(il) << '\n';
    
        int array[]{4, 5}; // array has a known bound
        std::cout << "ranges::size(array) == " << std::ranges::size(array) << '\n';
    
        static_assert(std::is_signed_v<decltype(std::ranges::size(v))> == false);
    }
```

Saída:
```
    ranges::size(v) == 0
    ranges::size(il) == 1
    ranges::size(array) == 2
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2602R2](<https://wg21.link/P2602R2>) | C++20 | havia mecanismos para proibir certos `size` não-membros encontrados por [ADL](<#/doc/language/adl>) | removeu tais mecanismos

### Veja também

[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro com sinal igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::sized_range](<#/doc/ranges/sized_range>)(C++20) | especifica que um range conhece seu tamanho em tempo constante
(concept)
[ ranges::distance](<#/doc/iterator/ranges/distance>)(C++20) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(objeto de função de algoritmo)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)