# std::ranges::views::empty, std::ranges::empty_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template<class T>
requires std::is_object_v<T>
class empty_view : public ranges::view_interface<empty_view<T>>
namespace views {
template<class T>
constexpr empty_view<T> empty{};
}
```

1) Uma fábrica de ranges que produz uma [`view`](<#/doc/ranges/view>) sem elementos de um tipo particular.

2) Template de variável para `empty_view`.

### Funções membro

begin[static] | retorna nullptr
(função membro estática pública)
end[static] | retorna nullptr
(função membro estática pública)
data[static] | retorna nullptr
(função membro estática pública)
size[static] | retorna ​0​
(função membro estática pública)
empty[static] | retorna true
(função membro estática pública)

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

## std::ranges::empty_view::begin

```cpp
static constexpr T* begin() noexcept { return nullptr; }  // (desde C++20)
```

`empty_view` não referencia nenhum elemento.

## std::ranges::empty_view::end

```cpp
static constexpr T* end() noexcept { return nullptr; }  // (desde C++20)
```

`empty_view` não referencia nenhum elemento.

## std::ranges::empty_view::data

```cpp
static constexpr T* data() noexcept { return nullptr; }  // (desde C++20)
```

`empty_view` não referencia nenhum elemento.

## std::ranges::empty_view::size

```cpp
static constexpr std::size_t size() noexcept { return 0; }  // (desde C++20)
```

`empty_view` está sempre vazia.

## std::ranges::empty_view::empty

```cpp
static constexpr bool empty() noexcept { return true; }  // (desde C++20)
```

`empty_view` está sempre vazia.

### Templates auxiliares

```cpp
template<class T>
constexpr bool ranges::enable_borrowed_range<ranges::empty_view<T>> = true;  // (desde C++20)
```

Esta especialização de [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `empty_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>).

### Observações

Embora `empty_view` obtenha as funções membro `front`, `back` e operator[] de `view_interface`, chamadas a elas sempre resultam em comportamento indefinido, já que uma `empty_view` está sempre vazia.

A função de conversão operator bool herdada sempre retorna false.

### Exemplo

Execute este código
```cpp
    #include <ranges>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        ranges::empty_view<long> e;
        static_assert(ranges::empty(e)); // uses operator bool
        static_assert(0 == e.size());
        static_assert(nullptr == e.data());
        static_assert(nullptr == e.begin());
        static_assert(nullptr == e.end());
        static_assert(nullptr == e.cbegin());
        static_assert(nullptr == e.cend());
    }
```

### Veja também

[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(template de classe)
[ ranges::single_viewviews::single](<#/doc/ranges/single_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que contém um único elemento de um valor especificado
(template de classe) (objeto de ponto de customização)
[ views::all_tviews::all](<#/doc/ranges/all_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que inclui todos os elementos de um [`range`](<#/doc/ranges/range>)
(template de alias) (objeto adaptador de range)
[ ranges::ref_view](<#/doc/ranges/ref_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) dos elementos de algum outro [`range`](<#/doc/ranges/range>)
(template de classe)