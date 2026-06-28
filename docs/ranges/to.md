# std::ranges::to

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class C, ranges::input_range R, class... Args >
requires (!ranges::view<C>)
constexpr C to( R&& r, Args&&... args );
template< template< class... > class C,
ranges::input_range R, class... Args >
constexpr auto to( R&& r, Args&&... args );
template< class C, class... Args >
requires (!ranges::view<C>)
constexpr /*range adaptor closure*/ to( Args&&... args );
template< template< class... > class C, class... Args >
constexpr /*range adaptor closure*/ to( Args&&... args );
Helper templates
template< class Container >
constexpr bool /*reservable-container*/ =
ranges::sized_range<Container> &&
requires (Container& c, ranges::range_size_t<Container> n)
{
c.reserve(n);
{ c.capacity() } -> std::same_as<decltype(n)>;
{ c.max_size() } -> std::same_as<decltype(n)>;
};
template< class Container, class Reference >
constexpr bool /*container-appendable*/ =
requires (Container& c, Reference&& ref)
{
requires
(
requires { c.emplace_back(std::forward<Reference>(ref)); }
requires { c.push_back(std::forward<Reference>(ref)); }
requires { c.emplace(c.end(), std::forward<Reference>(ref)); }
requires { c.insert(c.end(), std::forward<Reference>(ref)); }
);
};
template< class Reference, class C >
constexpr auto /*container-appender*/( C& c );
template< class R, class T >
concept /*container-compatible-range*/ =
ranges::input_range<R> &&
std::convertible_to<ranges::range_reference_t<R>, T>;
```

As sobrecargas da função de conversão de range constroem um novo objeto não-view a partir de um range de origem como seu primeiro argumento, chamando um construtor que aceita um range, um construtor de range marcado com `std::from_range_t`, um construtor que aceita um par iterador-sentinela, ou inserindo cada elemento do range de origem no objeto construído com os argumentos.

1) Constrói um objeto do tipo `C` a partir dos elementos de `r` da seguinte forma:

a) Se `C` não satisfaz [`input_range`](<#/doc/ranges/input_range>) ou [std::convertible_to](<#/doc/concepts/convertible_to>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;, [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;C&gt;> for verdadeiro:

1) Constrói um objeto não-view como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `C` a partir do range de origem [std::forward](<#/doc/utility/forward>)&lt;R&gt;(r) e o restante dos argumentos funcionais [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... se [std::constructible_from](<#/doc/concepts/constructible_from>)<C, R, Args...> for verdadeiro.

2) Caso contrário, constrói um objeto não-view como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `C` a partir da tag de desambiguação adicional [std::from_range](<#/doc/ranges/from_range>), o range de origem [std::forward](<#/doc/utility/forward>)&lt;R&gt;(r) e o restante dos argumentos funcionais [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... se [std::constructible_from](<#/doc/concepts/constructible_from>)<C, [std::from_range_t](<#/doc/ranges/from_range>), R, Args...> for verdadeiro.

3) Caso contrário, constrói um objeto não-view como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `C` a partir do par iterador-sentinela ([ranges::begin](<#/doc/ranges/begin>)(r) como um iterador e [ranges::end](<#/doc/ranges/end>)(r) como sentinela, onde iterador e sentinela têm o mesmo tipo. Em outras palavras, o range de origem deve ser um common range), e o restante dos argumentos da função [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... se todas as condições abaixo forem verdadeiras:

  * [ranges::common_range](<#/doc/ranges/common_range>)&lt;R&gt;
  * Se [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;R&gt;>::iterator_category for válido e denotar um tipo que satisfaz [std::derived_from](<#/doc/concepts/derived_from>)<[std::input_iterator_tag](<#/doc/iterator/iterator_tags>)>
  * [std::constructible_from](<#/doc/concepts/constructible_from>)<C, [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;R&gt;, [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;R&gt;, Args...>

4) Caso contrário, constrói um objeto range não-view como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `C` a partir do restante dos argumentos da função [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... com a seguinte chamada equivalente abaixo após a construção:

if constexpr ([ranges::sized_range](<#/doc/ranges/sized_range>)&lt;R&gt; && /*reservable-container*/&lt;C&gt;)
c.reserve(static_cast<[ranges::range_size_t](<#/doc/ranges/range_size_t>)&lt;C&gt;>([ranges::size](<#/doc/ranges/size>)(r)));
[ranges::for_each](<#/doc/algorithm/ranges/for_each>)(r, /*container-appender*/(c));
Se `R` satisfaz [`sized_range`](<#/doc/ranges/sized_range>) e `C` satisfaz `_[reservable-container](<#/doc/ranges/to>)_`, o objeto `c` construído do tipo `C` é capaz de reservar armazenamento com o tamanho de armazenamento inicial [ranges::size](<#/doc/ranges/size>)(r) para evitar alocações adicionais durante a inserção de novos elementos. Cada elemento de `r` é anexado a `c`. As operações acima são válidas se ambas as condições abaixo forem verdadeiras:

  * [std::constructible_from](<#/doc/concepts/constructible_from>)<C, Args...>
  * `_[container-appendable](<#/doc/ranges/to>)_` <C, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;>

b) Caso contrário, a expressão de retorno é equivalente a:

to&lt;C&gt;([ranges::ref_view](<#/doc/ranges/ref_view>)(r) | [views::transform](<#/doc/ranges/transform_view>)([](auto&& elem)
{
return to<[ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;C&gt;>([std::forward](<#/doc/utility/forward>)<decltype(elem)>(elem));
}), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...)
O que permite construções de range aninhadas dentro do range se [ranges::input_range](<#/doc/ranges/input_range>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;C&gt;> for verdadeiro.

Caso contrário, o programa é malformado.

2) Constrói um objeto de tipo deduzido a partir dos elementos de `r`.

Seja /*input-iterator*/ um tipo apenas para exposição que satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>):

```cpp
struct /*input-iterator*/
{
using iterator_category = std::input_iterator_tag;
using value_type = ranges::range_value_t<R>;
using difference_type = std::ptrdiff_t;
using pointer = std::add_pointer_t<ranges::range_reference_t<R>>;
using reference = ranges::range_reference_t<R>;
reference operator*() const; // not defined
pointer operator->() const; // not defined
/*input-iterator*/& operator++(); // not defined
/*input-iterator*/ operator++(int); // not defined
bool operator==(const /*input-iterator*/&) const; // not defined
};  // (apenas para exposição*)
```

Seja /*DEDUCE-EXPR*/ definido da seguinte forma:

  * C([std::declval](<#/doc/utility/declval>)&lt;R&gt;(), [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()...), se essa expressão for válida.
  * Caso contrário, C([std::from_range](<#/doc/ranges/from_range>), [std::declval](<#/doc/utility/declval>)&lt;R&gt;(),
[std::declval](<#/doc/utility/declval>)&lt;Args&gt;()...), se essa expressão for válida.
  * Caso contrário, C([std::declval](<#/doc/utility/declval>)</*input-iterator*/>(),
[std::declval](<#/doc/utility/declval>)</*input-iterator*/>(),
[std::declval](<#/doc/utility/declval>)&lt;Args&gt;()...), se essa expressão for válida.
  * Caso contrário, o programa é malformado.

A chamada é equivalente a to<decltype(/*DEDUCE-EXPR*/)>
([std::forward](<#/doc/utility/forward>)&lt;R&gt;(r), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

3,4) Retorna um wrapper de chamada de perfect forwarding que também é um [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>).

5) É verdadeiro se satisfaz [ranges::sized_range](<#/doc/ranges/sized_range>) e é elegível para ser reservável.

6) É verdadeiro se um elemento do tipo `Reference` pode ser anexado a `Container` através de uma chamada de função membro `emplace_back`, `push_back`, `emplace` ou `insert`.

7) Retorna um objeto de função onde uma chamada para o objeto de função retornado é expression-equivalent a anexar um elemento a um container. A expressão de retorno é equivalente a:

return [&c]&lt;class Reference&gt;(Reference&& ref)
{
if constexpr (requires { c.emplace_back([std::declval](<#/doc/utility/declval>)&lt;Reference&gt;()); })
c.emplace_back([std::forward](<#/doc/utility/forward>)&lt;Reference&gt;(ref));
else if constexpr (requires { c.push_back([std::declval](<#/doc/utility/declval>)&lt;Reference&gt;()); })
c.push_back([std::forward](<#/doc/utility/forward>)&lt;Reference&gt;(ref));
else if constexpr (requires { c.emplace(c.end(),
[std::declval](<#/doc/utility/declval>)&lt;Reference&gt;()); })
c.emplace(c.end(), [std::forward](<#/doc/utility/forward>)&lt;Reference&gt;(ref));
else
c.insert(c.end(), [std::forward](<#/doc/utility/forward>)&lt;Reference&gt;(ref));
};

8) É usado na definição de containers na construção de um input range `R` cujo tipo de referência de range deve ser convertível para `T`.

### Parâmetros

- **r** — um objeto range de origem
- **args** — lista dos argumentos para ([1,2](<#/doc/ranges/to>)) construir um range ou ([3,4](<#/doc/ranges/to>)) vincular aos últimos parâmetros do objeto range adaptor closure
Requisitos de tipo
-`C` deve ser um tipo de classe cv-unqualified ([1,3](<#/doc/ranges/to>))

### Valor de retorno

1,2) Um objeto não-view construído.

3,4) Um objeto range adaptor closure de tipo não especificado, com as seguintes propriedades:

## Tipo de retorno de ranges::to

#### Objetos membro

O objeto retornado se comporta como se não tivesse um objeto alvo, e um objeto [std::tuple](<#/doc/utility/tuple>) `tup` construído com [std::tuple](<#/doc/utility/tuple>)<[std::decay_t](<#/doc/types/decay>)&lt;Args&gt;...>([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...), exceto que o comportamento de atribuição do objeto retornado é não especificado e os nomes são apenas para exposição.

#### Construtores

O tipo de retorno de `ranges::to` ([3,4](<#/doc/ranges/to>)) se comporta como se seus construtores de cópia/movimentação realizassem uma cópia/movimentação membro a membro. É [CopyConstructible](<#/doc/named_req/CopyConstructible>) se todos os seus objetos membro (especificados acima) são CopyConstructible, e é [MoveConstructible](<#/doc/named_req/MoveConstructible>) caso contrário.

#### Função membro `operator()`

Dado um objeto `G` obtido de uma chamada anterior a range::to</* veja abaixo */>(args...), quando um glvalue `g` designando `G` é invocado em uma expressão de chamada de função g(r), uma invocação do objeto armazenado ocorre, como se por

  * ranges::to</* veja abaixo */>(r, std::get&lt;Ns&gt;(g.tup)...), onde

  * `r` é um objeto range de origem que deve satisfazer [`input_range`](<#/doc/ranges/input_range>).
  * `Ns` é um pacote de inteiros 0, 1, ..., (sizeof...(Args) - 1).
  * `g` é um lvalue na expressão de chamada se for um lvalue na expressão de chamada, e é um rvalue caso contrário. Assim, std::move(g)(r) pode mover os argumentos vinculados para a chamada, onde g(r) faria uma cópia.
  * O argumento de template especificado é ([3](<#/doc/ranges/to>)) `C` ou ([4](<#/doc/ranges/to>)) o tipo deduzido de um class template `C` que não deve satisfazer [`view`](<#/doc/ranges/view>).

O programa é malformado se `g` tiver um tipo volatile-qualified.

### Exceções

Apenas lança exceções se a construção de um objeto não-view lançar exceções.

### Notas

A inserção de elementos no container pode envolver cópia, o que pode ser menos eficiente do que move, porque referências lvalue são produzidas durante a chamada de indireção. Os usuários podem optar por usar [views::as_rvalue](<#/doc/ranges/as_rvalue_view>) para adaptar o range, a fim de que seus elementos sempre produzam uma referência rvalue durante a chamada de indireção, o que implica move.

Os parênteses são obrigatórios ao usar a sintaxe pipe.
```cpp
    auto vec = r | std::ranges::to<std::vector>;   // Erro
    auto vec = r | std::ranges::to<std::vector>(); // OK
```

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_ranges_to_container`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::ranges::to`

### Exemplo

Um link de pré-visualização: [Compiler Explorer](<https://godbolt.org/z/s4E3n8ed5>)

Execute este código
```cpp
    #include <boost/container/devector.hpp>
    #include <concepts>
    #include <list>
    #include <initializer_list>
    #include <iostream>
    #include <print>
    #include <ranges>
    #include <regex>
    #include <string>
    #include <vector>
    
    int main()
    {
        auto vec = std::views::iota(1, 5)
                 | std::views::transform({ return v * 2; })
                 | std::ranges::to<std::vector>();
    
        static_assert(std::same_as<decltype(vec), std::vector<int>>);
        std::println("{}", vec);
    
        auto list = vec | std::views::take(3) | std::ranges::to<std::list<double>>();
        std::println("{}", list);
    }
    
    void ctor_demos()
    {
        // 1.a.1) Inicialização direta
        {
            char array[]{'a', 'b', '\0', 'c'};
    
            // O tipo do argumento é convertível para o tipo de valor do resultado:
            auto str_to = std::ranges::to<std::string>(array);
            // Equivalente a
            std::string str(array);
    
            // O tipo do resultado não é um input range:
            auto re_to = std::ranges::to<std::regex>(array);
            // Equivalente a
            std::regex re(array);
        }
    
        // 1.a.2) Construtor from_range
        {
            auto list = {'a', 'b', '\0', 'c'};
    
            // O tipo do argumento é convertível para o tipo de valor do resultado:
            auto str_to = std::ranges::to<std::string>(list);
            // Equivalente a
            std::string str(std::from_range, list);
    
            // O tipo do resultado não é um input range:
            auto pair_to = std::ranges::to<std::pair<std::from_range_t, bool>>(true);
            // Equivalente a
            std::pair<std::from_range_t, bool> pair(std::from_range, true);
        }
    
        // 1.a.3) Construtor de par iterador
        {
            auto list = {'a', 'b', '\0', 'c'};
    
            // O tipo do argumento é convertível para o tipo de valor do resultado:
            auto devector_to = std::ranges::to<boost::container::devector<char>>(list);
            // Equivalente a
            boost::container::devector<char> devector(std::ranges::begin(list), 
                                                      std::ranges::end(list));
    
            // O tipo do resultado não é um input range:
            std::regex re;
            auto it_to = std::ranges::to<std::cregex_iterator>(list, re);
            // Equivalente a
            std::cregex_iterator it(std::ranges::begin(list), std::ranges::end(list), re);
        }
    }
```

Saída:
```
    [2, 4, 6, 8]
    [2, 4, 6]
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3984](<https://cplusplus.github.io/LWG/issue3984>) | C++23 | o ramo de construção aninhada de `ranges::to` resultava em programa malformado se `R&` não modelasse [`viewable_range`](<#/doc/ranges/viewable_range>) | tornou-se bem-formado
[LWG 4016](<https://cplusplus.github.io/LWG/issue4016>) | C++23 | o ramo de inserção de container de `ranges::to` envolvia o uso de iteradores de inserção | substituído por anexação direta de elementos ao container

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 26.5.7 Conversões de Range [range.utility.conv]
