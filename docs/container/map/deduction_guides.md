# Guias de dedução para std::map

Definido no cabeçalho `[<map>](<#/doc/header/map>)`

```c
template< class InputIt,
class Comp = std::less<iter_key_t<InputIt>>,
class Alloc = std::allocator<iter_to_alloc_t<InputIt>> >
map( InputIt, InputIt, Comp = Comp(), Alloc = Alloc() )
-> map<iter_key_t<InputIt>, iter_val_t<InputIt>, Comp, Alloc>;
template< class Key,
class T,
class Comp = std::less<Key>,
class Alloc = std::allocator<std::pair<const Key, T>> >
map( std::initializer_list<std::pair<Key, T>>, Comp = Comp(), Alloc = Alloc() )
-> map<Key, T, Comp, Alloc>;
template< class InputIt, class Alloc >
map( InputIt, InputIt, Alloc )
-> map<iter_key_t<InputIt>, iter_val_t<InputIt>,
std::less<iter_key_t<InputIt>>, Alloc>;
template< class Key, class T, class Alloc >
map( std::initializer_list<std::pair<Key, T>>, Alloc )
-> map<Key, T, std::less<Key>, Alloc>;
template< ranges::input_range R, class Compare = std::less<range_key_t<R>,
class Alloc = std::allocator<range_to_alloc_t<R>> >
map( std::from_range_t, R&&, Compare = Compare(), Alloc = Alloc() )
-> map<range_key_t<R>, range_mapped_t<R>, Compare, Alloc>;
template< ranges::input_range R, class Alloc >
map( std::from_range_t, R&&, Alloc )
-> map<range_key_t<R>, range_mapped_t<R>, std::less<range_key_t<R>>, Alloc>;
Aliases de tipo auxiliares apenas para exposição
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

1-4) Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para `map` para permitir a dedução a partir de um range de iteradores (sobrecargas (1,3)) e [std::initializer_list](<#/doc/utility/initializer_list>) (sobrecargas (2,4)).

5,6) Estes guias de dedução são fornecidos para `map` para permitir a dedução a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e um [`input_range`](<#/doc/ranges/input_range>).

Estas sobrecargas participam da resolução de sobrecarga apenas se `InputIt` satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>), `Alloc` satisfizer [Allocator](<#/doc/named_req/Allocator>), e `Comp` não satisfizer [Allocator](<#/doc/named_req/Allocator>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como input iterators. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>); sobrecarga (5,6)

### Exemplo

Execute este código
```cpp
    #include <map>
    
    int main()
    {
        // std::map m1 = {{"foo", 1}, {"bar", 2}};
            // Erro: braced-init-list não tem tipo; não é possível deduzir
            // pair<Key, T> de {"foo", 1} ou {"bar", 2}
    
        std::map m1 = {std::pair{"foo", 2}, {"bar", 3}}; // guide #2
        std::map m2(m1.begin(), m1.end()); // guide #1
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3025](<https://cplusplus.github.io/LWG/issue3025>) | C++17 | guias de initializer-list aceitam [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt; | usar [std::pair](<#/doc/utility/pair>)<Key, T>