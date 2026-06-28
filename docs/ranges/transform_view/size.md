# std::ranges::transform_view&lt;V,F&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (desde C++20)
constexpr auto size() const requires ranges::sized_range<const V>;  // (desde C++20)
```

  
Retorna o número de elementos. 

Retorna [ranges::size](<#/doc/ranges/size>)(base_), onde [`_base__`](<#/doc/ranges/transform_view>) é a view subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos. 

### Observações

Se `V` não modelar [`forward_range`](<#/doc/ranges/forward_range>), `size()` pode não ser bem-definido após uma chamada para [`begin()`](<#/doc/ranges/transform_view/begin>). 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <cctype>
    #include <iostream>
    #include <ranges>
    #include <string>
     
    int main()
    {
        std::string s{"The length of this string is 42 characters"};
        auto to_upper =  -> char { return std::toupper(c); };
        auto tv = std::ranges::transform_view{s, to_upper};
        assert(tv.size() == 42);
        for (auto x : tv)
            std::cout << x;
    }
```

Output: 
```
    THE LENGTH OF THIS STRING IS 42 CHARACTERS
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)