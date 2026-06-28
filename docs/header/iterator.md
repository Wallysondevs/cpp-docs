# Cabeçalho da biblioteca padrão &lt;iterator&gt;

Este cabeçalho faz parte da biblioteca [iterator](<#/doc/iterator>).

Este cabeçalho é um cabeçalho [freestanding](<#/doc/freestanding>) parcial. Tudo dentro deste cabeçalho é freestanding, exceto os iteradores de stream. | (desde C++23)

### Conceitos

---

##### Conceitos de Iterator

[ indirectly_readable](<#/doc/iterator/indirectly_readable>)(C++20) | especifica que um tipo é indiretamente legível aplicando o operador `*`
(concept)
[ indirectly_writable](<#/doc/iterator/indirectly_writable>)(C++20) | especifica que um valor pode ser escrito no objeto referenciado por um iterator
(concept)
[ weakly_incrementable](<#/doc/iterator/weakly_incrementable>)(C++20) | especifica que um tipo [`semiregular`](<#/doc/concepts/semiregular>) pode ser incrementado com operadores de pré e pós-incremento
(concept)
[ incrementable](<#/doc/iterator/incrementable>)(C++20) | especifica que a operação de incremento em um tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>) preserva a [igualdade](<#/doc/concepts>) e que o tipo é [`equality_comparable`](<#/doc/concepts/equality_comparable>)
(concept)
[ input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>)(C++20) | especifica que objetos de um tipo podem ser incrementados e desreferenciados
(concept)
[ sentinel_for](<#/doc/iterator/sentinel_for>)(C++20) | especifica que um tipo é um sentinel para um tipo [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>)
(concept)
[ sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)(C++20) | especifica que o operador - pode ser aplicado a um iterator e um sentinel para calcular sua diferença em tempo constante
(concept)
[ input_iterator](<#/doc/iterator/input_iterator>)(C++20) | especifica que um tipo é um input iterator, ou seja, seus valores referenciados podem ser lidos e ele pode ser pré e pós-incrementado
(concept)
[ output_iterator](<#/doc/iterator/output_iterator>)(C++20) | especifica que um tipo é um output iterator para um dado tipo de valor, ou seja, valores desse tipo podem ser escritos nele e ele pode ser pré e pós-incrementado
(concept)
[ forward_iterator](<#/doc/iterator/forward_iterator>)(C++20) | especifica que um [`input_iterator`](<#/doc/iterator/input_iterator>) é um forward iterator, suportando comparação de igualdade e multi-pass
(concept)
[ bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>)(C++20) | especifica que um [`forward_iterator`](<#/doc/iterator/forward_iterator>) é um bidirectional iterator, suportando movimento para trás
(concept)
[ random_access_iterator](<#/doc/iterator/random_access_iterator>)(C++20) | especifica que um [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) é um random-access iterator, suportando avanço em tempo constante e indexação
(concept)
[ contiguous_iterator](<#/doc/iterator/contiguous_iterator>)(C++20) | especifica que um [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) é um contiguous iterator, referindo-se a elementos que são contíguos na memória
(concept)

##### Conceitos de Chamáveis Indiretos

[ indirectly_unary_invocableindirectly_regular_unary_invocable](<#/doc/iterator/indirectly_unary_invocable>)(C++20)(C++20) | especifica que um tipo chamável pode ser invocado com o resultado da desreferenciação de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
(concept)
[ indirect_unary_predicate](<#/doc/iterator/indirect_unary_predicate>)(C++20) | especifica que um tipo chamável, quando invocado com o resultado da desreferenciação de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`predicate`](<#/doc/concepts/predicate>)
(concept)
[ indirect_binary_predicate](<#/doc/iterator/indirect_binary_predicate>)(C++20) | especifica que um tipo chamável, quando invocado com o resultado da desreferenciação de dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`predicate`](<#/doc/concepts/predicate>)
(concept)
[ indirect_equivalence_relation](<#/doc/iterator/indirect_equivalence_relation>)(C++20) | especifica que um tipo chamável, quando invocado com o resultado da desreferenciação de dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`equivalence_relation`](<#/doc/concepts/equivalence_relation>)
(concept)
[ indirect_strict_weak_order](<#/doc/iterator/indirect_strict_weak_order>)(C++20) | especifica que um tipo chamável, quando invocado com o resultado da desreferenciação de dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`strict_weak_order`](<#/doc/concepts/strict_weak_order>)
(concept)

##### Requisitos Comuns de Algoritmos

[ indirectly_movable](<#/doc/iterator/indirectly_movable>)(C++20) | especifica que valores podem ser movidos de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
(concept)
[ indirectly_movable_storable](<#/doc/iterator/indirectly_movable_storable>)(C++20) | especifica que valores podem ser movidos de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e que a movimentação pode ser realizada através de um objeto intermediário
(concept)
[ indirectly_copyable](<#/doc/iterator/indirectly_copyable>)(C++20) | especifica que valores podem ser copiados de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
(concept)
[ indirectly_copyable_storable](<#/doc/iterator/indirectly_copyable_storable>)(C++20) | especifica que valores podem ser copiados de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e que a cópia pode ser realizada através de um objeto intermediário
(concept)
[ indirectly_swappable](<#/doc/iterator/indirectly_swappable>)(C++20) | especifica que os valores referenciados por dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) podem ser trocados
(concept)
[ indirectly_comparable](<#/doc/iterator/indirectly_comparable>)(C++20) | especifica que os valores referenciados por dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) podem ser comparados
(concept)
[ permutable](<#/doc/iterator/permutable>)(C++20) | especifica os requisitos comuns de algoritmos que reordenam elementos no local
(concept)
[ mergeable](<#/doc/iterator/mergeable>)(C++20) | especifica os requisitos de algoritmos que mesclam sequências ordenadas em uma sequência de saída copiando elementos
(concept)
[ sortable](<#/doc/iterator/sortable>)(C++20) | especifica os requisitos comuns de algoritmos que permutam sequências em sequências ordenadas
(concept)

### Classes

##### Utilitários de Algoritmos

[ indirect_result_t](<#/doc/iterator/indirect_result_t>)(C++20) | calcula o resultado de invocar um objeto chamável no resultado da desreferenciação de um conjunto de tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
(alias template)
[ projected](<#/doc/iterator/projected>)(C++20) | template auxiliar para especificar as restrições em algoritmos que aceitam projeções
(class template)
[ projected_value_t](<#/doc/iterator/projected_value_t>)(C++26) | calcula o tipo de valor de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) por projeção
(alias template)

##### Tipos Associados

[ incrementable_traits](<#/doc/iterator/incrementable_traits>)(C++20) | calcula o tipo de diferença de um tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
(class template)
[ indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)(C++20) | calcula o tipo de valor de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
(class template)
[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) | calcula os tipos associados de um iterator
(alias template)

##### Primitivos

[ iterator_traits](<#/doc/iterator/iterator_traits>) | fornece interface uniforme para as propriedades de um iterator
(class template)
[ input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tagcontiguous_iterator_tag](<#/doc/iterator/iterator_tags>)(C++20) | tipos de classe vazios usados para indicar categorias de iterator
(class)
[ iterator](<#/doc/iterator/iterator>)(obsoleto desde C++17) | classe base para facilitar a definição de tipos necessários para iterators simples
(class template)

##### Adaptadores

[ reverse_iterator](<#/doc/iterator/reverse_iterator>) | adaptador de iterator para travessia em ordem inversa
(class template)
[ move_iterator](<#/doc/iterator/move_iterator>)(C++11) | adaptador de iterator que desreferencia para um rvalue
(class template)
[ move_sentinel](<#/doc/iterator/move_sentinel>)(C++20) | adaptador de sentinel para [std::move_iterator](<#/doc/iterator/move_iterator>)
(class template)
[ basic_const_iterator](<#/doc/iterator/basic_const_iterator>)(C++23) | adaptador de iterator que converte um iterator em um iterator constante
(class template)
[ const_iterator](<#/doc/iterator/const_iterator>)(C++23) | calcula um tipo de iterator constante para um dado tipo
(alias template)
[ const_sentinel](<#/doc/iterator/const_sentinel>)(C++23) | calcula um tipo de sentinel a ser usado com iterators constantes
(alias template)
[ common_iterator](<#/doc/iterator/common_iterator>)(C++20) | adapta um tipo de iterator e seu sentinel em um tipo de iterator comum
(class template)
[ default_sentinel_t](<#/doc/iterator/default_sentinel>)(C++20) | sentinel padrão para uso com iterators que conhecem o limite de seu range
(class)
[ counted_iterator](<#/doc/iterator/counted_iterator>)(C++20) | adaptador de iterator que rastreia a distância até o final do range
(class template)
[ unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>)(C++20) | sentinel que sempre compara como diferente de qualquer tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
(class)
[ back_insert_iterator](<#/doc/iterator/back_insert_iterator>) | adaptador de iterator para inserção no final de um container
(class template)
[ front_insert_iterator](<#/doc/iterator/front_insert_iterator>) | adaptador de iterator para inserção no início de um container
(class template)
[ insert_iterator](<#/doc/iterator/insert_iterator>) | adaptador de iterator para inserção em um container
(class template)

##### Iterators de Stream

[ istream_iterator](<#/doc/iterator/istream_iterator>) | input iterator que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(class template)
[ ostream_iterator](<#/doc/iterator/ostream_iterator>) | output iterator que escreve para [std::basic_ostream](<#/doc/io/basic_ostream>)
(class template)
[ istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) | input iterator que lê de [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(class template)
[ ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) | output iterator que escreve para [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(class template)

### Objetos de Ponto de Customização

Definido no namespace `std::ranges`

```cpp
 iter_move(C++20)
(customization point object)
 iter_swap(C++20)
(customization point object)
```

### Constantes

[ unreachable_sentinel](<#/doc/iterator/unreachable_sentinel_t>)(C++20) | um objeto do tipo `unreachable_sentinel_t` que sempre compara como diferente de qualquer tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
(constant)
[ default_sentinel](<#/doc/iterator/default_sentinel>)(C++20) | um objeto do tipo `default_sentinel_t` usado com iterators que conhecem o limite de seu range
(constant)

### Funções

##### Adaptadores

[ make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)(C++14) | cria um [std::reverse_iterator](<#/doc/iterator/reverse_iterator>) de tipo inferido a partir do argumento
(function template)
[ make_move_iterator](<#/doc/iterator/make_move_iterator>)(C++11) | cria um [std::move_iterator](<#/doc/iterator/move_iterator>) de tipo inferido a partir do argumento
(function template)
[ make_const_iterator](<#/doc/iterator/make_const_iterator>)(C++23) | cria um std::const_iterator de tipo inferido a partir do argumento
(function template)
[ make_const_sentinel](<#/doc/iterator/make_const_sentinel>)(C++23) | cria um std::const_sentinel de tipo inferido a partir do argumento
(function template)
[ front_inserter](<#/doc/iterator/front_inserter>) | cria um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) de tipo inferido a partir do argumento
(function template)
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_inserter>) de tipo inferido a partir do argumento
(function template)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(function template)

##### Operadores Não-membros

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/iterator/move_iterator/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara os iterators subjacentes
(function template)
[ operator+](<#/>)(C++11) | avança o iterator
(function template)
[ operator-](<#/doc/iterator/move_iterator/operator->)(C++11) | calcula a distância entre dois adaptadores de iterator
(function template)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/iterator/reverse_iterator/operator_cmp>)(C++20) | compara os iterators subjacentes
(function template)
[ operator+](<#/>) | avança o iterator
(function template)
[ operator-](<#/doc/iterator/reverse_iterator/operator->) | calcula a distância entre dois adaptadores de iterator
(function template)
[ operator==operator<=>](<#/doc/iterator/counted_iterator/operator_cmp>)(C++20) | compara as distâncias até o final
(function template)
[ operator+](<#/>)(C++20) | avança o iterator
(function template)
[ operator-](<#/doc/iterator/counted_iterator/operator->)(C++20) | calcula a distância entre dois adaptadores de iterator
(function template)
[ operator==operator!=](<#/doc/iterator/istream_iterator/operator_cmp>)(removido em C++20) | compara dois `istream_iterator`s
(function template)
[ operator==operator!=](<#/doc/iterator/istreambuf_iterator/operator_cmp>)(removido em C++20) | compara dois `istreambuf_iterator`s
(function template)

##### Operações

[ advance](<#/doc/iterator/advance>) | avança um iterator por uma dada distância
(function template)
[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iterators
(function template)
[ next](<#/doc/iterator/next>)(C++11) | incrementa um iterator
(function template)
[ prev](<#/doc/iterator/prev>)(C++11) | decrementa um iterator
(function template)
[ ranges::advance](<#/doc/iterator/ranges/advance>)(C++20) | avança um iterator por uma dada distância ou até um limite dado
(algorithm function object)
[ ranges::distance](<#/doc/iterator/ranges/distance>)(C++20) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(algorithm function object)
[ ranges::next](<#/doc/iterator/ranges/next>)(C++20) | incrementa um iterator por uma dada distância ou até um limite
(algorithm function object)
[ ranges::prev](<#/doc/iterator/ranges/prev>)(C++20) | decrementa um iterator por uma dada distância ou até um limite
(algorithm function object)

##### Acesso a Range

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(function template)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o final de um container ou array
(function template)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(function template)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(function template)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(function template)
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(function template)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(function template)

### Sinopse
```cpp
    #include <compare>
    #include <concepts>
    
    namespace std {
      template<class T> using /* with-reference */ = T&;  // exposition only
      template<class T> concept /* can-reference */       // exposition only
        = requires { typename /* with-reference */<T>; };
      template<class T> concept /* dereferenceable */     // exposition only
        = requires(T& t) {
          { *t } -> /* can-reference */;  // not required to be equality-preserving
        };
    
      // associated types
      // incrementable traits
      template<class> struct incrementable_traits;
      template<class T>
        using iter_difference_t = /* see description */;
    
      // indirectly readable traits
      template<class> struct indirectly_readable_traits;
      template<class T>
        using iter_value_t = /* see description */;
    
      // iterator traits
      template<class I> struct iterator_traits;
      template<class T> requires is_object_v<T> struct iterator_traits<T*>;
    
      template</* dereferenceable */ T>
        using iter_reference_t = decltype(*declval<T&>());
    
      namespace ranges {
        // customization point objects
        inline namespace /* unspecified */ {
          // ranges::iter_move
          inline constexpr /* unspecified */ iter_move = /* unspecified */;
    
          // ranges::iter_swap
          inline constexpr /* unspecified */ iter_swap = /* unspecified */;
        }
      }
    
      template</* dereferenceable */ T>
        requires requires(T& t) {
          { ranges::iter_move(t) } -> /* can-reference */;
        }
      using iter_rvalue_reference_t
        = decltype(ranges::iter_move(declval<T&>()));
    
      // iterator concepts
      // concept indirectly_readable
      template<class In>
        concept indirectly_readable = /* see description */;
    
      template<indirectly_readable T>
        using iter_common_reference_t =
          common_reference_t<iter_reference_t<T>, iter_value_t<T>&>;
    
      // concept indirectly_writable
      template<class Out, class T>
        concept indirectly_writable = /* see description */;
    
      // concept weakly_incrementable
      template<class I>
        concept weakly_incrementable = /* see description */;
    
      // concept incrementable
      template<class I>
        concept incrementable = /* see description */;
    
      // concept input_or_output_iterator
      template<class I>
        concept input_or_output_iterator = /* see description */;
    
      // concept sentinel_for
      template<class S, class I>
        concept sentinel_for = /* see description */;
    
      // concept sized_sentinel_for
      template<class S, class I>
        inline constexpr bool disable_sized_sentinel_for = false;
    
      template<class S, class I>
        concept sized_sentinel_for = /* see description */;
    
      // concept input_iterator
      template<class I>
        concept input_iterator = /* see description */;
    
      // concept output_iterator
      template<class I, class T>
        concept output_iterator = /* see description */;
    
      // concept forward_iterator
      template<class I>
        concept forward_iterator = /* see description */;
    
      // concept bidirectional_iterator
      template<class I>
        concept bidirectional_iterator = /* see description */;
    
      // concept random_access_iterator
      template<class I>
        concept random_access_iterator = /* see description */;
    
      // concept contiguous_iterator
      template<class I>
        concept contiguous_iterator = /* see description */;
    
      // indirect callable requirements
      // indirect callables
      template<class F, class I>
        concept indirectly_unary_invocable = /* see description */;
    
      template<class F, class I>
        concept indirectly_regular_unary_invocable = /* see description */;
    
      template<class F, class I>
        concept indirect_unary_predicate = /* see description */;
    
      template<class F, class I1, class I2>
        concept indirect_binary_predicate = /* see description */;
    
      template<class F, class I1, class I2 = I1>
        concept indirect_equivalence_relation = /* see description */;
    
      template<class F, class I1, class I2 = I1>
        concept indirect_strict_weak_order = /* see description */;
    
      template<class F, class... Is>
        requires (indirectly_readable<Is> && ...) && invocable<F, iter_reference_t<Is>...>
          using indirect_result_t = invoke_result_t<F, iter_reference_t<Is>...>;
    
      // projected
      template<indirectly_readable I, indirectly_regular_unary_invocable<I> Proj>
        struct projected;
    
      template<weakly_incrementable I, class Proj>
        struct incrementable_traits<projected<I, Proj>>;
    
      template<indirectly_­readable I, indirectly_­regular_­unary_­invocable<I> Proj>
        using projected_value_t = remove_cvref_t<invoke_result_t<Proj&, iter_value_t<I>&>>;
    
      // common algorithm requirements
      // concept indirectly_movable
      template<class In, class Out>
        concept indirectly_movable = /* see description */;
    
      template<class In, class Out>
        concept indirectly_movable_storable = /* see description */;
    
      // concept indirectly_copyable
      template<class In, class Out>
        concept indirectly_copyable = /* see description */;
    
      template<class In, class Out>
        concept indirectly_copyable_storable = /* see description */;
    
      // concept indirectly_swappable
      template<class I1, class I2 = I1>
        concept indirectly_swappable = /* see description */;
    
      // concept indirectly_comparable
      template<class I1, class I2, class R = equal_to, class P1 = identity, class P2 = identity>
        concept indirectly_comparable = /* see description */;
    
      // concept permutable
      template<class I>
        concept permutable = /* see description */;
    
      // concept mergeable
      template<class I1, class I2, class Out,
          class R = ranges::less, class P1 = identity, class P2 = identity>
        concept mergeable = /* see description */;
    
      // concept sortable
      template<class I, class R = ranges::less, class P = identity>
        concept sortable = /* see description */;
    
      // primitives
      // iterator tags
      struct input_iterator_tag { };
      struct output_iterator_tag { };
      struct forward_iterator_tag: public input_iterator_tag { };
      struct bidirectional_iterator_tag: public forward_iterator_tag { };
      struct random_access_iterator_tag: public bidirectional_iterator_tag { };
      struct contiguous_iterator_tag: public random_access_iterator_tag { };
    
      // iterator operations
      template<class InputIt, class Distance>
        constexpr void advance(InputIt& i, Distance n);
      template<class InputIt>
        constexpr typename iterator_traits<InputIt>::difference_type
          distance(InputIt first, InputIt last);
      template<class InputIt>
        constexpr InputIt
          next(InputIt x, typename iterator_traits<InputIt>::difference_type n = 1);
      template<class BidirIt>
        constexpr BidirIt
          prev(BidirIt x, typename iterator_traits<BidirIt>::difference_type n = 1);
    
      // range iterator operations
      namespace ranges {
        // ranges::advance
        template<input_or_output_iterator I>
          constexpr void advance(I& i, iter_difference_t<I> n);
        template<input_or_output_iterator I, sentinel_for<I> S>
          constexpr void advance(I& i, S bound);
        template<input_or_output_iterator I, sentinel_for<I> S>
          constexpr iter_difference_t<I> advance(I& i, iter_difference_t<I> n, S bound);
    
        // ranges::distance
        template<class I, sentinel_for<I> S>
          requires (!sized_sentinel_for<S, I>)
          constexpr iter_difference_t<I> distance(I first, S last);
        template<class I, sized_sentinel_for<decay_t<I>> S>
          constexpr iter_difference_t<decay_t<I>> distance(I&& first, S last);
        template<range R>
          constexpr range_difference_t<R> distance(R&& r);
    
        // ranges::next
        template<input_or_output_iterator I>
          constexpr I next(I x);
        template<input_or_output_iterator I>
          constexpr I next(I x, iter_difference_t<I> n);
        template<input_or_output_iterator I, sentinel_for<I> S>
          constexpr I next(I x, S bound);
        template<input_or_output_iterator I, sentinel_for<I> S>
          constexpr I next(I x, iter_difference_t<I> n, S bound);
    
        // ranges::prev
        template<bidirectional_iterator I>
          constexpr I prev(I x);
        template<bidirectional_iterator I>
          constexpr I prev(I x, iter_difference_t<I> n);
        template<bidirectional_iterator I>
          constexpr I prev(I x, iter_difference_t<I> n, I bound);
      }
    
      // predefined iterators and sentinels
      // reverse iterators
      template<class It> class reverse_iterator;
    
      template<class It1, class It2>
        constexpr bool operator==(const reverse_iterator<It1>& x,
                                  const reverse_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator!=(const reverse_iterator<It1>& x,
                                  const reverse_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator<(const reverse_iterator<It1>& x,
                                 const reverse_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator>(const reverse_iterator<It1>& x,
                                 const reverse_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator<=(const reverse_iterator<It1>& x,
                                  const reverse_iterator<It2>& y);
      template<class It1, class It2>
```
```cpp
        constexpr bool operator>=(const reverse_iterator<It1>& x,
                                  const reverse_iterator<It2>& y);
      template<class It1, three_way_comparable_with<It1> It2>
        constexpr compare_three_way_result_t<It1, It2>
          operator<=>(const reverse_iterator<It1>& x, const reverse_iterator<It2>& y);
     
      template<class It1, class It2>
        constexpr auto operator-(const reverse_iterator<It1>& x,
                                 const reverse_iterator<It2>& y)
          -> decltype(y.base() - x.base());
      template<class It>
        constexpr reverse_iterator<It> operator+(iter_difference_t<It> n,
                                                 const reverse_iterator<It>& x);
     
      template<class It>
        constexpr reverse_iterator<It> make_reverse_iterator(It i);
     
      template<class It1, class It2>
          requires (!sized_sentinel_for<It1, It2>)
        inline constexpr bool disable_sized_sentinel_for<reverse_iterator<It1>,
                                                         reverse_iterator<It2>> = true;
     
      // iteradores de inserção
      template<class Container> class back_insert_iterator;
      template<class Container>
        constexpr back_insert_iterator<Container> back_inserter(Container& x);
     
      template<class Container> class front_insert_iterator;
      template<class Container>
        constexpr front_insert_iterator<Container> front_inserter(Container& x);
     
      template<class Container> class insert_iterator;
      template<class Container>
        constexpr insert_iterator<Container>
          inserter(Container& x, ranges::iterator_t<Container> i);
     
      // iteradores de movimento e sentinelas
      template<class It> class move_iterator;
     
      template<class It1, class It2>
        constexpr bool operator==(const move_iterator<It1>& x, const move_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator<(const move_iterator<It1>& x, const move_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator>(const move_iterator<It1>& x, const move_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator<=(const move_iterator<It1>& x, const move_iterator<It2>& y);
      template<class It1, class It2>
        constexpr bool operator>=(const move_iterator<It1>& x, const move_iterator<It2>& y);
      template<class It1, three_way_comparable_with<It1> It2>
        constexpr compare_three_way_result_t<It1, It2>
          operator<=>(const move_iterator<It1>& x, const move_iterator<It2>& y);
     
      template<class It1, class It2>
        constexpr auto operator-(const move_iterator<It1>& x, const move_iterator<It2>& y)
          -> decltype(x.base() - y.base());
      template<class It>
        constexpr move_iterator<It>
          operator+(iter_difference_t<It> n, const move_iterator<It>& x);
     
      template<class It>
        constexpr move_iterator<It> make_move_iterator(It i);
     
      template<semiregular S> class move_sentinel;
     
      // iteradores comuns
      template<input_or_output_iterator I, sentinel_for<I> S>
        requires (!same_as<I, S> && copyable<I>)
          class common_iterator;
     
      template<class I, class S>
        struct incrementable_traits<common_iterator<I, S>>;
     
      template<input_iterator I, class S>
        struct iterator_traits<common_iterator<I, S>>;
     
      // sentinela padrão
      struct default_sentinel_t;
      inline constexpr default_sentinel_t default_sentinel{};
     
      // iteradores contados
      template<input_or_output_iterator I> class counted_iterator;
     
      template<input_iterator I>
        requires /* see description */
        struct iterator_traits<counted_iterator<I>>;
     
      // sentinela inalcançável
      struct unreachable_sentinel_t;
      inline constexpr unreachable_sentinel_t unreachable_sentinel{};
     
      // iteradores de stream
      template<class T, class CharT = char, class Traits = char_traits<CharT>,
               class Distance = ptrdiff_t>
      class istream_iterator;
      template<class T, class CharT, class Traits, class Distance>
        bool operator==(const istream_iterator<T, CharT, Traits, Distance>& x,
                        const istream_iterator<T, CharT, Traits, Distance>& y);
     
      template<class T, class CharT = char, class traits = char_traits<CharT>>
          class ostream_iterator;
     
      template<class CharT, class Traits = char_traits<CharT>>
        class istreambuf_iterator;
      template<class CharT, class Traits>
        bool operator==(const istreambuf_iterator<CharT, Traits>& a,
                        const istreambuf_iterator<CharT, Traits>& b);
     
      template<class CharT, class Traits = char_traits<CharT>>
        class ostreambuf_iterator;
     
      // acesso a range
      template<class C> constexpr auto begin(C& c) -> decltype(c.begin());
      template<class C> constexpr auto begin(const C& c) -> decltype(c.begin());
      template<class C> constexpr auto end(C& c) -> decltype(c.end());
      template<class C> constexpr auto end(const C& c) -> decltype(c.end());
      template<class T, size_t N> constexpr T* begin(T (&a)[N]) noexcept;
      template<class T, size_t N> constexpr T* end(T (&a)[N]) noexcept;
      template<class C> constexpr auto cbegin(const C& c) noexcept(noexcept(std::begin(c)))
        -> decltype(std::begin(c));
      template<class C> constexpr auto cend(const C& c) noexcept(noexcept(std::end(c)))
        -> decltype(std::end(c));
      template<class C> constexpr auto rbegin(C& c) -> decltype(c.rbegin());
      template<class C> constexpr auto rbegin(const C& c) -> decltype(c.rbegin());
      template<class C> constexpr auto rend(C& c) -> decltype(c.rend());
      template<class C> constexpr auto rend(const C& c) -> decltype(c.rend());
      template<class T, size_t N> constexpr reverse_iterator<T*> rbegin(T (&a)[N]);
      template<class T, size_t N> constexpr reverse_iterator<T*> rend(T (&a)[N]);
      template<class E> constexpr reverse_iterator<const E*> rbegin(initializer_list<E> il);
      template<class E> constexpr reverse_iterator<const E*> rend(initializer_list<E> il);
      template<class C> constexpr auto crbegin(const C& c) -> decltype(std::rbegin(c));
      template<class C> constexpr auto crend(const C& c) -> decltype(std::rend(c));
     
      template<class C> constexpr auto size(const C& c) -> decltype(c.size());
      template<class T, size_t N> constexpr size_t size(const T (&a)[N]) noexcept;
      template<class C> constexpr auto ssize(const C& c)
        -> common_type_t<ptrdiff_t, make_signed_t<decltype(c.size())>>;
      template<class T, ptrdiff_t N> constexpr ptrdiff_t ssize(const T (&a)[N]) noexcept;
      template<class C> constexpr auto empty(const C& c) -> decltype(c.empty());
      template<class T, size_t N> constexpr bool empty(const T (&a)[N]) noexcept;
      template<class E> constexpr bool empty(initializer_list<E> il) noexcept;
      template<class C> constexpr auto data(C& c) -> decltype(c.data());
      template<class C> constexpr auto data(const C& c) -> decltype(c.data());
      template<class T, size_t N> constexpr T* data(T (&a)[N]) noexcept;
      template<class E> constexpr const E* data(initializer_list<E> il) noexcept;
    }
```

#### Concept [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
```cpp
    namespace std {
      template<class In>
        concept __indirectlyReadableImpl = // apenas para exposição
          requires(const In in) {
            typename iter_value_t<In>;
            typename iter_reference_t<In>;
            typename iter_rvalue_reference_t<In>;
            { *in } -> same_as<iter_reference_t<In>>
            { iter_move(in) } -> same_as<iter_rvalue_reference_t<In>>
          } &&
          common_reference_with<iter_reference_t<In>&&, iter_value_t<In>&> &&
          common_reference_with<iter_reference_t<In>&&, iter_rvalue_reference_t<In>&&> &&
          common_reference_with<iter_rvalue_reference_t<In>&&, const iter_value_t<In>&>;
     
      template<class In>
        concept indirectly_readable =
          __indirectlyReadableImpl<remove_cvref_t<In>>
    }
```

#### Concept [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
```cpp
    namespace std {
      template<class Out, class T>
        concept indirectly_writable =
          requires(Out&& o, T&& t) {
            *o = std::forward<T>(t); // não é exigido que preserve a igualdade
            *std::forward<Out>(o) = std::forward<T>(t);
            // não é exigido que preserve a igualdade
            const_cast<const iter_reference_t<Out>&&>(*o) =
            std::forward<T>(t); // não é exigido que preserve a igualdade
            const_cast<const iter_reference_t<Out>&&>(*std::forward<Out>(o)) =
            std::forward<T>(t); // não é exigido que preserve a igualdade
          };
    }
```

#### Concept [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
```cpp
    namespace std {
      template<class T>
        inline constexpr bool __is_integer_like = /* see description */; // apenas para exposição
     
      template<class T>
        inline constexpr bool __is_signed_integer_like =  // apenas para exposição
          /* see description */;
     
      template<class I>
        concept weakly_incrementable =
          default_initializable<I> && movable<I> &&
          requires(I i) {
            typename iter_difference_t<I>;
            requires __is_signed_integer_like<iter_difference_t<I>>;
            { ++i } -> same_as<I&>;   // não é exigido que preserve a igualdade
            i++;                      // não é exigido que preserve a igualdade
          };
    }
```

#### Concept [`incrementable`](<#/doc/iterator/incrementable>)
```cpp
    namespace std {
      template<class I>
        concept incrementable =
          regular<I> &&
          weakly_incrementable<I> &&
          requires(I i) {
            { i++ } -> same_as<I>;
          };
    }
```

#### Concept [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>)
```cpp
    namespace std {
      template<class I>
        concept input_or_output_iterator =
          requires(I i) {
            { *i } -> can-reference;
          } &&
          weakly_incrementable<I>;
    }
```

#### Concept [`sentinel_for`](<#/doc/iterator/sentinel_for>)
```cpp
    namespace std {
      template<class S, class I>
        concept sentinel_for =
          semiregular<S> &&
          input_or_output_iterator<I> &&
          __WeaklyEqualityComparableWith<S, I>;
    }
```

#### Concept [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>)
```cpp
    namespace std {
      template<class S, class I>
        concept sized_sentinel_for =
          sentinel_for<S, I> &&
          !disable_sized_sentinel<remove_cv_t<S>, remove_cv_t<I>> &&
          requires(const I& i, const S& s) {
            { s - i } -> same_as<iter_difference_t<I>>;
            { i - s } -> same_as<iter_difference_t<I>>;
          };
    }
```

#### Concept [`input_iterator`](<#/doc/iterator/input_iterator>)
```cpp
    namespace std {
      template<class I>
        concept input_iterator =
          input_or_output_iterator<I> &&
          indirectly_readable<I> &&
          requires { typename /* ITER_CONCEPT */(I); } &&
          derived_from</* ITER_CONCEPT */(I), input_iterator_tag>;
    }
```

#### Concept [`output_iterator`](<#/doc/iterator/output_iterator>)
```cpp
    namespace std {
      template<class I, class T>
        concept output_iterator =
          input_or_output_iterator<I> &&
          indirectly_writable<I, T> &&
          requires(I i, T&& t) {
            *i++ = std::forward<T>(t); // não é exigido que preserve a igualdade
          };
    }
```

#### Concept [`forward_iterator`](<#/doc/iterator/forward_iterator>)
```cpp
    namespace std {
      template<class I>
        concept forward_iterator =
          input_iterator<I> &&
          derived_from</* ITER_CONCEPT */(I), forward_iterator_tag> &&
          incrementable<I> &&
          sentinel_for<I, I>;
    }
```

#### Concept [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>)
```cpp
    namespace std {
      template<class I>
        concept bidirectional_iterator =
          forward_iterator<I> &&
          derived_from</* ITER_CONCEPT */(I), bidirectional_iterator_tag> &&
          requires(I i) {
            { --i } -> same_as<I&>;
            { i-- } -> same_as<I>;
          };
    }
```

#### Concept [`random_access_iterator`](<#/doc/iterator/random_access_iterator>)
```cpp
    namespace std {
      template<class I>
        concept random_access_iterator =
          bidirectional_iterator<I> &&
          derived_from</* ITER_CONCEPT */(I), random_access_iterator_tag> &&
          totally_ordered<I> &&
          sized_sentinel_for<I, I> &&
          requires(I i, const I j, const iter_difference_t<I> n) {
            { i += n } -> same_as<I&>;
            { j +  n } -> same_as<I>;
            { n +  j } -> same_as<I>;
            { i -= n } -> same_as<I&>;
            { j -  n } -> same_as<I>;
            {  j[n]  } -> same_as<iter_reference_t<I>>;
          };
    }
```

#### Concept [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>)
```cpp
    namespace std {
      template<class I>
        concept contiguous_iterator =
          random_access_iterator<I> &&
          derived_from</* ITER_CONCEPT */(I), contiguous_iterator_tag> &&
          is_lvalue_reference_v<iter_reference_t<I>> &&
          same_as<iter_value_t<I>, remove_cvref_t<iter_reference_t<I>>> &&
          requires(const I& i) {
            { to_address(i) } -> same_as<add_pointer_t<iter_reference_t<I>>>;
          };
    }
```

#### Concept [`indirectly_unary_invocable`](<#/doc/iterator/indirectly_unary_invocable>)
```cpp
    namespace std {
      template<class F, class I>
        concept indirectly_unary_invocable =
          indirectly_readable<I> &&
          copy_constructible<F> &&
          invocable<F&, iter_value_t<I>&> &&
          invocable<F&, iter_reference_t<I>> &&
          common_reference_with<
            invoke_result_t<F&, iter_value_t<I>&>,
            invoke_result_t<F&, iter_reference_t<I>>>;
    }
```

#### Concept [`indirectly_regular_unary_invocable`](<#/doc/iterator/indirectly_unary_invocable>)
```cpp
    namespace std {
      template<class F, class I>
        concept indirectly_regular_unary_invocable =
          indirectly_readable<I> &&
          copy_constructible<F> &&
          regular_invocable<F&, iter_value_t<I>&> &&
          regular_invocable<F&, iter_reference_t<I>> &&
          common_reference_with<
            invoke_result_t<F&, iter_value_t<I>&>,
            invoke_result_t<F&, iter_reference_t<I>>>;
    }
```

#### Concept [`indirect_unary_predicate`](<#/doc/iterator/indirect_unary_predicate>)
```cpp
    namespace std {
      template<class F, class I>
        concept indirect_unary_predicate =
          indirectly_readable<I> &&
          copy_constructible<F> &&
          predicate<F&, iter_value_t<I>&> &&
          predicate<F&, iter_reference_t<I>>;
    }
```

#### Concept [`indirect_binary_predicate`](<#/doc/iterator/indirect_binary_predicate>)
```cpp
    namespace std {
      template<class F, class I1, class I2 = I1>
        concept indirect_binary_predicate =
          indirectly_readable<I1> && indirectly_readable<I2> &&
          copy_constructible<F> &&
          predicate<F&, iter_value_t<I1>&, iter_value_t<I2>&> &&
          predicate<F&, iter_value_t<I1>&, iter_reference_t<I2>> &&
          predicate<F&, iter_reference_t<I1>, iter_value_t<I2>&> &&
          predicate<F&, iter_reference_t<I1>, iter_reference_t<I2>>;
    }
```

#### Concept [`indirect_equivalence_relation`](<#/doc/iterator/indirect_equivalence_relation>)
```cpp
    namespace std {
      template<class F, class I1, class I2 = I1>
        concept indirect_equivalence_relation =
          indirectly_readable<I1> && indirectly_readable<I2> &&
          copy_constructible<F> &&
          equivalence_relation<F&, iter_value_t<I1>&, iter_value_t<I2>&> &&
          equivalence_relation<F&, iter_value_t<I1>&, iter_reference_t<I2>> &&
          equivalence_relation<F&, iter_reference_t<I1>, iter_value_t<I2>&> &&
          equivalence_relation<F&, iter_reference_t<I1>, iter_reference_t<I2>>;
    }
```

#### Concept [`indirect_strict_weak_order`](<#/doc/iterator/indirect_strict_weak_order>)
```cpp
    namespace std {
      template<class F, class I1, class I2 = I1>
        concept indirect_strict_weak_order =
          indirectly_readable<I1> && indirectly_readable<I2> &&
          copy_constructible<F> &&
          strict_weak_order<F&, iter_value_t<I1>&, iter_value_t<I2>&> &&
          strict_weak_order<F&, iter_value_t<I1>&, iter_reference_t<I2>> &&
          strict_weak_order<F&, iter_reference_t<I1>, iter_value_t<I2>&> &&
          strict_weak_order<F&, iter_reference_t<I1>, iter_reference_t<I2>>;
    }
```

#### Concept [`indirectly_movable`](<#/doc/iterator/indirectly_movable>)
```cpp
    namespace std {
      template<class In, class Out>
        concept indirectly_movable =
          indirectly_readable<In> &&
          indirectly_writable<Out, iter_rvalue_reference_t<In>>;
    }
```

#### Concept [`indirectly_movable_storable`](<#/doc/iterator/indirectly_movable_storable>)
```cpp
    namespace std {
      template<class In, class Out>
        concept indirectly_movable_storable =
          indirectly_movable<In, Out> &&
          indirectly_writable<Out, iter_value_t<In>> &&
          movable<iter_value_t<In>> &&
          constructible_from<iter_value_t<In>, iter_rvalue_reference_t<In>> &&
          assignable_from<iter_value_t<In>&, iter_rvalue_reference_t<In>>;
    }
```

#### Concept [`indirectly_copyable`](<#/doc/iterator/indirectly_copyable>)
```cpp
    namespace std {
      template<class In, class Out>
        concept indirectly_copyable =
          indirectly_readable<In> &&
          indirectly_writable<Out, iter_reference_t<In>>;
    }
```

#### Concept [`indirectly_copyable_storable`](<#/doc/iterator/indirectly_copyable_storable>)
```cpp
    namespace std {
      template<class In, class Out>
        concept indirectly_copyable_storable =
          indirectly_copyable<In, Out> &&
          indirectly_writable<Out, iter_value_t<In>&> &&
          indirectly_writable<Out, const iter_value_t<In>&> &&
          indirectly_writable<Out, iter_value_t<In>&&> &&
          indirectly_writable<Out, const iter_value_t<In>&&> &&
          copyable<iter_value_t<In>> &&
          constructible_from<iter_value_t<In>, iter_reference_t<In>> &&
          assignable_from<iter_value_t<In>&, iter_reference_t<In>>;
    }
```

#### Concept [`indirectly_swappable`](<#/doc/iterator/indirectly_swappable>)
```cpp
    namespace std {
      template<class I1, class I2 = I1>
        concept indirectly_swappable =
          indirectly_readable<I1> && indirectly_readable<I2> &&
          requires(const I1 i1, const I2 i2) {
            ranges::iter_swap(i1, i1);
            ranges::iter_swap(i2, i2);
            ranges::iter_swap(i1, i2);
            ranges::iter_swap(i2, i1);
          };
    }
```

#### Concept [`indirectly_comparable`](<#/doc/iterator/indirectly_comparable>)
```cpp
    namespace std {
      template<class I1, class I2, class R, class P1 = identity, class P2 = identity>
        concept indirectly_comparable =
          indirect_predicate<R, projected<I1, P1>, projected<I2, P2>>;
    }
```

#### Concept [`permutable`](<#/doc/iterator/permutable>)
```cpp
    namespace std {
      template<class I>
        concept permutable =
          forward_iterator<I> &&
          indirectly_movable_storable<I, I> &&
          indirectly_swappable<I, I>;
    }
```

#### Concept [`mergeable`](<#/doc/iterator/mergeable>)
```cpp
    namespace std {
      template<class I1, class I2, class Out, class R = ranges::less,
               class P1 = identity, class P2 = identity>
        concept mergeable =
          input_iterator<I1> &&
          input_iterator<I2> &&
          weakly_incrementable<Out> &&
          indirectly_copyable<I1, Out> &&
          indirectly_copyable<I2, Out> &&
          indirect_strict_weak_order<R, projected<I1, P1>, projected<I2, P2>>;
    }
```

#### Concept [`sortable`](<#/doc/iterator/sortable>)
```cpp
    namespace std {
      template<class I, class R = ranges::less, class P = identity>
        concept sortable =
          permutable<I> &&
          indirect_strict_weak_order<R, projected<I, P>>;
    }
```

#### Class template [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)
```cpp
    namespace std {
      template<class> struct incrementable_traits { };
     
      template<class T>
        requires is_object_v<T>
      struct incrementable_traits<T*> {
        using difference_type = ptrdiff_t;
      };
     
      template<class I>
      struct incrementable_traits<const I>
        : incrementable_traits<I> { };
     
      template<class T>
        requires requires { typename T::difference_type; }
      struct incrementable_traits<T> {
        using difference_type = typename T::difference_type;
      };
     
      template<class T>
        requires (!requires { typename T::difference_type; } &&
                  requires(const T& a, const T& b) { { a - b } -> integral; })
      struct incrementable_traits<T> {
        using difference_type = make_signed_t<decltype(declval<T>() - declval<T>())>;
      };
     
      template<class T>
        using iter_difference_t = /* see description */;
    }
```

#### Class template [std::indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)
```cpp
    namespace std {
      template<class> struct __cond_value_type { };   // apenas para exposição
      template<class T>
        requires is_object_v<T>
      struct __cond_value_type {
        using value_type = remove_cv_t<T>;
      };
     
      template<class> struct indirectly_readable_traits { };
     
      template<class T>
      struct indirectly_readable_traits<T*>
        : __cond_value_type<T> { };
     
      template<class I>
        requires is_array_v<I>
      struct indirectly_readable_traits<I> {
        using value_type = remove_cv_t<remove_extent_t<I>>;
      };
     
      template<class I>
      struct indirectly_readable_traits<const I>
        : indirectly_readable_traits<I> { };
     
      template<class T>
        requires requires { typename T::value_type; }
      struct indirectly_readable_traits<T>
        : __cond_value_type<typename T::value_type> { };
     
      template<class T>
        requires requires { typename T::element_type; }
      struct indirectly_readable_traits<T>
        : __cond_value_type<typename T::element_type> { };
    }
```

#### Class template [std::projected](<#/doc/iterator/projected>)
```cpp
    namespace std {
      template<indirectly_readable I, indirectly_regular_unary_invocable<I> Proj>
      struct projected {
        using value_type = remove_cvref_t<indirect_result_t<Proj&, I>>;
        indirect_result_t<Proj&, I> operator*() const; // não definido
      };
     
      template<weakly_incrementable I, class Proj>
      struct incrementable_traits<projected<I, Proj>> {
        using difference_type = iter_difference_t<I>;
      };
    }
```

#### Class template [std::iterator_traits](<#/doc/iterator/iterator_traits>)
```cpp
    namespace std {
      template<class I>
      struct iterator_traits {
        using iterator_category = /* see description */;
        using value_type        = /* see description */;
        using difference_type   = /* see description */;
        using pointer           = /* see description */;
        using reference         = /* see description */;
      };
     
      template<class T>
        requires is_object_v<T>
      struct iterator_traits<T*> {
        using iterator_concept  = contiguous_iterator_tag;
        using iterator_category = random_access_iterator_tag;
        using value_type        = remove_cv_t<T>;
        using difference_type   = ptrdiff_t;
        using pointer           = T*;
        using reference         = T&;
      };
    }
```

#### Iterator tags
```cpp
    namespace std {
      struct input_iterator_tag { };
      struct output_iterator_tag { };
      struct forward_iterator_tag: public input_iterator_tag { };
      struct bidirectional_iterator_tag: public forward_iterator_tag { };
      struct random_access_iterator_tag: public bidirectional_iterator_tag { };
      struct contiguous_iterator_tag: public random_access_iterator_tag { };
    }
```

#### Class template [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)
```cpp
    namespace std {
      template<class Iter>
      class reverse_iterator {
      public:
        using iterator_type     = Iter;
        using iterator_concept  = /* see description */;
        using iterator_category = /* see description */;
        using value_type        = iter_value_t<Iter>;
        using difference_type   = iter_difference_t<Iter>;
        using pointer           = typename iterator_traits<Iter>::pointer;
        using reference         = iter_reference_t<Iter>;
     
        constexpr reverse_iterator();
        constexpr explicit reverse_iterator(Iter x);
        template<class U> constexpr reverse_iterator(const reverse_iterator<U>& u);
        template<class U> constexpr reverse_iterator& operator=(const reverse_iterator<U>& u);
     
        constexpr Iter base() const;
        constexpr reference operator*() const;
        constexpr pointer   operator->() const requires /* see description */;
     
        constexpr reverse_iterator& operator++();
        constexpr reverse_iterator  operator++(int);
        constexpr reverse_iterator& operator--();
        constexpr reverse_iterator  operator--(int);
     
        constexpr reverse_iterator  operator+ (difference_type n) const;
        constexpr reverse_iterator& operator+=(difference_type n);
        constexpr reverse_iterator  operator- (difference_type n) const;
        constexpr reverse_iterator& operator-=(difference_type n);
        constexpr /* unspecified */ operator const;
     
        friend constexpr iter_rvalue_reference_t<Iter>
          iter_move(const reverse_iterator& i) noexcept(/* see description */);
        template<indirectly_swappable<Iter> Iter2>
          friend constexpr void
            iter_swap(const reverse_iterator& x,
                      const reverse_iterator<Iter2>& y) noexcept(/* see description */);
     
      protected:
        Iter current;
      };
    }
```

#### Class template [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>)
```cpp
    namespace std {
      template<class Container>
      class back_insert_iterator {
      protected:
        Container* container = nullptr;
     
      public:
        using iterator_category = output_iterator_tag;
        using value_type        = void;
        using difference_type   = ptrdiff_t;
        using pointer           = void;
        using reference         = void;
        using container_type    = Container;
     
        constexpr back_insert_iterator() noexcept = default;
        constexpr explicit back_insert_iterator(Container& x);
        constexpr back_insert_iterator& operator=(const typename Container::value_type& value);
        constexpr back_insert_iterator& operator=(typename Container::value_type&& value);
     
        constexpr back_insert_iterator& operator*();
        constexpr back_insert_iterator& operator++();
        constexpr back_insert_iterator  operator++(int);
      };
    }
```

#### Class template [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>)
```cpp
    namespace std {
      template<class Container>
      class front_insert_iterator {
      protected:
        Container* container = nullptr;
     
      public:
        using iterator_category = output_iterator_tag;
        using value_type        = void;
        using difference_type   = ptrdiff_t;
        using pointer           = void;
        using reference         = void;
        using container_type    = Container;
     
        constexpr front_insert_iterator(Container& x) noexcept = default;
        constexpr explicit front_insert_iterator(Container& x);
        constexpr front_insert_iterator&
          operator=(const typename Container::value_type& value);
        constexpr front_insert_iterator& operator=(typename Container::value_type&& value);
     
        constexpr front_insert_iterator& operator*();
        constexpr front_insert_iterator& operator++();
        constexpr front_insert_iterator  operator++(int);
      };
    }
```

#### Class template [std::insert_iterator](<#/doc/iterator/insert_iterator>)
```cpp
    namespace std {
      template<class Container>
      class insert_iterator {
      protected:
        Container* container = nullptr;
        ranges::iterator_t<Container> iter = ranges::iterator_t<Container>();
     
      public:
        using iterator_category = output_iterator_tag;
        using value_type        = void;
        using difference_type   = ptrdiff_t;
        using pointer           = void;
        using reference         = void;
        using container_type    = Container;
     
        insert_iterator() = default;
        constexpr insert_iterator(Container& x, ranges::iterator_t<Container> i);
        constexpr insert_iterator& operator=(const typename Container::value_type& value);
        constexpr insert_iterator& operator=(typename Container::value_type&& value);
     
        constexpr insert_iterator& operator*();
        constexpr insert_iterator& operator++();
        constexpr insert_iterator& operator++(int);
      };
    }
```

#### Class template [std::move_iterator](<#/doc/iterator/move_iterator>)
```cpp
    namespace std {
      template<class Iter>
      class move_iterator;
    }
```
#### Modelo de classe [std::move_iterator](<#/doc/iterator/move_iterator>)
```cpp
    namespace std {
      template<class Iter>
      class move_iterator {
      public:
        using iterator_type     = Iter;
        using iterator_concept  = /* see description */;
        using iterator_category = /* see description */;
        using value_type        = iter_value_t<Iter>;
        using difference_type   = iter_difference_t<Iter>;
        using pointer           = Iter;
        using reference         = iter_rvalue_reference_t<Iter>;
    
        constexpr move_iterator();
        constexpr explicit move_iterator(Iter i);
        template<class U> constexpr move_iterator(const move_iterator<U>& u);
        template<class U> constexpr move_iterator& operator=(const move_iterator<U>& u);
    
        constexpr iterator_type base() const &;
        constexpr iterator_type base() &&;
        constexpr reference operator*() const;
        constexpr pointer operator->() const;
    
        constexpr move_iterator& operator++();
        constexpr auto operator++(int);
        constexpr move_iterator& operator--();
        constexpr move_iterator operator--(int);
    
        constexpr move_iterator operator+(difference_type n) const;
        constexpr move_iterator& operator+=(difference_type n);
        constexpr move_iterator operator-(difference_type n) const;
        constexpr move_iterator& operator-=(difference_type n);
        constexpr reference operator const;
    
        template<sentinel_for<Iter> S>
          friend constexpr bool
            operator==(const move_iterator& x, const move_sentinel<S>& y);
        template<sized_sentinel_for<Iter> S>
          friend constexpr iter_difference_t<Iter>
            operator-(const move_sentinel<S>& x, const move_iterator& y);
        template<sized_sentinel_for<Iter> S>
          friend constexpr iter_difference_t<Iter>
            operator-(const move_iterator& x, const move_sentinel<S>& y);
        friend constexpr iter_rvalue_reference_t<Iter>
          iter_move(const move_iterator& i)
            noexcept(noexcept(ranges::iter_move(i.current)));
        template<indirectly_swappable<Iter> Iter2>
          friend constexpr void
            iter_swap(const move_iterator& x, const move_iterator<Iter2>& y)
              noexcept(noexcept(ranges::iter_swap(x.current, y.current)));
    
      private:
        Iter current;     // exposition only
      };
    }
```

#### Modelo de classe [std::move_sentinel](<#/doc/iterator/move_sentinel>)
```cpp
    namespace std {
      template<semiregular S>
      class move_sentinel {
      public:
        constexpr move_sentinel();
        constexpr explicit move_sentinel(S s);
        template<class S2>
          requires convertible_to<const S2&, S>
            constexpr move_sentinel(const move_sentinel<S2>& s);
        template<class S2>
          requires assignable_from<S&, const S2&>
            constexpr move_sentinel& operator=(const move_sentinel<S2>& s);
    
        constexpr S base() const;
      private:
        S last;     // exposition only
      };
    }
```

#### Modelo de classe [std::common_iterator](<#/doc/iterator/common_iterator>)
```cpp
    namespace std {
      template<input_or_output_iterator I, sentinel_for<I> S>
        requires (!same_as<I, S> && copyable<I>)
      class common_iterator {
      public:
        constexpr common_iterator() = default;
        constexpr common_iterator(I i);
        constexpr common_iterator(S s);
        template<class I2, class S2>
          requires convertible_to<const I2&, I> && convertible_to<const S2&, S>
            constexpr common_iterator(const common_iterator<I2, S2>& x);
    
        template<class I2, class S2>
          requires convertible_to<const I2&, I> && convertible_to<const S2&, S> &&
                   assignable_from<I&, const I2&> && assignable_from<S&, const S2&>
            common_iterator& operator=(const common_iterator<I2, S2>& x);
    
        decltype(auto) operator*();
        decltype(auto) operator*() const
          requires dereferenceable<const I>;
        decltype(auto) operator->() const
          requires /* see description */;
    
        common_iterator& operator++();
        decltype(auto) operator++(int);
    
        template<class I2, sentinel_for<I> S2>
          requires sentinel_for<S, I2>
        friend bool operator==(
          const common_iterator& x, const common_iterator<I2, S2>& y);
        template<class I2, sentinel_for<I> S2>
          requires sentinel_for<S, I2> && equality_comparable_with<I, I2>
        friend bool operator==(
          const common_iterator& x, const common_iterator<I2, S2>& y);
    
        template<sized_sentinel_for<I> I2, sized_sentinel_for<I> S2>
          requires sized_sentinel_for<S, I2>
        friend iter_difference_t<I2> operator-(
          const common_iterator& x, const common_iterator<I2, S2>& y);
    
        friend constexpr decltype(auto) iter_move(const common_iterator& i)
          noexcept(noexcept(ranges::iter_move(declval<const I&>())))
            requires input_iterator<I>;
        template<indirectly_swappable<I> I2, class S2>
          friend void iter_swap(const common_iterator& x, const common_iterator<I2, S2>& y)
            noexcept(noexcept(ranges::iter_swap(declval<const I&>(), declval<const I2&>())));
    
      private:
        variant<I, S> v_;   // exposition only
      };
    
      template<class I, class S>
      struct incrementable_traits<common_iterator<I, S>> {
        using difference_type = iter_difference_t<I>;
      };
    
      template<input_iterator I, class S>
      struct iterator_traits<common_iterator<I, S>> {
        using iterator_concept = /* see description */;
        using iterator_category = /* see description */;
        using value_type = iter_value_t<I>;
        using difference_type = iter_difference_t<I>;
        using pointer = /* see description */;
        using reference = iter_reference_t<I>;
      };
    }
```

#### Classe [std::default_sentinel_t](<#/doc/iterator/default_sentinel>)
```cpp
    namespace std {
      struct default_sentinel_t { };
    }
```

#### Modelo de classe [std::counted_iterator](<#/doc/iterator/counted_iterator>)
```cpp
    namespace std {
      template<input_or_output_iterator I>
      class counted_iterator {
      public:
        using iterator_type = I;
    
        constexpr counted_iterator() = default;
        constexpr counted_iterator(I x, iter_difference_t<I> n);
        template<class I2>
          requires convertible_to<const I2&, I>
            constexpr counted_iterator(const counted_iterator<I2>& x);
    
        template<class I2>
          requires assignable_from<I&, const I2&>
            constexpr counted_iterator& operator=(const counted_iterator<I2>& x);
    
        constexpr I base() const & requires copy_constructible<I>;
        constexpr I base() &&;
        constexpr iter_difference_t<I> count() const noexcept;
        constexpr decltype(auto) operator*();
        constexpr decltype(auto) operator*() const
          requires dereferenceable<const I>;
        constexpr auto operator->() const noexcept
          requires contiguous_iterator<I>;
    
        constexpr counted_iterator& operator++();
        decltype(auto) operator++(int);
        constexpr counted_iterator operator++(int)
          requires forward_iterator<I>;
        constexpr counted_iterator& operator--()
          requires bidirectional_iterator<I>;
        constexpr counted_iterator operator--(int)
          requires bidirectional_iterator<I>;
    
        constexpr counted_iterator operator+(iter_difference_t<I> n) const
          requires random_access_iterator<I>;
        friend constexpr counted_iterator operator+(
          iter_difference_t<I> n, const counted_iterator& x)
            requires random_access_iterator<I>;
        constexpr counted_iterator& operator+=(iter_difference_t<I> n)
          requires random_access_iterator<I>;
    
        constexpr counted_iterator operator-(iter_difference_t<I> n) const
          requires random_access_iterator<I>;
        template<common_with<I> I2>
          friend constexpr iter_difference_t<I2> operator-(
            const counted_iterator& x, const counted_iterator<I2>& y);
        friend constexpr iter_difference_t<I> operator-(
          const counted_iterator& x, default_sentinel_t);
        friend constexpr iter_difference_t<I> operator-(
          default_sentinel_t, const counted_iterator& y);
        constexpr counted_iterator& operator-=(iter_difference_t<I> n)
          requires random_access_iterator<I>;
    
        constexpr decltype(auto) operator const
          requires random_access_iterator<I>;
    
        template<common_with<I> I2>
          friend constexpr bool operator==(
            const counted_iterator& x, const counted_iterator<I2>& y);
        friend constexpr bool operator==(
          const counted_iterator& x, default_sentinel_t);
    
        template<common_with<I> I2>
          friend constexpr strong_ordering operator<=>(
            const counted_iterator& x, const counted_iterator<I2>& y);
    
        friend constexpr decltype(auto) iter_move(const counted_iterator& i)
          noexcept(noexcept(ranges::iter_move(i.current)))
            requires input_iterator<I>;
        template<indirectly_swappable<I> I2>
          friend constexpr void iter_swap(const counted_iterator& x,
                                          const counted_iterator<I2>& y)
            noexcept(noexcept(ranges::iter_swap(x.current, y.current)));
    
      private:
        I current = I();                    // exposition only
        iter_difference_t<I> length = 0;    // exposition only
      };
    
      template<input_iterator I>
      struct iterator_traits<counted_iterator<I>> : iterator_traits<I> {
        using pointer = void;
      };
    }
```

#### Classe [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>)
```cpp
    namespace std {
      struct unreachable_sentinel_t {
        template<weakly_incrementable I>
          friend constexpr bool operator==(unreachable_sentinel_t, const I&) noexcept
          { return false; }
      };
    }
```

#### Modelo de classe [std::istream_iterator](<#/doc/iterator/istream_iterator>)
```cpp
    namespace std {
      template<class T, class CharT = char, class Traits = char_traits<CharT>,
               class Distance = ptrdiff_t>
      class istream_iterator {
      public:
        using iterator_category = input_iterator_tag;
        using value_type        = T;
        using difference_type   = Distance;
        using pointer           = const T*;
        using reference         = const T&;
        using char_type         = CharT;
        using traits_type       = Traits;
        using istream_type      = basic_istream<CharT, Traits>;
    
        constexpr istream_iterator();
        constexpr istream_iterator(default_sentinel_t);
        istream_iterator(istream_type& s);
        istream_iterator(const istream_iterator& x) = default;
        ~istream_iterator() = default;
        istream_iterator& operator=(const istream_iterator&) = default;
    
        const T& operator*() const;
        const T* operator->() const;
        istream_iterator& operator++();
        istream_iterator  operator++(int);
    
        friend bool operator==(const istream_iterator& i, default_sentinel_t);
    
      private:
        basic_istream<CharT, Traits>* in_stream; // exposition only
        T value;                                 // exposition only
      };
    }
```

#### Modelo de classe [std::ostream_iterator](<#/doc/iterator/ostream_iterator>)
```cpp
    namespace std {
      template<class T, class CharT = char, classTraits = char_traits<CharT>>
      class ostream_iterator {
      public:
        using iterator_category = output_iterator_tag;
        using value_type        = void;
        using difference_type   = ptrdiff_t;
        using pointer           = void;
        using reference         = void;
        using char_type         = CharT;
        using traits_type       = Traits;
        using ostream_type      = basic_ostream<CharT, Traits>;
    
        constexpr ostreambuf_iterator() noexcept = default;
        ostream_iterator(ostream_type& s);
        ostream_iterator(ostream_type& s, const CharT* delimiter);
        ostream_iterator(const ostream_iterator& x);
        ~ostream_iterator();
        ostream_iterator& operator=(const ostream_iterator&) = default;
        ostream_iterator& operator=(const T& value);
    
        ostream_iterator& operator*();
        ostream_iterator& operator++();
        ostream_iterator& operator++(int);
    
      private:
        basic_ostream<CharT, Traits>* out_stream = nullptr;          // exposition only
        const CharT* delim = nullptr;                                // exposition only
      };
    }
```

#### Modelo de classe [std::istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class istreambuf_iterator {
      public:
        using iterator_category = input_iterator_tag;
        using value_type        = CharT;
        using difference_type   = typename Traits::off_type;
        using pointer           = /* unspecified */;
        using reference         = CharT;
        using char_type         = CharT;
        using traits_type       = Traits;
        using int_type          = typename Traits::int_type;
        using streambuf_type    = basic_streambuf<CharT, Traits>;
        using istream_type      = basic_istream<CharT, Traits>;
    
        class proxy;                          // exposition only
    
        constexpr istreambuf_iterator() noexcept;
        constexpr istreambuf_iterator(default_sentinel_t) noexcept;
        istreambuf_iterator(const istreambuf_iterator&) noexcept = default;
        ~istreambuf_iterator() = default;
        istreambuf_iterator(istream_type& s) noexcept;
        istreambuf_iterator(streambuf_type* s) noexcept;
        istreambuf_iterator(const proxy& p) noexcept;
        istreambuf_iterator& operator=(const istreambuf_iterator&) noexcept = default;
        CharT operator*() const;
        istreambuf_iterator& operator++();
        proxy operator++(int);
        bool equal(const istreambuf_iterator& b) const;
    
        friend bool operator==(const istreambuf_iterator& i, default_sentinel_t s);
    
      private:
        streambuf_type* sbuf_;                // exposition only
      };
    
      template<class CharT, class Traits>
      class istreambuf_iterator<CharT, Traits>::proxy { // exposition only
        CharT keep_;
        basic_streambuf<CharT, Traits>* sbuf_;
        proxy(CharT c, basic_streambuf<CharT, Traits>* sbuf)
          : keep_(c), sbuf_(sbuf) { }
      public:
        CharT operator*() { return keep_; }
      };
    }
```

#### Modelo de classe [std::ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>)
```cpp
    namespace std {
      template<class CharT, class Traits = char_traits<CharT>>
      class ostreambuf_iterator {
      public:
        using iterator_category = output_iterator_tag;
        using value_type        = void;
        using difference_type   = ptrdiff_t;
        using pointer           = void;
        using reference         = void;
        using char_type         = CharT;
        using traits_type       = Traits;
        using streambuf_type    = basic_streambuf<CharT, Traits>;
        using ostream_type      = basic_ostream<CharT, Traits>;
    
        constexpr ostreambuf_iterator() noexcept = default;
        ostreambuf_iterator(ostream_type& s) noexcept;
        ostreambuf_iterator(streambuf_type* s) noexcept;
        ostreambuf_iterator& operator=(CharT c);
    
        ostreambuf_iterator& operator*();
        ostreambuf_iterator& operator++();
        ostreambuf_iterator& operator++(int);
        bool failed() const noexcept;
    
      private:
        streambuf_type* sbuf_ = nullptr;    // exposition only
      };
    }
```

#### Modelo de classe [std::iterator](<#/doc/iterator/iterator>)
```cpp
    namespace std {
      template<class Category, class T, class Distance = ptrdiff_t,
               class Pointer = T*, class Reference = T&>
      struct iterator {
        typedef Category  iterator_category;
        typedef T         value_type;
        typedef Distance  difference_type;
        typedef Pointer   pointer;
        typedef Reference reference;
      };
    }
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 349](<https://cplusplus.github.io/LWG/issue349>) | C++98 | o membro apenas para exposição `delim` de [std::ostream_iterator](<#/doc/iterator/ostream_iterator>) tinha o tipo const char* | corrigido para const CharT*