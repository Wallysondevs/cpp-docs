# std::match_results&lt;BidirIt,Alloc&gt;::str

string_type str( size_type n = 0 ) const; |  |  (desde C++11)  

  
Retorna uma string que representa o sub-match indicado.

Se n == 0, uma string que representa a expressão correspondida inteira é retornada.

Se 0 < n && n < size(), uma string que representa o n-ésimo sub-match é retornada.

Se n >= size(), uma string que representa o match não correspondido é retornada.

A chamada é equivalente a string_type((*this)[n]);

[`ready()`](<#/doc/regex/match_results/ready>) deve ser verdadeiro. Caso contrário, o comportamento é indefinido.

### Parâmetros

n  |  \-  |  número inteiro especificando qual match retornar   
  
### Valor de retorno

Retorna uma string que representa o match ou sub-match especificado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::string target("baaaby");
        std::smatch sm;
     
        std::regex re1("a(a)*b");
        std::regex_search(target, sm, re1);
        std::cout << "entire match: " << sm.str(0) << '\n'
                  << "submatch #1: " << sm.str(1) << '\n';
     
        std::regex re2("a(a*)b");
        std::regex_search(target, sm, re2);
        std::cout << "entire match: " << sm.str(0) << '\n'
                  << "submatch #1: " << sm.str(1) << '\n';
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

[`operator[]`](<#/doc/regex/match_results/operator_at>) |  retorna o sub-match especificado   
(função membro pública)  