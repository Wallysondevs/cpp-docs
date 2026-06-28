# std::span&lt;T,Extent&gt;::subspan

```cpp
template< std::size_t Offset,
std::size_t Count = std::dynamic_extent >
constexpr std::span<element_type, E /* see below */>
subspan() const;  // (1) (desde C++20)
constexpr std::span<element_type, std::dynamic_extent>
subspan( size_type Offset,
size_type Count = std::dynamic_extent ) const;  // (2) (desde C++20)
```

  
Obtém um span que é uma view sobre os Count elementos deste span, começando no offset Offset. Se Count for std::dynamic_extent, o número de elementos no subspan é size() - offset (ou seja, ele termina no final de *this). 

1) É malformado se 

  * Offset for maior que Extent, ou 
  * Count não for std::dynamic_extent e Count for maior que Extent - Offset.

O comportamento é indefinido se Offset ou Count estiver fora do range. Isso acontece se 

  * Offset for maior que size(), ou 
  * Count não for std::dynamic_extent e Count for maior que size() - Offset. 

O extent `E` do span retornado por (1) é determinado da seguinte forma: 

  * Se Count não for std::dynamic_extent, Count; 
  * Caso contrário, se `Extent` não for std::dynamic_extent, Extent - Offset; 
  * Caso contrário, std::dynamic_extent. 

### Valor de retorno

O subspan `r` solicitado, tal que r.data() == this->data() + Offset. Se Count for std::dynamic_extent, r.size() == this->size() - Offset; caso contrário, r.size() == Count. 

### Exemplo

Run this code
```
    #include <algorithm>
    #include <cstdio>
    #include <numeric>
    #include <ranges>
    #include <span>
     
    void display(std::span<const char> abc)
    {
        const auto columns{20U};
        const auto rows{abc.size() - columns + 1};
     
        for (auto offset{0U}; offset < rows; ++offset)
        {
            std::ranges::for_each(abc.subspan(offset, columns), std::putchar);
            std::putchar('\n');
        }
    }
     
    int main()
    {
        char abc[26];
        std::iota(std::begin(abc), std::end(abc), 'A');
        display(abc);
    }
```

Output: 
```
    ABCDEFGHIJKLMNOPQRST
    BCDEFGHIJKLMNOPQRSTU
    CDEFGHIJKLMNOPQRSTUV
    DEFGHIJKLMNOPQRSTUVW
    EFGHIJKLMNOPQRSTUVWX
    FGHIJKLMNOPQRSTUVWXY
    GHIJKLMNOPQRSTUVWXYZ
```

### Veja também

[ first](<#/doc/container/span/first>) |  obtém um subspan consistindo nos primeiros `N` elementos da sequência   
(função membro pública)  
[ last](<#/doc/container/span/last>) |  obtém um subspan consistindo nos últimos `N` elementos da sequência   
(função membro pública)