# std::deque&lt;T,Allocator&gt;::empty

bool empty() const; |  | (noexcept desde C++11)  

  
Verifica se o container não possui elementos, ou seja, se begin() == end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o container estiver vazio, false caso contrário. 

### Complexidade

Constante. 

### Exemplo

O código a seguir usa `empty` para verificar se um [std::deque](<#/doc/container/deque>)&lt;int&gt; contém algum elemento:

Execute este código
```
    #include <deque>
    #include <iostream>
     
    int main()
    {
        std::deque<int> numbers;
        std::cout << std::boolalpha;
        std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';
     
        numbers.push_back(42);
        numbers.push_back(13317); 
        std::cout << "After adding elements, numbers.empty(): " << numbers.empty() << '\n';
    }
```

Saída: 
```
    Initially, numbers.empty(): true
    After adding elements, numbers.empty(): false
```

### Veja também

[ size](<#/doc/container/deque/size>) |  retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)