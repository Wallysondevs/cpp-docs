# std::array&lt;T,N&gt;::empty

```cpp
constexpr bool empty() const noexcept;  // (desde C++11)
```

  
Verifica se o container não possui elementos, ou seja, se begin() == end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o container estiver vazio, false caso contrário. 

### Complexidade

Constante. 

### Exemplo

O código a seguir usa `empty` para verificar se um [std::array](<#/doc/container/array>) contém algum elemento:

Execute este código
```cpp 
    #include <array>
    #include <iostream>
     
    int main()
    {
        std::array<int, 4> numbers{3, 1, 4, 1};
        std::array<int, 0> no_numbers;
     
        std::cout << std::boolalpha;
        std::cout << "numbers.empty(): " << numbers.empty() << '\n';
        std::cout << "no_numbers.empty(): " << no_numbers.empty() << '\n';
    }
```

Saída: 
```
    numbers.empty(): false
    no_numbers.empty(): true
```

### Veja também

[ size](<#/doc/container/array/size>) |  retorna o número de elementos   
(public member function)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(function template)