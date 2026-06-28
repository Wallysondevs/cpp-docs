# std::experimental::ranges::value_type

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
struct value_type {};
template< class T >
struct value_type<T*>;
template< class I >
requires std::is_array<I>::value
struct value_type<I> : value_type<std::decay_t<I>> {};
template< class T >
struct value_type<const T> : value_type<std::decay_t<T>> {};
template< class T >
requires requires { typename T::value_type; }
struct value_type<T>;
template< class T >
requires requires { typename T::element_type; }
struct value_type<T>;
```

Calcula o tipo de valor associado do tipo `I`, se houver. Usuários podem especializar `value_type` para um tipo definido pelo programa.

1) O template primário é uma struct vazia.

2) Especialização para ponteiros. Se `T` é um tipo de objeto, fornece um tipo membro `type` igual a [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;. Caso contrário, não há membro `type`.

3) Especialização para tipos de array.

4) Especialização para tipos qualificados com const.

5) Especialização para tipos que definem um tipo membro público e acessível `value_type`. Se `T::value_type` é um tipo de objeto, fornece um tipo membro `type` igual a `T::value_type`. Caso contrário, não há membro `type`.

6) Especialização para tipos que definem um tipo membro público e acessível `element_type` (por exemplo, [std::shared_ptr](<#/doc/memory/shared_ptr>)). Se `T::element_type` é um tipo de objeto, fornece um tipo membro `type` igual a [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;typename T::element_type&gt;. Caso contrário, não há membro `type`.

### Alias template auxiliar

template< class T >
using value_type_t = typename ranges::value_type&lt;T&gt;::type; | | (ranges TS)

### Notas

Se um tipo contém tanto um membro `value_type` quanto um membro `element_type`, então as especializações (5) e (6) são ambíguas.

`value_type` é destinado para uso com tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) como iterators. Não é destinado para uso com ranges.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ Readable](<#/doc/experimental/ranges/iterator/Readable>) | especifica que um tipo é legível aplicando o operador `*`
(concept)
[ iterator_traits](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/iterator_traits&action=edit&redlink=1> "cpp/experimental/ranges/iterator/iterator traits \(page does not exist\)") | classe de traits de compatibilidade que coleta os tipos associados de um iterator
(alias template)