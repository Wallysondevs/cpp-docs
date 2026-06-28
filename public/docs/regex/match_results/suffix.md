# std::match_results&lt;BidirIt,Alloc&gt;::suffix

const_reference suffix() const; |  |  (desde C++11)  

  
Obtém uma referência para o objeto [std::sub_match](<#/doc/regex/sub_match>) representando a sequência alvo entre o fim da correspondência completa da expressão regular e o fim da sequência alvo.

[`ready()`](<#/doc/regex/match_results/ready>) deve ser verdadeiro. Caso contrário, o comportamento é indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o sufixo não correspondido.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::regex re("a(a)*by");
        std::string target("baaaby123");
        std::smatch sm;
     
        std::regex_search(target, sm, re);
        std::cout << sm.suffix() << '\n';
    }
```

Saída:
```
    123
```

### Ver também

[ prefix](<#/doc/regex/match_results/prefix>) | retorna a subsequência entre o início da sequência alvo e o início da correspondência completa   
(função membro pública)  