# std::basic_string_view&lt;CharT,Traits&gt;::back

```cpp
constexpr const_reference back() const;  // (desde C++17)
```

Retorna uma referência para o último caractere na view. O comportamento é indefinido se empty() == true.

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o último caractere, equivalente a operator[](size() - 1).

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        for (std::string_view str{"ABCDEF"}; !str.empty(); str.remove_suffix(1))
            std::cout << str.back() << ' ' << str << '\n';
    }
```

Saída:
```
    F ABCDEF
    E ABCDE
    D ABCD
    C ABC
    B AB
    A A
```

### Veja também

[ front](<#/doc/string/basic_string_view/front>) | acessa o primeiro caractere
(função membro pública)
[ empty](<#/doc/string/basic_string_view/empty>) | verifica se a view está vazia
(função membro pública)
[ back](<#/doc/string/basic_string/back>)(DR*) | acessa o último caractere
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)