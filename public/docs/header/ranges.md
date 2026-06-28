# Cabeçalho da biblioteca padrão &lt;ranges&gt; (C++20)

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/ranges>).

### Aliases de namespace

```cpp
namespace std {
namespace views = ranges::views;
}
```

O alias de namespace `std::views` é fornecido como um atalho para `std::ranges::views`.

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte ao [operador de comparação de três vias](<#/doc/language/operator_comparison>)
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | Modelo de classe [std::initializer_list](<#/doc/utility/initializer_list>)
[ &lt;iterator&gt;](<#/doc/header/iterator>) | [Iteradores de Range](<#/doc/iterator>)

### Conceitos

##### Conceitos de Range

Definido no namespace `std::ranges`
[ ranges::range](<#/doc/ranges/range>)(C++20) | especifica que um tipo é um range, ou seja, ele fornece um iterator `begin` e um sentinel `end`
(conceito)
[ ranges::borrowed_range](<#/doc/ranges/borrowed_range>)(C++20) | especifica que um tipo é um [`range`](<#/doc/ranges/range>) e que os iterators obtidos de uma expressão dele podem ser retornados com segurança sem perigo de dangling
(conceito)
[ ranges::sized_range](<#/doc/ranges/sized_range>)(C++20) | especifica que um range conhece seu tamanho em tempo constante
(conceito)
[ ranges::view](<#/doc/ranges/view>)(C++20) | especifica que um range é um view, ou seja, ele possui cópia/movimentação/atribuição em tempo constante
(conceito)
[ ranges::input_range](<#/doc/ranges/input_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`input_iterator`](<#/doc/iterator/input_iterator>)
(conceito)
[ ranges::output_range](<#/doc/ranges/output_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`output_iterator`](<#/doc/iterator/output_iterator>)
(conceito)
[ ranges::forward_range](<#/doc/ranges/forward_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`forward_iterator`](<#/doc/iterator/forward_iterator>)
(conceito)
[ ranges::bidirectional_range](<#/doc/ranges/bidirectional_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>)
(conceito)
[ ranges::random_access_range](<#/doc/ranges/random_access_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`random_access_iterator`](<#/doc/iterator/random_access_iterator>)
(conceito)
[ ranges::contiguous_range](<#/doc/ranges/contiguous_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>)
(conceito)
[ ranges::common_range](<#/doc/ranges/common_range>)(C++20) | especifica que um range possui tipos de iterator e sentinel idênticos
(conceito)
[ ranges::viewable_range](<#/doc/ranges/viewable_range>)(C++20) | especifica os requisitos para que um [`range`](<#/doc/ranges/range>) seja seguramente conversível para um [`view`](<#/doc/ranges/view>)
(conceito)
[ ranges::constant_range](<#/doc/ranges/constant_range>)(C++23) | especifica que um range possui elementos somente leitura
(conceito)

### Funções

##### Conversões de Range

Definido no namespace `std::ranges`
[ ranges::to](<#/doc/ranges/to>)(C++23) | constrói um novo objeto não-view a partir de um input range
(modelo de função)

### Classes

##### Primitivos de Range

Definido no namespace `std::ranges`
[ ranges::iterator_tranges::const_iterator_tranges::sentinel_tranges::const_sentinel_t](<#/doc/ranges/iterator_t>)(C++20)(C++23)(C++20)(C++23) | obtém os tipos de iterator e sentinel de um range
(modelo de alias)
[ ranges::range_difference_tranges::range_size_tranges::range_value_t](<#/doc/ranges/range_size_t>)(C++20)(C++20)(C++20) | obtém os tipos de tamanho, diferença e valor de um range
(modelo de alias)
[ ranges::range_reference_tranges::range_const_reference_tranges::range_rvalue_reference_tranges::range_common_reference_t](<#/doc/ranges/range_reference_t>)(C++20)(C++23)(C++20)(C++20) | obtém os tipos de referência de um range
(modelo de alias)

##### Views

Definido no namespace `std::ranges`
[ ranges::view_interface](<#/doc/ranges/view_interface>)(C++20) | modelo de classe auxiliar para definir um [`view`](<#/doc/ranges/view>), usando o [padrão de modelo recursivo curioso](<#/doc/language/crtp>)
(modelo de classe)
[ ranges::subrange](<#/doc/ranges/subrange>)(C++20) | combina um par iterator-sentinel em um [`view`](<#/doc/ranges/view>)
(modelo de classe)

##### Tratamento de iterators dangling

Definido no namespace `std::ranges`
[ ranges::dangling](<#/doc/ranges/dangling>)(C++20) | um tipo de placeholder indicando que um iterator ou um `subrange` não deve ser retornado, pois estaria dangling
(classe)
[ ranges::borrowed_iterator_tranges::borrowed_subrange_t](<#/doc/ranges/borrowed_iterator_t>)(C++20) | obtém o tipo de iterator ou o tipo `subrange` de um [`borrowed_range`](<#/doc/ranges/borrowed_range>)
(modelo de alias)

##### Outras utilidades

Definido no namespace `std::ranges`
[ ranges::elements_of](<#/doc/ranges/elements_of>)(C++23) | marca um range para ser tratado como uma sequência em vez de um único valor
(modelo de classe)

##### Fábricas

Definido no namespace `std::ranges`
[ ranges::empty_viewviews::empty](<#/doc/ranges/empty_view>)(C++20) | um [`view`](<#/doc/ranges/view>) vazio sem elementos
(modelo de classe) (modelo de variável)
[ ranges::single_viewviews::single](<#/doc/ranges/single_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que contém um único elemento de um valor especificado
(modelo de classe) (objeto de ponto de customização)
[ ranges::iota_viewviews::iota](<#/doc/ranges/iota_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste em uma sequência gerada pelo incremento repetido de um valor inicial
(modelo de classe) (objeto de ponto de customização)
[ ranges::repeat_viewviews::repeat](<#/doc/ranges/repeat_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste em uma sequência gerada pela produção repetida do mesmo valor
(modelo de classe) (objeto de ponto de customização)
[ ranges::basic_istream_viewviews::istream](<#/doc/ranges/basic_istream_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste nos elementos obtidos pela aplicação sucessiva de `operator>>` no stream de entrada associado
(modelo de classe) (objeto de ponto de customização)

##### Adaptadores

Definido no namespace `std::ranges`
[ ranges::range_adaptor_closure](<#/doc/ranges/range_adaptor_closure>)(C++23) | modelo de classe base auxiliar para definir um objeto de fechamento de adaptador de range
(modelo de classe)
[ views::all_tviews::all](<#/doc/ranges/all_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que inclui todos os elementos de um [`range`](<#/doc/ranges/range>)
(modelo de alias) (objeto adaptador de range)
[ ranges::ref_view](<#/doc/ranges/ref_view>)(C++20) | um [`view`](<#/doc/ranges/view>) dos elementos de algum outro [`range`](<#/doc/ranges/range>)
(modelo de classe)
[ ranges::owning_view](<#/doc/ranges/owning_view>)(C++20) | um [`view`](<#/doc/ranges/view>) com propriedade única de algum [`range`](<#/doc/ranges/range>)
(modelo de classe)
[ ranges::as_rvalue_viewviews::as_rvalue](<#/doc/ranges/as_rvalue_view>)(C++23) | um [`view`](<#/doc/ranges/view>) de uma sequência que converte cada elemento para um rvalue
(modelo de classe) (objeto adaptador de range)
[ ranges::filter_viewviews::filter](<#/doc/ranges/filter_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste nos elementos de um [`range`](<#/doc/ranges/range>) que satisfaz um predicado
(modelo de classe) (objeto adaptador de range)
[ ranges::transform_viewviews::transform](<#/doc/ranges/transform_view>)(C++20) | um [`view`](<#/doc/ranges/view>) de uma sequência que aplica uma função de transformação a cada elemento
(modelo de classe) (objeto adaptador de range)
[ ranges::take_viewviews::take](<#/doc/ranges/take_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste nos primeiros N elementos de outro [`view`](<#/doc/ranges/view>)
(modelo de classe) (objeto adaptador de range)
[ ranges::take_while_viewviews::take_while](<#/doc/ranges/take_while_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste nos elementos iniciais de outro [`view`](<#/doc/ranges/view>), até o primeiro elemento para o qual um predicado retorna falso
(modelo de classe) (objeto adaptador de range)
[ ranges::drop_viewviews::drop](<#/doc/ranges/drop_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste em elementos de outro [`view`](<#/doc/ranges/view>), pulando os primeiros N elementos
(modelo de classe) (objeto adaptador de range)
[ ranges::drop_while_viewviews::drop_while](<#/doc/ranges/drop_while_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste nos elementos de outro [`view`](<#/doc/ranges/view>), pulando a subsequência inicial de elementos até o primeiro elemento onde o predicado retorna falso
(modelo de classe) (objeto adaptador de range)
[ ranges::join_viewviews::join](<#/doc/ranges/join_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste na sequência obtida ao achatar um [`view`](<#/doc/ranges/view>) de [`range`s](<#/doc/ranges/range>)
(modelo de classe) (objeto adaptador de range)
[ ranges::join_with_viewviews::join_with](<#/doc/ranges/join_with_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste na sequência obtida ao achatar um view de ranges, com o delimitador entre os elementos
(modelo de classe) (objeto adaptador de range)
[ ranges::lazy_split_viewviews::lazy_split](<#/doc/ranges/lazy_split_view>)(C++20) | um [`view`](<#/doc/ranges/view>) sobre os subranges obtidos ao dividir outro [`view`](<#/doc/ranges/view>) usando um delimitador
(modelo de classe) (objeto adaptador de range)
[ ranges::split_viewviews::split](<#/doc/ranges/split_view>)(C++20) | um [`view`](<#/doc/ranges/view>) sobre os subranges obtidos ao dividir outro [`view`](<#/doc/ranges/view>) usando um delimitador
(modelo de classe) (objeto adaptador de range)
[ ranges::concat_viewviews::concat](<#/doc/ranges/concat_view>)(C++26) | um [`view`](<#/doc/ranges/view>) que consiste na concatenação dos views adaptados
(modelo de classe) (objeto de ponto de customização)
[ views::counted](<#/doc/ranges/counted_view>)(C++20) | cria um subrange a partir de um iterator e uma contagem
(objeto de ponto de customização)
[ ranges::common_viewviews::common](<#/doc/ranges/common_view>)(C++20) | converte um [`view`](<#/doc/ranges/view>) em um [`common_range`](<#/doc/ranges/common_range>)
(modelo de classe) (objeto adaptador de range)
[ ranges::reverse_viewviews::reverse](<#/doc/ranges/reverse_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que itera sobre os elementos de outro view bidirecional em ordem inversa
(modelo de classe) (objeto adaptador de range)
[ ranges::as_const_viewviews::as_const](<#/doc/ranges/as_const_view>)(C++23) | converte um [`view`](<#/doc/ranges/view>) em um [`constant_range`](<#/doc/ranges/constant_range>)
(modelo de classe) (objeto adaptador de range)
[ ranges::elements_viewviews::elements](<#/doc/ranges/elements_view>)(C++20) | recebe um [`view`](<#/doc/ranges/view>) que consiste em valores [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) e um número N, e produz um [`view`](<#/doc/ranges/view>) do N-ésimo elemento de cada tupla
(modelo de classe) (objeto adaptador de range)
[ ranges::keys_viewviews::keys](<#/doc/ranges/keys_view>)(C++20) | recebe um [`view`](<#/doc/ranges/view>) que consiste em valores tipo par e produz um [`view`](<#/doc/ranges/view>) dos primeiros elementos de cada par
(modelo de classe) (objeto adaptador de range)
[ ranges::values_viewviews::values](<#/doc/ranges/values_view>)(C++20) | recebe um [`view`](<#/doc/ranges/view>) que consiste em valores tipo par e produz um [`view`](<#/doc/ranges/view>) dos segundos elementos de cada par
(modelo de classe) (objeto adaptador de range)
[ ranges::enumerate_viewviews::enumerate](<#/doc/ranges/enumerate_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que mapeia cada elemento da sequência adaptada para uma tupla contendo a posição do elemento e seu valor
(modelo de classe) (objeto adaptador de range)
[ ranges::zip_viewviews::zip](<#/doc/ranges/zip_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste em tuplas de referências aos elementos correspondentes dos views adaptados
(modelo de classe) (objeto de ponto de customização)
[ ranges::zip_transform_viewviews::zip_transform](<#/doc/ranges/zip_transform_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste nos resultados da aplicação de uma função de transformação aos elementos correspondentes dos views adaptados
(modelo de classe) (objeto de ponto de customização)
[ ranges::adjacent_viewviews::adjacent](<#/doc/ranges/adjacent_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste em tuplas de referências a elementos adjacentes do view adaptado
(modelo de classe) (objeto adaptador de range)
[ ranges::adjacent_transform_viewviews::adjacent_transform](<#/doc/ranges/adjacent_transform_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste nos resultados da aplicação de uma função de transformação a elementos adjacentes do view adaptado
(modelo de classe) (objeto adaptador de range)
[ ranges::chunk_viewviews::chunk](<#/doc/ranges/chunk_view>)(C++23) | um range de [`view`s](<#/doc/ranges/view>) que são blocos sucessivos não sobrepostos de tamanho `N` dos elementos de outro [`view`](<#/doc/ranges/view>)
(modelo de classe) (objeto adaptador de range)
[ ranges::slide_viewviews::slide](<#/doc/ranges/slide_view>)(C++23) | um [`view`](<#/doc/ranges/view>) cujo M-ésimo elemento é um [`view`](<#/doc/ranges/view>) sobre os elementos do M-ésimo ao (M + N - 1)-ésimo de outro [`view`](<#/doc/ranges/view>)
(modelo de classe) (objeto adaptador de range)
[ ranges::chunk_by_viewviews::chunk_by](<#/doc/ranges/chunk_by_view>)(C++23) | divide o [`view`](<#/doc/ranges/view>) em subranges entre cada par de elementos adjacentes para os quais o predicado fornecido retorna falso
(modelo de classe) (objeto adaptador de range)
[ ranges::stride_viewviews::stride](<#/doc/ranges/stride_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste em elementos de outro [`view`](<#/doc/ranges/view>), avançando N elementos por vez
(modelo de classe) (objeto adaptador de range)
[ ranges::cartesian_product_viewviews::cartesian_product](<#/doc/ranges/cartesian_product_view>)(C++23) | um [`view`](<#/doc/ranges/view>) que consiste em tuplas de resultados calculados pelo produto cartesiano n-ário dos views adaptados
(modelo de classe) (objeto de ponto de customização)

### Objetos de ponto de customização

##### Acesso a Range

Definido no namespace `std::ranges`
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de customização)
[ ranges::cbegin](<#/doc/ranges/cbegin>)(C++20) | retorna um iterator para o início de um range somente leitura
(objeto de ponto de customização)
[ ranges::cend](<#/doc/ranges/cend>)(C++20) | retorna um sentinel indicando o fim de um range somente leitura
(objeto de ponto de customização)
[ ranges::rbegin](<#/doc/ranges/rbegin>)(C++20) | retorna um reverse iterator para um range
(objeto de ponto de customização)
[ ranges::rend](<#/doc/ranges/rend>)(C++20) | retorna um reverse end iterator para um range
(objeto de ponto de customização)
[ ranges::crbegin](<#/doc/ranges/crbegin>)(C++20) | retorna um reverse iterator para um range somente leitura
(objeto de ponto de customização)
[ ranges::crend](<#/doc/ranges/crend>)(C++20) | retorna um reverse end iterator para um range somente leitura
(objeto de ponto de customização)
[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro com sinal igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::empty](<#/doc/ranges/empty>)(C++20) | verifica se um range está vazio
(objeto de ponto de customização)
[ ranges::data](<#/doc/ranges/data>)(C++20) | obtém um ponteiro para o início de um range contíguo
(objeto de ponto de customização)
[ ranges::cdata](<#/doc/ranges/cdata>)(C++20) | obtém um ponteiro para o início de um range contíguo somente leitura
(objeto de ponto de customização)

### Enumerações

Definido no namespace `std::ranges`
[ ranges::subrange_kind](<#/doc/ranges/subrange_kind>)(C++20) | especifica se um [std::ranges::subrange](<#/doc/ranges/subrange>) modela [std::ranges::sized_range](<#/doc/ranges/sized_range>)
(enum)

### Auxiliares

[ std::tuple_size<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_size>)(C++20) | obtém o tamanho de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de modelo de classe)
[ std::tuple_element<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_element>)(C++20) | obtém o tipo do iterator ou do sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de modelo de classe)
[ get(std::ranges::subrange)](<#/doc/ranges/subrange/get>)(C++20) | obtém iterator ou sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(modelo de função)
[ from_range_tfrom_range](<#/doc/ranges/from_range>)(C++23) | tag de construção from-range
(tag)

### Sinopse
```cpp
    #include <compare>
    #include <initializer_list>
    #include <iterator>
    
    namespace std::ranges {
      inline namespace /* unspecified */ {
        // acesso a range
        inline constexpr /* unspecified */ begin   = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ end     = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ cbegin  = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ cend    = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ rbegin  = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ rend    = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ crbegin = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ crend   = /* unspecified */; // autônomo
    
        inline constexpr /* unspecified */ size    = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ ssize   = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ empty   = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ data    = /* unspecified */; // autônomo
        inline constexpr /* unspecified */ cdata   = /* unspecified */; // autônomo
      }
    
      // ranges
      template<class T>
      concept range = /* ver descrição */; // autônomo
    
      template<class T>
      constexpr bool enable_borrowed_range = false; // autônomo
    
      template<class T>
      concept borrowed_range = /* ver descrição */; // autônomo
    
      template<class T>
      using iterator_t = decltype(ranges::begin(declval<T&>())); // autônomo
      template<range R>
      using sentinel_t = decltype(ranges::end(declval<R&>())); // autônomo
      template<range R>
      using const_iterator_t = decltype(ranges::cbegin(declval<R&>())); // autônomo
      template<range R>
      using const_sentinel_t = decltype(ranges::cend(declval<R&>())); // autônomo
      template<range R>
      using range_difference_t = iter_difference_t<iterator_t<R>>; // autônomo
      template<sized_range R>
      using range_size_t = decltype(ranges::size(declval<R&>())); // autônomo
      template<range R>
      using range_value_t = iter_value_t<iterator_t<R>>; // autônomo
      template<range R>
      using range_reference_t = iter_reference_t<iterator_t<R>>; // autônomo
      template<range R>
      using range_const_reference_t = iter_const_reference_t<iterator_t<R>>; // autônomo
      template<range R>
      using range_rvalue_reference_t = iter_rvalue_reference_t<iterator_t<R>>; // autônomo
      template<range R>
      using range_common_reference_t = iter_common_reference_t<iterator_t<R>>; // autônomo
    
      // sized ranges
      template<class>
      constexpr bool disable_sized_range = false; // autônomo
    
      template<class T>
      concept sized_range = /* ver descrição */; // autônomo
    
      // views
      template<class T>
      constexpr bool enable_view = /* ver descrição */; // autônomo
    
      struct view_base
      {}; // autônomo
    
      template<class T>
      concept view = /* ver descrição */; // autônomo
    
      // other range refinements
      template<class R, class T>
      concept output_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept input_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept forward_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept bidirectional_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept random_access_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept contiguous_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept common_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept viewable_range = /* ver descrição */; // autônomo
    
      template<class T>
      concept constant_range = /* ver descrição */; // autônomo
    
      // class template view_interface
      template<class D>
        requires is_class_v<D> && same_as<D, remove_cv_t<D>>
      class view_interface; // autônomo
    
      // sub-ranges
      enum class subrange_kind : bool
      {
        unsized,
        sized
      }; // autônomo
    
      template<input_or_output_iterator I, sentinel_for<I> S = I, subrange_kind K =
                 /* ver descrição */>
        requires(K == subrange_kind::sized || !sized_sentinel_for<S, I>)
      class subrange; // autônomo
    
      template<class I, class S, subrange_kind K>
      constexpr bool enable_borrowed_range<subrange<I, S, K>> = true; // autônomo
    
      template<size_t N, class I, class S, subrange_kind K>
        requires((N == 0 && copyable<I>) || N == 1)
      constexpr auto get(const subrange<I, S, K>& r); // autônomo
    
      template<size_t N, class I, class S, subrange_kind K>
        requires(N < 2)
      constexpr auto get(subrange<I, S, K>&& r); // autônomo
    }
    
    namespace std {
      using ranges::get; // autônomo
    }
    
    namespace std::ranges {
      // tratamento de iterators dangling
      struct dangling; // autônomo
    
      // class template elements_of
      template<range R, class Allocator = allocator<byte>>
      struct elements_of;
    
      template<range R>
      using borrowed_iterator_t = /* ver descrição */; // autônomo
    
      template<range R>
      using borrowed_subrange_t = /* ver descrição */; // autônomo
    
      // conversões de range
      template<class C, input_range R, class... Args>
        requires(!view<C>)
      constexpr C to(R&& r, Args&&... args); // autônomo
      template<template<class...> class C, input_range R, class... Args>
      constexpr auto to(R&& r, Args&&... args); // autônomo
      template<class C, class... Args>
        requires(!view<C>)
      constexpr auto to(Args&&... args); // autônomo
      template<template<class...> class C, class... Args>
      constexpr auto to(Args&&... args); // autônomo
    
      // empty view
      template<class T>
        requires is_object_v<T>
      class empty_view; // autônomo
    
      template<class T>
      constexpr bool enable_borrowed_range<empty_view<T>> = true; // autônomo
    
      namespace views {
        template<class T>
        constexpr empty_view<T> empty{}; // autônomo
      }
    
      // single view
      template<move_constructible T>
        requires is_object_v<T>
      class single_view; // autônomo
    
      namespace views {
        inline constexpr /* unspecified */ single = /* unspecified */;
      } // autônomo
    
      template<bool Const, class T>
      using /*maybe-const*/ = conditional_t<Const, const T, T>; // apenas para exposição
    
      // iota view
      template<weakly_incrementable W, semiregular Bound = unreachable_sentinel_t>
        requires /*weakly-equality-comparable-with*/<W, Bound> && copyable<W>
      class iota_view; // autônomo
    
      template<class W, class Bound>
      constexpr bool enable_borrowed_range<iota_view<W, Bound>> = true; // autônomo
    
      namespace views {
        inline constexpr /* unspecified */ iota = /* unspecified */;
      } // autônomo
    
      // repeat view
      template<move_constructible T, semiregular Bound = unreachable_sentinel_t>
        requires         /* ver descrição */
      class repeat_view; // autônomo
    
      namespace views {
        inline constexpr /* unspecified */ repeat = /* unspecified */;
      } // autônomo
    
      // istream view
      template<movable Val, class CharT, class Traits = char_traits<CharT>>
        requires /* ver descrição */
      class basic_istream_view;
      template<class Val>
      using istream_view = basic_istream_view<Val, char>;
      template<class Val>
      using wistream_view = basic_istream_view<Val, wchar_t>;
    
      namespace views {
        template<class T>
        constexpr /* unspecified */ istream = /* unspecified */;
      }
    
      // range adaptor objects
      template<class D>
        requires is_class_v<D> && same_as<D, remove_cv_t<D>>
      class range_adaptor_closure
      {}; // autônomo
    
      // all view
      namespace views {
        inline constexpr /* unspecified */ all = /* unspecified */; // autônomo
    
        template<viewable_range R>
        using all_t = decltype(all(declval<R>())); // autônomo
      }
    
      // ref view
      template<range R>
        requires is_object_v<R>
      class ref_view; // autônomo
    
      template<class T>
      constexpr bool enable_borrowed_range<ref_view<T>> = true; // autônomo
    
      // owning view
      template<range R>
        requires         /* ver descrição */
      class owning_view; // autônomo
    
      template<class T>
      constexpr bool enable_borrowed_range<owning_view<T>> = // autônomo
        enable_borrowed_range<T>;
    
      // as rvalue view
      template<view V>
        requires input_range<V>
      class as_rvalue_view; // autônomo
    
      template<class T>
      constexpr bool enable_borrowed_range<as_rvalue_view<T>> = // autônomo
        enable_borrowed_range<T>;
    
      namespace views {
        inline constexpr /* unspecified */ as_rvalue = /* unspecified */;
      } // autônomo
    
      // filter view
      template<input_range V, indirect_unary_predicate<iterator_t<V>> Pred>
        requires view<V> && is_object_v<Pred>
      class filter_view; // autônomo
    
      namespace views {
        inline constexpr /* unspecified */ filter = /* unspecified */;
      } // autônomo
    
      // transform view
      template<input_range V, move_constructible F>
        requires view<V> && is_object_v<F> && regular_invocable<F&, range_reference_t<V>> &&
                 /*can-reference*/<invoke_result_t<F&, range_reference_t<V>>>
      class transform_view; // autônomo
    
      namespace views {
        inline constexpr /* unspecified */ transform = /* unspecified */;
      } // autônomo
    
      // take view
      template<view>
      class take_view; // autônomo
    
      template<class T>
      constexpr bool enable_borrowed_range<take_view<T>> = // autônomo
        enable_borrowed_range<T>;
    
      namespace views {
        inline constexpr /* unspecified */ take = /* unspecified */;
      } // autônomo
    
      // take while view
      template<view V, class Pred>
        requires input_range<V> && is_object_v<Pred> &&
                 indirect_unary_predicate<const Pred, iterator_t<V>>
```
```cpp
      class take_while_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ take_while = /* unspecified */;
      } // freestanding
     
      // drop view
      template<view V>
      class drop_view; // freestanding
     
      template<class T>
      constexpr bool enable_borrowed_range<drop_view<T>> = // freestanding
        enable_borrowed_range<T>;
     
      namespace views {
        inline constexpr /* unspecified */ drop = /* unspecified */;
      } // freestanding
     
      // drop while view
      template<view V, class Pred>
        requires input_range<V> && is_object_v<Pred> &&
                 indirect_unary_predicate<const Pred, iterator_t<V>>
      class drop_while_view; // freestanding
     
      template<class T, class Pred>
      constexpr bool enable_borrowed_range<drop_while_view<T, Pred>> = // freestanding
        enable_borrowed_range<T>;
     
      namespace views {
        inline constexpr /* unspecified */ drop_while = /* unspecified */;
      } // freestanding
     
      // join view
      template<input_range V>
        requires view<V> && input_range<range_reference_t<V>>
      class join_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ join = /* unspecified */;
      } // freestanding
     
      // join with view
      template<input_range V, forward_range Pattern>
        requires /* see description */
      class join_with_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ join_with = /* unspecified */;
      } // freestanding
     
      // lazy split view
      template<class R>
      concept /*tiny-range*/ = /* see description */; // exposition-only
     
      template<input_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>,
                                       iterator_t<Pattern>,
                                       ranges::equal_to> &&
                 (forward_range<V> || /*tiny-range*/<Pattern>)
      class lazy_split_view; // freestanding
     
      // split view
      template<forward_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>, iterator_t<Pattern>, ranges::equal_to>
      class split_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ lazy_split = /* unspecified */; // freestanding
        inline constexpr /* unspecified */ split      = /* unspecified */; // freestanding
      }
     
      // concat view
      template<input_range... Views>
        requires /* see description */
      class concat_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ concat = /* unspecified */;
      } // freestanding
     
      // counted view
      namespace views {
        inline constexpr /* unspecified */ counted = /* unspecified */;
      } // freestanding
     
      // common view
      template<view V>
        requires(!common_range<V> && copyable<iterator_t<V>>)
      class common_view; // freestanding
     
      template<class T>
      constexpr bool enable_borrowed_range<common_view<T>> = // freestanding
        enable_borrowed_range<T>;
     
      namespace views {
        inline constexpr /* unspecified */ common = /* unspecified */;
      } // freestanding
     
      // reverse view
      template<view V>
        requires bidirectional_range<V>
      class reverse_view; // freestanding
     
      template<class T>
      constexpr bool enable_borrowed_range<reverse_view<T>> = // freestanding
        enable_borrowed_range<T>;
     
      namespace views {
        inline constexpr /* unspecified */ reverse = /* unspecified */;
      } // freestanding
     
      // as const view
      template<input_range R>
      constexpr auto& /*possibly-const-range*/(R& r) noexcept
      { // exposition-only
        if constexpr (constant_range<const R> && !constant_range<R>) {
          return const_cast<const R&>(r);
        } else {
          return r;
        }
      }
     
      template<view V>
        requires input_range<V>
      class as_const_view; // freestanding
     
      template<class T>
      constexpr bool enable_borrowed_range<as_const_view<T>> = // freestanding
        enable_borrowed_range<T>;
     
      namespace views {
        inline constexpr /* unspecified */ as_const = /* unspecified */;
      } // freestanding
     
      // elements view
      template<input_range V, size_t N>
        requires           /* see description */
      class elements_view; // freestanding
     
      template<class T, size_t N>
      constexpr bool enable_borrowed_range<elements_view<T, N>> = // freestanding
        enable_borrowed_range<T>;
     
      template<class R>
      using keys_view = elements_view<R, 0>; // freestanding
      template<class R>
      using values_view = elements_view<R, 1>; // freestanding
     
      namespace views {
        template<size_t N>
        constexpr /* unspecified */ elements = /* unspecified */; // freestanding
        inline constexpr auto keys           = elements<0>;       // freestanding
        inline constexpr auto values         = elements<1>;       // freestanding
      }
     
      // enumerate view
      template<view V>
        requires            /* see description */
      class enumerate_view; // freestanding
     
      template<class View>
      constexpr bool enable_borrowed_range<enumerate_view<View>> = // freestanding
        enable_borrowed_range<View>;
     
      namespace views {
        inline constexpr /* unspecified */ enumerate = /* unspecified */;
      } // freestanding
     
      // zip view
      template<input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0)
      class zip_view; // freestanding
     
      template<class... Views>
      constexpr bool enable_borrowed_range<zip_view<Views...>> = // freestanding
        (enable_borrowed_range<Views> && ...);
     
      namespace views {
        inline constexpr /* unspecified */ zip = /* unspecified */;
      } // freestanding
     
      // zip transform view
      template<move_constructible F, input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0) && is_object_v<F> &&
                regular_invocable<F&, range_reference_t<Views>...> &&
                /*can-reference*/<invoke_result_t<F&, range_reference_t<Views>...>>
      class zip_transform_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ zip_transform = /* unspecified */;
      } // freestanding
     
      // adjacent view
      template<forward_range V, size_t N>
        requires view<V> && (N > 0)
      class adjacent_view; // freestanding
     
      template<class V, size_t N>
      constexpr bool enable_borrowed_range<adjacent_view<V, N>> = // freestanding
        enable_borrowed_range<V>;
     
      namespace views {
        template<size_t N>
        constexpr /* unspecified */ adjacent = /* unspecified */; // freestanding
        inline constexpr auto pairwise       = adjacent<2>;       // freestanding
      }
     
      // adjacent transform view
      template<forward_range V, move_constructible F, size_t N>
        requires                     /* see description */
      class adjacent_transform_view; // freestanding
     
      namespace views {
        template<size_t N>
        constexpr /* unspecified */ adjacent_transform = /* unspecified */; // freestanding
        inline constexpr auto pairwise_transform = adjacent_transform<2>;   // freestanding
      }
     
      // chunk view
      template<view V>
        requires input_range<V>
      class chunk_view; // freestanding
     
      template<view V>
        requires forward_range<V>
      class chunk_view<V>; // freestanding
     
      template<class V>
      constexpr bool enable_borrowed_range<chunk_view<V>> = // freestanding
        forward_range<V> && enable_borrowed_range<V>;
     
      namespace views {
        inline constexpr /* unspecified */ chunk = /* unspecified */;
      } // freestanding
     
      // slide view
      template<forward_range V>
        requires view<V>
      class slide_view; // freestanding
     
      template<class V>
      constexpr bool enable_borrowed_range<slide_view<V>> = // freestanding
        enable_borrowed_range<V>;
     
      namespace views {
        inline constexpr /* unspecified */ slide = /* unspecified */;
      } // freestanding
     
      // chunk by view
      template<forward_range V, indirect_binary_predicate<iterator_t<V>, iterator_t<V>> Pred>
        requires view<V> && is_object_v<Pred>
      class chunk_by_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ chunk_by = /* unspecified */;
      } // freestanding
     
      // stride view
      template<input_range V>
        requires view<V>
      class stride_view; // freestanding
     
      template<class V>
      constexpr bool enable_borrowed_range<stride_view<V>> = // freestanding
        enable_borrowed_range<V>;
     
      namespace views {
        inline constexpr /* unspecified */ stride = /* unspecified */;
      } // freestanding
     
      // cartesian product view
      template<input_range First, forward_range... Vs>
        requires(view<First> && ... && view<Vs>)
      class cartesian_product_view; // freestanding
     
      namespace views {
        inline constexpr /* unspecified */ cartesian_product = /* unspecified */;
      } // freestanding
    }
     
    namespace std {
      namespace views = ranges::views; // freestanding
     
      template<class T>
      struct tuple_size; // freestanding
      template<size_t I, class T>
      struct tuple_element; // freestanding
     
      template<class I, class S, ranges::subrange_kind K>
      struct tuple_size<ranges::subrange<I, S, K>> // freestanding
        : integral_constant<size_t, 2>
      {};
      template<class I, class S, ranges::subrange_kind K>
      struct tuple_element<0, ranges::subrange<I, S, K>>
      { // freestanding
        using type = I;
      };
      template<class I, class S, ranges::subrange_kind K>
      struct tuple_element<1, ranges::subrange<I, S, K>>
      { // freestanding
        using type = S;
      };
      template<class I, class S, ranges::subrange_kind K>
      struct tuple_element<0, const ranges::subrange<I, S, K>>
      { // freestanding
        using type = I;
      };
      template<class I, class S, ranges::subrange_kind K>
      struct tuple_element<1, const ranges::subrange<I, S, K>>
      { // freestanding
        using type = S;
      };
     
      struct from_range_t
      {
        explicit from_range_t() = default;
      };                                          // freestanding
      inline constexpr from_range_t from_range{}; // freestanding
    }
```

#### Concept [`range`](<#/doc/ranges/range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept range = requires(T& t) {
        ranges::begin(t); // sometimes equality-preserving (see description)
        ranges::end(t);
      };
    }
```

#### Concept [`borrowed_range`](<#/doc/ranges/borrowed_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept borrowed_range =
        range<T> && (is_lvalue_reference_v<T> || enable_borrowed_range<remove_cvref_t<T>>);
    }
```

#### Concept [`sized_range`](<#/doc/ranges/sized_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept sized_range = range<T> && requires(T& t) { ranges::size(t); };
    }
```

#### Concept [`view`](<#/doc/ranges/view>)
```cpp
    namespace std::ranges {
      template<class T>
      constexpr bool /*is-derived-from-view-interface*/ =
        /* see description */; // exposition-only
      template<class T>
      constexpr bool enable_view =
        derived_from<T, view_base> || /*is-derived-from-view-interface*/<T>;
     
      template<class T>
      concept view = range<T> && movable<T> && enable_view<T>;
    }
```

#### Concept [`output_range`](<#/doc/ranges/output_range>)
```cpp
    namespace std::ranges {
      template<class R, class T>
      concept output_range = range<R> && output_iterator<iterator_t<R>, T>;
    }
```

#### Concept [`input_range`](<#/doc/ranges/input_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept input_range = range<T> && input_iterator<iterator_t<T>>;
    }
```

#### Concept [`forward_range`](<#/doc/ranges/forward_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept forward_range = input_range<T> && forward_iterator<iterator_t<T>>;
    }
```

#### Concept [`bidirectional_range`](<#/doc/ranges/bidirectional_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept bidirectional_range = forward_range<T> && bidirectional_iterator<iterator_t<T>>;
    }
```

#### Concept [`random_access_range`](<#/doc/ranges/random_access_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept random_access_range =
        bidirectional_range<T> && random_access_iterator<iterator_t<T>>;
    }
```

#### Concept [`contiguous_range`](<#/doc/ranges/contiguous_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept contiguous_range =
        random_access_range<T> && contiguous_iterator<iterator_t<T>> && requires(T& t) {
          {
            ranges::data(t)
          } -> same_as<add_pointer_t<range_reference_t<T>>>;
        };
    }
```

#### Concept [`common_range`](<#/doc/ranges/common_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept common_range = range<T> && same_as<iterator_t<T>, sentinel_t<T>>;
    }
```

#### Concept [`viewable_range`](<#/doc/ranges/viewable_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept viewable_range =
        range<T> && ((view<remove_cvref_t<T>> && constructible_from<remove_cvref_t<T>, T>) ||
                     (!view<remove_cvref_t<T>> &&
                      (is_lvalue_reference_v<T> ||
                       (movable<remove_reference_t<T>> && !/*is-initializer-list*/<T>))));
    }
```

#### Concept [`constant_range`](<#/doc/ranges/constant_range>)
```cpp
    namespace std::ranges {
      template<class T>
      concept constant_range = input_range<T> && /*constant-iterator*/<iterator_t<T>>;
    }
```

#### Conceitos auxiliares

Nota: Os conceitos nesta seção são apenas para exposição e não fazem parte da interface.
```cpp
    namespace std::ranges { // unspecified, for name lookup only
      template<class R>
      concept /*simple-view*/ = // exposition-only
        view<R> && range<const R> && same_as<iterator_t<R>, iterator_t<const R>> &&
        same_as<sentinel_t<R>, sentinel_t<const R>>;
     
      template<class I>
      concept /*has-arrow*/ = // exposition-only
        input_iterator<I> && (is_pointer_v<I> || requires(I i) { i.operator->(); });
     
      template<class T, class U>
      concept /*different-from*/ = // exposition-only
        !same_as<remove_cvref_t<T>, remove_cvref_t<U>>;
     
      template<class R>
      concept /*range-with-movable-references*/ = // exposition-only
        input_range<R> && move_constructible<range_reference_t<R>> &&
        move_constructible<range_rvalue_reference_t<R>>;
    }
```

#### Modelo de classe std::ranges::view_interface
```cpp
    namespace std::ranges {
      template<class D>
        requires is_class_v<D> && same_as<D, remove_cv_t<D>>
      class view_interface
      {
      private:
        constexpr D& /*derived*/() noexcept
        { // exposition-only
          return static_cast<D&>(*this);
        }
        constexpr const D& /*derived*/() const noexcept
        { // exposition-only
          return static_cast<const D&>(*this);
        }
     
      public:
        constexpr bool empty()
          requires sized_range<D> || forward_range<D>
        {
          if constexpr (sized_range<D>)
            return ranges::size(/*derived*/()) == 0;
          else
            return ranges::begin(/*derived*/()) == ranges::end(/*derived*/());
        }
        constexpr bool empty() const
          requires sized_range<const D> || forward_range<const D>
        {
          if constexpr (sized_range<const D>)
            return ranges::size(/*derived*/()) == 0;
          else
            return ranges::begin(/*derived*/()) == ranges::end(/*derived*/());
        }
     
        constexpr auto cbegin()
          requires input_range<D>
        {
          return ranges::cbegin(/*derived*/());
        }
        constexpr auto cbegin() const
          requires input_range<const D>
        {
          return ranges::cbegin(/*derived*/());
        }
        constexpr auto cend()
          requires input_range<D>
        {
          return ranges::cend(/*derived*/());
        }
        constexpr auto cend() const
          requires input_range<const D>
        {
          return ranges::cend(/*derived*/());
        }
     
        constexpr explicit operator bool()
          requires requires { ranges::empty(/*derived*/()); }
        {
          return !ranges::empty(/*derived*/());
        }
        constexpr explicit operator bool() const
          requires requires { ranges::empty(/*derived*/()); }
        {
          return !ranges::empty(/*derived*/());
        }
     
        constexpr auto data()
          requires contiguous_iterator<iterator_t<D>>
        {
          return to_address(ranges::begin(/*derived*/()));
        }
        constexpr auto data() const
          requires range<const D> && contiguous_iterator<iterator_t<const D>>
        {
          return to_address(ranges::begin(/*derived*/()));
        }
     
        constexpr auto size()
          requires forward_range<D> && sized_sentinel_for<sentinel_t<D>, iterator_t<D>>
        {
          return /*to-unsigned-like*/(ranges::end(/*derived*/()) -
                                      ranges::begin(/*derived*/()));
        }
        constexpr auto size() const
          requires forward_range<const D> &&
                   sized_sentinel_for<sentinel_t<const D>, iterator_t<const D>>
        {
          return /*to-unsigned-like*/(ranges::end(/*derived*/()) -
                                      ranges::begin(/*derived*/()));
        }
     
        constexpr decltype(auto) front()
          requires forward_range<D>;
        constexpr decltype(auto) front() const
          requires forward_range<const D>;
     
        constexpr decltype(auto) back()
          requires bidirectional_range<D> && common_range<D>;
        constexpr decltype(auto) back() const
          requires bidirectional_range<const D> && common_range<const D>;
     
        template<random_access_range R = D>
        constexpr decltype(auto) operator
        {
          return ranges::begin(/*derived*/())[n];
        }
        template<random_access_range R = const D>
        constexpr decltype(auto) operator const
        {
          return ranges::begin(/*derived*/())[n];
        }
      };
    }
```

#### Modelo de classe [std::ranges::subrange](<#/doc/ranges/subrange>)
```cpp
    namespace std::ranges {
      template<class From, class To>
      concept /*uses-nonqualification-pointer-conversion*/ = // exposition-only
        is_pointer_v<From> && is_pointer_v<To> &&
        !convertible_to<remove_pointer_t<From> (*)[], remove_pointer_t<To> (*)[]>;
     
      template<class From, class To>
      concept /*convertible-to-non-slicing*/ = // exposition-only
        convertible_to<From, To> &&
        !/*uses-nonqualification-pointer-conversion*/<decay_t<From>, decay_t<To>>;
     
      template<class T, class U, class V>
      concept /*pair-like-convertible-from*/ = // exposition-only
        !range<T> && !is_reference_v<T> && /*pair-like*/<T> && constructible_from<T, U, V> &&
        /*convertible-to-non-slicing*/<U, tuple_element_t<0, T>> &&
        convertible_to<V, tuple_element_t<1, T>>;
     
      template<input_or_output_iterator I,
               sentinel_for<I> S = I,
               subrange_kind K =
                 sized_sentinel_for<S, I> ? subrange_kind::sized : subrange_kind::unsized>
        requires(K == subrange_kind::sized || !sized_sentinel_for<S, I>)
      class subrange : public view_interface<subrange<I, S, K>>
      {
      private:
        static constexpr bool /*StoreSize*/ = // exposition-only
          K == subrange_kind::sized && !sized_sentinel_for<S, I>;
        I /*begin_*/ = I(); // exposition-only
        S /*end_*/   = S(); // exposition-only
        /*make-unsigned-like-t*/<iter_difference_t<I>> /*size_*/ =
          0; // exposition-only present only
             // if StoreSize is true
      public:
        subrange()
          requires default_initializable<I>
        = default;
     
        constexpr subrange(/*convertible-to-non-slicing*/<I> auto i, S s)
          requires(!/*StoreSize*/);
     
        constexpr subrange(/*convertible-to-non-slicing*/<I> auto i,
                           S s,
                           /*make-unsigned-like-t*/<iter_difference_t<I>> n)
          requires(K == subrange_kind::sized);
     
        template</*different-from*/<subrange> R>
          requires borrowed_range<R> && /*convertible-to-non-slicing*/<iterator_t<R>, I> &&
                   convertible_to<sentinel_t<R>, S>
                   constexpr subrange(R&& r)
                     requires(!/*StoreSize*/ || sized_range<R>);
     
        template<borrowed_range R>
          requires /*convertible-to-non-slicing*/<iterator_t<R>, I> &&
                   convertible_to<sentinel_t<R>, S>
                   constexpr subrange(R&& r, /*make-unsigned-like-t*/<iter_difference_t<I>> n)
                     requires(K == subrange_kind::sized)
          : subrange{ ranges::begin(r), ranges::end(r), n }
        {
        }
     
        template</*different-from*/<subrange> PairLike>
          requires /*pair-like-convertible-from*/<PairLike, const I&, const S&>
        constexpr operator PairLike() const;
     
        constexpr I begin() const
          requires copyable<I>;
        constexpr I begin()
          requires(!copyable<I>);
        constexpr S end() const;
     
        constexpr bool empty() const;
        constexpr /*make-unsigned-like-t*/<iter_difference_t<I>> size() const
          requires(K == subrange_kind::sized);
     
        constexpr subrange next(iter_difference_t<I> n = 1) const&
          requires forward_iterator<I>;
        constexpr subrange next(iter_difference_t<I> n = 1) &&;
        constexpr subrange prev(iter_difference_t<I> n = 1) const
          requires bidirectional_iterator<I>;
        constexpr subrange& advance(iter_difference_t<I> n);
      };
     
      template<input_or_output_iterator I, sentinel_for<I> S>
      subrange(I, S) -> subrange<I, S>;
     
      template<input_or_output_iterator I, sentinel_for<I> S>
      subrange(I, S, /*make-unsigned-like-t*/<iter_difference_t<I>>)
        -> subrange<I, S, subrange_kind::sized>;
     
      template<borrowed_range R>
      subrange(R&&)
        -> subrange<iterator_t<R>,
                    sentinel_t<R>,
                    (sized_range<R> || sized_sentinel_for<sentinel_t<R>, iterator_t<R>>)
                      ? subrange_kind::sized
                      : subrange_kind::unsized>;
     
      template<borrowed_range R>
      subrange(R&&, /*make-unsigned-like-t*/<range_difference_t<R>>)
        -> subrange<iterator_t<R>, sentinel_t<R>, subrange_kind::sized>;
    }
```

#### Classe [std::ranges::dangling](<#/doc/ranges/dangling>)
```cpp
    namespace std::ranges {
      struct dangling
      {
        constexpr dangling() noexcept = default;
        constexpr dangling(auto&&...) noexcept {}
      };
    }
```

#### Classe std::ranges::elements_of
```cpp
    namespace std::ranges {
      template<range R, class Allocator = allocator<byte>>
      struct elements_of
      {
        [[no_unique_address]] R range;
        [[no_unique_address]] Allocator allocator = Allocator();
      };
     
      template<class R, class Allocator = allocator<byte>>
      elements_of(R&&, Allocator = Allocator()) -> elements_of<R&&, Allocator>;
    }
```

#### Modelo de classe [std::ranges::empty_view](<#/doc/ranges/empty_view>)
```cpp
    namespace std::ranges {
      template<class T>
        requires is_object_v<T>
      class empty_view : public view_interface<empty_view<T>>
      {
      public:
        static constexpr T* begin() noexcept { return nullptr; }
        static constexpr T* end() noexcept { return nullptr; }
        static constexpr T* data() noexcept { return nullptr; }
        static constexpr size_t size() noexcept { return 0; }
        static constexpr bool empty() noexcept { return true; }
      };
    }
```

#### Modelo de classe std::ranges::single_view
```cpp
    namespace std::ranges {
      template<move_constructible T>
        requires is_object_v<T>
      class single_view : public view_interface<single_view<T>>
      {
      private:
        /*movable-box*/<T> /*value_*/; // exposition-only
     
      public:
        single_view()
          requires default_initializable<T>
        = default;
        constexpr explicit single_view(const T& t)
          requires copy_constructible<T>;
        constexpr explicit single_view(T&& t);
        template<class... Args>
          requires constructible_from<T, Args...>
        constexpr explicit single_view(in_place_t, Args&&... args);
     
        constexpr T* begin() noexcept;
        constexpr const T* begin() const noexcept;
        constexpr T* end() noexcept;
        constexpr const T* end() const noexcept;
        static constexpr bool empty() noexcept;
        static constexpr size_t size() noexcept;
        constexpr T* data() noexcept;
        constexpr const T* data() const noexcept;
      };
     
      template<class T>
      single_view(T) -> single_view<T>;
    }
```

#### Modelo de classe [std::ranges::iota_view](<#/doc/ranges/iota_view>)
```cpp
    namespace std::ranges {
      template<class I>
      concept /*decrementable*/ = /* see description */; // exposition-only
     
      template<class I>
      concept /*advanceable*/ = /* see description */; // exposition-only
     
      template<weakly_incrementable W, semiregular Bound = unreachable_sentinel_t>
        requires /*weakly-equality-comparable-with*/<W, Bound> && copyable<W>
      class iota_view : public view_interface<iota_view<W, Bound>>
      {
      private:
        // class iota_view::iterator
        struct /*iterator*/; // exposition-only
     
        // class iota_view::sentinel
        struct /*sentinel*/; // exposition-only
     
        W /*value_*/     = W();     // exposition-only
        Bound /*bound_*/ = Bound(); // exposition-only
     
      public:
        iota_view()
          requires default_initializable<W>
        = default;
        constexpr explicit iota_view(W value);
        constexpr explicit iota_view(type_identity_t<W> value, type_identity_t<Bound> bound);
        constexpr explicit iota_view(/*iterator*/ first, /* see description */ last);
     
        constexpr /*iterator*/ begin() const;
        constexpr auto end() const;
        constexpr /*iterator*/ end() const
          requires same_as<W, Bound>;
     
        constexpr bool empty() const;
        constexpr auto size() const
          requires /* see description */;
      };
     
      template<class W, class Bound>
        requires(!/*is-integer-like*/<W> || !/*is-integer-like*/<Bound> ||
                 (/*is-signed-integer-like*/<W> == /*is-signed-integer-like*/<Bound>))
      iota_view(W, Bound) -> iota_view<W, Bound>;
    }
```

#### Modelo de classe std::ranges::iota_view::iterator
```cpp
    namespace std::ranges {
      template<weakly_incrementable W, semiregular Bound>
        requires /*weakly-equality-comparable-with*/<W, Bound> && copyable<W>
      struct iota_view<W, Bound>::/*iterator*/
      {
      private:
        W /*value_*/ = W(); // exposition-only
     
      public:
        using iterator_concept = /* see description */;
        using iterator_category =
          input_iterator_tag; // present only if W models incrementable and
                              // IOTA-DIFF-T(W) is an integral type
        using value_type      = W;
        using difference_type = /*IOTA-DIFF-T*/(W);
     
        /*iterator*/()
          requires default_initializable<W>
        = default;
        constexpr explicit /*iterator*/(W value);
     
        constexpr W operator*() const noexcept(is_nothrow_copy_constructible_v<W>);
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires incrementable<W>;
     
        constexpr /*iterator*/& operator--()
          requires /*decrementable*/<W>;
        constexpr /*iterator*/ operator--(int)
          requires /*decrementable*/<W>;
     
        constexpr /*iterator*/& operator+=(difference_type n)
          requires /*advanceable*/<W>;
        constexpr /*iterator*/& operator-=(difference_type n)
          requires /*advanceable*/<W>;
        constexpr W operator const
          requires /*advanceable*/<W>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires equality_comparable<W>;
     
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires totally_ordered<W>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires totally_ordered<W>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires totally_ordered<W>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires totally_ordered<W>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires totally_ordered<W> && three_way_comparable<W>;
     
        friend constexpr /*iterator*/ operator+(/*iterator*/ i, difference_type n)
          requires /*advanceable*/<W>;
        friend constexpr /*iterator*/ operator+(difference_type n, /*iterator*/ i)
          requires /*advanceable*/<W>;
     
        friend constexpr /*iterator*/ operator-(/*iterator*/ i, difference_type n)
          requires /*advanceable*/<W>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
```
```cpp
                                                   const /*iterator*/& y)
          requires /*advanceable*/<W>;
      };
    }
```

#### Modelo de classe std::ranges::iota_view::sentinel
```
    namespace std::ranges {
      template<weakly_incrementable W, semiregular Bound>
        requires /*weakly-equality-comparable-with*/<W, Bound> && copyable<W>
      struct iota_view<W, Bound>::/*sentinel*/
      {
      private:
        Bound /*bound_*/ = Bound(); // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr explicit /*sentinel*/(Bound bound);
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*sentinel*/& y);
     
        friend constexpr iter_difference_t<W> operator-(const /*iterator*/& x,
                                                        const /*sentinel*/& y)
          requires sized_sentinel_for<Bound, W>;
        friend constexpr iter_difference_t<W> operator-(const /*sentinel*/& x,
                                                        const /*iterator*/& y)
          requires sized_sentinel_for<Bound, W>;
      };
    }
```

#### Modelo de classe std::ranges::repeat_view
```
    namespace std::ranges {
      template<class T>
      concept /*integer-like-with-usable-difference-type*/ = // apenas para exposição
        /*is-signed-integer-like*/<T> || (/*is-integer-like*/<T> && weakly_incrementable<T>);
     
      template<move_constructible T, semiregular Bound = unreachable_sentinel_t>
        requires(is_object_v<T> && same_as<T, remove_cv_t<T>> &&
                 (/*integer-like-with-usable-difference-type*/<Bound> ||
                  same_as<Bound, unreachable_sentinel_t>))
      class repeat_view : public view_interface<repeat_view<T, Bound>>
      {
      private:
        // classe repeat_view::iterator
        struct /*iterator*/; // apenas para exposição
     
        /*movable-box*/<T> /*value_*/; // apenas para exposição
        Bound /*bound_*/ = Bound();    // apenas para exposição
     
      public:
        repeat_view()
          requires default_initializable<T>
        = default;
     
        constexpr explicit repeat_view(const T& value, Bound bound = Bound())
          requires copy_constructible<T>;
        constexpr explicit repeat_view(T&& value, Bound bound = Bound());
        template<class... TArgs, class... BoundArgs>
          requires constructible_from<T, TArgs...> && constructible_from<Bound, BoundArgs...>
        constexpr explicit repeat_view(piecewise_construct_t,
                                       tuple<TArgs...> value_args,
                                       tuple<BoundArgs...> bound_args = tuple<>{});
     
        constexpr /*iterator*/ begin() const;
        constexpr /*iterator*/ end() const
          requires(!same_as<Bound, unreachable_sentinel_t>);
        constexpr unreachable_sentinel_t end() const noexcept;
     
        constexpr auto size() const
          requires(!same_as<Bound, unreachable_sentinel_t>);
      };
     
      template<class T, class Bound = unreachable_sentinel_t>
      repeat_view(T, Bound = Bound()) -> repeat_view<T, Bound>;
    }
```

#### Modelo de classe std::ranges::repeat_view::iterator
```
    namespace std::ranges {
      template<move_constructible T, semiregular Bound>
        requires(is_object_v<T> && same_as<T, remove_cv_t<T>> &&
                 (/*integer-like-with-usable-difference-type*/<Bound> ||
                  same_as<Bound, unreachable_sentinel_t>))
      class repeat_view<T, Bound>::/*iterator*/
      {
      private:
        using /*index-type*/ = // apenas para exposição
          conditional_t<same_as<Bound, unreachable_sentinel_t>, ptrdiff_t, Bound>;
        const T* /*value_*/         = nullptr;          // apenas para exposição
        /*index-type*/ /*current_*/ = /*index-type*/(); // apenas para exposição
     
        constexpr explicit /*iterator*/(
          const T* value,
          /*index-type*/ b = /*index-type*/()); // apenas para exposição
     
      public:
        using iterator_concept  = random_access_iterator_tag;
        using iterator_category = /* ver descrição */; // nem sempre presente
        using value_type        = T;
        using difference_type   = /* ver descrição */;
     
        /*iterator*/()          = default;
     
        constexpr const T& operator*() const noexcept;
     
        constexpr /*iterator*/& operator++();
        constexpr /*iterator*/ operator++(int);
     
        constexpr /*iterator*/& operator--();
        constexpr /*iterator*/ operator--(int);
     
        constexpr /*iterator*/& operator+=(difference_type n);
        constexpr /*iterator*/& operator-=(difference_type n);
        constexpr const T& operator const noexcept;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y);
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y);
     
        friend constexpr /*iterator*/ operator+(/*iterator*/ i, difference_type n);
        friend constexpr /*iterator*/ operator+(difference_type n, /*iterator*/ i);
     
        friend constexpr /*iterator*/ operator-(/*iterator*/ i, difference_type n);
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y);
      };
    }
```

#### Modelo de classe std::ranges::basic_istream_view
```
    namespace std::ranges {
      template<class Val, class CharT, class Traits>
      concept /*stream-extractable*/ = // apenas para exposição
        requires(basic_istream<CharT, Traits>& is, Val& t) { is >> t; };
     
      template<movable Val, class CharT, class Traits = char_traits<CharT>>
        requires default_initializable<Val> && /*stream-extractable*/<Val, CharT, Traits>
      class basic_istream_view : public view_interface<basic_istream_view<Val, CharT, Traits>>
      {
      public:
        constexpr explicit basic_istream_view(basic_istream<CharT, Traits>& stream);
     
        constexpr auto begin()
        {
          */*stream_*/ >> /*value_*/;
          return /*iterator*/{ *this };
        }
     
        constexpr default_sentinel_t end() const noexcept;
     
      private:
        // classe basic_istream_view::iterator
        struct /*iterator*/;                       // apenas para exposição
        basic_istream<CharT, Traits>* /*stream_*/; // apenas para exposição
        Val /*value_*/ = Val();                    // apenas para exposição
      };
    }
```

#### Modelo de classe std::ranges::basic_istream_view::iterator
```
    namespace std::ranges {
      template<movable Val, class CharT, class Traits>
        requires default_initializable<Val> && /*stream-extractable*/<Val, CharT, Traits>
      class basic_istream_view<Val, CharT, Traits>::/*iterator*/
      {
      public:
        using iterator_concept = input_iterator_tag;
        using difference_type  = ptrdiff_t;
        using value_type       = Val;
     
        constexpr explicit /*iterator*/(basic_istream_view& parent) noexcept;
     
        /*iterator*/(const /*iterator*/&)            = delete;
        /*iterator*/(/*iterator*/&&)                 = default;
     
        /*iterator*/& operator=(const /*iterator*/&) = delete;
        /*iterator*/& operator=(/*iterator*/&&)      = default;
     
        /*iterator*/& operator++();
        void operator++(int);
     
        Val& operator*() const;
     
        friend bool operator==(const /*iterator*/& x, default_sentinel_t);
     
      private:
        basic_istream_view* /*parent_*/; // apenas para exposição
      };
    }
```

#### Modelo de classe [std::ranges::ref_view](<#/doc/ranges/ref_view>)
```
    namespace std::ranges {
      template<range R>
        requires is_object_v<R>
      class ref_view : public view_interface<ref_view<R>>
      {
      private:
        R* /*r_*/; // apenas para exposição
     
      public:
        template</*different-from*/<ref_view> T>
          requires /* ver descrição */
          constexpr
        ref_view(T&& t);
     
        constexpr R& base() const { return */*r_*/; }
     
        constexpr iterator_t<R> begin() const { return ranges::begin(*/*r_*/); }
        constexpr sentinel_t<R> end() const { return ranges::end(*/*r_*/); }
     
        constexpr bool empty() const
          requires requires { ranges::empty(*/*r_*/); }
        {
          return ranges::empty(*/*r_*/);
        }
     
        constexpr auto size() const
          requires sized_range<R>
        {
          return ranges::size(*/*r_*/);
        }
     
        constexpr auto data() const
          requires contiguous_range<R>
        {
          return ranges::data(*/*r_*/);
        }
      };
     
      template<class R>
      ref_view(R&) -> ref_view<R>;
    }
```

#### Modelo de classe std::ranges::owning_view
```
    namespace std::ranges {
      template<range R>
        requires movable<R> && (!/*is-initializer-list*/<R>)
      class owning_view : public view_interface<owning_view<R>>
      {
      private:
        R /*r_*/ = R(); // apenas para exposição
     
      public:
        owning_view()
          requires default_initializable<R>
        = default;
        constexpr owning_view(R&& t);
     
        owning_view(owning_view&&)            = default;
        owning_view& operator=(owning_view&&) = default;
     
        constexpr R& base() & noexcept { return /*r_*/; }
        constexpr const R& base() const& noexcept { return /*r_*/; }
        constexpr R&& base() && noexcept { return std::move(/*r_*/); }
        constexpr const R&& base() const&& noexcept { return std::move(/*r_*/); }
     
        constexpr iterator_t<R> begin() { return ranges::begin(/*r_*/); }
        constexpr sentinel_t<R> end() { return ranges::end(/*r_*/); }
     
        constexpr auto begin() const
          requires range<const R>
        {
          return ranges::begin(/*r_*/);
        }
        constexpr auto end() const
          requires range<const R>
        {
          return ranges::end(/*r_*/);
        }
     
        constexpr bool empty()
          requires requires { ranges::empty(/*r_*/); }
        {
          return ranges::empty(/*r_*/);
        }
        constexpr bool empty() const
          requires requires { ranges::empty(/*r_*/); }
        {
          return ranges::empty(/*r_*/);
        }
     
        constexpr auto size()
          requires sized_range<R>
        {
          return ranges::size(/*r_*/);
        }
        constexpr auto size() const
          requires sized_range<const R>
        {
          return ranges::size(/*r_*/);
        }
     
        constexpr auto data()
          requires contiguous_range<R>
        {
          return ranges::data(/*r_*/);
        }
        constexpr auto data() const
          requires contiguous_range<const R>
        {
          return ranges::data(/*r_*/);
        }
      };
    }
```

#### Modelo de classe std::ranges::as_rvalue_view
```
    namespace std::ranges {
      template<view V>
        requires input_range<V>
      class as_rvalue_view : public view_interface<as_rvalue_view<V>>
      {
        V /*base_*/ = V(); // apenas para exposição
     
      public:
        as_rvalue_view()
          requires default_initializable<V>
        = default;
        constexpr explicit as_rvalue_view(V base);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return move_iterator(ranges::begin(/*base_*/));
        }
        constexpr auto begin() const
          requires range<const V>
        {
          return move_iterator(ranges::begin(/*base_*/));
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (common_range<V>) {
            return move_iterator(ranges::end(/*base_*/));
          } else {
            return move_sentinel(ranges::end(/*base_*/));
          }
        }
        constexpr auto end() const
          requires range<const V>
        {
          if constexpr (common_range<const V>) {
            return move_iterator(ranges::end(/*base_*/));
          } else {
            return move_sentinel(ranges::end(/*base_*/));
          }
        }
     
        constexpr auto size()
          requires sized_range<V>
        {
          return ranges::size(/*base_*/);
        }
        constexpr auto size() const
          requires sized_range<const V>
        {
          return ranges::size(/*base_*/);
        }
      };
     
      template<class R>
      as_rvalue_view(R&&) -> as_rvalue_view<views::all_t<R>>;
    }
```

#### Modelo de classe [std::ranges::filter_view](<#/doc/ranges/filter_view>)
```
    namespace std::ranges {
      template<input_range V, indirect_unary_predicate<iterator_t<V>> Pred>
        requires view<V> && is_object_v<Pred>
      class filter_view : public view_interface<filter_view<V, Pred>>
      {
      private:
        V /*base_*/ = V();               // apenas para exposição
        /*movable-box*/<Pred> /*pred_*/; // apenas para exposição
     
        // classe filter_view::iterator
        class /*iterator*/; // apenas para exposição
     
        // classe filter_view::sentinel
        class /*sentinel*/; // apenas para exposição
     
      public:
        filter_view()
          requires default_initializable<V> && default_initializable<Pred>
        = default;
        constexpr explicit filter_view(V base, Pred pred);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr const Pred& pred() const;
     
        constexpr /*iterator*/ begin();
        constexpr auto end()
        {
          if constexpr (common_range<V>)
            return /*iterator*/{ *this, ranges::end(/*base_*/) };
          else
            return /*sentinel*/{ *this };
        }
      };
     
      template<class R, class Pred>
      filter_view(R&&, Pred) -> filter_view<views::all_t<R>, Pred>;
    }
```

#### Modelo de classe std::ranges::filter_view::iterator
```
    namespace std::ranges {
      template<input_range V, indirect_unary_predicate<iterator_t<V>> Pred>
        requires view<V> && is_object_v<Pred>
      class filter_view<V, Pred>::/*iterator*/
      {
      private:
        iterator_t<V> /*current_*/ = iterator_t<V>(); // apenas para exposição
        filter_view* /*parent_*/   = nullptr;         // apenas para exposição
     
      public:
        using iterator_concept  = /* ver descrição */;
        using iterator_category = /* ver descrição */; // nem sempre presente
        using value_type        = range_value_t<V>;
        using difference_type   = range_difference_t<V>;
     
        /*iterator*/()
          requires default_initializable<iterator_t<V>>
        = default;
        constexpr /*iterator*/(filter_view& parent, iterator_t<V> current);
     
        constexpr const iterator_t<V>& base() const& noexcept;
        constexpr iterator_t<V> base() &&;
        constexpr range_reference_t<V> operator*() const;
        constexpr iterator_t<V> operator->() const
          requires /*has-arrow*/<iterator_t<V>> && copyable<iterator_t<V>>;
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires forward_range<V>;
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range<V>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range<V>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires equality_comparable<iterator_t<V>>;
     
        friend constexpr range_rvalue_reference_t<V> iter_move(
          const /*iterator*/& i) noexcept(noexcept(ranges::iter_move(i./*current_*/)));
     
        friend constexpr void iter_swap(
          const /*iterator*/& x,
          const /*iterator*/& y) noexcept(noexcept(ranges::iter_swap(x./*current_*/,
                                                                     y./*current_*/)))
          requires indirectly_swappable<iterator_t<V>>;
      };
    }
```

#### Modelo de classe std::ranges::filter_view::sentinel
```
    namespace std::ranges {
      template<input_range V, indirect_unary_predicate<iterator_t<V>> Pred>
        requires view<V> && is_object_v<Pred>
      class filter_view<V, Pred>::/*sentinel*/
      {
      private:
        sentinel_t<V> /*end_*/ = sentinel_t<V>(); // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr explicit /*sentinel*/(filter_view& parent);
     
        constexpr sentinel_t<V> base() const;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*sentinel*/& y);
      };
    }
```

#### Modelo de classe [std::ranges::transform_view](<#/doc/ranges/transform_view>)
```
    namespace std::ranges {
      template<input_range V, move_constructible F>
        requires view<V> && is_object_v<F> && regular_invocable<F&, range_reference_t<V>> &&
                 /*can-reference*/<invoke_result_t<F&, range_reference_t<V>>>
      class transform_view : public view_interface<transform_view<V, F>>
      {
      private:
        // modelo de classe transform_view::iterator
        template<bool>
        struct /*iterator*/; // apenas para exposição
     
        // modelo de classe transform_view::sentinel
        template<bool>
        struct /*sentinel*/; // apenas para exposição
     
        V /*base_*/ = V();           // apenas para exposição
        /*movable-box*/<F> /*fun_*/; // apenas para exposição
     
      public:
        transform_view()
          requires default_initializable<V> && default_initializable<F>
        = default;
        constexpr explicit transform_view(V base, F fun);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr /*iterator*/<false> begin();
        constexpr /*iterator*/<true> begin() const
          requires range<const V> && regular_invocable<const F&, range_reference_t<const V>>;
     
        constexpr /*sentinel*/<false> end();
        constexpr /*iterator*/<false> end()
          requires common_range<V>;
        constexpr /*sentinel*/<true> end() const
          requires range<const V> && regular_invocable<const F&, range_reference_t<const V>>;
        constexpr /*iterator*/<true> end() const
          requires common_range<const V> &&
                   regular_invocable<const F&, range_reference_t<const V>>;
     
        constexpr auto size()
          requires sized_range<V>
        {
          return ranges::size(/*base_*/);
        }
        constexpr auto size() const
          requires sized_range<const V>
        {
          return ranges::size(/*base_*/);
        }
      };
     
      template<class R, class F>
      transform_view(R&&, F) -> transform_view<views::all_t<R>, F>;
    }
```

#### Modelo de classe std::ranges::transform_view::iterator
```
    namespace std::ranges {
      template<input_range V, move_constructible F>
        requires view<V> && is_object_v<F> && regular_invocable<F&, range_reference_t<V>> &&
                 /*can-reference*/<invoke_result_t<F&, range_reference_t<V>>>
      template<bool Const>
      class transform_view<V, F>::/*iterator*/
      {
      private:
        using /*Parent*/ = /*maybe-const*/<Const, transform_view>;  // apenas para exposição
        using /*Base*/   = /*maybe-const*/<Const, V>;               // apenas para exposição
        iterator_t</*Base*/> /*current_*/ = iterator_t</*Base*/>(); // apenas para exposição
        /*Parent*/* /*parent_*/           = nullptr;                // apenas para exposição
     
      public:
        using iterator_concept  = /* ver descrição */;
        using iterator_category = /* ver descrição */; // nem sempre presente
        using value_type        = remove_cvref_t<
          invoke_result_t</*maybe-const*/<Const, F>&, range_reference_t</*Base*/>>>;
        using difference_type = range_difference_t</*Base*/>;
     
        /*iterator*/()
          requires default_initializable<iterator_t</*Base*/>>
        = default;
        constexpr /*iterator*/(/*Parent*/& parent, iterator_t</*Base*/> current);
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>>;
     
        constexpr const iterator_t</*Base*/>& base() const& noexcept;
        constexpr iterator_t</*Base*/> base() &&;
     
        constexpr decltype(auto) operator*() const
          noexcept(noexcept(invoke(*/*parent_*/->/*fun_*/, */*current_*/)))
        {
          return invoke(*/*parent_*/->/*fun_*/, */*current_*/);
        }
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires forward_range</*Base*/>;
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type n)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type n)
          requires random_access_range</*Base*/>;
     
        constexpr decltype(auto) operator const
          requires random_access_range</*Base*/>
        {
          return invoke(*/*parent_*/->/*fun_*/, /*current_*/[n]);
        }
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires equality_comparable<iterator_t</*Base*/>>;
     
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/> && three_way_comparable<iterator_t</*Base*/>>
        ;
     
        friend constexpr /*iterator*/ operator+(/*iterator*/ i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type n, /*iterator*/ i)
          requires random_access_range</*Base*/>;
     
        friend constexpr /*iterator*/ operator-(/*iterator*/ i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for<iterator_t</*Base*/>, iterator_t</*Base*/>>;
      };
    }
```

#### Modelo de classe std::ranges::transform_view::sentinel
```
    namespace std::ranges {
      template<input_range V, move_constructible F>
        requires view<V> && is_object_v<F> && regular_invocable<F&, range_reference_t<V>> &&
                 /*can-reference*/<invoke_result_t<F&, range_reference_t<V>>>
      template<bool Const>
      class transform_view<V, F>::/*sentinel*/
      {
      private:
        using /*Parent*/ = /*maybe-const*/<Const, transform_view>; // apenas para exposição
        using /*Base*/   = /*maybe-const*/<Const, V>;              // apenas para exposição
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>();    // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr explicit /*sentinel*/(sentinel_t</*Base*/> end);
        constexpr /*sentinel*/(/*sentinel*/<!Const> i)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        constexpr sentinel_t</*Base*/> base() const;
     
        template<bool OtherConst>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*iterator*/<OtherConst>& x,
          const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*sentinel*/& y,
          const /*iterator*/<OtherConst>& x);
      };
    }
```

#### Modelo de classe [std::ranges::take_view](<#/doc/ranges/take_view>)
```
    namespace std::ranges {
      template<view V>
      class take_view : public view_interface<take_view<V>>
      {
      private:
        V /*base_*/                      = V(); // apenas para exposição
        range_difference_t<V> /*count_*/ = 0;   // apenas para exposição
     
        // modelo de classe take_view::sentinel
        template<bool>
        class /*sentinel*/; // apenas para exposição
     
      public:
        take_view()
          requires default_initializable<V>
        = default;
        constexpr explicit take_view(V base, range_difference_t<V> count);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (sized_range<V>) {
            if constexpr (random_access_range<V>) {
              return ranges::begin(/*base_*/);
            } else {
              auto sz = range_difference_t<V>(size());
              return counted_iterator(ranges::begin(/*base_*/), sz);
            }
          } else if constexpr (sized_sentinel_for<sentinel_t<V>, iterator_t<V>>) {
            auto it = ranges::begin(/*base_*/);
            auto sz = std::min(/*count_*/, ranges::end(/*base_*/) - it);
            return counted_iterator(std::move(it), sz);
          } else {
            return counted_iterator(ranges::begin(/*base_*/), /*count_*/);
          }
        }
     
        constexpr auto begin() const
          requires range<const V>
        {
          if constexpr (sized_range<const V>) {
            if constexpr (random_access_range<const V>) {
              return ranges::begin(/*base_*/);
            } else {
              auto sz = range_difference_t<const V>(size());
              return counted_iterator(ranges::begin(/*base_*/), sz);
            }
          } else if constexpr (sized_sentinel_for<sentinel_t<const V>, iterator_t<const V>>) {
            auto it = ranges::begin(/*base_*/);
            auto sz = std::min(/*count_*/, ranges::end(/*base_*/) - it);
            return counted_iterator(std::move(it), sz);
          } else {
            return counted_iterator(ranges::begin(/*base_*/), /*count_*/);
          }
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (sized_range<V>) {
            if constexpr (random_access_range<V>)
              return ranges::begin(/*base_*/) + range_difference_t<V>(size());
            else
              return default_sentinel;
          } else if constexpr (sized_sentinel_for<sentinel_t<V>, iterator_t<V>>) {
            return default_sentinel;
          } else {
            return /*sentinel*/<false>{ ranges::end(/*base_*/) };
          }
        }
     
        constexpr auto end() const
          requires range<const V>
        {
          if constexpr (sized_range<const V>) {
            if constexpr (random_access_range<const V>)
              return ranges::begin(/*base_*/) + range_difference_t<const V>(size());
            else
              return default_sentinel;
          } else if constexpr (sized_sentinel_for<sentinel_t<const V>, iterator_t<const V>>) {
            return default_sentinel;
          } else {
            return /*sentinel*/<true>{ ranges::end(/*base_*/) };
          }
        }
     
        constexpr auto size()
          requires sized_range<V>
        {
          auto n = ranges::size(/*base_*/);
          return ranges::min(n, static_cast<decltype(n)>(/*count_*/));
        }
     
        constexpr auto size() const
          requires sized_range<const V>
        {
          auto n = ranges::size(/*base_*/);
          return ranges::min(n, static_cast<decltype(n)>(/*count_*/));
        }
      };
     
      template<class R>
      take_view(R&&, range_difference_t<R>) -> take_view<views::all_t<R>>;
    }
```

#### Modelo de classe std::ranges::take_view::sentinel
```
    namespace std::ranges {
      template<view V>
      template<bool Const>
      class take_view<V>::/*sentinel*/
      {
      private:
        using /*Base*/ = /*maybe-const*/<Const, V>; // apenas para exposição
        template<bool OtherConst>
        using /*CI*/ =
          counted_iterator<iterator_t</*maybe-const*/<OtherConst, V>>>; // apenas para exposição
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>();         // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr explicit /*sentinel*/(sentinel_t</*Base*/> end);
        constexpr /*sentinel*/(/*sentinel*/<!Const> s)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        constexpr sentinel_t</*Base*/> base() const;
     
        friend constexpr bool operator==(const /*CI*/<Const>& y, const /*sentinel*/& x);
     
        template<bool OtherConst = !Const>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const /*CI*/<OtherConst>& y, const /*sentinel*/& x);
      };
    }
```

#### Modelo de classe [std::ranges::take_while_view](<#/doc/ranges/take_while_view>)
```
```cpp
    namespace std::ranges {
      template<view V, class Pred>
        requires input_range<V> && is_object_v<Pred> &&
                 indirect_unary_predicate<const Pred, iterator_t<V>>
      class take_while_view : public view_interface<take_while_view<V, Pred>>
      {
        // Modelo de classe take_while_view::sentinel
        template<bool>
        class /*sentinel*/; // apenas para exposição
     
        V /*base_*/ = V();               // apenas para exposição
        /*movable-box*/<Pred> /*pred_*/; // apenas para exposição
     
      public:
        take_while_view()
          requires default_initializable<V> && default_initializable<Pred>
        = default;
        constexpr explicit take_while_view(V base, Pred pred);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr const Pred& pred() const;
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return [ranges::begin](<#/doc/ranges/begin>)(/*base_*/);
        }
     
        constexpr auto begin() const
          requires range<const V> && indirect_unary_predicate<const Pred, iterator_t<const V>>
        {
          return [ranges::begin](<#/doc/ranges/begin>)(/*base_*/);
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          return /*sentinel*/<false>([ranges::end](<#/doc/ranges/end>)(/*base_*/), addressof(*/*pred_*/));
        }
     
        constexpr auto end() const
          requires range<const V> && indirect_unary_predicate<const Pred, iterator_t<const V>>
        {
          return /*sentinel*/<true>([ranges::end](<#/doc/ranges/end>)(/*base_*/), addressof(*/*pred_*/));
        }
      };
     
      template<class R, class Pred>
      take_while_view(R&&, Pred) -> take_while_view<[views::all_t](<#/doc/ranges/all_view>)<R>, Pred>;
    }
```

#### Modelo de classe `std::ranges::take_while_view::sentinel`
```cpp
    namespace std::ranges {
      template<view V, class Pred>
        requires input_range<V> && is_object_v<Pred> &&
                 indirect_unary_predicate<const Pred, iterator_t<V>>
      template<bool Const>
      class take_while_view<V, Pred>::/*sentinel*/
      {
        using /*Base*/                = /*maybe-const*/<Const, V>; // apenas para exposição
     
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>(); // apenas para exposição
        const Pred* /*pred_*/         = nullptr;                // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr explicit /*sentinel*/(sentinel_t</*Base*/> end, const Pred* pred);
        constexpr /*sentinel*/(/*sentinel*/<!Const> s)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        constexpr sentinel_t</*Base*/> base() const { return /*end_*/; }
     
        friend constexpr bool operator==(const iterator_t</*Base*/>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst = !Const>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const iterator_t</*maybe-const*/<OtherConst, V>>& x,
                                         const /*sentinel*/& y);
      };
    }
```

#### Modelo de classe std::ranges::drop_view
```cpp
    namespace std::ranges {
      template<view V>
      class drop_view : public view_interface<drop_view<V>>
      {
      public:
        drop_view()
          requires default_initializable<V>
        = default;
        constexpr explicit drop_view(V base, range_difference_t<V> count);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!(/*simple-view*/<V> && random_access_range<const V> &&
                     sized_range<const V>));
        constexpr auto begin() const
          requires random_access_range<const V> && sized_range<const V>;
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          return [ranges::end](<#/doc/ranges/end>)(/*base_*/);
        }
     
        constexpr auto end() const
          requires range<const V>
        {
          return [ranges::end](<#/doc/ranges/end>)(/*base_*/);
        }
     
        constexpr auto size()
          requires sized_range<V>
        {
          const auto s = [ranges::size](<#/doc/ranges/size>)(/*base_*/);
          const auto c = static_cast<decltype(s)>(/*count_*/);
          return s < c ? 0 : s - c;
        }
     
        constexpr auto size() const
          requires sized_range<const V>
        {
          const auto s = [ranges::size](<#/doc/ranges/size>)(/*base_*/);
          const auto c = static_cast<decltype(s)>(/*count_*/);
          return s < c ? 0 : s - c;
        }
     
      private:
        V /*base_*/                      = V(); // apenas para exposição
        range_difference_t<V> /*count_*/ = 0;   // apenas para exposição
      };
     
      template<class R>
      drop_view(R&&, range_difference_t<R>) -> drop_view<[views::all_t](<#/doc/ranges/all_view>)<R>>;
    }
```

#### Modelo de classe std::ranges::drop_while_view
```cpp
    namespace std::ranges {
      template<view V, class Pred>
        requires input_range<V> && is_object_v<Pred> &&
                 indirect_unary_predicate<const Pred, iterator_t<V>>
      class drop_while_view : public view_interface<drop_while_view<V, Pred>>
      {
      public:
        drop_while_view()
          requires default_initializable<V> && default_initializable<Pred>
        = default;
        constexpr explicit drop_while_view(V base, Pred pred);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr const Pred& pred() const;
     
        constexpr auto begin();
     
        constexpr auto end() { return [ranges::end](<#/doc/ranges/end>)(/*base_*/); }
     
      private:
        V /*base_*/ = V();               // apenas para exposição
        /*movable-box*/<Pred> /*pred_*/; // apenas para exposição
      };
     
      template<class R, class Pred>
      drop_while_view(R&&, Pred) -> drop_while_view<[views::all_t](<#/doc/ranges/all_view>)<R>, Pred>;
    }
```

#### Modelo de classe `std::ranges::join_view`
```cpp
    namespace std::ranges {
      template<input_range V>
        requires view<V> && input_range<range_reference_t<V>>
      class join_view : public view_interface<join_view<V>>
      {
      private:
        using /*InnerRng*/ = range_reference_t<V>; // apenas para exposição
     
        // Modelo de classe join_view::iterator
        template<bool Const>
        struct /*iterator*/; // apenas para exposição
     
        // Modelo de classe join_view::sentinel
        template<bool Const>
        struct /*sentinel*/; // apenas para exposição
     
        V /*base_*/ = V(); // apenas para exposição
     
        /*non-propagating-cache*/<iterator_t<V>> /*outer_*/; // apenas para exposição, presente apenas
                                                             // quando !forward_range<V>
        /*non-propagating-cache*/<remove_cv_t</*InnerRng*/>>
          /*inner_*/; // apenas para exposição, presente apenas
                      // se is_reference_v<InnerRng> for false
     
      public:
        join_view()
          requires default_initializable<V>
        = default;
        constexpr explicit join_view(V base);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
        {
          if constexpr (forward_range<V>) {
            constexpr bool use_const = /*simple-view*/<V> && is_reference_v</*InnerRng*/>;
            return /*iterator*/<use_const>{ *this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/) };
          } else {
            /*outer_*/ = [ranges::begin](<#/doc/ranges/begin>)(/*base_*/);
            return /*iterator*/<false>{ *this };
          }
        }
     
        constexpr auto begin() const
          requires forward_range<const V> && is_reference_v<range_reference_t<const V>> &&
                   input_range<range_reference_t<const V>>
        {
          return /*iterator*/<true>{ *this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/) };
        }
     
        constexpr auto end()
        {
          if constexpr (forward_range<V> && is_reference_v</*InnerRng*/> &&
                        forward_range</*InnerRng*/> && common_range<V> &&
                        common_range</*InnerRng*/>)
            return /*iterator*/</*simple-view*/<V>>{ *this, [ranges::end](<#/doc/ranges/end>)(/*base_*/) };
          else
            return /*sentinel*/</*simple-view*/<V>>{ *this };
        }
     
        constexpr auto end() const
          requires forward_range<const V> && is_reference_v<range_reference_t<const V>> &&
                   input_range<range_reference_t<const V>>
        {
          if constexpr (forward_range<range_reference_t<const V>> && common_range<const V> &&
                        common_range<range_reference_t<const V>>)
            return /*iterator*/<true>{ *this, [ranges::end](<#/doc/ranges/end>)(/*base_*/) };
          else
            return /*sentinel*/<true>{ *this };
        }
      };
     
      template<class R>
      explicit join_view(R&&) -> join_view<[views::all_t](<#/doc/ranges/all_view>)<R>>;
    }
```

#### Modelo de classe `std::ranges::join_view::iterator`
```cpp
    namespace std::ranges {
      template<input_range V>
        requires view<V> && input_range<range_reference_t<V>>
      template<bool Const>
      struct join_view<V>::/*iterator*/
      {
      private:
        using /*Parent*/    = /*maybe-const*/<Const, join_view>;       // apenas para exposição
        using /*Base*/      = /*maybe-const*/<Const, V>;               // apenas para exposição
        using /*OuterIter*/ = iterator_t</*Base*/>;                    // apenas para exposição
        using /*InnerIter*/ = iterator_t<range_reference_t</*Base*/>>; // apenas para exposição
     
        static constexpr bool /*ref-is-glvalue*/ = // apenas para exposição
          is_reference_v<range_reference_t</*Base*/>>;
     
        /*OuterIter*/ /*outer_*/ = /*OuterIter*/(); // apenas para exposição, presente apenas
                                                    // se Base modelar forward_range
        optional</*InnerIter*/> /*inner_*/;         // apenas para exposição
        /*Parent*/* /*parent_*/ = nullptr;          // apenas para exposição
     
        constexpr void /*satisfy*/(); // apenas para exposição
     
        constexpr /*OuterIter*/& /*outer*/();             // apenas para exposição
        constexpr const /*OuterIter*/& /*outer*/() const; // apenas para exposição
     
        constexpr /*iterator*/(/*Parent*/& parent, /*OuterIter*/ outer)
          requires forward_range</*Base*/>; // apenas para exposição
        constexpr explicit /*iterator*/(/*Parent*/& parent)
          requires(!forward_range</*Base*/>); // apenas para exposição
     
      public:
        using iterator_concept  = /* ver descrição */;
        using iterator_category = /* ver descrição */; // nem sempre presente
        using value_type        = range_value_t<range_reference_t</*Base*/>>;
        using difference_type   = /* ver descrição */;
     
        /*iterator*/()          = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, /*OuterIter*/> &&
                   convertible_to<iterator_t</*InnerRng*/>, /*InnerIter*/>;
     
        constexpr decltype(auto) operator*() const { return **/*inner_*/; }
     
        constexpr /*InnerIter*/ operator->() const
          requires /*has-arrow*/</*InnerIter*/> && copyable</*InnerIter*/>;
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires /*ref-is-glvalue*/
                   && forward_range</*Base*/> && forward_range<range_reference_t</*Base*/>>;
     
        constexpr /*iterator*/& operator--()
          requires /*ref-is-glvalue*/ && bidirectional_range</*Base*/> &&
                   bidirectional_range<range_reference_t</*Base*/>> &&
                   common_range<range_reference_t</*Base*/>>;
     
        constexpr /*iterator*/ operator--(int)
          requires /*ref-is-glvalue*/ && bidirectional_range</*Base*/> &&
                   bidirectional_range<range_reference_t</*Base*/>> &&
                   common_range<range_reference_t</*Base*/>>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires /*ref-is-glvalue*/ && forward_range</*Base*/> &&
                   equality_comparable<iterator_t<range_reference_t</*Base*/>>>;
     
        friend constexpr decltype(auto) iter_move(const /*iterator*/& i) noexcept(
          noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(*i./*inner_*/)))
        {
          return [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(*i./*inner_*/);
        }
     
        friend constexpr void iter_swap(
          const /*iterator*/& x,
          const /*iterator*/& y) noexcept(noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(*x./*inner_*/,
                                                                     *y./*inner_*/)))
          requires indirectly_swappable</*InnerIter*/>;
      };
    }
```

#### Modelo de classe `std::ranges::join_view::sentinel`
```cpp
    namespace std::ranges {
      template<input_range V>
        requires view<V> && input_range<range_reference_t<V>>
      template<bool Const>
      struct join_view<V>::/*sentinel*/
      {
      private:
        using /*Parent*/              = /*maybe-const*/<Const, join_view>; // apenas para exposição
        using /*Base*/                = /*maybe-const*/<Const, V>;         // apenas para exposição
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>();            // apenas para exposição
     
      public:
        /*sentinel*/() = default;
     
        constexpr explicit /*sentinel*/(/*Parent*/& parent);
        constexpr /*sentinel*/(/*sentinel*/<!Const> s)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        template<bool OtherConst>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
      };
    }
```

#### Modelo de classe `std::ranges::join_with_view`
```cpp
    namespace std::ranges {
      template<class R>
      concept /*bidirectional-common*/ =
        bidirectional_range<R> && common_range<R>; // apenas para exposição
     
      template<input_range V, forward_range Pattern>
        requires view<V> && input_range<range_reference_t<V>> && view<Pattern> &&
                 /*concatable*/<range_reference_t<V>, Pattern>
      class join_with_view : public view_interface<join_with_view<V, Pattern>>
      {
        using /*InnerRng*/ = range_reference_t<V>; // apenas para exposição
     
        V /*base_*/        = V();                               // apenas para exposição
        /*non-propagating-cache*/<iterator_t<V>> /*outer-it_*/; // apenas para exposição, presente
                                                                // apenas quando !forward_range<V>
        /*non-propagating-cache*/<remove_cv_t</*InnerRng*/>>
          /*inner_*/;                     // apenas para exposição, presente apenas
                                          // se is_reference_v<InnerRng> for false
        Pattern /*pattern_*/ = Pattern(); // apenas para exposição
     
        // Modelo de classe join_with_view::iterator
        template<bool Const>
        struct /*iterator*/; // apenas para exposição
     
        // Modelo de classe join_with_view::sentinel
        template<bool Const>
        struct /*sentinel*/; // apenas para exposição
     
      public:
        join_with_view()
          requires default_initializable<V> && default_initializable<Pattern>
        = default;
     
        constexpr explicit join_with_view(V base, Pattern pattern);
     
        template<input_range R>
          requires constructible_from<V, [views::all_t](<#/doc/ranges/all_view>)<R>> &&
                   constructible_from<Pattern, single_view<range_value_t</*InnerRng*/>>>
        constexpr explicit join_with_view(R&& r, range_value_t</*InnerRng*/> e);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
        {
          if constexpr (forward_range<V>) {
            constexpr bool use_const =
              /*simple-view*/<V> && is_reference_v</*InnerRng*/> && /*simple-view*/<Pattern>;
            return /*iterator*/<use_const>{ *this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/) };
          } else {
            /*outer-it_*/ = [ranges::begin](<#/doc/ranges/begin>)(/*base_*/);
            return /*iterator*/<false>{ *this };
          }
        }
        constexpr auto begin() const
          requires forward_range<const V> && forward_range<const Pattern> &&
                   is_reference_v<range_reference_t<const V>> &&
                   input_range<range_reference_t<const V>> &&
                   /*concatable*/<range_reference_t<const V>, const Pattern>
        {
          return /*iterator*/<true>{ *this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/) };
        }
     
        constexpr auto end()
        {
          if constexpr (forward_range<V> && is_reference_v</*InnerRng*/> &&
                        forward_range</*InnerRng*/> && common_range<V> &&
                        common_range</*InnerRng*/>)
            return /*iterator*/ < /*simple-view*/<V> &&
                   /*simple-view*/ < Pattern >> { *this, [ranges::end](<#/doc/ranges/end>)(/*base_*/) };
          else
            return /*sentinel*/ < /*simple-view*/<V> &&
                   /*simple-view*/ < Pattern >> { *this };
        }
        constexpr auto end() const
          requires forward_range<const V> && forward_range<const Pattern> &&
                   is_reference_v<range_reference_t<const V>> &&
                   input_range<range_reference_t<const V>> &&
                   /*concatable*/<range_reference_t<const V>, const Pattern>
        {
          using InnerConstRng = range_reference_t<const V>;
          if constexpr (forward_range<InnerConstRng> && common_range<const V> &&
                        common_range<InnerConstRng>)
            return /*iterator*/<true>{ *this, [ranges::end](<#/doc/ranges/end>)(/*base_*/) };
          else
            return /*sentinel*/<true>{ *this };
        }
      };
     
      template<class R, class P>
      join_with_view(R&&, P&&) -> join_with_view<[views::all_t](<#/doc/ranges/all_view>)<R>, [views::all_t](<#/doc/ranges/all_view>)<P>>;
     
      template<input_range R>
      join_with_view(R&&, range_value_t<range_reference_t<R>>)
        -> join_with_view<[views::all_t](<#/doc/ranges/all_view>)<R>, single_view<range_value_t<range_reference_t<R>>>>;
    }
```

#### Modelo de classe `std::ranges::join_with_view::iterator`
```cpp
    namespace std::ranges {
      template<input_range V, forward_range Pattern>
        requires view<V> && input_range<range_reference_t<V>> && view<Pattern> &&
                 /*concatable*/<range_reference_t<V>, Pattern>
      template<bool Const>
      class join_with_view<V, Pattern>::/*iterator*/
      {
        using /*Parent*/      = /*maybe-const*/<Const, join_with_view>; // apenas para exposição
        using /*Base*/        = /*maybe-const*/<Const, V>;              // apenas para exposição
        using /*InnerBase*/   = range_reference_t</*Base*/>;            // apenas para exposição
        using /*PatternBase*/ = /*maybe-const*/<Const, Pattern>;        // apenas para exposição
     
        using /*OuterIter*/   = iterator_t</*Base*/>;        // apenas para exposição
        using /*InnerIter*/   = iterator_t</*InnerBase*/>;   // apenas para exposição
        using /*PatternIter*/ = iterator_t</*PatternBase*/>; // apenas para exposição
     
        static constexpr bool /*ref-is-glvalue*/ =
          is_reference_v</*InnerBase*/>; // apenas para exposição
     
        /*Parent*/* /*parent_*/     = nullptr;                 // apenas para exposição
        /*OuterIter*/ /*outer-it_*/ = /*OuterIter*/();         // apenas para exposição, presente apenas
                                                               // se Base modelar forward_range
        variant</*PatternIter*/, /*InnerIter*/> /*inner-it_*/; // apenas para exposição
     
        constexpr /*iterator*/(/*Parent*/& parent, /*OuterIter*/ outer)
          requires forward_range</*Base*/>; // apenas para exposição
        constexpr explicit /*iterator*/(/*Parent*/& parent)
          requires(!forward_range</*Base*/>);             // apenas para exposição
        constexpr /*OuterIter*/& /*outer*/();             // apenas para exposição
        constexpr const /*OuterIter*/& /*outer*/() const; // apenas para exposição
        constexpr auto& /*update-inner*/();               // apenas para exposição
        constexpr auto& /*get-inner*/();                  // apenas para exposição
        constexpr void /*satisfy*/();                     // apenas para exposição
     
      public:
        using iterator_concept  = /* ver descrição */;
        using iterator_category = /* ver descrição */; // nem sempre presente
        using value_type        = /* ver descrição */;
        using difference_type   = /* ver descrição */;
     
        /*iterator*/()          = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, /*OuterIter*/> &&
                   convertible_to<iterator_t</*InnerRng*/>, /*InnerIter*/> &&
                   convertible_to<iterator_t<Pattern>, /*PatternIter*/>;
     
        constexpr decltype(auto) operator*() const;
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires /*ref-is-glvalue*/
                   && forward_iterator</*OuterIter*/> && forward_iterator</*InnerIter*/>;
     
        constexpr /*iterator*/& operator--()
          requires /*ref-is-glvalue*/ && bidirectional_range</*Base*/> &&
                   /*bidirectional-common*/</*InnerBase*/> &&
                   /*bidirectional-common*/</*PatternBase*/>;
        constexpr /*iterator*/ operator--(int)
          requires /*ref-is-glvalue*/ && bidirectional_range</*Base*/> &&
                   /*bidirectional-common*/</*InnerBase*/> &&
                   /*bidirectional-common*/</*PatternBase*/>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires /*ref-is-glvalue*/
                   && forward_range</*Base*/> && equality_comparable</*InnerIter*/>;
     
        friend constexpr decltype(auto) iter_move(const /*iterator*/& x)
        {
          using rvalue_reference =
            common_reference_t<iter_rvalue_reference_t</*InnerIter*/>,
                               iter_rvalue_reference_t</*PatternIter*/>>;
          return visit<rvalue_reference>([ranges::iter_move](<#/doc/iterator/ranges/iter_move>), x./*inner-it_*/);
        }
     
        friend constexpr void iter_swap(const /*iterator*/& x, const /*iterator*/& y)
          requires indirectly_swappable</*InnerIter*/, /*PatternIter*/>
        {
          visit([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>), x./*inner-it_*/, y./*inner-it_*/);
        }
      };
    }
```

#### Modelo de classe `std::ranges::join_with_view::sentinel`
```cpp
    namespace std::ranges {
      template<input_range V, forward_range Pattern>
        requires view<V> && input_range<range_reference_t<V>> && view<Pattern> &&
                 /*concatable*/<range_reference_t<V>, Pattern>
      template<bool Const>
      class join_with_view<V, Pattern>::/*sentinel*/
      {
        using /*Parent*/ = /*maybe-const*/<Const, join_with_view>; // apenas para exposição
        using /*Base*/   = /*maybe-const*/<Const, V>;              // apenas para exposição
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>();    // apenas para exposição
     
        constexpr explicit /*sentinel*/(/*Parent*/& parent); // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr /*sentinel*/(/*sentinel*/<!Const> s)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        template<bool OtherConst>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
      };
    }
```

#### Modelo de classe `std::ranges::lazy_split_view`
```cpp
    namespace std::ranges {
      template<auto>
      struct /*require-constant*/; // apenas para exposição
     
      template<class R>
      concept /*tiny-range*/ = // apenas para exposição
        sized_range<R> && requires {
          typename /*require-constant*/<remove_reference_t<R>::size()>;
        } && (remove_reference_t<R>::size() <= 1);
     
      template<input_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>,
                                       iterator_t<Pattern>,
                                       [ranges::equal_to](<#/>)> &&
                 (forward_range<V> || /*tiny-range*/<Pattern>)
      class lazy_split_view : public view_interface<lazy_split_view<V, Pattern>>
      {
      private:
        V /*base_*/          = V();       // apenas para exposição
        Pattern /*pattern_*/ = Pattern(); // apenas para exposição
     
        /*non-propagating-cache*/<iterator_t<V>> /*current_*/; // apenas para exposição, presente apenas
                                                               // se forward_range<V> for false
     
        // Modelo de classe lazy_split_view::outer-iterator
        template<bool>
        struct /*outer-iterator*/; // apenas para exposição
     
        // Modelo de classe lazy_split_view::inner-iterator
        template<bool>
        struct /*inner-iterator*/; // apenas para exposição
     
      public:
        lazy_split_view()
          requires default_initializable<V> && default_initializable<Pattern>
        = default;
        constexpr explicit lazy_split_view(V base, Pattern pattern);
     
        template<input_range R>
          requires constructible_from<V, [views::all_t](<#/doc/ranges/all_view>)<R>> &&
                   constructible_from<Pattern, single_view<range_value_t<R>>>
        constexpr explicit lazy_split_view(R&& r, range_value_t<R> e);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
        {
          if constexpr (forward_range<V>) {
            return /*outer-iterator*/ < /*simple-view*/<V> &&
                   /*simple-view*/ < Pattern >> { *this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/) };
          } else {
            /*current_*/ = [ranges::begin](<#/doc/ranges/begin>)(/*base_*/);
            return /*outer-iterator*/<false>{ *this };
          }
        }
     
        constexpr auto begin() const
          requires forward_range<V> && forward_range<const V>
        {
          return /*outer-iterator*/<true>{ *this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/) };
        }
     
        constexpr auto end()
          requires forward_range<V> && common_range<V>
        {
          return /*outer-iterator*/ < /*simple-view*/<V> &&
                 /*simple-view*/ < Pattern >> { *this, [ranges::end](<#/doc/ranges/end>)(/*base_*/) };
        }
     
        constexpr auto end() const
        {
          if constexpr (forward_range<V> && forward_range<const V> && common_range<const V>)
            return /*outer-iterator*/<true>{ *this, [ranges::end](<#/doc/ranges/end>)(/*base_*/) };
          else
            return default_sentinel;
        }
      };
     
      template<class R, class P>
      lazy_split_view(R&&, P&&) -> lazy_split_view<[views::all_t](<#/doc/ranges/all_view>)<R>, [views::all_t](<#/doc/ranges/all_view>)<P>>;
     
      template<input_range R>
      lazy_split_view(R&&, range_value_t<R>)
        -> lazy_split_view<[views::all_t](<#/doc/ranges/all_view>)<R>, single_view<range_value_t<R>>>;
    }
```

#### Modelo de classe `std::ranges::lazy_split_view::outer_iterator`
```cpp
    namespace std::ranges {
      template<input_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>,
                                       iterator_t<Pattern>,
                                       [ranges::equal_to](<#/>)> &&
                 (forward_range<V> || /*tiny-range*/<Pattern>)
      template<bool Const>
      struct lazy_split_view<V, Pattern>::/*outer-iterator*/
      {
      private:
        using /*Parent*/        = /*maybe-const*/<Const, lazy_split_view>; // apenas para exposição
        using /*Base*/          = /*maybe-const*/<Const, V>;               // apenas para exposição
        /*Parent*/* /*parent_*/ = nullptr;                                 // apenas para exposição
     
        iterator_t</*Base*/> /*current_*/ =
          iterator_t</*Base*/>(); // apenas para exposição, presente apenas
                                  // se V modelar forward_range
     
        bool /*trailing-empty_*/ = false; // apenas para exposição
     
      public:
        using iterator_concept =
          conditional_t<forward_range</*Base*/>, forward_iterator_tag, input_iterator_tag>;
     
        using iterator_category = input_iterator_tag; // presente apenas se Base
                                                      // modelar forward_range
     
        // Classe lazy_split_view::outer-iterator::value_type
        struct value_type;
        using difference_type = range_difference_t</*Base*/>;
     
        /*outer-iterator*/()  = default;
        constexpr explicit /*outer-iterator*/(/*Parent*/& parent)
          requires(!forward_range</*Base*/>);
        constexpr /*outer-iterator*/(/*Parent*/& parent, iterator_t</*Base*/> current)
          requires forward_range</*Base*/>;
        constexpr /*outer-iterator*/(/*outer-iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>>;
     
        constexpr value_type operator*() const;
     
        constexpr /*outer-iterator*/& operator++();
        constexpr decltype(auto) operator++(int)
        {
          if constexpr (forward_range</*Base*/>) {
            auto tmp = *this;
            ++*this;
            return tmp;
          } else
            ++*this;
        }
     
        friend constexpr bool operator==(const /*outer-iterator*/& x,
                                         const /*outer-iterator*/& y)
          requires forward_range</*Base*/>;
     
        friend constexpr bool operator==(const /*outer-iterator*/& x, default_sentinel_t);
      };
    }
```

#### Modelo de classe `std::ranges::lazy_split_view::outer_iterator::value_type`
```cpp
    namespace std::ranges {
      template<input_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>,
                                       iterator_t<Pattern>,
                                       [ranges::equal_to](<#/>)> &&
```
                 (forward_range<V> || /*tiny-range*/<Pattern>)
      template<bool Const>
      struct lazy_split_view<V, Pattern>::/*outer-iterator*/<Const>::value_type
        : view_interface<value_type>
      {
      private:
        /*outer-iterator*/ /*i_*/ = /*outer-iterator*/(); // exposition-only
     
        constexpr explicit value_type(/*outer-iterator*/ i); // exposition-only
     
      public:
        constexpr /*inner-iterator*/<Const> begin() const;
        constexpr default_sentinel_t end() const noexcept;
      };
    }
```

#### Modelo de classe std::ranges::lazy_split_view::inner_iterator
```
    namespace std::ranges {
      template<input_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>,
                                       iterator_t<Pattern>,
                                       ranges::equal_to> &&
                 (forward_range<V> || /*tiny-range*/<Pattern>)
      template<bool Const>
      struct lazy_split_view<V, Pattern>::/*inner-iterator*/
      {
      private:
        using /*Base*/                   = /*maybe-const*/<Const, V>;   // exposition-only
        /*outer-iterator*/<Const> /*i_*/ = /*outer-iterator*/<Const>(); // exposition-only
        bool /*incremented_*/            = false;                       // exposition-only
     
      public:
        using iterator_concept  = typename /*outer-iterator*/<Const>::iterator_concept;
     
        using iterator_category = /* see description */; // present only if Base
                                                         // models forward_range
        using value_type      = range_value_t</*Base*/>;
        using difference_type = range_difference_t</*Base*/>;
     
        /*inner-iterator*/()  = default;
        constexpr explicit /*inner-iterator*/(/*outer-iterator*/<Const> i);
     
        constexpr const iterator_t</*Base*/>& base() const& noexcept;
        constexpr iterator_t</*Base*/> base() &&
            requires forward_range<V>;
     
        constexpr decltype(auto) operator*() const { return */*i_*/./*current*/; }
     
        constexpr /*inner-iterator*/& operator++();
        constexpr decltype(auto) operator++(int)
        {
          if constexpr (forward_range</*Base*/>) {
            auto tmp = *this;
            ++*this;
            return tmp;
          } else
            ++*this;
        }
     
        friend constexpr bool operator==(const /*inner-iterator*/& x,
                                         const /*inner-iterator*/& y)
          requires forward_range</*Base*/>;
     
        friend constexpr bool operator==(const /*inner-iterator*/& x, default_sentinel_t);
     
        friend constexpr decltype(auto) iter_move(const /*inner-iterator*/& i) noexcept(
          noexcept(ranges::iter_move(i./*i_*/./*current*/)))
        {
          return ranges::iter_move(i./*i_*/./*current*/);
        }
     
        friend constexpr void
        iter_swap(const /*inner-iterator*/& x, const /*inner-iterator*/& y) noexcept(
          noexcept(ranges::iter_swap(x./*i_*/./*current*/, y./*i_*/./*current*/)))
          requires indirectly_swappable<iterator_t</*Base*/>>;
      };
    }
```

#### Modelo de classe std::ranges::split_view
```
    namespace std::ranges {
      template<forward_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>, iterator_t<Pattern>, ranges::equal_to>
      class split_view : public view_interface<split_view<V, Pattern>>
      {
      private:
        V /*base_*/          = V();       // exposition-only
        Pattern /*pattern_*/ = Pattern(); // exposition-only
     
        // class split_view::iterator
        struct /*iterator*/; // exposition-only
     
        // class split_view::sentinel
        struct /*sentinel*/; // exposition-only
     
      public:
        split_view()
          requires default_initializable<V> && default_initializable<Pattern>
        = default;
        constexpr explicit split_view(V base, Pattern pattern);
     
        template<forward_range R>
          requires constructible_from<V, views::all_t<R>> &&
                   constructible_from<Pattern, single_view<range_value_t<R>>>
        constexpr explicit split_view(R&& r, range_value_t<R> e);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr /*iterator*/ begin();
     
        constexpr auto end()
        {
          if constexpr (common_range<V>) {
            return /*iterator*/{ *this, ranges::end(/*base_*/), {} };
          } else {
            return /*sentinel*/{ *this };
          }
        }
     
        constexpr subrange<iterator_t<V>> /*find-next*/(iterator_t<V>); // exposition-only
      };
     
      template<class R, class P>
      split_view(R&&, P&&) -> split_view<views::all_t<R>, views::all_t<P>>;
     
      template<forward_range R>
      split_view(R&&, range_value_t<R>)
        -> split_view<views::all_t<R>, single_view<range_value_t<R>>>;
    }
```

#### Modelo de classe std::ranges::split_view::iterator
```
    namespace std::ranges {
      template<forward_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>, iterator_t<Pattern>, ranges::equal_to>
      class split_view<V, Pattern>::/*iterator*/
      {
      private:
        split_view* /*parent_*/           = nullptr;                   // exposition-only
        iterator_t<V> /*cur_*/            = iterator_t<V>();           // exposition-only
        subrange<iterator_t<V>> /*next_*/ = subrange<iterator_t<V>>(); // exposition-only
        bool /*trailing-empty_*/          = false;                     // exposition-only
     
      public:
        using iterator_concept  = forward_iterator_tag;
        using iterator_category = input_iterator_tag;
        using value_type        = subrange<iterator_t<V>>;
        using difference_type   = range_difference_t<V>;
     
        /*iterator*/()          = default;
        constexpr /*iterator*/(split_view& parent,
                               iterator_t<V> current,
                               subrange<iterator_t<V>> next);
     
        constexpr iterator_t<V> base() const;
        constexpr value_type operator*() const;
     
        constexpr /*iterator*/& operator++();
        constexpr /*iterator*/ operator++(int);
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y);
      };
    }
```

#### Modelo de classe std::ranges::split_view::sentinel
```
    namespace std::ranges {
      template<forward_range V, forward_range Pattern>
        requires view<V> && view<Pattern> &&
                 indirectly_comparable<iterator_t<V>, iterator_t<Pattern>, ranges::equal_to>
      struct split_view<V, Pattern>::/*sentinel*/
      {
      private:
        sentinel_t<V> /*end_*/ = sentinel_t<V>(); // exposition-only
     
      public:
        /*sentinel*/() = default;
        constexpr explicit /*sentinel*/(split_view& parent);
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*sentinel*/& y);
      };
    }
```

#### Modelo de classe std::ranges::concat
```
    namespace std::ranges {
      template<class... Rs>
      using /*concat-reference-t*/ =
        common_reference_t<range_reference_t<Rs>...>; // exposition-only
      template<class... Rs>
      using /*concat-value-t*/ = common_type_t<range_value_t<Rs>...>; // exposition-only
      template<class... Rs>
      using /*concat-rvalue-reference-t*/ = // exposition-only
        common_reference_t<range_rvalue_reference_t<Rs>...>;
     
      template<class... Rs>
      concept /*concat-indirectly-readable*/ = /* see description */; // exposition-only
      template<class... Rs>
      concept /*concatable*/ = /* see description */; // exposition-only
      template<bool Const, class... Rs>
      concept /*concat-is-random-access*/ = /* see description */; // exposition-only
      template<bool Const, class... Rs>
      concept /*concat-is-bidirectional*/ = /* see description */; // exposition-only
     
      template<input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0) && /*concatable*/<Views...>
      class concat_view : public view_interface<concat_view<Views...>>
      {
        tuple<Views...> /*views_*/; // exposition-only
     
        // class template concat_view::iterator
        template<bool>
        class /*iterator*/; // exposition-only
     
      public:
        constexpr concat_view() = default;
        constexpr explicit concat_view(Views... views);
     
        constexpr /*iterator*/<false> begin()
          requires(!(/*simple-view*/<Views> && ...));
        constexpr /*iterator*/<true> begin() const
          requires(range<const Views> && ...) && /*concatable*/<const Views...>;
     
        constexpr auto end()
          requires(!(/*simple-view*/<Views> && ...));
        constexpr auto end() const
          requires(range<const Views> && ...) && /*concatable*/<const Views...>;
     
        constexpr auto size()
          requires(sized_range<Views> && ...);
        constexpr auto size() const
          requires(sized_range<const Views> && ...);
      };
     
      template<class R, class P>
      concat_view(R&&, P&&) -> concat_view<views::all_t<R>, views::all_t<P>>;
     
      template<forward_range R>
      concat_view(R&&, range_value_t<R>)
        -> concat_view<views::all_t<R>, single_view<range_value_t<R>>>;
    }
```

#### Modelo de classe std::ranges::concat::iterator
```
    namespace std::ranges {
      template<input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0) && /*concatable*/<Views...>
      template<bool Const>
      class concat_view<Views...>::/*iterator*/
      {
      public:
        using iterator_category = /* see description */; // not always present
        using iterator_concept  = /* see description */;
        using value_type        = /*concat-value-t*/</*maybe-const*/<Const, Views>...>;
        using difference_type =
          common_type_t<range_difference_t</*maybe-const*/<Const, Views>>...>;
     
      private:
        using /*base-iter*/ = // exposition-only
          variant<iterator_t</*maybe-const*/<Const, Views>>...>;
     
        /*maybe-const*/<Const, concat_view>* /*parent_*/ = nullptr; // exposition-only
        /*base-iter*/ /*it_*/;                                      // exposition-only
     
        template<size_t N>
        constexpr void /*satisfy*/(); // exposition-only
        template<size_t N>
        constexpr void /*prev*/(); // exposition-only
     
        template<size_t N>
        constexpr void /*advance-fwd*/(difference_type offset, // exposition-only
                                       difference_type steps);
        template<size_t N>
        constexpr void /*advance-bwd*/(difference_type offset, // exposition-only
                                       difference_type steps);
     
        template<class... Args>
        constexpr explicit /*iterator*/(
          /*maybe-const*/<Const, concat_view>* parent, // exposition-only
          Args&&... args)
          requires constructible_from</*base-iter*/, Args&&...>;
     
      public:
        /*iterator*/() = default;
     
        constexpr /*iterator*/(iterator<!Const> i)
          requires Const &&
                   (convertible_to<iterator_t<Views>, iterator_t<const Views>> && ...);
     
        constexpr decltype(auto) operator*() const;
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires /*all-forward*/<Const, Views...>;
        constexpr /*iterator*/& operator--()
          requires /*concat-is-bidirectional*/<Const, Views...>;
        constexpr /*iterator*/ operator--(int)
          requires /*concat-is-bidirectional*/<Const, Views...>;
        constexpr /*iterator*/& operator+=(difference_type n)
          requires /*concat-is-random-access*/<Const, Views...>;
        constexpr /*iterator*/& operator-=(difference_type n)
          requires /*concat-is-random-access*/<Const, Views...>;
        constexpr decltype(auto) operator const
          requires /*concat-is-random-access*/<Const, Views...>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires(equality_comparable<iterator_t</*maybe-const*/<Const, Views>>> && ...);
        friend constexpr bool operator==(const /*iterator*/& it, default_sentinel_t);
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires /*all-random-access*/<Const, Views...>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires /*all-random-access*/<Const, Views...>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires /*all-random-access*/<Const, Views...>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires /*all-random-access*/<Const, Views...>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires(/*all-random-access*/<Const, Views...> &&
                   (three_way_comparable<iterator_t</*maybe-const*/<Const, Views>>> && ...));
        friend constexpr /*iterator*/ operator+(const /*iterator*/& it, difference_type n)
          requires /*concat-is-random-access*/<Const, Views...>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& it)
          requires /*concat-is-random-access*/<Const, Views...>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& it, difference_type n)
          requires /*concat-is-random-access*/<Const, Views...>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires /*concat-is-random-access*/<Const, Views...>;
        friend constexpr difference_type operator-(const /*iterator*/& x, default_sentinel_t)
          requires /* see description */;
        friend constexpr difference_type operator-(default_sentinel_t, const /*iterator*/& x)
          requires /* see description */;
        friend constexpr decltype(auto) iter_move(const /*iterator*/& it) noexcept(
          /* see description */);
        friend constexpr void iter_swap(const /*iterator*/& x,
                                        const /*iterator*/& y) noexcept(/* see description */)
          requires /* see description */;
      };
    }
```

#### Modelo de classe std::ranges::common_view
```
    namespace std::ranges {
      template<view V>
        requires(!common_range<V> && copyable<iterator_t<V>>)
      class common_view : public view_interface<common_view<V>>
      {
      private:
        V /*base_*/ = V(); // exposition-only
     
      public:
        common_view()
          requires default_initializable<V>
        = default;
     
        constexpr explicit common_view(V r);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (random_access_range<V> && sized_range<V>)
            return ranges::begin(/*base_*/);
          else
            return common_iterator<iterator_t<V>, sentinel_t<V>>(ranges::begin(/*base_*/));
        }
     
        constexpr auto begin() const
          requires range<const V>
        {
          if constexpr (random_access_range<const V> && sized_range<const V>)
            return ranges::begin(/*base_*/);
          else
            return common_iterator<iterator_t<const V>, sentinel_t<const V>>(
              ranges::begin(/*base_*/));
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (random_access_range<V> && sized_range<V>)
            return ranges::begin(/*base_*/) + ranges::distance(/*base_*/);
          else
            return common_iterator<iterator_t<V>, sentinel_t<V>>(ranges::end(/*base_*/));
        }
     
        constexpr auto end() const
          requires range<const V>
        {
          if constexpr (random_access_range<const V> && sized_range<const V>)
            return ranges::begin(/*base_*/) + ranges::distance(/*base_*/);
          else
            return common_iterator<iterator_t<const V>, sentinel_t<const V>>(
              ranges::end(/*base_*/));
        }
     
        constexpr auto size()
          requires sized_range<V>
        {
          return ranges::size(/*base_*/);
        }
        constexpr auto size() const
          requires sized_range<const V>
        {
          return ranges::size(/*base_*/);
        }
      };
     
      template<class R>
      common_view(R&&) -> common_view<views::all_t<R>>;
    }
```

#### Modelo de classe [std::ranges::reverse_view](<#/doc/ranges/reverse_view>)
```
    namespace std::ranges {
      template<view V>
        requires bidirectional_range<V>
      class reverse_view : public view_interface<reverse_view<V>>
      {
      private:
        V /*base_*/ = V(); // exposition-only
     
      public:
        reverse_view()
          requires default_initializable<V>
        = default;
     
        constexpr explicit reverse_view(V r);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr reverse_iterator<iterator_t<V>> begin();
        constexpr reverse_iterator<iterator_t<V>> begin()
          requires common_range<V>;
        constexpr auto begin() const
          requires common_range<const V>;
     
        constexpr reverse_iterator<iterator_t<V>> end();
        constexpr auto end() const
          requires common_range<const V>;
     
        constexpr auto size()
          requires sized_range<V>
        {
          return ranges::size(/*base_*/);
        }
     
        constexpr auto size() const
          requires sized_range<const V>
        {
          return ranges::size(/*base_*/);
        }
      };
     
      template<class R>
      reverse_view(R&&) -> reverse_view<views::all_t<R>>;
    }
```

#### Modelo de classe std::ranges::as_const_view
```
    namespace std::ranges {
      template<view V>
        requires input_range<V>
      class as_const_view : public view_interface<as_const_view<V>>
      {
        V /*base_*/ = V(); // exposition-only
     
      public:
        as_const_view()
          requires default_initializable<V>
        = default;
        constexpr explicit as_const_view(V base);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return ranges::cbegin(/*base_*/);
        }
        constexpr auto begin() const
          requires range<const V>
        {
          return ranges::cbegin(/*base_*/);
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          return ranges::cend(/*base_*/);
        }
        constexpr auto end() const
          requires range<const V>
        {
          return ranges::cend(/*base_*/);
        }
     
        constexpr auto size()
          requires sized_range<V>
        {
          return ranges::size(/*base_*/);
        }
        constexpr auto size() const
          requires sized_range<const V>
        {
          return ranges::size(/*base_*/);
        }
      };
     
      template<class R>
      as_const_view(R&&) -> as_const_view<views::all_t<R>>;
    }
```

#### Modelo de classe std::ranges::elements_view
```
    namespace std::ranges {
      template<class T, size_t N>
      concept /*has-tuple-element*/ = // exposition-only
        /*tuple-like*/<T> && N < tuple_size_v<T>;
     
      template<class T, size_t N>
      concept /*returnable-element*/ = // exposition-only
        is_reference_v<T> || move_constructible<tuple_element_t<N, T>>;
     
      template<input_range V, size_t N>
        requires view<V> && /*has-tuple-element*/<range_value_t<V>, N> &&
                 /*has-tuple-element*/<remove_reference_t<range_reference_t<V>>, N> &&
                 /*returnable-element*/<range_reference_t<V>, N>
      class elements_view : public view_interface<elements_view<V, N>>
      {
      public:
        elements_view()
          requires default_initializable<V>
        = default;
        constexpr explicit elements_view(V base);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return /*iterator*/<false>(ranges::begin(/*base_*/));
        }
     
        constexpr auto begin() const
          requires range<const V>
        {
          return /*iterator*/<true>(ranges::begin(/*base_*/));
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V> && !common_range<V>)
        {
          return /*sentinel*/<false>{ ranges::end(/*base_*/) };
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V> && common_range<V>)
        {
          return /*iterator*/<false>{ ranges::end(/*base_*/) };
        }
     
        constexpr auto end() const
          requires range<const V>
        {
          return /*sentinel*/<true>{ ranges::end(/*base_*/) };
        }
     
        constexpr auto end() const
          requires common_range<const V>
        {
          return /*iterator*/<true>{ ranges::end(/*base_*/) };
        }
     
        constexpr auto size()
          requires sized_range<V>
        {
          return ranges::size(/*base_*/);
        }
     
        constexpr auto size() const
          requires sized_range<const V>
        {
          return ranges::size(/*base_*/);
        }
     
      private:
        // class template elements_view::iterator
        template<bool>
        class /*iterator*/; // exposition-only
     
        // class template elements_view::sentinel
        template<bool>
        class /*sentinel*/; // exposition-only
     
        V /*base_*/ = V(); // exposition-only
      };
    }
```

#### Modelo de classe std::ranges::elements_view::iterator
```
    namespace std::ranges {
      template<input_range V, size_t N>
        requires view<V> && /*has-tuple-element*/<range_value_t<V>, N> &&
                 /*has-tuple-element*/<remove_reference_t<range_reference_t<V>>, N> &&
                 /*returnable-element*/<range_reference_t<V>, N>
      template<bool Const>
      class elements_view<V, N>::/*iterator*/
      {
        using /*Base*/                    = /*maybe-const*/<Const, V>; // exposition-only
     
        iterator_t</*Base*/> /*current_*/ = iterator_t</*Base*/>(); // exposition-only
     
        static constexpr decltype(auto) /*get-element*/(
          const iterator_t</*Base*/>& i); // exposition-only
     
      public:
        using iterator_concept  = /* see description */;
        using iterator_category = /* see description */; // not always present
        using value_type        = remove_cvref_t<tuple_element_t<N, range_value_t</*Base*/>>>;
        using difference_type   = range_difference_t</*Base*/>;
     
        /*iterator*/()
          requires default_initializable<iterator_t</*Base*/>>
        = default;
        constexpr explicit /*iterator*/(iterator_t</*Base*/> current);
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>>;
     
        constexpr const iterator_t</*Base*/>& base() const& noexcept;
        constexpr iterator_t</*Base*/> base() &&;
     
        constexpr decltype(auto) operator*() const { return /*get-element*/(/*current_*/); }
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires forward_range</*Base*/>;
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires random_access_range</*Base*/>;
     
        constexpr decltype(auto) operator const
          requires random_access_range</*Base*/>
        {
          return /*get-element*/(/*current_*/ + n);
        }
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires equality_comparable<iterator_t</*Base*/>>;
     
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/> && three_way_comparable<iterator_t</*Base*/>>
        ;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& x, difference_type y)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& x, difference_type y)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for<iterator_t</*Base*/>, iterator_t</*Base*/>>;
      };
    }
```

#### Modelo de classe std::ranges::elements_view::sentinel
```
    namespace std::ranges {
      template<input_range V, size_t N>
        requires view<V> && /*has-tuple-element*/<range_value_t<V>, N> &&
                 /*has-tuple-element*/<remove_reference_t<range_reference_t<V>>, N> &&
                 /*returnable-element*/<range_reference_t<V>, N>
      template<bool Const>
      class elements_view<V, N>::/*sentinel*/
      {
      private:
        using /*Base*/                = /*maybe-const*/<Const, V>; // exposition-only
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>();    // exposition-only
     
      public:
        /*sentinel*/() = default;
        constexpr explicit /*sentinel*/(sentinel_t</*Base*/> end);
        constexpr /*sentinel*/(/*sentinel*/<!Const> other)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        constexpr sentinel_t</*Base*/> base() const;
     
        template<bool OtherConst>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*iterator*/<OtherConst>& x,
          const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*sentinel*/& x,
          const /*iterator*/<OtherConst>& y);
      };
    }
```

#### Modelo de classe std::ranges::enumerate_view
```
    namespace std::ranges {
      template<view V>
        requires /*range-with-movable-references*/<V>
      class enumerate_view : public view_interface<enumerate_view<V>>
      {
        V /*base_*/ = V(); // exposition-only
     
        // class template enumerate_view::iterator
        template<bool Const>
        class /*iterator*/; // exposition-only
     
        // class template enumerate_view::sentinel
        template<bool Const>
        class /*sentinel*/; // exposition-only
     
      public:
        constexpr enumerate_view()
          requires default_initializable<V>
        = default;
        constexpr explicit enumerate_view(V base);
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return /*iterator*/<false>(ranges::begin(/*base_*/), 0);
        }
        constexpr auto begin() const
          requires /*range-with-movable-references*/<const V>
        {
          return /*iterator*/<true>(ranges::begin(/*base_*/), 0);
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (forward_range<V> && common_range<V> && sized_range<V>)
            return /*iterator*/<false>(ranges::end(/*base_*/), ranges::distance(/*base_*/));
          else
            return /*sentinel*/<false>(ranges::end(/*base_*/));
        }
        constexpr auto end() const
          requires /*range-with-movable-references*/<const V>
        {
          if constexpr (forward_range<const V> && common_range<const V> &&
                        sized_range<const V>)
            return /*iterator*/<true>(ranges::end(/*base_*/), ranges::distance(/*base_*/));
          else
            return /*sentinel*/<true>(ranges::end(/*base_*/));
        }
     
        constexpr auto size()
          requires sized_range<V>
        {
          return ranges::size(/*base_*/);
        }
        constexpr auto size() const
          requires sized_range<const V>
```
```cpp
        {
          return ranges::size(/*base_*/);
        }
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
      };
     
      template<class R>
      enumerate_view(R&&) -> enumerate_view<views::all_t<R>>;
    }
```

#### Modelo de classe std::ranges::enumerate_view::iterator
```cpp
    namespace std::ranges {
      template<view V>
        requires /*range-with-movable-references*/<V>
      template<bool Const>
      class enumerate_view<V>::/*iterator*/
      {
        using /*Base*/ = /*maybe-const*/<Const, V>; // apenas para exposição
     
      public:
        using iterator_category = input_iterator_tag;
        using iterator_concept  = /* veja a descrição */;
        using difference_type   = range_difference_t</*Base*/>;
        using value_type        = tuple<difference_type, range_value_t</*Base*/>>;
     
      private:
        using /*reference-type*/ = // apenas para exposição
          tuple<difference_type, range_reference_t</*Base*/>>;
        iterator_t</*Base*/> /*current_*/ = iterator_t</*Base*/>(); // apenas para exposição
        difference_type /*pos_*/          = 0;                      // apenas para exposição
     
        constexpr explicit /*iterator*/(iterator_t</*Base*/> current,
                                        difference_type pos); // apenas para exposição
     
      public:
        /*iterator*/()
          requires default_initializable<iterator_t</*Base*/>>
        = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>>;
     
        constexpr const iterator_t</*Base*/>& base() const& noexcept;
        constexpr iterator_t</*Base*/> base() &&;
     
        constexpr difference_type index() const noexcept;
     
        constexpr auto operator*() const
        {
          return /*reference-type*/(/*pos_*/, */*current_*/);
        }
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires forward_range</*Base*/>;
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires random_access_range</*Base*/>;
     
        constexpr auto operator const
          requires random_access_range</*Base*/>
        {
          return /*reference-type*/(/*pos_*/ + n, /*current_*/[n]);
        }
     
        friend constexpr bool operator==(const /*iterator*/& x,
                                         const /*iterator*/& y) noexcept;
        friend constexpr strong_ordering operator<=>(const /*iterator*/& x,
                                                     const /*iterator*/& y) noexcept;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& x, difference_type y)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& x, difference_type y)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y) noexcept;
     
        friend constexpr auto iter_move(const /*iterator*/& i) noexcept(
          noexcept(ranges::iter_move(i./*current_*/)) &&
          is_nothrow_move_constructible_v<range_rvalue_reference_t</*Base*/>>)
        {
          return tuple<difference_type, range_rvalue_reference_t</*Base*/>>(
            i./*pos_*/, ranges::iter_move(i./*current_*/));
        }
      };
    }
```

#### Modelo de classe std::ranges::enumerate_view::sentinel
```cpp
    namespace std::ranges {
      template<view V>
        requires /*range-with-movable-references*/<V>
      template<bool Const>
      class enumerate_view<V>::/*sentinel*/
      {
        using /*Base*/                = /*maybe-const*/<Const, V>; // apenas para exposição
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>();    // apenas para exposição
        constexpr explicit /*sentinel*/(sentinel_t</*Base*/> end); // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr /*sentinel*/(/*sentinel*/<!Const> other)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        constexpr sentinel_t</*Base*/> base() const;
     
        template<bool OtherConst>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*iterator*/<OtherConst>& x,
          const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*sentinel*/& x,
          const /*iterator*/<OtherConst>& y);
      };
    }
```

#### Modelo de classe std::ranges::zip_view
```cpp
    namespace std::ranges {
      template<class... Rs>
      concept /*zip-is-common*/ = // apenas para exposição
        (sizeof...(Rs) == 1 && (common_range<Rs> && ...)) ||
        (!(bidirectional_range<Rs> && ...) && (common_range<Rs> && ...)) ||
        ((random_access_range<Rs> && ...) && (sized_range<Rs> && ...));
     
      template<input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0)
      class zip_view : public view_interface<zip_view<Views...>>
      {
        tuple<Views...> /*views_*/; // apenas para exposição
     
        // modelo de classe zip_view::iterator
        template<bool>
        class /*iterator*/; // apenas para exposição
     
        // modelo de classe zip_view::sentinel
        template<bool>
        class /*sentinel*/; // apenas para exposição
     
      public:
        zip_view() = default;
        constexpr explicit zip_view(Views... views);
     
        constexpr auto begin()
          requires(!(/*simple-view*/<Views> && ...))
        {
          return /*iterator*/<false>(/*tuple-transform*/(ranges::begin, /*views_*/));
        }
        constexpr auto begin() const
          requires(range<const Views> && ...)
        {
          return /*iterator*/<true>(/*tuple-transform*/(ranges::begin, /*views_*/));
        }
     
        constexpr auto end()
          requires(!(/*simple-view*/<Views> && ...))
        {
          if constexpr (!/*zip-is-common*/<Views...>) {
            return /*sentinel*/<false>(/*tuple-transform*/(ranges::end, /*views_*/));
          } else if constexpr ((random_access_range<Views> && ...)) {
            return begin() + iter_difference_t</*iterator*/<false>>(size());
          } else {
            return /*iterator*/<false>(/*tuple-transform*/(ranges::end, /*views_*/));
          }
        }
     
        constexpr auto end() const
          requires(range<const Views> && ...)
        {
          if constexpr (!/*zip-is-common*/<const Views...>) {
            return /*sentinel*/<true>(/*tuple-transform*/(ranges::end, /*views_*/));
          } else if constexpr ((random_access_range<const Views> && ...)) {
            return begin() + iter_difference_t</*iterator*/<true>>(size());
          } else {
            return /*iterator*/<true>(/*tuple-transform*/(ranges::end, /*views_*/));
          }
        }
     
        constexpr auto size()
          requires(sized_range<Views> && ...);
        constexpr auto size() const
          requires(sized_range<const Views> && ...);
      };
     
      template<class... Rs>
      zip_view(Rs&&...) -> zip_view<views::all_t<Rs>...>;
    }
```

#### Modelo de classe std::ranges::zip_view::iterator
```cpp
    namespace std::ranges {
      template<input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0)
      template<bool Const>
      class zip_view<Views...>::/*iterator*/
      {
        tuple<iterator_t</*maybe-const*/<Const, Views>>...> /*current_*/; // apenas para exposição
        constexpr explicit /*iterator*/(tuple<iterator_t</*maybe-const*/<Const, Views>>...>);
        // apenas para exposição
      public:
        using iterator_category = input_iterator_tag; // nem sempre presente
        using iterator_concept  = /* veja a descrição */;
        using value_type        = tuple<range_value_t</*maybe-const*/<Const, Views>>...>;
        using difference_type =
          common_type_t<range_difference_t</*maybe-const*/<Const, Views>>...>;
     
        /*iterator*/() = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const &&
                   (convertible_to<iterator_t<Views>, iterator_t<const Views>> && ...);
     
        constexpr auto operator*() const;
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires /*all-forward*/<Const, Views...>;
     
        constexpr /*iterator*/& operator--()
          requires /*all-bidirectional*/<Const, Views...>;
        constexpr /*iterator*/ operator--(int)
          requires /*all-bidirectional*/<Const, Views...>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires /*all-random-access*/<Const, Views...>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires /*all-random-access*/<Const, Views...>;
     
        constexpr auto operator const
          requires /*all-random-access*/<Const, Views...>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires(equality_comparable<iterator_t</*maybe-const*/<Const, Views>>> && ...);
     
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires /*all-random-access*/<Const, Views...>;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& i, difference_type n)
          requires /*all-random-access*/<Const, Views...>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& i)
          requires /*all-random-access*/<Const, Views...>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& i, difference_type n)
          requires /*all-random-access*/<Const, Views...>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires(sized_sentinel_for<iterator_t</*maybe-const*/<Const, Views>>,
                                      iterator_t</*maybe-const*/<Const, Views>>> &&
                   ...);
     
        friend constexpr auto iter_move(const /*iterator*/& i) noexcept(
          /* veja a descrição */);
     
        friend constexpr void iter_swap(const /*iterator*/& l,
                                        const /*iterator*/& r) noexcept(/* veja a descrição */)
          requires(indirectly_swappable<iterator_t</*maybe-const*/<Const, Views>>> && ...);
      };
    }
```

#### Modelo de classe std::ranges::zip_view::sentinel
```cpp
    namespace std::ranges {
      template<input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0)
      template<bool Const>
      class zip_view<Views...>::/*sentinel*/
      {
        tuple<sentinel_t</*maybe-const*/<Const, Views>>...> /*end_*/; // apenas para exposição
        constexpr explicit /*sentinel*/(
          tuple<sentinel_t</*maybe-const*/<Const, Views>>...> end);   // apenas para exposição
      public:
        /*sentinel*/() = default;
        constexpr /*sentinel*/(/*sentinel*/<!Const> i)
          requires Const &&
                   (convertible_to<sentinel_t<Views>, sentinel_t<const Views>> && ...);
     
        template<bool OtherConst>
          requires(sentinel_for<sentinel_t</*maybe-const*/<Const, Views>>,
                                iterator_t</*maybe-const*/<OtherConst, Views>>> &&
                   ...)
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires(sized_sentinel_for<sentinel_t</*maybe-const*/<Const, Views>>,
                                      iterator_t</*maybe-const*/<OtherConst, Views>>> &&
                   ...)
        friend constexpr common_type_t<
          range_difference_t</*maybe-const*/<OtherConst, Views>>...>
        operator-(const /*iterator*/<OtherConst>& x, const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires(sized_sentinel_for<sentinel_t</*maybe-const*/<Const, Views>>,
                                      iterator_t</*maybe-const*/<OtherConst, Views>>> &&
                   ...)
        friend constexpr common_type_t<
          range_difference_t</*maybe-const*/<OtherConst, Views>>...>
        operator-(const /*sentinel*/& y, const /*iterator*/<OtherConst>& x);
      };
    }
```

#### Modelo de classe std::ranges::zip_transform_view
```cpp
    namespace std::ranges {
      template<move_constructible F, input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0) && is_object_v<F> &&
                regular_invocable<F&, range_reference_t<Views>...> &&
                /*can-reference*/<invoke_result_t<F&, range_reference_t<Views>...>>
      class zip_transform_view : public view_interface<zip_transform_view<F, Views...>>
      {
        /*movable-box*/<F> /*fun_*/; // apenas para exposição
        zip_view<Views...> /*zip_*/; // apenas para exposição
     
        using /*InnerView*/ = zip_view<Views...>; // apenas para exposição
        template<bool Const>
        using /*ziperator*/ =
          iterator_t</*maybe-const*/<Const, /*InnerView*/>>; // apenas para exposição
        template<bool Const>
        using /*zentinel*/ =
          sentinel_t</*maybe-const*/<Const, /*InnerView*/>>; // apenas para exposição
     
        // modelo de classe zip_transform_view::iterator
        template<bool>
        class /*iterator*/; // apenas para exposição
     
        // modelo de classe zip_transform_view::sentinel
        template<bool>
        class /*sentinel*/; // apenas para exposição
     
      public:
        zip_transform_view() = default;
     
        constexpr explicit zip_transform_view(F fun, Views... views);
     
        constexpr auto begin() { return /*iterator*/<false>(*this, /*zip_*/.begin()); }
     
        constexpr auto begin() const
          requires range<const /*InnerView*/> &&
                   regular_invocable<const F&, range_reference_t<const Views>...>
        {
          return /*iterator*/<true>(*this, /*zip_*/.begin());
        }
     
        constexpr auto end()
        {
          if constexpr (common_range</*InnerView*/>) {
            return /*iterator*/<false>(*this, /*zip_*/.end());
          } else {
            return /*sentinel*/<false>(/*zip_*/.end());
          }
        }
     
        constexpr auto end() const
          requires range<const /*InnerView*/> &&
                   regular_invocable<const F&, range_reference_t<const Views>...>
        {
          if constexpr (common_range<const /*InnerView*/>) {
            return /*iterator*/<true>(*this, /*zip_*/.end());
          } else {
            return /*sentinel*/<true>(/*zip_*/.end());
          }
        }
     
        constexpr auto size()
          requires sized_range</*InnerView*/>
        {
          return /*zip_*/.size();
        }
     
        constexpr auto size() const
          requires sized_range<const /*InnerView*/>
        {
          return /*zip_*/.size();
        }
      };
     
      template<class F, class... Rs>
      zip_transform_view(F, Rs&&...) -> zip_transform_view<F, views::all_t<Rs>...>;
    }
```

#### Modelo de classe std::ranges::zip_transform_view::iterator
```cpp
    namespace std::ranges {
      template<move_constructible F, input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0) && is_object_v<F> &&
                regular_invocable<F&, range_reference_t<Views>...> &&
                /*can-reference*/<invoke_result_t<F&, range_reference_t<Views>...>>
      template<bool Const>
      class zip_transform_view<F, Views...>::/*iterator*/
      {
        using /*Parent*/ = /*maybe-const*/<Const, zip_transform_view>; // apenas para exposição
        using /*Base*/   = /*maybe-const*/<Const, /*InnerView*/>;      // apenas para exposição
        /*Parent*/* /*parent_*/ = nullptr;                             // apenas para exposição
        /*ziperator*/<Const> /*inner_*/;                               // apenas para exposição
     
        constexpr /*iterator*/(/*Parent*/& parent,
                               /*ziperator*/<Const> inner); // apenas para exposição
     
      public:
        using iterator_category = /* veja a descrição */; // nem sempre presente
        using iterator_concept  = typename /*ziperator*/<Const>::iterator_concept;
        using value_type        = remove_cvref_t<
          invoke_result_t</*maybe-const*/<Const, F>&,
                          range_reference_t</*maybe-const*/<Const, Views>>...>>;
        using difference_type = range_difference_t</*Base*/>;
     
        /*iterator*/()        = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to</*ziperator*/<false>, /*ziperator*/<Const>>;
     
        constexpr decltype(auto) operator*() const noexcept(/* veja a descrição */);
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires forward_range</*Base*/>;
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires random_access_range</*Base*/>;
     
        constexpr decltype(auto) operator const
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires equality_comparable</*ziperator*/<Const>>;
     
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& i)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for</*ziperator*/<Const>, /*ziperator*/<Const>>;
      };
    }
```

#### Modelo de classe std::ranges::zip_transform_view::sentinel
```cpp
    namespace std::ranges {
      template<move_constructible F, input_range... Views>
        requires(view<Views> && ...) && (sizeof...(Views) > 0) && is_object_v<F> &&
                regular_invocable<F&, range_reference_t<Views>...> &&
                /*can-reference*/<invoke_result_t<F&, range_reference_t<Views>...>>
      template<bool Const>
      class zip_transform_view<F, Views...>::/*sentinel*/
      {
        /*zentinel*/<Const> /*inner_*/;                             // apenas para exposição
        constexpr explicit /*sentinel*/(/*zentinel*/<Const> inner); // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr /*sentinel*/(/*sentinel*/<!Const> i)
          requires Const && convertible_to</*zentinel*/<false>, /*zentinel*/<Const>>;
     
        template<bool OtherConst>
          requires sentinel_for</*zentinel*/<Const>, /*ziperator*/<OtherConst>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for</*zentinel*/<Const>, /*ziperator*/<OtherConst>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, /*InnerView*/>>
        operator-(const /*iterator*/<OtherConst>& x, const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for</*zentinel*/<Const>, /*ziperator*/<OtherConst>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, /*InnerView*/>>
        operator-(const /*sentinel*/& x, const /*iterator*/<OtherConst>& y);
      };
    }
```

#### Modelo de classe std::ranges::adjacent_view
```cpp
    namespace std::ranges {
      template<forward_range V, size_t N>
        requires view<V> && (N > 0)
      class adjacent_view : public view_interface<adjacent_view<V, N>>
      {
        V /*base_*/ = V(); // apenas para exposição
     
        // modelo de classe adjacent_view::iterator
        template<bool>
        class /*iterator*/; // apenas para exposição
     
        // modelo de classe adjacent_view::sentinel
        template<bool>
        class /*sentinel*/; // apenas para exposição
     
        struct /*as-sentinel*/
        {}; // apenas para exposição
     
      public:
        adjacent_view()
          requires default_initializable<V>
        = default;
        constexpr explicit adjacent_view(V base);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return /*iterator*/<false>(ranges::begin(/*base_*/), ranges::end(/*base_*/));
        }
     
        constexpr auto begin() const
          requires range<const V>
        {
          return /*iterator*/<true>(ranges::begin(/*base_*/), ranges::end(/*base_*/));
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (common_range<V>) {
            return /*iterator*/<false>(
              /*as-sentinel*/{}, ranges::begin(/*base_*/), ranges::end(/*base_*/));
          } else {
            return /*sentinel*/<false>(ranges::end(/*base_*/));
          }
        }
     
        constexpr auto end() const
          requires range<const V>
        {
          if constexpr (common_range<const V>) {
            return /*iterator*/<true>(
              /*as-sentinel*/{}, ranges::begin(/*base_*/), ranges::end(/*base_*/));
          } else {
            return /*sentinel*/<true>(ranges::end(/*base_*/));
          }
        }
     
        constexpr auto size()
          requires sized_range<V>;
        constexpr auto size() const
          requires sized_range<const V>;
      };
    }
```

#### Modelo de classe std::ranges::adjacent_view::iterator
```cpp
    namespace std::ranges {
      template<forward_range V, size_t N>
        requires view<V> && (N > 0)
      template<bool Const>
      class adjacent_view<V, N>::/*iterator*/
      {
        using /*Base*/ = /*maybe-const*/<Const, V>; // apenas para exposição
        array<iterator_t</*Base*/>, N> /*current_*/ =
          array<iterator_t</*Base*/>, N>(); // apenas para exposição
        constexpr /*iterator*/(iterator_t</*Base*/> first,
                               sentinel_t</*Base*/> last); // apenas para exposição
        constexpr /*iterator*/(/*as-sentinel*/,
                               iterator_t</*Base*/> first,
                               iterator_t</*Base*/> last);
        // apenas para exposição
      public:
        using iterator_category = input_iterator_tag;
        using iterator_concept  = /* veja a descrição */;
        using value_type        = tuple</*REPEAT*/(range_value_t</*Base*/>, N)...>;
        using difference_type   = range_difference_t</*Base*/>;
     
        /*iterator*/()          = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>>;
     
        constexpr auto operator*() const;
        constexpr /*iterator*/& operator++();
        constexpr /*iterator*/ operator++(int);
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires random_access_range</*Base*/>;
     
        constexpr auto operator const
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y);
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/> && three_way_comparable<iterator_t</*Base*/>>
        ;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& i)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for<iterator_t</*Base*/>, iterator_t</*Base*/>>;
     
        friend constexpr auto iter_move(const /*iterator*/& i) noexcept(
          /* veja a descrição */);
        friend constexpr void iter_swap(const /*iterator*/& l,
                                        const /*iterator*/& r) noexcept(/* veja a descrição */)
          requires indirectly_swappable<iterator_t</*Base*/>>;
      };
    }
```

#### Modelo de classe std::ranges::adjacent_view::sentinel
```cpp
    namespace std::ranges {
      template<forward_range V, size_t N>
        requires view<V> && (N > 0)
      template<bool Const>
      class adjacent_view<V, N>::/*sentinel*/
      {
        using /*Base*/                = /*maybe-const*/<Const, V>; // apenas para exposição
        sentinel_t</*Base*/> /*end_*/ = sentinel_t</*Base*/>();    // apenas para exposição
        constexpr explicit /*sentinel*/(sentinel_t</*Base*/> end); // apenas para exposição
     
      public:
        /*sentinel*/() = default;
        constexpr /*sentinel*/(/*sentinel*/<!Const> i)
          requires Const && convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        template<bool OtherConst>
          requires sentinel_for<sentinel_t</*Base*/>,
                                iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*iterator*/<OtherConst>& x,
          const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for<sentinel_t</*Base*/>,
                                      iterator_t</*maybe-const*/<OtherConst, V>>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, V>> operator-(
          const /*sentinel*/& y,
          const /*iterator*/<OtherConst>& x);
      };
    }
```

#### Modelo de classe std::ranges::adjacent_transform_view
```cpp
    namespace std::ranges {
      template<forward_range V, move_constructible F, size_t N>
        requires view<V> && (N > 0) && is_object_v<F> &&
                 regular_invocable<F&, /*REPEAT*/(range_reference_t<V>, N)...> &&
                 /*can-reference*/<
                   invoke_result_t<F&, /*REPEAT*/(range_reference_t<V>, N)...>>
      class adjacent_transform_view : public view_interface<adjacent_transform_view<V, F, N>>
      {
        /*movable-box*/<F> /*fun_*/;    // apenas para exposição
        adjacent_view<V, N> /*inner_*/; // apenas para exposição
     
        using /*InnerView*/ = adjacent_view<V, N>; // apenas para exposição
        template<bool Const>
        using /*inner-iterator*/ =
          iterator_t</*maybe-const*/<Const, /*InnerView*/>>; // apenas para exposição
        template<bool Const>
        using /*inner-sentinel*/ =
          sentinel_t</*maybe-const*/<Const, /*InnerView*/>>; // apenas para exposição
     
        // modelo de classe adjacent_transform_view::iterator
        template<bool>
        class /*iterator*/; // apenas para exposição
     
        // modelo de classe adjacent_transform_view::sentinel
        template<bool>
        class /*sentinel*/; // apenas para exposição
     
      public:
        adjacent_transform_view() = default;
        constexpr explicit adjacent_transform_view(V base, F fun);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*inner_*/.base();
        }
        constexpr V base() && { return std::move(/*inner_*/).base(); }
     
        constexpr auto begin() { return /*iterator*/<false>(*this, /*inner_*/.begin()); }
     
        constexpr auto begin() const
          requires range<const /*InnerView*/> &&
                   regular_invocable<const F&, /*REPEAT*/(range_reference_t<const V>, N)...>
        {
          return /*iterator*/<true>(*this, /*inner_*/.begin());
        }
     
        constexpr auto end()
        {
          if constexpr (common_range</*InnerView*/>) {
            return /*iterator*/<false>(*this, /*inner_*/.end());
          } else {
            return /*sentinel*/<false>(/*inner_*/.end());
          }
        }
     
        constexpr auto end() const
          requires range<const /*InnerView*/> &&
                   regular_invocable<const F&, /*REPEAT*/(range_reference_t<const V>, N)...>
        {
          if constexpr (common_range<const /*InnerView*/>) {
            return /*iterator*/<true>(*this, /*inner_*/.end());
          } else {
            return /*sentinel*/<true>(/*inner_*/.end());
          }
        }
     
        constexpr auto size()
          requires sized_range</*InnerView*/>
        {
          return /*inner_*/.size();
        }
     
        constexpr auto size() const
          requires sized_range<const /*InnerView*/>
        {
          return /*inner_*/.size();
        }
      };
    }
```
```
```cpp
                   regular_invocable<const F&, /*REPEAT*/(range_reference_t<const V>, N)...>
        {
          if constexpr (common_range<const /*InnerView*/>) {
            return /*iterator*/<true>(*this, /*inner_*/.end());
          } else {
            return /*sentinel*/<true>(/*inner_*/.end());
          }
        }
     
        constexpr auto size()
          requires sized_range</*InnerView*/>
        {
          return /*inner_*/.size();
        }
     
        constexpr auto size() const
          requires sized_range<const /*InnerView*/>
        {
          return /*inner_*/.size();
        }
      };
    }
```

#### Modelo de classe std::ranges::adjacent_transform_view::iterator
```cpp
    namespace std::ranges {
      template<forward_range V, move_constructible F, size_t N>
        requires view<V> && (N > 0) && is_object_v<F> &&
                 regular_invocable<F&, /*REPEAT*/(range_reference_t<V>, N)...> &&
                 /*can-reference*/<
                   invoke_result_t<F&, /*REPEAT*/(range_reference_t<V>, N)...>>
      template<bool Const>
      class adjacent_transform_view<V, F, N>::/*iterator*/
      {
        using /*Parent*/ = /*maybe-const*/<Const, adjacent_transform_view>; // exposition-only
        using /*Base*/   = /*maybe-const*/<Const, V>;                       // exposition-only
        /*Parent*/* /*parent_*/ = nullptr;                                  // exposition-only
        /*inner-iterator*/<Const> /*inner_*/;                               // exposition-only
     
        constexpr /*iterator*/(/*Parent*/& parent,
                               /*inner-iterator*/<Const> inner); // exposition-only
     
      public:
        using iterator_category = /* see description */;
        using iterator_concept  = typename /*inner-iterator*/<Const>::iterator_concept;
        using value_type =
          remove_cvref_t<invoke_result_t</*maybe-const*/<Const, F>&,
                                         /*REPEAT*/(range_reference_t</*Base*/>, N)...>>;
        using difference_type = range_difference_t</*Base*/>;
     
        /*iterator*/()        = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const
                   && convertible_to</*inner-iterator*/<false>, /*inner-iterator*/<Const>>;
     
        constexpr decltype(auto) operator*() const noexcept(/* see description */);
        constexpr /*iterator*/& operator++();
        constexpr /*iterator*/ operator++(int);
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/& operator+=(difference_type x)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires random_access_range</*Base*/>;
     
        constexpr decltype(auto) operator[](difference_type n) const
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y);
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/> &&
                   three_way_comparable</*inner-iterator*/<Const>>;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& i)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for</*inner-iterator*/<Const>, /*inner-iterator*/<Const>>;
      };
    }
```

#### Modelo de classe std::ranges::adjacent_transform_view::sentinel
```cpp
    namespace std::ranges {
      template<forward_range V, move_constructible F, size_t N>
        requires view<V> && (N > 0) && is_object_v<F> &&
                 regular_invocable<F&, /*REPEAT*/(range_reference_t<V>, N)...> &&
                 /*can-reference*/<
                   invoke_result_t<F&, /*REPEAT*/(range_reference_t<V>, N)...>>
      template<bool Const>
      class adjacent_transform_view<V, F, N>::/*sentinel*/
      {
        /*inner-sentinel*/<Const> /*inner_*/;                             // exposition-only
        constexpr explicit /*sentinel*/(/*inner-sentinel*/<Const> inner); // exposition-only
     
      public:
        /*sentinel*/() = default;
        constexpr /*sentinel*/(/*sentinel*/<!Const> i)
          requires Const
                   && convertible_to</*inner-sentinel*/<false>, /*inner-sentinel*/<Const>>;
     
        template<bool OtherConst>
          requires sentinel_for</*inner-sentinel*/<Const>, /*inner-iterator*/<OtherConst>>
        friend constexpr bool operator==(const /*iterator*/<OtherConst>& x,
                                         const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for</*inner-sentinel*/<Const>,
                                      /*inner-iterator*/<OtherConst>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, /*InnerView*/>>
        operator-(const /*iterator*/<OtherConst>& x, const /*sentinel*/& y);
     
        template<bool OtherConst>
          requires sized_sentinel_for</*inner-sentinel*/<Const>,
                                      /*inner-iterator*/<OtherConst>>
        friend constexpr range_difference_t</*maybe-const*/<OtherConst, /*InnerView*/>>
        operator-(const /*sentinel*/& x, const /*iterator*/<OtherConst>& y);
      };
    }
```

#### Modelo de classe std::ranges::chunk_view para `input_range`s
```cpp
    namespace std::ranges {
      template<class I>
      constexpr I /*div-ceil*/(I num, I denom)
      { // exposition-only
        I r = num / denom;
        if (num % denom)
          ++r;
        return r;
      }
     
      template<view V>
        requires input_range<V>
      class chunk_view : public view_interface<chunk_view<V>>
      {
        V /*base_*/;                              // exposition-only
        range_difference_t<V> /*n_*/;             // exposition-only
        range_difference_t<V> /*remainder_*/ = 0; // exposition-only
     
        /*non-propagating-cache*/<iterator_t<V>> /*current_*/; // exposition-only
     
        // class chunk_view::outer-iterator
        class /*outer-iterator*/; // exposition-only
     
        // class chunk_view::inner-iterator
        class /*inner-iterator*/; // exposition-only
     
      public:
        constexpr explicit chunk_view(V base, range_difference_t<V> n);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr /*outer-iterator*/ begin();
        constexpr default_sentinel_t end() const noexcept;
     
        constexpr auto size()
          requires sized_range<V>;
        constexpr auto size() const
          requires sized_range<const V>;
      };
     
      template<class R>
      chunk_view(R&&, range_difference_t<R>) -> chunk_view<[views::all_t](<#/doc/ranges/all_view>)<R>>;
    }
```

#### Modelo de classe std::ranges::chunk_view::outer_iterator para `input_range`s
```cpp
    namespace std::ranges {
      template<view V>
        requires input_range<V>
      class chunk_view<V>::/*outer-iterator*/
      {
        chunk_view* /*parent_*/; // exposition-only
     
        constexpr explicit /*outer-iterator*/(chunk_view& parent); // exposition-only
     
      public:
        using iterator_concept = input_iterator_tag;
        using difference_type  = range_difference_t<V>;
     
        // class chunk_view::outer-iterator::value_type
        struct value_type;
     
        /*outer-iterator*/(/*outer-iterator*/&&)            = default;
        /*outer-iterator*/& operator=(/*outer-iterator*/&&) = default;
     
        constexpr value_type operator*() const;
        constexpr /*outer-iterator*/& operator++();
        constexpr void operator++(int);
     
        friend constexpr bool operator==(const /*outer-iterator*/& x, default_sentinel_t);
     
        friend constexpr difference_type operator-(default_sentinel_t y,
                                                   const /*outer-iterator*/& x)
          requires sized_sentinel_for<sentinel_t<V>, iterator_t<V>>;
        friend constexpr difference_type operator-(const /*outer-iterator*/& x,
                                                   default_sentinel_t y)
          requires sized_sentinel_for<sentinel_t<V>, iterator_t<V>>;
      };
    }
```

#### Modelo de classe std::ranges::chunk_view::outer_iterator::value_type para `input_range`s
```cpp
    namespace std::ranges {
      template<view V>
        requires input_range<V>
      struct chunk_view<V>::/*outer-iterator*/::value_type : view_interface<value_type>
      {
      private:
        chunk_view* /*parent_*/; // exposition-only
     
        constexpr explicit value_type(chunk_view& parent); // exposition-only
     
      public:
        constexpr /*inner-iterator*/ begin() const noexcept;
        constexpr default_sentinel_t end() const noexcept;
     
        constexpr auto size() const
          requires sized_sentinel_for<sentinel_t<V>, iterator_t<V>>;
      };
    }
```

#### Modelo de classe std::ranges::chunk_view::inner_iterator para `input_range`s
```cpp
    namespace std::ranges {
      template<view V>
        requires input_range<V>
      class chunk_view<V>::/*inner-iterator*/
      {
        chunk_view* /*parent_*/; // exposition-only
     
        constexpr explicit /*inner-iterator*/(chunk_view& parent) noexcept; // exposition-only
     
      public:
        using iterator_concept                              = input_iterator_tag;
        using difference_type                               = range_difference_t<V>;
        using value_type                                    = range_value_t<V>;
     
        /*inner-iterator*/(/*inner-iterator*/&&)            = default;
        /*inner-iterator*/& operator=(/*inner-iterator*/&&) = default;
     
        constexpr const iterator_t<V>& base() const&;
     
        constexpr range_reference_t<V> operator*() const;
        constexpr /*inner-iterator*/& operator++();
        constexpr void operator++(int);
     
        friend constexpr bool operator==(const /*inner-iterator*/& x, default_sentinel_t);
     
        friend constexpr difference_type operator-(default_sentinel_t y,
                                                   const /*inner-iterator*/& x)
          requires sized_sentinel_for<sentinel_t<V>, iterator_t<V>>;
        friend constexpr difference_type operator-(const /*inner-iterator*/& x,
                                                   default_sentinel_t y)
          requires sized_sentinel_for<sentinel_t<V>, iterator_t<V>>;
     
        friend constexpr range_rvalue_reference_t<V>
        iter_move(const /*inner-iterator*/& i) noexcept(
          noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(*i./*parent_*/->/*current_*/)));
     
        friend constexpr void
        iter_swap(const /*inner-iterator*/& x, const /*inner-iterator*/& y) noexcept(noexcept(
          [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(*x./*parent_*/->/*current_*/, *y./*parent_*/->/*current_*/)))
          requires indirectly_swappable<iterator_t<V>>;
      };
    }
```

#### Modelo de classe std::ranges::chunk_view para `forward_range`s
```cpp
    namespace std::ranges {
      template<view V>
        requires forward_range<V>
      class chunk_view<V> : public view_interface<chunk_view<V>>
      {
        V /*base_*/;                  // exposition-only
        range_difference_t<V> /*n_*/; // exposition-only
     
        // class template chunk_view::iterator
        template<bool>
        class /*iterator*/; // exposition-only
     
      public:
        constexpr explicit chunk_view(V base, range_difference_t<V> n);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return /*iterator*/<false>(this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/));
        }
     
        constexpr auto begin() const
          requires forward_range<const V>
        {
          return /*iterator*/<true>(this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/));
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (common_range<V> && sized_range<V>) {
            auto missing = (/*n_*/ - [ranges::distance](<#/doc/iterator/ranges/distance>)(/*base_*/) % /*n_*/) % /*n_*/;
            return /*iterator*/<false>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/), missing);
          } else if constexpr (common_range<V> && !bidirectional_range<V>) {
            return /*iterator*/<false>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/));
          } else {
            return default_sentinel;
          }
        }
     
        constexpr auto end() const
          requires forward_range<const V>
        {
          if constexpr (common_range<const V> && sized_range<const V>) {
            auto missing = (/*n_*/ - [ranges::distance](<#/doc/iterator/ranges/distance>)(/*base_*/) % /*n_*/) % /*n_*/;
            return /*iterator*/<true>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/), missing);
          } else if constexpr (common_range<const V> && !bidirectional_range<const V>) {
            return /*iterator*/<true>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/));
          } else {
            return default_sentinel;
          }
        }
     
        constexpr auto size()
          requires sized_range<V>;
        constexpr auto size() const
          requires sized_range<const V>;
      };
     
      template<class R>
      chunk_view(R&&, range_difference_t<R>) -> chunk_view<[views::all_t](<#/doc/ranges/all_view>)<R>>;
    }
```

#### Modelo de classe std::ranges::chunk_view::iterator para `forward_range`s
```cpp
    namespace std::ranges {
      template<view V>
        requires forward_range<V>
      template<bool Const>
      class chunk_view<V>::/*iterator*/
      {
        using /*Parent*/ = /*maybe-const*/<Const, chunk_view>; // exposition-only
        using /*Base*/   = /*maybe-const*/<Const, V>;          // exposition-only
     
        iterator_t</*Base*/> /*current_*/         = iterator_t</*Base*/>(); // exposition-only
        sentinel_t</*Base*/> /*end_*/             = sentinel_t</*Base*/>(); // exposition-only
        range_difference_t</*Base*/> /*n_*/       = 0;                      // exposition-only
        range_difference_t</*Base*/> /*missing_*/ = 0;                      // exposition-only
     
        constexpr /*iterator*/(/*Parent*/* parent,
                               iterator_t</*Base*/> current, // exposition-only
                               range_difference_t</*Base*/> missing = 0);
     
      public:
        using iterator_category = input_iterator_tag;
        using iterator_concept  = /* see description */;
        using value_type = decltype([views::take](<#/doc/ranges/take_view>)(subrange(/*current_*/, /*end_*/), /*n_*/));
        using difference_type = range_difference_t</*Base*/>;
     
        /*iterator*/()        = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>> &&
                   convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        constexpr iterator_t</*Base*/> base() const;
     
        constexpr value_type operator*() const;
        constexpr /*iterator*/& operator++();
        constexpr /*iterator*/ operator++(int);
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires random_access_range</*Base*/>;
     
        constexpr value_type operator[](difference_type n) const
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y);
        friend constexpr bool operator==(const /*iterator*/& x, default_sentinel_t);
     
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/> && three_way_comparable<iterator_t</*Base*/>>
        ;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& i)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for<iterator_t</*Base*/>, iterator_t</*Base*/>>;
     
        friend constexpr difference_type operator-(default_sentinel_t y,
                                                   const /*iterator*/& x)
          requires sized_sentinel_for<sentinel_t</*Base*/>, iterator_t</*Base*/>>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   default_sentinel_t y)
          requires sized_sentinel_for<sentinel_t</*Base*/>, iterator_t</*Base*/>>;
      };
    }
```

#### Modelo de classe std::ranges::slide_view
```cpp
    namespace std::ranges {
      template<class V>
      concept /*slide-caches-nothing*/ =
        random_access_range<V> && sized_range<V>; // exposition-only
     
      template<class V>
      concept /*slide-caches-last*/ = // exposition-only
        !/*slide-caches-nothing*/<V> && bidirectional_range<V> && common_range<V>;
     
      template<class V>
      concept /*slide-caches-first*/ = // exposition-only
        !/*slide-caches-nothing*/<V> && !/*slide-caches-last*/<V>;
     
      template<forward_range V>
        requires view<V>
      class slide_view : public view_interface<slide_view<V>>
      {
        V /*base_*/;                  // exposition-only
        range_difference_t<V> /*n_*/; // exposition-only
     
        // class template slide_view::iterator
        template<bool>
        class /*iterator*/; // exposition-only
     
        // class slide_view::sentinel
        class /*sentinel*/; // exposition-only
     
      public:
        constexpr explicit slide_view(V base, range_difference_t<V> n);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr auto begin()
          requires(!(/*simple-view*/<V> && /*slide-caches-nothing*/<const V>));
        constexpr auto begin() const
          requires /*slide-caches-nothing*/<const V>;
     
        constexpr auto end()
          requires(!(/*simple-view*/<V> && /*slide-caches-nothing*/<const V>));
        constexpr auto end() const
          requires /*slide-caches-nothing*/<const V>;
     
        constexpr auto size()
          requires sized_range<V>;
        constexpr auto size() const
          requires sized_range<const V>;
      };
     
      template<class R>
      slide_view(R&&, range_difference_t<R>) -> slide_view<[views::all_t](<#/doc/ranges/all_view>)<R>>;
    }
```

#### Modelo de classe std::ranges::slide_view::iterator
```cpp
    namespace std::ranges {
      template<forward_range V>
        requires view<V>
      template<bool Const>
      class slide_view<V>::/*iterator*/
      {
        using /*Base*/                    = /*maybe-const*/<Const, V>; // exposition-only
        iterator_t</*Base*/> /*current_*/ = iterator_t</*Base*/>();    // exposition-only
        iterator_t</*Base*/> /*last-ele_*/ =
          iterator_t</*Base*/>(); // exposition-only
                                  // present only if Base models slide-caches-first
        range_difference_t</*Base*/> /*n_*/ = 0; // exposition-only
     
        constexpr /*iterator*/(iterator_t</*Base*/> current,
                               range_difference_t</*Base*/> n) // exposition-only
          requires(!/*slide-caches-first*/</*Base*/>);
     
        constexpr /*iterator*/(iterator_t</*Base*/> current,
                               iterator_t</*Base*/> last_ele, // exposition-only
                               range_difference_t</*Base*/> n)
          requires /*slide-caches-first*/</*Base*/>;
     
      public:
        using iterator_category = input_iterator_tag;
        using iterator_concept  = /* see description */;
        using value_type        = decltype([views::counted](<#/doc/ranges/counted_view>)(/*current_*/, /*n_*/));
        using difference_type   = range_difference_t</*Base*/>;
     
        /*iterator*/()          = default;
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>>;
     
        constexpr auto operator*() const;
        constexpr /*iterator*/& operator++();
        constexpr /*iterator*/ operator++(int);
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires random_access_range</*Base*/>;
     
        constexpr auto operator[](difference_type n) const
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y);
     
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/> && three_way_comparable<iterator_t</*Base*/>>
        ;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& i)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& i, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for<iterator_t</*Base*/>, iterator_t</*Base*/>>;
      };
    }
```

#### Modelo de classe std::ranges::slide_view::sentinel
```cpp
    namespace std::ranges {
      template<forward_range V>
        requires view<V>
      class slide_view<V>::/*sentinel*/
      {
        sentinel_t<V> /*end_*/ = sentinel_t<V>();           // exposition-only
        constexpr explicit /*sentinel*/(sentinel_t<V> end); // exposition-only
     
      public:
        /*sentinel*/() = default;
     
        friend constexpr bool operator==(const /*iterator*/<false>& x, const /*sentinel*/& y);
     
        friend constexpr range_difference_t<V> operator-(const /*iterator*/<false>& x,
                                                         const /*sentinel*/& y)
          requires sized_sentinel_for<sentinel_t<V>, iterator_t<V>>;
     
        friend constexpr range_difference_t<V> operator-(const /*sentinel*/& y,
                                                         const /*iterator*/<false>& x)
          requires sized_sentinel_for<sentinel_t<V>, iterator_t<V>>;
      };
    }
```

#### Modelo de classe std::ranges::chunk_by_view
```cpp
    namespace std::ranges {
      template<forward_range V, indirect_binary_predicate<iterator_t<V>, iterator_t<V>> Pred>
        requires view<V> && is_object_v<Pred>
      class chunk_by_view : public view_interface<chunk_by_view<V, Pred>>
      {
        V /*base_*/ = V();               // exposition-only
        /*movable-box*/<Pred> /*pred_*/; // exposition-only
     
        // class chunk_by_view::iterator
        class /*iterator*/; // exposition-only
     
      public:
        chunk_by_view()
          requires default_initializable<V> && default_initializable<Pred>
        = default;
        constexpr explicit chunk_by_view(V base, Pred pred);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr const Pred& pred() const;
     
        constexpr /*iterator*/ begin();
        constexpr auto end();
     
        constexpr iterator_t<V> /*find-next*/(iterator_t<V>); // exposition-only
        constexpr iterator_t<V> /*find-prev*/(iterator_t<V>)  // exposition-only
          requires bidirectional_range<V>;
      };
     
      template<class R, class Pred>
      chunk_by_view(R&&, Pred) -> chunk_by_view<[views::all_t](<#/doc/ranges/all_view>)<R>, Pred>;
    }
```

#### Modelo de classe std::ranges::chunk_by_view::iterator
```cpp
    namespace std::ranges {
      template<forward_range V, indirect_binary_predicate<iterator_t<V>, iterator_t<V>> Pred>
        requires view<V> && is_object_v<Pred>
      class chunk_by_view<V, Pred>::/*iterator*/
      {
        chunk_by_view* /*parent_*/ = nullptr;         // exposition-only
        iterator_t<V> /*current_*/ = iterator_t<V>(); // exposition-only
        iterator_t<V> /*next_*/    = iterator_t<V>(); // exposition-only
     
        constexpr /*iterator*/(chunk_by_view& parent,
                               iterator_t<V> current, // exposition-only
                               iterator_t<V> next);
     
      public:
        using value_type        = subrange<iterator_t<V>>;
        using difference_type   = range_difference_t<V>;
        using iterator_category = input_iterator_tag;
        using iterator_concept  = /* see description */;
     
        /*iterator*/()          = default;
     
        constexpr value_type operator*() const;
        constexpr /*iterator*/& operator++();
        constexpr /*iterator*/ operator++(int);
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range<V>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range<V>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y);
        friend constexpr bool operator==(const /*iterator*/& x, default_sentinel_t);
      };
    }
```

#### Modelo de classe std::ranges::stride_view
```cpp
    namespace std::ranges {
      template<input_range V>
        requires view<V>
      class stride_view : public view_interface<stride_view<V>>
      {
        V /*base_*/;                       // exposition-only
        range_difference_t<V> /*stride_*/; // exposition-only
        // class template stride_view::iterator
        template<bool>
        class /*iterator*/; // exposition-only
      public:
        constexpr explicit stride_view(V base, range_difference_t<V> stride);
     
        constexpr V base() const&
          requires copy_constructible<V>
        {
          return /*base_*/;
        }
        constexpr V base() && { return std::move(/*base_*/); }
     
        constexpr range_difference_t<V> stride() const noexcept;
     
        constexpr auto begin()
          requires(!/*simple-view*/<V>)
        {
          return /*iterator*/<false>(this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/));
        }
     
        constexpr auto begin() const
          requires range<const V>
        {
          return /*iterator*/<true>(this, [ranges::begin](<#/doc/ranges/begin>)(/*base_*/));
        }
     
        constexpr auto end()
          requires(!/*simple-view*/<V>)
        {
          if constexpr (common_range<V> && sized_range<V> && forward_range<V>) {
            auto missing =
              (/*stride_*/ - [ranges::distance](<#/doc/iterator/ranges/distance>)(/*base_*/) % /*stride_*/) % /*stride_*/;
            return /*iterator*/<false>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/), missing);
          } else if constexpr (common_range<V> && !bidirectional_range<V>) {
            return /*iterator*/<false>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/));
          } else {
            return default_sentinel;
          }
        }
     
        constexpr auto end() const
          requires range<const V>
        {
          if constexpr (common_range<const V> && sized_range<const V> &&
                        forward_range<const V>) {
            auto missing =
              (/*stride_*/ - [ranges::distance](<#/doc/iterator/ranges/distance>)(/*base_*/) % /*stride_*/) % /*stride_*/;
            return /*iterator*/<true>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/), missing);
          } else if constexpr (common_range<const V> && !bidirectional_range<const V>) {
            return /*iterator*/<true>(this, [ranges::end](<#/doc/ranges/end>)(/*base_*/));
          } else {
            return default_sentinel;
          }
        }
     
        constexpr auto size()
          requires sized_range<V>;
        constexpr auto size() const
          requires sized_range<const V>;
      };
     
      template<class R>
      stride_view(R&&, range_difference_t<R>) -> stride_view<[views::all_t](<#/doc/ranges/all_view>)<R>>;
    }
```

#### Modelo de classe std::ranges::stride_view::iterator
```cpp
    namespace std::ranges {
      // Conteúdo do modelo de classe std::ranges::stride_view::iterator
      // (Não fornecido no prompt original para tradução, apenas o cabeçalho)
    }
```
```cpp
    namespace std::ranges {
      template<input_range V>
        requires view<V>
      template<bool Const>
      class stride_view<V>::/*iterator*/
      {
        using /*Parent*/ = /*maybe-const*/<Const, stride_view>; // exposition-only
        using /*Base*/   = /*maybe-const*/<Const, V>;           // exposition-only
     
        iterator_t</*Base*/> /*current_*/         = iterator_t</*Base*/>(); // exposition-only
        sentinel_t</*Base*/> /*end_*/             = sentinel_t</*Base*/>(); // exposition-only
        range_difference_t</*Base*/> /*stride_*/  = 0;                      // exposition-only
        range_difference_t</*Base*/> /*missing_*/ = 0;                      // exposition-only
     
        constexpr /*iterator*/(/*Parent*/* parent,
                               iterator_t</*Base*/> current, // exposition-only
                               range_difference_t</*Base*/> missing = 0);
     
      public:
        using difference_type   = range_difference_t</*Base*/>;
        using value_type        = range_value_t</*Base*/>;
        using iterator_concept  = /* see description */;
        using iterator_category = /* see description */; // not always present
     
        /*iterator*/()
          requires default_initializable<iterator_t</*Base*/>>
        = default;
     
        constexpr /*iterator*/(/*iterator*/<!Const> other)
          requires Const && convertible_to<iterator_t<V>, iterator_t</*Base*/>> &&
                   convertible_to<sentinel_t<V>, sentinel_t</*Base*/>>;
     
        constexpr iterator_t</*Base*/> base() &&;
        constexpr const iterator_t</*Base*/>& base() const& noexcept;
     
        constexpr decltype(auto) operator*() const { return */*current_*/; }
     
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires forward_range</*Base*/>;
     
        constexpr /*iterator*/& operator--()
          requires bidirectional_range</*Base*/>;
        constexpr /*iterator*/ operator--(int)
          requires bidirectional_range</*Base*/>;
     
        constexpr /*iterator*/& operator+=(difference_type n)
          requires random_access_range</*Base*/>;
        constexpr /*iterator*/& operator-=(difference_type n)
          requires random_access_range</*Base*/>;
     
        constexpr decltype(auto) operator[](difference_type n) const
          requires random_access_range</*Base*/>
        {
          return *(*this + n);
        }
     
        friend constexpr bool operator==(const /*iterator*/& x, default_sentinel_t);
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires equality_comparable<iterator_t</*Base*/>>;
     
        friend constexpr bool operator<(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator<=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
     
        friend constexpr bool operator>=(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/>;
     
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires random_access_range</*Base*/> && three_way_comparable<iterator_t</*Base*/>>
        ;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& x, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator+(difference_type n, const /*iterator*/& x)
          requires random_access_range</*Base*/>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& x, difference_type n)
          requires random_access_range</*Base*/>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires sized_sentinel_for<iterator_t</*Base*/>, iterator_t</*Base*/>>;
     
        friend constexpr difference_type operator-(default_sentinel_t y,
                                                   const /*iterator*/& x)
          requires sized_sentinel_for<sentinel_t</*Base*/>, iterator_t</*Base*/>>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   default_sentinel_t y)
          requires sized_sentinel_for<sentinel_t</*Base*/>, iterator_t</*Base*/>>;
     
        friend constexpr range_rvalue_reference_t</*Base*/> iter_move(
          const /*iterator*/& i) noexcept(noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i./*current_*/)));
     
        friend constexpr void iter_swap(
          const /*iterator*/& x,
          const /*iterator*/& y) noexcept(noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x./*current_*/,
                                                                     y./*current_*/)))
          requires indirectly_swappable<iterator_t</*Base*/>>;
      };
    }
```

#### Modelo de classe std::ranges::cartesian_product_view
```cpp
    namespace std::ranges {
      template<bool Const, class First, class... Vs>
      concept /*cartesian-product-is-random-access*/ = // exposition-only
        (random_access_range</*maybe-const*/<Const, First>> && ... &&
         (random_access_range</*maybe-const*/<Const, Vs>> &&
          sized_range</*maybe-const*/<Const, Vs>>));
     
      template<class R>
      concept /*cartesian-product-common-arg*/ = // exposition-only
        common_range<R> || (sized_range<R> && random_access_range<R>);
     
      template<bool Const, class First, class... Vs>
      concept /*cartesian-product-is-bidirectional*/ = // exposition-only
        (bidirectional_range</*maybe-const*/<Const, First>> && ... &&
         (bidirectional_range</*maybe-const*/<Const, Vs>> &&
          /*cartesian-product-common-arg*/</*maybe-const*/<Const, Vs>>));
     
      template<class First, class...>
      concept /*cartesian-product-is-common*/ = // exposition-only
        /*cartesian-product-common-arg*/<First>;
     
      template<class... Vs>
      concept /*cartesian-product-is-sized*/ = // exposition-only
        (sized_range<Vs> && ...);
     
      template<bool Const, template<class> class FirstSent, class First, class... Vs>
      concept /*cartesian-is-sized-sentinel*/ = // exposition-only
        (sized_sentinel_for<FirstSent</*maybe-const*/<Const, First>>,
                            iterator_t</*maybe-const*/<Const, First>>> &&
         ... &&
         (sized_range</*maybe-const*/<Const, Vs>> &&
          sized_sentinel_for<iterator_t</*maybe-const*/<Const, Vs>>,
                             iterator_t</*maybe-const*/<Const, Vs>>>));
     
      template</*cartesian-product-common-arg*/ R>
      constexpr auto /*cartesian-common-arg-end*/(R& r)
      { // exposition-only
        if constexpr (common_range<R>) {
          return [ranges::end](<#/doc/ranges/end>)(r);
        } else {
          return [ranges::begin](<#/doc/ranges/begin>)(r) + [ranges::distance](<#/doc/iterator/ranges/distance>)(r);
        }
      }
     
      template<input_range First, forward_range... Vs>
        requires(view<First> && ... && view<Vs>)
      class cartesian_product_view
        : public view_interface<cartesian_product_view<First, Vs...>>
      {
      private:
        tuple<First, Vs...> /*bases_*/; // exposition-only
        // class template cartesian_product_view::iterator
        template<bool Const>
        class /*iterator*/; // exposition-only
     
      public:
        constexpr cartesian_product_view() = default;
        constexpr explicit cartesian_product_view(First first_base, Vs... bases);
     
        constexpr /*iterator*/<false> begin()
          requires(!/*simple-view*/<First> || ... || !/*simple-view*/<Vs>);
        constexpr /*iterator*/<true> begin() const
          requires(range<const First> && ... && range<const Vs>);
     
        constexpr /*iterator*/<false> end()
          requires((!/*simple-view*/<First> || ... || !/*simple-view*/<Vs>) &&
                   /*cartesian-product-is-common*/<First, Vs...>);
        constexpr /*iterator*/<true> end() const
          requires /*cartesian-product-is-common*/<const First, const Vs...>;
        constexpr default_sentinel_t end() const noexcept;
     
        constexpr /* see description */ size()
          requires /*cartesian-product-is-sized*/<First, Vs...>;
        constexpr /* see description */ size() const
          requires /*cartesian-product-is-sized*/<const First, const Vs...>;
      };
     
      template<class... Vs>
      cartesian_product_view(Vs&&...) -> cartesian_product_view<[views::all_t](<#/doc/ranges/all_view>)<Vs>...>;
    }
```

#### Modelo de classe std::ranges::cartesian_product_view::iterator
```cpp
    namespace std::ranges {
      template<input_range First, forward_range... Vs>
        requires(view<First> && ... && view<Vs>)
      template<bool Const>
      class cartesian_product_view<First, Vs...>::/*iterator*/
      {
      public:
        using iterator_category = input_iterator_tag;
        using iterator_concept  = /* see description */;
        using value_type        = tuple<range_value_t</*maybe-const*/<Const, First>>,
                                 range_value_t</*maybe-const*/<Const, Vs>>...>;
        using reference         = tuple<range_reference_t</*maybe-const*/<Const, First>>,
                                range_reference_t</*maybe-const*/<Const, Vs>>...>;
        using difference_type   = /* see description */;
     
        /*iterator*/()          = default;
     
        constexpr /*iterator*/(/*iterator*/<!Const> i)
          requires Const && (convertible_to<iterator_t<First>, iterator_t<const First>> &&
                             ... && convertible_to<iterator_t<Vs>, iterator_t<const Vs>>);
     
        constexpr auto operator*() const;
        constexpr /*iterator*/& operator++();
        constexpr void operator++(int);
        constexpr /*iterator*/ operator++(int)
          requires forward_range</*maybe-const*/<Const, First>>;
     
        constexpr /*iterator*/& operator--()
          requires /*cartesian-product-is-bidirectional*/<Const, First, Vs...>;
        constexpr /*iterator*/ operator--(int)
          requires /*cartesian-product-is-bidirectional*/<Const, First, Vs...>;
     
        constexpr /*iterator*/& operator+=(difference_type x)
          requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;
        constexpr /*iterator*/& operator-=(difference_type x)
          requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;
     
        constexpr reference operator[](difference_type n) const
          requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;
     
        friend constexpr bool operator==(const /*iterator*/& x, const /*iterator*/& y)
          requires equality_comparable<iterator_t</*maybe-const*/<Const, First>>>;
     
        friend constexpr bool operator==(const /*iterator*/& x, default_sentinel_t);
     
        friend constexpr auto operator<=>(const /*iterator*/& x, const /*iterator*/& y)
          requires /*all-random-access*/<Const, First, Vs...>;
     
        friend constexpr /*iterator*/ operator+(const /*iterator*/& x, difference_type y)
          requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;
        friend constexpr /*iterator*/ operator+(difference_type x, const /*iterator*/& y)
          requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;
        friend constexpr /*iterator*/ operator-(const /*iterator*/& x, difference_type y)
          requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;
        friend constexpr difference_type operator-(const /*iterator*/& x,
                                                   const /*iterator*/& y)
          requires /*cartesian-is-sized-sentinel*/<Const, iterator_t, First, Vs...>;
     
        friend constexpr difference_type operator-(const /*iterator*/& i, default_sentinel_t)
          requires /*cartesian-is-sized-sentinel*/<Const, sentinel_t, First, Vs...>;
        friend constexpr difference_type operator-(default_sentinel_t, const /*iterator*/& i)
          requires /*cartesian-is-sized-sentinel*/<Const, sentinel_t, First, Vs...>;
     
        friend constexpr auto iter_move(const /*iterator*/& i) noexcept(
          /* see description */);
     
        friend constexpr void iter_swap(const /*iterator*/& l,
                                        const /*iterator*/& r) noexcept(/* see description */)
          requires(indirectly_swappable<iterator_t</*maybe-const*/<Const, First>>> && ... &&
                   indirectly_swappable<iterator_t</*maybe-const*/<Const, Vs>>>);
     
      private:
        using /*Parent*/ = /*maybe-const*/<Const, cartesian_product_view>; // exposition-only
        /*Parent*/* /*parent_*/ = nullptr;                                 // exposition-only
        tuple<iterator_t</*maybe-const*/<Const, First>>,
              iterator_t</*maybe-const*/<Const, Vs>>...>
          /*current_*/; // exposition-only
     
        template<size_t N = sizeof...(Vs)>
        constexpr void /*next*/(); // exposition-only
     
        template<size_t N = sizeof...(Vs)>
        constexpr void /*prev*/(); // exposition-only
     
        template<class Tuple>
        constexpr difference_type /*distance-from*/(const Tuple& t) const; // exposition-only
     
        constexpr /*iterator*/(
          /*Parent*/& parent,
          tuple<iterator_t</*maybe-const*/<Const, First>>,
                iterator_t</*maybe-const*/<Const, Vs>>...> current); // exposition-only
      };
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
LWG 3914 | C++23  | a restrição de std::ranges::enumerate_view está incorretamente especificada na sinopse  | corrigido
```