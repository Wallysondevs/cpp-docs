# std::array&lt;T,N&gt;::fill

```cpp
void fill( const T& value );  // (desde C++11)
(constexpr desde C++20)
```

  
Atribui o valor a todos os elementos no container. 

### Parâmetros

value  |  \-  |  o valor a ser atribuído aos elementos   
  
### Valor de retorno

(nenhum) 

### Complexidade

Linear no tamanho do container. 

### Exemplo

Execute este código
```cpp 
    #include <array>
    #include <cstddef>
    #include <iostream>
     
    int main()
    {
        constexpr std::size_t xy = 4;
     
        using Cell = std::array<unsigned char, 8>;
     
        std::array<Cell, xy * xy> board;
     
        board.fill({0xE2, 0x96, 0x84, 0xE2, 0x96, 0x80, 0, 0}); // "▄▀";
     
        for (std::size_t count{}; Cell c : board)
            std::cout << c.data() << ((++count % xy) ? "" : "\n");
    }
```

Saída possível: 
```
    ▄▀▄▀▄▀▄▀
    ▄▀▄▀▄▀▄▀
    ▄▀▄▀▄▀▄▀
    ▄▀▄▀▄▀▄▀
```

### Veja também

[ fill](<#/doc/algorithm/fill>) |  copia-atribui o valor fornecido a cada elemento em um range   
(function template)  
[ fill_n](<#/doc/algorithm/fill_n>) |  copia-atribui o valor fornecido a N elementos em um range   
(function template)  
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) |  atribui um certo valor a um range de elementos  
(algorithm function object)