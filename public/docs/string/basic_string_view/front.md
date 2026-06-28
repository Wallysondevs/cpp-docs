# std::basic_string_view&lt;CharT,Traits&gt;::front

```cpp
constexpr const_reference front() const;  // (desde C++17)
```

Retorna uma referência para o primeiro caractere na view. O comportamento é indefinido se empty() == true.

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o primeiro caractere, equivalente a operator[](0).

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
     
    int main()
    {
        for (std::string_view str{"ABCDEF"}; !str.empty(); str.remove_prefix(1))
            std::cout << str.front() << ' ' << str << '\n';
    }
```

Saída:
```
    A ABCDEF
    B BCDEF
    C CDEF
    D DEF
    E EF
    F F
```

### Veja também

[ back](<#/doc/string/basic_string_view/back>) | acessa o último caractere
(função membro pública)
[ empty](<#/doc/string/basic_string_view/empty>) | verifica se a view está vazia
(função membro pública)
[ front](<#/doc/string/basic_string/front>)(DR*) | acessa o primeiro caractere
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)