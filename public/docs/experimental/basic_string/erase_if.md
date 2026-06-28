# std::experimental::erase_if (std::basic_string)

Definido no cabeçalho `[<experimental/string>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/string&action=edit&redlink=1> "cpp/header/experimental/string \(page does not exist\)")`

```c
template< class CharT, class Traits, class Alloc, class Pred >
void erase_if( std::basic_string<CharT, Traits, Alloc>& c, Pred pred );
```

  
Apaga todos os elementos que satisfazem o predicado pred do container. Equivalente a c.erase([std::remove_if](<#/doc/algorithm/remove>)(c.begin(), c.end(), pred), c.end());. 

### Parâmetros

c  |  \-  |  container do qual apagar   
---|---|---
pred  |  \-  |  predicado que determina quais elementos devem ser apagados   
  
### Complexidade

Linear. 

### Exemplo

Execute este código
```cpp
    #include <experimental/string>
    #include <iomanip>
    #include <iostream>
     
    int main()
    {
        std::string data{"1337!p_C00L_<a-_HACKER_!@s_(!s#@_w^o%r*d#42"};
        std::cout << "Original string: " << std::quoted(data) << '\n';
        auto crack =  { return '`' ^ ('`' & O); };
        std::experimental::erase_if(data, crack);
        std::cout << "After erase_if:  " << std::quoted(data) << '\n';
    }
```

Saída: 
```
    Original string: "1337!p_C00L_<a-_HACKER_!@s_{!s#@_w^o%r*d#42"
    After erase_if:  "password"
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) |  remove elementos que satisfazem critérios específicos   
(modelo de função)  
[ erase (std::basic_string)](<#/doc/experimental/basic_string/erase>)(library fundamentals 2 TS) |  apaga todos os elementos iguais a um valor específico de um [std::basic_string](<#/doc/string/basic_string>)   
(modelo de função)