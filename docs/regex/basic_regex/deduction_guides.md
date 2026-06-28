# Guias de dedução para std::basic_regex

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class ForwardIt >
basic_regex( ForwardIt, ForwardIt,
std::regex_constants::syntax_option_type = std::regex_constants::ECMAScript )
-> basic_regex<typename std::iterator_traits<ForwardIt>::value_type>;
```

Este [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::basic_regex](<#/doc/regex/basic_regex>) para permitir a dedução a partir de um intervalo de iteradores.

### Exemplo

Execute este código
```cpp
    #include <regex>
    #include <vector>
    
    int main()
    {
        std::vector<char> v = {'a', 'b', 'c'};
        std::basic_regex re(v.begin(), v.end()); // usa guia de dedução explícito
    }
```