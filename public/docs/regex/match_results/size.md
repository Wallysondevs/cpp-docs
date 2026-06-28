# std::match_results&lt;BidirIt,Alloc&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++11)
```

  
Retorna o número de subcorrespondências, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()).

Retorna `0` se `*this` não representa o resultado de uma correspondência bem-sucedida.

### Parâmetros

(nenhum)

### Valor de retorno

O número de subcorrespondências.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::regex re("a(a)*b");
        std::string target("aaab");
        std::smatch sm;
    
        std::cout << sm.size() << '\n';
    
        std::regex_match(target, sm, re);
        std::cout << sm.size() << '\n';
    }
```

Saída:
```
    0
    2
```

### Ver também

[ begincbegin](<#/doc/regex/match_results/begin>) |  retorna um iterator para o início da lista de subcorrespondências   
(public member function)  
[ endcend](<#/doc/regex/match_results/end>) |  retorna um iterator para o fim da lista de subcorrespondências   
(public member function)