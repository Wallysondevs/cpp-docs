# Cabeçalho da biblioteca experimental &lt;experimental/ranges/iterator&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Conceitos relacionados a iteradores

Definido no namespace `std::experimental::ranges`
---

#### Conceitos de iterador

[ Readable](<#/doc/experimental/ranges/iterator/Readable>) | especifica que um tipo é legível aplicando o operador `*`
(concept)
[ Writable](<#/doc/experimental/ranges/iterator/Writable>) | especifica que um valor pode ser escrito no objeto referenciado por um iterador
(concept)
[ WeaklyIncrementable](<#/doc/experimental/ranges/iterator/WeaklyIncrementable>) | especifica que um tipo [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) pode ser incrementado com operadores de pré e pós-incremento
(concept)
[ Incrementable](<#/doc/experimental/ranges/iterator/Incrementable>) | especifica que a operação de incremento em um tipo [`WeaklyIncrementable`](<#/doc/experimental/ranges/iterator/WeaklyIncrementable>) preserva a igualdade e que o tipo é [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>)
(concept)
[ Iterator](<#/doc/experimental/ranges/iterator/Iterator>) | especifica que objetos de um tipo podem ser incrementados e desreferenciados
(concept)
[ Sentinel](<#/doc/experimental/ranges/iterator/Sentinel>) | especifica que objetos de um tipo são um sentinel para um tipo [`Iterator`](<#/doc/experimental/ranges/iterator/Iterator>)
(concept)
[ SizedSentinel](<#/doc/experimental/ranges/iterator/SizedSentinel>) | especifica que o operador `-` pode ser aplicado a um iterador e um sentinel para calcular sua diferença em tempo constante
(concept)
[ InputIterator](<#/doc/experimental/ranges/iterator/InputIterator>) | especifica que um tipo é um iterador de entrada, ou seja, seus valores referenciados podem ser lidos e ele pode ser pré e pós-incrementado
(concept)
[ OutputIterator](<#/doc/experimental/ranges/iterator/OutputIterator>) | especifica que um tipo é um iterador de saída para um dado tipo de valor, ou seja, valores desse tipo podem ser escritos nele e ele pode ser pré e pós-incrementado
(concept)
[ ForwardIterator](<#/doc/experimental/ranges/iterator/ForwardIterator>) | especifica que um [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>) é um iterador forward, suportando comparação de igualdade e múltiplas passagens
(concept)
[ BidirectionalIterator](<#/doc/experimental/ranges/iterator/BidirectionalIterator>) | especifica que um [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>) é um iterador bidirecional, suportando movimento para trás
(concept)
[ RandomAccessIterator](<#/doc/experimental/ranges/iterator/RandomAccessIterator>) | especifica que um [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>) é um iterador de acesso aleatório, suportando avanço em tempo constante e indexação
(concept)

#### Conceitos de invocáveis indiretos

[ IndirectUnaryInvocableIndirectRegularUnaryInvocable](<#/doc/experimental/ranges/iterator/IndirectUnaryInvocable>) | especifica que um tipo invocável pode ser invocado com o resultado da desreferenciação de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>)
(concept)
[ IndirectUnaryPredicate](<#/doc/experimental/ranges/iterator/IndirectUnaryPredicate>) | especifica que um objeto invocável, quando invocado com o resultado da desreferenciação de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>), satisfaz [`Predicate`](<#/doc/experimental/ranges/concepts/Predicate>)
(concept)
[ IndirectRelation](<#/doc/experimental/ranges/iterator/IndirectRelation>) | especifica que um objeto invocável, quando invocado com o resultado da desreferenciação de alguns tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>), satisfaz [`Relation`](<#/doc/experimental/ranges/concepts/Relation>)
(concept)
[ IndirectStrictWeakOrder](<#/doc/experimental/ranges/iterator/IndirectStrictWeakOrder>) | especifica que um objeto invocável, quando invocado com o resultado da desreferenciação de alguns tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>), satisfaz [`StrictWeakOrder`](<#/doc/experimental/ranges/concepts/StrictWeakOrder>)
(concept)

#### Requisitos comuns de algoritmo

[ IndirectlyMovable](<#/doc/experimental/ranges/iterator/IndirectlyMovable>) | especifica que valores podem ser movidos de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>)
(concept)
[ IndirectlyMovableStorable](<#/doc/experimental/ranges/iterator/IndirectlyMovableStorable>) | especifica que valores podem ser movidos de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>) e que a movimentação pode ser realizada através de um objeto intermediário
(concept)
[ IndirectlyCopyable](<#/doc/experimental/ranges/iterator/IndirectlyCopyable>) | especifica que valores podem ser copiados de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>)
(concept)
[ IndirectlyCopyableStorable](<#/doc/experimental/ranges/iterator/IndirectlyCopyableStorable>) | especifica que valores podem ser copiados de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>) e que a cópia pode ser realizada através de um objeto intermediário
(concept)
[ IndirectlySwappable](<#/doc/experimental/ranges/iterator/IndirectlySwappable>) | especifica que os valores referenciados por dois tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) podem ser trocados
(concept)
[ IndirectlyComparable](<#/doc/experimental/ranges/iterator/IndirectlyComparable>) | especifica que os valores referenciados por dois tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) podem ser comparados
(concept)
[ Permutable](<#/doc/experimental/ranges/iterator/Permutable>) | especifica os requisitos comuns de algoritmos que reordenam elementos no local
(concept)
[ Mergeable](<#/doc/experimental/ranges/iterator/Mergeable>) | especifica os requisitos de algoritmos que mesclam sequências ordenadas em uma sequência de saída copiando elementos
(concept)
[ Sortable](<#/doc/experimental/ranges/iterator/Sortable>) | especifica os requisitos comuns de algoritmos que permutam sequências em sequências ordenadas
(concept)

#### Utilitários de concept

[ indirect_result_of](<#/doc/experimental/ranges/iterator/indirect_result_of>) | calcula o resultado de invocar um objeto invocável no resultado da desreferenciação de um conjunto de tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>)
(class template)
[ projected](<#/doc/experimental/ranges/iterator/projected>) | template auxiliar para especificar as restrições em algoritmos que aceitam projeções
(class template)

### Primitivas de iterador

#### Utilitários de iterador

Definido no namespace `std::experimental::ranges`
---
[ iter_move](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/iter_move&action=edit&redlink=1> "cpp/experimental/ranges/iterator/iter move \(page does not exist\)") | converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado
(customization point object)
[ iter_swap](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/iter_swap&action=edit&redlink=1> "cpp/experimental/ranges/iterator/iter swap \(page does not exist\)") | troca os valores referenciados por dois objetos desreferenciáveis
(customization point object)

#### Traits de iterador

Definido no namespace `std::experimental::ranges`
---
[ difference_type](<#/doc/experimental/ranges/iterator/difference_type>) | obtém o tipo de diferença de um tipo [`WeaklyIncrementable`](<#/doc/experimental/ranges/iterator/WeaklyIncrementable>)
(class template)
[ value_type](<#/doc/experimental/ranges/iterator/value_type>) | obtém o tipo de valor de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>)
(class template)
[ iterator_category](<#/doc/experimental/ranges/iterator/iterator_category>) | obtém a categoria de iterador de um tipo de iterador de entrada
(class template)
[ iterator_traits](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/iterator_traits&action=edit&redlink=1> "cpp/experimental/ranges/iterator/iterator traits \(page does not exist\)") | classe de traits de compatibilidade que coleta os tipos associados de um iterador
(alias template)
[ reference_trvalue_reference_titer_common_reference_t](<#/doc/experimental/ranges/iterator/reference_t>) | obtém os tipos de referência associados de um objeto desreferenciável
(alias template)

#### Tags de categoria de iterador

Definido no namespace `std::experimental::ranges`
---
[ input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tag](<#/doc/experimental/ranges/iterator/iterator_tags>) | tipos de classe vazios usados para indicar categorias de iterador
(class)

#### Especializações de [std::iterator_traits](<#/doc/iterator/iterator_traits>)

Definido no namespace `std`
---
[ std::iterator_traits&lt;InputIterator&gt;std::iterator_traits&lt;OutputIterator&gt;](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/std_iter_traits&action=edit&redlink=1> "cpp/experimental/ranges/iterator/std iter traits \(page does not exist\)") | especializa [std::iterator_traits](<#/doc/iterator/iterator_traits>) para iteradores do Ranges TS
(class template specialization)

#### Operações de iterador

Definido no namespace `std::experimental::ranges`
---
[ advance](<#/doc/experimental/ranges/iterator/advance>) | avança um iterador por uma dada distância
(function template)
[ distance](<#/doc/experimental/ranges/iterator/distance>) | retorna a distância entre um iterador e um sentinel, ou entre o início e o fim de um range
(function template)
[ next](<#/doc/experimental/ranges/iterator/next>) | incrementa um iterador
(function template)
[ prev](<#/doc/experimental/ranges/iterator/prev>) | decrementa um iterador
(function template)

### Adaptadores de iterador

Definido no namespace `std::experimental::ranges`
---
[ reverse_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/reverse_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/reverse iterator \(page does not exist\)") | adaptador de iterador para travessia em ordem inversa
(class template)
[ back_insert_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/back_insert_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/back insert iterator \(page does not exist\)") | adaptador de iterador para inserção no final de um container
(class template)
[ front_insert_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/front_insert_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/front insert iterator \(page does not exist\)") | adaptador de iterador para inserção no início de um container
(class template)
[ insert_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/insert_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/insert iterator \(page does not exist\)") | adaptador de iterador para inserção em um container
(class template)
[ move_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/move_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/move iterator \(page does not exist\)") | adaptador de iterador que desreferencia para uma referência rvalue
(class template)
[ move_sentinel](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/move_sentinel&action=edit&redlink=1> "cpp/experimental/ranges/iterator/move sentinel \(page does not exist\)") | adaptador de sentinel para uso com `move_iterator`
(class template)
[ common_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/common_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/common iterator \(page does not exist\)") | adapta um par iterador-sentinel em um tipo de iterador comum para uso com algoritmos legados
(class template)
[ counted_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/counted_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/counted iterator \(page does not exist\)") | adaptador de iterador que mantém o controle de sua distância da posição inicial
(class template)
[ default_sentinel](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/default_sentinel&action=edit&redlink=1> "cpp/experimental/ranges/iterator/default sentinel \(page does not exist\)") | tipo de sentinel vazio para uso com tipos de iterador que conhecem o limite de seu range
(class)
[ dangling](<#/doc/experimental/ranges/iterator/dangling>) | wrapper para um iterador possivelmente dangling
(class template)
[ safe_iterator_t](<#/doc/experimental/ranges/iterator/dangling>) | alias template que envolve o tipo de iterador de um range rvalue com `dangling`
(alias template)
[ unreachable](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/unreachable&action=edit&redlink=1> "cpp/experimental/ranges/iterator/unreachable \(page does not exist\)") | tipo de sentinel usado com qualquer iterador para denotar um range infinito
(class)

### Iteradores de stream

Definido no namespace `std::experimental::ranges`
---
[ istream_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/istream_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/istream iterator \(page does not exist\)") | iterador de entrada que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(class template)
[ ostream_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/ostream_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/ostream iterator \(page does not exist\)") | iterador de saída que escreve para [std::basic_ostream](<#/doc/io/basic_ostream>)
(class template)
[ istreambuf_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/istreambuf_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/istreambuf iterator \(page does not exist\)") | iterador de entrada que lê de [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(class template)
[ ostreambuf_iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/ostreambuf_iterator&action=edit&redlink=1> "cpp/experimental/ranges/iterator/ostreambuf iterator \(page does not exist\)") | iterador de saída que escreve para [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(class template)

### Sinopse
```cpp
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {
     
    template <class T> concept bool /* dereferenceable */ // exposition only
      = requires(T& t) { {*t} -> auto&&; };
     
    namespace {
      constexpr /* unspecified */ iter_move = /* unspecified */;
      constexpr /* unspecified */ iter_swap = /* unspecified */;
    }
     
    template <class> struct difference_type;
    template <class T> using difference_type_t
      = typename difference_type<T>::type;
     
    template <class> struct value_type;
    template <class T> using value_type_t
      = typename value_type<T>::type;
     
    template <class> struct iterator_category;
    template <class T> using iterator_category_t
      = typename iterator_category<T>::type;
     
    template </* dereferenceable */ T> using reference_t
      = decltype(*declval<T&>());
     
    template </* dereferenceable */ T>
        requires /* see definition */ using rvalue_reference_t
      = decltype(ranges::iter_move(declval<T&>()));
     
    template <class In>
    concept bool Readable = /* see definition */;
     
    template <class Out, class T>
    concept bool Writable = /* see definition */;
     
    template <class I>
    concept bool WeaklyIncrementable = /* see definition */;
     
    template <class I>
    concept bool Incrementable = /* see definition */;
     
    template <class I>
    concept bool Iterator = /* see definition */;
     
    template <class S, class I>
    concept bool Sentinel = /* see definition */;
     
    template <class S, class I>
      constexpr bool disable_sized_sentinel = false;
     
    template <class S, class I>
    concept bool SizedSentinel = /* see definition */;
     
    template <class I>
    concept bool InputIterator = /* see definition */;
     
    template <class I>
    concept bool OutputIterator = /* see definition */;
     
    template <class I>
    concept bool ForwardIterator = /* see definition */;
     
    template <class I>
    concept bool BidirectionalIterator = /* see definition */;
     
    template <class I>
    concept bool RandomAccessIterator = /* see definition */;
     
    template <class F, class I>
    concept bool IndirectUnaryInvocable = /* see definition */;
     
    template <class F, class I>
    concept bool IndirectRegularUnaryInvocable = /* see definition */;
     
    template <class F, class I>
    concept bool IndirectUnaryPredicate = /* see definition */;
     
    template <class F, class I1, class I2 = I1>
    concept bool IndirectRelation = /* see definition */;
     
    template <class F, class I1, class I2 = I1>
    concept bool IndirectStrictWeakOrder = /* see definition */;
     
    template <class> struct indirect_result_of;
     
    template <class F, class... Is>
      requires Invocable<F, reference_t<Is>...>
    struct indirect_result_of<F(Is...)>;
     
    template <class F>
    using indirect_result_of_t
      = typename indirect_result_of<F>::type;
     
    template <Readable I, IndirectRegularUnaryInvocable<I> Proj>
    struct projected;
     
    template <WeaklyIncrementable I, class Proj>
    struct difference_type<projected<I, Proj>>;
     
    template <class In, class Out>
    concept bool IndirectlyMovable = /* see definition */;
     
    template <class In, class Out>
    concept bool IndirectlyMovableStorable = /* see definition */;
     
    template <class In, class Out>
    concept bool IndirectlyCopyable = /* see definition */;
     
    template <class In, class Out>
    concept bool IndirectlyCopyableStorable = /* see definition */;
     
    template <class I1, class I2 = I1>
    concept bool IndirectlySwappable = /* see definition */;
     
    template <class I1, class I2, class R = equal_to<>, class P1 = identity,
        class P2 = identity>
    concept bool IndirectlyComparable = /* see definition */;
     
    template <class I>
    concept bool Permutable = /* see definition */;
     
    template <class I1, class I2, class Out,
        class R = less<>, class P1 = identity, class P2 = identity>
    concept bool Mergeable = /* see definition */;
     
    template <class I, class R = less<>, class P = identity>
    concept bool Sortable = /* see definition */;
     
    template <class Iterator> using iterator_traits = /* see definition */;
     
    template <Readable T> using iter_common_reference_t
      = common_reference_t<reference_t<T>, value_type_t<T>&>;
     
    struct output_iterator_tag { };
    struct input_iterator_tag { };
    struct forward_iterator_tag : input_iterator_tag { };
    struct bidirectional_iterator_tag : forward_iterator_tag { };
    struct random_access_iterator_tag : bidirectional_iterator_tag { };
     
    namespace {
      constexpr /* unspecified */ advance = /* unspecified */;
      constexpr /* unspecified */ distance = /* unspecified */;
      constexpr /* unspecified */ next = /* unspecified */;
      constexpr /* unspecified */ prev = /* unspecified */;
    }
     
    template <BidirectionalIterator I> class reverse_iterator;
     
    template <class I1, class I2>
        requires EqualityComparableWith<I1, I2>
      constexpr bool operator==(
        const reverse_iterator<I1>& x,
        const reverse_iterator<I2>& y);
    template <class I1, class I2>
        requires EqualityComparableWith<I1, I2>
      constexpr bool operator!=(
        const reverse_iterator<I1>& x,
        const reverse_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator<(
        const reverse_iterator<I1>& x,
        const reverse_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator>(
        const reverse_iterator<I1>& x,
        const reverse_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator>=(
        const reverse_iterator<I1>& x,
        const reverse_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator<=(
        const reverse_iterator<I1>& x,
        const reverse_iterator<I2>& y);
     
    template <class I1, class I2>
        requires SizedSentinel<I1, I2>
      constexpr difference_type_t<I2> operator-(
        const reverse_iterator<I1>& x,
        const reverse_iterator<I2>& y);
    template <RandomAccessIterator I>
      constexpr reverse_iterator<I> operator+(
        difference_type_t<I> n,
        const reverse_iterator<I>& x);
     
    template <BidirectionalIterator I>
    constexpr reverse_iterator<I> make_reverse_iterator(I i);
     
    template <class Container> class back_insert_iterator;
    template <class Container>
      back_insert_iterator<Container> back_inserter(Container& x);
     
    template <class Container> class front_insert_iterator;
    template <class Container>
      front_insert_iterator<Container> front_inserter(Container& x);
     
    template <class Container> class insert_iterator;
    template <class Container>
      insert_iterator<Container> inserter(Container& x, iterator_t<Container> i);
     
    template <InputIterator I> class move_iterator;
     
    template <class I1, class I2>
        requires EqualityComparableWith<I1, I2>
      constexpr bool operator==(
        const move_iterator<I1>& x, const move_iterator<I2>& y);
    template <class I1, class I2>
        requires EqualityComparableWith<I1, I2>
      constexpr bool operator!=(
        const move_iterator<I1>& x, const move_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator<(
        const move_iterator<I1>& x, const move_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator<=(
        const move_iterator<I1>& x, const move_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator>(
        const move_iterator<I1>& x, const move_iterator<I2>& y);
    template <class I1, class I2>
        requires StrictTotallyOrderedWith<I1, I2>
      constexpr bool operator>=(
        const move_iterator<I1>& x, const move_iterator<I2>& y);
     
    template <class I1, class I2>
        requires SizedSentinel<I1, I2>
      constexpr difference_type_t<I2> operator-(
        const move_iterator<I1>& x,
        const move_iterator<I2>& y);
    template <RandomAccessIterator I>
      constexpr move_iterator<I> operator+(
        difference_type_t<I> n,
        const move_iterator<I>& x);
     
    template <InputIterator I>
      constexpr move_iterator<I> make_move_iterator(I i);
     
    template <Semiregular S> class move_sentinel;
     
    template <class I, Sentinel<I> S>
      constexpr bool operator==(
        const move_iterator<I>& i, const move_sentinel<S>& s);
    template <class I, Sentinel<I> S>
      constexpr bool operator==(
        const move_sentinel<S>& s, const move_iterator<I>& i);
    template <class I, Sentinel<I> S>
      constexpr bool operator!=(
        const move_iterator<I>& i, const move_sentinel<S>& s);
    template <class I, Sentinel<I> S>
      constexpr bool operator!=(
        const move_sentinel<S>& s, const move_iterator<I>& i);
     
    template <class I, SizedSentinel<I> S>
      constexpr difference_type_t<I> operator-(
        const move_sentinel<S>& s, const move_iterator<I>& i);
    template <class I, SizedSentinel<I> S>
      constexpr difference_type_t<I> operator-(
        const move_iterator<I>& i, const move_sentinel<S>& s);
     
    template <Semiregular S>
      constexpr move_sentinel<S> make_move_sentinel(S s);
     
    template <Iterator I, Sentinel<I> S>
      requires !Same<I, S>
    class common_iterator;
     
    template <Readable I, class S>
    struct value_type<common_iterator<I, S>>;
     
    template <InputIterator I, class S>
    struct iterator_category<common_iterator<I, S>>;
     
    template <ForwardIterator I, class S>
    struct iterator_category<common_iterator<I, S>>;
     
    template <class I1, class I2, Sentinel<I2> S1, Sentinel<I1> S2>
    bool operator==(
      const common_iterator<I1, S1>& x, const common_iterator<I2, S2>& y);
    template <class I1, class I2, Sentinel<I2> S1, Sentinel<I1> S2>
      requires EqualityComparableWith<I1, I2>
    bool operator==(
      const common_iterator<I1, S1>& x, const common_iterator<I2, S2>& y);
    template <class I1, class I2, Sentinel<I2> S1, Sentinel<I1> S2>
    bool operator!=(
      const common_iterator<I1, S1>& x, const common_iterator<I2, S2>& y);
     
    template <class I2, SizedSentinel<I2> I1, SizedSentinel<I2> S1, SizedSentinel<I1> S2>
    difference_type_t<I2> operator-(
      const common_iterator<I1, S1>& x, const common_iterator<I2, S2>& y);
     
    class default_sentinel;
     
    template <Iterator I> class counted_iterator;
     
    template <class I1, class I2>
        requires Common<I1, I2>
      constexpr bool operator==(
        const counted_iterator<I1>& x, const counted_iterator<I2>& y);
    constexpr bool operator==(
      const counted_iterator<auto>& x, default_sentinel);
    constexpr bool operator==(
      default_sentinel, const counted_iterator<auto>& x);
    template <class I1, class I2>
        requires Common<I1, I2>
      constexpr bool operator!=(
        const counted_iterator<I1>& x, const counted_iterator<I2>& y);
    constexpr bool operator!=(
      const counted_iterator<auto>& x, default_sentinel y);
    constexpr bool operator!=(
      default_sentinel x, const counted_iterator<auto>& y);
    template <class I1, class I2>
        requires Common<I1, I2>
      constexpr bool operator<(
        const counted_iterator<I1>& x, const counted_iterator<I2>& y);
    template <class I1, class I2>
        requires Common<I1, I2>
      constexpr bool operator<=(
        const counted_iterator<I1>& x, const counted_iterator<I2>& y);
    template <class I1, class I2>
        requires Common<I1, I2>
      constexpr bool operator>(
        const counted_iterator<I1>& x, const counted_iterator<I2>& y);
    template <class I1, class I2>
        requires Common<I1, I2>
      constexpr bool operator>=(
        const counted_iterator<I1>& x, const counted_iterator<I2>& y);
     
    template <class I1, class I2>
        requires Common<I1, I2>
      constexpr difference_type_t<I2> operator-(
        const counted_iterator<I1>& x, const counted_iterator<I2>& y);
    template <class I>
      constexpr difference_type_t<I> operator-(
        const counted_iterator<I>& x, default_sentinel y);
    template <class I>
      constexpr difference_type_t<I> operator-(
        default_sentinel x, const counted_iterator<I>& y);
    template <RandomAccessIterator I>
      constexpr counted_iterator<I>
        operator+(difference_type_t<I> n, const counted_iterator<I>& x);
     
    template <Iterator I>
      constexpr counted_iterator<I> make_counted_iterator(I i, difference_type_t<I> n);
```
```cpp
class unreachable;
template <Iterator I>
  constexpr bool operator==(const I&, unreachable) noexcept;
template <Iterator I>
  constexpr bool operator==(unreachable, const I&) noexcept;
template <Iterator I>
  constexpr bool operator!=(const I&, unreachable) noexcept;
template <Iterator I>
  constexpr bool operator!=(unreachable, const I&) noexcept;
 
template <class T> class dangling;
 
template <class T, class CharT = char, class Traits = char_traits<CharT>,
    class Distance = ptrdiff_t>
  class istream_iterator;
 
template <class T, class CharT, class Traits, class Distance>
  bool operator==(const istream_iterator<T, CharT, Traits, Distance>& x,
    const istream_iterator<T, CharT, Traits, Distance>& y);
template <class T, class CharT, class Traits, class Distance>
  bool operator==(default_sentinel x,
    const istream_iterator<T, CharT, Traits, Distance>& y);
template <class T, class CharT, class Traits, class Distance>
  bool operator==(const istream_iterator<T, CharT, Traits, Distance>& x,
    default_sentinel y);
template <class T, class CharT, class Traits, class Distance>
  bool operator!=(const istream_iterator<T, CharT, Traits, Distance>& x,
    const istream_iterator<T, CharT, Traits, Distance>& y);
template <class T, class CharT, class Traits, class Distance>
  bool operator!=(default_sentinel x,
    const istream_iterator<T, CharT, Traits, Distance>& y);
template <class T, class CharT, class Traits, class Distance>
  bool operator!=(const istream_iterator<T, CharT, Traits, Distance>& x,
    default_sentinel y);
 
template <class T, class CharT = char, class Traits = char_traits<CharT>>
  class ostream_iterator;
 
template <class CharT, class Traits = char_traits<CharT> >
  class istreambuf_iterator;
 
template <class CharT, class Traits>
  bool operator==(const istreambuf_iterator<CharT, Traits>& a,
    const istreambuf_iterator<CharT, Traits>& b);
template <class CharT, class Traits>
  bool operator==(default_sentinel a,
    const istreambuf_iterator<CharT, Traits>& b);
template <class CharT, class Traits>
  bool operator==(const istreambuf_iterator<CharT, Traits>& a,
    default_sentinel b);
template <class CharT, class Traits>
  bool operator!=(const istreambuf_iterator<CharT, Traits>& a,
    const istreambuf_iterator<CharT, Traits>& b);
template <class CharT, class Traits>
  bool operator!=(default_sentinel a,
    const istreambuf_iterator<CharT, Traits>& b);
template <class CharT, class Traits>
  bool operator!=(const istreambuf_iterator<CharT, Traits>& a,
    default_sentinel b);
 
template <class CharT, class Traits = char_traits<CharT> >
  class ostreambuf_iterator;
 
}}}}
 
namespace std {
  template <experimental::ranges::Iterator Out>
    struct iterator_traits<Out>;
  template <experimental::ranges::InputIterator In>
    struct iterator_traits<In>;
  template <experimental::ranges::InputIterator In>
      requires experimental::ranges::Sentinel<In, In>
    struct iterator_traits;
}
```