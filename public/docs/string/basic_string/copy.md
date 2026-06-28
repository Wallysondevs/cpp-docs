# std::basic_string&lt;CharT,Traits,Allocator&gt;::copy

size_type copy( CharT* dest, size_type count, size_type pos = 0 ) const; | | (constexpr desde C++20)

Copia uma substring `[`pos`, `pos + count`)` para a string de caracteres apontada por `dest`. Se a substring solicitada se estender além do final da string, ou se `count == npos`, a substring copiada é `[`pos`, `[`size()`](<#/doc/string/basic_string/size>)`)`.

A string de caracteres resultante não é terminada em nulo.

### Parâmetros

- **dest** — ponteiro para a string de caracteres de destino
- **count** — comprimento da substring
- **pos** — posição do primeiro caractere a ser incluído

### Valor de retorno

Número de caracteres copiados.

### Exceções

[std::out_of_range](<#/doc/error/out_of_range>) se pos > size().

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

Linear em count.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string foo("WINE");
    
        // brace-initialization initializes all characters to 0,
        // providing a null-terminator
        char bar[4]{};
    
        // do not copy the last char, to guarantee null-termination
        foo.copy(bar, sizeof bar - 1);
    
        std::cout << bar << '\n'; // requires bar to be null-terminated
    }
```

Saída:
```
    WIN
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte

### Veja também

[ substr](<#/doc/string/basic_string/substr>) | retorna uma substring
(função membro pública)
[ copy](<#/doc/string/basic_string_view/copy>) | copia caracteres
(função membro pública de `std::basic_string_view<CharT,Traits>`)
[ copycopy_if](<#/doc/algorithm/copy>)(desde C++11) | copia um range de elementos para um novo local
(modelo de função)
[ memcpy](<#/doc/string/byte/memcpy>) | copia um buffer para outro
(função)