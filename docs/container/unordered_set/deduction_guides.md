# guias de dedução para std::unordered_set

Definido no cabeçalho `[<unordered_set>](<#/doc/header/unordered_set>)`

```c
template<
class InputIt,
class Hash = std::hash<typename std::iterator_traits<InputIt>::value_type>,
class Pred = std::equal_to<typename std::iterator_traits<InputIt>::value_type>,
class Alloc = std::allocator<typename std::iterator_traits<InputIt>::value_type> >
unordered_set( InputIt, InputIt,
typename /* see below */::size_type = /* see below */,
Hash = Hash(), Pred = Pred(), Alloc = Alloc() )
-> unordered_set<typename std::iterator_traits<InputIt>::value_type,
Hash, Pred, Alloc>;
template< class T,
class Hash = std::hash<T>,
class Pred = std::equal_to<T>,
class Alloc = std::allocator<T> >
unordered_set( std::initializer_list<T>,
typename /* see below */::size_type = /* see below */,
Hash = Hash(), Pred = Pred(), Alloc = Alloc() )
-> unordered_set<T, Hash, Pred, Alloc>;
template< class InputIt, class Alloc >
unordered_set( InputIt, InputIt, typename /* see below */::size_type, Alloc )
-> unordered_set<typename std::iterator_traits<InputIt>::value_type,
std::hash<typename std::iterator_traits<InputIt>::value_type>,
std::equal_to<typename std::iterator_traits<InputIt>::value_type>,
Alloc>;
template< class InputIt, class Hash, class Alloc >
unordered_set( InputIt, InputIt, typename /* see below */::size_type, Hash, Alloc )
-> unordered_set<typename std::iterator_traits<InputIt>::value_type, Hash,
std::equal_to<typename std::iterator_traits<InputIt>::value_type>,
Alloc>;
template< class T, class Alloc >
unordered_set( std::initializer_list<T>, typename /* see below */::size_type, Alloc )
-> unordered_set<T, std::hash<T>, std::equal_to<T>, Alloc>;
template< class T, class Hash, class Alloc >
unordered_set( std::initializer_list<T>, typename /* see below */::size_type,
Hash, Alloc )
-> unordered_set<T, Hash, std::equal_to<T>, Alloc>;
template< ranges::input_range R,
class Hash = std::hash<ranges::range_value_t<R>>,
class Pred = std::equal_to<ranges::range_value_t<R>>,
class Alloc = std::allocator<ranges::range_value_t<R>> >
unordered_set( std::from_range_t, R&&,
typename /* see below */::size_type = /* see below */,
Hash = Hash(), Pred = Pred(), Alloc = Alloc() )
-> unordered_set<ranges::range_value_t<R>, Hash, Pred, Alloc>;
template< ranges::input_range R, class Alloc >
unordered_set( std::from_range_t, R&&,
typename /* see below */::size_type, Alloc )
-> unordered_set<ranges::range_value_t<R>, hash<ranges::range_value_t<R>>,
std::equal_to<ranges::range_value_t<R>>, Alloc>;
template< ranges::input_range R, class Alloc >
unordered_set( std::from_range_t, R&&, Alloc )
-> unordered_set<ranges::range_value_t<R>, hash<ranges::range_value_t<R>>,
std::equal_to<ranges::range_value_t<R>>, Alloc>;
template< ranges::input_range R, class Hash, class Alloc >
unordered_set( std::from_range_t, R&&,
typename /* see below */::size_type, Hash, Alloc )
-> unordered_set<ranges::range_value_t<R>, Hash,
std::equal_to<ranges::range_value_t<R>>, Alloc>;
```

1-6) Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para `unordered_set` para permitir a dedução a partir de um range de iteradores (sobrecargas (1,3,4)) e [std::initializer_list](<#/doc/utility/initializer_list>) (sobrecargas (2,5,6)). Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>), `Alloc` satisfizer [Allocator](<#/doc/named_req/Allocator>), nem `Hash` nem `Pred` satisfizerem [Allocator](<#/doc/named_req/Allocator>), e `Hash` não for um tipo integral.

7-10) Estes guias de dedução são fornecidos para `unordered_set` para permitir a dedução a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e um [`input_range`](<#/doc/ranges/input_range>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

O tipo de parâmetro size_type nestes guias refere-se ao tipo membro size_type do tipo deduzido pelo guia de dedução.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>); sobrecargas (7-10)

### Exemplo

Execute este código
```cpp
    #include <unordered_set>
    
    int main()
    {
        // o guia #2 deduz std::unordered_set<int>
        std::unordered_set s = {1, 2, 3, 4};
    
        // o guia #1 deduz std::unordered_set<int>
        std::unordered_set s2(s.begin(), s.end());
    }
```