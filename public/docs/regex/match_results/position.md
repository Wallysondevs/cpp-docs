# std::match_results&lt;BidirIt,Alloc&gt;::position

difference_type position( size_type n = 0 ) const; |  |  (desde C++11)  

  
Retorna a posição do primeiro caractere do sub-match especificado.

Se n == 0, a posição do primeiro caractere de toda a expressão correspondida é retornada.

Se n > 0 && n < size(), a posição do primeiro caractere do n-ésimo sub-match é retornada.

Se n >= size(), uma posição do primeiro caractere do match não correspondido é retornada.

[`ready()`](<#/doc/regex/match_results/ready>) deve ser true. Caso contrário, o comportamento é indefinido.

### Parâmetros

n  |  \-  |  número inteiro especificando qual match examinar   
  
### Valor de retorno

A posição do primeiro caractere do match ou sub-match especificado.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::regex re("a(a)*b");
        std::string target("aaab");
        std::smatch sm;
     
        std::regex_match(target, sm, re);
        std::cout << sm.position(1) << '\n';
    }
```

Saída: 
```
    2
```

### Veja também

[ operator[]](<#/doc/regex/match_results/operator_at>) |  retorna o sub-match especificado   
(função membro pública)  