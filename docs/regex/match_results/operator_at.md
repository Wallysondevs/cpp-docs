# std::match_results&lt;BidirIt,Alloc&gt;::operator[]

```cpp
const_reference operator const;  // (desde C++11)
```

  
Se n > 0 e n < size(), retorna uma referência para o [std::sub_match](<#/doc/regex/sub_match>) representando a parte da sequência alvo que foi correspondida pela n-ésima [subexpressão marcada](<#/doc/regex/ecmascript>)). 

Se n == 0, retorna uma referência para o [std::sub_match](<#/doc/regex/sub_match>) representando a parte da sequência alvo correspondida pela expressão regular inteira. 

Se n >= size(), retorna uma referência para um [std::sub_match](<#/doc/regex/sub_match>) representando uma subexpressão não correspondida (um sub-range vazio da sequência alvo). 

[`ready()`](<#/doc/regex/match_results/ready>) deve ser `true`. Caso contrário, o comportamento é indefinido. 

### Parâmetros

n  |  \-  |  número inteiro especificando qual correspondência retornar   
  
### Valor de retorno

Referência para o [std::sub_match](<#/doc/regex/sub_match>) representando o sub-range correspondido especificado dentro da sequência alvo. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::string target("baaaby");
        std::smatch sm;
     
        std::regex re1("a(a)*b");
        std::regex_search(target, sm, re1);
        std::cout << "entire match: " << sm[0] << '\n'
                  << "submatch #1: " << sm[1] << '\n';
     
        std::regex re2("a(a*)b");
        std::regex_search(target, sm, re2);
        std::cout << "entire match: " << sm[0] << '\n'
                  << "submatch #1: " << sm[1] << '\n';
    }
```

Saída: 
```
    entire match: aaab
    submatch #1: a
    entire match: aaab
    submatch #1: aa
```

### Veja também

[ str](<#/doc/regex/match_results/str>) |  retorna a sequência de caracteres para a sub-correspondência específica   
(função membro pública)  