# std::multimap&lt;Key,T,Compare,Allocator&gt;::rend, std::multimap&lt;Key,T,Compare,Allocator&gt;::crend

```cpp
reverse_iterator rend(); |  (1)  |  (noexcept desde C++11)
const_reverse_iterator rend() const; |  (2)  |  (noexcept desde C++11)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++11)
```

  
Retorna um reverse iterator para o elemento que segue o último elemento do `multimap` invertido. Ele corresponde ao elemento que precede o primeiro elemento do `multimap` não invertido. Este elemento atua como um placeholder, e tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o elemento que segue o último elemento. 

### Complexidade

Constante. 

### Observações

libc++ faz o backport de `crend()` para o modo C++98.

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    #include <map>
    
    using namespace std::chrono;
    
    int main()
    {
        const std::multimap<year_month_day, int> messages
        {
            {February/17/2023, 10},
            {February/17/2023, 20},
            {February/16/2022, 30},
            {October/22/2022, 40},
            {June/14/2022, 50},
            {November/23/2021, 60},
            {December/10/2022, 55},
            {December/12/2021, 45},
            {April/1/2020, 42},
            {April/1/2020, 24}
        };
    
        std::cout << "Messages received (date order is reversed):\n";
        for (auto it = messages.crbegin(); it != messages.crend(); ++it)
            std::cout << it->first << " : " << it->second << '\n';
    }
```

Saída possível: 
```
    Messages received (date order is reversed):
    2023-02-17 : 20
    2023-02-17 : 10
    2022-12-10 : 55
    2022-10-22 : 40
    2022-06-14 : 50
    2022-02-16 : 30
    2021-12-12 : 45
    2021-11-23 : 60
    2020-04-01 : 24
    2020-04-01 : 42
```

### Veja também

[ rbegincrbegin](<#/doc/container/multimap/rbegin>)(desde C++11) |  retorna um reverse iterator para o início   
(função membro pública)  
[ rendcrend](<#/doc/iterator/rend>)(desde C++14) |  retorna um reverse end iterator para um container ou array   
(modelo de função)