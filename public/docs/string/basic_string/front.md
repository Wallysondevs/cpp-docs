# std::basic_string&lt;CharT,Traits,Allocator&gt;::front

CharT& front(); |  (1)  |  (constexpr desde C++20)  
---|---|---
const CharT& front() const; |  (2)  |  (constexpr desde C++20)  

  
Retorna uma referência para o primeiro caractere na string. O comportamento é indefinido se [empty()](<#/doc/string/basic_string/empty>) for true. 

### Parâmetros

(nenhum) 

### Valor de retorno

Referência para o primeiro caractere, equivalente a operator[](0). 

### Complexidade

Constante. 

### Observações

No libstdc++, `front()` [não está disponível](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/strings.html#strings.string.shrink>) no modo C++98. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string s("Exemplary");
        char& f1 = s.front();
        f1 = 'e';
        std::cout << s << '\n'; // "exemplary"
     
        std::string const c("Exemplary");
        char const& f2 = c.front();
        std::cout << &f2 << '\n'; // "Exemplary"
    }
```

Saída: 
```
    exemplary
    Exemplary
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 534](<https://cplusplus.github.io/LWG/issue534>) | C++98  | [std::basic_string](<#/doc/string/basic_string>) não possuía a função membro `front()` | adicionado   
  
### Veja também

[ back](<#/doc/string/basic_string/back>)(DR*) |  acessa o último caractere   
(função membro pública)  
[ front](<#/doc/string/basic_string_view/front>) |  acessa o primeiro caractere   
(função membro pública de `std::basic_string_view<CharT,Traits>`)