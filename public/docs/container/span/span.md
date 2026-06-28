# std::span&lt;T,Extent&gt;::span

```cpp
constexpr span() noexcept;  // (1) (desde C++20)
template< class It >
explicit(extent != std::dynamic_extent)
constexpr span( It first, size_type count );  // (2) (desde C++20)
template< class It, class End >
explicit(extent != std::dynamic_extent)
constexpr span( It first, End last );  // (3) (desde C++20)
template< std::size_t N >
constexpr span( std::type_identity_t<element_type> (&arr)[N] ) noexcept;  // (4) (desde C++20)
template< class U, std::size_t N >
constexpr span( std::array<U, N>& arr ) noexcept;  // (5) (desde C++20)
template< class U, std::size_t N >
constexpr span( const std::array<U, N>& arr ) noexcept;  // (6) (desde C++20)
template< class R >
explicit(extent != std::dynamic_extent)
constexpr span( R&& range );  // (7) (desde C++20)
explicit(extent != std::dynamic_extent)
constexpr span( std::initializer_list<value_type> il ) noexcept;  // (8) (desde C++26)
template< class U, std::size_t N >
explicit(extent != std::dynamic_extent && N == std::dynamic_extent)
constexpr span( const std::span<U, N>& source ) noexcept;  // (9) (desde C++20)
constexpr span( const span& other ) noexcept = default;  // (10) (desde C++20)
```

Constrói um `span`.

1) Constrói um span vazio cujo data() == nullptr e size() == 0.

  * Esta sobrecarga participa da resolução de sobrecarga apenas se extent == 0 || extent == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>).

2) Constrói um span que é uma view sobre o range `[`first`, `first + count`)`; o span resultante tem data() == [std::to_address](<#/doc/memory/to_address>)(first) e size() == count.

  * O comportamento é indefinido se `[`first`, `first + count`)` não for um range válido, se `It` não modelar de fato [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), ou se extent != [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) && count != extent.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se

  * `It` satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>),
  * a conversão de [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;It&gt; para element_type for no máximo uma qualification conversion.

3) Constrói um span que é uma view sobre o range `[`first`, `last`)`; o span resultante tem data() == [std::to_address](<#/doc/memory/to_address>)(first) e size() == last-first.

  * O comportamento é indefinido se `[`first`, `last`)` não for um range válido, se `It` não modelar de fato [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), se `End` não modelar de fato [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>) para `It`, ou se extent != [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) && last-first != extent.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se

  * `It` satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>),
  * `End` satisfaz [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>) para `It`,
  * a conversão de [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;It&gt; para element_type for no máximo uma qualification conversion, e
  * [std::is_convertible_v](<#/doc/types/is_convertible>)<End, [std::size_t](<#/doc/types/size_t>)> for falso.

4-6) Constrói um span que é uma view sobre o array `arr`; o span resultante tem size() == N e data() == [std::data](<#/doc/iterator/data>)(arr).

  * Estas sobrecargas participam da resolução de sobrecarga apenas se extent == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) || N == extent for verdadeiro e a conversão de [std::remove_pointer_t](<#/doc/types/remove_pointer>)<decltype(data(arr))> para element_type for no máximo uma qualification conversion.

7) Constrói um span que é uma view sobre o range range; o span resultante tem size() == std::[ranges::size](<#/doc/ranges/size>)(range) e data() == std::[ranges::data](<#/doc/ranges/data>)(range).

  * O comportamento é indefinido se `R` não modelar de fato [`contiguous_range`](<#/doc/ranges/contiguous_range>) e [`sized_range`](<#/doc/ranges/sized_range>) ou se `R` não modelar [`borrowed_range`](<#/doc/ranges/borrowed_range>) enquanto element_type for non-const ou se ambos extent != dynamic_extent e std::[ranges::size](<#/doc/ranges/size>)(range) != extent forem verdadeiros.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se

  * `R` satisfaz [`contiguous_range`](<#/doc/ranges/contiguous_range>) e [`sized_range`](<#/doc/ranges/sized_range>),
  * ou `R` satisfaz [`borrowed_range`](<#/doc/ranges/borrowed_range>) ou [std::is_const_v](<#/doc/types/is_const>)<element_type> for verdadeiro,
  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;R&gt; não for uma especialização de `std::span`,
  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;R&gt; não for uma especialização de [std::array](<#/doc/container/array>),
  * [std::is_array_v](<#/doc/types/is_array>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;R&gt;> for falso, e
  * a conversão de std::[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt; para element_type for no máximo uma qualification conversion.

8) Constrói um span que é uma view sobre o initializer list `il`; o span resultante tem size() == il.size() e data() == il.begin().

  * O comportamento é indefinido se ambos extent != dynamic_extent e il.size() != extent forem verdadeiros.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)<element_type> for verdadeiro.

9) Construtor de conversão de outro span `source`; o span resultante tem size() == source.size() e data() == source.data().

  * O comportamento é indefinido se ambos extent != dynamic_extent e source.size() != extent forem verdadeiros.
  * Esta sobrecarga participa da resolução de sobrecarga apenas se pelo menos um de extent == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>), N == [std::dynamic_extent](<#/doc/container/span/dynamic_extent>) e N == extent for verdadeiro e a conversão de `U` para element_type for no máximo uma qualification conversion.

10) Construtor de cópia padrão (defaulted) copia o tamanho e o ponteiro de dados; o span resultante tem size() == other.size() e data() == other.data().

### Parâmetros

- **first** — iterator para o primeiro elemento da sequência
- **count** — número de elementos na sequência
- **last** — iterator após o último elemento da sequência ou outro sentinel
- **arr** — array para construir uma view
- **range** — range para construir uma view
- **source** — outro span para converter
- **other** — outro span para copiar

### Exceções

2) Não lança exceções.

3) Lança o que e quando last - first lança.

7) Lança o que e quando std::[ranges::size](<#/doc/ranges/size>)(r) e std::[ranges::data](<#/doc/ranges/data>)(r) lançam.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_span_initializer_list`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Construindo `std::span` a partir de um [std::initializer_list](<#/doc/utility/initializer_list>), ([8](<#/doc/container/span/span>))

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <span>
    #include <vector>
    
    void print_span(std::span<const int> s)
    {
        for (int n : s)
            std::cout << n << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        int c[]{1, 2, 3};
        print_span(c); // constrói a partir de array
    
        std::array a{4, 5, 6};
        print_span(a); // constrói a partir de std::array
    
        std::vector v{7, 8, 9};
        print_span(v); // constrói a partir de std::vector
    
    #if __cpp_lib_span_initializer_list
        print_span({0, 1, 2}); // constrói a partir de initializer_list
    #else
        print_span({{0, 1, 2}}); // o mesmo, uma solução alternativa
    #endif
    }
```

Saída:
```
    1 2 3 
    4 5 6
    7 8 9
    0 1 2
```

### Veja também

[ data](<#/doc/container/span/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)
[ size](<#/doc/container/span/size>) | retorna o número de elementos
(função membro pública)
[ operator=](<#/>) | atribui um `span`
(função membro pública)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(template de função)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(template de função)