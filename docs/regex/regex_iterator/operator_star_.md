# std::regex_iterator&lt;BidirIt,CharT,Traits&gt;::operator*,operator-&gt;

```cpp
const value_type& operator*() const;  // (1) (desde C++11)
const value_type* operator->() const;  // (2) (desde C++11)
```

  
Extrai o atual [std::match_results](<#/doc/regex/match_results>) de um `regex_iterator`. 

### Valor de retorno

1) Retorna uma referência para o atual [std::match_results](<#/doc/regex/match_results>).

2) Retorna um ponteiro para o atual [std::match_results](<#/doc/regex/match_results>).

### Exemplo

Execute este código
```
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::string hay{"1.1a2b3cjk34"};
        std::regex needle("[1234]");
        using Ri = std::regex_iterator<std::string::iterator>;
        for (Ri it{hay.begin(), hay.end(), needle}, last{}; it != last; ++it)
            std::cout << it->str();
        std::cout << '\n';
    }
```

Saída: 
```
    112334
```