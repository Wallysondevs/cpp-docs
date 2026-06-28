# std::extents&lt;IndexType,Extents...&gt;::rank

```cpp
static constexpr rank_type rank() const noexcept;  // (desde C++23)
```

  
Retorna o número de dimensões em [`extents`](<#/doc/container/mdspan/extents>). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de dimensões. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <mdspan>
     
    int main()
    {
        std::extents<int, 1, 2> e1;
        std::extents<int, 3, 4, std::dynamic_extent> e2(5);
        std::cout << e1.rank() << ", " << e2.rank() << '\n';
    }
```

Saída: 
```
    2, 3
```

### Veja também

[ rank_dynamic](<#/doc/container/mdspan/extents/rank_dynamic>)[static] | retorna o rank dinâmico de um `extents`   
(função membro estática pública)  
[ rank](<#/doc/types/rank>)(C++11) | obtém o número de dimensões de um tipo array   
(modelo de classe)