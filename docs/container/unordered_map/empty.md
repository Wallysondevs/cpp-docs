# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::empty

```cpp
bool empty() const noexcept;  // (desde C++11)
```

  
Verifica se o container não possui elementos, ou seja, se begin() == end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o container estiver vazio, false caso contrário. 

### Complexidade

Constante. 

### Exemplo

O código a seguir usa `empty` para verificar se um [std::unordered_map](<#/doc/container/unordered_map>)<int, int> contém quaisquer elementos:

Execute este código
```cpp 
    #include <iostream>
    #include <unordered_map>
    #include <utility>
    
    int main()
    {
        std::unordered_map<int,int> numbers;
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

[ size](<#/doc/container/unordered_map/size>) |  retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)