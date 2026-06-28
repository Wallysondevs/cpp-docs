# Guias de dedução para std::flat_set

Definido no cabeçalho `[<flat_set>](<#/doc/header/flat_set>)`

```c
template< class KeyContainer,
class Compare = std::less<typename KeyContainer::value_type> >
flat_set( KeyContainer, Compare = Compare() )
-> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;
template< class KeyContainer, class Allocator >
flat_set( KeyContainer, Allocator )
-> flat_set<typename KeyContainer::value_type,
std::less<typename KeyContainer::value_type>, KeyContainer>;
template< class KeyContainer, class Compare, class Allocator >
flat_set( KeyContainer, Compare, Allocator )
-> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;
template< class KeyContainer,
class Compare = std::less<typename KeyContainer::value_type> >
flat_set( std::sorted_unique_t, KeyContainer, Compare = Compare() )
-> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;
template< class KeyContainer, class Allocator >
flat_set( std::sorted_unique_t, KeyContainer, Allocator )
-> flat_set<typename KeyContainer::value_type,
std::less<typename KeyContainer::value_type>, KeyContainer>;
template< class KeyContainer, class Compare, class Allocator >
flat_set( std::sorted_unique_t, KeyContainer, Compare, Allocator )
-> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;
template< class InputIter,
class Compare = std::less</*iter-value-type*/<InputIter>> >
flat_set( InputIter, InputIter, Compare = Compare() )
-> flat_set</*iter-value-type*/<InputIter>, Compare>;
template< class InputIter,
class Compare = std::less</*iter-value-type*/<InputIter>> >
flat_set( std::sorted_unique_t, InputIter, InputIter, Compare = Compare() )
-> flat_set</*iter-value-type*/<InputIter>, Compare>;
template< ranges::input_range R,
class Compare = std::less<ranges::range_value_t<R>>,
class Allocator = std::allocator<ranges::range_value_t<R>> >
flat_set( std::from_range_t, R&&, Compare = Compare(), Allocator = Allocator() )
-> flat_set<ranges::range_value_t<R>, Compare,
std::vector<ranges::range_value_t<R>,
/*alloc-rebind*/<Allocator, ranges::range_value_t<R>>>>;
template< ranges::input_range R, class Allocator >
flat_set( std::from_range_t, R&&, Allocator )
-> flat_set<ranges::range_value_t<R>, std::less<ranges::range_value_t<R>>,
std::vector<ranges::range_value_t<R>,
/*alloc-rebind*/<Allocator, ranges::range_value_t<R>>>>;
template< class Key, class Compare = std::less<Key> >
flat_set( std::initializer_list<Key>, Compare = Compare() )
-> flat_set<Key, Compare>;
template< class Key, class Compare = std::less<Key> >
flat_set( std::sorted_unique_t,
std::initializer_list<Key>, Compare = Compare() )
-> flat_set<Key, Compare>;
```

Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para ` para permitir a dedução a partir de:

1) Um container e um comparador.

2) Um container e um alocador.

3) Um container, um comparador e um alocador.

4) A tag std::sorted_unique_t, um container e um comparador.

5) A tag std::sorted_unique_t, um container e um alocador.

6) A tag std::sorted_unique_t, um container, um comparador e um alocador.

7) Um range de iteradores e um comparador.

8) A tag std::sorted_unique_t, um range de iteradores e um comparador.

9) A tag [std::from_range_t](<#/doc/ranges/from_range>), um range [`input_range`](<#/doc/ranges/input_range>), um comparador e um alocador.

10) A tag [std::from_range_t](<#/doc/ranges/from_range>), um range [`input_range`](<#/doc/ranges/input_range>) e um alocador.

11) O [std::initializer_list](<#/doc/utility/initializer_list>) e um comparador.

12) A tag std::sorted_unique_t, o [std::initializer_list](<#/doc/utility/initializer_list>) e um comparador.

Essas sobrecargas participam da resolução de sobrecarga apenas se `InputIt` satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>), `Alloc` satisfizer [Allocator](<#/doc/named_req/Allocator>), e `Comp` não satisfizer [Allocator](<#/doc/named_req/Allocator>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo