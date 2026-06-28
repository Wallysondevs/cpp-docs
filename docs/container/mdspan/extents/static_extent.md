# std::extents&lt;IndexType,Extents...&gt;::static_extent

```cpp
static constexpr std::size_t static_extent( rank_type i ) noexcept;  // (desde C++23)
```

  
Retorna o tamanho de extent estático de um [`extents`](<#/doc/container/mdspan/extents>) no índice de rank i. Se o índice de rank i for um extent dinâmico, retorna `std::dynamic_extent`. 

### Parâmetros

i  |  \-  |  O índice de rank para obter o tamanho de extent estático.   
  
### Valor de retorno

O tamanho de extent estático ou o valor `std::dynamic_extent`. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <mdspan>
     
    int main()
    {
        std::extents<int, 1, 2> e1;
        std::extents<int, 3, std::dynamic_extent, std::dynamic_extent> e2(4, 5);
        std::cout << e1.static_extent(0) << ", " << e1.static_extent(1) << '\n';
        std::cout << (e2.static_extent(0) == std::dynamic_extent) << ", "
                  << (e2.static_extent(1) == std::dynamic_extent) << ", "
                  << (e2.static_extent(2) == std::dynamic_extent) << '\n';
    }
```

Saída: 
```
    1, 2
    0, 1, 1
```

### Veja também

[ extent](<#/doc/container/mdspan/extents/extent>) |  retorna o tamanho de extent dinâmico de um `extents` em um determinado índice de rank   
(função membro pública)  
[ extent](<#/doc/types/extent>)(C++11) |  obtém o tamanho de um tipo de array ao longo de uma dimensão especificada   
(modelo de classe)