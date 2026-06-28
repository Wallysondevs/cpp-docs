# std::span&lt;T,Extent&gt;::first

```cpp
template< std::size_t Count >
constexpr std::span<element_type, Count> first() const;  // (desde C++20)
constexpr std::span<element_type, std::dynamic_extent> first( size_type Count ) const;  // (desde C++20)
```

  
Obtém um span que é uma view sobre os primeiros `Count` elementos deste span. O programa é malformado se Count > Extent. O comportamento é indefinido se Count > size(). 

### Valor de retorno

Um span `r` que é uma view sobre os primeiros `Count` elementos de *this, tal que r.data() == this->data() && r.size() == Count. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
    #include <span>
    #include <string_view>
     
    void print(std::string_view const title,
               std::ranges::forward_range auto const& container)
    {
        auto size{std::size(container)};
        std::cout << title << '[' << size << "]{";
        for (auto const& elem : container)
            std::cout << elem << (--size ? ", " : "");
        std::cout << "};\n";
    }
     
    void run_game(std::span<const int> span)
    {
        print("span: ", span);
     
        std::span<const int, 5> span_first = span.first<5>();
        print("span.first<5>(): ", span_first);
     
        std::span<const int, std::dynamic_extent> span_first_dynamic = span.first(4);
        print("span.first(4): ", span_first_dynamic);
    }
     
    int main()
    {
        int a[8]{1, 2, 3, 4, 5, 6, 7, 8};
        print("int a", a);
        run_game(a);
    }
```

Saída: 
```
    int a[8]{1, 2, 3, 4, 5, 6, 7, 8};
    span: [8]{1, 2, 3, 4, 5, 6, 7, 8};
    span.first<5>(): [5]{1, 2, 3, 4, 5};
    span.first(4): [4]{1, 2, 3, 4};
```

### Veja também

[ last](<#/doc/container/span/last>) |  obtém um subspan consistindo nos últimos `N` elementos da sequência   
(função membro pública)  
[ subspan](<#/doc/container/span/subspan>) |  obtém um subspan   
(função membro pública)