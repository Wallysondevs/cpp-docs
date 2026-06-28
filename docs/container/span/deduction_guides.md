# Guias de dedução para std::span

Definido no cabeçalho `[<span>](<#/doc/header/span>)`

```c
template< class It, class EndOrSize >
span( It, EndOrSize ) -> span<std::remove_reference_t<std::iter_reference_t<It>>>;
(até C++26)
template< class It, class EndOrSize >
span( It, EndOrSize ) -> span<std::remove_reference_t<std::iter_reference_t<It>>,
/*maybe-static-ext*/<EndOrSize>>;
template< class T, std::size_t N >
span( T (&)[N] ) -> span<T, N>;
template< class T, std::size_t N >
span( std::array<T, N>& ) -> span<T, N>;
template< class T, std::size_t N >
span( const std::array<T, N>& ) -> span<const T, N>;
template< class R >
span( R&& ) -> span<std::remove_reference_t<std::ranges::range_reference_t<R>>>;
```

Os seguintes [guias de dedução](<#/doc/language/ctad>) são fornecidos para `span`.

1) Permite que o tipo do elemento seja deduzido a partir do par iterador-sentinela. Também permite que a extensão estática seja deduzida se `EndOrSize` satisfizer [`_integral-constant-like_`](<#/doc/header/span>). (desde C++26). Esta sobrecarga participa da resolução de sobrecarga somente se `It` satisfizer [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).

2-4) Permite que a extensão estática seja deduzida a partir de arrays nativos e [std::array](<#/doc/container/array>).

5) Permite que o tipo do elemento seja deduzido a partir de ranges. Esta sobrecarga participa da resolução de sobrecarga somente se `R` satisfizer [`contiguous_range`](<#/doc/ranges/contiguous_range>).

### Exemplo

```cpp
#include <array>
#include <cstddef>
#include <iomanip>
#include <iostream>
#include <span>
#include <string_view>
#include <vector>
 
void print(std::string_view rem = "", std::size_t size_of = 0, std::size_t extent = 0)
{
    if (rem.empty())
    {
        std::cout << "name │ sizeof │ extent\n"
                     "─────┼────────┼────────\n";
        return;
    }
    std::cout << std::setw(4) << rem << " │ " << std::setw(6) << size_of << " │ ";
    if (extent == std::dynamic_extent)
        std::cout << "dynamic";
    else
        std::cout << extent;
    std::cout << '\n';
}
 
int main()
{
    int a[]{1, 2, 3, 4, 5};
 
    print();
    std::span s1{std::begin(a), std::end(a)}; // guide (1)
    print("s1", sizeof s1, s1.extent);
 
    std::span s2{std::begin(a), 3}; // guide (1)
    print("s2", sizeof s2, s2.extent);
 
#if __cplusplus > 202302L
    std::span s3{std::begin(a), std::integral_constant<std::size_t, 2>{}}; // guide (1)
    print("s3", sizeof s3, s3.extent);
#endif // C++26
 
    std::span s4{a}; // guide (2)
    print("s4", sizeof s4, s4.extent);
 
    std::span<int> s5{a}; // does not use a guide, makes a dynamic span
    print("s5", sizeof s5, s5.extent);
 
    std::array arr{6, 7, 8};
    std::span s6{arr}; // guide (3)
    print("s6", sizeof s6, s6.extent);
    s6[0] = 42; // OK, element_type is 'int'
 
    const std::array arr2{9, 10, 11};
    std::span s7{arr2}; // guide (4)
    print("s7", sizeof s7, s7.extent);
    // s7[0] = 42; // Error: element_type is 'const int'
 
    std::vector v{66, 69, 99};
    std::span s8{v}; // guide (5)
    print("s8", sizeof s8, s8.extent);
}
```

Saída possível:
```
name │ sizeof │ extent
─────┼────────┼────────
  s1 │     16 │ dynamic
  s2 │     16 │ dynamic
  s3 │      8 │ 2
  s4 │      8 │ 5
  s5 │     16 │ dynamic
  s6 │      8 │ 3
  s7 │      8 │ 3
  s8 │     16 │ dynamic
```