# std::basic_string&lt;CharT,Traits,Allocator&gt;::pop_back

void pop_back(); |  | (constexpr desde C++20)  

  
Remove o último caractere da string. 

Equivalente a erase(end() - 1). O comportamento é indefinido se a string estiver vazia. 

### Parameters

(nenhum) 

### Return value

(nenhum) 

### Complexity

Constante. 

### Exceptions

Não lança exceções. 

### Notes

No libstdc++, `pop_back()` [não está disponível](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/strings.html#strings.string.shrink>) no modo C++98. 

### Example

Execute este código
```
    #include <cassert>
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string str("Short string!");
        std::cout << "Before: " << std::quoted(str) << '\n';
        assert(str.size() == 13);
     
        str.pop_back();
        std::cout << "After:  " << std::quoted(str) << '\n';
        assert(str.size() == 12);
     
        str.clear();
    //  str.pop_back(); // undefined behavior
    }
```

Saída: 
```
    Before: "Short string!"
    After:  "Short string"
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 534](<https://cplusplus.github.io/LWG/issue534>) | C++98  | [std::basic_string](<#/doc/string/basic_string>) não possuía a função membro `pop_back()` | adicionada   
  
### See also

[ push_back](<#/doc/string/basic_string/push_back>) |  anexa um caractere ao final   
(função membro pública)  
[ erase](<#/doc/string/basic_string/erase>) |  remove caracteres   
(função membro pública)