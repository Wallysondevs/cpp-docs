# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::extract

containers extract() &&; | | (desde C++23)

Extrai os containers adaptados [`_c_`](<#/doc/container/flat_map>). Equivalente a `return std::move(c);`.

Após esta operação, `*this` fica vazio, mesmo que uma exceção seja lançada.

### Parâmetros

(nenhum)

### Valor de retorno

`std::move(c)`.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <flat_map>
    #include <print>
    #include <type_traits>
    #include <vector>
    
    int main()
    {
        std::flat_map<int, double> map{{1, 1.1}, {2, 2.2}, {3, 3.3}};
        const auto size = map.size();
    
        auto c = map.extract();
        assert(c.keys.size() == size);
        assert(c.values.size() == size);
        assert(map.empty());
        assert(map.keys().empty());
        assert(map.values().empty());
    
        // The default keys and values containers are std::vector:
        static_assert(std::is_same_v<decltype(c.keys), std::vector<int>>);
        static_assert(std::is_same_v<decltype(c.value), std::vector<int>>);
    
        std::println("keys: {}", c.keys);
        std::println("values: {}", c.values);
    }
```

Saída:
```
    keys: [1, 2, 3]
    values: [1.1, 2.2, 3.3]
```

### Veja também

[ replace](<#/doc/container/flat_map/replace>) | substitui os containers subjacentes
(função membro pública)