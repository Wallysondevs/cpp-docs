# std::basic_string&lt;CharT,Traits,Allocator&gt;::operator[]

CharT& operator[]( size_type pos ); | (1) | (constexpr desde C++20)
---|---|---
const CharT& operator[]( size_type pos ) const; | (2) | (constexpr desde C++20)

Retorna uma referência para o caractere na posição especificada `pos` se `pos < size()`, ou uma referência para `CharT()` se `pos == size()`. Nenhuma verificação de limites é realizada.

Se `pos > size()`, o comportamento é indefinido.

Para a sobrecarga (1), se `pos == size()`, o comportamento é indefinido se o objeto referenciado pela referência retornada for modificado para qualquer valor diferente de `CharT()` (desde C++11).

### Parâmetros

- **pos** — posição do caractere a ser retornado

### Valor de retorno

Referência para o elemento solicitado se `pos < size()`, ou uma referência para `CharT()` se `pos == size()`.

### Complexidade

Constante.

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <string>
     
    int main()
    {
        const std::string e("Exemplar");
        for (unsigned i = e.length() - 1; i != 0; i /= 2)
            std::cout << e[i];
        std::cout << '\n';
     
        const char* c = &e[0];
        std::cout << c << '\n'; // print as a C string
     
        // Change the last character of s into a 'y'
        std::string s("Exemplar ");
        s[s.size() - 1] = 'y'; // equivalent to s.back() = 'y';
        std::cout << s << '\n';
    }
```

Saída:
```
    rmx
    Exemplar
    Exemplary
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 259](<https://cplusplus.github.io/LWG/issue259>) | C++98 | sobrecarga não-const poderia retornar lvalue const data()[pos], o que era malformado | alterado para retornar *(begin() + pos)
[LWG 2475](<https://cplusplus.github.io/LWG/issue2475>) | C++11 | se pos == size(), o comportamento de modificar o objeto referenciado pela referência retornada era indefinido | bem definido se modificado para CharT()

### Veja também

[ at](<#/doc/string/basic_string/at>) | acessa o caractere especificado com verificação de limites
(função membro pública)
[ front](<#/doc/string/basic_string/front>)(DR*) | acessa o primeiro caractere
(função membro pública)
[ back](<#/doc/string/basic_string/back>)(DR*) | acessa o último caractere
---|---
[ operator[]](<#/doc/string/basic_string_view/operator_at>) | acessa o caractere especificado
(função membro pública de `std::basic_string_view<CharT,Traits>`)