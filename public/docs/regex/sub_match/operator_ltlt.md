# operator&lt;&lt;(std::sub_match)

```cpp
template< class CharT, class Traits, class BidirIt >
std::basic_ostream<CharT,Traits>&
operator<<( std::basic_ostream<CharT,Traits>& os, const sub_match<BidirIt>& m );  // (desde C++11)
```

  
Escreve a representação da subsequência correspondida m para o stream de saída os. Equivalente a os << m.str(). 

### Parâmetros

os  |  \-  |  stream de saída para escrever a representação   
---|---|---
m  |  \-  |  um objeto sub-match para saída   
  
### Valor de retorno

os

### Exemplo

Run this code
```
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::string sentence{"Quick red fox jumped over a lazy hare."};
        const std::regex re{"([A-z]+) ([a-z]+) ([a-z]+)"};
        std::smatch words;
        std::regex_search(sentence, words, re);
        for (const auto& m : words)
            // m has type `const std::sub_match<std::string::const_iterator>&`
            std::cout << '[' << m << "] ";
        std::cout << '\n';
    }
```

Output: 
```
    [Quick red fox] [Quick] [red] [fox]
```