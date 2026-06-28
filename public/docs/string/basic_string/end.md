# std::basic_string&lt;CharT,Traits,Allocator&gt;::end, std::basic_string&lt;CharT,Traits,Allocator&gt;::cend

```cpp
iterator end(); | (1) | (noexcept desde C++11)
(constexpr desde C++20)
const_iterator end() const; | (2) | (noexcept desde C++11)
(constexpr desde C++20)
const_iterator cend() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

Retorna um iterator para o caractere que segue o último caractere da string. Este caractere atua como um marcador de posição (placeholder); tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o caractere que segue o último caractere.

### Complexidade

Constante.

### Observações

libc++ faz o backport de `cend()` para o modo C++98.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::string s("Exemparl");
        std::next_permutation(s.begin(), s.end());
    
        std::string c;
        std::copy(s.cbegin(), s.cend(), std::back_inserter(c));
        std::cout << c << '\n'; // "Exemplar"
    }
```

Saída:
```
    Exemplar
```

### Ver também

[ begincbegin](<#/doc/string/basic_string/begin>)(C++11) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/string/basic_string_view/end>) | retorna um iterator para o fim
(função membro pública de `std::basic_string_view<CharT,Traits>`)