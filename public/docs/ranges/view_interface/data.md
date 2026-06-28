# std::ranges::view_interface&lt;D&gt;::data

```cpp
constexpr auto data()
requires std::contiguous_iterator<ranges::iterator_t<D>>;  // (1) (desde C++20)
constexpr auto data() const
requires ranges::range<const D> &&
std::contiguous_iterator<ranges::iterator_t<const D>>;  // (2) (desde C++20)
```

  
A implementação padrão da função membro `data()` obtém o endereço denotado pelo iterator inicial via std::to_address, que é também o endereço mais baixo do armazenamento contíguo (implicado por [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>)) referenciado pela view do tipo derivado quando a view não está vazia. 

1) Seja `derived` static_cast<D&>(*this). Equivalente a return [std::to_address](<#/doc/memory/to_address>)([ranges::begin](<#/doc/ranges/begin>)(derived));.

2) O mesmo que (1), exceto que `derived` é static_cast&lt;const D&&gt;(*this).

### Parâmetros

(nenhum) 

### Valor de retorno

O endereço denotado pelo iterator inicial. 

### Observações

Os seguintes tipos derivados podem usar a implementação padrão de `data()`: 

  * [std::ranges::common_view](<#/doc/ranges/common_view>)
  * [std::ranges::drop_view](<#/doc/ranges/drop_view>)
  * [std::ranges::drop_while_view](<#/doc/ranges/drop_while_view>)
  * [std::ranges::ref_view](<#/doc/ranges/ref_view>)
  * [std::ranges::subrange](<#/doc/ranges/subrange>)
  * [std::ranges::take_view](<#/doc/ranges/take_view>)
  * [std::ranges::take_while_view](<#/doc/ranges/take_while_view>)

Os seguintes tipos são derivados de [std::ranges::view_interface](<#/doc/ranges/view_interface>) e não declaram sua própria função membro `data()`, mas não podem usar a implementação padrão, porque seus tipos de iterator nunca satisfazem [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>): 

  * [std::ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>)
  * [std::ranges::elements_view](<#/doc/ranges/elements_view>)
  * [std::ranges::filter_view](<#/doc/ranges/filter_view>)
  * [std::ranges::iota_view](<#/doc/ranges/iota_view>)
  * [std::ranges::join_view](<#/doc/ranges/join_view>)
  * std::ranges::lazy_split_view
  * [std::ranges::reverse_view](<#/doc/ranges/reverse_view>)
  * [std::ranges::split_view](<#/doc/ranges/split_view>)
  * [std::ranges::transform_view](<#/doc/ranges/transform_view>)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    int main() {
        constexpr std::string_view str { "Hello, C++20!" };
        std::cout << (str | std::views::drop(7)).data() << '\n';
        constexpr static std::array a { 1,2,3,4,5 };
        constexpr auto v { a | std::views::take(3) };
        static_assert( &a[0] == v.data() );
    }
```

Saída: 
```
    C++20!
```

### Veja também

[ data](<#/doc/iterator/data>)(C++17) |  obtém o ponteiro para o array subjacente   
(modelo de função)  
[ ranges::data](<#/doc/ranges/data>)(C++20) |  obtém um ponteiro para o início de um range contíguo  
(objeto de ponto de customização)  
[ ranges::cdata](<#/doc/ranges/cdata>)(C++20) |  obtém um ponteiro para o início de um range contíguo somente leitura  
(objeto de ponto de customização)  
[ to_address](<#/doc/memory/to_address>)(C++20) |  obtém um ponteiro bruto de um tipo semelhante a ponteiro   
(modelo de função)