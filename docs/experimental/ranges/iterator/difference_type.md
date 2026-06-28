# std::experimental::ranges::difference_type

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
struct difference_type {};
template< class T >
struct difference_type<T*>;
template< class T >
struct difference_type<const T> : difference_type<std::decay_t<T>> {};
template< class T >
requires requires { typename T::difference_type; }
struct difference_type<T>;
template< class T >
requires !requires { typename T::difference_type; } &&
requires(const T& a, const T& b) { {a - b} -> Integral; }
struct difference_type<T>;
```

Calcula o tipo de diferença associado ao tipo `I`, se houver. Usuários podem especializar `difference_type` para um tipo definido pelo programa.

1) O template primário é uma struct vazia.

2) Especialização para ponteiros. Se `T` é um tipo de objeto, fornece um tipo membro `type` igual a [std::ptrdiff_t](<#/doc/types/ptrdiff_t>). Caso contrário, não há membro `type`.

3) Especialização para tipos qualificados com const.

4) Especialização para tipos que definem um tipo membro `difference_type` público e acessível. Fornece um tipo membro `type` igual a `T::difference_type`.

5) Especialização para tipos que não definem um tipo membro `difference_type` público e acessível, mas que suportam subtração. Fornece um tipo membro `type` igual a [std::make_signed_t](<#/doc/types/make_signed>)<decltype([std::declval](<#/doc/utility/declval>)&lt;T&gt;() - [std::declval](<#/doc/utility/declval>)&lt;T&gt;())>.

### Template de alias auxiliar

template< class T >
using difference_type_t = typename ranges::difference_type&lt;T&gt;::type; | | (ranges TS)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ WeaklyIncrementable](<#/doc/experimental/ranges/iterator/WeaklyIncrementable>) | especifica que um tipo [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) pode ser incrementado com operadores de pré e pós-incremento
(concept)
[ iterator_traits](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/iterator_traits&action=edit&redlink=1> "cpp/experimental/ranges/iterator/iterator traits \(page does not exist\)") | classe de traits de compatibilidade que coleta os tipos associados de um iterator
(alias template)