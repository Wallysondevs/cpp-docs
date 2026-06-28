# std::experimental::ranges::InputIterator

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
concept bool InputIterator =
Iterator<I> && Readable<I> &&
requires { typename ranges::iterator_category_t<I>; } &&
DerivedFrom<ranges::iterator_category_t<I>, ranges::input_iterator_tag>;
```

O concept `InputIterator` é um refinamento de [`Iterator`](<#/doc/experimental/ranges/iterator/Iterator>), adicionando o requisito de que os valores referenciados podem ser lidos (via [`Readable`](<#/doc/experimental/ranges/iterator/Readable>)) e o requisito de que a tag de categoria do iterator esteja presente.

### Notas

Ao contrário dos requisitos de input iterator no padrão C++, `InputIterator` no Ranges TS não exige [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>).