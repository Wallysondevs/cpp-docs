# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::empty

```cpp
bool empty() const noexcept;  // (desde C++23)
```

  
Verifica se os containers subjacentes não possuem elementos. Equivalente a: return begin() == end();. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se os containers subjacentes estiverem vazios, false caso contrário. 

### Complexidade

Constante. 

### Exemplo

O código a seguir usa `empty` para verificar se um [std::flat_multimap](<#/doc/container/flat_multimap>)<int, int> contém algum elemento:

Execute este código
```cpp 
    #include <iostream>
    #include <flat_map>
    #include <utility>
    
    int main()
    {
        std::flat_multimap<int,int> numbers;
        std::cout << std::boolalpha;
        std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';
    
        numbers.emplace(42, 13);
        numbers.insert(std::make_pair(13317, 123));
        std::cout << "After adding elements, numbers.empty(): " << numbers.empty() << '\n';
    }
```

Saída: 
```
    Initially, numbers.empty(): true
    After adding elements, numbers.empty(): false
```

### Veja também

[ size](<#/doc/container/flat_multimap/size>) |  retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)