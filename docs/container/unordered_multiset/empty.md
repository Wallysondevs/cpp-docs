# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::empty

```cpp
bool empty() const noexcept;  // (desde C++11)
```

  
Verifica se o contêiner não possui elementos, ou seja, se begin() == end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o contêiner estiver vazio, false caso contrário. 

### Complexidade

Constante. 

### Exemplo

O código a seguir usa `empty` para verificar se um [std::unordered_multiset](<#/doc/container/unordered_multiset>)&lt;int&gt; contém algum elemento:

Execute este código
```cpp
    #include <iostream>
    #include <unordered_set>
     
    int main()
    {
        std::unordered_multiset<int> numbers;
        std::cout << std::boolalpha;
        std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';
     
        numbers.insert(42);
        numbers.insert(19937);
        std::cout << "After adding elements, numbers.empty(): " << numbers.empty() << '\n';
    }
```

Saída: 
```
    Initially, numbers.empty(): true
    After adding elements, numbers.empty(): false
```

### Veja também

[ size](<#/doc/container/unordered_multiset/size>) |  retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o contêiner está vazio   
(template de função)