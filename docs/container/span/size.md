# std::span&lt;T,Extent&gt;::size

```cpp
constexpr size_type size() const noexcept;  // (desde C++20)
```

  
Retorna o número de elementos no span. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no span. 

### Nota

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_ssize`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | [std::ssize](<#/doc/iterator/size>) e `std::span::size` sem sinal  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <span>
     
    void show_sizes(std::span<const int> span)
    {
        std::cout
            << span                 .size() << ' ' // 8
            << span.first(7)        .size() << ' ' // 7
            << span.first<6>()      .size() << ' ' // 6
            << span.last(5)         .size() << ' ' // 5
            << span.last<4>()       .size() << ' ' // 4
            << span.subspan(2, 3)   .size() << ' ' // 3
            << span.subspan<3, 2>() .size() << ' ' // 2
            << '\n';
    }
     
    int main()
    {
        int antique_array[]{1, 2, 3, 4, 5, 6, 7, 8};
        show_sizes(antique_array);
    }
```

Saída: 
```
    8 7 6 5 4 3 2
```

### Veja também

[ (construtor)](<#/doc/container/span/span>) | constrói um `span`   
(função membro pública)  
[ size_bytes](<#/doc/container/span/size_bytes>) | retorna o tamanho da sequência em bytes   
(função membro pública)