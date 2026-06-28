# std::extents&lt;IndexType,Extents...&gt;::extent

```cpp
constexpr index_type extent( rank_type i ) const noexcept;  // (desde C++23)
```

  
Retorna o tamanho da extensão dinâmica de um [`extents`](<#/doc/container/mdspan/extents>) em um determinado índice de rank. 

### Parâmetros

i  |  \-  |  O índice de rank para obter o tamanho da extensão   
  
### Valor de retorno

O tamanho da extensão dinâmica de um `extents` em um determinado índice de rank. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <mdspan>
     
    int main()
    {
        std::extents<int, 1, 2> e1;
        std::extents<int, 3, std::dynamic_extent, std::dynamic_extent> e2(4, 5);
        std::cout << e1.extent(0) << ", " << e1.extent(1) << '\n';
        std::cout << e2.extent(0) << ", " << e2.extent(1) << ", " << e2.extent(2) << '\n';
    }
```

Saída: 
```
    1, 2
    3, 4, 5
```

### Veja também

[ static_extent](<#/doc/container/mdspan/extents/static_extent>)[static] |  retorna o tamanho da extensão estática de um `extents` em um determinado índice de rank   
(função membro estática pública)  
[ extent](<#/doc/types/extent>)(C++11) |  obtém o tamanho de um tipo de array ao longo de uma dimensão especificada   
(modelo de classe)