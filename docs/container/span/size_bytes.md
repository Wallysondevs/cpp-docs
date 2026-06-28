# std::span&lt;T,Extent&gt;::size_bytes

```cpp
constexpr size_type size_bytes() const noexcept;  // (desde C++20)
```

  
Retorna o tamanho da sequência em bytes. 

### Parâmetros

(nenhum) 

### Valor de retorno

O tamanho da sequência em bytes, ou seja, size() * sizeof(element_type). 

### Exemplo

Execute este código
```
    #include <cstdint>
    #include <span>
     
    int main()
    {
        constexpr static std::int32_t a[]{1, 2, 3, 4, 5};
        constexpr static std::span s{a};
     
        static_assert
        (
            sizeof(int32_t) == 4 &&
            std::size(a) == 5 &&
            sizeof a == 20 &&
            s.size() == 5 &&
            s.size_bytes() == 20
        );
    }
```

### Veja também

[ size](<#/doc/container/span/size>)(C++20) |  retorna o número de elementos na sequência   
(função membro pública)  