# guias de dedução para std::flat_multimap

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
template< class KeyContainer, class MappedContainer,
class Compare = std::less<typename KeyContainer::value_type> >
flat_multimap( KeyContainer, MappedContainer, Compare = Compare() )
-> flat_multimap<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer, class Allocator >
flat_multimap( KeyContainer, MappedContainer, Allocator )
-> flat_multimap<typename KeyContainer::value_type,
typename MappedContainer::value_type,
std::less<typename KeyContainer::value_type>,
KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer,
class Compare, class Allocator >
flat_multimap( KeyContainer, MappedContainer, Compare, Allocator )
-> flat_multimap<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer,
class Compare = std::less<typename KeyContainer::value_type> >
flat_multimap( std::sorted_equivalent_t, KeyContainer, MappedContainer,
Compare = Compare() )
-> flat_multimap<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer, class Allocator >
flat_multimap( std::sorted_equivalent_t, KeyContainer, MappedContainer,
Allocator )
-> flat_multimap<typename KeyContainer::value_type,
typename MappedContainer::value_type,
std::less<typename KeyContainer::value_type>,
KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer,
class Compare, class Allocator>
flat_multimap( std::sorted_equivalent_t, KeyContainer, MappedContainer,
Compare, Allocator )
-> flat_multimap<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class InputIter,
class Compare = std::less</*iter-key-type*/<InputIter>> >
flat_multimap( InputIter, InputIter, Compare = Compare() )
-> flat_multimap</*iter-key-type*/<InputIter>,
/*iter-mapped-type*/<InputIter>, Compare>;
template< class InputIter,
class Compare = std::less</*iter-key-type*/<InputIter>> >
flat_multimap( std::sorted_equivalent_t, InputIter, InputIter,
Compare = Compare() )
-> flat_multimap</*iter-key-type*/<InputIter>,
/*iter-mapped-type*/<InputIter>, Compare>;
template< ranges::input_range R,
class Compare = std::less</*range-key-type*/<R>>,
class Allocator = allocator<byte> >
flat_multimap( std::from_range_t, R&&, Compare = Compare(),
Allocator = Allocator() )
-> flat_multimap</*range-key-type*/<R>, /*range-mapped-type*/<R>, Compare,
std::vector</*range-key-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-key-type*/<R>>>,
std::vector</*range-mapped-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-mapped-type*/<R>>>>;
template< ranges::input_range R, class Allocator >
flat_multimap( std::from_range_t, R&&, Allocator )
-> flat_multimap</*range-key-type*/<R>, /*range-mapped-type*/<R>,
std::less</*range-key-type*/<R>>,
std::vector</*range-key-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-key-type*/<R>>>,
std::vector</*range-mapped-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-mapped-type*/<R>>>>;
template< class Key, class T, class Compare = std::less<Key> >
flat_multimap( std::initializer_list<pair<Key, T>>, Compare = Compare() )
-> flat_multimap<Key, T, Compare>;
template< class Key, class T, class Compare = std::less<Key> >
flat_multimap( std::sorted_equivalent_t, std::initializer_list<pair<Key, T>>,
Compare = Compare() )
-> flat_multimap<Key, T, Compare>;
```

Esses [guias de dedução](<#/doc/language/ctad>) são fornecidos para ` para permitir a dedução a partir de:

1) Um key-container, um mapped-container e um comparador.

2) Um key-container, um mapped-container e um alocador.

3) Um key-container, um mapped-container, um comparador e um alocador.

4) A tag std::sorted_equivalent_t, um key-container, um mapped-container e um comparador.

5) A tag std::sorted_equivalent_t, um key-container, um mapped-container e um alocador.

6) A tag std::sorted_equivalent_t, um key-container, um mapped-container, um comparador e um alocador.

7) Um range de iteradores e um comparador.

8) A tag std::sorted_equivalent_t, um range de iteradores e um comparador.

9) A tag [std::from_range_t](<#/doc/ranges/from_range>), um range [`input_range`](<#/doc/ranges/input_range>), um comparador e um alocador.

10) A tag [std::from_range_t](<#/doc/ranges/from_range>), um range [`input_range`](<#/doc/ranges/input_range>) e um alocador.

11) O [std::initializer_list](<#/doc/utility/initializer_list>) e um comparador.

12) A tag std::sorted_equivalent_t, o [std::initializer_list](<#/doc/utility/initializer_list>) e um comparador.

Essas sobrecargas participam da resolução de sobrecarga somente se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>), `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>), e `Comp` não satisfaz [Allocator](<#/doc/named_req/Allocator>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo