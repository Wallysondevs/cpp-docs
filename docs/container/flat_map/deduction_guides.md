# Guias de dedução para std::flat_map

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
template< class KeyContainer, class MappedContainer,
class Compare = std::less<typename KeyContainer::value_type> >
flat_map( KeyContainer, MappedContainer, Compare = Compare() )
-> flat_map<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer, class Allocator >
flat_map( KeyContainer, MappedContainer, Allocator )
-> flat_map<typename KeyContainer::value_type,
typename MappedContainer::value_type,
std::less<typename KeyContainer::value_type>,
KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer,
class Compare, class Allocator >
flat_map( KeyContainer, MappedContainer, Compare, Allocator )
-> flat_map<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer,
class Compare = std::less<typename KeyContainer::value_type> >
flat_map( std::sorted_unique_t, KeyContainer, MappedContainer,
Compare = Compare() )
-> flat_map<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer, class Allocator >
flat_map( std::sorted_unique_t, KeyContainer, MappedContainer,
Allocator )
-> flat_map<typename KeyContainer::value_type,
typename MappedContainer::value_type,
std::less<typename KeyContainer::value_type>,
KeyContainer, MappedContainer>;
template< class KeyContainer, class MappedContainer,
class Compare, class Allocator>
flat_map( std::sorted_unique_t, KeyContainer, MappedContainer,
Compare, Allocator )
-> flat_map<typename KeyContainer::value_type,
typename MappedContainer::value_type,
Compare, KeyContainer, MappedContainer>;
template< class InputIter,
class Compare = std::less</*iter-key-type*/<InputIter>> >
flat_map( InputIter, InputIter, Compare = Compare() )
-> flat_map</*iter-key-type*/<InputIter>,
/*iter-mapped-type*/<InputIter>, Compare>;
template< class InputIter,
class Compare = std::less</*iter-key-type*/<InputIter>> >
flat_map( std::sorted_unique_t, InputIter, InputIter,
Compare = Compare() )
-> flat_map</*iter-key-type*/<InputIter>,
/*iter-mapped-type*/<InputIter>, Compare>;
template< ranges::input_range R,
class Compare = std::less</*range-key-type*/<R>>,
class Allocator = allocator<byte> >
flat_map( std::from_range_t, R&&, Compare = Compare(),
Allocator = Allocator() )
-> flat_map</*range-key-type*/<R>, /*range-mapped-type*/<R>, Compare,
std::vector</*range-key-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-key-type*/<R>>>,
std::vector</*range-mapped-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-mapped-type*/<R>>>>;
template< ranges::input_range R, class Allocator >
flat_map( std::from_range_t, R&&, Allocator )
-> flat_map</*range-key-type*/<R>, /*range-mapped-type*/<R>,
std::less</*range-key-type*/<R>>,
std::vector</*range-key-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-key-type*/<R>>>,
std::vector</*range-mapped-type*/<R>,
/*alloc-rebind*/<Allocator,
/*range-mapped-type*/<R>>>>;
template< class Key, class T, class Compare = std::less<Key> >
flat_map( std::initializer_list<pair<Key, T>>, Compare = Compare() )
-> flat_map<Key, T, Compare>;
template< class Key, class T, class Compare = std::less<Key> >
flat_map( std::sorted_unique_t, std::initializer_list<pair<Key, T>>,
Compare = Compare() )
-> flat_map<Key, T, Compare>;
```

Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para ` para permitir a dedução a partir de:

1) Um key-container, um mapped-container e um comparador.

2) Um key-container, um mapped-container e um alocador.

3) Um key-container, um mapped-container, um comparador e um alocador.

4) A tag std::sorted_unique_t, um key-container, um mapped-container e um comparador.

5) A tag std::sorted_unique_t, um key-container, um mapped-container e um alocador.

6) A tag std::sorted_unique_t, um key-container, um mapped-container, um comparador e um alocador.

7) Um range de iteradores e um comparador.

8) A tag std::sorted_unique_t, um range de iteradores e um comparador.

9) A tag [std::from_range_t](<#/doc/ranges/from_range>), um range [`input_range`](<#/doc/ranges/input_range>), um comparador e um alocador.

10) A tag [std::from_range_t](<#/doc/ranges/from_range>), um range [`input_range`](<#/doc/ranges/input_range>) e um alocador.

11) O [std::initializer_list](<#/doc/utility/initializer_list>) e um comparador.

12) A tag std::sorted_unique_t, o [std::initializer_list](<#/doc/utility/initializer_list>) e um comparador.

Essas sobrecargas participam da resolução de sobrecarga apenas se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>), `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>), e `Comp` não satisfaz [Allocator](<#/doc/named_req/Allocator>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo