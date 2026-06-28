# std::basic_string&lt;CharT,Traits,Allocator&gt;::back

CharT& back(); | (1) | (constexpr desde C++20)
---|---|---
const CharT& back() const; | (2) | (constexpr desde C++20)

Retorna uma referência para o último caractere na string. O comportamento é indefinido se [empty()](<#/doc/string/basic_string/empty>) for `true`.

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o último caractere, equivalente a `operator[](size() - 1)`.

### Complexidade

Constante.

### Notas

No libstdc++, `back()` [não está disponível](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/strings.html#strings.string.shrink>) no modo C++98.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string s("Exemplary");
        char& back1 = s.back();
        back1 = 's';
        std::cout << s << '\n'; // "Exemplars"
     
        std::string const c("Exemplary");
        char const& back2 = c.back();
        std::cout << back2 << '\n'; // 'y'
    }
```

Saída:
```
    Exemplars
    y
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 534](<https://cplusplus.github.io/LWG/issue534>) | C++98 | [std::basic_string](<#/doc/string/basic_string>) não possuía a função membro `back()` | adicionado

### Veja também

[ front](<#/doc/string/basic_string/front>)(DR*) | acessa o primeiro caractere
(função membro pública)
[ back](<#/doc/string/basic_string_view/back>) | acessa o último caractere
(função membro pública de `std::basic_string_view<CharT,Traits>`)