# std::basic_string&lt;CharT,Traits,Allocator&gt;::push_back

void push_back( CharT ch ); |  | (constexpr desde C++20)  

  
Anexa o caractere ch fornecido ao final da string. 

### Parâmetros

ch  |  \-  |  o caractere a ser anexado   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante amortizada. 

### Exceções

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>). 

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)). 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string str{"Short string"};
        std::cout << "1) " << std::quoted(str) << ", size: " << str.size() << '\n';
     
        str.push_back('!');
        std::cout << "2) " << std::quoted(str) << ", size: " << str.size() << '\n';
    }
```

Saída: 
```
    1) "Short string", size: 12
    2) "Short string!", size: 13
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
[LWG 7](<https://cplusplus.github.io/LWG/issue7>) | C++98  | 1) a descrição estava faltando no padrão C++  
2) o tipo do parâmetro era const CharT | 1) descrição adicionada  
2) alterado para `CharT`  
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança contra exceções  | adicionada garantia de segurança forte contra exceções   
  
### Veja também

[ pop_back](<#/doc/string/basic_string/pop_back>)(DR*) |  remove o último caractere   
(função membro pública)  