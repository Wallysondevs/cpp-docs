# std::basic_ios&lt;CharT,Traits&gt;::rdbuf

[std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>* rdbuf() const; | (1) |
---|---|---
[std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>* rdbuf( [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>* sb ); | (2) |

Gerencia o buffer de stream associado.

1) Retorna o buffer de stream associado. Se não houver buffer de stream associado, retorna um ponteiro nulo.

2) Define o buffer de stream associado como `sb`. O estado de erro é limpo chamando [clear()](<#/doc/io/basic_ios/clear>). Retorna o buffer de stream associado antes da operação. Se não houver buffer de stream associado, retorna um ponteiro nulo.

### Parâmetros

- **sb** — Buffer de stream para associar.

### Valor de retorno

O buffer de stream associado, ou um ponteiro nulo se não houver buffer de stream associado.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::ostringstream local;
        auto cout_buff = std::cout.rdbuf(); // save pointer to std::cout buffer
    
        std::cout.rdbuf(local.rdbuf()); // substitute internal std::cout buffer with
                                        // buffer of 'local' object
    
        // now std::cout work with 'local' buffer
        // you don't see this message
        std::cout << "some message";
    
        // go back to old buffer
        std::cout.rdbuf(cout_buff);
    
        // you will see this message
        std::cout << "back to default buffer\n";
    
        // print 'local' content
        std::cout << "local content: " << local.str() << "\n";
    }
```

Output:
```
    back to default buffer
    local content: some message
```

### Veja também

[ set_rdbuf](<#/doc/io/basic_ios/set_rdbuf>) | substitui o `rdbuf` sem limpar seu estado de erro
(função membro protegida)