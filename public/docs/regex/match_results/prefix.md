# std::match_results&lt;BidirIt,Alloc&gt;::prefix

const_reference prefix() const; | | (desde C++11)

Obtém uma referência para o objeto [std::sub_match](<#/doc/regex/sub_match>) representando a sequência alvo entre o início da sequência alvo e o início da correspondência completa da expressão regular.

[`ready()`](<#/doc/regex/match_results/ready>) deve ser `true`. Caso contrário, o comportamento é indefinido.

### Valor de retorno

Referência para o prefixo não correspondido.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::regex re("a(a)*b");
        std::string target("baaaby");
        std::smatch sm;
    
        std::regex_search(target, sm, re);
        std::cout << sm.prefix().str() << '\n';
    }
```

Saída:
```
    b
```

### Veja também

[ suffix](<#/doc/regex/match_results/suffix>) | retorna a subsequência entre o fim da correspondência completa e o fim da sequência alvo
(função membro pública)