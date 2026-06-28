# std::forward_list&lt;T,Allocator&gt;::empty

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

O código a seguir usa `empty` para verificar se um [std::forward_list](<#/doc/container/forward_list>)&lt;int&gt; contém algum elemento:

Execute este código
```
    #include <forward_list>
    #include <iostream>
     
    int main()
    {
        std::forward_list<int> numbers;
        std::cout << std::boolalpha;
        std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';
     
        numbers.push_front(42);
        numbers.push_front(13317); 
        std::cout << "After adding elements, numbers.empty(): " << numbers.empty() << '\n';
    }
```

Saída: 
```
    Initially, numbers.empty(): true
    After adding elements, numbers.empty(): false
```

### Veja também

[ distance](<#/doc/iterator/distance>) |  retorna a distância entre dois iteradores   
(modelo de função)  