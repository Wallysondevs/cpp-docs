# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::replace

```cpp
void replace( container_type&& cont );  // (desde C++23)
```

  
Substitui o container subjacente [`_c_`](<#/doc/container/flat_multiset>). Equivalente a: c = std::move(cont);. 

Os elementos de cont devem estar ordenados em relação a [`_compare_`](<#/doc/container/flat_multiset>). Caso contrário, o comportamento é indefinido. 

### Parâmetros

cont  |  \-  |  um container ordenado do tipo `KeyContainer`, cujo conteúdo será movido para `*this`  
  
### Valor de retorno

(nenhum) 

### Complexidade

Igual à complexidade de [`std::move`](<#/doc/utility/move>) aplicado ao container adaptado. 

### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <cassert>
    #include <flat_set>
    #include <print>
    #include <vector>
    
    int main()
    {
        std::vector<int> keys{1, 2, 3};
        assert(std::ranges::is_sorted(keys));
    
        std::flat_multiset<int> set;
        assert(set.empty());
    
        set.replace(keys);
        assert(set.size() == 3);
        assert(keys.empty());
    
        std::println("{}", set); // set.keys()
    }
```

Saída: 
```
    [1, 2, 3]
```

### Veja também

[ extract](<#/doc/container/flat_multiset/extract>) |  extrai o container subjacente   
(função membro pública)  