# std::basic_string&lt;CharT,Traits,Allocator&gt;::at

CharT& at( size_type pos ); | (1) | (constexpr desde C++20)
---|---|---
const CharT& at( size_type pos ) const; | (2) | (constexpr desde C++20)

Retorna uma referência para o caractere na posição `pos` especificada. A verificação de limites é realizada, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) será lançada em caso de acesso inválido.

### Parâmetros

- **pos** — posição do caractere a ser retornado

### Valor de retorno

Referência para o caractere solicitado.

### Exceções

Lança [std::out_of_range](<#/doc/error/out_of_range>) se `pos >= size()`.

Se uma exceção for lançada por qualquer motivo, essas funções não terão efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <stdexcept>
    #include <string>
    
    int main()
    {
        std::string s("message"); // for capacity
    
        s = "abc";
        s.at(2) = 'x'; // OK
        std::cout << s << '\n';
    
        std::cout << "string size = " << s.size() << '\n';
        std::cout << "string capacity = " << s.capacity() << '\n';
    
        try
        {
            // This will throw since the requested offset is greater than the current size.
            s.at(3) = 'x';
        }
        catch (std::out_of_range const& exc)
        {
            std::cout << exc.what() << '\n';
        }
    }
```

Saída possível:
```
    abx
    string size = 3
    string capacity = 7
    basic_string::at
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte
[LWG 2207](<https://cplusplus.github.io/LWG/issue2207>) | C++98 | o comportamento era indefinido se pos >= size() fosse verdadeiro | sempre lança uma exceção neste caso

### Veja também

[ operator[]](<#/doc/string/basic_string/operator_at>) | acessa o caractere especificado
(função membro pública)
[ at](<#/doc/string/basic_string_view/at>) | acessa o caractere especificado com verificação de limites
(função membro pública de `std::basic_string_view<CharT,Traits>`)