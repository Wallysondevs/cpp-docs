# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::replace

```cpp
void replace( key_container_type&& key_cont, mapped_container_type&& mapped_cont );  // (desde C++23)
```

  
Substitui os containers subjacentes [`_c_`](<#/doc/container/flat_map>). Equivalente a: 
```cpp
    c.keys = std::move(key_cont);
    c.values = std::move(mapped_cont);
```

As seguintes condições devem ser atendidas: 

  * A expressão `key_cont.size() == mapped_cont.size()` é verdadeira, 
  * Os elementos de `key_cont` são ordenados em relação a [`_compare_`](<#/doc/container/flat_map>), e 
  * `key_cont` não contém elementos iguais.

Caso contrário, o comportamento é indefinido. 

### Parâmetros

keys_cont  |  \-  |  um container de chaves ordenado do tipo `KeyContainer`, cujo conteúdo será movido para *this  
---|---|---
mapped_cont  |  \-  |  um container de valores mapeados do tipo `MappedContainer`, cujo conteúdo será movido para *this  
  
### Valor de retorno

(nenhum) 

### Complexidade

Igual à complexidade de [`std::move`](<#/doc/utility/move>) aplicada aos containers adaptados. 

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <flat_map>
    #include <print>
    #include <vector>
    
    int main()
    {
        std::vector<int> keys{1, 2, 3};
        assert(std::ranges::is_sorted(keys));
        std::vector<double> values{2.2, 3.3, 1.1};
        assert(keys.size() == values.size());
    
        std::flat_map<int, double> map;
        assert(map.empty());
    
        map.replace(keys, values);
        assert(map.size() == 3);
        assert(map.keys() == 3);
        assert(map.values() == 3);
        assert(keys.empty());
        assert(values.empty());
    
        std::println("{}", map);
    }
```

Saída: 
```
    {1: 2.2, 2: 3.3, 3: 1.1}
```

### Veja também

[ extract](<#/doc/container/flat_map/extract>) |  extrai os containers subjacentes   
(função membro pública)  