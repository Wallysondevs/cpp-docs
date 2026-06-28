# std::ranges::views::single, std::ranges::single_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< std::copy_constructible T >
requires std::is_object_v<T>
class single_view
: public ranges::view_interface<single_view<T>>
(até C++23)
template< std::move_constructible T >
requires std::is_object_v<T>
class single_view
: public ranges::view_interface<single_view<T>>
namespace views {
inline constexpr /* unspecified */ single = /* unspecified */;
}
Assinatura da chamada
template< class T >
requires /* see below */
constexpr /* see below */ single( T&& t );
```

1) Produz uma [`view`](<#/doc/ranges/view>) que contém exatamente um elemento de um valor especificado.

2) A expressão views::single(e) é [expression-equivalent](<#/doc/language/expressions>) a single_view<[std::decay_t](<#/doc/types/decay>)<decltype((e))>>(e) para qualquer subexpressão e adequada.

O tempo de vida do elemento está vinculado à `single_view` pai. Copiar uma `single_view` faz uma cópia do elemento.

### Customization point objects

O nome `views::single` denota um _customization point object_ , que é um const [objeto de função](<#/doc/named_req/FunctionObject>) de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-unqualified de seu tipo é denotada como `___single_fn_`.

Todas as instâncias de `___single_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___single_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é obrigada a ser invocável). Assim, `views::single` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `views::single` acima, `___single_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__single_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __single_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__single_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __single_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___single_fn_` participa da resolução de sobrecarga.

### Membros de dados

Membro | Definição
---|---
[`_copyable-box_`](<#/doc/ranges/copyable_wrapper>) ﻿`<T>` `_value__` (até C++23) | o único elemento da view
(objeto membro apenas para exposição*)
[`_movable-box_`](<#/doc/ranges/copyable_wrapper>) ﻿`<T>` `_value__` (desde C++23) | o único elemento da view
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/single_view>) | constrói uma `single_view`
(função membro pública)
[ begin](<#/doc/ranges/single_view>) | retorna um ponteiro para o elemento
(função membro pública)
[ end](<#/doc/ranges/single_view>) | retorna um ponteiro após o elemento
(função membro pública)
[ empty](<#/doc/ranges/single_view>)[static] | retorna false
(função membro estática pública)
[ size](<#/doc/ranges/single_view>)[static] | retorna 1
(função membro estática pública)
[ data](<#/doc/ranges/single_view>) | retorna um ponteiro para o elemento
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfizer [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfizer [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfizer [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

## std::ranges::single_view::single_view

```cpp
single_view() requires std::default_initializable<T> = default;  // (1) (desde C++20)
  // (2)
constexpr explicit single_view( const T& t );  // (desde C++20)
(até C++23)
constexpr explicit single_view( const T& t )
requires std::copy_constructible<T>;  // (desde C++23)
constexpr explicit single_view( T&& t );  // (3) (desde C++20)
template< class... Args >
requires std::constructible_from<T, Args...>
constexpr explicit single_view( std::in_place_t, Args&&... args );  // (4) (desde C++20)
```

Constrói uma `single_view`.

1) Inicializa `_value__` por padrão, o que inicializa seu valor contido por valor.

2) Inicializa `_value__` com t.

3) Inicializa `_value__` com std::move(t).

4) Inicializa `_value__` como se por `_value__`{[std::in_place](<#/doc/utility/in_place>), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...}.

## std::ranges::single_view::begin

```cpp
constexpr T* begin() noexcept;
constexpr const T* begin() const noexcept;  // (desde C++20)
```

Equivalente a return data();.

## std::ranges::single_view::end

```cpp
constexpr T* end() noexcept;
constexpr const T* end() const noexcept;  // (desde C++20)
```

Equivalente a return data() + 1;.

## std::ranges::single_view::empty

```cpp
static constexpr bool empty() noexcept;  // (desde C++20)
```

Equivalente a return false;.

## std::ranges::single_view::size

```cpp
static constexpr std::size_t size() noexcept;  // (desde C++20)
```

Equivalente a return 1;.

Faz com que `single_view` modele /*tiny-range*/ conforme exigido por [`split_view`](<#/doc/ranges/split_view>).

## std::ranges::single_view::data

```cpp
constexpr T* data() noexcept;
constexpr const T* data() const noexcept;  // (desde C++20)
```

Retorna um ponteiro para o valor contido de `_value__`. O comportamento é indefinido se `_value__` não contiver um valor.

### Deduction guides

```cpp
template< class T >
single_view( T ) -> single_view<T>;  // (desde C++20)
```

### Notas

Para uma [`single_view`](<#/doc/ranges/single_view>), a função membro herdada `empty` sempre retorna false, e a função de conversão `operator bool` herdada sempre retorna true.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <ranges>
    #include <string>
    #include <tuple>
    
    int main()
    {
        constexpr std::ranges::single_view sv1{3.1415}; // uses (const T&) constructor
        static_assert(sv1);
        static_assert(not sv1.empty());
    
        std::cout << "1) *sv1.data(): " << *sv1.data() << '\n'
                  << "2) *sv1.begin(): " << *sv1.begin() << '\n'
                  << "3)  sv1.size(): " << sv1.size() << '\n'
                  << "4)  distance: " << std::distance(sv1.begin(), sv1.end()) << '\n';
    
        std::string str{"C++20"};
        std::cout << "5)  str = " << std::quoted(str) << '\n';
        std::ranges::single_view sv2{std::move(str)}; // uses (T&&) constructor
        std::cout << "6) *sv2.data(): " << std::quoted(*sv2.data()) << '\n'
                  << "7)  str = " << std::quoted(str) << '\n';
    
        std::ranges::single_view<std::tuple<int, double, std::string>>
            sv3{std::in_place, 42, 3.14, "😄"}; // uses (std::in_place_t, Args&&... args)
    
        std::cout << "8)  sv3 holds a tuple: { "
                  << std::get<0>(sv3[0]) << ", "
                  << std::get<1>(sv3[0]) << ", "
                  << std::get<2>(sv3[0]) << " }\n";
    }
```

Saída:
```
    1) *sv1.data(): 3.1415
    2) *sv1.begin(): 3.1415
    3)  sv1.size(): 1
    4)  distance: 1
    5)  str = "C++20"
    6) *sv2.data(): "C++20"
    7)  str = ""
    8)  sv3 holds a tuple: { 42, 3.14, 😄 }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3428](<https://cplusplus.github.io/LWG/issue3428>) | C++20 | `single_view` era conversível de [std::in_place_t](<#/doc/utility/in_place>) | o construtor é tornado explícito
[LWG 4035](<https://cplusplus.github.io/LWG/issue4035>) | C++20 | `single_view` não fornecia a função membro `empty()` | fornece `empty()`
[P2367R0](<https://wg21.link/P2367R0>) | C++20 | os deduction guides para `single_view` falhavam em decair o argumento; `views::single` copiava, mas não envolvia uma `single_view` | um guide de decaimento fornecido; feito para sempre envolver

### Veja também

[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(modelo de classe)
[ ranges::empty_viewviews::empty](<#/doc/ranges/empty_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) vazia sem elementos
(modelo de classe) (modelo de variável)
[ ranges::split_viewviews::split](<#/doc/ranges/split_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) sobre os subranges obtidos ao dividir outra [`view`](<#/doc/ranges/view>) usando um delimitador
(modelo de classe) (objeto adaptador de range)