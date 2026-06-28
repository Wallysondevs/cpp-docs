# std::strcspn

Definido no header `[<cstring>](<#/doc/header/cstring>)`

```cpp
std::size_t strcspn( const char *dest, const char *src );
```

Retorna o comprimento do segmento inicial máximo da string de bytes apontada por dest, que consiste apenas nos caracteres _não_ encontrados na string de bytes apontada por src.

O nome da função significa "complementary span" (extensão complementar).

### Parâmetros

- **dest** — ponteiro para a string de bytes terminada em nulo a ser analisada
- **src** — ponteiro para a string de bytes terminada em nulo que contém os caracteres a serem procurados

### Valor de retorno

O comprimento do segmento inicial máximo que contém apenas caracteres não encontrados na string de bytes apontada por src.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <cstring>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s = "abcde312$#@";
        const char* invalid = "*$#";
    
        const std::size_t valid_len = std::strcspn(s.c_str(), invalid);
        if (valid_len != s.size())
        {
            std::cout << std::quoted(s)
                      << " contains invalid chars starting at position "
                      << valid_len << '\n'
                      << std::string(valid_len + 1, '-') << "^\n";
        }
    }
```

Saída:
```
    "abcde312$#@" contains invalid chars starting at position 8
    ---------^
```

### Veja também

[ strspn](<#/doc/string/byte/strspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres encontrados em outra string de bytes
(função)
[ wcscspn](<#/doc/string/wide/wcscspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres wide _não_ encontrados em outra string wide
(função)
[ strpbrk](<#/doc/string/byte/strpbrk>) | encontra a primeira ocorrência de qualquer caractere de um conjunto de separadores
(função)
[ find_first_of](<#/doc/string/basic_string/find_first_of>) | encontra a primeira ocorrência de caracteres
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[documentação C](<#/>) para strcspn