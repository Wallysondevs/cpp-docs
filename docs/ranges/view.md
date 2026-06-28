# std::ranges::view, std::ranges::enable_view, std::ranges::view_base

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template<class T>
concept view = ranges::range<T> && std::movable<T> && ranges::enable_view<T>;
template<class T>
constexpr bool enable_view =
std::derived_from<T, view_base>
struct view_base { };
```

1) O `concept` `view` especifica os requisitos de um tipo [`range`](<#/doc/ranges/range>) que possui propriedades semânticas adequadas para uso na construção de pipelines de adaptadores de `range`.

2) O `variable template` `enable_view` é usado para indicar se um [`range`](<#/doc/ranges/range>) é um `view`. /*is-derived-from-view-interface*/&lt;T&gt; é verdadeiro se e somente se `T` tiver exatamente uma classe base pública [ranges::view_interface](<#/doc/ranges/view_interface>)&lt;U&gt; para algum tipo `U`, e `T` não tiver classes base do tipo [ranges::view_interface](<#/doc/ranges/view_interface>)&lt;V&gt; para qualquer outro tipo `V`.
Usuários podem especializar `enable_view` para `true` para tipos definidos pelo programa não qualificados por cv que modelam `view`, e `false` para tipos que não o fazem. Tais especializações devem ser [utilizáveis em expressões constantes](<#/doc/language/constant_expression>) e ter o tipo `const bool`.

3) Derivar de `view_base` permite que tipos [`range`](<#/doc/ranges/range>) modelem `view`.

### Requisitos semânticos

1) `T` modela `view` somente se:

  * a construção por movimento de `T` tiver complexidade de tempo constante, e
  * se \\(\scriptsize N\\)N cópias e/ou movimentos forem feitos a partir de um objeto `T` contendo \\(\scriptsize M\\)M elementos, então esses \\(\scriptsize N\\)N objetos tiverem destruição \\(\scriptsize \mathcal{O}{(N+M)}\\)𝓞(N+M) (o que implica que um objeto `view` movido-de tem destruição \\(\scriptsize \mathcal{O}{(1)}\\)𝓞(1)), e
  * ou [std::copy_constructible](<#/doc/concepts/copy_constructible>)&lt;T&gt; for `false`, ou a construção por cópia de `T` tiver complexidade de tempo constante, e
  * ou [std::copyable](<#/doc/concepts/copyable>)&lt;T&gt; for `false`, ou a atribuição por cópia de `T` não tiver complexidade de tempo maior do que a destruição seguida pela construção por cópia.

### Especializações

Especializações de `enable_view` para todas as especializações dos seguintes `templates` padrão são definidas como `true`:

  * [`std::basic_string_view`](<#/doc/string/basic_string_view>)
  * [`std::span`](<#/doc/container/span>)

  * [`std::optional`](<#/doc/utility/optional>)

| (desde C++26)

### Notas

Exemplos de tipos `view` são:

  * Um tipo [`range`](<#/doc/ranges/range>) que envolve um par de `iterators`, por exemplo, std::[ranges::subrange](<#/doc/ranges/subrange>)&lt;I&gt;.
  * Um tipo [`range`](<#/doc/ranges/range>) que mantém seus elementos por [std::shared_ptr](<#/doc/memory/shared_ptr>) e compartilha a propriedade com todas as suas cópias.
  * Um tipo [`range`](<#/doc/ranges/range>) que gera seus elementos sob demanda, por exemplo, [std::ranges::iota_view](<#/doc/ranges/iota_view>).

Um `container` copiável como [std::vector](<#/doc/container/vector>)<[std::string](<#/doc/string/basic_string>)> geralmente não atende aos requisitos semânticos de `view`, pois copiar o `container` copia todos os elementos, o que não pode ser feito em tempo constante.

Embora os `views` fossem originalmente descritos como `ranges` de cópia barata e não proprietários, um tipo não é obrigado a ser copiável ou não proprietário para modelar `view`. No entanto, ainda deve ser barato copiar (se for copiável), mover, atribuir e destruir, para que os [adaptadores de range](<#/doc/ranges>) não tenham complexidade inesperada.

Por padrão, um tipo que modela [`movable`](<#/doc/concepts/movable>) e [`range`](<#/doc/ranges/range>) é considerado um `view` se for pública e inequivocamente derivado de `view_base`, ou exatamente uma especialização de std::ranges::view_interface.

### Exemplo

Um `view` mínimo.
```cpp
    #include <ranges>
    
    struct ArchetypalView : std::ranges::view_interface<ArchetypalView>
    {
        int* begin();
        int* end();
    };
    
    static_assert(std::ranges::view<ArchetypalView>);
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2325R3](<https://wg21.link/P2325R3>) | C++20 | `view` exigia [`default_initializable`](<#/doc/concepts/default_initializable>) | não exige
[LWG 3549](<https://cplusplus.github.io/LWG/issue3549>) | C++20 | `enable_view` não detectava herança de `view_interface` | detecta
[P2415R2](<https://wg21.link/P2415R2>) | C++20 | a restrição na complexidade de tempo da destruição era muito rigorosa | relaxada