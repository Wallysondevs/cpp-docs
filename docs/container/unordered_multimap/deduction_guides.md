# Guias de dedução para `std::unordered_multimap`

Definido no cabeçalho `[<unordered_map>](<#/doc/header/unordered_map>)`

```c
template< class InputIt,
class Hash = std::hash<iter_key_t<InputIt>>,
class Pred = std::equal_to<iter_key_t<InputIt>>,
class Alloc = std::allocator<iter_to_alloc_t<InputIt>> >
unordered_multimap( InputIt, InputIt,
typename /*veja abaixo*/::size_type = /*veja abaixo*/,
Hash = Hash(), Pred = Pred(), Alloc = Alloc() )
-> unordered_multimap<iter_key_t<InputIt>, iter_val_t<InputIt>,
Hash, Pred, Alloc>;
template< class Key, class T, class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>,
class Alloc = std::allocator<std::pair<const Key, T>> >
unordered_multimap( std::initializer_list<std::pair<Key, T>>,
typename /*veja abaixo*/::size_type = /*veja abaixo*/,
Hash = Hash(), Pred = Pred(), Alloc = Alloc() )
-> unordered_multimap<Key, T, Hash, Pred, Alloc>;
template< class InputIt, class Alloc >
unordered_multimap( InputIt, InputIt, typename /*veja abaixo*/::size_type, Alloc )
-> unordered_multimap<iter_key_t<InputIt>, iter_val_t<InputIt>,
std::hash<iter_key_t<InputIt>>,
std::equal_to<iter_key_t<InputIt>>, Alloc>;
template< class InputIt, class Alloc >
unordered_multimap( InputIt, InputIt, Alloc )
-> unordered_multimap<iter_key_t<InputIt>, iter_val_t<InputIt>,
std::hash<iter_key_t<InputIt>>,
std::equal_to<iter_key_t<InputIt>>, Alloc>;
template< class InputIt, class Hash, class Alloc >
unordered_multimap( InputIt, InputIt, typename /*veja abaixo*/::size_type, Hash, Alloc )
-> unordered_multimap<iter_key_t<InputIt>, iter_val_t<InputIt>, Hash,
std::equal_to<iter_key_t<InputIt>>, Alloc>;
template< class Key, class T, typename Alloc >
unordered_multimap( std::initializer_list<std::pair<Key, T>>,
typename /*veja abaixo*/::size_type, Alloc )
-> unordered_multimap<Key, T, std::hash<Key>, std::equal_to<Key>, Alloc>;
template< class Key, class T, typename Alloc >
unordered_multimap( std::initializer_list<std::pair<Key, T>>, Alloc )
-> unordered_multimap<Key, T, std::hash<Key>, std::equal_to<Key>, Alloc>;
template< class Key, class T, class Hash, class Alloc >
unordered_multimap( std::initializer_list<std::pair<Key, T>>,
typename /*veja abaixo*/::size_type, Hash, Alloc )
-> unordered_multimap<Key, T, Hash, std::equal_to<Key>, Alloc>;
template< ranges::input_range R,
class Hash = std::hash<range_key_t<R>>,
class Pred = std::equal_to<range_key_t<R>>,
class Alloc = std::allocator<range_to_alloc_t<R>> >
unordered_multimap( std::from_range_t, R&&,
typename /* veja descrição */::size_type = /* veja descrição */,
Hash = Hash(), Pred = Pred(), Alloc = Alloc() )
-> unordered_multimap<range_key_t<R>, range_mapped_t<R>,
Hash, Pred, Alloc>;
template< ranges::input_range R, class Alloc >
unordered_multimap( std::from_range_t, R&&,
typename /* veja descrição */::size_type, Alloc )
-> unordered_multimap<range_key_t<R>, range_mapped_t<R>,
std::hash<range_key_t<R>>,
std::equal_to<range_key_t<R>>, Alloc>;
template< ranges::input_range R, class Alloc >
unordered_multimap( std::from_range_t, R&&, Alloc )
-> unordered_multimap<range_key_t<R>, range_mapped_t<R>,
std::hash<range_key_t<R>>,
std::equal_to<range_key_t<R>>, Alloc>;
template< ranges::input_range R, class Hash, class Alloc >
unordered_multimap( std::from_range_t, R&&, typename /* veja descrição */::size_type,
Hash, Alloc )
-> unordered_multimap<range_key_t<R>, range_mapped_t<R>, Hash,
std::equal_to<range_key_t<R>>, Alloc>;
Aliases de tipo auxiliar apenas para exposição
template< class InputIter >
using iter_val_t =
typename std::iterator_traits<InputIter>::value_type;
template< class InputIter >
using iter_key_t =
std::remove_const_t< std::tuple_element_t<0, iter_val_t<InputIter>>>;
template< class InputIter >
using iter_mapped_t =
std::tuple_element_t<1, iter_val_t<InputIter>>;
template< class InputIter >
using iter_to_alloc_t =
std::pair<std::add_const_t<tuple_element_t<0, iter_val_t<InputIter>>>,
std::tuple_element_t<1, iter_val_t<InputIter>>>;
template< ranges::input_range Range >
using range_key_t =
std::remove_const_t<typename ranges::range_value_t<Range>::first_type>;
(apenas para exposição*)
template< ranges::input_range Range >
using range_mapped_t =
typename ranges::range_value_t<Range>::second_type;
(apenas para exposição*)
template< ranges::input_range Range >
using range_to_alloc_t =
std::pair<std::add_const_t<typename ranges::range_value_t<Range>::first_type>,
typename ranges::range_value_t<Range>::second_type>;
(apenas para exposição*)
```

1-8) Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para `unordered_multimap` para permitir a dedução a partir de um range de iteradores (sobrecargas (1,3-5)) e [std::initializer_list](<#/doc/utility/initializer_list>) (sobrecargas (2,6-8)).

9-12) Estes guias de dedução são fornecidos para `unordered_multimap` para permitir a dedução a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e um [`input_range`](<#/doc/ranges/input_range>).

Estas sobrecargas participam da resolução de sobrecarga apenas se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>), `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>), nem `Hash` nem `Pred` satisfazem [Allocator](<#/doc/named_req/Allocator>), e `Hash` não é um tipo integral.

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem formada quando tratada como um operando não avaliado.

O tipo de parâmetro `size_type` nestes guias refere-se ao tipo membro `size_type` do tipo deduzido pelo guia de dedução.

### Notas

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção com suporte a Ranges; sobrecargas (9-12)

### Exemplo

Execute este código
```cpp
    #include <unordered_map>
    
    int main()
    {
        // std::unordered_multimap m1 = {{"foo", 1}, {"bar", 2}};
            // Erro: braced-init-list não tem tipo, não é possível
            // deduzir pair<Key, T> de {"foo", 1} ou {"bar", 2}
    
        std::unordered_multimap m1 = {std::pair{"foo", 2}, {"bar", 3}}; // guia #2
        std::unordered_multimap m2(m1.begin(), m1.end()); // guia #1
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3025](<https://cplusplus.github.io/LWG/issue3025>) | C++17 | guias de initializer-list aceitam [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt; | usar [std::pair](<#/doc/utility/pair>)<Key, T>