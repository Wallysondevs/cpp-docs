# std::extents&lt;IndexType,Extents...&gt;::rank_dynamic

```cpp
static constexpr rank_type rank_dynamic() const noexcept;  // (desde C++23)
```

  
Retorna o número de dimensões dinâmicas em [`extents`](<#/doc/container/mdspan/extents>). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de dimensões dinâmicas. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <mdspan>
     
    int main()
    {
        std::extents<int, 1, 2> e1;
        std::extents<int, 3, 4, std::dynamic_extent> e2(5);
        std::extents<int, std::dynamic_extent, 7, std::dynamic_extent> e3(6, 8);
        std::cout << e1.rank_dynamic() << ", "
                  << e2.rank_dynamic() << ", "
                  << e3.rank_dynamic() << '\n';
    }
```

Saída: 
```
    0, 1, 2
```

### Ver também

[ rank](<#/doc/container/mdspan/extents/rank>)[static] | retorna o rank estático de um `extents`   
(função membro estática pública)  
[ rank](<#/doc/types/rank>)(C++11) | obtém o número de dimensões de um tipo de array   
(modelo de classe)