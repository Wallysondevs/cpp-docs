# std::vector&lt;T,Allocator&gt;::empty

bool empty() const; | | (noexcept desde C++11)
(constexpr desde C++20)

Verifica se o container não possui elementos, ou seja, se begin() == end().

### Parâmetros

(nenhum)

### Valor de retorno

true se o container estiver vazio, false caso contrário.

### Complexidade

Constante.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        std::vector<int> numbers;
        std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';
    
        numbers.push_back(42);
        std::cout << "After adding elements, numbers.empty(): " << numbers.empty() << '\n';
    }
```

Saída:
```
    Initially, numbers.empty(): true
    After adding elements, numbers.empty(): false
```

### Veja também

[ size](<#/doc/container/vector/size>) | retorna o número de elementos
(função membro pública)
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(modelo de função)