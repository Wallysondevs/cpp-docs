# Guias de dedução para std::multiset

Definido no cabeçalho `[<set>](<#/doc/header/set>)`

```c
template<
class InputIt,
class Comp = std::less<typename std::iterator_traits<InputIt>::value_type>,
class Alloc = std::allocator<typename std::iterator_traits<InputIt>::value_type>>
multiset( InputIt, InputIt, Comp = Comp(), Alloc = Alloc() )
-> multiset<typename std::iterator_traits<InputIt>::value_type, Comp, Alloc>;
template<
class Key, class Comp = std::less<Key>,
class Alloc = std::allocator<Key> >
multiset( std::initializer_list<Key>, Comp = Comp(), Alloc = Alloc() )
-> multiset<Key, Comp, Alloc>;
template< class InputIt, class Alloc >
multiset( InputIt, InputIt, Alloc )
-> multiset<typename std::iterator_traits<InputIt>::value_type,
std::less<typename std::iterator_traits<InputIt>::value_type>, Alloc>;
template< class Key, class Alloc >
multiset( std::initializer_list<Key>, Alloc )
-> multiset<Key, std::less<Key>, Alloc>;
template< ranges::input_range R, class Compare = less<ranges::range_value_t<R>>,
class Alloc = std::allocator<ranges::range_value_t<R>> >
multiset( std::from_range_t, R&&, Compare = Compare(), Alloc = Alloc() )
-> multiset<ranges::range_value_t<R>, Compare, Alloc>;
template< ranges::input_range R, class Alloc >
multiset( std::from_range_t, R&&, Alloc )
-> multiset<ranges::range_value_t<R>, std::less<ranges::range_value_t<R>>, Alloc>;
```

1-4) Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para `multiset` para permitir a dedução a partir de um range de iteradores (sobrecargas (1,3)) e [std::initializer_list](<#/doc/utility/initializer_list>) (sobrecargas (2,4)).

5,6) Estes guias de dedução são fornecidos para `multiset` para permitir a dedução a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e um [`input_range`](<#/doc/ranges/input_range>).

Estas sobrecargas participam da resolução de sobrecarga somente se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>), `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>), e `Comp` não satisfaz [Allocator](<#/doc/named_req/Allocator>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de ranges; sobrecarga (5,6)

### Exemplo

Run this code
```cpp
    #include <set>
    
    int main()
    {
        // o guia #2 deduz std::multiset<int>
        std::multiset s = {1, 2, 3, 4};
    
        // o guia #1 deduz std::multiset<int>
        std::multiset s2(s.begin(), s.end());
    }
```