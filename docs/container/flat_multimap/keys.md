# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::keys

```cpp
const key_container_type& keys() const noexcept;  // (desde C++23)
```

  
Retorna uma referência constante para o container de chaves adaptado. Equivalente a return c.keys;. 

### Parâmetros

(nenhum) 

### Valor de retorno

O container de chaves subjacente. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <flat_map>
    #include <print>
    #include <type_traits>
    #include <vector>
     
    int main()
    {
        std::flat_multimap<int, double> adaptor{{1, 1.1}, {2, 2.2}, {3, 3.3}};
     
        // The default keys container is std::vector:
        static_assert(std::is_same_v<decltype(adaptor.keys()), const std::vector<int>&>);
     
        std::println("{}", adaptor.keys());
    }
```

Saída: 
```
    [1, 2, 3]
```

### Veja também

[ values](<#/doc/container/flat_multimap/values>) | acesso direto ao container de valores subjacente   
(função membro pública)  