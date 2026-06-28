# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::values

```cpp
const mapped_container_type& values() const noexcept;  // (desde C++23)
```

Retorna uma referência constante para o container de valores adaptado. Equivalente a `return c.values;`.

### Parâmetros

(nenhum)

### Valor de retorno

O container de valores subjacente.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <flat_map>
    #include <print>
    #include <type_traits>
    #include <vector>
    
    int main()
    {
        std::flat_map<int, double> map{{1, 1.1}, {2, 2.2}, {3, 3.3}};
    
        // The default values container is std::vector:
        static_assert(std::is_same_v<decltype(map.values()), const std::vector<int>&>);
    
        std::println("{}", map.values());
    }
```

Saída:
```
    [1.1, 2.2, 3.3]
```

### Veja também

[ keys](<#/doc/container/flat_map/keys>) | acesso direto ao container de chaves subjacente
(função membro pública)