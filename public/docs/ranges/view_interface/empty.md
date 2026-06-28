# std::ranges::view_interface&lt;D&gt;::empty

```cpp
constexpr bool empty()  
requires ranges::sized_range<D> || ranges::forward_range<D>; // (1) (desde C++20)
```
```cpp
constexpr bool empty() const  
requires ranges::sized_range<const D> || ranges::forward_range<const D>; // (2) (desde C++20)
```
A implementação padrão da função membro `empty()` verifica se o tamanho do objeto do tipo derivado é 0 (se válido), ou se o iterador inicial e o sentinela se comparam como iguais.

1) Seja `derived` uma referência vinculada a `static_cast<D&>(*this)`. Equivalente a `return ranges::size(derived) == 0;` se `D` satisfaz [`sized_range`](<#/doc/ranges/sized_range>). Caso contrário, equivalente a `return ranges::begin(derived) == ranges::end(derived);`.

2) O mesmo que (1), exceto que `derived` é `static_cast<const D&>(*this)`.

### Parâmetros

(nenhum)

### Valor de retorno

`true` se o tamanho do objeto do tipo derivado for 0 (se `D` satisfaz [std::ranges::sized_range](<#/doc/ranges/sized_range>)), ou se seu iterador inicial e o sentinela se comparam como iguais, `false` caso contrário.

### Notas

Os seguintes tipos derivados podem usar a implementação padrão de `empty`:

*   [`std::ranges::common_view`](<#/doc/ranges/common_view>)
*   [`std::ranges::drop_view`](<#/doc/ranges/drop_view>)
*   [`std::ranges::drop_while_view`](<#/doc/ranges/drop_while_view>)
*   [`std::ranges::elements_view`](<#/doc/ranges/elements_view>)
*   [`std::ranges::filter_view`](<#/doc/ranges/filter_view>)
*   [`std::ranges::join_view`](<#/doc/ranges/join_view>)
*   [`std::ranges::lazy_split_view`](<#/doc/ranges/lazy_split_view>)
*   [`std::ranges::reverse_view`](<#/doc/ranges/reverse_view>)
*   [`std::ranges::single_view`](<#/doc/ranges/single_view>)
*   [`std::ranges::split_view`](<#/doc/ranges/split_view>)
*   [`std::ranges::take_view`](<#/doc/ranges/take_view>)
*   [`std::ranges::take_while_view`](<#/doc/ranges/take_while_view>)
*   [`std::ranges::transform_view`](<#/doc/ranges/transform_view>)

*   [`std::ranges::adjacent_transform_view`](<#/doc/ranges/adjacent_transform_view>)
*   [`std::ranges::adjacent_view`](<#/doc/ranges/adjacent_view>)
*   [`std::ranges::as_const_view`](<#/doc/ranges/as_const_view>)
*   [`std::ranges::as_rvalue_view`](<#/doc/ranges/as_rvalue_view>)
*   [`std::ranges::cartesian_product_view`](<#/doc/ranges/cartesian_product_view>)
*   [`std::ranges::chunk_view`](<#/doc/ranges/chunk_view>)
*   [`std::ranges::chunk_by_view`](<#/doc/ranges/chunk_by_view>)
*   [`std::ranges::join_with_view`](<#/doc/ranges/join_with_view>)
*   [`std::ranges::repeat_view`](<#/doc/ranges/repeat_view>)
*   [`std::ranges::slide_view`](<#/doc/ranges/slide_view>)
*   [`std::ranges::stride_view`](<#/doc/ranges/stride_view>)
*   [`std::ranges::zip_view`](<#/doc/ranges/zip_view>)
*   [`std::ranges::zip_transform_view`](<#/doc/ranges/zip_transform_view>)

(desde C++23)

Embora [std::ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>) herde de [std::ranges::view_interface](<#/doc/ranges/view_interface>) e não declare a função membro `empty()`, ele não pode usar a implementação padrão, porque nunca satisfaz nem [std::ranges::sized_range](<#/doc/ranges/sized_range>) nem [std::ranges::forward_range](<#/doc/ranges/forward_range>).

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <ranges>
     
    int main()
    {
        constexpr std::array a{0, 1, 2, 3, 4};
        static_assert(!std::ranges::single_view(a).empty());
        static_assert((a | std::views::take(0)).empty());
        static_assert(!(a | std::views::take(5)).empty());
        static_assert((a | std::views::drop(5)).empty());
        static_assert(!(a | std::views::drop(3)).empty());
        static_assert(std::views::iota(0,0).empty());
        static_assert(!std::views::iota(0).empty());
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

| DR | Aplicado a | Comportamento conforme publicado | Comportamento correto |
|---|---|---|---|
| [LWG 3715](<https://cplusplus.github.io/LWG/issue3715>) | C++20 | `empty()` suportava apenas tipos [`forward_range`](<#/doc/ranges/forward_range>) | Tipos apenas [`sized_range`](<#/doc/ranges/sized_range>) também são suportados |

### Veja também

| [ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio<br>(modelo de função) |
|---|---|
| [ ranges::empty](<#/doc/ranges/empty>)(C++20) | verifica se um range está vazio<br>(objeto de ponto de customização) |
*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.