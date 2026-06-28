# std::basic_string&lt;CharT,Traits,Allocator&gt;::erase

```cpp
basic_string& erase( size_type index = 0, size_type count = npos ); | (1) | (constexpr desde C++20)
  // (2)
iterator erase( iterator position );  // (até C++11)
iterator erase( const_iterator position );  // (desde C++11)
(constexpr desde C++20)
  // (3)
iterator erase( iterator first, iterator last );  // (até C++11)
iterator erase( const_iterator first, const_iterator last );  // (desde C++11)
(constexpr desde C++20)
```

Remove caracteres especificados da string.

1) Remove [std::min](<#/doc/algorithm/min>)(count, size() - index) caracteres a partir de index.

2) Remove o caractere na position.

Se position não for um [iterator desreferenciável](<#/doc/iterator>) em *this, o comportamento é indefinido.

3) Remove os caracteres no range `[`first`, `last`)`.

Se first ou last não for um [iterator válido](<#/doc/iterator>) em *this, ou `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

### Parâmetros

- **index** — primeiro caractere a remover
- **count** — número de caracteres a remover
- **position** — iterator para o caractere a remover
- **first, last** — range dos caracteres a remover

### Valor de retorno

1) *this

2) Iterator apontando para o caractere imediatamente seguinte ao caractere apagado, ou [end()](<#/doc/string/basic_string/end>) se tal caractere não existir.

3) Iterator apontando para o caractere para o qual last apontava antes da remoção, ou [end()](<#/doc/string/basic_string/end>) se tal caractere não existir.

### Exceções

1) [std::out_of_range](<#/doc/error/out_of_range>) se index > size().

2,3) Não lança exceções.

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::string s = "This Is An Example";
        std::cout << "1) " << s << '\n';
    
        s.erase(7, 3); // erases " An" using overload (1)
        std::cout << "2) " << s << '\n';
    
        s.erase(std::find(s.begin(), s.end(), ' ')); // erases first ' '; overload (2)
        std::cout << "3) " << s << '\n';
    
        s.erase(s.find(' ')); // trims from ' ' to the end of the string; overload (1)
        std::cout << "4) " << s << '\n';
    
        auto it = std::next(s.begin(), s.find('s')); // obtains iterator to the first 's'
        s.erase(it, std::next(it, 2)); // erases "sI"; overload (3)
        std::cout << "5) " << s << '\n';
    }
```

Output:
```
    1) This Is An Example
    2) This Is Example
    3) ThisIs Example
    4) ThisIs
    5) This
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 27](<https://cplusplus.github.io/LWG/issue27>) | C++98 | a sobrecarga ([3](<#/doc/string/basic_string/erase>)) não apagava o caractere para o qual last apontava, mas retornava o iterator apontando para o caractere imediatamente seguinte a esse caractere | retorna um iterator apontando para esse caractere
[LWG 428](<https://cplusplus.github.io/LWG/issue428>) | C++98 | a sobrecarga ([2](<#/doc/string/basic_string/erase>)) exigia explicitamente que position fosse válido, mas [SequenceContainer](<#/doc/named_req/SequenceContainer>) exige que seja desreferenciável (mais rigoroso) | removeu o requisito explícito
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte

### Veja também

[ clear](<#/doc/string/basic_string/clear>) | limpa o conteúdo
(função membro pública)