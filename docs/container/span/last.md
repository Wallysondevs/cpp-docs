# std::span&lt;T,Extent&gt;::last

```cpp
template< std::size_t Count >
constexpr std::span<element_type, Count> last() const;  // (1) (desde C++20)
constexpr std::span<element_type, std::dynamic_extent> last( size_type Count ) const;  // (2) (desde C++20)
```

  
Obtém um span que é uma view sobre os últimos Count elementos deste span. O programa é malformado se Count > Extent. O comportamento é indefinido se Count > size(). 

### Valor de retorno

Um span `r` que é uma view sobre os últimos Count elementos de *this, tal que r.data() == this->data() + (this->size() - Count) && r.size() == Count. 

### Exemplo

Run this code
```
    #include <iostream>
    #include <span>
    #include <string_view>
     
    void println(std::string_view const title, auto const& container)
    {
        std::cout << title << '' << [std::size(container) << "]{ ";
        for (auto const& elem : container)
            std::cout << elem << ", ";
        std::cout << "};\n";
    };
     
    void run(std::span<const int> span)
    {
        println("span: ", span);
     
        std::span<const int, 3> span_last = span.last<3>();
        println("span.last<3>(): ", span_last);
     
        std::span<const int, std::dynamic_extent> span_last_dynamic = span.last(2);
        println("span.last(2): ", span_last_dynamic);
    }
     
    int main()
    {
        int a[8]{1, 2, 3, 4, 5, 6, 7, 8};
        println("int a", a);
        run(a);
    }
```

Output: 
```
    int a[8]{ 1, 2, 3, 4, 5, 6, 7, 8, };
    span: [8]{ 1, 2, 3, 4, 5, 6, 7, 8, };
    span.last<3>(): [3]{ 6, 7, 8, };
    span.last(2): [2]{ 7, 8, };
```

### Veja também

[ first](<#/doc/container/span/first>) | obtém um subspan consistindo dos primeiros `N` elementos da sequência   
(função membro pública)  
[ subspan](<#/doc/container/span/subspan>) | obtém um subspan   
(função membro pública)