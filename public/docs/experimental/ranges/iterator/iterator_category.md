# std::experimental::ranges::iterator_category

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
struct iterator_category {};
template< class T >
struct iterator_category<T*>;
template< class T >
struct iterator_category<const T> : iterator_category<T> {};
template< class T >
requires requires { typename T::iterator_category; }
struct iterator_category<T>;
```

Calcula a categoria do iterator da classe `I`, se houver. Usuários podem especializar `iterator_category` para um tipo definido pelo programa.

1) O template primário é uma struct vazia.

2) Especialização para ponteiros. Se `T` é um tipo de objeto, fornece um tipo membro `type` igual a ranges::random_access_iterator_tag. Caso contrário, não há membro `type`.

3) Especialização para tipos qualificados com `const`.

4) Especialização para tipos que definem um tipo membro `iterator_category` público e acessível. Se `T::iterator_category` é o mesmo ou derivado de uma das tags de categoria de iterator no namespace `std`, ele é mapeado para a tag correspondente no namespace `ranges` conforme descrito abaixo. Caso contrário, fornece um tipo membro `type` igual a `T::iterator_category`.

  * Se `T::iterator_category` é o mesmo ou deriva de `std::random_access_iterator_tag`, fornece um tipo membro `type` igual a ranges::random_access_iterator_tag.
  * Caso contrário, se `T::iterator_category` é o mesmo ou deriva de `std::bidirectional_iterator_tag`, fornece um tipo membro `type` igual a ranges::bidirectional_iterator_tag.
  * Caso contrário, se `T::iterator_category` é o mesmo ou deriva de `std::forward_iterator_tag`, fornece um tipo membro `type` igual a ranges::forward_iterator_tag.
  * Caso contrário, se `T::iterator_category` é o mesmo ou deriva de `std::input_iterator_tag`, fornece um tipo membro `type` igual a ranges::input_iterator_tag.
  * Caso contrário, se `T::iterator_category` é o mesmo ou deriva de `std::output_iterator_tag`, não há membro `type`.

### Alias template auxiliar

template< class T >
using iterator_category_t = typename ranges::iterator_category&lt;T&gt;::type; | | (ranges TS)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

`input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tagcontiguous_iterator_tag`(C++20) | tipos de classe vazios usados para indicar categorias de iterator
(class)
`input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tag` | tipos de classe vazios usados para indicar categorias de iterator
(class)
`iterator_traits`") | classe de traits de compatibilidade que coleta os tipos associados de um iterator
(alias template)