# std::span&lt;T,Extent&gt;::rbegin, std::span&lt;T,Extent&gt;::crbegin

```cpp
constexpr reverse_iterator rbegin() const noexcept;  // (1) (desde C++20)
constexpr const_reverse_iterator crbegin() const noexcept;  // (2) (desde C++23)
```

Retorna um reverse iterator para o primeiro elemento do `span` invertido. Ele corresponde ao último elemento do `span` não invertido. Se o `span` estiver vazio, o iterator retornado é igual a rend().

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o primeiro elemento.

### Complexidade

Constante.

### Observações

O [underlying iterator](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/span/end>). Consequentemente, o iterator retornado é invalidado se e quando o end iterator for invalidado.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <span>
    
    int main()
    {
        constexpr std::span<const char> code{"@droNE_T0P_w$s@s#_SECRET_a,p^42!"};
    
        auto hack =  { return O - 0141 < 120; };
    
        std::copy_if(code.rbegin(), code.rend(),
            std::ostream_iterator<const char>(std::cout), hack);
    
        std::cout << '\n';
    }
```

Saída:
```
    password
```

### Veja também

[ rendcrend](<#/doc/container/span/rend>)(C++23) | retorna um reverse iterator para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(template de função)