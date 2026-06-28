# std::basic_string&lt;CharT,Traits,Allocator&gt;::rend, std::basic_string&lt;CharT,Traits,Allocator&gt;::crend

```cpp
reverse_iterator rend(); | (1) | (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator rend() const; | (2) | (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

Retorna um reverse iterator para o caractere que segue o último caractere da string invertida. Ele corresponde ao caractere que precede o primeiro caractere da string não invertida. Este caractere atua como um placeholder, e tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o caractere que segue o último caractere.

### Complexidade

Constante.

### Observações

libc++ faz o backport de `crend()` para o modo C++98.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::string p("[A man, a plan, a canal: Panama]");
        std::string q;
    
        std::copy(p.crbegin(), p.crend(), std::back_inserter(q));
        std::cout << "q = " << q << '\n';
    
        std::copy(q.crbegin(), q.crend(), p.rbegin());
        std::cout << "p = " << p << '\n';
    }
```

Saída:
```
    q = ]amanaP :lanac a ,nalp a ,nam A[
    p = ]amanaP :lanac a ,nalp a ,nam A[
```

### Veja também

[ rbegincrbegin](<#/doc/string/basic_string/rbegin>)(desde C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/string/basic_string_view/rend>) | retorna um reverse iterator para o fim
(função membro pública de `std::basic_string_view<CharT,Traits>`)