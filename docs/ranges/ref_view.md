# std::ranges::ref_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::range R >
requires std::is_object_v<R>
class ref_view
: public ranges::view_interface<ref_view<R>>
```

`ref_view` é uma [`view`](<#/doc/ranges/view>) dos elementos de algum outro [`range`](<#/doc/ranges/range>). Ela encapsula uma referência para esse `range`.

### Membros de dados

Nome do membro | Definição
---|---
`_r__` (privado) | Um ponteiro do tipo `R*` para o range subjacente.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/ref_view>) | constrói uma `ref_view` que referencia o range fornecido
(função membro pública)
[ base](<#/doc/ranges/ref_view>) | retorna a referência para o range referenciado
(função membro pública)
[ begin](<#/doc/ranges/ref_view>) | retorna o iterator inicial do range referenciado
(função membro pública)
[ end](<#/doc/ranges/ref_view>) | retorna o sentinel do range referenciado
(função membro pública)
[ empty](<#/doc/ranges/ref_view>) | verifica se o range referenciado está vazio
(função membro pública)
[ size](<#/doc/ranges/ref_view>) | retorna o tamanho do [`sized_range`](<#/doc/ranges/sized_range>) referenciado
(função membro pública)
[ data](<#/doc/ranges/ref_view>) | retorna o ponteiro para o início do [`contiguous_range`](<#/doc/ranges/contiguous_range>) referenciado
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

## std::ranges::ref_view::ref_view

```cpp
template< /*different-from*/<ref_view> T >
requires std::convertible_to<T, R&> && requires { _FUN(std::declval<T>()); }
constexpr ref_view( T&& t );  // (desde C++20)
```

Inicializa `_r__` com [std::addressof](<#/doc/memory/addressof>)(static_cast<R&>([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t))).

/*different-from*/<T, U> é satisfeito se e somente se [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt; e [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt; não são do mesmo tipo, e sobrecargas de `__FUN_` são declaradas como void _FUN(R&); void _FUN(R&&) = delete;.

### Parâmetros

- **t** — range a ser referenciado

## std::ranges::ref_view::base

```cpp
constexpr R& base() const;  // (desde C++20)
```

Equivalente a return *r_;.

## std::ranges::ref_view::begin

```cpp
constexpr ranges::iterator_t<R> begin() const;  // (desde C++20)
```

Equivalente a return [ranges::begin](<#/doc/ranges/begin>)(*r_);.

## std::ranges::ref_view::end

```cpp
constexpr ranges::sentinel_t<R> end() const;  // (desde C++20)
```

Equivalente a return [ranges::end](<#/doc/ranges/end>)(*r_);.

## std::ranges::ref_view::empty

```cpp
constexpr bool empty() const
requires requires { ranges::empty(*r_); };  // (desde C++20)
```

Equivalente a return [ranges::empty](<#/doc/ranges/empty>)(*r_);.

## std::ranges::ref_view::size

```cpp
constexpr auto size() const
requires ranges::sized_range<R>;  // (desde C++20)
```

Equivalente a return [ranges::size](<#/doc/ranges/size>)(*r_);.

## std::ranges::ref_view::data

```cpp
constexpr auto data() const
requires ranges::contiguous_range<R>;  // (desde C++20)
```

Equivalente a return [ranges::data](<#/doc/ranges/data>)(*r_);.

### Guias de dedução

```cpp
template< class R >
ref_view( R& ) -> ref_view<R>;  // (desde C++20)
```

### Templates auxiliares

```cpp
template< class T >
constexpr bool enable_borrowed_range<ranges::ref_view<T>> = true;  // (desde C++20)
```

Esta especialização de [`std::ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `ref_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        const std::string s{"cosmos"};
    
        const std::ranges::take_view tv{s, 3};
        const std::ranges::ref_view rv{tv};
    
        std::cout
            << std::boolalpha
            << "call empty() : " << rv.empty() << '\n'
            << "call size()  : " << rv.size() << '\n'
            << "call begin() : " << *rv.begin() << '\n'
            << "call end()   : " << *(rv.end() - 1) << '\n'
            << "call data()  : " << rv.data() << '\n'
            << "call base()  : " << rv.base().size() << '\n' // ~> tv.size()
            << "range-for    : ";
    
        for (const auto c : rv)
            std::cout << c;
        std::cout << '\n';
    }
```

Saída:
```
    call empty() : false
    call size()  : 3
    call begin() : c
    call end()   : s
    call data()  : cosmos
    call base()  : 3
    range-for    : cos
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[P2325R3](<https://wg21.link/P2325R3>) | C++20 | construtor padrão foi fornecido como [`view`](<#/doc/ranges/view>)
deve ser [`default_initializable`](<#/doc/concepts/default_initializable>) | removido junto com o requisito

### Veja também

[ reference_wrapper](<#/doc/utility/functional/reference_wrapper>)(C++11) | wrapper de referência [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>)
(template de classe)
[ ranges::owning_view](<#/doc/ranges/owning_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) com propriedade única de algum [`range`](<#/doc/ranges/range>)
(template de classe)
[ views::all_tviews::all](<#/doc/ranges/all_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que inclui todos os elementos de um [`range`](<#/doc/ranges/range>)
(template de alias) (objeto adaptador de range)