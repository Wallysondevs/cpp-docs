# std::dynamic_extent

Definido no cabeçalho `[<span>](<#/doc/header/span>)`

```c
inline constexpr std::size_t dynamic_extent = std::numeric_limits<std::size_t>::max();
```

`std::dynamic_extent` é uma constante do tipo [std::size_t](<#/doc/types/size_t>) que é geralmente usada para indicar que qualquer tipo que utilize `std::dynamic_extent` irá armazenar seu valor (por exemplo, tamanho) _dinamicamente_, em vez de ter o valor conhecido _estaticamente_ no tipo.

É utilizado em diversos contextos:

*   Para diferenciar [`std::span`](<#/doc/container/span>) de extent estático e dinâmico.

*   Para indicar que o extent em um determinado índice de rank será armazenado dinamicamente em [`std::extents`](<#/doc/container/mdspan/extents>).

| (desde C++23)

*   Para indicar que os layouts preenchidos para [`std::mdspan`](<#/doc/container/mdspan>) armazenarão dinamicamente seu valor de preenchimento.

| (desde C++26)

### Nota

Como [std::size_t](<#/doc/types/size_t>) é um tipo sem sinal, uma definição equivalente é:
```cpp
    inline constexpr std::size_t dynamic_extent = -1;
```

Veja [conversões integrais](<#/doc/language/implicit_cast>).

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cassert>
    #include <cstddef>
    #include <iostream>
    #include <span>
    #include <string_view>
    #include <vector>
    
    int main()
    {
        auto print =  const name, std::size_t ex)
        {
            std::cout << name << ", ";
            if (std::dynamic_extent == ex)
                std::cout << "dynamic extent\n";
            else
                std::cout << "static extent = " << ex << '\n';
        };
    
        int a[]{1, 2, 3, 4, 5};
    
        std::span span1{a};
        print("span1", span1.extent);
    
        std::span<int, std::dynamic_extent> span2{a};
        print("span2", span2.extent);
    
        std::array ar{1, 2, 3, 4, 5};
        std::span span3{ar};
        print("span3", span3.extent);
    
        std::vector v{1, 2, 3, 4, 5};
        std::span span4{v};
        print("span4", span4.extent);
    }
```

Saída:
```
    span1, static extent = 5
    span2, dynamic extent
    span3, static extent = 5
    span4, dynamic extent
```

### Veja também

[ span](<#/doc/container/span>)(C++20) | uma view não proprietária sobre uma sequência contígua de objetos
(modelo de classe)
[ extents](<#/doc/container/mdspan/extents>)(C++23) | um descritor de um espaço de índice multidimensional de algum rank
(modelo de classe)