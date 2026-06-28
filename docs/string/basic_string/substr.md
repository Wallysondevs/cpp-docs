# std::basic_string&lt;CharT,Traits,Allocator&gt;::substr

```cpp
  // (1)
basic_string substr( size_type pos = 0, size_type count = npos ) const;  // (até C++23)
(constexpr desde C++20)
constexpr basic_string
substr( size_type pos = 0, size_type count = npos ) const&;  // (desde C++23)
constexpr basic_string substr( size_type pos = 0, size_type count = npos ) &&;  // (2) (desde C++23)
```

  
Retorna uma substring `[`pos`, `pos + count`)`. Se a substring solicitada se estender além do final da string, ou seja, se `count` for maior que `size() - pos` (por exemplo, se `count == npos`), a substring retornada é `[`pos`, [`size()`](<#/doc/string/basic_string/size>)`)`."

1) Equivalente a `return basic_string(*this, pos, count);`.

2) Equivalente a `return basic_string(std::move(*this), pos, count);`.

### Parâmetros

pos  |  \-  |  posição do primeiro caractere a incluir   
---|---|---
count  |  \-  |  comprimento da substring   
  
### Valor de retorno

String contendo a substring `[`pos`, `pos + count`)` ou `[`pos`, [`size()`](<#/doc/string/basic_string/size>)`)`.

### Exceções

[std::out_of_range](<#/doc/error/out_of_range>) se `pos > size()`.

Se uma exceção for lançada por qualquer motivo, essas funções não terão efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

Linear em `count`.

### Observações

O alocador da string retornada é construído por padrão: o novo alocador pode _não_ ser uma cópia de [`get_allocator()`](<#/doc/string/basic_string/get_allocator>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string a = "0123456789abcdefghij";
     
        // count is npos, returns [pos, size())
        std::string sub1 = a.substr(10);
        std::cout << sub1 << '\n';
     
        // both pos and pos + count are within bounds, returns [pos, pos + count)
        std::string sub2 = a.substr(5, 3);
        std::cout << sub2 << '\n';
     
        // pos is within bounds, pos + count is not, returns [pos, size())
        std::string sub4 = a.substr(a.size() - 3, 50);
        // this is effectively equivalent to
        // std::string sub4 = a.substr(17, 3);
        // since a.size() == 20, pos == a.size() - 3 == 17, and a.size() - pos == 3
     
        std::cout << sub4 << '\n';
     
        try
        {
            // pos is out of bounds, throws
            std::string sub5 = a.substr(a.size() + 3, 50);
            std::cout << sub5 << '\n';
        }
        catch (const std::out_of_range& ex)
        {
            std::cout << ex.what() << '\n';
        }
    }
```

Saída possível: 
```
    abcdefghij
    567
    hij
    basic_string::substr: __pos (which is 23) > this->size() (which is 20)
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
  
### Veja também

[ copy](<#/doc/string/basic_string/copy>) |  copia caracteres   
(função membro pública)  
[ sizelength](<#/doc/string/basic_string/size>) |  retorna o número de caracteres   
(função membro pública)  
[ find](<#/doc/string/basic_string/find>) |  encontra a primeira ocorrência da substring fornecida   
(função membro pública)  
constexpr size_type `npos` [static] |  o valor especial `size_type(-1)`, seu significado exato depende do contexto  
---|---
[ substr](<#/doc/string/basic_string_view/substr>) |  retorna uma substring   
(função membro pública de `std::basic_string_view<CharT,Traits>`)