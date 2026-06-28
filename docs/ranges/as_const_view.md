# std::ranges::views::as_const, std::ranges::as_const_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V >
requires ranges::input_range<V>
class as_const_view
: public ranges::view_interface<as_const_view<V>>
namespace views {
inline constexpr /* unspecified */ as_const = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
requires /* veja abaixo */
constexpr ranges::view auto as_const( R&& r );
```

  
1) Um adaptador de range que representa uma view da [`view`](<#/doc/ranges/view>) subjacente que também é um [`constant_range`](<#/doc/ranges/constant_range>). Uma `as_const_view` sempre tem elementos somente leitura (se não estiver vazia).

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Seja `e` uma subexpressão, seja `T` `decltype((e))`, e seja `U` [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;. Então a expressão `views::as_const(e)` é [equivalente em expressão](<#/doc/language/expressions>) a: 

  * [views::all](<#/doc/ranges/all_view>)(e), se for uma expressão bem formada e [views::all_t](<#/doc/ranges/all_view>)&lt;T&gt; modelar [`constant_range`](<#/doc/ranges/constant_range>); 
  * caso contrário, [std::span](<#/doc/container/span>)&lt;const X, Extent&gt;(e) para algum tipo `X` e alguma extensão `Extent` se `U` denotar [std::span](<#/doc/container/span>)<X, Extent>; 
  * caso contrário, [ranges::ref_view](<#/doc/ranges/ref_view>)(static_cast&lt;const X&&gt;(e.base())) se `U` denotar [ranges::ref_view](<#/doc/ranges/ref_view>)&lt;X&gt; para algum tipo `X` e `const X` modelar [`constant_range`](<#/doc/ranges/constant_range>); 
  * caso contrário, [ranges::ref_view](<#/doc/ranges/ref_view>)(static_cast&lt;const U&&gt;(e)) se `e` for um lvalue, `const U` modelar [`constant_range`](<#/doc/ranges/constant_range>), e `U` não modelar [`view`](<#/doc/ranges/view>). 
  * caso contrário, `as_const_view{e}`.

`as_const_view` sempre modela [`constant_range`](<#/doc/ranges/constant_range>), e modela os conceitos [`contiguous_range`](<#/doc/ranges/contiguous_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`borrowed_range`](<#/doc/ranges/borrowed_range>), [`common_range`](<#/doc/ranges/common_range>), e [`sized_range`](<#/doc/ranges/sized_range>) quando a view subjacente `V` modela os conceitos respectivos. 

### Membros de dados

Objeto membro  |  Definição   
---|---
`_base__` (private) |  A view subjacente do tipo `V`.  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/as_const_view>) |  constrói uma `as_const_view`   
(função membro pública)  
[ base](<#/doc/ranges/as_const_view>) |  retorna a view subjacente `V`   
(função membro pública)  
[ begin](<#/doc/ranges/as_const_view>) |  retorna o iterador de início da `as_const_view`   
(função membro pública)  
[ end](<#/doc/ranges/as_const_view>) |  retorna o iterador de fim da `as_const_view`   
(função membro pública)  
[ size](<#/doc/ranges/as_const_view>) |  retorna o tamanho da view se ela for limitada   
(função membro pública)  
  
#####  Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)  
  
[ empty](<#/doc/ranges/view_interface/empty>) |  retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) |  retorna um iterador constante para o início do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) |  retorna uma sentinela para o iterador constante do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) |  retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ data](<#/doc/ranges/view_interface/data>) |  obtém o endereço dos dados da view derivada. Fornecido se seu tipo de iterador satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ front](<#/doc/ranges/view_interface/front>) |  retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ back](<#/doc/ranges/view_interface/back>) |  retorna o último elemento na view derivada. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator[]](<#/doc/ranges/view_interface/operator_at>) |  retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
  
##  std::ranges::as_const_view::as_const_view

```cpp
as_const_view() requires std::default_initializable<V> = default;  // (1) (desde C++23)
constexpr explicit as_const_view( V base );  // (2) (desde C++23)
```

  
1) Inicializa por valor `_base__` através de seu inicializador de membro padrão (`= V()`).

2) Inicializa `_base__` com `std::move(base)`.

###  Parâmetros

base  |  \-  |  uma view   
  
##  std::ranges::as_const_view::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++23)
constexpr V base() &&;  // (2) (desde C++23)
```

  
Retorna a view subjacente. 

1) Constrói por cópia o resultado a partir da view subjacente. Equivalente a `return base_;`.

2) Constrói por movimento o resultado a partir da view subjacente. Equivalente a `return std::move(base_);`.

##  std::ranges::as_const_view::begin

```cpp
constexpr auto begin() requires (!__simple_view<V>);  // (1) (desde C++23)
constexpr auto begin() const requires ranges::range<const V>;  // (2) (desde C++23)
```

  
Retorna o iterador constante da view. 

1,2) Equivalente a `return [ranges::cbegin](<#/doc/ranges/cbegin>)(base_);`

##  std::ranges::as_const_view::end

```cpp
constexpr auto end() requires (!__simple_view<V>);  // (1) (desde C++23)
constexpr auto end() const requires ranges::range<const V>;  // (2) (desde C++23)
```

  
Retorna a sentinela constante da view. 

1,2) Equivalente a `return [ranges::cend](<#/doc/ranges/cend>)(base_);`

##  std::ranges::as_const_view::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++23)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++23)
```

  
Retorna o tamanho da view se a view for limitada. 

1,2) Equivalente a `return [ranges::size](<#/doc/ranges/size>)(base_);`

### Guias de dedução

```cpp
template< class R >
as_const_view( R&& ) -> as_const_view<views::all_t<R>>;  // (desde C++23)
```

  
### Modelos auxiliares

```cpp
template< class T >
constexpr bool enable_borrowed_range<std::ranges::as_const_view<T>> =
ranges::enable_borrowed_range<T>;  // (desde C++23)
```

  
Esta especialização de [`std::ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `as_const_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente a satisfaz. 

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_ranges_as_const`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `ranges::as_const_view`, [std::const_iterator](<#/doc/iterator/const_iterator>)  
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <ranges>
     
    int main()
    {
        int x[]{1, 2, 3, 4, 5};
     
        auto v1 = x | std::views::drop(2);
        assert(v1.back() == 5);
        v1[0]++; // OK, pode modificar elemento não-const
     
        auto v2 = x | std::views::drop(2) | std::views::as_const;
        assert(v2.back() == 5);
        // v2[0]++; // Erro em tempo de compilação, não pode modificar elemento somente leitura
    }
```

### Veja também

[ ranges::as_rvalue_viewviews::as_rvalue](<#/doc/ranges/as_rvalue_view>)(C++23) |  uma [`view`](<#/doc/ranges/view>) de uma sequência que converte cada elemento para um rvalue  
(modelo de classe) (objeto adaptador de range)  
[ ranges::cbegin](<#/doc/ranges/cbegin>)(C++20) |  retorna um iterador para o início de um range somente leitura  
(objeto de ponto de customização)  
[ ranges::cend](<#/doc/ranges/cend>)(C++20) |  retorna uma sentinela indicando o fim de um range somente leitura  
(objeto de ponto de customização)  
[ as_const](<#/doc/utility/as_const>)(C++17) |  obtém uma referência const para seu argumento   
(modelo de função)  
[ basic_const_iterator](<#/doc/iterator/basic_const_iterator>)(C++23) |  adaptador de iterador que converte um iterador em um iterador constante   
(modelo de classe)