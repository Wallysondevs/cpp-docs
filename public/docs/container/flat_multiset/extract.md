# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::extract

container_type extract() &&; |  |  (desde C++23)  

  
Extrai o container adaptado [`_c_`](<#/doc/container/flat_multiset>). Equivalente a return std::move(c);. 

Após esta operação *this fica vazio, mesmo que uma exceção seja lançada. 

### Parâmetros

(nenhum) 

### Valor de retorno

std::move(c). 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <flat_set>
    #include <print>
    #include <type_traits>
    #include <vector>
     
    int main()
    {
        std::flat_multiset<int> set{1, 2, 3};
        const auto size = set.size();
     
        auto c = set.extract();
        assert(c.size() == size);
        assert(set.empty());
        assert(set.keys().empty());
        assert(set.values().empty());
     
        // The default keys container is std::vector:
        static_assert(std::is_same_v<decltype(c), std::vector<int>>);
     
        std::println("{}", c);
    }
```

Saída: 
```
    [1, 2, 3]
```

### Veja também

[ replace](<#/doc/container/flat_multiset/replace>) | substitui o container subjacente   
(função membro pública)  